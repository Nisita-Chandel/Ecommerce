import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Products</h2>

      {products.map((p) => (
        <div key={p._id} className="flex justify-between border p-3 mb-2">
          <span>{p.name}</span>
          <button
            onClick={() => deleteProduct(p._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
