import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

adminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("ADMIN TOKEN 👉", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default adminAPI;
