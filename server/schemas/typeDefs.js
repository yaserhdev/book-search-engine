// Define typeDefs
const typeDefs = `
# Define which fields are accessible from the User model
type User {
    username: String
    email: String
    password: String
    savedBooks: [books]
}

# Define which fields are accessible from the Book model
type Book {
    authors: [{String}]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

# Define which queries the front end is allowed to make and what data is returned
type Query {
    users: [User]
    books: [Book]
}
`;

// Export typeDefs
module.exports = typeDefs;