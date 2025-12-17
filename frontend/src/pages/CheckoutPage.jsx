import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ CUSTOMER DETAILS STATE
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

  // ✅ LOAD RAZORPAY
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
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill all customer details");
      return;
    }

    if (total <= 0) {
      alert("Cart is empty");
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const res = await fetch("http://localhost:5000/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const order = await res.json();

    const options = {
      key: "rzp_test_Rqz6mQTZRldpAy",
      amount: order.amount,
      currency: "INR",
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
        console.log("Customer:", customer);
      },
      theme: { color: "#000000" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 md:p-8">
        
        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-1">Checkout</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your delivery details
        </p>
  
        {/* NAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
  
        {/* EMAIL & PHONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
  
        {/* ADDRESS */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Delivery Address
          </label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            rows="3"
            placeholder="House no, street, city, state, pincode"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>
  
        {/* TOTAL */}
        <div className="flex justify-between items-center border-t pt-4 mb-4">
          <span className="text-sm text-gray-600">Total Amount</span>
          <span className="text-lg font-semibold">₹{total}</span>
        </div>
  
        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-900 transition"
        >
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
  
};

export default CheckoutPage;
