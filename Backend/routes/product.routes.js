// routes/product.routes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct
} from "../controllers/product.controller.js";

import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);

export default router;
