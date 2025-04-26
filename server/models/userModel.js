import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please, write your email."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please, provide a valid email'],
    },
    password: {
      type: String,
      required: [true, "Please, write your password."],
    },
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: []
    }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
