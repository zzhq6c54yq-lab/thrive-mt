
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Shield, UserRound, Phone, BookOpen, Calendar, Heart, Award, LifeBuoy, 
  BarChart, Briefcase, Footprints, Flag, Lightbulb,
  GraduationCap, Medal, Puzzle, Users, BookOpen as BookOpenIcon, Brain, CheckSquare,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrisisResourcesBar from "@/components/military/CrisisResourcesBar";
import { 
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
      console.log("Showing initial message");
      const timer = setTimeout(() => {
        console.log("Timer expired, hiding initial message");
        setShowInitialMessage(false);
        setShowWelcome(true);
      }, 8000); // 8 seconds
      return () => clearTimeout(timer);
    }
    
    // Then show welcome screen for 4 seconds
    if (showWelcome) {
      console.log("Showing welcome message");
      const timer = setTimeout(() => {
        console.log("Timer expired, hiding welcome message");
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
    console.log("Rendering initial message");
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1929]">
        <div className="fixed inset-0 flex items-center justify-center bg-[#0A1929] z-50">
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
      </div>
    );
  }

  // Welcome screen that fades out
  if (showWelcome) {
    console.log("Rendering welcome screen");
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1929]">
        <div className="fixed inset-0 flex items-center justify-center bg-[#0A1929] z-50">
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
            <div className="bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-10 rounded-lg border-2 border-[#B87333] shadow-lg">
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
                  variant="default"
                  size="lg" 
                  onClick={() => setShowWelcome(false)}
                  className="px-8 py-6 text-lg bg-[#B87333] hover:bg-[#B87333]/80"
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
      </div>
    );
  }

  // Main content
  console.log("Rendering main DoD content");
  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
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
              {/* Tab content would go here - I'll include just a placeholder since it's very long */}
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
                      <p className="text-white">Military service information will appear here.</p>
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
                      <p className="text-white">Your scheduled sessions will appear here.</p>
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
                      <p className="text-white">Your well-being metrics will appear here.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Military-Specific Resources</CardTitle>
                    <CardDescription className="text-gray-300">
                      Curated content for service members and veterans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">Resource listings will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Education & Resources</CardTitle>
                    <CardDescription className="text-gray-300">
                      Learn about mental health and wellness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">Educational content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="assessments" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Mental Health Assessments</CardTitle>
                    <CardDescription className="text-gray-300">
                      Professional-grade assessments tailored for military personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">Assessment options will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="programs" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Specialized Programs</CardTitle>
                    <CardDescription className="text-gray-300">
                      Programs designed for the unique needs of military personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">Program listings will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription className="text-gray-300">
                      View and update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">Your profile information will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentOfDefense;
