
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronLeft, ChevronRight, X, Award, Bell, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  highlight?: string;
}

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ 
  featureId, 
  onClose 
}) => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([]);
  const location = useLocation();
  const { toast } = useToast();

  // Load tutorial steps based on the feature
  useEffect(() => {
    const getTutorialForFeature = () => {
      // Default tutorial steps for any feature
      const defaultSteps: TutorialStep[] = [
        {
          title: "Welcome to the Tutorial",
          description: "I'm Henry, and I'll guide you through this feature. Let's get started!",
          image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
        }
      ];

      // Feature-specific tutorial steps
      switch (featureId) {
        case "wellness-challenges":
          return [
            ...defaultSteps,
            {
              title: "Wellness Challenges",
              description: "Complete daily challenges to improve your mental health and earn points towards co-pay credits.",
              highlight: "challenges-overview"
            },
            {
              title: "Earning Points",
              description: "Each challenge is worth 10 points. Complete all daily tasks for a bonus of 25 points!",
              highlight: "points-system"
            },
            {
              title: "Challenge Categories",
              description: "Switch between Wellness and Mental Health challenges using the tabs at the top.",
              highlight: "challenge-categories"
            },
            {
              title: "Completing Challenges",
              description: "Click the checkmark button to mark a challenge as complete and earn points.",
              highlight: "complete-challenge"
            },
            {
              title: "Redeeming Rewards",
              description: "Every 1,000 points can be redeemed for $1 in co-pay credits. Click 'Redeem Points' to convert your points.",
              highlight: "redeem-points"
            },
            {
              title: "Self-Care Reminders",
              description: "Set personalized reminders to help you remember to complete your challenges.",
              highlight: "reminders"
            }
          ];
        case "copay-credits":
          return [
            ...defaultSteps,
            {
              title: "Co-Pay Credits",
              description: "Use your earned credits to reduce the cost of therapy sessions or purchase Thrive apparel.",
              highlight: "credits-overview"
            },
            {
              title: "Earning Credits",
              description: "Complete wellness challenges to earn points. Every 1,000 points equals $1 in co-pay credits.",
              highlight: "earning-credits"
            },
            {
              title: "Using Credits",
              description: "Apply your credits during checkout for therapy sessions or in the Thrive store.",
              highlight: "using-credits"
            }
          ];
        // Add more features as needed
        default:
          return defaultSteps;
      }
    };

    setTutorialSteps(getTutorialForFeature());
  }, [featureId]);

  const handleClose = () => {
    setOpen(false);
    onClose();
    
    toast({
      title: "Tutorial Closed",
      description: "You can restart the tutorial anytime by clicking 'Help' in the menu.",
    });
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIcon = () => {
    const step = tutorialSteps[currentStep];
    if (step.highlight === "points-system" || step.highlight === "earning-credits") {
      return <Award className="h-12 w-12 text-amber-400 mb-2" />;
    } else if (step.highlight === "reminders") {
      return <Bell className="h-12 w-12 text-indigo-400 mb-2" />;
    } else if (step.highlight === "complete-challenge") {
      return <CheckCircle className="h-12 w-12 text-green-400 mb-2" />;
    } else {
      return <Lightbulb className="h-12 w-12 text-amber-400 mb-2" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
              alt="Henry" 
              className="w-8 h-8 mr-3 rounded-full"
            />
            <DialogTitle className="text-xl text-white">Feature Tutorial</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">
            Step {currentStep + 1} of {tutorialSteps.length}
          </DialogDescription>
        </DialogHeader>
        
        {tutorialSteps.length > 0 && (
          <div className="py-4 text-center">
            {renderStepIcon()}
            <h3 className="text-lg font-medium text-white mb-2">
              {tutorialSteps[currentStep].title}
            </h3>
            <p className="text-gray-300">
              {tutorialSteps[currentStep].description}
            </p>
            
            {tutorialSteps[currentStep].image && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={tutorialSteps[currentStep].image} 
                  alt={tutorialSteps[currentStep].title} 
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}
        
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={handleNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {currentStep < tutorialSteps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureTutorial;
