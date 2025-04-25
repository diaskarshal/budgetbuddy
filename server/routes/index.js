import { Router } from "express";
import transactionRouter from "./transactionRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/transaction", transactionRouter);
router.use("/user", userRouter);

export default router;
