import express from "express";
import Order from "../models/Order.js";
import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 📦 GET ALL ORDERS (ADMIN)
router.get("/orders", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔄 UPDATE ORDER STATUS (ADMIN)
router.put("/order/:id/status", adminProtect, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
