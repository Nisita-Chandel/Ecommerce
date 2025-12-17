
import React from "react";
import Navbar from "./components/layout/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import Footer from "./components/layout/Footer.jsx";

// ✅ ADD THESE
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <AppRoutes />
      </main>

      <Footer />

      {/* ✅ MUST BE HERE */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default App;
