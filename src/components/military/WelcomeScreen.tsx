
import React from "react";
import { Button } from "@/components/ui/button";
import { Flag, Shield } from "lucide-react";

interface WelcomeScreenProps {
  onEnterPortal: () => void;
}

const WelcomeScreen = ({ onEnterPortal }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1929]">
      <div className="fixed inset-0 flex items-center justify-center bg-[#0A1929] z-50">
        <div className="relative w-full max-w-4xl mx-auto p-8 text-center">
          {/* Top decoration - flag and stars */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Flag className="h-16 w-16 text-[#B87333] animate-pulse" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-1">
                <Shield className="h-6 w-6 text-[#B87333]" />
                <Shield className="h-6 w-6 text-[#B87333]" />
                <Shield className="h-6 w-6 text-[#B87333]" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-10 rounded-lg border-2 border-[#B87333] shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Thank You for Your <span className="text-[#B87333]">Service</span>
            </h1>
            
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-[#B87333]/30 via-[#B87333] to-[#B87333]/30 rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Thrive MT is honored to support the mental health and wellbeing of our military members, veterans, and their families.
            </p>
            
            <p className="text-md md:text-lg text-gray-400 italic">
              "The strength of our nation is our military.<br />The strength of our military is our soldiers.<br />The strength of our soldiers is our families."
            </p>
            
            <div className="mt-12">
              <Button 
                variant="default"
                size="lg" 
                onClick={onEnterPortal}
                className="px-8 py-6 text-lg bg-[#B87333] hover:bg-[#B87333]/80"
              >
                Enter Portal
              </Button>
            </div>
          </div>
          
          {/* Bottom decoration */}
          <div className="mt-8 flex justify-center">
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#B87333] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
