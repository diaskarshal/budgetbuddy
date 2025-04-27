import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please, specify the title."],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please, specify the amount."],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please, specify the category."],
      enum: {
        values: ['food', 'transportation', 'rent', 'salary', 'freelance'],
        message: 'Please, provide a valid category.'
      },
    },
    type: {
      type: String,
      enum: {
        values: ["expense", "income"],
        message: "Please, specify whether is it expense or income.",
      },
      required: [true, "Please, specify the type."],
    },
    date: {
      type: Date,
      required: [true, "Please, specify the date."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
