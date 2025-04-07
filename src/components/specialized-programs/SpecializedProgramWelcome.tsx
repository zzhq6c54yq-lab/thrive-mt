
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import HomeButton from "@/components/HomeButton";

interface WelcomeScreenProps {
  title: string;
  description: string;
  whatToExpect: string[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  portalPath: string;
  icon: React.ReactNode;
  textColor?: string;
  descriptionTextColor?: string;
  backgroundColor?: string;
}

const SpecializedProgramWelcome: React.FC<WelcomeScreenProps> = ({
  title,
  description,
  whatToExpect,
  color,
  gradientFrom,
  gradientTo,
  borderColor,
  portalPath,
  icon,
  textColor = "text-white",
  descriptionTextColor = "text-white/90",
  backgroundColor = "bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]"
}) => {
  const [screenState, setScreenState] = useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Portal",
        description: `Taking you to the ${title} portal`,
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate(portalPath, { 
          state: { 
            fromWelcome: true 
          }
        });
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen ${backgroundColor} text-white py-8 px-4 md:px-8 relative`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-${gradientFrom}/20 to-transparent rounded-full blur-3xl -z-10`}></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-${gradientTo}/20 to-transparent rounded-full blur-3xl -z-10`}></div>
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] text-center px-2 md:px-4 animate-fade-in">
          {screenState === 'welcome' ? (
            <>
              <div className={`p-5 rounded-full bg-${color}/20 backdrop-blur-sm mb-6`}>
                {icon}
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[${borderColor}] to-white`}>
                {title}
              </h1>
              
              <div className="max-w-2xl mb-10">
                <p className={`text-xl md:text-2xl mb-6 ${descriptionTextColor} font-medium`}>
                  {description}
                </p>
              </div>
              
              <Button 
                onClick={handleContinue}
                className={`bg-${color} hover:bg-${color}/90 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}
              >
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <h1 className={`text-3xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[${borderColor}] to-white`}>
                What to Expect
              </h1>
              
              <div className="max-w-4xl mb-10 w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-8">
                  <ul className="space-y-4 text-left">
                    {whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`p-1 rounded-full bg-${color}/20 mr-3 mt-1`}>
                          <div className={`w-3 h-3 rounded-full bg-${color}`}></div>
                        </div>
                        <span className={`text-base md:text-lg ${textColor}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className={`bg-${color} hover:bg-${color}/90 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}
              >
                Enter Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecializedProgramWelcome;
