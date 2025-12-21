import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    category: String,
    rating: Number,
    description: String,
  },
  { timestamps: true }
);

// ✅ PREVENT OverwriteModelError
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
