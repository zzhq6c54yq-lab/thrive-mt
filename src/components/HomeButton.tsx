
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface HomeButtonProps {
  className?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHomeClick = () => {
    toast({
      title: "Returning to Home",
      description: "Taking you back to the main menu"
    });
    
    // Always navigate to main screen with the 'main' screenState to avoid intro screens
    navigate("/", { state: { screenState: 'main' } });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-[#B87333]/40 hover:border-[#B87333] transition-all duration-300 transform hover:scale-105 ${className}`}
      onClick={handleHomeClick}
      aria-label="Return to main screen"
      title="Return to main screen"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <img 
          src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
          alt="Thrive MT Logo" 
          className="h-5 w-5 filter drop-shadow-[0_0_5px_rgba(184,115,51,0.8)] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(184,115,51,1)]"
        />
      </div>
    </Button>
  );
};

export default HomeButton;
