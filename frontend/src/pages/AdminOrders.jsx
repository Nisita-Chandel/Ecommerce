import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get("/orders");
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-3 rounded">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
