import express from "express";
import { adminProtect } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

// ADMIN ONLY ROUTE
router.post("/admin/create", adminProtect, createProduct);

export default router;
