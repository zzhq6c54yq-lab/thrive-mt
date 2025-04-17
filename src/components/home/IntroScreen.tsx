
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface IntroScreenProps {
  onContinue: () => void;
}

// Define all supported languages
type SupportedLanguage = 'English' | 'Español' | 'Português' | 'Русский' | 'Deutsch' | 'हिन्दी' | 'Français' | 'Filipino' | '中文' | 'العربية';

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("English");
  const { getTranslatedText } = useTranslation();
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'Español') {
      setSelectedLanguage('Español');
    } else if (savedLanguage === 'Português') {
      setSelectedLanguage('Português');
    } else if (savedLanguage === 'Русский') {
      setSelectedLanguage('Русский');
    } else if (savedLanguage === 'Deutsch') {
      setSelectedLanguage('Deutsch');
    } else if (savedLanguage === 'हिन्दी') {
      setSelectedLanguage('हिन्दी');
    } else if (savedLanguage === 'Français') {
      setSelectedLanguage('Français');
    } else if (savedLanguage === 'Filipino') {
      setSelectedLanguage('Filipino');
    } else if (savedLanguage === '中文') {
      setSelectedLanguage('中文');
    } else if (savedLanguage === 'العربية') {
      setSelectedLanguage('العربية');
    }
  }, []);
  
  const selectLanguage = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    
    // Set language preference in localStorage
    localStorage.setItem('preferredLanguage', language);
    
    // Force a re-render of the app to apply the language change immediately
    window.dispatchEvent(new Event('languageChange'));

    // Add a console log to verify the language change
    console.log(`Language changed to: ${language}`);
  };

  // Helper function to render language buttons
  const renderLanguageButton = (language: SupportedLanguage) => {
    return (
      <Button
        key={language}
        size="sm"
        variant={selectedLanguage === language ? "gold" : "ghost"}
        className={`text-xs py-1 px-3 h-8 rounded-full transition-all duration-300 ${
          selectedLanguage === language 
            ? "bg-[#B87333] text-white shadow-[0_0_10px_rgba(184,115,51,0.5)]" 
            : "text-white/70 hover:text-white hover:bg-[#B87333]/20 border border-[#B87333]/30"
        }`}
        onClick={() => selectLanguage(language)}
      >
        <Languages className="h-4 w-4 mr-1.5" />
        {language}
      </Button>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] overflow-hidden relative">
      <div className="floating-bg"></div>
      
      {/* Language selection options - grouped into rows for better layout */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex flex-wrap gap-2 justify-end mb-2">
          {/* First row of languages */}
          {renderLanguageButton('English')}
          {renderLanguageButton('Español')}
          {renderLanguageButton('Português')}
          {renderLanguageButton('Français')}
          {renderLanguageButton('Deutsch')}
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {/* Second row of languages */}
          {renderLanguageButton('Русский')}
          {renderLanguageButton('हिन्दी')}
          {renderLanguageButton('Filipino')}
          {renderLanguageButton('中文')}
          {renderLanguageButton('العربية')}
        </div>
      </div>
      
      <div className="text-center max-w-2xl mx-auto px-4 z-10">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
            alt="Copper Outline Logo" 
            className="w-40 md:w-48 mx-auto intro-logo-icon"
          />
        </div>
        <h1 className="intro-logo-text text-6xl md:text-8xl mb-8">
          <span className="text-white">Thrive</span>
          <span className="gradient-heading ml-2" style={{ 
            textShadow: '0 0 10px rgba(184, 115, 51, 0.8), 0 0 20px rgba(184, 115, 51, 0.4)' 
          }}>MT</span>
        </h1>
        <p className="intro-tagline text-xl md:text-2xl text-gray-300">
          {getTranslatedText('appTagline')}
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button 
            className="group bg-[#B87333] hover:bg-[#B87333]/80 hero-button shadow-[0_0_15px_rgba(184,115,51,0.4)]"
            onClick={onContinue}
          >
            {getTranslatedText('beginJourney')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
