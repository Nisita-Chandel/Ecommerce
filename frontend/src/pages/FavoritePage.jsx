import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { removeFromFavorites } from "../store/favoritesSlice";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favorites.items);

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No favourites yet ❤️
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Your Favourites
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favourites.map((item) => (
          <div key={item.id} className="relative border rounded-lg overflow-hidden p-3">

            {/* ✅ IMAGE FIX */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-72 object-cover"
            />

            {/* ❤️ REMOVE FROM FAVORITES */}
            <button
              onClick={() => dispatch(removeFromFavorites(item.id))}
              className="absolute top-2 right-2 bg-black/40 p-2 rounded-full backdrop-blur shadow"
            >
              <FaHeart className="text-red-500" />
            </button>

            {/* TITLE */}
            <p className="mt-2 text-sm">{item.name}</p>

            {/* PRICE */}
            <p className="text-sm font-medium">
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
