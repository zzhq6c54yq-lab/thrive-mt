
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Star, Flag, Medal, Heart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const DoDWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering DoD Portal",
        description: "Taking you to the Department of Defense portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/dod-portal", { 
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
      {/* Patriotic background with subtle flag elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0c1b44] via-[#101d36] to-[#1a1e2c]">
        {/* Red and white stripes - subtle background element */}
        <div className="absolute bottom-0 left-0 right-0 h-60 opacity-5">
          {[...Array(13)].map((_, i) => (
            <div 
              key={i} 
              className={`h-[15px] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
            />
          ))}
        </div>
        
        {/* Stars field in the upper left - subtle background element */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 opacity-5">
          <div className="grid grid-cols-6 gap-4 p-4">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="text-white">
                <Star className="h-4 w-4 fill-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-900/30 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative flag overlay */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <div className="relative w-full h-full">
            {/* Flag blue field */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-800"></div>
            
            {/* Flag stripes */}
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute h-[14%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                style={{ top: `${i * 14 + 50}%` }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 border-2 border-blue-400/30 shadow-lg">
                  <Shield className="h-12 w-12 text-blue-200" />
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-red-400" />
                <Star className="h-5 w-5 text-white" />
                <Star className="h-5 w-5 text-blue-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-blue-400 tracking-tight">
                Service Member & Veteran Support
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space designed specifically for those who have bravely served our nation. 
                  Your service matters, and so does your wellbeing.
                </p>
                
                <p className="text-lg text-blue-200/90 mb-6">
                  Whether you're active duty, a reservist, a veteran, or a family member, 
                  this portal provides specialized mental wellness resources tailored to the 
                  unique challenges and experiences of military life. You've dedicated yourself
                  to protecting others—now it's time to focus on taking care of yourself.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Medal className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Specialized Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Shield className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Confidential Resources</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Heart className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Peer Understanding</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-red-400" />
                <Star className="h-5 w-5 text-white" />
                <Star className="h-5 w-5 text-blue-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-blue-400 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to specialized PTSD and combat stress management resources developed by experts with military experience</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools specifically designed to support transition to civilian life, including career resources and adjustment strategies</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Family support resources for deployments, relocations, and navigating the unique challenges of military family life</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Peer community connections with other service members and veterans who understand your experiences</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Evidence-based assessments designed for military-specific challenges, with confidential results</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to workshops led by professionals with military experience who understand your unique challenges</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <Flag className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoDWelcome;
