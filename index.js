import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloLink } from "apollo-link";

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT || "4000";
const db = "mongodb://kunal:iscool1@ds033709.mlab.com:33709/todotestlist546";

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
