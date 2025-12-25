import express from "express";
import Order from "../models/order.js";
import { adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📦 ALL ORDERS
router.get("/orders", adminProtect, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// 🔄 UPDATE STATUS
router.put("/order/:id/status", adminProtect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status;
  await order.save();

  res.json(order);
});

export default router;
