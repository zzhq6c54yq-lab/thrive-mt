
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "@/components/help/HelpDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useButtonVisibility } from "../help/RouteVisibility";

const NavigationHelpButton: React.FC = () => {
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
      <div className="fixed right-6 bottom-32 z-50 flex flex-col items-center">
        <Button
          onClick={openHelp}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Get Help"
        >
          <div className="relative h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold border-2 border-white/30">
            <span className="text-2xl">H</span>
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

export default NavigationHelpButton;
