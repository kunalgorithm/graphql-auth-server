# GraphQL Auth Server

A GraphQL authentication server built with Node, Express, MongoDB, Mongoose, and Babel.

## Usage

`npm install` - install dependencies.
`npm run start` - starts the development server with nodemon and babel/node.
Server listens for requests at `http://localhost:4000/graphql`

## Technologies


| Tool                  | Usage                                                                                   | Documentation                                       |
| --------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| GraphQL               | Data transfer protocol.                                                                 | https://graphql.com                                 |
| Babel                 | Allow for ES6 syntax transpilation in a backend NodeJS server.                          | https://babel.io                                    |
| Mongoose              | ORM used to structure the single-source-of-truth data model and interface with MongoDB. | https://mongoosejs.com/                             |
| Concurrently          | Run multiple npm commands concurrently.                                                 | https://www.npmjs.com/package/concurrently          |
| Bcrypt                | Hashing and Salting passwords before storage.                                           | https://www.npmjs.com/package/bcrypt                |
| Cors                  | Modify and limit requests from various IP addresses.                                    | https://www.npmjs.com/package/cors                  |
| Merge GraphQL schemas | Merge GraphQL Schemas                                                                   | https://www.npmjs.com/package/merge-graphql-schemas |
| Express               | NodeJS server                                                                           | https://expressjs.com                               |
| Morgan                | Express Logging middleware                                                              | https://github.com/expressjs/morgan                 |


