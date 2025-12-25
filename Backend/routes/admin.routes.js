import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📊 DASHBOARD ANALYTICS
router.get("/analytics", adminProtect, async (req, res) => {
  try {
    // Products count
    const totalProducts = await Product.countDocuments();

    // Orders in last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const ordersByDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalProducts,
      ordersByDay,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
