import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloLink } from "apollo-link";

import { exists } from "fs";
import typeDefs from "./types/";
import resolvers from "./resolvers/";
import { ApolloServer, gql } from "apollo-server-express";

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
