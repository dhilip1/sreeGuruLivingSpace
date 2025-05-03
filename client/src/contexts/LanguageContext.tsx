import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from '../lib/translations';

type TranslationSection = {
  title?: string;
  values?: Record<string, string>;
  [key: string]: any;
};

type TranslationType = {
  [key in Language]: {
    [section: string]: TranslationSection;
  };
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section: string) => string;
  getTranslation: (section: string, key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, section: string) => {
    try {
      return (translations as TranslationType)[language][section][key] || key;
    } catch {
      return key;
    }
  };

  const getTranslation = (section: string, key: string) => {
    try {
      return (translations as TranslationType)[language][section].values?.[key] || key;
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
