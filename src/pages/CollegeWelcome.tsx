import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Brain, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const CollegeWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering College Portal",
        description: "Taking you to the College Experience portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/college-portal", { 
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
      {/* Deep indigo/slate academic background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1f2c] via-[#1e2536] to-[#232840]">
        {/* Abstract shapes representing campus life */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[5%] w-48 h-48 rounded-full bg-indigo-500/30 blur-3xl"></div>
          <div className="absolute top-[30%] right-[15%] w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[25%] w-56 h-56 rounded-full bg-violet-700/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className={`max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-indigo-900/30 relative overflow-hidden ${screenState === 'welcome' ? 'min-h-[75vh]' : 'min-h-screen'}`}>
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative campus elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20">
              <GraduationCap className="w-full h-full text-indigo-300" />
            </div>
            <div className="absolute bottom-10 right-10 w-14 h-14">
              <BookOpen className="w-full h-full text-purple-300" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-indigo-700 to-purple-900 border-2 border-indigo-400/30 shadow-lg">
                  <GraduationCap className="h-12 w-12 text-indigo-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <Sparkles className="h-5 w-5 text-purple-300" />
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 tracking-tight">
                College Experience Portal
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space designed specifically for students navigating the exciting and sometimes overwhelming journey through college life.
                </p>
                
                <p className="text-lg text-indigo-200/90 mb-6">
                  College is a time of tremendous growth, discovery, and challenge. You're balancing academics, 
                  social life, self-discovery, and planning for your future—all while perhaps living independently 
                  for the first time. This portal is your sanctuary for mental wellbeing during this transformative 
                  chapter of your life.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-indigo-900/30 px-3 py-1 rounded-full">
                    <Brain className="h-4 w-4 text-indigo-300" />
                    <span className="text-sm text-indigo-200">Academic Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-indigo-300" />
                    <span className="text-sm text-indigo-200">Emotional Balance</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-indigo-300" />
                    <span className="text-sm text-indigo-200">Social Connection</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <Sparkles className="h-5 w-5 text-purple-300" />
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-indigo-900/40 to-purple-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-indigo-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-indigo-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                      <span className="text-lg text-white">Strategies for managing academic stress, test anxiety, and balancing your course load</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-indigo-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-indigo-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools for balancing studies, social life, part-time work, and self-care without burnout</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-indigo-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-indigo-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                      <span className="text-lg text-white">Resources for common mental health challenges faced by college students, including homesickness and imposter syndrome</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-indigo-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-indigo-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                      <span className="text-lg text-white">Peer support networks to connect with other students experiencing similar challenges</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-indigo-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-indigo-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                      <span className="text-lg text-white">Sleep, nutrition, and exercise guidance specifically tailored for campus life and limited resources</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-indigo-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-indigo-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                      <span className="text-lg text-white">Study techniques and time management strategies proven effective for academic success</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
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

export default CollegeWelcome;
