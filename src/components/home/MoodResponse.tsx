
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import MoodPlaylistGenerator from "@/components/playlists/MoodPlaylistGenerator";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious?: () => void; // Make this optional so it works with both cases
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  // Map the mood to a response message
  const getMoodResponse = (): { title: string; message: string } => {
    switch (selectedMood) {
      case 'happy':
        return {
          title: "That's wonderful!",
          message: "It's great to hear you're feeling happy today. We'll keep the positive energy flowing with resources that match your mood."
        };
      case 'ok':
        return {
          title: "Doing OK",
          message: "Sometimes 'OK' is perfectly fine. We have some resources that might help elevate your mood a bit more today."
        };
      case 'neutral':
        return {
          title: "Feeling Neutral",
          message: "A neutral day can be a canvas for whatever you want to create. Let's explore some ways to add some positive moments to your day."
        };
      case 'down':
        return {
          title: "Sorry you're feeling down",
          message: "We all have days where we feel down. Let's focus on some gentle activities that might help lift your spirits a bit."
        };
      case 'sad':
        return {
          title: "It's OK to feel sad",
          message: "Sadness is a natural emotion. We have resources that can help you process these feelings and find some comfort."
        };
      case 'overwhelmed':
        return {
          title: "Take a deep breath",
          message: "Feeling overwhelmed is challenging. Let's focus on some calming resources that can help you regain a sense of control."
        };
      default:
        return {
          title: "Thanks for sharing",
          message: "Your emotional wellbeing matters to us. We've prepared some resources that might be helpful for you today."
        };
    }
  };

  const response = getMoodResponse();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80]">
          {response.title}
        </h2>
        
        <p className="text-xl mb-8 text-white/90">
          {response.message}
        </p>
        
        <div className="mb-10">
          <MoodPlaylistGenerator 
            currentMood={selectedMood || "neutral"} 
            className="bg-white/5 border border-white/10 backdrop-blur-md"
          />
        </div>
        
        <div className="flex justify-between mt-6">
          {onPrevious && (
            <Button 
              onClick={onPrevious}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-full"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Previous
            </Button>
          )}
          <div className={onPrevious ? "" : "mx-auto"}>
            <Button 
              onClick={onContinue}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-full"
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodResponse;
