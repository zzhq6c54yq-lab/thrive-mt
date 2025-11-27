
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, CalendarDays, CalendarClock, Video, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const HospitalityWorkshops: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: "Loading Workshop",
      description: `Opening ${workshopTitle}`,
      duration: 1500,
    });
    
    navigate(`/hospitality-workshops/${workshopId}`, {
      state: {
        stayInPortal: true,
        preventTutorial: true,
        portalPath: "/hospitality-portal",
        tab: "workshops",
        workshopTitle
      }
    });
  };
  
  const handleRegister = (workshopTitle: string) => {
    toast({
      title: "Registration Successful",
      description: `You're registered for ${workshopTitle}`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Hospitality Wellness Workshops</h2>
        <p className="text-white/70">
          Specialized training sessions designed for restaurant and hospitality professionals
        </p>
      </div>
      
      {/* Featured Workshop */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Building Resilience in High-Pressure Environments</h3>
              <p className="opacity-90 mb-4">
                Learn strategies to maintain your wellbeing while thriving in fast-paced service settings
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Tomorrow</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>2:00 PM - 3:30 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>Virtual</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => handleRegister("Building Resilience in High-Pressure Environments")}
              >
                Register Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Workshops */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-purple-500" />
          Upcoming Workshops
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Mindfulness for Service Industry Professionals</span>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  Friday
                </div>
              </CardTitle>
              <CardDescription>Practical mindfulness techniques for busy shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>7:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>Virtual</span>
                </div>
              </div>
              <p className="text-sm text-white/70">
                Learn quick, in-the-moment mindfulness techniques that can be used during busy shifts to maintain focus and emotional balance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                className="text-purple-600"
                onClick={() => handleWorkshopClick("mindfulness", "Mindfulness for Service Industry Professionals")}
              >
                Details
              </Button>
              <Button 
                onClick={() => handleRegister("Mindfulness for Service Industry Professionals")}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Creating Healthy Kitchen Culture</span>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Next Monday
                </div>
              </CardTitle>
              <CardDescription>For chefs, managers, and kitchen leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>3:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>In-person & Virtual</span>
                </div>
              </div>
              <p className="text-sm text-white/70">
                For those in leadership positions, learn practical steps to foster a healthier, more supportive culture in high-pressure kitchen environments.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                className="text-purple-600"
                onClick={() => handleWorkshopClick("kitchen-culture", "Creating Healthy Kitchen Culture")}
              >
                Details
              </Button>
              <Button 
                onClick={() => handleRegister("Creating Healthy Kitchen Culture")}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Managing Difficult Customer Interactions</span>
                <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  Next Wednesday
                </div>
              </CardTitle>
              <CardDescription>Emotional regulation for front-of-house staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>6:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>Virtual</span>
                </div>
              </div>
              <p className="text-sm text-white/70">
                Develop strategies for managing emotions during challenging customer interactions and preventing these experiences from affecting your wellbeing.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                className="text-purple-600"
                onClick={() => handleWorkshopClick("customer-interactions", "Managing Difficult Customer Interactions")}
              >
                Details
              </Button>
              <Button 
                onClick={() => handleRegister("Managing Difficult Customer Interactions")}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Work-Life Balance with Irregular Hours</span>
                <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                  Next Thursday
                </div>
              </CardTitle>
              <CardDescription>Maintaining boundaries and personal life</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>1:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>Virtual</span>
                </div>
              </div>
              <p className="text-sm text-white/70">
                Practical strategies for maintaining meaningful personal relationships, self-care routines, and life satisfaction despite non-traditional work hours.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                className="text-purple-600"
                onClick={() => handleWorkshopClick("work-life-balance", "Work-Life Balance with Irregular Hours")}
              >
                Details
              </Button>
              <Button 
                onClick={() => handleRegister("Work-Life Balance with Irregular Hours")}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* On-Demand Workshops */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-purple-500" />
          On-Demand Workshops
        </h3>
        
        <Card className="bg-white/10">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-white">Physical Wellness for Service Industry</h4>
                  <p className="text-sm text-white/60">Preventing injuries and managing physical strain</p>
                </div>
                <Button 
                  variant="ghost"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleWorkshopClick("physical-wellness", "Physical Wellness for Service Industry")}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-white">Managing Workplace Conflicts</h4>
                  <p className="text-sm text-white/60">Communication strategies for tense situations</p>
                </div>
                <Button 
                  variant="ghost"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleWorkshopClick("conflict-management", "Managing Workplace Conflicts")}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-white">Financial Wellness in Tip-Based Work</h4>
                  <p className="text-sm text-white/60">Managing finances with variable income</p>
                </div>
                <Button 
                  variant="ghost"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleWorkshopClick("financial-wellness", "Financial Wellness in Tip-Based Work")}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">Setting Boundaries with Co-Workers</h4>
                  <p className="text-sm text-white/60">Creating healthy workplace relationships</p>
                </div>
                <Button 
                  variant="ghost"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleWorkshopClick("boundaries", "Setting Boundaries with Co-Workers")}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalityWorkshops;
