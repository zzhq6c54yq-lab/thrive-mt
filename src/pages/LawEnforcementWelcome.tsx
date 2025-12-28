import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Badge, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const LawEnforcementWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Law Enforcement Portal",
        description: "Taking you to the Law Enforcement Wellness portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/law-enforcement-portal", { 
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
      {/* Navy/slate professional background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#141a24] via-[#182030] to-[#1c2438]">
        {/* Subtle blue accent shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[8%] left-[12%] w-48 h-48 rounded-full bg-blue-700/30 blur-3xl"></div>
          <div className="absolute top-[45%] right-[10%] w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[25%] w-56 h-56 rounded-full bg-blue-800/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className={`max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-900/30 relative overflow-hidden ${screenState === 'welcome' ? 'min-h-[75vh]' : 'min-h-screen'}`}>
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-16 h-16">
              <Shield className="w-full h-full text-blue-300" />
            </div>
            <div className="absolute bottom-16 right-10 w-12 h-12">
              <Badge className="w-full h-full text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-blue-800 to-indigo-900 border-2 border-blue-400/30 shadow-lg">
                  <Shield className="h-12 w-12 text-blue-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-blue-400" />
                <Badge className="h-5 w-5 text-blue-300" />
                <Star className="h-5 w-5 text-blue-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 tracking-tight">
                Law Enforcement Wellness
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space created specifically for those who serve and protect our communities every day.
                </p>
                
                <p className="text-lg text-blue-200/90 mb-6">
                  As a law enforcement officer, you face challenges that most people will never experience. 
                  The weight of critical decisions, exposure to trauma, and the constant need for vigilance 
                  take a toll that often goes unspoken. This portal provides confidential, specialized mental 
                  wellness resources created by professionals who understand the unique demands of the badge.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Shield className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Confidential Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Peer Networks</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Family Resources</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-blue-400" />
                <Badge className="h-5 w-5 text-blue-300" />
                <Star className="h-5 w-5 text-blue-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to law enforcement-specific mental health resources and tools developed by LEO professionals</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Confidential peer support networks connecting you with fellow officers who understand your experiences</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Specialized stress management techniques designed for the unique pressures of law enforcement work</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Critical incident and trauma support resources for processing difficult calls and experiences</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Family support services designed specifically for law enforcement families and their unique challenges</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">24/7 crisis support from professionals who understand the demands and culture of law enforcement</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <Shield className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawEnforcementWelcome;
