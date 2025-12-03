
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import useTranslation from "@/hooks/useTranslation";
import FeatureTutorial from "./FeatureTutorial";
import QuickStartTutorial from "./QuickStartTutorial";
import { useTutorialProgress } from "@/hooks/useTutorialProgress";

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
  const { isSpanish, getTranslatedText } = useTranslation();
  const location = useLocation();
  const { markTutorialCompleted } = useTutorialProgress();
  const userName = localStorage.getItem('userName') || '';
  
  const [showTutorial, setShowTutorial] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
  
  // Determine the current feature based on path if not provided
  const currentFeatureId = featureId || location.pathname.split('/')[1] || 'dashboard';
  
  // Check if we should show the tutorial button based on the current route
  const shouldShowTutorialButton = () => {
    const path = location.pathname;
    
    // Hide button on DoD Portal first two screens
    if (path === "/app/dod-portal" || path === "/app/department-of-defense") {
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
    const state = location.state as { screenState?: string } | null;
    const screenState = state?.screenState;
    const isMainDashboard = location.pathname === "/" && screenState === "main";
    
    console.log("TutorialButton clicked:", { 
      isMainDashboard, 
      pathname: location.pathname, 
      screenState, 
      featureId: currentFeatureId
    });
    
    if (isMainDashboard || location.pathname === "/" || currentFeatureId === 'dashboard') {
      console.log("Opening QuickStart tutorial");
      setShowQuickStart(true);
    } else {
      console.log("Opening Feature tutorial for:", currentFeatureId);
      setShowTutorial(true);
    }
  };

  // Don't render if we shouldn't show the button
  if (!shouldShowTutorialButton()) {
    return null;
  }

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

        {/* Quick Start Tutorial for main dashboard */}
        <QuickStartTutorial
          isOpen={showQuickStart}
          onClose={() => setShowQuickStart(false)}
          onComplete={() => markTutorialCompleted('quickstart')}
        />

        {/* Feature-specific Tutorial */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <FeatureTutorial
              featureId={currentFeatureId}
              onClose={() => {
                setShowTutorial(false);
                markTutorialCompleted(currentFeatureId);
              }}
              userName={userName}
            />
          </div>
        )}
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

      {/* Quick Start Tutorial for main dashboard */}
      <QuickStartTutorial
        isOpen={showQuickStart}
        onClose={() => setShowQuickStart(false)}
        onComplete={() => markTutorialCompleted('quickstart')}
      />

      {/* Feature-specific Tutorial */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <FeatureTutorial
            featureId={currentFeatureId}
            onClose={() => {
              setShowTutorial(false);
              markTutorialCompleted(currentFeatureId);
            }}
            userName={userName}
          />
        </div>
      )}
    </>
  );
};

export default TutorialButton;
