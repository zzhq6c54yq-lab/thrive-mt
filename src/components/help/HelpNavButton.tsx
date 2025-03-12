
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "./HelpDialog";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const { toast } = useToast();

  // Track touch start position for swipe detection
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  
  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };
  
  // Handle touch move event for scrolling
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // Scroll based on touch movement
    if (Math.abs(diff) > 5) { // Small threshold to prevent accidental scrolls
      window.scrollBy(0, diff);
    }
  };
  
  // Handle touch end event
  const handleTouchEnd = () => {
    setTouchStartY(null);
  };

  const handleClick = () => {
    setShowHelpDialog(true);
    toast({
      title: "Help Assistant",
      description: "How can I assist you today?",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 z-50">
        <Button
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative"
          size="icon"
        >
          {/* Custom H with circle design */}
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute inset-1 rounded-full border-2 border-white/80"></div>
            <span className="text-2xl font-bold">H</span>
          </div>
          <Fingerprint className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute animate-pulse" />
          <span className="absolute -bottom-8 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Swipe to scroll
          </span>
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
