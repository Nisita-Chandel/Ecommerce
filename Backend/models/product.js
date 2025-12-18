import mongoose from "mongoose";

const productSchema = mongoose.Schema(
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

export default mongoose.model("Product", productSchema);
