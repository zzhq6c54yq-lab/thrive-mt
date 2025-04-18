
import { useState, useEffect, createContext, useContext } from 'react';
import translations from '../data/translations';

// Use standard language codes as the base type
type Language = 
  | 'en'    // English
  | 'es'    // Spanish
  | 'pt'    // Portuguese
  | 'de'    // German
  | 'fr'    // French
  | 'fil';  // Filipino

// Mapping for display names
const languageDisplayNames: Record<Language, string> = {
  'en': 'English',
  'es': 'Español',
  'pt': 'Português',
  'de': 'Deutsch',
  'fr': 'Français',
  'fil': 'Filipino'
};

interface TranslationContextType {
  preferredLanguage: Language;
  changeLanguage: (language: Language) => void;
  getLanguageDisplay: (code: Language) => string;
  isSpanish: boolean;
  isPortuguese: boolean;
  isGerman: boolean;
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
  isGerman: false,
  isFrench: false,
  isFilipino: false,
  getTranslatedText: () => '',
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
    console.log(`Language changed to: ${languageDisplayNames[language]}`);
  };

  const getLanguageDisplay = (code: Language): string => {
    return languageDisplayNames[code];
  };

  // Language check flags using strict equality
  const isSpanish = preferredLanguage === 'es';
  const isPortuguese = preferredLanguage === 'pt';
  const isGerman = preferredLanguage === 'de';
  const isFrench = preferredLanguage === 'fr';
  const isFilipino = preferredLanguage === 'fil';

  const getTranslatedText = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    const displayName = languageDisplayNames[preferredLanguage];
    const translation = translations[key][displayName];
    
    if (translation) {
      return translation;
    }

    console.warn(`Translation not available for key '${key}' in ${displayName}`);
    return translations[key]['English'] || key;
  };

  const contextValue: TranslationContextType = {
    preferredLanguage,
    changeLanguage,
    getLanguageDisplay,
    isSpanish,
    isPortuguese,
    isGerman,
    isFrench,
    isFilipino,
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
