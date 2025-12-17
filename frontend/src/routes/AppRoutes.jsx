import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeLayout from "../components/layout/HomeLayout.jsx";

import HomePage from "../pages/HomePage.jsx";
import HomeProductDetails from "../pages/HomeProductDetails.jsx";

import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import FavoritePage from "../pages/FavoritePage.jsx";
import LadiesPage from "../pages/LadiesPage.jsx";
import MenPage from "../pages/MenPage.jsx";
import KidsPage from "../pages/KidsPage.jsx";
import KidsProductDetails from "../pages/KidsProductDetails.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import BeautyPage from "../pages/BeautyPage.jsx";

import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import GoogleSuccess from "../pages/GoogleSuccess.jsx";
import MenProductDetails from "../pages/MenProductDetails.jsx";
import BeautyProductDetails from "../pages/BeautyProductDetails.jsx";


const AppRoutes = () => {
  return (
    <Routes>

      {/* PAGES WITH NAVBAR */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home/:id" element={<HomeProductDetails />} />



        {/* ✅ FIXED ROUTE */}
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/ladies" element={<LadiesPage />} />
        <Route path="/men" element={<MenPage />} />

        <Route path="/men/:id" element={<MenProductDetails />} />


        <Route path="/kids" element={<KidsPage />} />
        <Route path="/kids-product-details" element={<KidsProductDetails />} />

        <Route path="/beauty" element={<BeautyPage />} />

        <Route
  path="/beauty-product-details"
  element={<BeautyProductDetails />}
/>

        <Route path="/google-success" element={<GoogleSuccess />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

    </Routes>
  );
};

export default AppRoutes;
