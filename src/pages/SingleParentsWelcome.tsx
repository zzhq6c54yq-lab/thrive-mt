import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Clock, Sparkles, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const SingleParentsWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Single Parents Portal",
        description: "Taking you to the Single Parent Wellness portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/single-parents-portal", { 
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
      {/* Warm slate/amber neutral background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1a1f] via-[#2a2820] to-[#262520]">
        {/* Subtle warm accent shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[15%] left-[10%] w-48 h-48 rounded-full bg-amber-600/30 blur-3xl"></div>
          <div className="absolute top-[40%] right-[15%] w-64 h-64 rounded-full bg-amber-500/20 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[30%] w-56 h-56 rounded-full bg-orange-600/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className={`max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-900/30 relative overflow-hidden ${screenState === 'welcome' ? 'min-h-[75vh]' : 'min-h-screen'}`}>
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-16 h-16">
              <Heart className="w-full h-full text-amber-300" />
            </div>
            <div className="absolute bottom-16 right-10 w-12 h-12">
              <Star className="w-full h-full text-amber-400" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 border-2 border-amber-400/30 shadow-lg">
                  <Heart className="h-12 w-12 text-amber-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-amber-400" />
                <Star className="h-5 w-5 text-amber-300" />
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 tracking-tight">
                Single Parent Wellness Portal
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space designed with deep understanding of your unique journey as a single parent.
                </p>
                
                <p className="text-lg text-amber-200/90 mb-6">
                  Raising children independently is one of the most demanding yet rewarding paths in life. 
                  You're juggling work, parenting, household responsibilities, and somehow finding time for yourself—
                  often without a partner to share the load. This portal is your sanctuary for support, resources, 
                  and a community that truly understands.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">Self-Care Focus</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">Parent Community</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">Time Management</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-amber-400" />
                <Star className="h-5 w-5 text-amber-300" />
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-800/40 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Stress and burnout assessments tailored specifically for the unique challenges of single parenting</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Time management strategies for balancing work, family, and personal wellbeing without guilt</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Self-care resources designed for busy parents who have limited time but deserve rest and renewal</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Financial wellness tools and planning resources to reduce money-related stress</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Co-parenting communication strategies and resources for navigating shared custody situations</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Parent Network for connection, shared experiences, and mutual support from those who truly understand</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Work-life integration workshops designed for the realities of single-parent households</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
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

export default SingleParentsWelcome;
