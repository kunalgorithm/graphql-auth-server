import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
