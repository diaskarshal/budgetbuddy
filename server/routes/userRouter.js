import { Router } from "express";
import { registration, login, auth } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/auth", authMiddleware, auth);

export default router;
