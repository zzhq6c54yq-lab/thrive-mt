
import { useState, useEffect, createContext, useContext } from 'react';
import translations from '../data/translations';

// Define supported languages as a union type of string literals
type Language = 'English' | 'Español' | 'Português' | 'Русский' | 'Deutsch' | 'हिन्दी' | 'Français' | 'Filipino' | '中文' | 'العربية';

interface TranslationContextType {
  preferredLanguage: Language;
  changeLanguage: (language: Language) => void;
  isSpanish: boolean;
  isPortuguese: boolean;
  isRussian: boolean;
  isGerman: boolean;
  isHindi: boolean;
  isFrench: boolean;
  isFilipino: boolean;
  isChinese: boolean;
  isArabic: boolean;
  getTranslatedText: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  preferredLanguage: 'English',
  changeLanguage: () => {},
  isSpanish: false,
  isPortuguese: false,
  isRussian: false,
  isGerman: false,
  isHindi: false,
  isFrench: false,
  isFilipino: false,
  isChinese: false,
  isArabic: false,
  getTranslatedText: () => '',
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('English');
  
  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage) {
      setPreferredLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: Language) => {
    localStorage.setItem('preferredLanguage', language);
    setPreferredLanguage(language);
    window.dispatchEvent(new Event('languageChange'));
    console.log(`Language changed to: ${language}`);
  };

  // Language check flags using strict equality
  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';
  const isRussian = preferredLanguage === 'Русский';
  const isGerman = preferredLanguage === 'Deutsch';
  const isHindi = preferredLanguage === 'हिन्दी';
  const isFrench = preferredLanguage === 'Français';
  const isFilipino = preferredLanguage === 'Filipino';
  const isChinese = preferredLanguage === '中文';
  const isArabic = preferredLanguage === 'العربية';

  // Get translated text with proper error handling
  const getTranslatedText = (key: string): string => {
    // Check if key exists in translations
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    // Get translation for current language
    const translation = translations[key][preferredLanguage];
    if (translation) {
      return translation;
    }

    // Fallback to English or key if translation not available
    console.warn(`Translation not available for key '${key}' in ${preferredLanguage}`);
    return translations[key]['English'] || key;
  };

  const contextValue: TranslationContextType = {
    preferredLanguage,
    changeLanguage,
    isSpanish,
    isPortuguese,
    isRussian,
    isGerman,
    isHindi,
    isFrench,
    isFilipino,
    isChinese,
    isArabic,
    getTranslatedText
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

const useTranslation = () => useContext(TranslationContext);

export default useTranslation;
