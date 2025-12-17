import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ladiesProducts from "../data/ladiesProducts";
import { addToCart } from "../store/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/favoritesSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = ladiesProducts.find((p) => p.id === id);
  const favourites = useSelector((state) => state.favorites.items);

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");

  /* ✅ SCROLL TO TOP */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ✅ SET IMAGE */
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  const isFavourite = favourites.some((item) => item.id === product.id);

  const payload = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: mainImage,
    selectedSize: size,
    qty,
  };

  /* ✅ BUY NOW HANDLER */
  const handleBuyNow = () => {
    if (!size) return;
    dispatch(addToCart(payload));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-[600px] object-cover rounded-xl cursor-pointer"
        />

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
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">₹{product.price}</p>

          {/* SIZES */}
          <div className="mb-6">
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded ${
                    size === s
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* ADD TO CART */}
            <button
              disabled={!size}
              onClick={() => dispatch(addToCart(payload))}
              className={`px-6 py-3 rounded ${
                size
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              disabled={!size}
              onClick={handleBuyNow}
              className={`px-6 py-3 rounded border ${
                size
                  ? "border-black text-black hover:bg-black hover:text-white transition"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              Buy Now
            </button>

            {/* FAVORITE */}
            <button
              onClick={() =>
                isFavourite
                  ? dispatch(removeFromFavorites(product.id))
                  : dispatch(addToFavorites(payload))
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

export default ProductDetails;
