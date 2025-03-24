import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Download, Play, CheckCircle, FileText, Video, BookOpen,
  Users, Brain, Briefcase, Pause, Volume, Volume2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import HomeButton from "@/components/HomeButton";

const CorporateWellnessProgram = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Get data from location state
  const { workshop, resource, showWorkshopContent } = location.state || {};
  
  // Sample workshop data - in a real app, this would come from an API
  const workshopData = {
    title: workshop || "Boundaries in the Digital Workplace",
    description: "Creating healthy work-life separation in the remote work era",
    instructor: "Dr. Jamie Martinez",
    category: "Work-Life Balance",
    schedule: "Tuesdays, 2:00PM - 3:30PM",
    sections: [
      {
        id: "bdw-1",
        title: "Understanding Digital Boundaries",
        description: "Explore how technology has blurred traditional work-life boundaries and why this matters.",
        content: "The constant connectivity enabled by smartphones, laptops, and remote work has fundamentally changed how we separate our professional and personal lives. This section examines the psychological impact of always being 'on call' and how the lack of clear transitions affects stress levels, productivity, and personal relationships. We'll discuss research findings on the impact of digital boundary erosion and why establishing clear separations is essential for both mental health and professional effectiveness.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        exercise: "Digital Audit",
        exerciseDescription: "Analyze your current technology usage patterns and identify boundary erosion points."
      },
      {
        id: "bdw-2",
        title: "Boundary Creation Strategies",
        description: "Learn practical techniques for establishing clear boundaries in a digital workplace.",
        content: "This section provides concrete strategies for creating and maintaining boundaries while working in digital environments. We'll cover physical boundaries (dedicated workspace, transition rituals), temporal boundaries (work hours, notification management), and psychological boundaries (task batching, cognitive transitions). Special attention will be given to strategies for those in leadership positions who need to model healthy boundaries for their teams while remaining accessible and responsive.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        exercise: "Boundary Protocol Development",
        exerciseDescription: "Create personal protocols for digital boundaries in different work contexts."
      },
      {
        id: "bdw-3",
        title: "Communication and Expectation Management",
        description: "How to effectively communicate your boundaries to colleagues, managers, and clients.",
        content: "Setting boundaries is only effective when they're clearly communicated and understood by others. This section focuses on how to articulate your boundaries professionally while managing others' expectations. We'll cover the language of boundary setting, timing of communication, handling resistance, and maintaining consistency. The goal is to help you establish boundaries in ways that enhance rather than damage professional relationships.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        exercise: "Communication Templates",
        exerciseDescription: "Develop scripts for communicating boundaries in various professional scenarios."
      },
      {
        id: "bdw-4",
        title: "Building a Boundary-Respecting Culture",
        description: "Contributing to workplace environments that support healthy digital boundaries.",
        content: "Individual boundaries are easier to maintain when supported by organizational culture. This section addresses how to contribute to a boundary-healthy workplace culture, whether you're a team member or leader. Topics include advocating for reasonable email/message response times, supporting focused work periods, respecting colleagues' boundaries, and creating team agreements around communication expectations. We'll also discuss specific challenges for remote and hybrid teams.",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        exercise: "Team Charter Development",
        exerciseDescription: "Create a draft team charter for digital communication and boundaries."
      }
    ]
  };
  
  // Sample resource data
  const resourceData = {
    title: resource || "Workplace Stress Assessment",
    description: "Identify your specific workplace stressors and develop targeted strategies.",
    type: resource?.includes("Video") ? "video" : "assessment",
    content: "This comprehensive assessment helps you identify the specific workplace factors contributing to your stress levels. By pinpointing exact stressors, you can develop targeted strategies rather than generic approaches. The assessment covers organizational factors, role clarity, workload management, interpersonal dynamics, and environmental conditions."
  };

  // Handle section completion
  const handleSectionComplete = (sectionId: string) => {
    let newCompletedSections = [...completedSections];
    
    if (!completedSections.includes(sectionId)) {
      newCompletedSections.push(sectionId);
      setCompletedSections(newCompletedSections);
    }
    
    const totalSections = workshopData.sections.length;
    const newProgress = Math.floor((newCompletedSections.length / totalSections) * 100);
    setProgress(newProgress);
    
    // In a real app, save progress to database or localStorage
    
    toast({
      title: "Section Completed",
      description: "Your progress has been saved.",
    });
  };

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Downloading Resource",
      description: `Your ${resourceName} is being downloaded.`,
      duration: 2000
    });
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Add the missing function for workshop registration
  const handleWorkshopRegistration = (workshopName: string) => {
    toast({
      title: "Workshop Registration Successful",
      description: `You've been registered for "${workshopName}". Check your dashboard for details.`,
      duration: 3000
    });
    
    setTimeout(() => {
      navigate("/corporate-wellness", { 
        state: { 
          workshop: workshopName,
          showWorkshopContent: true 
        } 
      });
    }, 1000);
  };
  
  // Determine what to show based on location state
  const renderContent = () => {
    if (showWorkshopContent) {
      return renderWorkshopContent();
    } else if (resource) {
      return renderResourceContent();
    } else {
      // Default to workshop overview if nothing specific was requested
      return renderWorkshopContent();
    }
  };
  
  // Render workshop content
  const renderWorkshopContent = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4"
              onClick={() => navigate("/corporate-portal")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portal
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{workshopData.title}</h1>
              <p className="text-gray-600">{workshopData.description}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Badge className="mr-2 bg-blue-100 text-blue-800">{workshopData.category}</Badge>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <span className="text-sm text-gray-600 mr-2">{progress}% Complete</span>
                <Progress value={progress} className="w-24 h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start bg-white border overflow-x-auto">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="content" className="text-base">Workshop Content</TabsTrigger>
            <TabsTrigger value="resources" className="text-base">Resources</TabsTrigger>
            <TabsTrigger value="exercises" className="text-base">Exercises</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Workshop</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      In today's always-connected workplace, the line between professional and personal life has become increasingly blurred. This workshop provides practical strategies for establishing and maintaining healthy boundaries in digital work environments, whether you're working remotely, in hybrid settings, or in traditional offices with digital connectivity.
                    </p>
                    <p className="text-gray-600">
                      Through interactive exercises, discussion, and personalized planning, you'll develop a comprehensive approach to boundary management that enhances both your wellbeing and your professional effectiveness.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <Users className="h-4 w-4 text-[#3B82F6]" />
                        </div>
                        <div>
                          <h3 className="font-medium">Instructor</h3>
                          <p className="text-sm text-gray-600">{workshopData.instructor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <Brain className="h-4 w-4 text-[#3B82F6]" />
                        </div>
                        <div>
                          <h3 className="font-medium">Schedule</h3>
                          <p className="text-sm text-gray-600">{workshopData.schedule}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workshopData.sections.map((section, index) => (
                        <div 
                          key={section.id} 
                          className={`p-4 border rounded-lg ${
                            completedSections.includes(section.id) 
                              ? 'border-blue-200 bg-blue-50' 
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-lg">{section.title}</h3>
                            {completedSections.includes(section.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            )}
                          </div>
                          <p className="text-gray-600 mt-2 ml-11">{section.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Workshop Materials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-[#3B82F6] mr-3" />
                        <div>
                          <div className="font-medium">Workshop Handbook</div>
                          <div className="text-sm text-gray-500">PDF, 3.2MB</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Workshop Handbook")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-[#3B82F6] mr-3" />
                        <div>
                          <div className="font-medium">Boundary Worksheets</div>
                          <div className="text-sm text-gray-500">PDF, 1.8MB</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Boundary Worksheets")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>About Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl">
                        JM
                      </div>
                      <div>
                        <h3 className="font-bold">{workshopData.instructor}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Dr. Martinez has 15 years of experience in workplace psychology with a special focus on digital work environments. She has helped hundreds of professionals establish healthy boundaries while maintaining high performance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button
                  className="w-full bg-[#3B82F6] hover:bg-blue-600"
                  onClick={() => setActiveTab("content")}
                >
                  Start Workshop
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <video 
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    muted={isMuted}
                    autoPlay={isPlaying}
                    loop
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Workshop Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {workshopData.sections.map((section, index) => (
                        <div key={section.id}>
                          <div className="flex items-center mb-3">
                            <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-xl">{section.title}</h3>
                            {completedSections.includes(section.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            )}
                          </div>
                          
                          <div className="ml-11 space-y-4">
                            <p className="text-gray-600">{section.content}</p>
                            
                            {section.videoUrl && (
                              <div className="relative aspect-video bg-black rounded-lg overflow-hidden my-4">
                                <video 
                                  className="w-full h-full object-cover"
                                  controls
                                  poster={`https://picsum.photos/seed/${section.id}/640/360`}
                                >
                                  <source src={section.videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            )}
                            
                            <Button
                              variant={completedSections.includes(section.id) ? "outline" : "default"}
                              className={completedSections.includes(section.id) ? "text-[#3B82F6] border-[#3B82F6]" : "bg-[#3B82F6] hover:bg-blue-600"}
                              onClick={() => handleSectionComplete(section.id)}
                            >
                              {completedSections.includes(section.id) ? "Completed" : "Mark as Complete"}
                            </Button>
                          </div>
                          
                          {index < workshopData.sections.length - 1 && (
                            <div className="border-b border-gray-200 my-8"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Workshop Completion</span>
                        <span className="text-blue-600">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      {workshopData.sections.map((section, index) => (
                        <div 
                          key={section.id} 
                          className="flex items-center"
                        >
                          <div className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                            completedSections.includes(section.id) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {completedSections.includes(section.id) ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className={`text-sm ${
                            completedSections.includes(section.id) 
                              ? 'text-green-600' 
                              : 'text-gray-600'
                          }`}>
                            {section.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Related Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Digital Wellbeing Guide</div>
                      <div className="text-sm text-gray-500 mb-2">Comprehensive approach to technology usage</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload("Digital Wellbeing Guide")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Guide
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Team Communication Templates</div>
                      <div className="text-sm text-gray-500 mb-2">Scripts for setting expectations with colleagues</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload("Team Communication Templates")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Templates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-blue-50 to-white">
                  <CardHeader>
                    <CardTitle>Need Support?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Our workplace mental health specialists are available to discuss your specific boundary challenges.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full text-[#3B82F6] border-[#3B82F6]"
                      onClick={() => {
                        toast({
                          title: "Support Request Sent",
                          description: "A workplace specialist will contact you shortly.",
                        });
                      }}
                    >
                      Request Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Reading Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Setting Digital Boundaries</div>
                      <div className="text-sm text-gray-500 mb-2">Comprehensive guide to work-life separation</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload("Setting Digital Boundaries Guide")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Productivity Without Burnout</div>
                      <div className="text-sm text-gray-500 mb-2">Balancing achievement and wellbeing</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload("Productivity Without Burnout Guide")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Video Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Digital Detox Techniques</div>
                      <div className="text-sm text-gray-500 mb-2">Quick strategies for mental reset</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => {
                          toast({
                            title: "Video Loading",
                            description: "Opening digital detox video series",
                          });
                        }}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Videos
                      </Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Setting Expectations with Teams</div>
                      <div className="text-sm text-gray-500 mb-2">Communicating boundaries effectively</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => {
                          toast({
                            title: "Video Loading",
                            description: "Opening team communication video series",
                          });
                        }}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Videos
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Worksheets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Digital Boundary Audit</div>
                      <div className="text-sm text-gray-500 mb-2">Identify your boundary pain points</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload("Digital Boundary Audit Worksheet")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Worksheet
                      </Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Communication Templates</div>
                      <div className="text-sm text-gray-500 mb-2">Scripts for boundary conversations</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload("Communication Templates")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Templates
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Exercises Tab */}
          <TabsContent value="exercises" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshopData.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <CardTitle>{section.title} Exercise</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Exercise: {section.exercise}</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {section.exerciseDescription}
                      </p>
                      <Button 
                        variant="outline" 
                        className="text-[#3B82F6] border-[#3B82F6] w-full"
                        onClick={() => handleDownload(`${section.exercise} Worksheet`)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Exercise
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Reflection Questions</h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                        <li>How does this concept apply to your specific work environment?</li>
                        <li>What challenges do you anticipate in implementing these boundaries?</li>
                        <li>What support do you need to successfully establish these practices?</li>
                      </ul>
                    </div>
                    
                    <Button
                      variant={completedSections.includes(section.id) ? "outline" : "default"}
                      className={completedSections.includes(section.id) ? "text-[#3B82F6] border-[#3B82F6] w-full" : "bg-[#3B82F6] hover:bg-blue-600 w-full"}
                      onClick={() => handleSectionComplete(section.id)}
                    >
                      {completedSections.includes(section.id) ? "Exercise Completed" : "Mark Exercise as Complete"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  // Render resource content
  const renderResourceContent = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4"
              onClick={() => navigate("/corporate-portal")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portal
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{resourceData.title}</h1>
              <p className="text-gray-600">{resourceData.description}</p>
            </div>
          </div>
          <HomeButton />
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About This Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              {resourceData.content}
            </p>
            
            {resourceData.type === 'video' ? (
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg mb-4">Workplace Stress Assessment</h3>
                <p className="text-gray-600 mb-4">
                  This interactive assessment helps you identify your specific workplace stressors and provides personalized recommendations.
                </p>
                <Button 
                  className="bg-[#3B82F6] hover:bg-blue-600"
                  onClick={() => {
                    toast({
                      title: "Assessment Starting",
                      description: "Loading your personalized assessment...",
                    });
                  }}
                >
                  Start Assessment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-[#3B82F6]" />
                Related Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Stress Management Handbook</div>
                  <div className="text-sm text-gray-500 mb-2">Comprehensive guide to workplace stress</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[#3B82F6] border-[#3B82F6] w-full"
                    onClick={() => handleDownload("Stress Management Handbook")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Work-Life Balance Guide</div>
                  <div className="text-sm text-gray-500 mb-2">Creating separation in digital environments</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[#3B82F6] border-[#3B82F6] w-full"
                    onClick={() => handleDownload("Work-Life Balance Guide")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-[#3B82F6]" />
                Related Workshops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Stress Resilience for Professionals</div>
                  <div className="text-sm text-gray-500 mb-2">Building capacity to thrive under pressure</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[#3B82F6] border-[#3B82F6] w-full"
                    onClick={() => handleWorkshopRegistration("Stress Resilience for Professionals")}
                  >
                    Register Now
                  </Button>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Boundaries in the Digital Workplace</div>
                  <div className="text-sm text-gray-500 mb-2">Creating healthy work-life separation</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[#3B82F6] border-[#3B82F6] w-full"
                    onClick={() => handleWorkshopRegistration("Boundaries in the Digital Workplace")}
                  >
                    Register Now
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-[#3B82F6]" />
                Support Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                <h3 className="font-semibold mb-2">Need personalized support?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our workplace mental health specialists are available for confidential consultations.
                </p>
                <Button 
                  className="w-full bg-[#3B82F6] hover:bg-blue-600"
                  onClick={() => {
                    toast({
                      title: "Consultation Request Sent",
                      description: "A specialist will contact you within 24 hours.",
                    });
                  }}
                >
                  Request Consultation
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full text-[#3B82F6] border-[#3B82F6]"
                onClick={() => navigate("/corporate-portal", { state: { tab: "support" }})}
              >
                View All Support Options
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default CorporateWellnessProgram;
