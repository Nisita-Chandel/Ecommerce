import express from "express";
import { createAdmin, adminLogin } from "../controllers/admin.controller.js";
import { adminProtect } from "../middleware/adminMiddleware.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

const router = express.Router();

// ================= ADMIN AUTH =================
router.post("/create-admin", createAdmin); // run once
router.post("/login", adminLogin);

// ================= ADMIN ANALYTICS =================
// ⚠️ MUST be before any dynamic routes
router.get("/analytics", adminProtect, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const ordersByDay = await Order.aggregate([
      {
        $match: { createdAt: { $gte: last7Days } },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
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
    console.error("ANALYTICS ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
