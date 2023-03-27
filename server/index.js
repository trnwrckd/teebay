const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const port = process.env.PORT || 5000;
const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

//graphql
const graphqlModels = `
    type User{
        id : ID
        firstName : String 
        lastName : String
        address : String
        email : String
        phone : String
        password : String
        boughtProducts : [Product]
        lentProducts : [Product]
        postedProducts : [Product]
    }

    type Product{
        id : String
        title  : String
        categories  : [String]
        description : String
        price : Int
        rentPrice  : Int
        rentDuration  : String
        boughtBy  : String
        lentBy : String
        postedBy : String
    }

    type Query{
        getProducts: [Product]
    }
`;

const resolvers = {
  Query: {
    getProducts: () => {
      return prisma.product.findMany();
    },
  },
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: graphqlModels,
});

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  return res.status(200).json({ success: true, products });
});

app.get('/users', async (req, res) => {
  const user = await prisma.user.findMany();
  return res.status(200).json({ success: true, user });
});

app.listen(port, console.log('TeeBay Server running on port', port));
