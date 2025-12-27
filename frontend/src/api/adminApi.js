import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

adminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  console.log("📤 ADMIN TOKEN SENT:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminAPI;
