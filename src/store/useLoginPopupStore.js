import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginPopupStore = create(
  persist(
    (set, get) => ({
      isOpen: false,
      hasVisited: false,

      // Auth mode
      authMode: "login",

      // Form data
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",

      // UI states
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false,

      // Google OAuth specific
      googleEmail: "",
      googleUserData: null,

      // ──────────────────────────────────────────
      // Popup Actions
      // ──────────────────────────────────────────
      openPopup: (mode = "login") =>
        set({
          isOpen: true,
          authMode: mode,
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
          googleEmail: "",
          googleUserData: null,
        }),

      closePopup: () =>
        set({
          isOpen: false,
          authMode: "login",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
          googleEmail: "",
          googleUserData: null,
        }),

      setHasVisited: () => set({ hasVisited: true }),

      // ──────────────────────────────────────────
      // ❗ Fixed checkFirstVisit
      // ──────────────────────────────────────────
      checkFirstVisit: () => {
        const { hasVisited, openPopup } = get();

        if (!hasVisited) {
          setTimeout(() => {
            openPopup();
            get().setHasVisited(); // FIXED
          }, 2000);
        }
      },

      // ──────────────────────────────────────────
      // Loading
      // ──────────────────────────────────────────
      setLoading: (loading) => set({ isLoading: loading }),

      // Form setters
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setFirstName: (firstName) => set({ firstName }),
      setLastName: (lastName) => set({ lastName }),
      setConfirmPassword: (confirmPassword) => set({ confirmPassword }),

      // Toggles
      toggleShowPassword: () =>
        set((state) => ({ showPassword: !state.showPassword })),

      toggleShowConfirmPassword: () =>
        set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

      // Mode switching
      switchToLogin: () => set({ authMode: "login" }),
      switchToRegister: () => set({ authMode: "register" }),

      switchToGooglePassword: (email, userData) =>
        set({
          authMode: "google-password",
          googleEmail: email,
          googleUserData: userData,
          password: "",
        }),

      // Clear form
      clearForm: () =>
        set({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
          googleEmail: "",
          googleUserData: null,
        }),

      // Validators
      validateLoginForm: () => {
        const { email, password } = get();
        return email.trim() && password.trim();
      },

      validateRegisterForm: () => {
        const { email, password, confirmPassword, firstName, lastName } = get();
        return (
          email.trim() &&
          password.trim() &&
          confirmPassword.trim() &&
          firstName.trim() &&
          lastName.trim() &&
          password === confirmPassword &&
          password.length >= 6
        );
      },

      validateGooglePasswordForm: () => {
        const { password } = get();
        return password.trim() && password.length >= 6;
      },
    }),
    {
      name: "login-popup-storage", // Persist key
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
  )
);

export default useLoginPopupStore;
