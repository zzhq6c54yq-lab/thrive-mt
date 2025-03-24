
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, BookOpen, BarChart, Users, Brain, Heart, CheckCircle, Calendar, Play, Download, Building, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import HomeButton from "@/components/HomeButton";

const CorporateEmployeePortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleResourceClick = (resourceName: string) => {
    toast({
      title: `Accessing ${resourceName}`,
      description: "Loading your resource...",
      duration: 1500
    });
    
    navigate("/corporate-wellness", { 
      state: { 
        resource: resourceName
      }
    });
  };

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

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Downloading Resource",
      description: `Your ${resourceName} is being downloaded`,
      duration: 2000
    });
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Consultation Request Submitted",
      description: "A Workplace Mental Health Specialist will contact you within 24 hours to schedule your consultation.",
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Corporate Employee Wellness Portal</h1>
            <p className="text-gray-600 max-w-2xl">
              Mental health resources and support designed specifically for employees in corporate environments.
            </p>
          </div>
          <HomeButton />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start mb-8 bg-white border overflow-x-auto">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="workshops" className="text-base">Workshops</TabsTrigger>
            <TabsTrigger value="resources" className="text-base">Resources</TabsTrigger>
            <TabsTrigger value="support" className="text-base">Support Options</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-l-4 border-l-[#3B82F6]">
                  <CardHeader>
                    <CardTitle className="text-2xl">Welcome to Your Workplace Wellness Hub</CardTitle>
                    <CardDescription className="text-base">
                      Supporting your mental health in the corporate environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    <p className="mb-4">
                      Today's corporate environment presents unique mental health challenges: high-pressure deadlines, 
                      work-life balance struggles, long hours, team dynamics, and career development stress. 
                      This portal is designed to address these specific workplace challenges.
                    </p>
                    <p>
                      Our Corporate Wellness Program provides resources, workshops, and support systems created 
                      specifically for employees in structured workplace environments. Navigate through the tabs 
                      above to discover tools that can help you thrive both professionally and personally.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5 text-[#3B82F6]" />
                      Workplace Mental Health: Why It Matters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-800 mb-2">The Business Case</div>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                          <li>76% of workers report at least one symptom of a mental health condition</li>
                          <li>Workplace stress costs employers $300 billion annually</li>
                          <li>Effective mental health programs show a 4:1 ROI</li>
                          <li>Mental health support reduces absenteeism by up to 45%</li>
                        </ul>
                      </div>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-800 mb-2">Common Workplace Challenges</div>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                          <li>Performance pressure and deadline stress</li>
                          <li>Work-life boundary erosion in digital age</li>
                          <li>Office politics and team conflicts</li>
                          <li>Career path uncertainty and growth anxiety</li>
                          <li>Meeting overload and attention fragmentation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-[#3B82F6]" />
                      What Our Portal Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg bg-gradient-to-b from-white to-blue-50">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                          <BookOpen className="h-6 w-6 text-[#3B82F6]" />
                        </div>
                        <h3 className="font-semibold mb-2">Workplace Resources</h3>
                        <p className="text-sm text-gray-600">
                          Practical tools for managing stress and thriving in corporate environments
                        </p>
                        <Button 
                          variant="link" 
                          className="mt-3 text-[#3B82F6]"
                          onClick={() => setActiveTab("resources")}
                        >
                          Explore Resources
                        </Button>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg bg-gradient-to-b from-white to-blue-50">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                          <Users className="h-6 w-6 text-[#3B82F6]" />
                        </div>
                        <h3 className="font-semibold mb-2">Corporate Workshops</h3>
                        <p className="text-sm text-gray-600">
                          Interactive sessions addressing specific workplace mental health challenges
                        </p>
                        <Button 
                          variant="link" 
                          className="mt-3 text-[#3B82F6]"
                          onClick={() => setActiveTab("workshops")}
                        >
                          View Workshops
                        </Button>
                      </div>
                      
                      <div className="text-center p-4 border rounded-lg bg-gradient-to-b from-white to-blue-50">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                          <Brain className="h-6 w-6 text-[#3B82F6]" />
                        </div>
                        <h3 className="font-semibold mb-2">Confidential Support</h3>
                        <p className="text-sm text-gray-600">
                          Private consultation with workplace mental health specialists
                        </p>
                        <Button 
                          variant="link" 
                          className="mt-3 text-[#3B82F6]"
                          onClick={() => setActiveTab("support")}
                        >
                          Access Support
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-50 to-white">
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <Building className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Corporate Wellness Programs</h3>
                        <p className="text-sm text-gray-600">Companies with strong wellness programs see 66% higher productivity and 32% higher retention</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <Heart className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Workspace Mental Health</h3>
                        <p className="text-sm text-gray-600">91% of employees believe a company's culture should support mental health</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <Brain className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Stress in Corporate Settings</h3>
                        <p className="text-sm text-gray-600">83% of US workers suffer from work-related stress, with 54% saying stress affects home life</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Workshop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                        alt="Workshop preview" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">Boundaries in the Digital Workplace</h3>
                    <p className="text-sm text-gray-600 mb-4">Learn strategies for maintaining work-life balance in an always-connected world.</p>
                    <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Tuesdays</span>
                      </div>
                      <div className="flex items-center">
                        <Play className="h-4 w-4 mr-1" />
                        <span>90 min</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#3B82F6] hover:bg-blue-600"
                      onClick={() => handleWorkshopRegistration("Boundaries in the Digital Workplace")}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Workshops Tab */}
          <TabsContent value="workshops" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Corporate Wellness Workshops</h2>
              <p className="text-gray-600">
                Interactive sessions addressing the specific mental health challenges in workplace environments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Most Popular</Badge>
                  <CardTitle>Boundaries in the Digital Workplace</CardTitle>
                  <CardDescription>Creating healthy work-life separation in the remote work era</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Tuesdays, 2:00PM - 3:30PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Dr. Jamie Martinez</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn practical techniques for maintaining separation between work and personal life in an always-connected workplace. Develop strategies for digital boundaries, expectation management, and mental transitions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-blue-600"
                    onClick={() => handleWorkshopRegistration("Boundaries in the Digital Workplace")}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Executive Focus</Badge>
                  <CardTitle>Managing Performance Anxiety</CardTitle>
                  <CardDescription>Turning workplace stress into professional growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Thursdays, 11:00AM - 12:30PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Dr. Michael Chen</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Transform performance anxiety and imposter syndrome into drivers for professional growth. This workshop provides science-backed techniques for managing high-pressure situations in corporate environments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-blue-600"
                    onClick={() => handleWorkshopRegistration("Managing Performance Anxiety")}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-purple-100 text-purple-800 hover:bg-purple-200">Team Focus</Badge>
                  <CardTitle>Navigating Workplace Relationships</CardTitle>
                  <CardDescription>Building healthy professional connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Wednesdays, 1:00PM - 2:30PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Dr. Sarah Johnson</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Develop skills for navigating complex workplace relationships, managing conflict productively, and building a supportive professional network. Includes strategies for difficult conversations and boundary setting.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-blue-600"
                    onClick={() => handleWorkshopRegistration("Navigating Workplace Relationships")}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-green-100 text-green-800 hover:bg-green-200">Wellbeing</Badge>
                  <CardTitle>Stress Resilience for Professionals</CardTitle>
                  <CardDescription>Building capacity to thrive under pressure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Mondays, 4:00PM - 5:30PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Dr. Alex Patterson</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Develop a personalized toolkit for building stress resilience in high-pressure corporate environments. Learn evidence-based techniques for staying focused, calm, and effective during challenging periods.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-blue-600"
                    onClick={() => handleWorkshopRegistration("Stress Resilience for Professionals")}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-cyan-100 text-cyan-800 hover:bg-cyan-200">Focus & Productivity</Badge>
                  <CardTitle>Mindfulness for Corporate Settings</CardTitle>
                  <CardDescription>Integrating mindfulness into busy workdays</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Fridays, 12:00PM - 1:00PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Dr. Emma Wilson</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Practical mindfulness techniques specifically designed for busy professionals. Learn micro-practices that can be integrated into meetings, email sessions, and transitions between tasks to improve focus and reduce stress.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-blue-600"
                    onClick={() => handleWorkshopRegistration("Mindfulness for Corporate Settings")}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Career Development</Badge>
                  <CardTitle>Managing Career Uncertainty</CardTitle>
                  <CardDescription>Navigating professional transitions with confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Tuesdays, 9:00AM - 10:30AM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-[#3B82F6]" />
                      <span>Dr. Robert Taylor</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Address the anxiety and stress that comes with career uncertainty, transitions, and professional identity questions. Develop a toolkit for navigating change while maintaining mental wellbeing.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-blue-600"
                    onClick={() => handleWorkshopRegistration("Managing Career Uncertainty")}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Corporate Wellness Resources</h2>
              <p className="text-gray-600">
                Practical tools and guides specifically designed for workplace mental health support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Guides & Reading Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">The Corporate Mental Health Handbook</div>
                      <div className="text-sm text-gray-600 mb-2">Comprehensive guide to maintaining wellbeing in high-pressure environments</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Corporate Mental Health Handbook")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Managing Digital Overwhelm</div>
                      <div className="text-sm text-gray-600 mb-2">Strategies for information overload and constant connectivity</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Managing Digital Overwhelm Guide")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Workplace Communication Skills</div>
                      <div className="text-sm text-gray-600 mb-2">Building healthy communication patterns with colleagues</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Workplace Communication Guide")}
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
                    <Play className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Video Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Quick Desk Exercises for Stress Relief</div>
                      <div className="text-sm text-gray-600 mb-2">5-minute routines you can do at your desk</div>
                      <Button 
                        onClick={() => handleResourceClick("Desk Exercises Video Series")}
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Series
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Mindfulness for Busy Professionals</div>
                      <div className="text-sm text-gray-600 mb-2">10-minute guided practices for work environments</div>
                      <Button 
                        onClick={() => handleResourceClick("Workplace Mindfulness Videos")}
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Series
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Creating Healthy Workplace Habits</div>
                      <div className="text-sm text-gray-600 mb-2">Building routines that support mental wellbeing</div>
                      <Button 
                        onClick={() => handleResourceClick("Workplace Habits Video Series")}
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Series
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Team Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Team Wellness Check-In Template</div>
                      <div className="text-sm text-gray-600 mb-2">Framework for teams to discuss mental health openly</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Team Wellness Check-In Template")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Template
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Psychological Safety Guide</div>
                      <div className="text-sm text-gray-600 mb-2">Building teams where mental health is supported</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Psychological Safety Guide")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Guide
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Conflict Resolution Framework</div>
                      <div className="text-sm text-gray-600 mb-2">Healthy approaches to workplace disagreements</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => handleDownload("Conflict Resolution Framework")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Framework
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-[#3B82F6]" />
                    Self-Assessment Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Workplace Stress Assessment</div>
                      <div className="text-sm text-gray-600 mb-2">Identify your specific workplace stressors</div>
                      <Button 
                        onClick={() => handleResourceClick("Workplace Stress Assessment")}
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Take Assessment
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Work-Life Balance Evaluation</div>
                      <div className="text-sm text-gray-600 mb-2">Analyze your current boundaries and integration</div>
                      <Button 
                        onClick={() => handleResourceClick("Work-Life Balance Evaluation")}
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Take Evaluation
                      </Button>
                    </li>
                    
                    <li className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium mb-1">Career Alignment Check</div>
                      <div className="text-sm text-gray-600 mb-2">Assess how your work aligns with your values</div>
                      <Button 
                        onClick={() => handleResourceClick("Career Alignment Assessment")}
                        variant="outline" 
                        size="sm" 
                        className="text-[#3B82F6] border-[#3B82F6]"
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Take Assessment
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Support Tab */}
          <TabsContent value="support" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Corporate Wellness Support</h2>
              <p className="text-gray-600">
                Confidential support options for addressing workplace mental health concerns.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-r from-blue-50 to-white">
                  <CardHeader>
                    <CardTitle>Schedule a Consultation</CardTitle>
                    <CardDescription>
                      Speak confidentially with a workplace mental health specialist
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <p className="text-gray-600">
                        Our workplace specialists understand the unique challenges of corporate environments 
                        and can provide personalized guidance for your specific situation. All consultations 
                        are completely confidential and not reported to your employer.
                      </p>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">What to expect in a consultation:</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Confidential assessment of your workplace mental health concerns</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Personalized strategies for your specific work environment</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Guidance on available resources and next steps</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Follow-up plan to ensure ongoing support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#3B82F6] hover:bg-blue-600"
                      onClick={handleScheduleConsultation}
                    >
                      Schedule Confidential Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crisis Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h3 className="font-semibold text-red-800 mb-2">If you're experiencing a crisis:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="font-medium text-gray-900">988</div>
                            <span className="text-sm text-gray-600 ml-2">Suicide & Crisis Lifeline</span>
                          </li>
                          <li className="flex items-center">
                            <div className="font-medium text-gray-900">Text HOME to 741741</div>
                            <span className="text-sm text-gray-600 ml-2">Crisis Text Line</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full text-[#3B82F6] border-[#3B82F6]"
                        onClick={() => navigate("/crisis-support")}
                      >
                        View All Crisis Resources
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Peer Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Connect with other professionals facing similar workplace mental health challenges.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full text-[#3B82F6] border-[#3B82F6]"
                      onClick={() => handleResourceClick("Peer Support Groups")}
                    >
                      Explore Peer Support Options
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CorporateEmployeePortal;
