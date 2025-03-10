
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, CheckCircle, Play, Pause, Clock, Brain, MessageCircle, HeartHandshake, UserRound, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface WorkshopSection {
  title: string;
  duration: string;
  content: string;
  exercises: Array<{
    title: string;
    instructions: string;
    completed?: boolean;
    worksheet?: string; // Path to worksheet PDF or content
  }>;
}

export interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  duration: string;
  sections: WorkshopSection[];
}

interface WorkshopProps {
  workshopData: WorkshopData;
}

const Workshop: React.FC<WorkshopProps> = ({ workshopData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [audioProgress, setAudioProgress] = useState(0);

  const handleBack = () => {
    navigate("/");
  };

  const toggleExerciseCompletion = (sectionIndex: number, exerciseIndex: number) => {
    const exerciseKey = `${sectionIndex}-${exerciseIndex}`;
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseKey]: !prev[exerciseKey]
    }));

    if (!completedExercises[exerciseKey]) {
      toast({
        title: "Exercise completed!",
        description: "Great job on completing this exercise.",
      });
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1);
      setAudioProgress(0);
      setIsPlaying(false);
      
      toast({
        title: "Previous Section",
        description: `Moved to: ${workshopData.sections[activeSection-1].title}`,
      });
    }
  };

  const handleNextSection = () => {
    if (activeSection < workshopData.sections.length - 1) {
      setActiveSection(prev => prev + 1);
      setAudioProgress(0);
      setIsPlaying(false);
      
      toast({
        title: "Next Section",
        description: `Moved to: ${workshopData.sections[activeSection+1].title}`,
      });
    } else {
      toast({
        title: "Workshop completed!",
        description: "Congratulations on completing this workshop!",
      });
      
      // Add a short delay before navigating back
      setTimeout(() => {
        navigate("/", { state: { workshopCompleted: workshopData.id } });
      }, 2000);
    }
  };

  const handleConsultHenry = () => {
    toast({
      title: "Henry is here to help!",
      description: "I can provide additional insights on this exercise. What would you like to know?",
    });
  };
  
  const togglePlayPause = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    if (newPlayingState) {
      toast({
        title: "Audio Started",
        description: "The guided audio narration has started.",
      });
      
      // Simulate audio progress
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 10;
        });
      }, 2000);
    } else {
      toast({
        title: "Audio Paused",
        description: "The guided audio narration has been paused.",
      });
    }
  };
  
  const handleDownloadWorksheet = (sectionIndex: number, exerciseIndex: number) => {
    toast({
      title: "Worksheet Downloaded",
      description: "The worksheet has been downloaded to your device.",
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.02%22/></svg>')] opacity-30 fixed"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Thrive MT
          </Button>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{workshopData.duration}</span>
          </div>
        </div>
        
        <Card className={`border ${workshopData.color} mb-8`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <workshopData.icon className={`h-10 w-10 ${workshopData.color.split(' ').pop()}`} />
                <div>
                  <CardTitle className="text-2xl">{workshopData.title}</CardTitle>
                  <CardDescription className="text-gray-500">
                    Guided by Henry, your Thrive MT mental health specialist
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                onClick={handleConsultHenry}
              >
                <UserRound className="h-4 w-4" />
                Ask Henry
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{workshopData.description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-10 w-10 border-2 border-[#B87333]/50">
                <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
                <AvatarFallback className="bg-[#B87333]/20 text-[#B87333]">H</AvatarFallback>
              </Avatar>
              <p className="text-gray-600 italic">
                "I'll guide you through this workshop step by step. Remember to take breaks if needed!"
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workshop Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[300px]">
                  <div className="p-4">
                    {workshopData.sections.map((section, index) => (
                      <div 
                        key={index}
                        onClick={() => setActiveSection(index)}
                        className={`mb-2 p-3 rounded-md cursor-pointer transition-all ${
                          activeSection === index 
                            ? 'bg-[#B87333] text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{section.title}</span>
                          {activeSection === index && <ChevronRight className="h-4 w-4" />}
                        </div>
                        <div className="text-xs mt-1 opacity-80">{section.duration}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{workshopData.sections[activeSection].title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {workshopData.sections[activeSection].duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <p className="text-gray-700 whitespace-pre-line">
                      {workshopData.sections[activeSection].content}
                    </p>
                  </ScrollArea>
                  
                  {/* Audio Progress Bar */}
                  {isPlaying && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-[#B87333] h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${audioProgress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Exercises</h3>
                    <div className="space-y-4">
                      {workshopData.sections[activeSection].exercises.map((exercise, exIndex) => (
                        <Card key={exIndex} className="border border-gray-200">
                          <CardHeader className="py-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{exercise.title}</CardTitle>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600 border-blue-200"
                                  onClick={() => handleDownloadWorksheet(activeSection, exIndex)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost"
                                  size="sm"
                                  className={`${
                                    completedExercises[`${activeSection}-${exIndex}`] 
                                      ? 'text-green-600' 
                                      : 'text-gray-400'
                                  }`}
                                  onClick={() => toggleExerciseCompletion(activeSection, exIndex)}
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 text-sm">{exercise.instructions}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePrevSection}
                  disabled={activeSection === 0}
                >
                  Previous
                </Button>
                <Button 
                  variant={isPlaying ? "secondary" : "default"}
                  className="flex items-center gap-2"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause Audio
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Play Audio
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleNextSection}
                >
                  {activeSection < workshopData.sections.length - 1 ? 'Next' : 'Finish'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
