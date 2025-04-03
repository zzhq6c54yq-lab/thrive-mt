
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  isWelcome?: boolean;
  userName?: string;
}

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
  embedded?: boolean;
  userName?: string;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ featureId, onClose, embedded = false, userName = "" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Get tutorial content based on feature ID
  const tutorialSteps = getTutorialSteps(featureId, userName);
  const totalSteps = tutorialSteps.length;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const currentTutorial = tutorialSteps[currentStep];
  
  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
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
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-white">
          {currentTutorial.isWelcome && userName 
            ? `${currentTutorial.title}, ${userName}!` 
            : currentTutorial.title}
        </CardTitle>
        <CardDescription className="text-white/70">
          Step {currentStep + 1} of {totalSteps}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-white/90">{currentTutorial.description}</p>
        
        {currentTutorial.isWelcome && (
          <div className="mt-4 bg-black/20 p-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-[#B87333] bg-gradient-to-br from-[#181820] to-[#1f1a25] flex items-center justify-center">
                <div className="text-[#B87333] font-bold text-lg leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[7px] opacity-80 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
              <p className="text-sm text-white/80">
                Look for this button in the top right corner for a full tutorial anytime.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button 
          className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
          onClick={handleNextStep}
        >
          {currentStep === totalSteps - 1 ? (
            <>
              Finish <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Tutorial steps for different features - showing a personalized welcome for dashboard
const getTutorialSteps = (featureId: string, userName: string = ""): TutorialStep[] => {
  switch (featureId) {
    case 'dashboard':
      return [
        {
          title: "Welcome to Thrive MT",
          description: "Your personalized mental wellness dashboard is ready. We've designed it to support your journey to better mental health.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
          isWelcome: true,
          userName: userName
        },
        {
          title: "Daily Wellness Challenges",
          description: "Engage with daily activities designed to boost your mental wellbeing. Each challenge takes just a few minutes but can have lasting benefits."
        },
        {
          title: "Specialized Programs",
          description: "Explore programs tailored to specific needs and situations. Whether you're a college student, military member, or dealing with specific challenges, we have resources for you."
        },
        {
          title: "Track Your Progress",
          description: "Monitor your wellness journey with our tracking tools. See your growth, recognize patterns, and celebrate your achievements."
        },
        {
          title: "Find Help Anytime",
          description: "Need assistance? Look for the Thrive MT button in the top right corner of the screen next to your profile icon. Click it anytime to access the full site tutorial."
        }
      ];
    case 'workshops':
      return [
        {
          title: "Explore Wellness Workshops",
          description: "Discover a variety of workshops designed to support different aspects of your mental health journey.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        },
        {
          title: "Workshop Structure",
          description: "Each workshop includes videos, interactive exercises, and downloadable resources to help you apply what you learn."
        },
        {
          title: "Track Your Progress",
          description: "As you complete workshops, your progress is tracked, allowing you to see your journey and build on your achievements."
        },
        {
          title: "Find Help Anytime",
          description: "Need assistance? Look for the Thrive MT button in the top right corner of the screen next to your profile icon. Click it anytime to access the full site tutorial."
        }
      ];
    default:
      return [
        {
          title: "Welcome to Thrive MT",
          description: "We're here to support your mental wellness journey with personalized resources and tools.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        },
        {
          title: "Getting Started",
          description: "Explore the dashboard to find daily challenges, specialized programs, and resources tailored to your needs."
        },
        {
          title: "Find Help Anytime",
          description: "Need assistance? Look for the Thrive MT button in the top right corner of the screen next to your profile icon. Click it anytime to access the full site tutorial."
        }
      ];
  }
};

export default FeatureTutorial;
