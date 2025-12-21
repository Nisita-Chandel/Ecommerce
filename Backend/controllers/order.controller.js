import Order from "../models/Order.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,     // from auth middleware
      orderItems: items,
      totalPrice: total,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
