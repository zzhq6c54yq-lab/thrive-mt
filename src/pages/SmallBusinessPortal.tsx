
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const WelcomeScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
        Small Business Mental Health Portal
      </h1>
      <div className="max-w-2xl">
        <p className="text-xl mb-6 text-white/90 font-medium">
          Welcome to your dedicated mental health space. Running or working at a small business 
          brings unique challenges – we're here to support your entrepreneurial journey.
        </p>
        <p className="text-lg mb-6 text-white/90 font-medium">
          Here, you'll find resources tailored specifically for business owners and employees
          balancing work demands, financial pressures, and personal wellbeing.
        </p>
        <p className="text-lg mb-8 text-white/90 font-medium">
          Your mental wellbeing matters as much as your business success. Let's prioritize both together.
        </p>
      </div>
      <Button 
        onClick={onContinue}
        className="bg-[#F97316] hover:bg-[#FB923C] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
      >
        Next <ArrowRight className="ml-1 h-5 w-5" />
      </Button>
    </div>
  );
};

const PortalIntroScreen: React.FC<{ onEnterPortal: () => void }> = ({ onEnterPortal }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
        Welcome to Your Business Wellness Hub
      </h1>
      <div className="max-w-2xl mb-8">
        <p className="text-xl mb-6 text-white/90 font-medium">
          This space is designed specifically for entrepreneurs and small business employees,
          balancing work responsibilities, team management, and personal wellbeing.
        </p>
        <p className="text-lg mb-8 text-white/90 font-medium">
          Click below to access specialized resources, peer support networks, 
          and tools designed with the small business environment in mind.
        </p>
      </div>
      <Button 
        onClick={onEnterPortal}
        className="bg-[#F97316] hover:bg-[#FB923C] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
      >
        Enter Portal
      </Button>
    </div>
  );
};

const SmallBusinessPortal: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'intro' | 'portal'>('welcome');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Removed auto-transition effect since we're now using a Next button

  const handleContinueToIntro = () => {
    setScreenState('intro');
  };

  const handleEnterPortal = () => {
    toast({
      title: "Welcome to the Business Wellness Hub",
      description: "Accessing your small business resources...",
      duration: 3000
    });
    
    navigate("/small-business-experience");
  };

  const renderCurrentScreen = () => {
    switch (screenState) {
      case 'welcome':
        return <WelcomeScreen onContinue={handleContinueToIntro} />;
      case 'intro':
        return <PortalIntroScreen onEnterPortal={handleEnterPortal} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23F97316%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#F97316]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#FB923C]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default SmallBusinessPortal;
