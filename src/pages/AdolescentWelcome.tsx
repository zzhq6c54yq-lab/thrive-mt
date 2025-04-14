
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, ArrowRight, Heart, Star, Smile } from "lucide-react";
import ThriveButton from "@/components/navigation/ThriveButton";
import PortalBackButton from "@/components/navigation/PortalBackButton";

const AdolescentWelcome: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Adolescent Portal",
        description: "Taking you to the age selection screen",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/adolescent-selection", { 
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
    <div className="min-h-screen bg-gradient-to-b from-[#6d28d9] via-[#7e22ce] to-[#a21caf] text-white py-8 px-4 relative">
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-20">
        <PortalBackButton returnPath="/" />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThriveButton size="sm" />
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2230%22 height=%2230%22 viewBox=%220 0 30 30%22><circle cx=%2215%22 cy=%2215%22 r=%225%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-300/30 relative overflow-hidden">
        {screenState === 'welcome' ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl"></div>
              <div className="relative p-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-purple-200/30 shadow-lg">
                <Users className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-white leading-tight">
              The <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-100">Adolescent Experience</span>
            </h1>
            
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl mb-6 text-white leading-relaxed">
                A journey of growth, discovery, and support designed specifically for children and teens of all ages.
                We provide age-appropriate resources that evolve as your child develops.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-purple-200/30 mb-8 text-left">
                <h3 className="text-xl font-medium mb-4 text-purple-100 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-300" /> Our Approach
                </h3>
                <p className="mb-4 text-white/90">
                  Every child is unique, and their mental wellness needs change as they grow. Our platform offers
                  specialized content for different age groups, ensuring that your child receives support that's
                  just right for their developmental stage.
                </p>
                <p className="text-white/90">
                  From playful activities for young children to thoughtful resources for teens, we're here to help
                  nurture healthy minds at every step of the journey.
                </p>
              </div>
              
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-purple-700/50 px-4 py-2 rounded-full">
                  <Smile className="h-5 w-5 text-purple-200" />
                  <span className="text-purple-100">Age-Appropriate</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-700/50 px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 text-purple-200" />
                  <span className="text-purple-100">Interactive Tools</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-700/50 px-4 py-2 rounded-full">
                  <Heart className="h-5 w-5 text-purple-200" />
                  <span className="text-purple-100">Parent Resources</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-white">
              What to Expect
            </h1>
            
            <div className="max-w-3xl mb-10 w-full">
              <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-300/30 mb-8">
                <ul className="space-y-5 text-left">
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-pink-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    </div>
                    <span className="text-lg text-white">Age-specific content designed for different developmental stages</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-pink-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    </div>
                    <span className="text-lg text-white">Interactive tools and games that make mental wellness engaging</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-pink-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    </div>
                    <span className="text-lg text-white">Resources for parents to support their children's mental health</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-pink-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    </div>
                    <span className="text-lg text-white">Safe spaces for self-expression and emotional growth</span>
                  </li>
                  
                  <li className="flex items-start rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    <div className="p-1 rounded-full bg-pink-500/40 mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    </div>
                    <span className="text-lg text-white">Expert-developed content addressing the unique challenges of each age group</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Choose Age Group <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdolescentWelcome;
