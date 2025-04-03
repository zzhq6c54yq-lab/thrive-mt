
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import TutorialStepIndicators from "./TutorialStepIndicators";
import { TutorialStep } from "./utils/tutorialStepsData";

interface TutorialHeaderProps {
  currentTutorial: TutorialStep;
  onClose: () => void;
  stepsCount: number;
  currentStepIndex: number;
  userName?: string;
}

const TutorialHeader: React.FC<TutorialHeaderProps> = ({
  currentTutorial,
  onClose,
  stepsCount,
  currentStepIndex,
  userName = ""
}) => {
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/30 hover:text-white"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      
      {currentTutorial.image && (
        <div className="w-full flex justify-center items-center py-6 border-b border-white/10 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]">
          <img 
            src={currentTutorial.image} 
            alt={currentTutorial.title} 
            className={currentTutorial.isWelcome ? "h-20 w-20 object-contain" : "h-24 w-24 object-contain"}
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl text-white">
          {currentTutorial.isWelcome && userName 
            ? `${currentTutorial.title}, ${userName}!` 
            : currentTutorial.title}
        </CardTitle>
        <TutorialStepIndicators 
          steps={stepsCount} 
          currentStep={currentStepIndex} 
        />
      </CardHeader>
    </div>
  );
};

export default TutorialHeader;
