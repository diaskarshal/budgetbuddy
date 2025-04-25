import express from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../controllers/authMiddleware";

const router = express.Router();
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.auth);

module.exports = router;
