import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  // 👇 USE USER TOKEN FOR NORMAL APIs
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    req.headers.Authorization = `Bearer ${userToken}`;
  }

  return req;
});

export default API;
