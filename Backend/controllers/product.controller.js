// controllers/product.controller.js
import Product from "../models/Product.js";

// ✅ GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      brand,
      countInStock,
      image,
    } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      brand,
      countInStock,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
