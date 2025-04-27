import express from "express";
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getAll);
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.deleteOne);
router.get("/stats", authMiddleware, transactionController.getStats);

export default router;
