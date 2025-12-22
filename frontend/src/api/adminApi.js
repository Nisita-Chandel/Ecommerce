import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

adminAPI.interceptors.request.use((req) => {
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    req.headers.Authorization = `Bearer ${adminToken}`;
  }

  return req;
});

export default adminAPI;
