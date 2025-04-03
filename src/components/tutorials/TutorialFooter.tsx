
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface TutorialFooterProps {
  stepsCount: number;
  currentStepIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

const TutorialFooter: React.FC<TutorialFooterProps> = ({
  stepsCount,
  currentStepIndex,
  onNext,
  onPrevious
}) => {
  const { isSpanish } = useTranslation();
  
  return (
    <CardFooter className="flex justify-between">
      {stepsCount > 1 && currentStepIndex > 0 ? (
        <Button 
          variant="outline" 
          className="border-white/20 text-white/80 hover:bg-white/10"
          onClick={onPrevious}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {isSpanish ? "Anterior" : "Previous"}
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button 
        className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
        onClick={onNext}
      >
        {currentStepIndex < stepsCount - 1 ? (
          <>
            {isSpanish ? "Siguiente" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            {isSpanish ? "Finalizar" : "Finish"} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </CardFooter>
  );
};

export default TutorialFooter;
