import { Router } from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import { registration, login,  } from '../controllers/userController.js';

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.auth);

export default router;
