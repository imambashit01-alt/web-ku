import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("mamz-language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("mamz-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "id" : "en");
  };

  const t = (enText, idText) => {
    return language === "en" ? enText : idText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        isIndonesian: language === "id",
        isEnglish: language === "en"
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
