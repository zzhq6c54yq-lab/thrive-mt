
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Shield, UserRound, Phone, BookOpen, Calendar, Heart, Award, LifeBuoy, 
  BarChart, ListChecks, Briefcase, Footprints, Flag, Lightbulb, BookMarked,
  GraduationCap, Medal, Puzzle, Users, BookOpen as BookOpenIcon, Brain, CheckSquare,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import Page from "@/components/Page";
import CrisisResourcesBar from "@/components/military/CrisisResourcesBar";
import { 
  educationalContent, 
  inspirationalQuotes, 
  successStories 
} from "@/data/militaryEducationalData";

const DepartmentOfDefense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Show initial deep message for 8 seconds instead of 4
    if (showInitialMessage) {
      const timer = setTimeout(() => {
        setShowInitialMessage(false);
        setShowWelcome(true);
      }, 8000); // Changed to 8000ms (8 seconds)
      return () => clearTimeout(timer);
    }
    
    // Then show welcome screen for 4 seconds
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showInitialMessage, showWelcome]);

  useEffect(() => {
    // Rotate quotes every 8 seconds
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % inspirationalQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleButtonClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} feature will be available soon`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Deep care-filled message screen
  if (showInitialMessage) {
    return (
      <Page title="Department of Defense Mental Health Portal">
        <div className="fixed inset-0 flex items-center justify-center bg-[#0A1929] z-50 animate-fade-in">
          <div className="max-w-2xl mx-auto p-8 text-center">
            <div className="bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-10 rounded-lg border-2 border-[#B87333] shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
                <span className="text-[#B87333]">Your Service</span> Matters.<br />
                <span className="text-[#B87333]">Your Health</span> Matters Even More.
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Behind every uniform is a person with unique experiences and challenges. 
                This space is dedicated to supporting your mental wellbeing with the same commitment 
                you've shown in your service to our nation.
              </p>
              
              <p className="text-lg text-gray-300 mb-4 italic">
                You are not alone on this journey.
              </p>
              
              <div className="mt-6 animate-pulse">
                <span className="text-[#B87333]">Loading your personalized resources...</span>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  // Welcome screen that fades out
  if (showWelcome) {
    return (
      <Page title="Department of Defense Mental Health Portal">
        <div className="fixed inset-0 flex items-center justify-center bg-[#0A1929] z-50 animate-fade-in">
          <div className="relative w-full max-w-4xl mx-auto p-8 text-center">
            {/* Top decoration - flag and stars */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Flag className="h-16 w-16 text-[#B87333] animate-pulse" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-1">
                  <Shield className="h-6 w-6 text-[#B87333]" />
                  <Shield className="h-6 w-6 text-[#B87333]" />
                  <Shield className="h-6 w-6 text-[#B87333]" />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-10 rounded-lg border-2 border-[#B87333] shadow-lg animate-scale-in">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Thank You for Your <span className="text-[#B87333]">Service</span>
              </h1>
              
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-[#B87333]/30 via-[#B87333] to-[#B87333]/30 rounded-full"></div>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                Thrive MT is honored to support the mental health and wellbeing of our military members, veterans, and their families.
              </p>
              
              <p className="text-md md:text-lg text-gray-400 italic">
                "The strength of our nation is our military.<br />The strength of our military is our soldiers.<br />The strength of our soldiers is our families."
              </p>
              
              <div className="mt-12">
                <Button 
                  variant="gold" 
                  size="lg" 
                  onClick={() => setShowWelcome(false)}
                  className="px-8 py-6 text-lg animate-pulse"
                >
                  Enter Portal
                </Button>
              </div>
            </div>
            
            {/* Bottom decoration */}
            <div className="mt-8 flex justify-center">
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#B87333] to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  // Main content
  return (
    <Page title="Department of Defense Mental Health Portal">
      <Helmet>
        <title>Department of Defense Mental Health Portal | Thrive MT</title>
        <meta name="description" content="Specialized mental health resources for active duty military, veterans, and their families." />
      </Helmet>

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0A1929]/80 to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
          <div className="flex items-center mb-6">
            <div className="mr-4 p-2 bg-[#0A1929]/80 rounded-full border-2 border-[#B87333]">
              <Shield className="h-10 w-10 text-[#B87333]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                Department of Defense Mental Health Portal
                <Badge variant="outline" className="ml-4 bg-[#0A1929] text-[#B87333] border-[#B87333]">
                  Military Focus
                </Badge>
              </h1>
              <p className="text-gray-300 mt-1">
                Specialized resources and tools for service members and veterans
              </p>
            </div>
          </div>

          {/* Persistent Menu Bar - Always visible under header */}
          <div className="sticky top-0 z-30 bg-[#0A1929]/95 border-b border-[#B87333]/30 mb-6 pb-2 backdrop-blur-sm">
            <TabsList className="grid grid-cols-6 w-full bg-[#0A1929]/50 p-1 border border-[#B87333]/30">
              <TabsTrigger 
                value="dashboard" 
                onClick={() => handleTabChange("dashboard")}
                className={`data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow ${activeTab === "dashboard" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}`}
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                onClick={() => handleTabChange("resources")}
                className={`data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow ${activeTab === "resources" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}`}
              >
                Resources
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                onClick={() => handleTabChange("education")}
                className={`data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow ${activeTab === "education" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}`}
              >
                Education
              </TabsTrigger>
              <TabsTrigger 
                value="assessments" 
                onClick={() => handleTabChange("assessments")}
                className={`data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow ${activeTab === "assessments" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}`}
              >
                Assessments
              </TabsTrigger>
              <TabsTrigger 
                value="programs" 
                onClick={() => handleTabChange("programs")}
                className={`data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow ${activeTab === "programs" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}`}
              >
                Programs
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                onClick={() => handleTabChange("profile")}
                className={`data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow ${activeTab === "profile" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}`}
              >
                My Profile
              </TabsTrigger>
            </TabsList>
          </div>

          <CrisisResourcesBar />

          {/* Quote of the Day */}
          <div className="my-6 bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-6 rounded-lg border border-[#B87333]/30">
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-[#B87333]/20 rounded-full">
                <Lightbulb className="h-6 w-6 text-[#B87333]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#B87333] mb-1">Quote of the Day</h3>
                <div className="min-h-[60px] transition-all duration-500">
                  <p className="text-white italic mb-2">"{inspirationalQuotes[currentQuote].text}"</p>
                  <p className="text-sm text-gray-400">— {inspirationalQuotes[currentQuote].author}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Dashboard tab content */}
              <TabsContent value="dashboard" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <UserRound className="h-5 w-5 text-[#B87333]" />
                        Service Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Branch:</span>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Army
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Status:</span>
                          <Badge variant="outline" className="bg-transparent border-green-500/30 text-green-500">
                            Active Duty
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Service Years:</span>
                          <span className="text-white">6</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Deployment Status:</span>
                          <Badge variant="outline" className="bg-transparent border-blue-500/30 text-blue-500">
                            Domestic
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-2 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Profile update")}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#B87333]" />
                        Upcoming Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-[#B87333]/10 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-semibold text-[#B87333]">PTSD Group Session</span>
                            <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                              Today
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">4:00 PM - 5:30 PM EST</p>
                        </div>
                        <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10">
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">Mindfulness Practice</span>
                            <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                              Tomorrow
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">10:00 AM - 11:00 AM EST</p>
                        </div>
                        <Button 
                          variant="gold" 
                          className="w-full mt-2"
                          onClick={() => handleNavigate("/military-workshops")}
                        >
                          View All Sessions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-[#B87333]" />
                        Well-being Snapshot
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Stress Level:</span>
                          <div className="w-32 bg-gray-700 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Sleep Quality:</span>
                          <div className="w-32 bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Anxiety:</span>
                          <div className="w-32 bg-gray-700 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Resilience:</span>
                          <div className="w-32 bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-2 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Well-being assessment")}
                        >
                          Take Full Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Success Stories */}
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Medal className="h-5 w-5 text-[#B87333]" />
                      Success Stories
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Real stories from service members who've overcome challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {successStories.slice(0, 2).map((story, index) => (
                        <div key={index} className="p-4 bg-[#0A1929] rounded-lg border border-[#B87333]/10">
                          <h3 className="font-semibold text-[#B87333] text-lg mb-2">{story.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{story.summary}</p>
                          <div className="flex items-center">
                            <Badge className="bg-[#B87333]/20 text-[#B87333] border-none">
                              {story.serviceType}
                            </Badge>
                            <span className="text-xs text-gray-400 ml-auto">{story.readTime} min read</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                      onClick={() => setActiveTab("education")}
                    >
                      View All Success Stories
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#B87333]" />
                        Achievements & Goals
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Track your progress and set new goals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-[#B87333]/10 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#B87333]">Completed</span>
                            <span className="text-sm text-[#B87333]">3 of 5</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                            <div className="bg-[#B87333] h-2.5 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2 bg-green-600 text-white">✓</Badge>
                              <span className="text-white">Weekly Mindfulness Practice</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2 bg-green-600 text-white">✓</Badge>
                              <span className="text-white">Attend Support Group</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2 bg-green-600 text-white">✓</Badge>
                              <span className="text-white">Complete Sleep Journal</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2 bg-gray-700 text-gray-300">○</Badge>
                              <span className="text-gray-300">Physical Activity Goal</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2 bg-gray-700 text-gray-300">○</Badge>
                              <span className="text-gray-300">Family Connection Time</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="gold"
                          className="w-full"
                          onClick={() => handleButtonClick("Goal setting")}
                        >
                          Set New Goals
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-[#B87333]" />
                        Resources For You
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Personalized recommendations based on your profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10 hover:border-[#B87333]/30 cursor-pointer" onClick={() => handleNavigate("/military-resources")}>
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-[#B87333] mr-2" />
                            <span className="font-medium text-white">PTSD Recovery Workbook</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">
                            Evidence-based exercises for managing PTSD symptoms
                          </p>
                        </div>
                        <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10 hover:border-[#B87333]/30 cursor-pointer" onClick={() => handleNavigate("/military-resources")}>
                          <div className="flex items-center">
                            <Footprints className="h-5 w-5 text-[#B87333] mr-2" />
                            <span className="font-medium text-white">Transition Support Guide</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">
                            Navigating civilian life after active duty
                          </p>
                        </div>
                        <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10 hover:border-[#B87333]/30 cursor-pointer" onClick={() => handleNavigate("/military-resources")}>
                          <div className="flex items-center">
                            <Heart className="h-5 w-5 text-[#B87333] mr-2" />
                            <span className="font-medium text-white">Sleep Improvement Protocol</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">
                            Techniques to improve sleep quality for service members
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleNavigate("/military-resources")}
                        >
                          View All Resources
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LifeBuoy className="h-5 w-5 text-[#B87333]" />
                      Quick Support Options
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Get help when you need it most
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        variant="gold"
                        size="lg"
                        className="h-auto py-6 flex flex-col items-center gap-3"
                        onClick={() => handleButtonClick("Crisis support")}
                      >
                        <Phone className="h-6 w-6" />
                        <div className="text-center">
                          <div className="font-semibold">Crisis Line</div>
                          <div className="text-sm">24/7 Support</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline"
                        size="lg"
                        className="h-auto py-6 flex flex-col items-center gap-3 border-[#B87333]/30 text-white hover:bg-[#B87333]/10"
                        onClick={() => handleButtonClick("Chat with counselor")}
                      >
                        <Shield className="h-6 w-6 text-[#B87333]" />
                        <div className="text-center">
                          <div className="font-semibold">Chat with Counselor</div>
                          <div className="text-sm">Confidential</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline"
                        size="lg"
                        className="h-auto py-6 flex flex-col items-center gap-3 border-[#B87333]/30 text-white hover:bg-[#B87333]/10"
                        onClick={() => handleButtonClick("Peer support")}
                      >
                        <UserRound className="h-6 w-6 text-[#B87333]" />
                        <div className="text-center">
                          <div className="font-semibold">Peer Support</div>
                          <div className="text-sm">Connect with others</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resources tab content */}
              <TabsContent value="resources" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Military-Specific Resources</CardTitle>
                    <CardDescription className="text-gray-300">
                      Curated content for service members and veterans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Shield className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">PTSD & Trauma Resources</div>
                          <div className="text-sm text-gray-300">Evidence-based tools and materials</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Heart className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Depression & Anxiety</div>
                          <div className="text-sm text-gray-300">Tools for managing mood and anxiety</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <BookOpen className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Self-Help Tools</div>
                          <div className="text-sm text-gray-300">Worksheets, journals, and guides</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Briefcase className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Career Development</div>
                          <div className="text-sm text-gray-300">Guides and resources for career advancement</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education tab content */}
              <TabsContent value="education" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Education & Resources</CardTitle>
                    <CardDescription className="text-gray-300">
                      Learn about mental health and wellness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-education")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <GraduationCap className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Education</div>
                          <div className="text-sm text-gray-300">Courses and workshops on mental health</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <BookOpenIcon className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Books</div>
                          <div className="text-sm text-gray-300">Recommended books on mental health</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Puzzle className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Games</div>
                          <div className="text-sm text-gray-300">Interactive games to improve mental health</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Users className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Support Groups</div>
                          <div className="text-sm text-gray-300">Connect with others who are going through similar experiences</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assessments tab content */}
              <TabsContent value="assessments" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Mental Health Assessments</CardTitle>
                    <CardDescription className="text-gray-300">
                      Professional-grade assessments tailored for military personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">
                      Complete these confidential assessments to help identify areas where you might benefit from additional support.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-assessments")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <CheckSquare className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">PTSD Assessment</div>
                          <div className="text-sm text-gray-300">Assessments for PTSD</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-assessments")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Brain className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Anxiety Assessment</div>
                          <div className="text-sm text-gray-300">Assessments for anxiety</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-assessments")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <FileText className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Depression Assessment</div>
                          <div className="text-sm text-gray-300">Assessments for depression</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-assessments")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <BookOpenIcon className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Inventory</div>
                          <div className="text-sm text-gray-300">Assessments for overall mental health</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Programs tab content */}
              <TabsContent value="programs" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Specialized Programs</CardTitle>
                    <CardDescription className="text-gray-300">
                      Programs designed for the unique needs of military personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-programs")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <GraduationCap className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Training</div>
                          <div className="text-sm text-gray-300">Training programs for mental health professionals</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleNavigate("/military-programs")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <Award className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Mental Health Awards</div>
                          <div className="text-sm text-gray-300">Recognition for mental health achievements</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile tab content */}
              <TabsContent value="profile" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription className="text-gray-300">
                      View and update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[#B87333]/30 text-white hover:bg-[#B87333]/10 h-auto py-3"
                        onClick={() => handleButtonClick("View profile")}
                      >
                        <div className="mr-3 p-2 bg-[#B87333]/20 rounded-full">
                          <UserRound className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Personal Information</div>
                          <div className="text-sm text-gray-300">View and update your personal details</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DepartmentOfDefense;
