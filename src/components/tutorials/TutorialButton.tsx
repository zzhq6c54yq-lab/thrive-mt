
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import FeatureTutorial from "./FeatureTutorial";
import { useLocation } from "react-router-dom";

interface TutorialButtonProps {
  featureId: string;
  className?: string;
  variant?: "default" | "logo";
}

const TutorialButton: React.FC<TutorialButtonProps> = ({ 
  featureId,
  className = "",
  variant = "default" 
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  const location = useLocation();
  
  // Check if we should show the tutorial button based on the current route
  const shouldShowTutorialButton = () => {
    // Only show logo variant on main dashboard
    const state = location.state as { screenState?: string } | null;
    const screenState = state?.screenState;
    
    // For logo variant, only show on main dashboard, not on emotional check-in or other initial screens
    if (variant === "logo") {
      return location.pathname === "/" && screenState === 'main';
    }
    
    // For default variant, show on all screens except emotional check-in
    return !(location.pathname === "/" && screenState !== 'main');
  };
  
  // Check language preference and listen for changes
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    // Check initial language
    checkLanguage();
    
    // Listen for language change events
    window.addEventListener('languageChange', checkLanguage);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);

  const handleOpenTutorial = () => {
    setShowTutorial(true);
  };

  // Don't render if we shouldn't show the button
  if (!shouldShowTutorialButton()) {
    return null;
  }

  if (variant === "logo") {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenTutorial}
          className={`p-0 h-16 w-16 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#B87333] hover:to-[#E5C5A1] hover:opacity-90 shadow-lg ${className}`}
          aria-label={isSpanish ? "Abrir tutorial" : "Open tutorial"}
        >
          <div className="w-full h-full rounded-full bg-[#1a1a1f]/80 flex items-center justify-center p-1 backdrop-blur-md border border-[#B87333]/30">
            <div className="text-[#B87333] font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
              <span className="text-[8px] opacity-80 mb-0.5">THRIVE</span>
              <span className="text-xl">MT</span>
            </div>
          </div>
        </Button>
        
        {showTutorial && (
          <FeatureTutorial 
            featureId={featureId} 
            onClose={() => setShowTutorial(false)} 
          />
        )}
      </>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`bg-white/5 hover:bg-white/15 border-white/10 text-white/90 backdrop-blur-sm shadow-md hover:shadow-lg text-xs ${className}`}
        onClick={handleOpenTutorial}
      >
        <HelpCircle className="h-4 w-4 mr-1.5" />
        {isSpanish ? "Cómo usar esta función" : "How to use this feature"}
      </Button>
      
      {showTutorial && (
        <FeatureTutorial 
          featureId={featureId} 
          onClose={() => setShowTutorial(false)} 
        />
      )}
    </>
  );
};

export default TutorialButton;
