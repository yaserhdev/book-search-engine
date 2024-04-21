// Import User model, signToken, and AuthenticationError
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Functions that will fulfill define queries from typeDefs
const resolvers = {
    Query: {
        // Query all users
        users: async () => {
            return User.find().populate('books');
        },
        // Query a single user
        user: async (parent, { username }) => {
            return User.findOne({ username}).populate('books');
        },
        // Query all books
        books: async () => {
            return Book.find().sort({ createdAt: -1 });
        },
        // Query a single book
        // book: async () => {},
        // Query your own profile
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
            }
            throw AuthenticationError;
        }
    },
    Mutation: {
        // Mutation to add a user
        addUser: async () => {},
        // Mutation for logging in
        login: async () => {},
        // Mutation to save a book to your profile
        saveBook: async () => {},
        // Mutation to remove a book from your profile
        removeBook: async () => {}
    }
};

// Export resolvers
module.exports = resolvers;