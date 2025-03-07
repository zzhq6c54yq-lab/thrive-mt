
import React from "react";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface HomeButtonProps {
  className?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHomeClick = () => {
    // Navigate to home and set the state to 'intro'
    toast({
      title: "Returning to Home",
      description: "Taking you back to the home page"
    });
    
    navigate("/", { state: { returnToIntro: true } });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/10 ${className}`}
      onClick={handleHomeClick}
      aria-label="Return to intro screen"
      title="Return to intro screen"
    >
      <House className="h-5 w-5 text-[#B87333]" />
    </Button>
  );
};

export default HomeButton;
