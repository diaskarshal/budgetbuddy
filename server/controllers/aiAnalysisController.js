import ApiError from "../error/ApiError.js";
import Transaction from "../models/transactionModel.js";
import { HfInference } from "@huggingface/inference";

class AIAnalysisController {
  constructor() {
    this.analyzeFinances = this.analyzeFinances.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
    this.createPrompt = this.createPrompt.bind(this);
  }

  async analyzeFinances(req, res, next) {
    try {
      const userId = req.user._id;
      const { question } = req.body;
      const transactions = await Transaction.find({ user: userId });
      const stats = this.calculateStats(transactions);
      const prompt = this.createPrompt(stats, question);
      const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
      const response = await hf.textGeneration({
        model: "gpt2",//change to a better one
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
        },
      });

      return res.json({
        success: true,
        analysis: response.generated_text,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  calculateStats(transactions) {
    const stats = {
      income: 0,
      expense: 0,
      byType: { income: 0, expense: 0 },
      byCategory: {},
    };

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount);
      if (transaction.type === "income") {
        stats.income += amount;
        stats.byType.income += 1;
      } else {
        stats.expense += amount;
        stats.byType.expense += 1;
      }
      if (!stats.byCategory[transaction.category]) {
        stats.byCategory[transaction.category] = { total: 0, count: 0 };
      }
      stats.byCategory[transaction.category].total += amount;
      stats.byCategory[transaction.category].count += 1;
    });

    return stats;
  }

  createPrompt(stats, question) {
    return `Savings Rate: ${(
      ((stats.income - stats.expense) / stats.income) *
      100
    ).toFixed(2)}% Income Categories:${Object.entries(stats.byCategory)
      .filter(([_, data]) => data.total > 0)
      .map(
        ([cat, data]) => `- ${cat}: ${data.total} (${data.count} transactions)`
      )
      .join("\n")} Expense Categories: ${Object.entries(stats.byCategory)
      .filter(([_, data]) => data.total < 0)
      .map(
        ([cat, data]) =>
          `- ${cat}: ${Math.abs(data.total)} (${data.count} transactions)`
      )
      .join("\n")} ${
      question ||
      "Analyze this financial situation and provide budget optimization advice."
    }
      Provide a concise analysis.`;
  }
}

export default new AIAnalysisController();
