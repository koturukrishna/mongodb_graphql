// Import the Post model, assuming it's a file in the same directory
const Post = require("./models/Post");

// Resolvers define how to respond to GraphQL queries and mutations

const resolvers = {
  // Query resolver object handles read operations (fetching data)
  Query: {
    // Resolver for fetching all posts
    posts: async () => {
      try {
        // Use the Post model to find and return all posts
        return await Post.find();
      } catch (error) {
        // If there's an error, throw an informative error message
        throw new Error("Error fetching posts from the database");
      }
    },
    // Resolver for fetching a post by ID
    post: async (parent, { id }) => {
      try {
        // Use the Post model to find and return a specific post by ID
        return await Post.findById(id);
      } catch (error) {
        // If there's an error, throw an informative error message
        throw new Error(`Error fetching post with ID: ${id} from the database`);
      }
    },
  },

  // Mutation resolver object handles write operations (create, update, delete)
  Mutation: {
    // Resolver for creating a new post
    createPost: async (parent, { title, content }) => {
      try {
        // Create a new post instance using the Post model
        const post = new Post({ title, content });
        // Save the new post to the database and return it
        return await post.save();
      } catch (error) {
        // If there's an error, throw an informative error message
        throw new Error("Error creating a new post in the database");
      }
    },

    // Resolver for updating an existing post
    updatePost: async (parent, { id, title, content }) => {
      try {
        // Find and update a post by ID, return the updated post
        return await Post.findByIdAndUpdate(
          id,
          { title, content },
          { new: true }
        );
      } catch (error) {
        // If there's an error, throw an informative error message
        throw new Error(`Error updating post with ID: ${id} in the database`);
      }
    },

    // Resolver for deleting a post by ID
    deletePost: async (parent, { id }) => {
      try {
        // Find and delete a post by ID, return the deleted post
        return await Post.findByIdAndDelete(id);
      } catch (error) {
        // If there's an error, throw an informative error message
        throw new Error(`Error deleting post with ID: ${id} from the database`);
      }
    },
  },
};

// Export the resolvers for use in the Apollo Server
module.exports = resolvers;
