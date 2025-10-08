import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./fonts.css";
import { ToastContainer, Bounce } from "react-toastify";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CompareProvider } from "./contexts/CompareContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";

// Check if device is mobile
const isMobile = window.innerWidth <= 768;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CompareProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </CompareProvider>
    </WishlistProvider>
    <ToastContainer
      position={isMobile ? "top-right" : "top-right"}
      autoClose={isMobile ? 1000 : 1500}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable={!isMobile}
      pauseOnHover={!isMobile}
      theme="light"
      transition={Bounce}
      style={{
        width: isMobile ? "90vw" : "auto",
        maxWidth: isMobile ? "400px" : "500px",
      }}
      toastStyle={{
        fontSize: isMobile ? "14px" : "16px",
        minHeight: isMobile ? "48px" : "44px",
        padding: isMobile ? "12px 16px" : "12px",
        margin: isMobile ? "4px auto" : "8px",
        borderRadius: isMobile ? "8px" : "4px",
        wordBreak: "break-word",
      }}
    />
  </StrictMode>
);