
import { useState, useEffect, createContext, useContext } from 'react';
import translations from '../data/translations';

// Define supported languages
export type Language = 'en' | 'es' | 'pt' | 'fr' | 'fil';

// Language display names mapping
const languageDisplayNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  fil: 'Filipino'
};

interface TranslationContextType {
  preferredLanguage: Language;
  changeLanguage: (language: Language) => void;
  getLanguageDisplay: (code: Language) => string;
  isSpanish: boolean;
  isPortuguese: boolean;
  isFrench: boolean;
  isFilipino: boolean;
  getTranslatedText: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  preferredLanguage: 'en',
  changeLanguage: () => {},
  getLanguageDisplay: () => '',
  isSpanish: false,
  isPortuguese: false,
  isFrench: false,
  isFilipino: false,
  getTranslatedText: () => ''
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage && Object.keys(languageDisplayNames).includes(savedLanguage)) {
      setPreferredLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: Language) => {
    localStorage.setItem('preferredLanguage', language);
    setPreferredLanguage(language);
    window.dispatchEvent(new Event('languageChange'));
  };

  const getLanguageDisplay = (code: Language): string => {
    return languageDisplayNames[code];
  };

  const isSpanish = preferredLanguage === 'es';
  const isPortuguese = preferredLanguage === 'pt';
  const isFrench = preferredLanguage === 'fr';
  const isFilipino = preferredLanguage === 'fil';

  const getTranslatedText = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    const translation = translations[key][languageDisplayNames[preferredLanguage]];
    
    if (translation) {
      return translation;
    }

    console.warn(`Translation not available for key '${key}' in ${languageDisplayNames[preferredLanguage]}`);
    return translations[key]['English'] || key;
  };

  return (
    <TranslationContext.Provider
      value={{
        preferredLanguage,
        changeLanguage,
        getLanguageDisplay,
        isSpanish,
        isPortuguese,
        isFrench,
        isFilipino,
        getTranslatedText
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

const useTranslation = () => useContext(TranslationContext);

export default useTranslation;
