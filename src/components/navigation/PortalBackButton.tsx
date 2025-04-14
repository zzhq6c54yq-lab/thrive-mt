
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

interface PortalBackButtonProps {
  className?: string;
  returnPath?: string;
}

const PortalBackButton: React.FC<PortalBackButtonProps> = ({ 
  className = "", 
  returnPath 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const handleBack = () => {
    toast({
      title: isSpanish ? "Regresando" : "Going Back",
      description: isSpanish ? "Volviendo a la página anterior" : "Returning to previous page",
      duration: 1500,
    });
    
    if (returnPath) {
      navigate(returnPath, { 
        state: { 
          ...location.state,
          preventTutorial: true
        } 
      });
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Button
      onClick={handleBack}
      variant="outline"
      size="sm"
      className={`border border-white/30 bg-white/10 hover:bg-white/20 text-white ${className}`}
      title={isSpanish ? "Atrás" : "Back"}
      aria-label={isSpanish ? "Atrás" : "Back"}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};

export default PortalBackButton;
