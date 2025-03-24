
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";

interface OptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  gradient: string;
  borderColor: string;
}

const PortalOption: React.FC<OptionProps> = ({ title, description, icon, onClick, gradient, borderColor }) => (
  <Card 
    className="relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-md border-0 h-full flex flex-col"
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
    
    <CardHeader className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
      </div>
    </CardHeader>
    
    <CardContent className="relative z-10 flex-grow">
      <CardDescription className="text-white/90 text-lg">{description}</CardDescription>
    </CardContent>
    
    <CardFooter className="relative z-10">
      <Button 
        className="mt-auto bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Explore Program <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
    
    <div 
      className="absolute inset-0 border-2 opacity-50 group-hover:opacity-100 transition-opacity"
      style={{ borderColor }}  
    ></div>
  </Card>
);

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

const PortalOptionsScreen: React.FC<{ onSelectOption: (option: 'business' | 'employee') => void }> = ({ onSelectOption }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <HomeButton />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
        Choose Your Path
      </h1>
      
      <div className="max-w-5xl w-full mx-auto mb-10">
        <p className="text-xl mb-8 text-white/90 font-medium">
          Select the program that best matches your needs:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <PortalOption 
            title="Business Hub"
            description="Resources designed for entrepreneurs and business owners managing the stress of running a business."
            icon={<Briefcase className="h-6 w-6 text-white" />}
            onClick={() => onSelectOption('business')}
            gradient="from-[#F97316]/80 to-[#FB923C]/80"
            borderColor="#F97316"
          />
          
          <PortalOption 
            title="Employee Readiness"
            description="Support and tools for employees in the workforce to maintain mental health and achieve work-life balance."
            icon={<Users className="h-6 w-6 text-white" />}
            onClick={() => onSelectOption('employee')}
            gradient="from-[#22C55E]/80 to-[#4ADE80]/80"
            borderColor="#22C55E"
          />
        </div>
      </div>
    </div>
  );
};

const SmallBusinessPortal: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'options'>('welcome');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleContinueToOptions = () => {
    setScreenState('options');
  };

  const handleSelectOption = (option: 'business' | 'employee') => {
    toast({
      title: option === 'business' ? "Business Hub Selected" : "Employee Readiness Selected",
      description: "Accessing your specialized resources...",
      duration: 3000
    });
    
    if (option === 'business') {
      navigate("/small-business-experience");
    } else {
      navigate("/employee-readiness");
    }
  };

  const renderCurrentScreen = () => {
    switch (screenState) {
      case 'welcome':
        return <WelcomeScreen onContinue={handleContinueToOptions} />;
      case 'options':
        return <PortalOptionsScreen onSelectOption={handleSelectOption} />;
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
