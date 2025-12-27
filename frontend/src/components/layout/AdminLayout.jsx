import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

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
    <div className="flex">
      <aside>
        <button onClick={logoutHandler}>Logout</button>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
