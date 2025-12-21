import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-8">HM Admin</h2>

        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : ""
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : ""
            }
          >
            Orders
          </NavLink>
        </nav>

        <button
          onClick={logoutHandler}
          className="mt-10 bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
