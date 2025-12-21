import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await API.get("/admin/orders");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/admin/order/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">
                    {order.user?.name} <br />
                    <span className="text-sm text-gray-500">
                      {order.user?.email}
                    </span>
                  </td>

                  <td className="p-3">₹{order.totalPrice}</td>

                  <td className="p-3 font-semibold">
                    {order.status}
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        updateStatus(order._id, "Shipped")
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Shipped
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order._id, "Delivered")
                      }
                      className="text-green-600 hover:underline"
                    >
                      Delivered
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
