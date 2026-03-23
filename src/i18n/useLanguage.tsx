import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Language, translations, rtlLanguages } from "./locales";

interface LanguageContextType {
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem("dashboard-lang");
    return (saved as Language) || "fr";
  });

  const dir = rtlLanguages.includes(currentLang) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", currentLang);
    localStorage.setItem("dashboard-lang", currentLang);
  }, [currentLang, dir]);

  const setLang = useCallback((lang: Language) => {
    setCurrentLang(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const current = translations[currentLang];
      const fallback = translations["fr"];
      return (current as Record<string, string>)[key] ?? (fallback as Record<string, string>)[key] ?? key;
    },
    [currentLang]
  );

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
