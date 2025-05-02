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
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("vercel.app") ||
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

connectDB();

export default app;
