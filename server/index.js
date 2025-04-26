import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

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

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.error("MongoDB connection failed:", e);
  }
};

start();
