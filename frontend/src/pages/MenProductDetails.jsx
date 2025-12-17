import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import menProducts from "../data/menProducts";

const MenProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ✅ SCROLL TO TOP */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔒 SAFE FIND
  const product = menProducts?.find(
    (p) => String(p.id) === String(id)
  );

  // ❌ If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">Product not found</p>
        <button
          onClick={() => navigate("/men")}
          className="border px-6 py-2 rounded"
        >
          Go back
        </button>
      </div>
    );
  }

  /* ✅ ADD TO CART */
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1,
      })
    );
  };

  /* ✅ BUY NOW */
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
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
          <h1 className="text-3xl font-semibold mb-2">
            {product.name}
          </h1>

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

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-semibold mb-6">
            ₹{product.price}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              className="border border-black px-8 py-3 rounded hover:bg-black hover:text-white transition"
            >
              Buy Now
            </button>

            {/* BACK */}
            <button
              onClick={() => navigate(-1)}
              className="border px-8 py-3 rounded"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenProductDetails;
