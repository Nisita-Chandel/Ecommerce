import express from "express";
import Product from "../models/product.js";
import { adminProtect } from "../middleware/adminMiddleware.js";
import imagekit from "../config/imagekit.js";
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router();

router.post(
    "/upload",
    adminProtect,
    upload.single("image"),
    async (req, res) => {
      try {
        const file = req.file;
  
        const response = await imagekit.upload({
          file: file.buffer.toString("base64"),
          fileName: file.originalname,
          folder: "hm-products",
        });
  
        res.json({ imageUrl: response.url });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
  
// ➕ ADD PRODUCT (ADMIN)
router.post("/product", adminProtect, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📦 GET ALL PRODUCTS (ADMIN)
router.get("/products", adminProtect, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🗑 DELETE PRODUCT (ADMIN)
router.delete("/product/:id", adminProtect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✏️ UPDATE PRODUCT (ADMIN)
router.put("/product/:id", adminProtect, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
export default router;
