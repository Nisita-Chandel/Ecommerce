import React, { useEffect, useState } from "react";
import adminAPI  from "../api/api";
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

/* ✅ REGISTER ALL REQUIRED SCALES */
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true; // ✅ prevents double render issue

    const fetchAnalytics = async () => {
      try {
        const { data } = await adminAPI.get("/admin/analytics");

        if (mounted) {
          setTotalProducts(data.totalProducts);
          setOrdersByDay(data.ordersByDay);
          setLoading(false);
        }
      } catch (err) {
        console.error("Analytics error:", err);
        if (mounted) {
          setError("Failed to load analytics");
          setLoading(false);
        }
      }
    };

    fetchAnalytics();

    return () => {
      mounted = false; // ✅ cleanup
    };
  }, []);

  /* 🟢 CHART DATA */
  const chartData = {
    labels: ordersByDay.map((item) => item._id),
    datasets: [
      {
        label: "Orders",
        data: ordersByDay.map((item) => item.totalOrders),
        borderColor: "#000",
        backgroundColor: "rgba(0,0,0,0.2)",
        tension: 0.4,
      },
    ],
  };

  /* 🟢 CHART OPTIONS */
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category", // ✅ now works
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* STATS */}
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

      {/* CHART */}
      <div className="bg-white p-6 rounded shadow h-[350px]">
        <h3 className="text-lg font-semibold mb-4">
          Orders Trend (Last 7 Days)
        </h3>

        {ordersByDay.length === 0 ? (
          <p className="text-gray-500">No orders in last 7 days</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
