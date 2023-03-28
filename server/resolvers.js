const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    products: () => {
      return prisma.product.findMany();
    },
    product: (_, { id }) => {
      return prisma.product.update({
        where: {
          id: id,
        },
        data: {
          viewCount: { increment: 1 },
        },
      });
    },
    productsByUserId: (_, { id }) => {
      return prisma.product.findMany({
        where: {
          postedBy: id,
        },
      });
    },
    users: () => {
      return prisma.user.findMany();
    },
    user: (_, { id }) => {
      return prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    },
  },
  Mutation: {
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
        boughtBy,
        lentBy,
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
        boughtBy: boughtBy,
        lentBy: lentBy,
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
        boughtBy,
        lentBy,
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
        boughtBy: boughtBy,
        lentBy: lentBy,
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
  },
};

module.exports = resolvers;
