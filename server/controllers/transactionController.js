import ApiError from "../error/ApiError.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import moment from "moment";

class TransactionController {
  async createTransaction(req, res, next) {
    try {
      const { title, amount, category, type, date } = req.body;
      const userId = req.user._id;

      if (!title || !amount || !category || !type) {
        return next(ApiError.badRequest("Please, fill all required fields"));
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(ApiError.badRequest("No such user."));
      }

      const newTransaction = await Transaction.create({
        title,
        amount,
        category,
        type,
        date: date || new Date(),
        user: userId
      });

      if (!user.transactions) {
        user.transactions = [];
      }
      user.transactions.push(newTransaction._id);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "New transaction was added successfully",
        transaction: newTransaction
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { type, frequency, startDate, endDate, page = 1, limit = 10 } = req.query;
      const userId = req.user._id;

      const query = { user: userId };
      
      if (type && type !== "all") {
        query.type = type;
      }

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
      }

      if (Object.keys(dateFilter).length > 0) {
        query.date = dateFilter;
      }

      const total = await Transaction.countDocuments(query);

      const skip = (page - 1) * limit;
      const totalPages = Math.ceil(total / limit);

      const transactions = await Transaction.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('category', 'name type')
        .lean();

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
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages
        },
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
  //     const userId = req.user._id;

  //     const transaction = await Transaction.findOne({ _id: id, user: userId });
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
      const userId = req.user._id;

      const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
      if (!transaction) {
        return next(ApiError.badRequest("No such transaction."));
      }

      if (title) transaction.title = title;
      if (amount) transaction.amount = amount;
      if (category) transaction.category = category;
      if (type) transaction.type = type;
      if (date) transaction.date = date;

      await transaction.save();

      return res.status(200).json({
        success: true,
        message: "The transaction was updated successfully",
        transaction
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
      const userId = req.user._id;

      const transaction = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
      if (!transaction) {
        return next(ApiError.badRequest("No such transaction."));
      }

      await User.findByIdAndUpdate(userId, {
        $pull: { transactions: transactionId }
      });

      return res.status(200).json({
        success: true,
        message: "The transaction was deleted successfully"
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new TransactionController();
