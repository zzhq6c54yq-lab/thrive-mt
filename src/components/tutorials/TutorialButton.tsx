
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FeatureTutorial from "./FeatureTutorial";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import useTranslation from "@/hooks/useTranslation";

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
  const { isSpanish, getTranslatedText } = useTranslation();
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

  const handleOpenTutorial = () => {
    setShowTutorial(true);
  };

  // Don't render if we shouldn't show the button
  if (!shouldShowTutorialButton()) {
    return null;
  }

  // Simple welcome message that will be shown in the popup
  const welcomeMessage = isSpanish 
    ? "Bienvenido a Thrive MT, tu compañero de bienestar mental personalizado. Estamos aquí para apoyarte en tu viaje hacia un mejor bienestar mental."
    : "Welcome to Thrive MT, your personalized mental wellness companion. We're here to support your journey to better mental wellbeing.";

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
              <div className="absolute inset-0 rounded-full border-2 border-[#B87333]/30 animate-ping" style={{margin: '-2px'}}></div>
              <div className="absolute rounded-full border border-[#E5C5A1]/20 animate-pulse" style={{inset: '-6px'}}></div>
              <div className="absolute rounded-full border border-[#B87333]/40" style={{inset: '-3px', animationDelay: '0.5s'}}></div>
            </>
          )}
          <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">
            <div className="relative w-9 h-9 overflow-visible flex items-center justify-center">
              <div className="text-white font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
                <span className="text-[8px] opacity-90 mb-0.5">THRIVE</span>
                <span>MT</span>
              </div>
            </div>
          </div>
        </Button>
        
        {showTutorial && (
          <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
            <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-md">
              <DialogHeader className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setShowTutorial(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
                </Button>
                <DialogTitle className="text-xl text-white">
                  {isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center mb-4">
                  <div className="text-white font-bold text-2xl leading-none tracking-tighter flex flex-col items-center">
                    <span className="text-[10px] opacity-90 mb-0.5">THRIVE</span>
                    <span>MT</span>
                  </div>
                </div>
                
                <p className="text-white/90 text-center mb-4">{welcomeMessage}</p>
              </div>
              
              <DialogFooter>
                <Button 
                  onClick={() => setShowTutorial(false)}
                  className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-full sm:w-auto"
                >
                  {isSpanish ? "Continuar" : "Continue"}
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
          <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-md">
            <DialogHeader className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setShowTutorial(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
              </Button>
              <DialogTitle className="text-xl text-white">
                {isSpanish ? "Tutorial de Función" : "Feature Tutorial"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center mb-4">
                <div className="text-white font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[8px] opacity-90 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
              
              <p className="text-white/90 text-center mb-4">
                {isSpanish 
                  ? `Esta función le permite ${featureId === 'dashboard' ? 'navegar por su panel principal' : 'acceder a herramientas de bienestar'}.`
                  : `This feature allows you to ${featureId === 'dashboard' ? 'navigate your main dashboard' : 'access wellness tools'}.`}
              </p>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => setShowTutorial(false)}
                className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-full sm:w-auto"
              >
                {isSpanish ? "Continuar" : "Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TutorialButton;
