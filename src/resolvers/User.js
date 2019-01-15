const User = require("../../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

module.exports = {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: async () => {
      try {
        const users = await User.find({}).exec();
        console.log("Queried users: ", users);
        return users;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    editUser: async (root, args) => {
      console.log("Editting user ", { args });
      let update = {};
      if (args.name) update.name = args.name;
      if (args.email) update.email = args.email;
      try {
        return User.findOneAndUpdate(
          { id: args.id },
          update,
          { new: true },
          (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              return doc;
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (root, { id }) => {
      console.log("Deleting user", id);
      try {
        return User.findOneAndDelete({ id }, (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            return doc;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    signup: async (root, args) => {
      try {
        const id = mongoose.Types.ObjectId();
        const password = await bcrypt.hash(args.password, 10);
        const user = await new User({ id, email: args.email, password }).save();
        console.log(user);

        const token = jwt.sign({ userId: user.id }, APP_SECRET);
        // return Authpayload
        console.log(`${args.email} has been signed up.`);
        return {
          token,
          user
        };
      } catch (error) {
        console.log(`${args.email} could not sign up. Got error: ${error}`);
      }
    },
    login: async (root, { email, password }) => {
      try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
          throw new Error("No such user found");
        }
        const valid = bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error("Invalid password");
        }
        const token = jwt.sign({ userId: user.id }, APP_SECRET);
        // return Authpayload
        console.log(`${email} has logged in.`);
        return {
          token,
          user
        };
      } catch (error) {
        console.log(`${email} could not log in. Got error: ${error}`);
      }
    }
  }
};
