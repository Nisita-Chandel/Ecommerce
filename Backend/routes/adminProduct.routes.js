import express from "express";
import { adminProtect } from "../middleware/adminMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// 📦 GET ALL PRODUCTS (ADMIN)
router.get("/", adminProtect, getProducts);

// 📦 GET PRODUCT BY ID (ADMIN)
router.get("/:id", adminProtect, getProductById);

// ➕ CREATE PRODUCT (ADMIN)
router.post("/", adminProtect, createProduct);

// ✏️ UPDATE PRODUCT (ADMIN)
router.put("/:id", adminProtect, updateProduct);

// 🗑 DELETE PRODUCT (ADMIN)
router.delete("/:id", adminProtect, deleteProduct);

export default router;
