const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
require('dotenv').config();

//graphql model and resolvers
const graphqlModels = require('./models.js');
const resolvers = require('./resolvers.js');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: graphqlModels,
});

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

// app.get('/products', async (req, res) => {
//   const products = await prisma.product.findMany();
//   return res.status(200).json({ success: true, products });
// });

// app.get('/users', async (req, res) => {
//   const user = await prisma.user.findMany();
//   return res.status(200).json({ success: true, user });
// });

app.listen(port, console.log('TeeBay Server running on port', port));
