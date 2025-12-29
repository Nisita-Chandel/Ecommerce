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
router.get("/products", adminProtect, getProducts);

// 📦 GET PRODUCT BY ID (ADMIN)
router.get("/products/:id", adminProtect, getProductById);

// ➕ CREATE PRODUCT (ADMIN)
router.post("/products", adminProtect, createProduct);

// ✏️ UPDATE PRODUCT (ADMIN)
router.put("/products/:id", adminProtect, updateProduct);

// 🗑 DELETE PRODUCT (ADMIN)
router.delete("/products/:id", adminProtect, deleteProduct);

export default router;
