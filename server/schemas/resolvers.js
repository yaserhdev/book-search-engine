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
                const userData = await User.findOne({ _id: context.user._id });
                return userData;
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
            const token = signToken(user);
            return { token, user };
        },
        // Mutation to save a book to your profile
        saveBook: async (parent, { bookData }, context) => {
            const { bookId, title, authors, description, image, link } = bookData;
            console.log(bookData);
            console.log(context.user);
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true }
            );
            return user;
        },
        // Mutation to remove a book from your profile
        removeBook: async (parent, { bookId }, context) => {
            // if (context.user) {
                console.log(bookId);
                console.log(context.user);
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return user;
            // }
        }
    }
};

// Export resolvers
module.exports = resolvers;