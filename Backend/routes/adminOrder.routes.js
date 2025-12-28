import express from "express";
import Order from "../models/order.js";
import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 📦 ALL ORDERS (ADMIN)
router.get("/orders", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔄 UPDATE ORDER STATUS (ADMIN)
router.put("/order/:id/status", adminProtect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
