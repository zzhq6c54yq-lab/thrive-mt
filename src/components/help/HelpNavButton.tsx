
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "@/components/help/HelpDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useButtonVisibility } from "../help/RouteVisibility";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isButtonVisible = useButtonVisibility();
  
  // Handle opening the help dialog
  const openHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHelpDialog(true);
  };

  // Don't render if button shouldn't be visible
  if (!isButtonVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
        <Button
          onClick={openHelp}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Get Help"
        >
          <div className="relative h-10 w-10 rounded-full flex items-center justify-center border-2 border-white/30">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">
                H
              </AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </div>
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default HelpNavButton;
