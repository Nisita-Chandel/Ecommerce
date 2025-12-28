import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  // 🔐 Protect admin routes
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-center border-b">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            🛒 Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            📦 Orders
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 mb-150">
          <button
            onClick={logoutHandler}
            className="w-full bg-red-500 text-white py-2 rounded-lg
                       hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Admin Dashboard
          </h1>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
