const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    products: () => {
      return prisma.product.findMany();
    },
    product: (_, { id }) => {
      return prisma.product.findUnique({
        where: {
          id: id,
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
        // boughtProducts: [],
        // lentProducts: [],
        // postedProducts: [],
      };
      return prisma.user.create({ data: user });
    },
  },
};

module.exports = resolvers;
