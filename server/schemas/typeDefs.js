// Define typeDefs
const typeDefs = `
# Define which fields are accessible from the User model
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
}

# Define which fields are accessible from the Book schema
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

# Define which queries the front end is allowed to make and what data is returned
type Query {
    me: User
}

# Define which mutations can be made by a user
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}
`;

// Export typeDefs
module.exports = typeDefs;