require("dotenv").config();
const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// apply Apollo Server as middleware
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../public")));
}

db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`)
  );
});

startServer();
