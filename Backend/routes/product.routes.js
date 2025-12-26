import express from "express";
import { adminProtect } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// 🔍 SEARCH PRODUCTS
router.get("/search", searchProducts);

// 📦 GET ALL PRODUCTS
router.get("/", getProducts);

// 📦 GET PRODUCT BY ID
router.get("/:id", getProductById);

// ➕ CREATE PRODUCT (ADMIN)
router.post("/", adminProtect, createProduct);

// ✏️ UPDATE PRODUCT (ADMIN)
router.put("/:id", adminProtect, updateProduct);

// 🗑 DELETE PRODUCT (ADMIN)
router.delete("/:id", adminProtect, deleteProduct);

export default router;
