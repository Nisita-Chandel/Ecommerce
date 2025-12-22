import Order from "../models/Order.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    console.log("REQ USER:", req.user);
    console.log("ITEMS:", items);

    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // ✅ Normalize items
    const orderItems = items.map((item) => ({
      name: item.name,
      qty: item.qty || 1,
      price: Number(item.price),
      image: item.image,
    }));

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice: Number(total),
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("ORDER SAVE ERROR:", error);
    res.status(500).json({ message: "Order save failed" });
  }
};

// ✅ GET LOGGED-IN USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
