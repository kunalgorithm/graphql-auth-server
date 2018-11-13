import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User";
import AuthPayload from "./AuthPayload";
const resolvers = [User, AuthPayload];

export default mergeResolvers(resolvers);
