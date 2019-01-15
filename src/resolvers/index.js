const User = require("./User");
const AuthPayload = require("./AuthPayload");
const resolvers = { ...User, ...AuthPayload };

module.exports = resolvers;
