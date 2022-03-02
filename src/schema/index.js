const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # RECORD TYPES
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]!
    title: String!
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  # QUERIES
  type Query {
    me: User
  }

  # MUTATION INPUTS
  input UserInput {
    email: String!
    password: String!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    bookId: ID!
    authors: [String]!
    description: String
    title: String!
    image: String
    link: String
  }

  # MUTATIONS
  type Mutation {
    login(user: UserInput!): Auth
    addUser(user: AddUserInput!): Auth
    saveBook(book: SaveBookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
