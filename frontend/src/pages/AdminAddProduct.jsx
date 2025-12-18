import React, { useState } from "react";
import API from "../api/api";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    rating: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/products", {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
      });

      alert("✅ Product saved to database");
      console.log("Saved:", data);

      setForm({
        name: "",
        image: "",
        price: "",
        category: "",
        rating: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error saving product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Product (Admin)</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" className="w-full border p-2" onChange={handleChange} value={form.name} />
        <input name="image" placeholder="Image URL" className="w-full border p-2" onChange={handleChange} value={form.image} />
        <input name="price" placeholder="Price" className="w-full border p-2" onChange={handleChange} value={form.price} />
        <input name="category" placeholder="Category" className="w-full border p-2" onChange={handleChange} value={form.category} />
        <input name="rating" placeholder="Rating" className="w-full border p-2" onChange={handleChange} value={form.rating} />
        <textarea name="description" placeholder="Description" className="w-full border p-2" onChange={handleChange} value={form.description} />

        <button className="bg-black text-white px-4 py-2 rounded">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
