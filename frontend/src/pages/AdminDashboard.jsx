import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");

    const fetchStats = async () => {
      const products = await API.get("/products");
      const orders = await API.get("/orders");

      setStats({
        products: products.data.length,
        orders: orders.data.length,
      });
    };

    fetchStats();
  }, [navigate]);

  const chartData = [
    { name: "Products", count: stats.products },
    { name: "Orders", count: stats.orders },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-black text-white p-4 flex justify-between">
        <h1 className="text-xl font-semibold">HM Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin/login");
          }}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl">{stats.products}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl">{stats.orders}</p>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white m-6 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">System Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
