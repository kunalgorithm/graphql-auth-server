import User from "../../models/User";

export default {
  Query: {
    user: (root, args) => {
      console.log("Authpayload resolved called for user.");
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
