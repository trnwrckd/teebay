const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  // queries
  Query: {
    products: () => {
      return prisma.product.findMany({
        include: { purchaseInfo: true, postedByUser: true, rentInfo: true },
        orderBy: [{
          createdAt : 'desc'
        }]
      });
    },
    
    product: (_, { id }) => {
      return prisma.product.update({
        where: {
          id: id,
        },
        data: {
          viewCount: { increment: 1 },
        },
        include: {
          purchaseInfo: true,
          rentInfo: true,
          postedByUser: true,
        },
      });
    },

    productsByUserId: (_, { id }) => {
      return prisma.product.findMany({
        where: {
          postedBy: id,
        },
        include: {
          purchaseInfo: true,
          rentInfo: true,
          postedByUser: true,
        },
        orderBy: [{
          createdAt : 'desc'
        }]
      });
    },

    lentProductsByUserId: (_, { id }) => {
      return prisma.rentedProduct.findMany({
        where: {
          productOwner: id,
        },
        include: {
          productDetails: true,
        },
        orderBy : [{
          productDetails:{
            createdAt: 'desc'
          }
        }]
      });
    },

    borrowedProductsByUserId: (_, { id }) => {
      return prisma.rentedProduct.findMany({
        where: {
          borrowedBy: id,
        },
        include: {
          productDetails: true,
        },
        orderBy : [{
          productDetails:{
            createdAt: 'desc'
          }
        }]
      });
    },

    soldProductsByUserId: (_, { id }) => {
      return prisma.soldProduct.findMany({
        where: {
          productOwner: id,
        },
        include: {
          productDetails: true,
        },
        orderBy : [{
          productDetails:{
            createdAt: 'desc'
          }
        }]
      });
    },

    boughtProductsByUserId: (_, { id }) => {
      return prisma.soldProduct.findMany({
        where: {
          boughtBy: id,
        },
        include: {
          productDetails: true,
        },
        orderBy : [{
          productDetails:{
            createdAt: 'desc'
          }
        }]
      });
    },
    // get all users
    users: () => {
      return prisma.user.findMany({ include: { postedProducts: true } });
    },
    // get user by id
    user: (_, { id }) => {
      return prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  // mutations
  Mutation: {
    // login user
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) throw new Error('No User found with email');
      if (user.password !== password) throw new Error('Invalid password');
      return user;
    },
    // create user
    createUser: (
      _,
      { firstName, lastName, address, email, phone, password }
    ) => {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        phone: phone,
      };
      return prisma.user.create({ data: user });
    },
    //create product
    createProduct: (
      _,
      {
        title,
        categories,
        description,
        price,
        rentPrice,
        rentDuration,
        postedBy,
      }
    ) => {
      const body = {
        title: title,
        categories: categories,
        description: description,
        price: price,
        rentPrice: rentPrice,
        rentDuration: rentDuration,
        postedBy: postedBy,
        viewCount: 0,
      };

      return prisma.product.create({ data: body });
    },
    //update product
    updateProduct: (
      _,
      {
        id,
        title,
        categories,
        description,
        price,
        rentPrice,
        rentDuration,
        postedBy,
        viewCount,
      }
    ) => {
      const body = {
        id: id,
        title: title,
        categories: categories,
        description: description,
        price: price,
        rentPrice: rentPrice,
        rentDuration: rentDuration,
        postedBy: postedBy,
        viewCount: viewCount,
      };
      return prisma.product.update({
        where: {
          id: id,
        },
        data: body,
      });
    },
    //delete product
    deleteProduct: (_, { id }) => {
      return prisma.product.delete({
        where: {
          id: id,
        },
      });
    },

    // purchase product
    purchaseProduct: (_, { productId, productOwner, boughtBy }) => {
      const product = {
        productId: productId,
        productOwner: productOwner,
        boughtBy: boughtBy,
      };

      return prisma.soldProduct.create({
        data: product,
        include: {
          productDetails: true,
        },
      });
    },

    //rent product
    rentProduct: (_, { productId, productOwner, borrowedBy }) => {
      const product = {
        productId: productId,
        productOwner: productOwner,
        borrowedBy: borrowedBy,
      };

      return prisma.rentedProduct.create({
        data: product,
        include: {
          productDetails: true,
        },
      });
    },
  },
};

module.exports = resolvers;
