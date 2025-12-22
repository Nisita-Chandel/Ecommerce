import React, { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

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

  const chartData = {
    labels: ordersByDay.map((item) => item._id),
    datasets: [
      {
        label: "Orders",
        data: ordersByDay.map((item) => item.totalOrders),
        borderColor: "black",
        backgroundColor: "rgba(0,0,0,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Products</p>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Orders (Last 7 Days)</p>
          <p className="text-3xl font-bold">
            {ordersByDay.reduce((sum, o) => sum + o.totalOrders, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">
          Orders Trend (Last 7 Days)
        </h3>

        {ordersByDay.length === 0 ? (
          <p className="text-gray-500">No orders in last 7 days</p>
        ) : (
          <Line data={chartData} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
