import { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const { data } = await adminAPI.get("/admin/analytics");
      setAnalytics(data);
    } catch (error) {
      console.error("❌ ANALYTICS ERROR:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // ✅ LOGOUT HANDLER
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Admin Dashboard
        </h1>

        {/* 🔴 LOGOUT BUTTON */}
        
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">
            Total Products
          </h2>
          <p className="text-4xl font-bold mt-2">
            {analytics.totalProducts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">
            Orders (Last 7 Days)
          </h2>
          <p className="text-4xl font-bold mt-2">
            {analytics.ordersByDay.reduce(
              (sum, day) => sum + day.totalOrders,
              0
            )}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">
            Active Days
          </h2>
          <p className="text-4xl font-bold mt-2">
            {analytics.ordersByDay.length}
          </p>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Orders in Last 7 Days
        </h2>

        {analytics.ordersByDay.length === 0 ? (
          <p className="text-gray-500">
            No orders found.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2">Date</th>
                <th className="py-2">Total Orders</th>
              </tr>
            </thead>
            <tbody>
              {analytics.ordersByDay.map((day) => (
                <tr
                  key={day._id}
                  className="border-b last:border-none"
                >
                  <td className="py-2">{day._id}</td>
                  <td className="py-2 font-medium">
                    {day.totalOrders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
