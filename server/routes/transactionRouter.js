import express from "express";
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create new transaction
router.post("/", transactionController.createTransaction);

// Get transactions with filters
router.get("/", transactionController.getAll);
// router.get("/:id", transactionController.getOne);

// Update transaction
router.put("/:id", transactionController.update);
// router.delete("/", transactionController.deleteAll);

// Delete transaction
router.delete("/:id", transactionController.deleteOne);

export default router;
