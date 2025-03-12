
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const renderMoodContent = () => {
    switch (selectedMood) {
      case 'happy':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2FCE2] to-[#F2FCE2]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Smile className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Positive Affirmations</h2>
              <div className="space-y-4 mb-10">
                {["You are capable of amazing things.",
                  "Every day is a new opportunity.",
                  "You are strong, resilient, and worthy of happiness.",
                  "Your potential is limitless.",
                  "Small steps lead to big changes."].map((affirmation, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {affirmation}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      // ... Similar cases for other moods
      default:
        return null;
    }
  };

  return renderMoodContent();
};

export default MoodResponse;
