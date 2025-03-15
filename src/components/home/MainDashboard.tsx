import React, { useState } from "react";
import { 
  Heart, 
  Brain, 
  Medal, 
  Users, 
  Flower2, 
  ArrowUpRight, 
  BarChart2, 
  BookText, 
  Dumbbell, 
  BookOpen, 
  CalendarClock, 
  CheckCircle2, 
  PenLine, 
  Building2, 
  MessageSquare,
  DollarSign,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import InsightsSection from "@/components/dashboard/InsightsSection";
import QuizzesSection from "@/components/dashboard/QuizzesSection";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ 
  userName, 
  showHenry, 
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const displayName = userName || "Friend";
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="bg-gradient-to-b from-[#0A1929] to-[#16367c] text-white py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome back, {displayName}</h1>
            <Button 
              variant="ghost" 
              onClick={onHenryToggle}
              className="text-white hover:bg-white/10"
            >
              {showHenry ? "Hide Henry" : "Show Henry"}
            </Button>
          </div>
          <p className="text-lg text-blue-100">Your journey to better mental health continues today</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Button 
              variant="navy-outline" 
              className="py-6 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => navigateToFeature("/real-time-therapy")}
            >
              <div className="flex flex-col items-center">
                <Brain className="h-6 w-6 mb-2" />
                <span className="text-base font-medium">Find a Therapist</span>
              </div>
            </Button>
            
            <Button 
              variant="navy-outline" 
              className="py-6 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => navigateToFeature("/workshops")}
            >
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-base font-medium">Join a Workshop</span>
              </div>
            </Button>
            
            <Button 
              variant="navy-outline" 
              className="py-6 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => navigateToFeature("/mental-wellness-tools")}
            >
              <div className="flex flex-col items-center">
                <Heart className="h-6 w-6 mb-2" />
                <span className="text-base font-medium">Wellness Tools</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 rounded-t-xl bg-white shadow">
            <TabsTrigger 
              value="overview" 
              className="rounded-tl-xl data-[state=active]:bg-gray-50"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-gray-50"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="rounded-tr-xl data-[state=active]:bg-gray-50"
            >
              Progress
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0 bg-gray-50 p-6 rounded-b-xl rounded-tr-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <UpcomingAppointments />
                <QuizzesSection />
              </div>
              <div className="md:col-span-1">
                <InsightsSection />
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Explore Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateToFeature("/mental-health-games")}>
                  <CardHeader className="p-4">
                    <Brain className="h-6 w-6 text-purple-500" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-base">Mental Games</CardTitle>
                    <CardDescription className="text-xs mt-1">Interactive cognitive exercises</CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateToFeature("/journaling")}>
                  <CardHeader className="p-4">
                    <PenLine className="h-6 w-6 text-blue-500" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-base">Journaling</CardTitle>
                    <CardDescription className="text-xs mt-1">Express and process emotions</CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateToFeature("/community-support")}>
                  <CardHeader className="p-4">
                    <Users className="h-6 w-6 text-green-500" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-base">Community</CardTitle>
                    <CardDescription className="text-xs mt-1">Connect with peer support</CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateToFeature("/mindfulness")}>
                  <CardHeader className="p-4">
                    <Flower2 className="h-6 w-6 text-amber-500" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-base">Mindfulness</CardTitle>
                    <CardDescription className="text-xs mt-1">Present-moment awareness</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0 bg-gray-50 p-6 rounded-b-xl rounded-tl-xl shadow">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Mental Health Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/resource-library")}
                >
                  <CardHeader>
                    <BookText className="h-6 w-6 text-blue-500" />
                    <CardTitle className="mt-2">Resource Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Access articles, videos, and tools for understanding and managing mental health.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
                      Browse Resources <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/self-help-resources")}
                >
                  <CardHeader>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <CardTitle className="mt-2">Self-Help Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Step-by-step guides for managing anxiety, depression, stress, and more.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700">
                      View Guides <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/crisis-support")}
                >
                  <CardHeader>
                    <Heart className="h-6 w-6 text-red-500" />
                    <CardTitle className="mt-2">Crisis Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Immediate resources for those experiencing a mental health crisis.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      Get Help Now <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Specialized Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/military-support")}
                >
                  <CardHeader>
                    <Medal className="h-6 w-6 text-blue-700" />
                    <CardTitle className="mt-2">Military Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Resources tailored for active duty, veterans, and military families.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900">
                      Explore Programs <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/workplace-mental-health")}
                >
                  <CardHeader>
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                    <CardTitle className="mt-2">Small Business</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Mental health resources and tools for small business owners and their employees.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800">
                      View Resources <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/family-support")}
                >
                  <CardHeader>
                    <Users className="h-6 w-6 text-purple-600" />
                    <CardTitle className="mt-2">Family Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Tools for families supporting loved ones with mental health challenges.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800">
                      Support Resources <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Educational Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/workshops")}
                >
                  <CardHeader>
                    <BookOpen className="h-6 w-6 text-yellow-600" />
                    <CardTitle className="mt-2">Workshops & Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Interactive sessions on mental health topics led by experts.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-800">
                      Browse Calendar <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/lifestyle-integration")}
                >
                  <CardHeader>
                    <Dumbbell className="h-6 w-6 text-green-600" />
                    <CardTitle className="mt-2">Lifestyle Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Incorporating mental wellness into everyday routines and activities.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                      Explore Techniques <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/financial-assistance")}
                >
                  <CardHeader>
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                    <CardTitle className="mt-2">Financial Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Financial assistance programs and resources for mental health care.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-800">
                      Find Assistance <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="mt-0 bg-gray-50 p-6 rounded-b-xl rounded-tl-xl shadow">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Your Mental Health Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/progress-reports")}
                >
                  <CardHeader>
                    <BarChart2 className="h-6 w-6 text-blue-600" />
                    <CardTitle className="mt-2">Progress Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Track your mental health progress and improvements over time.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      View Reports <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/scheduling")}
                >
                  <CardHeader>
                    <CalendarClock className="h-6 w-6 text-indigo-600" />
                    <CardTitle className="mt-2">Appointment Scheduling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Manage your therapy and wellness appointments in one place.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800">
                      Schedule Now <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/contact")}
                >
                  <CardHeader>
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    <CardTitle className="mt-2">Support & Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Get help with any questions or issues regarding your care.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800">
                      Contact Support <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Additional Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/holistic-wellness")}
                >
                  <CardHeader>
                    <Flower2 className="h-6 w-6 text-green-600" />
                    <CardTitle className="mt-2">Holistic Wellness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Integrating mental health with physical and spiritual well-being.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                      Explore Approaches <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/my-sponsor")}
                >
                  <CardHeader>
                    <Building2 className="h-6 w-6 text-slate-600" />
                    <CardTitle className="mt-2">My Sponsor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Connect with your sponsoring organization for additional support.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                      View Sponsor <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigateToFeature("/settings")}
                >
                  <CardHeader>
                    <Heart className="h-6 w-6 text-red-500" />
                    <CardTitle className="mt-2">Personalize Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Customize your mental health journey to match your needs and preferences.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      Adjust Settings <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainDashboard;
