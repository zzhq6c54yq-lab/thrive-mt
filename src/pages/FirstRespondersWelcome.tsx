import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Flame, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const FirstRespondersWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering First Responders Portal",
        description: "Taking you to the First Responders Wellness portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/first-responders-portal", { 
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
      {/* Deep ember/slate professional background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1f1a18] via-[#2a2220] to-[#2c2420]">
        {/* Subtle warm accent shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[10%] right-[10%] w-48 h-48 rounded-full bg-orange-600/30 blur-3xl"></div>
          <div className="absolute top-[50%] left-[10%] w-64 h-64 rounded-full bg-red-600/20 blur-3xl"></div>
          <div className="absolute bottom-[15%] right-[25%] w-56 h-56 rounded-full bg-orange-700/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className={`max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-orange-900/30 relative overflow-hidden ${screenState === 'welcome' ? 'min-h-[75vh]' : 'min-h-screen'}`}>
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-16 h-16">
              <Flame className="w-full h-full text-orange-300" />
            </div>
            <div className="absolute bottom-16 right-10 w-12 h-12">
              <Shield className="w-full h-full text-orange-400" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-orange-700 to-red-900 border-2 border-orange-400/30 shadow-lg">
                  <Shield className="h-12 w-12 text-orange-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-orange-400" />
                <Flame className="h-5 w-5 text-orange-300" />
                <Star className="h-5 w-5 text-orange-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-300 to-orange-400 tracking-tight">
                First Responders Wellness
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space created specifically for the heroes who run toward danger when others run away.
                </p>
                
                <p className="text-lg text-orange-200/90 mb-6">
                  As a first responder—whether firefighter, EMT, paramedic, or emergency dispatcher—you face 
                  situations that most people can't imagine. The weight of what you witness and the pressure 
                  of split-second decisions take a toll. This portal provides specialized mental wellness 
                  resources designed by professionals who understand the unique challenges of your service.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-orange-900/30 px-3 py-1 rounded-full">
                    <Shield className="h-4 w-4 text-orange-300" />
                    <span className="text-sm text-orange-200">Critical Incident Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-orange-300" />
                    <span className="text-sm text-orange-200">Peer Understanding</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-orange-300" />
                    <span className="text-sm text-orange-200">Confidential Resources</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-orange-400" />
                <Flame className="h-5 w-5 text-orange-300" />
                <Star className="h-5 w-5 text-orange-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-300 to-orange-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-orange-900/40 to-red-800/40 backdrop-blur-sm rounded-xl p-6 border border-orange-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-orange-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-orange-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-lg text-white">Critical incident stress management resources developed by experts with first responder experience</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-orange-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-orange-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-lg text-white">Peer support networks connecting you with fellow first responders who understand your experiences</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-orange-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-orange-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-lg text-white">Trauma-informed assessments designed specifically for the cumulative stress of emergency response work</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-orange-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-orange-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-lg text-white">Sleep and recovery tools for those working irregular shifts and overnight rotations</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-orange-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-orange-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-lg text-white">Family support resources for helping loved ones understand the demands of first responder life</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-orange-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-orange-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-lg text-white">Resilience-building workshops led by professionals who have served in emergency response roles</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <Flame className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstRespondersWelcome;
