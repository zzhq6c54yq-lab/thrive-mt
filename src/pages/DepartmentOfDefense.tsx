
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Shield, UserRound, Phone, BookOpen, Calendar, Heart, Award, LifeBuoy, BarChart, ListChecks, Briefcase, Footprints, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import Page from "@/components/Page";
import CrisisResourcesBar from "@/components/military/CrisisResourcesBar";

const DepartmentOfDefense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Auto-hide welcome screen after 4 seconds
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleButtonClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} feature will be available soon`,
    });
  };

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

          <CrisisResourcesBar />

          <div className="my-8">
            <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-8 bg-[#0A1929]/50 p-1 border border-[#B87333]/30">
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  className="data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="assessments" 
                  className="data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow"
                >
                  Assessments
                </TabsTrigger>
                <TabsTrigger 
                  value="programs" 
                  className="data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow"
                >
                  Programs
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#B87333] data-[state=active]:shadow"
                >
                  My Profile
                </TabsTrigger>
              </TabsList>

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
                          <div className="font-medium">Transition Support</div>
                          <div className="text-sm text-gray-300">Civilian life adjustment resources</div>
                        </div>
                      </Button>
                    </div>
                    <div className="mt-6">
                      <Button 
                        variant="gold" 
                        className="w-full"
                        onClick={() => handleNavigate("/military-resources")}
                      >
                        View All Military Resources
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessments" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Mental Health Assessments</CardTitle>
                    <CardDescription className="text-gray-300">
                      Self-evaluations and professional screening tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-[#B87333]/30 rounded-lg hover:bg-[#B87333]/10 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-[#B87333]">PTSD Screening Assessment</h3>
                            <p className="text-sm text-gray-300">5-10 minutes | Confidential</p>
                          </div>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Recommended
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("PTSD Assessment")}
                        >
                          Start Assessment
                        </Button>
                      </div>
                      
                      <div className="p-4 border border-[#B87333]/30 rounded-lg hover:bg-[#B87333]/10 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-white">Deployment Stress Inventory</h3>
                            <p className="text-sm text-gray-300">10-15 minutes | Confidential</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Deployment Stress Assessment")}
                        >
                          Start Assessment
                        </Button>
                      </div>
                      
                      <div className="p-4 border border-[#B87333]/30 rounded-lg hover:bg-[#B87333]/10 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-white">Sleep Quality Evaluation</h3>
                            <p className="text-sm text-gray-300">5 minutes | Confidential</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Sleep Assessment")}
                        >
                          Start Assessment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle>Specialized Programs</CardTitle>
                    <CardDescription className="text-gray-300">
                      Tailored mental health programs for military personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-[#0A1929] border border-[#B87333]/30 rounded-lg">
                        <h3 className="text-xl font-semibold text-[#B87333]">Combat Trauma Recovery Program</h3>
                        <p className="text-gray-300 mt-2">
                          An 8-week structured program designed specifically for service members who have experienced combat-related trauma. Includes evidence-based therapy approaches and peer support.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Group Sessions
                          </Badge>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Virtual Options
                          </Badge>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Certificate
                          </Badge>
                        </div>
                        <Button 
                          variant="gold" 
                          className="mt-4"
                          onClick={() => handleButtonClick("Combat Trauma Recovery Program")}
                        >
                          Learn More & Enroll
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-[#0A1929] border border-[#B87333]/30 rounded-lg">
                        <h3 className="text-xl font-semibold text-white">Military-to-Civilian Transition</h3>
                        <p className="text-gray-300 mt-2">
                          A comprehensive program designed to support service members transitioning to civilian life. Addresses mental health aspects of transition, identity shifts, and building a new purpose.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            1-on-1 Coaching
                          </Badge>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Resources
                          </Badge>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Community
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Transition Program")}
                        >
                          Learn More & Enroll
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-[#0A1929] border border-[#B87333]/30 rounded-lg">
                        <h3 className="text-xl font-semibold text-white">Military Family Resilience</h3>
                        <p className="text-gray-300 mt-2">
                          Supporting the entire family unit through the unique challenges of military life, including deployments, relocations, and reintegration.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Family Sessions
                          </Badge>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Children's Activities
                          </Badge>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            Resources
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Family Resilience Program")}
                        >
                          Learn More & Enroll
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-8">
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserRound className="h-5 w-5 text-[#B87333]" />
                      Military Profile
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Your personal military information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-[#B87333] mb-4">Service Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Name:</span>
                              <span className="text-white">John Doe</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Service Branch:</span>
                              <span className="text-white">Army</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Rank:</span>
                              <span className="text-white">Sergeant</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Status:</span>
                              <span className="text-white">Active Duty</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Years of Service:</span>
                              <span className="text-white">6</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Deployment History:</span>
                              <span className="text-white">2 deployments</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-[#B87333] mb-4">Program Preferences</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Primary Concerns:</span>
                              <span className="text-white">PTSD, Sleep</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Session Format:</span>
                              <span className="text-white">Virtual</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Counselor Preference:</span>
                              <span className="text-white">Military Experience</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Communication:</span>
                              <span className="text-white">Email, Text</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Program Interests:</span>
                              <span className="text-white">Group Therapy, Mindfulness</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                              <span className="text-gray-300">Support Network:</span>
                              <span className="text-white">Family included</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-6">
                        <Button 
                          variant="gold"
                          onClick={() => handleButtonClick("Edit Profile")}
                        >
                          Edit Profile
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                          onClick={() => handleButtonClick("Privacy Settings")}
                        >
                          Privacy Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-[#B87333]" />
                      Progress History
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Track your journey and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-[#B87333]/20 p-2 rounded-full mr-3">
                              <BookOpen className="h-4 w-4 text-[#B87333]" />
                            </div>
                            <span className="font-medium text-white">Assessment Completed</span>
                          </div>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            2 days ago
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mt-2 ml-11">
                          PTSD Screening Assessment
                        </p>
                      </div>
                      
                      <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-[#B87333]/20 p-2 rounded-full mr-3">
                              <Calendar className="h-4 w-4 text-[#B87333]" />
                            </div>
                            <span className="font-medium text-white">Session Attended</span>
                          </div>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            1 week ago
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mt-2 ml-11">
                          Group Mindfulness Practice
                        </p>
                      </div>
                      
                      <div className="p-3 bg-[#0A1929] rounded-lg border border-[#B87333]/10">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-[#B87333]/20 p-2 rounded-full mr-3">
                              <Award className="h-4 w-4 text-[#B87333]" />
                            </div>
                            <span className="font-medium text-white">Badge Earned</span>
                          </div>
                          <Badge variant="outline" className="bg-transparent border-[#B87333]/30 text-[#B87333]">
                            2 weeks ago
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mt-2 ml-11">
                          Resilience Champion - 5 Sessions Completed
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10"
                        onClick={() => handleButtonClick("View Full History")}
                      >
                        View Full History
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
