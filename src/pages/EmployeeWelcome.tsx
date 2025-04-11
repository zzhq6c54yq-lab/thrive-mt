
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Brain, ChartBar, ArrowRight, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import BackButton from "@/components/navigation/BackButton";

const EmployeeWelcome: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Employee Portal",
        description: "Taking you to the employee resources dashboard",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/employee-dashboard", { 
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
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#283052] via-[#2b3658] to-[#1f2942]">
        {/* Abstract shapes representing work elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-md rotate-45 bg-blue-500"></div>
          <div className="absolute top-[35%] right-[12%] w-60 h-60 rounded-md rotate-12 bg-indigo-600"></div>
          <div className="absolute bottom-[25%] left-[20%] w-80 h-80 rounded-md -rotate-12 bg-purple-700"></div>
          <div className="absolute bottom-[8%] right-[15%] w-40 h-40 rounded-md rotate-45 bg-blue-800"></div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-900/30 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        <div className="absolute top-4 left-4 z-20">
          <BackButton />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20">
              <TrendingUp className="w-full h-full text-blue-300" />
            </div>
            <div className="absolute bottom-10 right-10 w-14 h-14">
              <Brain className="w-full h-full text-indigo-400" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 border-2 border-blue-400/30 shadow-lg">
                  <Users className="h-12 w-12 text-blue-200" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight">
                Employee Resources
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a dedicated space for employees in small businesses to find support, resources, and tools for mental wellbeing.
                </p>
                
                <p className="text-lg text-blue-200/90 mb-6">
                  Working for a small business comes with unique challenges—multiple responsibilities, close-knit dynamics, and sometimes blurred boundaries between work and personal life. This portal acknowledges your valuable contribution and provides resources tailored to support your wellbeing in this unique environment.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full">
                    <Brain className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Stress Management</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-900/30 px-3 py-1 rounded-full">
                    <ChartBar className="h-4 w-4 text-indigo-300" />
                    <span className="text-sm text-indigo-200">Work-Life Balance</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-200">Workplace Wellness</span>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools and resources specifically designed for maintaining mental wellness in a small business environment</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Strategies for maintaining healthy work-life boundaries when roles and responsibilities often expand in small teams</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to mental health assessments specifically tailored to workplace stressors and pressures</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Connection to a community of other small business employees who understand your unique challenges</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-blue-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-blue-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-lg text-white">Workshops and resources for developing skills that support both career growth and mental wellbeing</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <Zap className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeWelcome;
