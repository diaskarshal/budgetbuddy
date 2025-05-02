import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../server/db.js";
import router from "../server/routes/index.js";
import errorHandler from "../server/middleware/ErrorHandlingMiddleware.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

connectDB();

export default app;
