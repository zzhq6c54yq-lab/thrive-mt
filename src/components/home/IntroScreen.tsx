
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IntroScreenProps {
  onContinue: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Español' | 'Português' | 'Filipino'>("English");
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'Español') {
      setSelectedLanguage('Español');
    } else if (savedLanguage === 'Português') {
      setSelectedLanguage('Português');
    } else if (savedLanguage === 'Filipino') {
      setSelectedLanguage('Filipino');
    }
  }, []);
  
  const selectLanguage = (language: 'English' | 'Español' | 'Português' | 'Filipino') => {
    setSelectedLanguage(language);
    
    // Set language preference in localStorage
    localStorage.setItem('preferredLanguage', language);
    
    // Force a re-render of the app to apply the language change immediately
    window.dispatchEvent(new Event('languageChange'));

    // Add a console log to verify the language change
    console.log(`Language changed to: ${language}`);
  };
  
  const handleBeginJourney = () => {
    console.log("[IntroScreen] Begin journey button clicked");
    // Reset any potentially problematic localStorage items
    localStorage.removeItem('prevScreenState');
    onContinue();
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] overflow-hidden relative">
      <div className="floating-bg"></div>
      
      {/* Language dropdown menu at the top */}
      <div className="absolute top-6 right-6 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="sm"
              className="flex items-center gap-2 py-2 px-4 h-9 rounded-full bg-[#B87333]/60 hover:bg-[#B87333]/80 text-white shadow-[0_0_10px_rgba(184,115,51,0.4)] border border-[#B87333]/50 transition-all duration-300"
            >
              <Languages className="h-4 w-4 mr-1" />
              {selectedLanguage}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1E1916]/95 backdrop-blur-md border border-[#B87333]/40 text-white shadow-lg rounded-lg p-1 min-w-[120px]">
            <DropdownMenuItem 
              className={`${selectedLanguage === 'English' ? 'bg-[#B87333]/30' : ''} rounded-md flex items-center p-2 gap-2 hover:bg-[#B87333]/20 cursor-pointer`}
              onClick={() => selectLanguage('English')}
            >
              <Languages className="h-4 w-4 text-[#B87333]" />
              English
              {selectedLanguage === 'English' && <span className="ml-auto text-[#B87333]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`${selectedLanguage === 'Español' ? 'bg-[#B87333]/30' : ''} rounded-md flex items-center p-2 gap-2 hover:bg-[#B87333]/20 cursor-pointer`}
              onClick={() => selectLanguage('Español')}
            >
              <Languages className="h-4 w-4 text-[#B87333]" />
              Español
              {selectedLanguage === 'Español' && <span className="ml-auto text-[#B87333]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`${selectedLanguage === 'Português' ? 'bg-[#B87333]/30' : ''} rounded-md flex items-center p-2 gap-2 hover:bg-[#B87333]/20 cursor-pointer`}
              onClick={() => selectLanguage('Português')}
            >
              <Languages className="h-4 w-4 text-[#B87333]" />
              Português
              {selectedLanguage === 'Português' && <span className="ml-auto text-[#B87333]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`${selectedLanguage === 'Filipino' ? 'bg-[#B87333]/30' : ''} rounded-md flex items-center p-2 gap-2 hover:bg-[#B87333]/20 cursor-pointer`}
              onClick={() => selectLanguage('Filipino')}
            >
              <Languages className="h-4 w-4 text-[#B87333]" />
              Filipino
              {selectedLanguage === 'Filipino' && <span className="ml-auto text-[#B87333]">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          {selectedLanguage === 'Español' 
            ? "porque la vida debe ser más que solo sobrevivir" 
            : selectedLanguage === 'Português'
              ? "porque a vida deve ser mais do que apenas sobreviver"
              : selectedLanguage === 'Filipino'
                ? "dahil ang buhay ay dapat na higit pa sa simpleng pagiging buhay lamang"
                : "because life should be more than just surviving"}
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button 
            className="group bg-[#B87333] hover:bg-[#B87333]/80 hero-button shadow-[0_0_15px_rgba(184,115,51,0.4)]"
            onClick={handleBeginJourney}
          >
            {selectedLanguage === 'Español' 
              ? "Comienza Tu Viaje" 
              : selectedLanguage === 'Português'
                ? "Comece Sua Jornada"
                : selectedLanguage === 'Filipino'
                  ? "Simulan ang Iyong Paglalakbay"
                  : "Begin Your Journey"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
