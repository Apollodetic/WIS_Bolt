import express from 'express';
    import { ApolloServer, gql } from 'apollo-server-express';
    import mongoose from 'mongoose';

    const app = express();

    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/dynamicWebsite', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });

    // Define schema
    const typeDefs = gql`
      type Content {
        id: ID!
        text: String!
        svgLogo: String!
      }

      type Query {
        content(choice: String!): Content
      }
    `;

    // Define resolvers
    const resolvers = {
      Query: {
        content: async (_, { choice }) => {
          // Fetch content from MongoDB based on choice
          return { id: '1', text: `Content for ${choice}`, svgLogo: '<svg>...</svg>' };
        },
      },
    };

    // Create Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    // Start the server
    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
