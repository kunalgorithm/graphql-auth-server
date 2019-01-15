module.exports = `
type User {
    id: String!
    name: String
    email: String!
    password: String!
}

type Query {
    user(id: String!): User
    users: [User]
}

type AuthPayload {
  token: String
  user: User
}

type Mutation {

    editUser(id: String!, name: String, email: String): User
    deleteUser(id: String, name: String, email: String): User
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
}
`;
