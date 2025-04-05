
import React from "react";
import { Wallet, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  credits: number;
  setActiveTab: (tab: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ credits, setActiveTab }) => {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-8 rounded-xl w-full shadow-md">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800">Welcome to our Co-Pay Credits Program</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Designed to reward our community for prioritizing their mental health and well-being. 
            This innovative rewards system enables you to earn dollar-value credits every time you invest in your 
            health through therapy sessions, subscriptions, and purchases.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-6 h-auto text-lg shadow-md transition-transform hover:scale-105"
              onClick={() => setActiveTab("earn")}
            >
              Start Earning Credits
            </Button>
            <Button 
              variant="outline" 
              className="border-amber-800 text-amber-800 hover:bg-amber-100 font-medium px-6 py-6 h-auto text-lg shadow-sm"
              onClick={() => setActiveTab("how-it-works")}
            >
              How It Works
            </Button>
            <Link to="/family-support">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-6 h-auto text-lg shadow-md transition-transform hover:scale-105"
              >
                <Users className="mr-2 h-5 w-5" />
                Family Support
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full bg-amber-300/30 animate-pulse blur-xl"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <div className="text-center text-white">
                <Wallet className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
                <span className="text-4xl font-bold block">${credits}</span>
                <span className="text-sm font-medium opacity-80">Credits Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
