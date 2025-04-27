import { Router } from "express";
import transactionRouter from "./transactionRouter.js";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import aiRouter from "./aiRouter.js";

const router = Router();

router.use("/transaction", transactionRouter);
router.use("/user", userRouter);
router.use("/categories", categoryRouter);
router.use("/ai", aiRouter);

// console.log("All routes registered");

export default router;
