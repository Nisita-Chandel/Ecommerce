import React, { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";
import { Line } from "react-chartjs-2";


const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [ordersByDay, setOrdersByDay] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await adminAPI.get("/admin/analytics");
        setTotalProducts(data.totalProducts);
        setOrdersByDay(data.ordersByDay);
      } catch (err) {
        console.error("Analytics error:", err);
        setError("Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <p>Total Products</p>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p>Orders (Last 7 Days)</p>
          <p className="text-3xl font-bold">
            {ordersByDay.reduce((sum, o) => sum + o.totalOrders, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="mb-4 font-semibold">Orders Trend</h3>
        {ordersByDay.length === 0 ? (
          <p>No orders in last 7 days</p>
        ) : (
          <Line
            data={{
              labels: ordersByDay.map((o) => o._id),
              datasets: [
                {
                  label: "Orders",
                  data: ordersByDay.map((o) => o.totalOrders),
                  borderColor: "black",
                  tension: 0.4,
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
