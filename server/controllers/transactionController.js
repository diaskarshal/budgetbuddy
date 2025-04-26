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
      
      // Filter by transaction type
      if (type && type !== "all") {
        query.type = type;
      }

      // Date filtering logic
      let dateFilter = {};
      switch (frequency) {
        case "day":
          dateFilter = {
            $gte: moment().startOf('day').toDate(),
            $lte: moment().endOf('day').toDate()
          };
          break;
        case "week":
          dateFilter = {
            $gte: moment().startOf('week').toDate(),
            $lte: moment().endOf('week').toDate()
          };
          break;
        case "month":
          dateFilter = {
            $gte: moment().startOf('month').toDate(),
            $lte: moment().endOf('month').toDate()
          };
          break;
        case "year":
          dateFilter = {
            $gte: moment().startOf('year').toDate(),
            $lte: moment().endOf('year').toDate()
          };
          break;
        case "custom":
          if (startDate && endDate) {
            dateFilter = {
              $gte: moment(startDate).startOf('day').toDate(),
              $lte: moment(endDate).endOf('day').toDate()
            };
          }
          break;
        default:
          // If no frequency specified, get all transactions
          break;
      }

      if (Object.keys(dateFilter).length > 0) {
        query.date = dateFilter;
      }

      // Get transactions with sorting
      const transactions = await Transaction.find(query)
        .sort({ date: -1 }) // Sort by date descending (newest first)
        .lean(); // Convert to plain JavaScript objects for better performance

      // Calculate statistics
      const stats = {
        total: 0,
        income: 0,
        expense: 0,
        byCategory: {},
        byType: {
          income: 0,
          expense: 0
        }
      };

      transactions.forEach(transaction => {
        const amount = Number(transaction.amount);
        stats.total += transaction.type === 'income' ? amount : -amount;
        
        if (transaction.type === 'income') {
          stats.income += amount;
          stats.byType.income += amount;
        } else {
          stats.expense += amount;
          stats.byType.expense += amount;
        }

        // Group by category
        if (!stats.byCategory[transaction.category]) {
          stats.byCategory[transaction.category] = {
            total: 0,
            count: 0
          };
        }
        stats.byCategory[transaction.category].total += amount;
        stats.byCategory[transaction.category].count += 1;
      });

      return res.status(200).json({
        success: true,
        transactions,
        stats,
        filter: {
          type,
          frequency,
          startDate: dateFilter.$gte,
          endDate: dateFilter.$lte
        }
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
