import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Contexts
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { CartProvider, useCart } from "./contexts/CartContext";
import { TranslateProvider } from "./context/TranslateContext";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import ToastContainer from "./components/ToastContainer";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import CartModal from "./components/CartModal";

// Zustand Store
import useLoginPopupStore from "./store/useLoginPopupStore";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import Dashboard from "./pages/Dashboard";

// Main Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import New from "./pages/New";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import Sale from "./pages/Sale";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GiftCards from "./pages/GiftCards";
import Support from "./pages/Support";
import SizeGuide from "./pages/SizeGuide";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";
import CheckoutPage from "./pages/CheckoutPage";
import TeamPresentation from "./pages/TeamPresentation";
import FAQPage from "./pages/FAQPage";
import TrackOrder from "./pages/TrackOrder";
import CareerPage from "./pages/CareerPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderDetails from "./pages/OrderDetails";

function AppContent() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { cartCount } = useCart();

  // Zustand Store (already fixed)
  const { isOpen, openPopup, closePopup, checkFirstVisit } = useLoginPopupStore();

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    checkFirstVisit();
  }, [checkFirstVisit]);

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
        <CustomCursor />
        <ToastContainer />

        <Navbar
          cartCount={cartCount}
          onCartClick={() => setIsCartModalOpen(true)}
          onUserClick={openPopup} // FIXED
          currentUser={user}
        />

        <AnimatePresence mode="wait">
          <Routes>
            {/* AUTH ROUTES */}
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/dashboard" replace /> : <Register />}
            />
            <Route
              path="/forgot-password"
              element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />}
            />
            <Route
              path="/verify-email"
              element={
                user && !user.emailVerified ? (
                  <EmailVerification />
                ) : user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/new" element={<New />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/story" element={<TeamPresentation />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/order-details" element={<OrderDetails />} />

            {/* HANDLING ROUTES THAT YOU DISABLED */}
            <Route path="/sustainability" element={<Navigate to="/" replace />} />
            <Route path="/news" element={<Navigate to="/" replace />} />
            <Route path="/locator" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        <Footer />

        {/* LOGIN POPUP */}
        {isOpen && <LoginPopup onClose={closePopup} />}

        {/* CART MODAL */}
        <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
      </div>
    </Router>
  );
}

// APP PROVIDERS WRAPPER
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <TranslateProvider>
            <AppContent />
          </TranslateProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
