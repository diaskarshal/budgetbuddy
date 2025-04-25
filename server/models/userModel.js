import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, write your name."],
    },
    email: {
      type: String,
      required: [true, "Please, write your email."],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please, write your password."],
    },
    transactions: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
