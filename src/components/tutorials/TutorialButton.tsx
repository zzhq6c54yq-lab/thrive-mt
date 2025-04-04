
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import useTranslation from "@/hooks/useTranslation";
import FeatureTutorial from "./FeatureTutorial";

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
  const [showDialog, setShowDialog] = useState(false);
  const { isSpanish, getTranslatedText } = useTranslation();
  const location = useLocation();
  
  // Determine the current feature based on path if not provided
  const currentFeatureId = featureId || location.pathname.split('/')[1] || 'dashboard';
  
  // Check if we should show the tutorial button based on the current route
  const shouldShowTutorialButton = () => {
    const path = location.pathname;
    
    // Hide button on DoD Portal first two screens
    if (path === "/dod-portal" || path === "/department-of-defense") {
      return false;
    }
    
    // Only show logo variant on main dashboard
    const state = location.state as { screenState?: string } | null;
    const screenState = state?.screenState;
    
    // For logo variant, only show on main dashboard, not on emotional check-in or other initial screens
    if (variant === "logo") {
      return location.pathname === "/" && screenState === 'main';
    }
    
    // For default variant, only show on feature pages, not on onboarding or initial screens
    if (location.pathname === "/") {
      if (screenState !== 'main') return false;
    }
    
    return true;
  };

  const handleOpenTutorial = () => {
    if (featureId === "dashboard" && variant === "logo") {
      // For logo variant on dashboard, open the full tutorial
      setShowTutorial(true);
    } else {
      // For other features, open the simple dialog
      setShowDialog(true);
    }
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    setShowDialog(false);
  };

  // Don't render if we shouldn't show the button
  if (!shouldShowTutorialButton()) {
    return null;
  }

  // Get the feature name for display in the tutorial
  const getFeatureName = () => {
    const featureNames: Record<string, Record<string, string>> = {
      'dashboard': {
        'English': 'Dashboard',
        'Español': 'Panel Principal'
      },
      'workshops': {
        'English': 'Workshops',
        'Español': 'Talleres'
      },
      'real-time-therapy': {
        'English': 'Therapy Options',
        'Español': 'Opciones de Terapia'
      },
      'journaling': {
        'English': 'Journaling',
        'Español': 'Diario'
      },
      'mindfulness': {
        'English': 'Mindfulness & Sleep',
        'Español': 'Mindfulness y Sueño'
      },
      'video-diary': {
        'English': 'Video Diary',
        'Español': 'Diario en Video'
      },
      'binaural-beats': {
        'English': 'Binaural Beats',
        'Español': 'Ritmos Binaurales'
      },
      'mental-wellness-tools': {
        'English': 'Mental Wellness Tools',
        'Español': 'Herramientas de Bienestar Mental'
      },
      'games-and-quizzes': {
        'English': 'Games & Quizzes',
        'Español': 'Juegos y Cuestionarios'
      },
      'community-support': {
        'English': 'Community Support',
        'Español': 'Apoyo Comunitario'
      },
      'resource-library': {
        'English': 'Resource Library',
        'Español': 'Biblioteca de Recursos'
      }
    };
    
    // Handle any feature not explicitly defined
    if (!featureNames[currentFeatureId]) {
      return isSpanish ? 'Esta Función' : 'This Feature';
    }
    
    return isSpanish ? featureNames[currentFeatureId]['Español'] : featureNames[currentFeatureId]['English'];
  };

  // Welcome message content
  const welcomeTitle = isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT";
  const welcomeMessage = isSpanish 
    ? "Bienvenido a Thrive MT, tu compañero de bienestar mental personalizado. Estamos aquí para apoyarte en tu viaje hacia un mejor bienestar mental."
    : "Welcome to Thrive MT, your personalized mental wellness companion. We're here to support your journey to better mental wellbeing.";

  // Feature-specific content
  const featureTitle = isSpanish ? `Tutorial de ${getFeatureName()}` : `${getFeatureName()} Tutorial`;
  const featureMessage = isSpanish 
    ? `Esta función te permite acceder a herramientas especializadas para ${getFeatureName()}.`
    : `This feature allows you to access specialized tools for ${getFeatureName()}.`;

  // Render the appropriate button based on variant
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
        
        {/* Full featured tutorial for dashboard */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <FeatureTutorial 
              featureId={currentFeatureId}
              onClose={handleCloseTutorial}
              userName={localStorage.getItem('userName') || ''}
            />
          </div>
        )}
        
        {/* Simple Dialog for other scenarios */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-[#1a1a1f] border-[#3a3a4c] text-white max-w-md">
            <DialogHeader className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setShowDialog(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
              </Button>
              <DialogTitle className="text-xl text-white">
                {featureTitle}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center mb-4">
                <div className="text-white font-bold text-2xl leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[10px] opacity-90 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
              
              <p className="text-white/90 text-center mb-4">{featureMessage}</p>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => setShowDialog(false)}
                className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-full sm:w-auto"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                {isSpanish ? "Continuar" : "Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Default variant (smaller button for features)
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
      
      {/* For feature pages, use the full tutorial with steps */}
      <div className={showDialog ? "fixed inset-0 bg-black/70 z-50 flex items-center justify-center" : "hidden"}>
        <FeatureTutorial 
          featureId={currentFeatureId}
          onClose={() => setShowDialog(false)}
          userName={localStorage.getItem('userName') || ''}
        />
      </div>
    </>
  );
};

export default TutorialButton;
