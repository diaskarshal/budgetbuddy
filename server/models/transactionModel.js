import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
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
  },
  description: {
    type: String,
    required: [true, "Please, specify the description."],
  },
  transactionType: {
    type: String,
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
