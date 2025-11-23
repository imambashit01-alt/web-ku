// utils/auth.js

import { jwtDecode } from "jwt-decode";

// Decode Google Credential
export const decodeGoogleCredential = (credential) => {
  try {
    const decoded = jwtDecode(credential);

    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      email_verified: decoded.email_verified,
      method: "Google OAuth",
      createdAt: new Date().toISOString(),
    };

  } catch (error) {
    console.error("Error decoding Google credential:", error);
    return null;
  }
};

// Save user to localStorage
export const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem("mamz-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("mamz-user");
    }
  } catch (error) {
    console.error("Error saving user to storage:", error);
  }
};

// Get user from localStorage
export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("mamz-user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user from storage:", error);
    return null;
  }
};

// Clear user data
export const clearUserStorage = () => {
  try {
    localStorage.removeItem("mamz-user");
  } catch (error) {
    console.error("Error clearing user storage:", error);
  }
};
export const authAPI = {
  login: async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      return await res.json();

    } catch (err) {
      console.error("Login error:", err);
      return { error: true, message: "Failed to login" };
    }
  },

  register: async (email, password, name) => {
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });

      return await res.json();

    } catch (err) {
      console.error("Register error:", err);
      return { error: true, message: "Failed to register" };
    }
  }
};
