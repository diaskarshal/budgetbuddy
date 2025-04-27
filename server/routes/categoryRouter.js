import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Category from "../models/categoryModel.js";
import ApiError from "../error/ApiError.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { categoryName, type } = req.body;
    if (!categoryName || !type) {
      return next(ApiError.badRequest("Category name and type are required"));
    }
    const category = await Category.create({ categoryName: categoryName, type });
    return res.json(category);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
});

export default router;
