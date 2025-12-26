import React, { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await adminAPI.get("/admin/orders");
      setOrders(data);
    } catch (error) {
      console.error("Orders fetch error:", error);
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Orders</h2>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">
                  {order.user?.name} <br />
                  <span className="text-sm text-gray-500">
                    {order.user?.email}
                  </span>
                </td>
                <td className="p-3">₹{order.totalPrice}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
