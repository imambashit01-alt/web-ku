// src/contexts/CartContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // ✅ AMBIL Firestore dari firebase.js
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("mamz-cart");
    return stored ? JSON.parse(stored) : [];
  });

  // 🔥 Sync Firestore → Local + React state
  useEffect(() => {
    if (!user) return;

    const userCartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(userCartRef, (snap) => {
      if (snap.exists()) {
        const items = snap.data().items || [];
        setCart(items);
        localStorage.setItem("mamz-cart", JSON.stringify(items));
      }
    });

    return unsubscribe;
  }, [user]);

  // 🔥 Simpan localStorage & Firestore jika user login
  useEffect(() => {
    localStorage.setItem("mamz-cart", JSON.stringify(cart));

    if (user) {
      setDoc(
        doc(db, "carts", user.uid),
        {
          items: cart,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  }, [cart, user]);

  // 🎯 Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    toast.success("Added to cart!");
  };

  // 🗑 Remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔁 Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 🧹 Clear cart
  const clearCart = () => setCart([]);

  // 🧮 Cart totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
