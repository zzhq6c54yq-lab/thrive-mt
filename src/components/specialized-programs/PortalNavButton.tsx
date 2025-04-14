
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PortalNavButtonProps {
  className?: string;
  path: string;
  children: React.ReactNode;
}

const PortalNavButton: React.FC<PortalNavButtonProps> = ({ 
  className = "", 
  path,
  children
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNavigation = () => {
    toast({
      title: "Navigating",
      description: "Taking you to the selected page",
      duration: 1500,
    });
    
    navigate(path, { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      } 
    });
  };
  
  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleNavigation}
    >
      {children}
    </Button>
  );
};

export default PortalNavButton;
