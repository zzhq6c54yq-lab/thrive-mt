
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ArrowRight, BookOpen, Heart, Users } from "lucide-react";
import ThriveButton from "@/components/navigation/ThriveButton";
import PortalBackButton from "@/components/navigation/PortalBackButton";

const GoldenYearsWelcome: React.FC = () => {
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
        description: "Taking you to the Golden Years portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/golden-years-portal", { 
          state: { 
            fromWelcome: true,
            stayInPortal: true,
            preventTutorial: true
          }
        });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#034b45] via-[#046b62] to-[#067b6d] text-white py-8 px-4 relative">
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-20">
        <PortalBackButton returnPath="/" />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThriveButton size="sm" />
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-teal-300/30 relative overflow-hidden">
        {screenState === 'welcome' ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl"></div>
              <div className="relative p-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 border-2 border-teal-200/30 shadow-lg">
                <Sparkles className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-white leading-tight">
              Welcome to Your <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-100">Golden Years</span> Journey
            </h1>
            
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl mb-6 text-white leading-relaxed">
                This is a special time in your life—a time for reflection, wisdom, and new experiences. 
                Here at Thrive, we believe your golden years should be filled with purpose, connection,
                and joy.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-teal-200/30 mb-8 text-left">
                <h3 className="text-xl font-medium mb-4 text-teal-100 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-teal-300" /> Why This Journey Matters
                </h3>
                <p className="mb-4 text-white/90">
                  Every stage of life brings unique gifts and challenges. Your accumulated wisdom and life experience
                  are treasures to be shared. Whether you're embracing retirement, exploring new passions, or 
                  adapting to changes, we're here to support your mental wellness every step of the way.
                </p>
                <p className="text-white/90">
                  Our resources are designed specifically for seniors who want to thrive—not just survive—in their golden years.
                </p>
              </div>
              
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-teal-700/50 px-4 py-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-teal-200" />
                  <span className="text-teal-100">Legacy Journal</span>
                </div>
                <div className="flex items-center gap-2 bg-teal-700/50 px-4 py-2 rounded-full">
                  <Users className="h-5 w-5 text-teal-200" />
                  <span className="text-teal-100">Community Support</span>
                </div>
                <div className="flex items-center gap-2 bg-teal-700/50 px-4 py-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-teal-200" />
                  <span className="text-teal-100">Wisdom Sharing</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-white">
              What to Expect
            </h1>
            
            <div className="max-w-3xl mb-10 w-full">
              <div className="bg-gradient-to-r from-teal-800/40 to-emerald-800/40 backdrop-blur-sm rounded-xl p-6 border border-teal-300/30 mb-8">
                <ul className="space-y-5 text-left">
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-teal-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                    <span className="text-lg text-white">Specialized mental wellness tools designed for seniors</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-teal-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                    <span className="text-lg text-white">Legacy Journal to capture and preserve your life story for future generations</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-teal-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                    <span className="text-lg text-white">End-of-life planning resources to ensure peace of mind for you and your family</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-teal-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                    <span className="text-lg text-white">Community forums to connect with peers and share experiences</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-teal-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                    <span className="text-lg text-white">Resources for managing age-related transitions and challenges</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-teal-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                    <span className="text-lg text-white">Interactive family features to strengthen intergenerational bonds</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Enter Portal <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoldenYearsWelcome;
