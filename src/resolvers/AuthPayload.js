const User = require("../../models/User");

module.exports = {
  Query: {
    user: (root, args) => {
      console.log("Authpayload resolved called for user.");
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: async (root, args) => {
      console.log("users");
      return new Promise((resolve, reject) => {
        User.find().exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
