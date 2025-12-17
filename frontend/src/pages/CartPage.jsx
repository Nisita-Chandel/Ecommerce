import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../store/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
          className="flex items-center justify-between border p-4 mb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-32 object-cover border"
            />

            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Size: {item.selectedSize} | Color: {item.selectedColor}
              </p>
              <p className="font-medium">₹{item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  disabled={item.qty === 1}
                  className="border px-2 disabled:opacity-50"
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="border px-2"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold">Total: ₹{total}</p>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-800"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
