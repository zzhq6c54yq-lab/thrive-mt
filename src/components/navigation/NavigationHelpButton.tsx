
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "@/components/help/HelpDialog";
import HenryIntroDialog from "@/components/henry/HenryIntroDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useButtonVisibility } from "../help/RouteVisibility";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useTranslation from "@/hooks/useTranslation";
import { Home } from "lucide-react";

const NavigationHelpButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isButtonVisible = useButtonVisibility();
  const { preferredLanguage, isSpanish, isPortuguese } = useTranslation();
  
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
    const dashboardMessages = {
      'English': {
        title: "Returning to Main Dashboard",
        description: "Taking you back to the main dashboard"
      },
      'Español': {
        title: "Volviendo al Panel Principal",
        description: "Llevándote de regreso al panel principal"
      },
      'Português': {
        title: "Voltando ao Painel Principal",
        description: "Levando você de volta ao painel principal"
      }
    };
    
    const message = dashboardMessages[preferredLanguage as keyof typeof dashboardMessages] || dashboardMessages['English'];
    
    toast({
      title: message.title,
      description: message.description
    });
    
    // Always navigate to main screen with the 'main' screenState to avoid intro screens
    // Set a specific flag to prevent tutorials from showing
    navigate("/app/dashboard", { 
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
          aria-label={
            isSpanish ? "Obtener Ayuda" : 
            isPortuguese ? "Obter Ajuda" : 
            "Get Help"
          }
          title={
            isSpanish ? "Obtener Ayuda" : 
            isPortuguese ? "Obter Ajuda" : 
            "Get Help"
          }
        >
          <Avatar className="h-10 w-10 border-2 border-white/30">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
          </Avatar>
        </Button>
        
        <Button
          onClick={handleMainDashboard}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label={
            isSpanish ? "Volver al Panel Principal" : 
            isPortuguese ? "Voltar ao Painel Principal" : 
            "Return to Main Dashboard"
          }
          title={
            isSpanish ? "Volver al Panel Principal" : 
            isPortuguese ? "Voltar ao Painel Principal" : 
            "Return to Main Dashboard"
          }
        >
          <Home className="h-5 w-5" />
        </Button>
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
