import { Router } from "express";
import transactionRouter from "./transactionRouter.js";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";

const router = Router();

router.use("/transaction", transactionRouter);
router.use("/user", userRouter);
router.use("/categories", categoryRouter);

export default router;
