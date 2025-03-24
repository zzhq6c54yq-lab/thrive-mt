
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Brain, Bookmark, Calendar, Clock, Coffee, 
  Heart, Users, Briefcase, Compass, Shield, CheckCircle 
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";

const EmployeeReadiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");

  // Resources data
  const resources = [
    {
      id: "stress-management",
      title: "Workplace Stress Management",
      icon: <Brain className="h-5 w-5 text-green-500" />,
      description: "Techniques to manage stress in fast-paced work environments",
      tags: ["Essential", "Most Popular"]
    },
    {
      id: "boundaries",
      title: "Setting Healthy Boundaries",
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      description: "Learn to establish and maintain professional boundaries",
      tags: ["Essential"]
    },
    {
      id: "time-management",
      title: "Time Management for Work-Life Balance",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      description: "Practical strategies to balance work responsibilities and personal life",
      tags: ["Popular"]
    },
    {
      id: "toxic-workplace",
      title: "Navigating Toxic Work Environments",
      icon: <Compass className="h-5 w-5 text-orange-500" />,
      description: "Tools for maintaining wellbeing in challenging workplace cultures",
      tags: ["Trending"]
    },
    {
      id: "burnout-prevention",
      title: "Burnout Prevention and Recovery",
      icon: <Coffee className="h-5 w-5 text-red-500" />,
      description: "Recognize the signs of burnout and implement recovery strategies",
      tags: ["Essential"]
    },
    {
      id: "workplace-relationships",
      title: "Building Healthy Workplace Relationships",
      icon: <Users className="h-5 w-5 text-pink-500" />,
      description: "Communication skills for positive workplace interactions",
      tags: ["Popular"]
    }
  ];

  // Workshops data
  const workshops = [
    {
      id: "resilience-training",
      title: "Workplace Resilience Training",
      date: "Every Monday",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      description: "Build emotional resilience to workplace challenges and setbacks",
      duration: "60 minutes"
    },
    {
      id: "mindful-work",
      title: "Mindfulness at Work",
      date: "Every Wednesday",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      description: "Integrate mindfulness practices into your daily work routine",
      duration: "45 minutes"
    },
    {
      id: "communication-skills",
      title: "Effective Workplace Communication",
      date: "Every Friday",
      icon: <Briefcase className="h-5 w-5 text-blue-500" />,
      description: "Enhance your communication skills for better team collaboration",
      duration: "90 minutes"
    },
    {
      id: "career-development",
      title: "Career Growth & Wellbeing",
      date: "Every 2nd Tuesday",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: "Strategies for professional development while maintaining mental health",
      duration: "75 minutes"
    }
  ];

  // Assessments data
  const assessments = [
    {
      id: "workplace-stress",
      title: "Workplace Stress Assessment",
      icon: <Brain className="h-5 w-5 text-red-500" />,
      description: "Gauge your current workplace stress levels and receive personalized recommendations",
      time: "10 minutes"
    },
    {
      id: "burnout-risk",
      title: "Burnout Risk Evaluation",
      icon: <Coffee className="h-5 w-5 text-orange-500" />,
      description: "Assess your risk of professional burnout and get preventive strategies",
      time: "15 minutes"
    },
    {
      id: "work-life-balance",
      title: "Work-Life Balance Check",
      icon: <Compass className="h-5 w-5 text-blue-500" />,
      description: "Evaluate how effectively you're balancing professional and personal life",
      time: "8 minutes"
    }
  ];

  const handleResourceClick = (resourceId: string, resourceTitle: string) => {
    toast({
      title: `Accessing Resource`,
      description: `Loading "${resourceTitle}" content...`,
      duration: 2000
    });
    
    // In a full implementation, this would navigate to the specific resource
    // navigate(`/employee-readiness/resources/${resourceId}`);
  };

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: `Workshop Registration`,
      description: `Opening "${workshopTitle}" registration details...`,
      duration: 2000
    });
    
    // In a full implementation, this would navigate to the workshop details
    // navigate(`/employee-readiness/workshops/${workshopId}`);
  };

  const handleAssessmentClick = (assessmentId: string, assessmentTitle: string) => {
    toast({
      title: `Starting Assessment`,
      description: `Preparing "${assessmentTitle}" for you...`,
      duration: 2000
    });
    
    // In a full implementation, this would navigate to the assessment
    // navigate(`/employee-readiness/assessments/${assessmentId}`);
  };

  const handleSavedItemClick = (itemId: string) => {
    toast({
      title: `Accessing Saved Item`,
      description: `Opening your saved content...`,
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] text-white py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/small-business-portal" className="inline-flex items-center text-white hover:text-white/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portal Options
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Employee Readiness</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Tools, resources, and support to help you maintain mental wellbeing 
            in the workplace and achieve a healthy work-life balance.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs defaultValue="resources" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map(resource => (
                <Card 
                  key={resource.id}
                  className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => handleResourceClick(resource.id, resource.title)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-full bg-black/30">
                        {resource.icon}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-xl mt-3">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{resource.description}</p>
                    <div className="flex mt-3 gap-2">
                      {resource.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`text-xs px-2 py-1 rounded-full ${
                            tag === 'Essential' ? 'bg-red-500/20 text-red-300' :
                            tag === 'Popular' ? 'bg-blue-500/20 text-blue-300' :
                            tag === 'Most Popular' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-green-500/20 text-green-300'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/20 hover:bg-white/20 text-white"
                    >
                      Access Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Workshops Tab */}
          <TabsContent value="workshops" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map(workshop => (
                <Card 
                  key={workshop.id}
                  className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => handleWorkshopClick(workshop.id, workshop.title)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-full bg-black/30">
                        {workshop.icon}
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-white/70" />
                        <span className="text-xs text-white/70">{workshop.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-3">{workshop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{workshop.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Calendar className="h-4 w-4 text-white/60" />
                      <span className="text-sm text-white/60">{workshop.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/20 hover:bg-white/20 text-white"
                    >
                      Register for Workshop
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assessments.map(assessment => (
                <Card 
                  key={assessment.id}
                  className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => handleAssessmentClick(assessment.id, assessment.title)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-full bg-black/30">
                        {assessment.icon}
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-white/70" />
                        <span className="text-xs text-white/70">{assessment.time}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-3">{assessment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{assessment.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/20 hover:bg-white/20 text-white"
                    >
                      Take Assessment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeReadiness;
