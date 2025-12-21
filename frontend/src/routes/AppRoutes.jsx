import React from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import HomeLayout from "../components/layout/HomeLayout.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";

// user pages
import HomePage from "../pages/HomePage.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import FavoritePage from "../pages/FavoritePage.jsx";
import LadiesPage from "../pages/LadiesPage.jsx";
import MenPage from "../pages/MenPage.jsx";
import KidsPage from "../pages/KidsPage.jsx";
import BeautyPage from "../pages/BeautyPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import GoogleSuccess from "../pages/GoogleSuccess.jsx";

// admin pages
import AdminLogin from "../pages/AdminLogin.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminProducts from "../pages/AdminProducts.jsx";
import AdminOrders from "../pages/AdminOrders.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= USER AREA ================= */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/ladies" element={<LadiesPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/beauty" element={<BeautyPage />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ================= ADMIN AREA ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
