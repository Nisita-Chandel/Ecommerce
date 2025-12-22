import { Routes, Route } from "react-router-dom";
import HomeLayout from "../components/layout/HomeLayout.jsx";

/* USER PAGES */
import HomePage from "../pages/HomePage.jsx";
import LadiesPage from "../pages/LadiesPage.jsx";
import MenPage from "../pages/MenPage.jsx";
import KidsPage from "../pages/KidsPage.jsx";
import BeautyPage from "../pages/BeautyPage.jsx";

/* PRODUCT DETAILS */
import MenProductDetails from "../pages/MenProductDetails.jsx";
import KidsProductDetails from "../pages/KidsProductDetails.jsx";
import BeautyProductDetails from "../pages/BeautyProductDetails.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";

/* OTHER USER PAGES */
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import FavoritePage from "../pages/FavoritePage.jsx";
import SearchPage from "../pages/SearchPage.jsx";

/* AUTH */
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";

/* ADMIN */
import AdminLayout from "../components/layout/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminProducts from "../pages/AdminProducts.jsx";
import AdminOrders from "../pages/AdminOrders.jsx";
import AdminLogin from "../pages/AdminLogin.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= USER LAYOUT ================= */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ladies" element={<LadiesPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/beauty" element={<BeautyPage />} />

        {/* ✅ PRODUCT DETAILS ROUTES */}
        <Route path="/men/:id" element={<MenProductDetails />} />
        <Route path="/kids-product-details" element={<KidsProductDetails />} />
        <Route path="/beauty-product-details" element={<BeautyProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
