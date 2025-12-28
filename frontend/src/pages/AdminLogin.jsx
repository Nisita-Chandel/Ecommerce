import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAPI from "../api/adminApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ CORRECT ENDPOINT
      const { data } = await adminAPI.post("/admin/login", {
        email,
        password,
      });

      console.log("ADMIN LOGIN RESPONSE 👉", data);

      // ✅ SAVE TOKEN
      localStorage.setItem("adminToken", data.token);

      console.log(
        "ADMIN TOKEN AFTER SAVE 👉",
        localStorage.getItem("adminToken")
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data);
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="border p-6 w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
