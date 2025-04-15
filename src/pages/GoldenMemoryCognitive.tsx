
import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Dumbbell, Calendar, Lightbulb, PlayCircle, ArrowRight } from "lucide-react";

const GoldenMemoryCognitive: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3A302A] via-[#4A3F36] to-[#5D4C3B] text-white">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm-16 4h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z%22 fill=%22%23C8C8C9%22 fill-opacity=%220.05%22/></svg>')] opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 z-0"></div>
      
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title="Memory & Cognitive Health"
        portalMode={true}
        portalPath="/golden-years-portal"
      />
      
      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-[#2A2420]/90 backdrop-blur-md border-2 border-[#D4AF37]/30 mb-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#3A302A] to-[#2A2420] border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#D4AF37]/20">
                  <Brain className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-[#F5DEB3]">Brain Fitness Resources</CardTitle>
                  <p className="text-[#F5DEB3]/80 mt-1">Keep your mind sharp, active, and engaged</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <p className="text-gray-100 mb-6">
                Maintaining cognitive health is essential for quality of life in your golden years. Our 
                collection of resources, activities, and exercises are specifically designed to help you 
                keep your mind sharp, improve memory function, and enhance overall brain health.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1A1811]/60 border border-[#D4AF37]/20 rounded-lg p-5 hover:border-[#D4AF37]/40 transition">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full mr-3">
                      <BookOpen className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#F5DEB3]">Memory Exercises</h3>
                  </div>
                  <p className="text-gray-200 text-sm mb-4">
                    Targeted exercises to strengthen recall abilities and preserve memory function.
                  </p>
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-center text-gray-200 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                      <span>Visual memory challenges</span>
                    </li>
                    <li className="flex items-center text-gray-200 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                      <span>Word association techniques</span>
                    </li>
                    <li className="flex items-center text-gray-200 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                      <span>Recall and recognition practices</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-[#4A3F36] hover:bg-[#5D4C3B] text-white border border-[#D4AF37]/20"
                  >
                    Start Exercises
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="bg-[#1A1811]/60 border border-[#D4AF37]/20 rounded-lg p-5 hover:border-[#D4AF37]/40 transition">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full mr-3">
                      <Dumbbell className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#F5DEB3]">Brain Training Games</h3>
                  </div>
                  <p className="text-gray-200 text-sm mb-4">
                    Engaging games designed to stimulate different cognitive areas.
                  </p>
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-center text-gray-200 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                      <span>Logic and reasoning puzzles</span>
                    </li>
                    <li className="flex items-center text-gray-200 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                      <span>Pattern recognition challenges</span>
                    </li>
                    <li className="flex items-center text-gray-200 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
                      <span>Speed and reaction time games</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-[#4A3F36] hover:bg-[#5D4C3B] text-white border border-[#D4AF37]/20"
                  >
                    Play Games
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-[#1A1811]/70 border border-[#D4AF37]/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium mb-4 text-[#F5DEB3] flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-[#D4AF37]" /> Featured Resources
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10 flex items-start">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full mr-3 mt-1">
                      <Calendar className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#F5DEB3]">Daily Brain Workout</h4>
                      <p className="text-gray-200 text-sm">New cognitive exercise delivered daily</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10 flex items-start">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-full mr-3 mt-1">
                      <PlayCircle className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#F5DEB3]">Video Tutorials</h4>
                      <p className="text-gray-200 text-sm">Expert-guided memory enhancement techniques</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  View All Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-[#2A2420]/70 rounded-lg p-5 border border-[#D4AF37]/20">
                <h3 className="text-lg font-medium mb-3 text-[#F5DEB3]">Benefits of Regular Brain Exercise</h3>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 mt-2"></div>
                    <span>Improved memory and recall abilities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 mt-2"></div>
                    <span>Enhanced focus and concentration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 mt-2"></div>
                    <span>Better problem-solving and decision-making skills</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 mt-2"></div>
                    <span>Potential to slow cognitive decline associated with aging</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 mt-2"></div>
                    <span>Greater overall mental well-being and confidence</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/golden-years-portal', { 
                state: { 
                  stayInPortal: true,
                  preventTutorial: true
                }
              })}
              className="bg-[#3A302A] hover:bg-[#2A2418] text-white border border-[#D4AF37]/30"
            >
              Back to Golden Years Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenMemoryCognitive;
