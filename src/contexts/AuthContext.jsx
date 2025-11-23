import React, { createContext, useContext, useState, useEffect } from "react";
import { decodeGoogleCredential, saveUserToStorage, getUserFromStorage, clearUserStorage } from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/tokenManager";
import { loginUser, registerUser, loginWithGoogle, verifyToken } from "../api/authAPI";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      const storedUser = getUserFromStorage();

      if (token && storedUser) {
        try {
          const response = await verifyToken(token);
          if (response.valid) {
            setUser(storedUser);
          } else {
            clearUserStorage();
            removeToken();
          }
        } catch (error) {
          clearUserStorage();
          removeToken();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      setToken(response.token);
      saveUserToStorage(response.user);
      setUser(response.user);
      toast.success("Login successful!");
      return { success: true, user: response.user };
    } catch (error) {
      toast.error("Login failed");
      return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      const response = await registerUser(email, password, name);
      setToken(response.token);
      saveUserToStorage(response.user);
      setUser(response.user);
      toast.success("Account created successfully!");
      return { success: true, user: response.user };
    } catch (error) {
      toast.error("Registration failed");
      return { success: false, error: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (credential) => {
    try {
      setLoading(true);
      const decodedUser = decodeGoogleCredential(credential);
      if (!decodedUser) throw new Error("Invalid credential");

      const response = await loginWithGoogle(credential);
      setToken(response.token);
      saveUserToStorage(decodedUser);
      setUser(decodedUser);
      toast.success("Google login successful!");
      return { success: true, user: decodedUser };
    } catch (error) {
      toast.error("Google login failed");
      return { success: false, error: "Google login failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      clearUserStorage();
      removeToken();
      setUser(null);
      toast.success("Logged out successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to logout");
      return { success: false, error: "Failed to logout" };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    googleLogin,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
