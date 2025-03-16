
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Welcome screens before the main portal
const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
        Military Mental Health Portal
      </h1>
      <div className="max-w-2xl">
        <p className="text-xl mb-6 text-white/90">
          Thank you for your service and sacrifice. Your mental health matters deeply 
          to us, and we're honored to support your journey toward wellness.
        </p>
        <p className="text-lg mb-6 text-white/80">
          Here, you'll find resources tailored specifically for active duty members, veterans, 
          and military families facing the unique challenges of military life.
        </p>
        <p className="text-lg text-white/80">
          You are not alone in this journey. We're here to support you every step of the way.
        </p>
      </div>
    </div>
  );
};

const PortalIntroScreen: React.FC<{ onEnterPortal: () => void }> = ({ onEnterPortal }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
        Welcome to Your Military Support Portal
      </h1>
      <div className="max-w-2xl mb-8">
        <p className="text-xl mb-6 text-white/90">
          This secure space is designed specifically for service members, veterans, 
          and their families to access mental health resources.
        </p>
        <p className="text-lg mb-8 text-white/80">
          Click below to access specialized resources, connect with peers, 
          and discover tools to support your mental health journey.
        </p>
      </div>
      <Button 
        variant="gold" 
        size="lg" 
        onClick={onEnterPortal}
        className="text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(184,115,51,0.3)]"
      >
        Enter Portal
      </Button>
    </div>
  );
};

const DoDPortal: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'intro' | 'portal'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (screenState === 'welcome') {
      const timer = setTimeout(() => {
        setScreenState('intro');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [screenState]);

  const handleEnterPortal = () => {
    toast({
      title: "Welcome to the Military Support Portal",
      description: "Accessing your personalized dashboard...",
    });
    navigate("/military-support");
  };

  const renderCurrentScreen = () => {
    switch (screenState) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'intro':
        return <PortalIntroScreen onEnterPortal={handleEnterPortal} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden border border-white/5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default DoDPortal;
