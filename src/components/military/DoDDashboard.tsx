
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Award, Calendar, Star, ChevronRight, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoDDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleButtonClick = (path: string, title: string) => {
    toast({
      title: `Navigating to ${title}`,
      description: "Loading your requested resource...",
      duration: 1500,
    });
    navigate(path);
  };
  
  const handleAssessmentClick = (assessmentType: string) => {
    toast({
      title: `Starting ${assessmentType} Assessment`,
      description: "Loading assessment questions...",
      duration: 1500,
    });
    // In a real app, we'd navigate to the assessment page or open a modal
    // For now, we'll just show a toast
    setTimeout(() => {
      toast({
        title: "Assessment Ready",
        description: `Your ${assessmentType} assessment is ready to take.`,
        duration: 3000,
      });
    }, 2000);
  };
  
  const handleEventRegistration = (eventName: string, date: string) => {
    toast({
      title: `Registered for ${eventName}`,
      description: `You are now registered for ${eventName} on ${date}. A confirmation has been sent to your email.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Service Member</h2>
          <p className="text-blue-200 mb-6 max-w-3xl">
            This dedicated portal provides specialized mental health resources, tools, and support designed for military personnel, veterans, and their families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white" 
              onClick={() => handleButtonClick("/resource-library", "Resource Library")}
            >
              Explore Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-300 hover:bg-blue-900/50" 
              onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
            >
              Get Immediate Help
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Programs Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Programs</h2>
          <Button 
            variant="link" 
            className="text-blue-400" 
            onClick={() => handleButtonClick("/military-support", "Military Support Programs")}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Shield className="h-5 w-5" />
                <CardTitle>Combat Stress Recovery</CardTitle>
              </div>
              <CardDescription>Evidence-based program for post-deployment adjustment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                A specialized program designed to help service members process combat experiences and build resilience through group therapy and individual counseling.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/military-resources/combat-stress", "Combat Stress Recovery")}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Award className="h-5 w-5" />
                <CardTitle>Transition Support</CardTitle>
              </div>
              <CardDescription>Tools for military to civilian life transition</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Comprehensive resources to help service members and their families navigate the challenges of transitioning from military to civilian life.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/military-resources/transition", "Transition Support")}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Star className="h-5 w-5" />
                <CardTitle>Family Resilience</CardTitle>
              </div>
              <CardDescription>Support for military families and loved ones</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Programs designed to strengthen military families through communication tools, parenting resources, and relationship-building activities.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/military-resources/family", "Family Resilience")}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Quick Access Assessments */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Self-Assessment Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#141921] border-blue-900/30 flex items-center p-4">
            <div className="p-2 rounded-full bg-blue-900/30 mr-4">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-white">PTSD Screening</h3>
              <p className="text-sm text-white/70">Quick 5-minute assessment</p>
            </div>
            <Button 
              size="sm" 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleAssessmentClick("PTSD")}
            >
              Start
            </Button>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30 flex items-center p-4">
            <div className="p-2 rounded-full bg-blue-900/30 mr-4">
              <AlertCircle className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-white">Depression Check</h3>
              <p className="text-sm text-white/70">Standard PHQ-9 assessment</p>
            </div>
            <Button 
              size="sm" 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleAssessmentClick("Depression")}
            >
              Start
            </Button>
          </Card>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                <span className="block text-sm">APR</span>
                <span className="block text-xl font-bold">15</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">Resilience Workshop</h3>
                <p className="text-sm text-white/70">Virtual | 2:00 PM ET</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                onClick={() => handleEventRegistration("Resilience Workshop", "April 15")}
              >
                Register
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                <span className="block text-sm">APR</span>
                <span className="block text-xl font-bold">22</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">PTSD Support Group</h3>
                <p className="text-sm text-white/70">Online | 7:00 PM ET</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                onClick={() => handleEventRegistration("PTSD Support Group", "April 22")}
              >
                Register
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoDDashboard;
