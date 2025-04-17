
import React, { useEffect } from 'react';
import useTranslation from '@/hooks/useTranslation';

/**
 * This component handles setting the document direction (RTL/LTR) based on the selected language.
 * It doesn't render anything but affects the document's HTML tag.
 */
const LanguageDirection: React.FC = () => {
  const { preferredLanguage } = useTranslation();
  
  useEffect(() => {
    // Set RTL direction for Arabic
    if (preferredLanguage === 'العربية') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Special font adjustments for specific languages
    if (preferredLanguage === '中文') {
      document.documentElement.classList.add('chinese');
    } else {
      document.documentElement.classList.remove('chinese');
    }
    
    if (preferredLanguage === 'हिन्दी') {
      document.documentElement.classList.add('hindi');
    } else {
      document.documentElement.classList.remove('hindi');
    }
    
    if (preferredLanguage === 'العربية') {
      document.documentElement.classList.add('arabic');
    } else {
      document.documentElement.classList.remove('arabic');
    }
    
  }, [preferredLanguage]);
  
  return null; // This component doesn't render anything
};

export default LanguageDirection;
