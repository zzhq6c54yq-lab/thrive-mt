
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortalBackButtonProps {
  returnPath: string;
}

const PortalBackButton: React.FC<PortalBackButtonProps> = ({ returnPath }) => {
  const navigate = useNavigate();
  
  const handleBackNavigation = () => {
    navigate(returnPath, { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      } 
    });
  };
  
  return (
    <Button
      variant="ghost" 
      size="sm" 
      className="gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      onClick={handleBackNavigation}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
};

export default PortalBackButton;
