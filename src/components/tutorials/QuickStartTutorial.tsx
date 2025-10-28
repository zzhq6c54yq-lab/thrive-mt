import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { getQuickStartSteps } from "@/data/quickStartTutorialData";

interface QuickStartTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const QuickStartTutorial: React.FC<QuickStartTutorialProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isSpanish } = useTranslation();
  const steps = getQuickStartSteps(isSpanish);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenQuickStart', 'true');
    onComplete?.();
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenQuickStart', 'true');
    onClose();
  };

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-[#1a1a1f] via-[#221F26] to-[#1a1a1f] border-white/20 text-white p-0 overflow-hidden" showCloseButton={false}>
        {/* Close button - positioned relative to dialog */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-[100] rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white border-2 border-white/30 shadow-lg"
          onClick={onClose}
          aria-label="Close tutorial"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header with image and text */}
        <div>

          {/* Image section */}
          {currentStepData.image && (
            <div className="w-full flex justify-center items-center py-8 border-b border-white/10 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]">
              <img
                src={currentStepData.image}
                alt={currentStepData.title}
                className="h-24 w-24 object-contain"
              />
            </div>
          )}

          {/* Title and description */}
          <div className="px-8 pt-6 pb-4">
            <h2 className="text-2xl font-bold mb-3">{currentStepData.title}</h2>
            <p className="text-white/80 text-base">{currentStepData.description}</p>
          </div>
        </div>

        {/* Highlights section */}
        <div className="px-8 pb-6 space-y-4">
          {currentStepData.highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{highlight.label}</h3>
                  <p className="text-sm text-white/70">{highlight.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step indicators */}
        <div className="px-8 pb-4 flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-gradient-to-r from-[#B87333] to-[#E5C5A1]"
                  : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Footer with navigation buttons */}
        <div className="px-8 pb-6 flex justify-between items-center">
          <div>
            {currentStep === 0 ? (
              <Button
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={handleSkip}
              >
                {isSpanish ? "Saltar" : "Skip"}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-white/20 text-white/80 hover:bg-white/10"
                onClick={handlePrevious}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> {isSpanish ? "Anterior" : "Previous"}
              </Button>
            )}
          </div>

          <Button
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
            onClick={handleNext}
          >
            {currentStep < steps.length - 1 ? (
              <>
                {isSpanish ? "Siguiente" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                {isSpanish ? "Comenzar" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickStartTutorial;
