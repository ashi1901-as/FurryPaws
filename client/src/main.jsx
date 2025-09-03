import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { HelmetProvider } from "react-helmet-async"; // ✅ import HelmetProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Wrap your app */}
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastContainer
            style={{
              fontSize: "14px",
              zIndex: 900,
            }}
            autoClose={2000}
          />
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
