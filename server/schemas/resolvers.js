// Import User model, signToken, and AuthenticationError
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Functions that will fulfill define queries from typeDefs
const resolvers = {
    Query: {
        // // Query all users
        // users: async () => {
        //     return User.find().populate('books');
        // },
        // // Query a single user
        // user: async (parent, { username }) => {
        //     return User.findOne({ username }).populate('books');
        // },
        // // Query all books
        // books: async () => {
        //     return Book.find().sort({ createdAt: -1 });
        // },
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
        addUser: async (parent, { username, email, password }) => {
            const user = User.create({ username, email, password });
            console.log(user);
            const token = signToken(user);
            return { token, user };
        },
        // Mutation for logging in
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
        },
        // Mutation to save a book to your profile
        saveBook: async (parent, { input }, context) => {
            const { bookId, title, authors, description, image, link } = input;
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: { bookId, title, authors, description, image, link } } },
                { new: true }
            );
            return user;
        },
        // Mutation to remove a book from your profile
        removeBook: async (parent, { bookId }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: bookId } },
                { new: true }
            );
            return user;
        }
    }
};

// Export resolvers
module.exports = resolvers;