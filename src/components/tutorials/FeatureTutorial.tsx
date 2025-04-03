
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import TutorialHeader from "./TutorialHeader";
import TutorialContent from "./TutorialContent";
import TutorialFooter from "./TutorialFooter";
import { useTutorialSteps } from "./utils/tutorialStepsData";

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
  embedded?: boolean;
  userName?: string;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ 
  featureId, 
  onClose, 
  embedded = false, 
  userName = "" 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Get tutorial content for this feature
  const tutorialSteps = useTutorialSteps(featureId, userName);
  const currentTutorial = tutorialSteps[currentStepIndex]; 
  
  const handleNext = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  return (
    <Card className={`${embedded ? "" : "w-full max-w-md"} bg-[#1a1a1f] backdrop-blur-md border border-white/20 shadow-xl overflow-hidden text-white`}>
      <TutorialHeader 
        currentTutorial={currentTutorial}
        onClose={onClose}
        stepsCount={tutorialSteps.length}
        currentStepIndex={currentStepIndex}
        userName={userName}
      />
      
      <TutorialContent 
        currentTutorial={currentTutorial}
        featureId={featureId}
        currentStepIndex={currentStepIndex}
      />
      
      <TutorialFooter 
        stepsCount={tutorialSteps.length}
        currentStepIndex={currentStepIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
};

export default FeatureTutorial;
