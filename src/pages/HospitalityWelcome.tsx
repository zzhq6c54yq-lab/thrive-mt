import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Heart, Users, Clock, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const HospitalityWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Hospitality Portal",
        description: "Taking you to the Hospitality Industry Wellness portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/hospitality-portal", { 
          state: { 
            fromWelcome: true,
            preventTutorial: true,
            returnToMain: true 
          }
        });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen text-white py-8 px-4 relative">
      {/* Deep teal/slate calming background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1f20] via-[#1e2a28] to-[#202c28]">
        {/* Subtle teal accent shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[12%] left-[8%] w-48 h-48 rounded-full bg-teal-600/30 blur-3xl"></div>
          <div className="absolute top-[45%] right-[12%] w-64 h-64 rounded-full bg-cyan-600/20 blur-3xl"></div>
          <div className="absolute bottom-[18%] left-[28%] w-56 h-56 rounded-full bg-teal-700/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className={`max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-teal-900/30 relative overflow-hidden ${screenState === 'welcome' ? 'min-h-[75vh]' : 'min-h-screen'}`}>
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-16 h-16">
              <UtensilsCrossed className="w-full h-full text-teal-300" />
            </div>
            <div className="absolute bottom-16 right-10 w-12 h-12">
              <Star className="w-full h-full text-teal-400" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-teal-700 to-cyan-900 border-2 border-teal-400/30 shadow-lg">
                  <UtensilsCrossed className="h-12 w-12 text-teal-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-teal-400" />
                <Star className="h-5 w-5 text-teal-300" />
                <Star className="h-5 w-5 text-teal-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 tracking-tight">
                Hospitality Industry Wellness
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space designed specifically for those who dedicate themselves to creating memorable experiences for others.
                </p>
                
                <p className="text-lg text-teal-200/90 mb-6">
                  Working in hospitality means long hours on your feet, managing demanding guests, and maintaining 
                  composure under pressure—all while creating warmth and welcoming experiences for others. 
                  The emotional labor of service work often goes unrecognized. This portal acknowledges your 
                  dedication and provides resources tailored to the unique challenges of the hospitality industry.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-teal-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-teal-300" />
                    <span className="text-sm text-teal-200">Burnout Prevention</span>
                  </div>
                  <div className="flex items-center gap-2 bg-teal-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-teal-300" />
                    <span className="text-sm text-teal-200">Industry Community</span>
                  </div>
                  <div className="flex items-center gap-2 bg-teal-900/30 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 text-teal-300" />
                    <span className="text-sm text-teal-200">Shift Work Support</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-teal-400" />
                <Star className="h-5 w-5 text-teal-300" />
                <Star className="h-5 w-5 text-teal-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-teal-900/40 to-cyan-800/40 backdrop-blur-sm rounded-xl p-6 border border-teal-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Industry-specific assessments tailored to the high-pressure environment of hospitality work</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Strategies for managing difficult guest interactions and maintaining emotional composure</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Self-care resources designed for those who spend long hours on their feet serving others</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Stress management techniques specifically for fast-paced, high-volume environments</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Work-life balance tools for those with irregular schedules, late shifts, and weekend work</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Community support from peers who truly understand the unique challenges of hospitality work</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-teal-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-teal-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      </div>
                      <span className="text-lg text-white">Practical workshops on building resilience and preventing burnout in service industries</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <UtensilsCrossed className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalityWelcome;
