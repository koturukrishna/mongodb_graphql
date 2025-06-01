const { gql } = require("apollo-server-express");

// Define the GraphQL schema using the gql template literal
const typeDefs = gql`
  # Post type represents a blog post
  type Post {
    id: ID! # Unique identifier for the post
    title: String! # Title of the post, non-nullable
    content: String! # Content of the post, non-nullable
  }

  # Query type defines the available queries for fetching data
  type Query {
    posts: [Post] # Query to get a list of all posts
    post(id: ID!): Post # Query to get a specific post by ID
  }

  # Mutation type defines the available mutations for modifying data
  type Mutation {
    createPost(title: String!, content: String!): Post # Mutation to create a new post
    updatePost(id: ID!, title: String, content: String): Post # Mutation to update an existing post
    deletePost(id: ID!): Post # Mutation to delete a post
  }
`;

module.exports = typeDefs;
