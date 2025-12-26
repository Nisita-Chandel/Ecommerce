import React, { useState } from "react";

import ladiesProducts from "../data/ladiesProducts";
import menProducts from "../data/menProducts";
import kidsProducts from "../data/kidsProducts";
import beautyProducts from "../data/beautyProducts";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  // 🔹 MERGE ALL PRODUCTS
  const allProducts = [
    ...ladiesProducts.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      category: "Ladies",
    })),

    ...menProducts.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      category: "Men",
    })),

    ...kidsProducts.map((p) => ({
      id: p.id,
      name: p.title,
      image: p.img,
      price: p.price,
      category: "Kids",
    })),

    ...beautyProducts.map((p) => ({
      id: p.id,
      name: p.title,
      image: p.img,
      price: p.price,
      category: "Beauty",
    })),
  ];

  // 🔍 FILTER WHILE TYPING
  const filteredProducts =
    query.trim() === ""
      ? []
      : allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase().trim())
        );

  return (
    <div className="max-w-5xl mx-auto px-4 mt-6">
      <h1 className="text-xl font-semibold mb-4">Search Products</h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search for items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2
                   focus:ring-2 focus:ring-black focus:outline-none"
      />

      {/* RESULTS */}
      <div className="mt-6">
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 hover:shadow"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 text-sm font-medium">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {p.category}
                </p>
                <p className="text-sm font-semibold">
                  ₹{p.price}
                </p>
              </div>
            ))}
          </div>
        )}

        {query && filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-4">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
