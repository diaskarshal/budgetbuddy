import express from "express";
import aiAnalysisController from "../controllers/aiAnalysisController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/analyze", aiAnalysisController.analyzeFinances);

export default router;
