import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IntroScreenProps {
  onContinue: () => void;
}

type SupportedLanguage = 'English' | 'Español' | 'Português' | 'Русский' | 'Deutsch' | 'हिन्दी' | 'Français' | 'Filipino' | '中文' | 'العربية';

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const { preferredLanguage, changeLanguage, getTranslatedText } = useTranslation();
  
  const languages: SupportedLanguage[] = [
    'English',
    'Español',
    'Português',
    'Русский',
    'Deutsch',
    'हिन्दी',
    'Français',
    'Filipino',
    '中文',
    'العربية'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] overflow-hidden relative">
      <div className="floating-bg"></div>
      
      {/* Language selection dropdown */}
      <div className="absolute top-6 right-6 z-20">
        <Select value={preferredLanguage} onValueChange={(value: SupportedLanguage) => changeLanguage(value)}>
          <SelectTrigger className="w-[180px] bg-[#B87333]/10 border-[#B87333]/30 text-white hover:bg-[#B87333]/20 hover:border-[#B87333]/50">
            <Languages className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1f] border-[#B87333]/30">
            {languages.map((lang) => (
              <SelectItem
                key={lang}
                value={lang}
                className="text-white hover:bg-[#B87333]/20 focus:bg-[#B87333]/20 focus:text-white"
              >
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
