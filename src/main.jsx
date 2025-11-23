import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { TranslateProvider } from "./context/TranslateContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <LanguageProvider>
            <TranslateProvider>
              <App />
            </TranslateProvider>
          </LanguageProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

