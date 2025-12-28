import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope, Heart, Users, Sparkles, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const ChronicIllnessWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Chronic Illness Portal",
        description: "Taking you to the Chronic Illness Support portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/chronic-illness-portal", { 
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
      {/* Soft healing purple/slate calming background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1c1a20] via-[#22202a] to-[#282432]">
        {/* Subtle purple accent shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[15%] w-48 h-48 rounded-full bg-purple-500/30 blur-3xl"></div>
          <div className="absolute top-[50%] right-[12%] w-64 h-64 rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute bottom-[15%] left-[30%] w-56 h-56 rounded-full bg-purple-600/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className={`max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-900/30 relative overflow-hidden ${screenState === 'welcome' ? 'min-h-[75vh]' : 'min-h-screen'}`}>
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-16 h-16">
              <Heart className="w-full h-full text-purple-300" />
            </div>
            <div className="absolute bottom-16 right-10 w-12 h-12">
              <Stethoscope className="w-full h-full text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-purple-600 to-violet-800 border-2 border-purple-400/30 shadow-lg">
                  <Stethoscope className="h-12 w-12 text-purple-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-purple-400" />
                <Heart className="h-5 w-5 text-purple-300" />
                <Star className="h-5 w-5 text-purple-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 tracking-tight">
                Chronic Illness Support
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space designed with deep understanding of life with chronic conditions.
                </p>
                
                <p className="text-lg text-purple-200/90 mb-6">
                  Living with a chronic illness means navigating not just physical challenges, but emotional 
                  ones too—the grief of lost abilities, the frustration of invisible symptoms, the exhaustion 
                  of constantly advocating for yourself. Your chronic condition may be part of your life's 
                  journey, but it doesn't define who you are. This portal provides specialized support to 
                  help you thrive despite the challenges.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Emotional Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Community Connection</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Stethoscope className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Specialized Resources</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-purple-400" />
                <Heart className="h-5 w-5 text-purple-300" />
                <Star className="h-5 w-5 text-purple-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-purple-900/40 to-violet-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Specialized mental health resources tailored for those managing long-term health conditions</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools for managing the emotional aspects of chronic illness—grief, frustration, anxiety, and hope</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Community support from others who truly understand the daily realities of living with chronic conditions</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to professionals who specialize in the intersection of chronic illness and mental health</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Mindfulness and relaxation techniques adapted for chronic pain, fatigue, and limited mobility</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Resources for caregivers and family members to better understand and support you</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <Sparkles className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChronicIllnessWelcome;
