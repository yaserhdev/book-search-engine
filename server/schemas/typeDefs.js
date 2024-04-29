// Define typeDefs
const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
}

type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID
    user: User
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
}
`;

// Export typeDefs
module.exports = typeDefs;