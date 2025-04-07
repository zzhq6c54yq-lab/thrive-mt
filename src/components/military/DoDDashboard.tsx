
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Award, Calendar, Star, ChevronRight, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoDDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get state from location to maintain context between navigations
  const returnToPortal = location.state?.returnToPortal || "/dod-portal";
  const preventTutorial = location.state?.preventTutorial || false;
  
  const handleButtonClick = (path: string, title: string) => {
    toast({
      title: `Navigating to ${title}`,
      description: "Loading your requested resource...",
      duration: 1500,
    });
    
    navigate(path, {
      state: {
        preventTutorial: true,
        returnToMain: false,
        returnToPortal: "/dod-portal"
      }
    });
  };
  
  const handleAssessmentClick = (assessmentType: string) => {
    toast({
      title: `Starting ${assessmentType} Assessment`,
      description: "Loading assessment questions...",
      duration: 1500,
    });
    navigate("/mental-wellness-tools", {
      state: {
        preventTutorial: true,
        returnToMain: false,
        returnToPortal: "/dod-portal",
        assessmentType,
        openAssessment: true
      }
    });
  };
  
  const handleEventRegistration = (eventName: string, date: string) => {
    toast({
      title: `Registered for ${eventName}`,
      description: `You are now registered for ${eventName} on ${date}. A confirmation has been sent to your email.`,
      duration: 3000,
    });
    navigate("/workshops", {
      state: {
        preventTutorial: true,
        returnToMain: false,
        returnToPortal: "/dod-portal",
        highlightWorkshop: eventName
      }
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner - Full width with improved spacing */}
      <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        {/* Patriotic flag background element */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-5">
            {/* Red and white stripes */}
            <div className="absolute bottom-0 left-0 right-0 h-full">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[14.28%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                />
              ))}
            </div>
            
            {/* Blue field with stars */}
            <div className="absolute top-0 left-0 w-1/4 h-1/2 bg-blue-900">
              <div className="grid grid-cols-3 gap-2 p-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Star className="h-1 w-1 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Service Member</h2>
          <p className="text-blue-200 mb-6 max-w-3xl">
            This dedicated portal provides specialized mental health resources, tools, and support designed for military personnel, veterans, and their families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white" 
              onClick={() => handleButtonClick("/military-resources", "Military Resources")}
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
      
      {/* Main Content - More fluid responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Featured Programs */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Featured Programs
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle>Combat Stress Recovery</CardTitle>
                <CardDescription>Post-deployment adjustment program</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Process combat experiences and build resilience through proven techniques.
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm"
                  onClick={() => handleButtonClick("/military-resources/combat-stress", "Combat Stress Recovery")}
                >
                  Access Program
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle>Transition Support</CardTitle>
                <CardDescription>Military to civilian life tools</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Navigate challenges of transitioning from military to civilian life.
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm"
                  onClick={() => handleButtonClick("/military-resources/transition", "Transition Support")}
                >
                  Access Resources
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle>Family Resilience</CardTitle>
                <CardDescription>Support for military families</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Tools to strengthen military families through deployments and relocations.
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm"
                  onClick={() => handleButtonClick("/military-resources/family", "Family Resilience")}
                >
                  Support Family
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Column 2: Self-Assessments and Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            Quick Assessments
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <Card className="bg-[#141921] border-blue-900/30 flex flex-col p-4">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-900/30 mr-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">PTSD Screening</h3>
                  <p className="text-sm text-white/70">5-minute confidential assessment</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleAssessmentClick("PTSD")}
              >
                Start Assessment
              </Button>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 flex flex-col p-4">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-900/30 mr-4">
                  <AlertCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Depression Check</h3>
                  <p className="text-sm text-white/70">PHQ-9 standard screening</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleAssessmentClick("Depression")}
              >
                Start Assessment
              </Button>
            </Card>
          </div>
          
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-8">
            <Calendar className="h-5 w-5 text-blue-400" />
            Upcoming Events
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
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
        
        {/* Column 3: Quick Links and Additional Resources */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-400" />
            Quick Access Resources
          </h2>
          
          <div className="bg-[#141921] border border-blue-900/30 rounded-lg p-4 space-y-3">
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-700/40 text-blue-100 hover:bg-blue-900/20"
              onClick={() => handleButtonClick("/community-support", "Community Support")}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Military Community Support
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-700/40 text-blue-100 hover:bg-blue-900/20"
              onClick={() => handleButtonClick("/resource-library", "Resource Library")}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Military Resource Library
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-700/40 text-blue-100 hover:bg-blue-900/20"
              onClick={() => handleButtonClick("/mental-wellness", "Mental Wellness")}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Crisis Response Resources
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-700/40 text-blue-100 hover:bg-blue-900/20"
              onClick={() => handleButtonClick("/workshops", "Workshops")}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              All Veteran Workshops
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-700/40 text-blue-100 hover:bg-blue-900/20"
              onClick={() => handleButtonClick("/mindfulness-sleep", "Sleep Resources")}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Sleep & Mindfulness Tools
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-blue-700/40 text-blue-100 hover:bg-blue-900/20"
              onClick={() => handleButtonClick("/copay-credits", "Financial Support")}
            >
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Financial Support Programs
            </Button>
          </div>
          
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 p-4">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-300" />
                Immediate Help Resources
              </h3>
              <p className="text-sm text-blue-100/80 mb-4">
                Confidential support available 24/7 for veterans in crisis
              </p>
              <div className="space-y-2">
                <div className="bg-blue-900/30 rounded p-3">
                  <h4 className="text-sm font-medium text-white">Veterans Crisis Line</h4>
                  <p className="text-sm text-blue-200">1-800-273-8255 (Press 1)</p>
                </div>
                <div className="bg-blue-900/30 rounded p-3">
                  <h4 className="text-sm font-medium text-white">Military OneSource</h4>
                  <p className="text-sm text-blue-200">1-800-342-9647</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-950/50">
              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
              >
                Get Immediate Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoDDashboard;
