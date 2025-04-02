
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages } from "lucide-react";

interface IntroScreenProps {
  onContinue: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const languages = ["English", "Español", "Français", "Deutsch", "中文", "العربية"];
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // This will update the app's language context
    localStorage.setItem('preferredLanguage', language);
    
    // Force a re-render of the app to apply the language change immediately
    window.dispatchEvent(new Event('languageChange'));
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] overflow-hidden relative">
      <div className="floating-bg"></div>
      
      {/* Language selector centered at the top */}
      <div className="absolute top-1/4 -translate-y-1/2 z-20 w-full flex justify-center">
        <div className="flex flex-col items-center bg-black/40 backdrop-blur-sm p-4 rounded-xl shadow-[0_0_15px_rgba(184,115,51,0.3)]">
          <div className="flex items-center gap-2 mb-3">
            <Languages className="h-5 w-5 text-[#B87333]" />
            <span className="text-white font-medium">Select Language</span>
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {languages.map((language) => (
              <Button
                key={language}
                size="sm"
                variant={selectedLanguage === language ? "gold" : "ghost"}
                className={`text-xs py-1 px-2 h-8 rounded-full transition-all duration-300 ${
                  selectedLanguage === language 
                    ? "bg-[#B87333] text-white shadow-[0_0_10px_rgba(184,115,51,0.5)]" 
                    : "text-white/70 hover:text-white hover:bg-[#B87333]/20"
                }`}
                onClick={() => handleLanguageChange(language)}
              >
                {language}
              </Button>
            ))}
          </div>
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
          because life should be more than just surviving
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button 
            className="group bg-[#B87333] hover:bg-[#B87333]/80 hero-button shadow-[0_0_15px_rgba(184,115,51,0.4)]"
            onClick={onContinue}
          >
            Begin Your Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
