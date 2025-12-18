import express from "express";
import User from "../models/user.js";

const router = express.Router();

// 🔴 TEMP ROUTE – DELETE AFTER USE
router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password,
      isAdmin: true,
    });

    res.json({
      _id: admin._id,
      email: admin.email,
      isAdmin: admin.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
