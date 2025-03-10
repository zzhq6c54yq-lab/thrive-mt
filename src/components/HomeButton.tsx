
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
      description: "Taking you back to the main page"
    });
    
    // Always navigate to main screen directly
    navigate("/");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/10 ${className}`}
      onClick={handleHomeClick}
      aria-label="Return to main screen"
      title="Return to main screen"
    >
      <img 
        src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
        alt="Thrive MT Logo" 
        className="h-5 w-5"
      />
    </Button>
  );
};

export default HomeButton;
