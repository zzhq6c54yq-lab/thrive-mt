
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  completedSteps: number[];
  onNextStep: () => void;
}

const StepProgressTracker: React.FC<StepProgressProps> = ({
  currentStep,
  completedSteps,
  onNextStep
}) => {
  const steps = [
    { number: 1, title: "Powerlessness" },
    { number: 2, title: "Hope" },
    { number: 3, title: "Surrender" },
    { number: 4, title: "Inventory" },
    { number: 5, title: "Confession" },
    { number: 6, title: "Readiness" },
    { number: 7, title: "Humility" },
    { number: 8, title: "Willingness" },
    { number: 9, title: "Amends" },
    { number: 10, title: "Maintenance" },
    { number: 11, title: "Connection" },
    { number: 12, title: "Service" }
  ];
  
  const nextStep = steps[currentStep] || steps[0];
  const upcomingSteps = steps.filter(step => step.number > currentStep && !completedSteps.includes(step.number)).slice(0, 3);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-t-lg pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Your 12 Step Journey</CardTitle>
            <Badge variant="outline" className="bg-white/20 border-none text-white">
              Step {currentStep} of 12
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-6 text-xs flex rounded-full bg-gray-200">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full" 
                style={{ width: `${(currentStep / 12) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between">
              {[1, 4, 8, 12].map(step => (
                <div 
                  key={`milestone-${step}`}
                  className={`flex flex-col items-center ${currentStep >= step ? 'text-purple-700' : 'text-gray-400'}`}
                >
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1
                    ${currentStep > step ? 'bg-purple-100 text-purple-700' : 
                      currentStep === step ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step
                    )}
                  </div>
                  <span className="text-xs font-medium">{steps[step-1].title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-lg flex items-center">
                Step {nextStep.number}: {nextStep.title}
                <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-200">Current</Badge>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {nextStep.number === 1 && "Admitting powerlessness over addiction and unmanageability of life."}
                {nextStep.number === 2 && "Coming to believe a higher power can restore sanity."}
                {nextStep.number === 3 && "Making a decision to turn will and life over to the care of a higher power."}
                {nextStep.number === 4 && "Taking a searching and fearless moral inventory."}
                {nextStep.number === 5 && "Admitting the exact nature of wrongs to self, higher power, and another person."}
                {nextStep.number === 6 && "Becoming entirely ready to have character defects removed."}
                {nextStep.number === 7 && "Humbly asking for shortcomings to be removed."}
                {nextStep.number === 8 && "Making a list of all harmed and becoming willing to make amends."}
                {nextStep.number === 9 && "Making direct amends wherever possible without causing harm."}
                {nextStep.number === 10 && "Continuing personal inventory and promptly admitting wrongs."}
                {nextStep.number === 11 && "Seeking through prayer and meditation to improve conscious contact."}
                {nextStep.number === 12 && "Carrying the message to others and practicing these principles."}
              </p>
              
              <Button 
                className="mt-4 bg-purple-700 hover:bg-purple-800"
                onClick={onNextStep}
              >
                Work on this step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {upcomingSteps.length > 0 && upcomingSteps[0] && (
              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="font-bold flex items-center">
                  Coming Step: {upcomingSteps[0].number}. {upcomingSteps[0].title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 inline mr-1" /> 
                  Complete your current step to unlock this one
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepProgressTracker;
