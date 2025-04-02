
import { useState, useEffect } from "react";

export const useTranslation = () => {
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'English';
    setPreferredLanguage(savedLanguage);
    
    // Listen for language change events
    const handleLanguageChange = () => {
      const updatedLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setPreferredLanguage(updatedLanguage);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Function to get translated text based on the current language preference
  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'welcomeTitle': {
        'English': 'Welcome to Thrive MT!',
        'Español': '¡Bienvenido a Thrive MT!'
      },
      'tourQuestion': {
        'English': 'Would you like a guided tour of the app\'s features?',
        'Español': '¿Te gustaría un recorrido guiado por las funciones de la aplicación?'
      },
      'henryIntro': {
        'English': 'Hi, I\'m Henry, your mental wellness assistant! I can guide you through the app\'s features to help you get started.',
        'Español': 'Hola, soy Henry, ¡tu asistente de bienestar mental! Puedo guiarte a través de las funciones de la aplicación para ayudarte a comenzar.'
      },
      'tutorialAccess': {
        'English': 'Each feature has its own tutorial that you can access anytime by clicking the "How to use this feature" button.',
        'Español': 'Cada función tiene su propio tutorial al que puedes acceder en cualquier momento haciendo clic en el botón "Cómo usar esta función".'
      },
      'skipForNow': {
        'English': 'Skip for now',
        'Español': 'Omitir por ahora'
      },
      'showMeAround': {
        'English': 'Show me around',
        'Español': 'Muéstrame el lugar'
      }
    };
    
    return translations[key]?.[preferredLanguage] || translations[key]?.['English'] || key;
  };

  const isSpanish = preferredLanguage === 'Español';

  return {
    preferredLanguage,
    isSpanish,
    getTranslatedText
  };
};

export default useTranslation;
