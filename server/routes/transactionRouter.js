import express from "express";
import transactionController from "../controllers/transactionController.js";
// import { createTransaction, getAll, getOne, update, deleteAll, deleteOne } from '../controllers/transactionController.js';

const router = express.Router();

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getAll);
// router.get("/:id", transactionController.getOne);
router.put("/:id", transactionController.update);
// router.delete("/", transactionController.deleteAll);
router.delete("/:id", transactionController.deleteOne);

export default router;
