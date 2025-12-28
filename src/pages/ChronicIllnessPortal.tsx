import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, BookOpen, Users, Stethoscope, BookMarked, 
  Heart, Brain, Sparkles, Calendar, ArrowRight, Phone,
  Moon, Leaf, Shield, Clock, MessageCircle
} from "lucide-react";
import NavigationBar from "@/components/navigation/NavigationBar";
import PortalHenrySection from "@/components/henry/PortalHenrySection";
import ChronicIllnessResources from "@/components/chronic-illness/ChronicIllnessResources";
import ChronicIllnessCommunity from "@/components/chronic-illness/ChronicIllnessCommunity";
import ChronicIllnessAssessments from "@/components/chronic-illness/ChronicIllnessAssessments";
import ChronicIllnessWorkshops from "@/components/chronic-illness/ChronicIllnessWorkshops";

const ChronicIllnessPortal: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '';
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleNavigate = (path: string) => {
    navigate(path, { state: { fromPortal: 'chronic-illness' } });
  };

  const henryQuickActions = [
    { label: "Pain Management Tips", onClick: () => handleNavigate("/app/resources") },
    { label: "Energy Conservation", onClick: () => handleNavigate("/app/self-care") },
    { label: "Symptom Tracking", onClick: () => handleNavigate("/app/mood-tracker") },
  ];

  const featuredPrograms = [
    {
      title: "Pain & Symptom Management",
      description: "Evidence-based strategies for managing chronic pain and symptoms",
      icon: Heart,
      duration: "Self-paced",
      category: "Wellness"
    },
    {
      title: "Energy Conservation",
      description: "Learn to manage your energy and pace yourself effectively",
      icon: Sparkles,
      duration: "4 weeks",
      category: "Self-Care"
    },
    {
      title: "Emotional Resilience",
      description: "Build coping skills for the emotional challenges of chronic illness",
      icon: Brain,
      duration: "6 weeks",
      category: "Mental Health"
    }
  ];

  const assessmentTools = [
    {
      title: "Quality of Life Assessment",
      description: "Evaluate how your condition affects daily life",
      icon: Activity,
      time: "10 min"
    },
    {
      title: "Depression & Anxiety Screen",
      description: "Check in on your mental health alongside physical symptoms",
      icon: Brain,
      time: "5 min"
    }
  ];

  const upcomingEvents = [
    {
      title: "Living Well with Chronic Illness",
      date: "January 8, 2025",
      time: "2:00 PM EST",
      type: "Virtual Workshop"
    },
    {
      title: "Chronic Pain Support Circle",
      date: "January 12, 2025",
      time: "7:00 PM EST",
      type: "Peer Support"
    },
    {
      title: "Mindfulness for Pain Management",
      date: "January 15, 2025",
      time: "12:00 PM EST",
      type: "Guided Session"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1a20] via-[#22202a] to-[#282432] text-white animate-page-enter">
      <NavigationBar 
        showBackButton={true}
        showHomeButton={true}
        title="Chronic Illness Support"
        portalMode={true}
        portalPath="/chronic-illness-welcome"
      />
      
      {/* Header Banner */}
      <div className="relative pt-20 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-violet-400 blur-3xl" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Heart className="h-8 w-8 text-purple-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Chronic Illness Support Portal</h1>
              <p className="text-purple-200/80">Holistic support for your wellness journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-white/5 border border-white/10 p-1 rounded-lg">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assessments" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Assessments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workshops" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <BookMarked className="h-4 w-4" />
              <span className="hidden sm:inline">Workshops</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-8 animate-fade-in">
            {/* Henry AI Section */}
            <PortalHenrySection
              portalName="Chronic Illness Support"
              portalMessage="Living with a chronic condition takes incredible strength. I'm here to support your physical and emotional wellbeing—whether you need pain management strategies, energy conservation tips, or just someone to listen on difficult days."
              quickActions={henryQuickActions}
              accentColor="purple"
            />

            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-purple-900/40 to-violet-900/40 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Welcome back{userName ? `, ${userName}` : ''}
                    </h2>
                    <p className="text-purple-200/80">
                      Your wellness matters. Explore resources designed for your unique journey.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleNavigate("/app/mood-tracker")}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Track Symptoms
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleNavigate("/app/self-care")}
                      className="border-purple-400/50 text-purple-200 hover:bg-purple-500/20"
                    >
                      Self-Care Tools
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Programs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Featured Programs</h3>
                <Button variant="ghost" className="text-purple-300 hover:text-purple-200">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {featuredPrograms.map((program, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                          <program.icon className="h-5 w-5 text-purple-300" />
                        </div>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 text-xs">
                          {program.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg mt-3">{program.title}</CardTitle>
                      <CardDescription className="text-purple-200/70">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm text-purple-300/70">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Self-Assessment Tools */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Self-Assessment Tools</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {assessmentTools.map((tool, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 bg-violet-500/20 rounded-xl">
                        <tool.icon className="h-6 w-6 text-violet-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{tool.title}</h4>
                        <p className="text-sm text-purple-200/70">{tool.description}</p>
                      </div>
                      <Badge variant="outline" className="border-purple-400/50 text-purple-300">
                        {tool.time}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
                <Button variant="ghost" className="text-purple-300 hover:text-purple-200">
                  See Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                    <CardContent className="p-4">
                      <Badge className="bg-purple-500/30 text-purple-200 mb-3">{event.type}</Badge>
                      <h4 className="font-semibold text-white mb-2">{event.title}</h4>
                      <div className="flex items-center text-sm text-purple-200/70 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-purple-200/70">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <Button size="sm" className="w-full mt-4 bg-purple-600/50 hover:bg-purple-600 text-white">
                        Register
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Crisis Support Banner */}
            <Card className="bg-gradient-to-r from-purple-900/60 to-violet-900/60 border-purple-400/30">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/30 rounded-full">
                      <Phone className="h-6 w-6 text-purple-200" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Chronic Illness Support Line</h3>
                      <p className="text-purple-200/80">
                        988 Suicide & Crisis Lifeline - Available 24/7
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                    onClick={() => window.open('tel:988')}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call 988
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <ChronicIllnessResources />
          </TabsContent>
          
          <TabsContent value="community">
            <ChronicIllnessCommunity />
          </TabsContent>
          
          <TabsContent value="assessments">
            <ChronicIllnessAssessments />
          </TabsContent>
          
          <TabsContent value="workshops">
            <ChronicIllnessWorkshops />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChronicIllnessPortal;
