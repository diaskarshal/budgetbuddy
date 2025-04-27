import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import Category from "./models/categoryModel.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "good" });
});

const seedCategories = async () => {
  const count = await Category.countDocuments();
  if (count === 0) {
    console.log("Seeding default categories...");
    const defaultCategories = [
      { categoryName: "food", type: "expense" },
      { categoryName: "transportation", type: "expense" },
      { categoryName: "rent", type: "expense" },
      { categoryName: "salary", type: "income" },
      { categoryName: "freelance", type: "income" }
    ];
    
    try {
      await Category.insertMany(defaultCategories);
      console.log("Default categories created!");
    } catch (error) {
      console.error("Error seeding categories:", error);
    }
  }
};

// Call this after DB connection
const start = async () => {
  try {
    await connectDB();
    await seedCategories(); // Add this line
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.error("MongoDB connection failed:", e);
  }
};

start();
