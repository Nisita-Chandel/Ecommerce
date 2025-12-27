import React, { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";

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
        console.error("❌ ANALYTICS ERROR:", err.response?.data);
        setError("Admin not logged in");
      }
    };

    fetchAnalytics();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Products: {totalProducts}</p>
      <p>
        Orders (7 days):{" "}
        {ordersByDay.reduce((s, o) => s + o.totalOrders, 0)}
      </p>
    </div>
  );
};

export default AdminDashboard;
