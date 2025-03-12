
import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate, useLocation } from "react-router-dom";
import Workshop from "@/components/Workshop";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Volume, Volume2, ArrowLeft, Download, Calendar, Clock, Users, BookOpen, Brain, Heart, Target, ListChecks, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const initialTab = location.state?.activeTab || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  
  // Use the location state to set the initial tab
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Load completed exercises from localStorage
  useEffect(() => {
    if (workshopId) {
      const savedProgress = localStorage.getItem(`workshop-progress-${workshopId}`);
      if (savedProgress) {
        setCompletedExercises(new Set(JSON.parse(savedProgress)));
      }
    }
  }, [workshopId]);
  
  const workshop = workshopData.find(w => w.id === workshopId);
  
  if (!workshop) {
    return <Navigate to="/workshops" replace />;
  }
  
  // Extract accent color for styling
  const colorClass = workshop.color.split(' ')[0];
  const accentColor = colorClass.includes('bg-[#') 
    ? colorClass.replace('bg-[', '').replace(']/10', '') 
    : '#9b87f5';
  
  const handleBack = () => {
    toast({
      title: "Returning to Workshops",
      description: "Taking you back to the workshops page"
    });
    
    navigate("/workshops");
  };

  const handleMainMenu = () => {
    toast({
      title: "Returning to Main Menu",
      description: "Taking you back to the main menu"
    });
    
    navigate("/", { state: { screenState: 'main' } });
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Sound Enabled" : "Sound Muted",
      description: isMuted ? "Workshop audio is now playing" : "Workshop audio is now muted",
      duration: 1500,
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading Materials",
      description: "Your workshop materials are being downloaded",
      duration: 3000,
    });
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Workshop materials have been downloaded successfully",
        duration: 3000,
      });
    }, 2000);
  };

  const totalExercises = workshop.sections.reduce(
    (count, section) => count + section.exercises.length, 0
  );

  const completedExercisesCount = completedExercises.size;
  const progressPercentage = totalExercises > 0 
    ? Math.round((completedExercisesCount / totalExercises) * 100) 
    : 0;

  // Benefits based on workshop type
  const getBenefits = () => {
    switch(workshop.id) {
      case "stress-management":
        return [
          "Reduce daily anxiety and tension",
          "Develop practical coping mechanisms",
          "Improve sleep quality",
          "Enhance emotional resilience"
        ];
      case "mindful-communication":
        return [
          "Build stronger relationships",
          "Express needs effectively",
          "Navigate difficult conversations",
          "Reduce misunderstandings"
        ];
      case "emotional-regulation":
        return [
          "Identify emotional patterns",
          "Process difficult feelings",
          "Develop healthier responses",
          "Increase emotional awareness"
        ];
      default:
        return [
          "Improve overall mental wellbeing",
          "Develop practical coping skills",
          "Build emotional resilience",
          "Connect mind and body"
        ];
    }
  };

  const benefits = getBenefits();
  
  return (
    <Page title={workshop.title} showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="workshop">Workshop Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="workshop">
            {/* The Workshop component provided by the application */}
            <Workshop workshopData={workshop} />
          </TabsContent>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="flex flex-col space-y-4">
                {/* Workshop progress indicator */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-full"
                        style={{ backgroundColor: `${accentColor}20` }}
                      >
                        <workshop.icon className="h-6 w-6" style={{ color: accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Your Progress</h3>
                        <p className="text-sm text-gray-500">
                          {completedExercisesCount} of {totalExercises} exercises completed
                        </p>
                      </div>
                    </div>
                    <Badge 
                      className="text-xs"
                      style={{ 
                        backgroundColor: progressPercentage > 0 ? `${accentColor}20` : "bg-gray-100", 
                        color: progressPercentage > 0 ? accentColor : "text-gray-500" 
                      }}
                    >
                      {progressPercentage}% Complete
                    </Badge>
                  </div>
                  <div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-2" 
                    />
                  </div>
                </div>
              
                {/* Workshop video container */}
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted={isMuted}
                    poster={`https://picsum.photos/seed/${workshop.id}/1280/720`}
                  >
                    {/* Using a sample video URL - in production you would use actual workshop videos */}
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={toggleMute}
                    >
                      {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                  </div>
                </div>
                
                {/* Workshop facilitator information */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center text-white font-bold text-xl">
                    H
                  </div>
                  <div>
                    <h3 className="font-medium">Facilitated by Henry</h3>
                    <p className="text-sm text-gray-500">Mental Health Specialist</p>
                  </div>
                </div>
                
                {/* Workshop stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{workshop.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Sections</p>
                      <p className="font-medium">{workshop.sections.length} modules</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Exercises</p>
                      <p className="font-medium">{totalExercises} activities</p>
                    </div>
                  </div>
                </div>
                
                {/* Workshop benefits */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Benefits of This Workshop</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="p-1 rounded-full"
                          style={{ backgroundColor: `${accentColor}20` }}
                        >
                          <CheckCircle 
                            className="h-4 w-4"
                            style={{ color: accentColor }}
                          />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Workshop content */}
                <div className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">About This Workshop</h2>
                    <p className="text-gray-700">{workshop.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                    <div className="space-y-3">
                      {workshop.sections.map((section, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div 
                            className="flex items-center justify-center rounded-full w-6 h-6 mt-0.5 text-xs text-white font-medium"
                            style={{ backgroundColor: accentColor }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{section.title}</h4>
                            <p className="text-sm text-gray-600">
                              {section.content.split('.')[0]}...
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">Workshop Materials</h3>
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{workshop.title} - Workbook</p>
                          <p className="text-sm text-gray-500">PDF, 2.4MB</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={handleDownload}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Workshops
                  </Button>
                  
                  <Button
                    className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
                    onClick={() => setActiveTab("workshop")}
                  >
                    {completedExercisesCount > 0 ? "Continue Workshop" : "Start Workshop"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default WorkshopDetail;
