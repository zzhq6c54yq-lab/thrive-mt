
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import FeatureTutorial from "./FeatureTutorial";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TutorialButtonProps {
  featureId: string;
  className?: string;
  variant?: "default" | "logo";
  showAnimatedRings?: boolean;
}

const TutorialButton: React.FC<TutorialButtonProps> = ({ 
  featureId,
  className = "",
  variant = "default",
  showAnimatedRings = false
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
          variant="bronze"
          size="icon"
          onClick={handleOpenTutorial}
          className={`p-0 h-16 w-16 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(184,115,51,0.6)] relative ${className}`}
          aria-label={isSpanish ? "Abrir tutorial" : "Open tutorial"}
        >
          {showAnimatedRings && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-[#B87333]/30 animate-ping"></div>
              <div className="absolute inset-[-8px] rounded-full border border-[#E5C5A1]/20 animate-pulse"></div>
              <div className="absolute inset-[-4px] rounded-full border border-[#B87333]/40" style={{animationDelay: '0.5s'}}></div>
            </>
          )}
          <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">
            <div className="relative w-8 h-8 overflow-hidden flex items-center justify-center">
              <div className="text-white font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
                <span className="text-[8px] opacity-90 mb-0.5">THRIVE</span>
                <span>MT</span>
              </div>
            </div>
          </div>
        </Button>
        
        {showTutorial && (
          <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
            <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">
                  {isSpanish ? "Tutorial de Thrive" : "Thrive Tutorial"}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  {isSpanish ? "Aprenda a usar esta función" : "Learn how to use this feature"}
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[60vh] pr-4">
                <FeatureTutorial 
                  featureId={featureId} 
                  onClose={() => setShowTutorial(false)} 
                  embedded={true}
                />
              </ScrollArea>
              
              <DialogFooter className="mt-4">
                <Button 
                  onClick={() => setShowTutorial(false)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  {isSpanish ? "Entendido" : "Got it"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
        <div className="text-white/90 font-bold text-xs leading-none tracking-tighter flex flex-col items-center mr-1.5">
          <span className="text-[5px] opacity-90">THRIVE</span>
          <span>MT</span>
        </div>
        {isSpanish ? "Cómo usar esta función" : "How to use this feature"}
      </Button>
      
      {showTutorial && (
        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                {isSpanish ? "Tutorial de Función" : "Feature Tutorial"}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {isSpanish ? "Aprenda a usar esta función" : "Learn how to use this feature"}
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="max-h-[60vh] pr-4">
              <FeatureTutorial 
                featureId={featureId} 
                onClose={() => setShowTutorial(false)} 
                embedded={true}
              />
            </ScrollArea>
            
            <DialogFooter className="mt-4">
              <Button 
                onClick={() => setShowTutorial(false)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {isSpanish ? "Entendido" : "Got it"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TutorialButton;
