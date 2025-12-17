import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user on refresh
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("hm_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Invalid user in storage", err);
      localStorage.removeItem("hm_user");
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      setUser(data);
      localStorage.setItem("hm_user", JSON.stringify(data));
      localStorage.setItem("hm_token", data.token);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hm_user");
    localStorage.removeItem("hm_token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use context safely
export const useAuth = () => {
  return useContext(AuthContext);
};
