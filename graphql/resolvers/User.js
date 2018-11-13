import User from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET, getUserId } from "../utils";

export default {
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
        return await User.find({}).exec();
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    editUser: async (root, { id, name, email }) => {
      try {
        User.findByIdAndUpdate({ id }, { $set: { name, email } });
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (root, args) => {
      try {
        User.findByIdAndDelete(args);
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
