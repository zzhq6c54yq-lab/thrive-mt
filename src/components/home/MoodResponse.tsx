
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MoodResponseProps {
  mood: string;
  feedback: string;
  showEmergencyResources: boolean;
  emergencyResourcesForMood: Array<{
    name: string;
    contact: string;
    description: string;
  }>;
  onBack: () => void;
  onContinue: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({
  mood,
  feedback,
  showEmergencyResources,
  emergencyResourcesForMood,
  onBack,
  onContinue,
}) => {
  return (
    <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-4xl bg-[#2a2a30] rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center copper-text">
          {mood ? `You're feeling ${mood}` : "How are you feeling today?"}
        </h1>
        
        <p className="mb-8 text-center text-lg">
          {feedback}
        </p>
        
        {showEmergencyResources && (
          <div className="mt-4 space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-[#B87333]">Resources that might help:</h3>
            <div className="grid grid-cols-1 gap-3">
              {emergencyResourcesForMood.map((resource, index) => (
                <div key={index} className="border border-[#3a3a40] rounded-lg p-4 bg-[#1a1a20]">
                  <h4 className="font-semibold">{resource.name}</h4>
                  <p className="text-[#B87333] font-bold">{resource.contact}</p>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#B87333] p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button 
            onClick={onContinue} 
            variant="bronze"
            size="lg"
          >
            Continue your journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodResponse;
