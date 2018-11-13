import User from "../../models/User";

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Mutation: {
    addUser: (root, { id, name, email }) => {
      const newUser = new User({ id, name, email });
      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject : resolve(res);
        });
      });
    },
    editUser: (root, { id, name, email }) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(
          { id },
          { $set: { name, email } },
          (err, res) => {
            err ? reject : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(args, (err, res) => {
          err ? reject : resolve(res);
        });
      });
    }
  }
};
