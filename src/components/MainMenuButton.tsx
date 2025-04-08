
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

interface MainMenuButtonProps {
  className?: string;
  size?: "default" | "large";
  showAnimatedRings?: boolean;
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ 
  className = "", 
  size = "default",
  showAnimatedRings = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleMainMenuClick = () => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Volviendo al menú principal" : "Returning to main menu",
      duration: 1500,
    });
    
    // Navigate to the main dashboard with proper state to avoid intro screens
    navigate("/", { 
      state: { 
        screenState: 'main',
        preventTutorial: true 
      }
    });
  };

  // Determine size classes based on the size prop
  const sizeClasses = size === "large" 
    ? "h-16 w-16" 
    : "h-10 w-10";

  const textSizeClasses = size === "large"
    ? "text-xl text-[8px]"
    : "text-base text-[6px]";

  return (
    <Button
      variant="bronze"
      size="icon"
      onClick={handleMainMenuClick}
      className={`p-0 ${sizeClasses} rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(184,115,51,0.6)] relative ${className}`}
      aria-label={isSpanish ? "Menú Principal" : "Main Menu"}
      title={isSpanish ? "Ir al Menú Principal" : "Go to Main Menu"}
    >
      {showAnimatedRings && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-[#B87333]/30 animate-ping" style={{margin: '-2px'}}></div>
          <div className="absolute rounded-full border border-[#E5C5A1]/20 animate-pulse" style={{inset: '-6px'}}></div>
          <div className="absolute rounded-full border border-[#B87333]/40" style={{inset: '-3px', animationDelay: '0.5s'}}></div>
        </>
      )}
      <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">
        <div className="relative flex items-center justify-center">
          <div className={`text-white font-bold ${textSizeClasses} leading-none tracking-tighter flex flex-col items-center`}>
            <span className="opacity-90 mb-0.5">THRIVE</span>
            <span>MT</span>
          </div>
        </div>
      </div>
    </Button>
  );
};

export default MainMenuButton;
