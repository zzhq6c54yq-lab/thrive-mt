
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, LineChart, ShieldCheck, Building, ArrowRight, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const SmallBusinessWelcome: React.FC = () => {
  const [screenState, setScreenState] = React.useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Small Business Portal",
        description: "Taking you to the Small Business portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/small-business-portal", { 
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
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#523111] via-[#472b15] to-[#2a1f17]">
        {/* Abstract shapes representing business elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-md rotate-45 bg-amber-500"></div>
          <div className="absolute top-[35%] right-[12%] w-60 h-60 rounded-md rotate-12 bg-orange-600"></div>
          <div className="absolute bottom-[25%] left-[20%] w-80 h-80 rounded-md -rotate-12 bg-amber-700"></div>
          <div className="absolute bottom-[8%] right-[15%] w-40 h-40 rounded-md rotate-45 bg-orange-800"></div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto bg-[#00000040] backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-900/30 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        {/* Decorative business elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20">
              <TrendingUp className="w-full h-full text-amber-300" />
            </div>
            <div className="absolute bottom-10 right-10 w-14 h-14">
              <Building className="w-full h-full text-amber-400" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-amber-700 to-orange-900 border-2 border-amber-400/30 shadow-lg">
                  <Briefcase className="h-12 w-12 text-amber-200" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 tracking-tight">
                Small Business Portal
              </h1>
              
              <div className="max-w-2xl mb-8">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to a space crafted specifically for entrepreneurs, small business owners, and the teams that power small businesses forward.
                </p>
                
                <p className="text-lg text-amber-200/90 mb-6">
                  Running or working for a small business comes with unique pressures—market uncertainty, 
                  financial stress, multiple responsibilities, and the weight of decisions that impact 
                  livelihoods. This portal acknowledges your courage and dedication, providing mental 
                  wellness resources tailored to the entrepreneurial journey.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                    <LineChart className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">Business Resilience</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                    <ShieldCheck className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">Stress Management</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                    <Building className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">Workspace Wellness</span>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-800/40 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Resources tailored for managing the specific stresses of running a business, from cash flow concerns to customer relations</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Support for balancing work demands, financial pressure, personal wellbeing, and family responsibilities</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools to help create a mentally healthy workplace culture that supports your team while maximizing productivity</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Specialized resources for both business owners and employees, addressing the unique challenges of each role</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Strategies for managing work-life balance in a small business environment where boundaries often blur</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-amber-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-amber-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to workshops led by mental health experts with business experience who understand entrepreneurial challenges</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
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

export default SmallBusinessWelcome;
