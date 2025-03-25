
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HenryDialog from "@/components/henry/HenryDialog";
import HenryIntroDialog from "@/components/henry/HenryIntroDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HenryFloatingElementProps {
  showHenry: boolean;
  mousePosition: { x: number; y: number };
  henryPosition: { x: number; y: number };
  setHenryPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  userName?: string;
}

const HenryFloatingElement: React.FC<HenryFloatingElementProps> = ({
  showHenry,
  mousePosition,
  henryPosition,
  setHenryPosition,
  userName = ""
}) => {
  const henryRef = useRef<HTMLDivElement>(null);
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [showConversationDialog, setShowConversationDialog] = useState(false);

  // Only show the intro dialog if it hasn't been shown before
  useEffect(() => {
    if (showHenry) {
      const henryIntroShown = localStorage.getItem('henryIntroShown') === 'true';
      if (!henryIntroShown) {
        setShowIntroDialog(true);
        localStorage.setItem('henryIntroShown', 'true');
      }
    }
  }, [showHenry]);

  useEffect(() => {
    if (showHenry && henryRef.current) {
      const henryWidth = henryRef.current.offsetWidth;
      const henryHeight = henryRef.current.offsetHeight;
      
      const targetX = Math.max(20, Math.min(mousePosition.x - henryWidth/2, window.innerWidth - henryWidth - 20));
      const targetY = Math.max(20, Math.min(mousePosition.y + 100, window.innerHeight - henryHeight - 20));
      
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
      
      // Update with the correct type for the state setter function
      setHenryPosition(prev => ({
        x: lerp(prev.x, targetX, 0.05),
        y: lerp(prev.y, targetY, 0.05)
      }));
    }
  }, [mousePosition, showHenry, setHenryPosition]);

  if (!showHenry) return null;

  const handleHenryClick = () => {
    setShowConversationDialog(true);
  };

  const handleIntroDialogContinue = () => {
    setShowIntroDialog(false);
  };

  return (
    <>
      <div 
        ref={henryRef}
        style={{
          position: 'fixed',
          left: `${henryPosition.x}px`,
          top: `${henryPosition.y}px`,
          zIndex: 50,
        }}
      >
        <Button
          onClick={handleHenryClick}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-lg flex items-center justify-center"
        >
          <Avatar className="h-8 w-8 border border-white/30">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
          </Avatar>
        </Button>
      </div>

      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog}
        onContinue={handleIntroDialogContinue}
      />

      <HenryDialog 
        isOpen={showConversationDialog} 
        onOpenChange={setShowConversationDialog}
        userName={userName}
      />
    </>
  );
};

export default HenryFloatingElement;
