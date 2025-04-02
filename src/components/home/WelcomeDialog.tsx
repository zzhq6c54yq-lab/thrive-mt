
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkip: () => void;
  onStartTutorial: () => void;
  translatedText: (key: string) => string;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
  open,
  onOpenChange,
  onSkip,
  onStartTutorial,
  translatedText
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
        <DialogHeader>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
              alt="Henry" 
              className="w-10 h-10 mr-3 rounded-full"
            />
            <DialogTitle className="text-xl text-white">
              {translatedText('welcomeTitle')}
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">
            {translatedText('tourQuestion')}
          </DialogDescription>
        </DialogHeader>
      
        <div className="py-4 text-center">
          <Lightbulb className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <p className="text-white">
            {translatedText('henryIntro')}
          </p>
          <p className="text-gray-300 mt-2">
            {translatedText('tutorialAccess')}
          </p>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={onSkip}
            className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {translatedText('skipForNow')}
          </Button>
          <Button 
            onClick={onStartTutorial}
            className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {translatedText('showMeAround')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
