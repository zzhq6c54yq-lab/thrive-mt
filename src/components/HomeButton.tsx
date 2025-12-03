
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface HomeButtonProps {
  className?: string;
  portalMode?: boolean;
  portalPath?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ 
  className = "",
  portalMode = false,
  portalPath = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleClick = () => {
    if (portalMode && portalPath) {
      // In portal mode, navigate to the portal home page
      toast({
        title: "Returning to Portal Home",
        description: "Taking you back to the portal dashboard"
      });
      
      navigate(portalPath, { 
        state: { 
          stayInPortal: true,
          preventTutorial: true 
        }
      });
    } else {
      // Regular mode, navigate to main Thrive dashboard
      toast({
        title: "Returning to Main Dashboard",
        description: "Taking you back to the main dashboard"
      });
      
      // Always navigate to main screen with the 'main' screenState to avoid intro screens
      // Also prevent tutorials from showing
      navigate("/app/dashboard");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-[#B87333]/40 hover:border-[#B87333] transition-all duration-300 transform hover:scale-105 ${className}`}
      onClick={handleClick}
      aria-label={portalMode ? "Return to portal home" : "Return to main dashboard"}
      title={portalMode ? "Return to portal home" : "Return to main dashboard"}
    >
      <div className="relative w-6 h-6 overflow-hidden flex items-center justify-center">
        <div className="text-[#B87333] font-bold text-base leading-none tracking-tighter flex flex-col items-center">
          <span className="text-[6px] opacity-80 mb-0.5">THRIVE</span>
          <span>MT</span>
        </div>
      </div>
    </Button>
  );
};

export default HomeButton;
