import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translate, detectLanguage } from "../utils/translator";

const TranslateContext = createContext();

export const useTranslate = () => {
  const context = useContext(TranslateContext);
  if (!context) throw new Error("useTranslate must be used within a TranslateProvider");
  return context;
};

export const TranslateProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("mamz-language") || "en";
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("mamz-language", currentLanguage);
  }, [currentLanguage]);

  // Toggle between English and Indonesian
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === "en" ? "id" : "en");
  };

  // Main translation function accessible to all components
  const translateText = (text) => {
    if (!text || typeof text !== 'string') return text;

    // If current language is English, translate to English (return original if not found)
    if (currentLanguage === "en") {
      return translate(text, "en");
    }

    // If current language is Indonesian, translate to Indonesian
    return translate(text, "id");
  };

  // Smooth transition state for UI animations
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Enhanced toggle with smooth transition
  const toggleLanguageSmooth = async () => {
    setIsTransitioning(true);
    // Small delay for visual feedback
    setTimeout(() => {
      toggleLanguage();
      setTimeout(() => setIsTransitioning(false), 300);
    }, 100);
  };

  // Get current language info
  const isIndonesian = currentLanguage === "id";
  const isEnglish = currentLanguage === "en";

  // Auto-detect language of a text
  const detectTextLanguage = (text) => {
    return detectLanguage(text);
  };

  return (
    <TranslateContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        toggleLanguage,
        toggleLanguageSmooth,
        translate: translateText,
        isIndonesian,
        isEnglish,
        isTransitioning,
        detectLanguage: detectTextLanguage
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};
