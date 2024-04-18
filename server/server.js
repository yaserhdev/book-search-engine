const express = require('express');
// const path = require('path');
// Import ApolloServer class and expressMiddleware helper function
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

// Import two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./models');
const db = require('./config/connection');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
// Define server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

// Create new instance of an Apollo server with GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`User GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// Start server
startApolloServer();
