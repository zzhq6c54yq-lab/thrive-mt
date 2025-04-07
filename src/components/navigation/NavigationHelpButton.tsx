
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "@/components/help/HelpDialog";
import HenryIntroDialog from "@/components/henry/HenryIntroDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useButtonVisibility } from "../help/RouteVisibility";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useTranslation from "@/hooks/useTranslation";

const NavigationHelpButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isButtonVisible = useButtonVisibility();
  const { isSpanish } = useTranslation();
  
  // Check if we're on the main dashboard
  const isMainDashboard = location.pathname === '/' || location.pathname === '/home';
  
  // Handle opening the help dialog
  const openHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Show Henry's intro first
    setShowIntroDialog(true);
  };
  
  const handleIntroContinue = () => {
    setShowIntroDialog(false);
    setShowHelpDialog(true);
  };

  const handleMainDashboard = () => {
    toast({
      title: isSpanish ? "Volviendo al Panel Principal" : "Returning to Main Dashboard",
      description: isSpanish ? "Llevándote de regreso al panel principal" : "Taking you back to the main dashboard"
    });
    
    // Always navigate to main screen with the 'main' screenState to avoid intro screens
    // Set a specific flag to prevent tutorials from showing
    navigate("/", { 
      state: { 
        screenState: 'main',
        preventTutorial: true 
      } 
    });
  };

  // Don't render if button shouldn't be visible
  if (!isButtonVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-3">
        <Button
          onClick={openHelp}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label={isSpanish ? "Obtener Ayuda" : "Get Help"}
          title={isSpanish ? "Obtener Ayuda" : "Get Help"}
        >
          <Avatar className="h-10 w-10 border-2 border-white/30">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
          </Avatar>
        </Button>
        
        {/* Only show the return to dashboard button if not on main dashboard */}
        {!isMainDashboard && (
          <Button
            onClick={handleMainDashboard}
            className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            size="icon"
            aria-label={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
            title={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
          >
            <div className="relative w-5 h-5 overflow-hidden">
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                alt="Thrive MT Logo" 
                className="h-5 w-5 filter drop-shadow-[0_0_5px_rgba(184,115,51,0.8)] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(184,115,51,1)]"
              />
            </div>
          </Button>
        )}
      </div>
      
      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog}
        onContinue={handleIntroContinue}
      />
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default NavigationHelpButton;
