
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const ThriveMTButton: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const handleMainDashboard = () => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Regresando al panel principal" : "Returning to main dashboard",
      duration: 1500,
    });
    
    // Always navigate to main screen with the 'main' screenState to avoid intro screens
    // Also prevent tutorials from showing
    navigate("/", { 
      state: { 
        screenState: 'main',
        preventTutorial: true 
      } 
    });
  };
  
  return (
    <Button
      onClick={handleMainDashboard}
      variant="outline"
      className="h-10 px-4 bg-white text-[#1a1a1f] border border-[#B87333]/30 hover:bg-white/90 hover:text-[#1a1a1f] shadow-md transition-all duration-300 flex items-center gap-2"
      aria-label={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
      title={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
    >
      <div className="text-[#B87333] font-bold text-sm leading-none tracking-tighter flex flex-col items-center">
        <span className="text-[6px] opacity-80 mb-0.5">THRIVE</span>
        <span>MT</span>
      </div>
    </Button>
  );
};

export default ThriveMTButton;
