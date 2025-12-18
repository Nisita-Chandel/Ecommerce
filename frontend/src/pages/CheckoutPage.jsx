import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // ✅ TOTAL AMOUNT
  const total = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? Number(item.price.replace(/[^\d]/g, ""))
        : Number(item.price);
    return sum + price * item.qty;
  }, 0);

  // ✅ LOAD RAZORPAY SDK
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ✅ PAYMENT HANDLER
  const handlePayment = async () => {
    // validation
    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      alert("Please fill all customer details");
      return;
    }

    if (total <= 0) {
      alert("Cart is empty");
      return;
    }

    // load Razorpay
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    let order;

    try {
      const res = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        throw new Error("Order creation failed");
      }

      order = await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Backend not reachable. Please start the server.");
      return;
    }

    // Razorpay options
    const options = {
      key: "rzp_test_Rqz6mQTZRldpAy", // frontend key only
      amount: order.amount,
      currency: order.currency,
      name: "H&M Clone",
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      handler: function (response) {
        alert("Payment Successful 🎉");

        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
        console.log("Customer:", customer);
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-1">Checkout</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your delivery details
        </p>

        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-md px-3 py-2 mb-3"
        />

        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-md px-3 py-2 mb-3"
        />

        <input
          type="tel"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-md px-3 py-2 mb-3"
        />

        <textarea
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          rows="3"
          className="w-full border rounded-md px-3 py-2 mb-4"
        />

        <div className="flex justify-between items-center border-t pt-4 mb-4">
          <span>Total Amount</span>
          <span className="font-semibold">₹{total}</span>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-black text-white py-3 rounded-md"
        >
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
