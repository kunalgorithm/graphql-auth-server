import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloLink } from "apollo-link";

import schema from "./graphql";
import { exists } from "fs";

const app = express();
const PORT = process.env.PORT || "4000";
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

app.use(
  "/graphql",
  cors(),
  // morgan("combined"),
  bodyParser.json(),
  expressGraphQL({ schema, graphiql: true })
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
