
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeatureTutorial from "./FeatureTutorial";

interface WelcomeTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ isOpen, onClose }) => {
  // Check if we're using Spanish
  const isSpanish = localStorage.getItem('preferredLanguage') === 'Español';
  
  // Log when this component renders with its open state
  useEffect(() => {
    console.log("WelcomeTutorial rendered with isOpen:", isOpen);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            {isSpanish ? "Tutorial de Thrive" : "Thrive Tutorial"}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {isSpanish ? "Aprenda a usar la aplicación Thrive MT" : "Learn how to use the Thrive MT application"}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <FeatureTutorial 
            featureId="dashboard" 
            onClose={onClose} 
            embedded={true}
          />
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <Button 
            onClick={onClose}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {isSpanish ? "Entendido" : "Got it"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTutorial;
