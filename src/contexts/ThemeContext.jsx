import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  // 🔹 Initial load: detect saved or system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("mamz-theme");
    const savedSystem = localStorage.getItem("mamz-theme-system") !== "false";

    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      setIsSystemTheme(savedSystem);
    } else {
      setIsDark(mediaQuery.matches);
      setIsSystemTheme(true);
    }

    const handleSystemChange = (e) => {
      if (isSystemTheme) setIsDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [isSystemTheme]);

  // 🔹 Apply class & animation smooth transition
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);

    // Tambahkan transisi halus di background, text, dan elemen lainnya
    root.style.transition = "background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease, fill 0.6s ease";
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    setIsSystemTheme(false);
    localStorage.setItem("mamz-theme", next ? "dark" : "light");
    localStorage.setItem("mamz-theme-system", "false");
  };

  const resetToSystemTheme = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    setIsSystemTheme(true);
    localStorage.removeItem("mamz-theme");
    localStorage.setItem("mamz-theme-system", "true");
  };

  return (
    <ThemeContext.Provider
      value={{ isDark, isSystemTheme, toggleTheme, resetToSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
