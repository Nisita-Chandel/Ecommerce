import express from "express";
import { adminProtect } from "../middleware/authMiddleware.js";
import { getAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/admin/orders", adminProtect, getAllOrders);

export default router;
