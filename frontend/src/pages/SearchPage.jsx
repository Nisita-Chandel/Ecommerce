// src/pages/SearchPage.jsx
import React, { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  // Dummy products (replace later with API data)
  const products = [
    { id: 1, name: "White T-Shirt" },
    { id: 2, name: "Black Hoodie" },
    { id: 3, name: "Blue Jeans" },
    { id: 4, name: "Red Dress" },
    { id: 5, name: "Beauty Cream" },
  ];

  // Filter logic
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      <h1 className="text-xl font-semibold mb-4">Search Products</h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search for items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
      />

      {/* RESULTS */}
      <div className="mt-6">
        {query && (
          <p className="text-gray-600 mb-3">
            Showing results for: <span className="font-medium">{query}</span>
          </p>
        )}

        {filteredProducts.length > 0 ? (
          <ul className="space-y-2">
            {filteredProducts.map((p) => (
              <li
                key={p.id}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                {p.name}
              </li>
            ))}
          </ul>
        ) : (
          query && (
            <p className="text-gray-500 mt-4">No products found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
