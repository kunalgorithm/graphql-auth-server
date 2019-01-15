const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const { ApolloLink } = require("apollo-link");

const { exists } = require("fs");
const typeDefs = require("./types/");
const resolvers = require("./resolvers/");
const { ApolloServer, gql } = require("apollo-server-express");

require("dotenv").config();

let db;
try {
  db = process.env.MONGODB_URL;
} catch (error) {
  console.log(error);
  process.exit(1);
}

mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

const app = express();
server.applyMiddleware({ app });
app.get("/", (req, res) => {
  res.redirect("/graphql");
});

const port = process.env.PORT || "4000";

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
