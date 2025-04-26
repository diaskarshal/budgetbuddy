import ApiError from "../error/ApiError.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import moment from "moment";

class TransactionController {
  async createTransaction(req, res, next) {
    try {
      const { title, amount, category, type, date, userId } = req.body;

      if (!title || !amount || !category || !type || !date) {
        return next(ApiError.badRequest("Please, fill all fields"));
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(ApiError.badRequest("No such user."));
      }

      let newTransaction = await Transaction.create({
        title,
        amount,
        category,
        type,
        date,
        user: userId,
      });
      user.transactions.push(newTransaction);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "New transaction was added successfully",
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { userId, type, frequency, startDate, endDate } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return next(ApiError.badRequest("No such user."));
      }

      const query = { user: userId };
      if (type !== "all") {
        query.type = type;
      }

      if (frequency !== "custom") {
        query.date = {
          $gt: moment().subtract(Number(frequency), "days").toDate(),
        };
      } else if (startDate && endDate) {
        query.date = {
          $gte: moment(startDate).toDate(),
          $lte: moment(endDate).toDate(),
        };
      }

      const transactions = await Transaction.find(query);
      return res.status(200).json({
        success: true,
        transactions,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const transaction = await Transaction.findById(id);
  //     if (!transaction) {
  //       return next(ApiError.badRequest("No such transaction."));
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       transaction,
  //     });
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async update(req, res, next) {
    try {
      const transactionId = req.params.id;
      const { title, amount, category, type, date } = req.body;

      const transactionElement = await Transaction.findById(transactionId);
      if (!transactionElement) {
        return next(ApiError.badRequest("No such transaction."));
      }

      if (title) transactionElement.title = title;
      if (amount) transactionElement.amount = amount;
      if (category) transactionElement.category = category;
      if (type) transactionElement.type = type;
      if (date) transactionElement.date = date;

      await transactionElement.save();

      return res.status(200).json({
        success: true,
        message: "Transaction updated successfully",
        transaction: transactionElement,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async deleteAll(req, res, next) {
  //   try {
  //     const { userId } = req.body;

  //     const user = await User.findById(userId);
  //     if (!user) {
  //       return next(ApiError.badRequest("No such user."));
  //     }

  //     await Transaction.deleteMany({ user: userId });
  //     user.transactions = [];
  //     await user.save();

  //     return res.status(200).json({
  //       success: true,
  //       message: "All transactions deleted successfully",
  //     });
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async deleteOne(req, res, next) {
    try {
      const transactionId = req.params.id;
      const userId = req.body.userId;

      const user = await User.findById(userId);
      if (!user) {
        return next(ApiError.badRequest("No such user."));
      }

      const transactionElement = await Transaction.findByIdAndDelete(
        transactionId
      );
      if (!transactionElement) {
        return next(ApiError.badRequest("No such transaction."));
      }

      user.transactions = user.transactions.filter(
        // (transaction) => transaction._id.toString() !== transactionId
        (transaction) => transaction._id.toString() === transactionId
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Transaction deleted successfully",
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new TransactionController();
