
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

interface ThriveButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const ThriveButton: React.FC<ThriveButtonProps> = ({ 
  className = "", 
  variant = "outline",
  size = "default"
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const handleClick = () => {
    // Store current location for return navigation
    const currentPath = window.location.pathname;
    localStorage.setItem('lastVisitedPath', currentPath);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    toast({
      title: isSpanish ? "Volviendo al Tablero Principal" : "Returning to Main Dashboard",
      description: isSpanish ? "Llevándote al tablero principal" : "Taking you to the main dashboard",
      duration: 1500,
    });
    
    navigate("/app/dashboard", { 
      state: { 
        screenState: 'main',
        returnToMain: true,
        preventTutorial: true,
        preventIntroRedirect: true,
        fromPath: currentPath,
        preserveState: true
      } 
    });
  };
  
  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold border-amber-400 ${className}`}
    >
      THRIVE
    </Button>
  );
};

export default ThriveButton;
