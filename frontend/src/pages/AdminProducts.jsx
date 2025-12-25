import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: "", // final image URL
    price: "",
    category: "",
    rating: "",
    description: "",
  });

  const fetchProducts = async () => {
    const { data } = await API.get("/admin/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ ADD or ✏️ UPDATE
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload image or enter image URL");
      return;
    }

    try {
      if (editingId) {
        await API.put(`/admin/product/${editingId}`, form);
      } else {
        await API.post("/admin/products", form); // ✅ FIXED
      }
    
      setForm({
        name: "",
        image: "",
        price: "",
        category: "",
        rating: "",
        description: "",
      });
    
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("PRODUCT SAVE ERROR:", error.response?.data || error);
      alert("Failed to save product");
    }
    
  }

  const deleteHandler = async (id) => {
    await API.delete(`/admin/product/${id}`);
    fetchProducts();
  };

  // ✏️ LOAD PRODUCT INTO FORM
  const editHandler = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      rating: product.rating,
      description: product.description,
    });
  };

  // 📸 IMAGEKIT UPLOAD
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await API.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, image: data.imageUrl });
      setUploading(false);
    } catch (error) {
      setUploading(false);
      alert("Image upload failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Products</h2>

      {/* ================= FORM ================= */}
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow mb-10"
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Product Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* IMAGE URL OPTION */}
          <input
            placeholder="Paste Image URL (optional)"
            className="border p-2 rounded"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          {/* IMAGE FILE OPTION */}
          <input
            type="file"
            className="border p-2 rounded"
            onChange={uploadImageHandler}
          />

          <input
            placeholder="Price"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Category"
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            placeholder="Rating"
            className="border p-2 rounded"
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="border p-2 rounded col-span-2"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* UPLOADING */}
        {uploading && (
          <p className="text-sm text-gray-500 mt-2">
            Uploading image...
          </p>
        )}

        {/* IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-32 h-32 mt-4 object-cover border rounded"
          />
        )}

        <button className="mt-6 w-full bg-black text-white py-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                </td>

                <td className="p-3">{p.name}</td>
                <td className="p-3">₹{p.price}</td>

                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => editHandler(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHandler(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
