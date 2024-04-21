// Define typeDefs
const typeDefs = `
# Define which fields are accessible from the User model
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
}

# Define which fields are accessible from the Book model
type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

# Define which queries the front end is allowed to make and what data is returned
type Query {
    users: [User]
    user(username: String!): User
    books(username: String!): [Book]
    // book(bookId: ID!): Book
    me: User
}

# Define which mutations can be made by a user
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!, title: String!, authors: [String], description: String, image: String, link: String): User
    removeBook(bookId: ID!): User
}
`;

// Export typeDefs
module.exports = typeDefs;