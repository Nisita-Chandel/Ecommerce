import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await API.get("/admin/analytics");
      setTotalProducts(data.totalProducts);
      setOrdersData(
        data.ordersByDay.map((item) => ({
          date: item._id,
          orders: item.totalOrders,
        }))
      );
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl mt-2">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Orders (Last 7 Days)</h3>
          <p className="text-3xl mt-2">
            {ordersData.reduce((a, b) => a + b.orders, 0)}
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">
          Orders Trend (Last 7 Days)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
