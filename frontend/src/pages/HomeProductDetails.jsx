import React from "react";
import { useParams } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import homeProducts from "../data/homeProducts";
import { addToCart } from "../store/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/favoritesSlice";

const HomeProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = homeProducts.find((p) => p.id === id);
  const favourites = useSelector((state) => state.favorites.items);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const isFavourite = favourites.some((item) => item.id === product.id);

  const cartPayload = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    qty: 1,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-14">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[600px] object-cover rounded-xl"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

          {/* RATING */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {product.rating}/5
            </span>
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold mb-6">
            ₹{product.price}
          </p>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(addToCart(cartPayload))}
              className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() =>
                isFavourite
                  ? dispatch(removeFromFavorites(product.id))
                  : dispatch(addToFavorites(product))
              }
              className="w-12 h-12 border rounded-full flex items-center justify-center"
            >
              <Heart
                className={
                  isFavourite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductDetails;
