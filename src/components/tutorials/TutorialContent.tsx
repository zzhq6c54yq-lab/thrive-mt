
import React from "react";
import { CardContent } from "@/components/ui/card";
import useTranslation from "@/hooks/useTranslation";
import { TutorialStep } from "./utils/tutorialStepsData";

interface TutorialContentProps {
  currentTutorial: TutorialStep;
  featureId: string;
  currentStepIndex: number;
}

const TutorialContent: React.FC<TutorialContentProps> = ({
  currentTutorial,
  featureId,
  currentStepIndex
}) => {
  const { isSpanish, getTranslatedText } = useTranslation();
  
  return (
    <CardContent>
      <p className="text-white/90">{currentTutorial.description}</p>
      
      {currentStepIndex === 0 && (
        <div className="mt-4 bg-black/20 p-3 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-[#B87333] bg-gradient-to-br from-[#181820] to-[#1f1a25] flex items-center justify-center">
              <div className="text-[#B87333] font-bold text-lg leading-none tracking-tighter flex flex-col items-center">
                <span className="text-[7px] opacity-80 mb-0.5">THRIVE</span>
                <span>MT</span>
              </div>
            </div>
            <p className="text-sm text-white/80">
              {getTranslatedText('tutorialButtonHelp')}
            </p>
          </div>
        </div>
      )}
      
      {featureId === "dashboard" && currentStepIndex === 1 && (
        <div className="mt-4 space-y-3">
          <div className="bg-black/20 p-3 rounded-lg border border-white/10">
            <h3 className="text-[#B87333] font-medium mb-1">Key Features</h3>
            <p className="text-sm text-white/80">Access mental wellness workshops, games, tools, and personalized resources designed to support your journey.</p>
          </div>
          
          <div className="bg-black/20 p-3 rounded-lg border border-white/10">
            <h3 className="text-[#B87333] font-medium mb-1">Navigation Help</h3>
            <p className="text-sm text-white/80">Use the Thrive MT button in the top right corner to access this tutorial anytime you need guidance.</p>
          </div>
        </div>
      )}
      
      {featureId === "dashboard" && currentStepIndex === 2 && (
        <div className="mt-4 space-y-3">
          <div className="bg-black/20 p-3 rounded-lg border border-white/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <div>
              <h3 className="text-[#B87333] font-medium mb-1">Meet Henry</h3>
              <p className="text-sm text-white/80">Your AI mental health companion is always ready to help guide you through the platform.</p>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
};

export default TutorialContent;
