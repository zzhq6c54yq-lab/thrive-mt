
import React from "react";

interface TutorialStepIndicatorsProps {
  steps: number;
  currentStep: number;
}

const TutorialStepIndicators: React.FC<TutorialStepIndicatorsProps> = ({ 
  steps, 
  currentStep 
}) => {
  if (steps <= 1) return null;
  
  return (
    <div className="flex items-center justify-center mt-2">
      {Array.from({ length: steps }).map((_, index) => (
        <div 
          key={index}
          className={`h-2 w-2 rounded-full mx-1 ${
            index === currentStep ? "bg-[#B87333]" : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
};

export default TutorialStepIndicators;
