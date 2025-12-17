// src/pages/KidsProductDetails.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const KidsProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ✅ SCROLL TO TOP */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return <div className="p-10">Product not found</div>;
  }

  const cartPayload = {
    id: state.id,
    name: state.title,
    image: state.img,
    price: Number(state.price.replace(/[^\d]/g, "")),
    qty: 1,
  };

  /* ✅ ADD TO CART */
  const handleAddToCart = () => {
    dispatch(addToCart(cartPayload));
  };

  /* ✅ BUY NOW */
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* IMAGE */}
      <img
        src={state.img}
        alt={state.title}
        className="w-full h-[500px] object-cover rounded"
      />

      {/* DETAILS */}
      <div>
        <h1 className="text-2xl font-semibold">
          {state.title}
        </h1>

        <p className="text-lg mt-2">
          {state.price}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-2">
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm">
            {state.rating} / 5
          </span>
        </div>

        <p className="mt-4 text-gray-700">
          {state.description}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">
          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* BUY NOW */}
          <button
            onClick={handleBuyNow}
            className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsProductDetails;
