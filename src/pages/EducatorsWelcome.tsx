import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Users, GraduationCap, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const EducatorsWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Educators Portal",
        description: "Taking you to the Educators Wellness portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/app/educators-portal", { 
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
      {/* Deep purple/slate education-themed background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1820] via-[#221e2a] to-[#282436]">
        {/* Subtle purple accent shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[12%] right-[10%] w-48 h-48 rounded-full bg-purple-600/30 blur-3xl"></div>
          <div className="absolute top-[48%] left-[8%] w-64 h-64 rounded-full bg-violet-600/20 blur-3xl"></div>
          <div className="absolute bottom-[18%] right-[28%] w-56 h-56 rounded-full bg-purple-700/20 blur-3xl"></div>
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
              <GraduationCap className="w-full h-full text-purple-300" />
            </div>
            <div className="absolute bottom-16 right-10 w-12 h-12">
              <BookOpen className="w-full h-full text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center text-center px-4 ${screenState === 'welcome' ? 'min-h-[65vh] animate-page-enter' : 'min-h-[85vh] animate-slide-in-right'}`}>
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-purple-700 to-violet-900 border-2 border-purple-400/30 shadow-lg">
                  <BookOpen className="h-12 w-12 text-purple-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-purple-400" />
                <GraduationCap className="h-5 w-5 text-purple-300" />
                <Star className="h-5 w-5 text-purple-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 tracking-tight">
                Esteemed Educators Portal
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space created with deep appreciation for those who shape minds and inspire futures.
                </p>
                
                <p className="text-lg text-purple-200/90 mb-6">
                  Teaching is one of the most rewarding—and demanding—professions. You pour your heart into 
                  nurturing young minds while navigating classroom challenges, administrative pressures, and 
                  the emotional weight of caring for your students. The light you kindle in others can only 
                  shine when your own flame is tended. This portal is designed to help you find that balance.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Burnout Prevention</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Educator Community</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <BookOpen className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Classroom Wellness</span>
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
                <GraduationCap className="h-5 w-5 text-purple-300" />
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
                      <span className="text-lg text-white">Resources tailored for education professionals dealing with classroom stress and administrative pressures</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Workshops focused on maintaining mental health while supporting student growth and development</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Assessments designed to evaluate educator burnout, compassion fatigue, and work-life balance</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Community support from peers who understand the unique challenges of modern education</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools for managing challenging classroom behavior without emotional exhaustion</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-purple-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-purple-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <span className="text-lg text-white">Resources for setting healthy boundaries with students, parents, and administration</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <BookOpen className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducatorsWelcome;
