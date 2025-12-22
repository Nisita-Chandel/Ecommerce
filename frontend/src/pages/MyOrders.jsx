import React, { useEffect, useState } from "react";
import API from "../api/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my-orders");
        setOrders(data);
      } catch (error) {
        alert("Please login to view orders");
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No orders found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">
        My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg mb-6 p-4 bg-white shadow"
        >
          <div className="flex justify-between mb-3">
            <p className="font-medium">
              Order ID: {order._id}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toDateString()}
            </p>
          </div>

          <p className="mb-2">
            <span className="font-medium">Status:</span>{" "}
            {order.status}
          </p>

          <div className="border-t pt-3">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover border rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-right font-semibold mt-3">
            Total: ₹{order.totalPrice}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
