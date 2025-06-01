const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const typeDefs = require("./schema"); // Import your GraphQL schema definition
const resolvers = require("./resolvers"); // Import your GraphQL resolvers

const app = express();

app.use(cors());
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI); // Replace with your MongoDB connection string
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create an instance of ApolloServer with your schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Use the `start` method to start the Apollo Server
async function startApolloServer() {
  await server.start();

  // Apply middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = 5000; // Define the port for your Express server
  app.listen(PORT, () => {
    console.log(
      `Server listening on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

// Start the Apollo Server
startApolloServer();
