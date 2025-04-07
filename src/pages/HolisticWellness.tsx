
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, Brain, Heart, Sunset, BadgeCheck, ArrowRight, Dumbbell, 
  Waves, HandHeart, BookOpen, Sparkles, ChevronRight, CalendarCheck, 
  PanelRight, CircleUser, Compass 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HolisticWellness: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeApproach, setActiveApproach] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const holisticApproaches = [
    {
      title: "Physical Wellbeing",
      description: "Movement, nutrition, and rest for your body",
      icon: Dumbbell,
      practices: [
        "Regular exercise tailored to your abilities",
        "Balanced nutrition with cultural considerations",
        "Adequate sleep and rest patterns",
        "Regular health check-ups and preventative care"
      ],
      resourcePath: "/mental-wellness-tools",
      color: "from-emerald-50 to-teal-50 border-emerald-200"
    },
    {
      title: "Mental Health",
      description: "Techniques to support your psychological wellbeing",
      icon: Brain,
      practices: [
        "Cognitive behavioral techniques",
        "Mindfulness and meditation practices",
        "Stress management strategies",
        "Setting healthy boundaries"
      ],
      resourcePath: "/mental-health-games",
      color: "from-purple-50 to-violet-50 border-purple-200"
    },
    {
      title: "Emotional Balance",
      description: "Understanding and processing emotions effectively",
      icon: Heart,
      practices: [
        "Emotional awareness exercises",
        "Journaling for emotional processing",
        "Healthy expression of feelings",
        "Building emotional resilience"
      ],
      resourcePath: "/personalized-content",
      color: "from-red-50 to-rose-50 border-red-200"
    },
    {
      title: "Social Connection",
      description: "Nurturing meaningful relationships and community",
      icon: HandHeart,
      practices: [
        "Building supportive relationships",
        "Community engagement and belonging",
        "Cultural connection and identity",
        "Healthy communication skills"
      ],
      resourcePath: "/community-support",
      color: "from-amber-50 to-orange-50 border-amber-200"
    },
    {
      title: "Spiritual Growth",
      description: "Finding meaning, purpose and connection",
      icon: Waves,
      practices: [
        "Exploring personal values and beliefs",
        "Connection with nature and the world",
        "Mindfulness and meditative practices",
        "Finding purpose and meaning"
      ],
      resourcePath: "/mindfulness",
      color: "from-blue-50 to-sky-50 border-blue-200"
    },
    {
      title: "Environmental Wellness",
      description: "Creating supportive spaces for wellbeing",
      icon: Leaf,
      practices: [
        "Creating healing home environments",
        "Reducing environmental stressors",
        "Nature connection and eco-therapy",
        "Sustainable living practices"
      ],
      resourcePath: "/resource-library",
      color: "from-green-50 to-lime-50 border-green-200"
    }
  ];

  const weeklySchedule = [
    {
      day: "Monday",
      focus: "Physical",
      practice: "30-min gentle yoga",
      icon: Dumbbell
    },
    {
      day: "Tuesday",
      focus: "Mental",
      practice: "15-min guided meditation",
      icon: Brain
    },
    {
      day: "Wednesday",
      focus: "Social",
      practice: "Connect with a friend",
      icon: HandHeart
    },
    {
      day: "Thursday",
      focus: "Emotional",
      practice: "Journaling exercise",
      icon: Heart
    },
    {
      day: "Friday",
      focus: "Spiritual",
      practice: "Nature walk reflection",
      icon: Waves
    },
    {
      day: "Saturday",
      focus: "Environmental",
      practice: "Create a calm space",
      icon: Leaf
    },
    {
      day: "Sunday",
      focus: "Integration",
      practice: "Weekly reflection",
      icon: Sunset
    }
  ];

  const featuredResources = [
    {
      title: "Mindful Morning Routine",
      type: "Guide",
      duration: "10 min read",
      path: "/mindfulness"
    },
    {
      title: "Balance Your Energy",
      type: "Audio",
      duration: "15 min",
      path: "/mental-wellness-tools"
    },
    {
      title: "Emotional Release Technique",
      type: "Video",
      duration: "8 min",
      path: "/mental-wellness-tools"
    }
  ];

  const upcomingWorkshops = [
    {
      title: "The Mind-Body Connection",
      date: "April 15, 2025",
      path: "/workshops/mind-body-connection"
    },
    {
      title: "Holistic Nutrition Basics",
      date: "April 22, 2025",
      path: "/workshops/holistic-nutrition"
    }
  ];

  const handlePracticeClick = (practice: string, approachTitle: string) => {
    setActiveApproach(approachTitle);
    toast({
      title: `${approachTitle} Practice`,
      description: `You've selected: ${practice}`,
      duration: 2000,
    });
  };

  const handleExploreClick = (approachTitle: string, resourcePath: string) => {
    toast({
      title: "Exploring Practices",
      description: `Loading ${approachTitle} resources...`,
      duration: 1500,
    });
    
    // Navigate to the associated resource page
    navigate(resourcePath);
  };

  const handleAssessmentStart = () => {
    toast({
      title: "Assessment Starting",
      description: "Preparing your personalized wellness assessment...",
      duration: 2000,
    });
    
    setTimeout(() => {
      toast({
        title: "Assessment Ready",
        description: "Your holistic wellness profile is being prepared.",
        duration: 3000,
      });
    }, 2500);
  };

  const navigateToMainMenu = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#9b87f5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="fixed top-4 left-4 z-50">
        <HomeButton />
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={navigateToMainMenu}
        >
          <span>Main Menu</span>
        </Button>
      </div>
      
      <div className="container mx-auto max-w-6xl pt-20 pb-16 px-4 relative z-10">
        {/* Header Section with Background and Title */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/20 to-[#B87333]/20 backdrop-blur-sm"></div>
          <div className="bg-white/40 backdrop-blur-md p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="bg-white/80 p-5 rounded-full backdrop-blur-sm shadow-lg">
                <Leaf className="h-14 w-14 text-[#B87333]" />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#B87333] to-[#9b87f5] bg-clip-text text-transparent">
                  Holistic Wellness
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl">
                  Embrace a comprehensive approach to wellbeing that nurtures your mind, body, and spirit
                  through culturally responsive practices and personalized strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="mb-8">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 h-auto p-1 bg-white/70 backdrop-blur-sm shadow-sm">
              <TabsTrigger 
                value="overview" 
                className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#9b87f5] data-[state=active]:text-white"
              >
                <Compass className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="approaches" 
                className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#9b87f5] data-[state=active]:text-white"
              >
                <PanelRight className="h-4 w-4 mr-2" />
                Approaches
              </TabsTrigger>
              <TabsTrigger 
                value="personal" 
                className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#9b87f5] data-[state=active]:text-white"
              >
                <CircleUser className="h-4 w-4 mr-2" />
                Personal Plan
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview" className="focus:outline-none mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* What is Holistic Wellness */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full border-[#B87333]/30 hover:border-[#B87333]/60 transition-colors shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
                    <div className="h-2 bg-gradient-to-r from-[#B87333] to-[#9b87f5]"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Sparkles className="h-5 w-5 text-[#B87333]" />
                        What is Holistic Wellness?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Holistic wellness recognizes that your physical, mental, emotional, social, and spiritual 
                        dimensions are interconnected. True wellbeing comes from nurturing all these aspects together, 
                        respecting your unique cultural background and personal needs.
                      </p>
                      
                      <div className="bg-[#B87333]/5 p-4 rounded-lg border border-[#B87333]/10 mb-4">
                        <h4 className="font-medium text-[#B87333] mb-2">Benefits of a Holistic Approach:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-[#B87333] flex-shrink-0" />
                            <span>Addresses root causes, not just symptoms</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-[#B87333] flex-shrink-0" />
                            <span>Creates lasting, sustainable changes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-[#B87333] flex-shrink-0" />
                            <span>Recognizes your unique needs and background</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button 
                        onClick={() => setActiveTab("approaches")}
                        className="w-full bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:opacity-90 text-white"
                      >
                        Explore Wellness Dimensions
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Featured Resources */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full border-[#9b87f5]/30 hover:border-[#9b87f5]/60 transition-colors shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
                    <div className="h-2 bg-gradient-to-r from-[#9b87f5] to-[#B87333]"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <BookOpen className="h-5 w-5 text-[#9b87f5]" />
                        Featured Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {featuredResources.map((resource, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start p-3 rounded-lg hover:bg-[#9b87f5]/5 transition-colors cursor-pointer"
                            onClick={() => navigate(resource.path)}
                          >
                            <div className="p-2 rounded-full bg-[#9b87f5]/10 mr-3">
                              {resource.type === "Guide" ? (
                                <BookOpen className="h-5 w-5 text-[#9b87f5]" />
                              ) : resource.type === "Audio" ? (
                                <Waves className="h-5 w-5 text-[#9b87f5]" />
                              ) : (
                                <Heart className="h-5 w-5 text-[#9b87f5]" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{resource.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="bg-[#9b87f5]/10 px-2 py-0.5 rounded-full text-[#9b87f5]">
                                  {resource.type}
                                </span>
                                <span>{resource.duration}</span>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-gray-800 mb-2">Upcoming Workshops</h4>
                        {upcomingWorkshops.map((workshop, idx) => (
                          <div 
                            key={idx} 
                            className="flex justify-between items-center p-2 hover:bg-[#9b87f5]/5 rounded-lg transition-colors cursor-pointer"
                            onClick={() => navigate(workshop.path)}
                          >
                            <div className="flex items-center gap-2">
                              <CalendarCheck className="h-4 w-4 text-[#9b87f5]" />
                              <span>{workshop.title}</span>
                            </div>
                            <span className="text-sm text-gray-600">{workshop.date}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => navigate("/workshops")}
                        variant="outline"
                        className="w-full mt-4 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                      >
                        Browse All Resources
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              {/* Weekly Schedule Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-10"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-[#B87333]" />
                    <span>Weekly Wellness Schedule</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                    {weeklySchedule.map((day, idx) => {
                      const Icon = day.icon;
                      return (
                        <div 
                          key={idx}
                          className="p-4 rounded-lg border border-gray-200 hover:border-[#B87333] transition-colors bg-white/70 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-800">{day.day}</h4>
                            <div className="p-1 rounded-full bg-[#B87333]/10">
                              <Icon className="h-4 w-4 text-[#B87333]" />
                            </div>
                          </div>
                          <div>
                            <span className="block text-sm text-[#9b87f5] font-medium">{day.focus}</span>
                            <p className="text-sm text-gray-600">{day.practice}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => setActiveTab("personal")}
                      className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:opacity-90 text-white px-6"
                    >
                      Create Your Personalized Schedule
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              {/* Assessment Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a20] via-[#252535] to-[#2d2d3d] opacity-90"></div>
                  <div className="relative z-10 p-8 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Discover Your Holistic Wellness Profile</h3>
                        <p className="text-white/80 max-w-xl mb-4">
                          Take our comprehensive assessment to receive personalized recommendations 
                          for your holistic wellness journey, tailored to your cultural background, 
                          preferences, and current wellbeing status.
                        </p>
                        <Button 
                          className="bg-white text-[#1a1a20] hover:bg-white/90"
                          onClick={handleAssessmentStart}
                        >
                          Start Assessment
                        </Button>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                        <div className="flex items-center justify-center p-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white animate-spin"></div>
                            <Sparkles className="h-10 w-10 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Approaches Tab Content */}
            <TabsContent value="approaches" className="focus:outline-none mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {holisticApproaches.map((approach, index) => {
                  const Icon = approach.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-[#B87333]/20 hover:border-[#B87333] bg-gradient-to-br ${approach.color} ${activeApproach === approach.title ? 'ring-2 ring-[#B87333]' : ''}`}
                      >
                        <CardHeader className="pb-2">
                          <div className="rounded-full bg-white/60 backdrop-blur-sm w-14 h-14 flex items-center justify-center mb-4 shadow-sm">
                            <Icon className="h-7 w-7 text-[#B87333]" />
                          </div>
                          <CardTitle className="text-2xl">
                            {approach.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4 text-gray-700">{approach.description}</p>
                          <ul className="space-y-3 mb-4">
                            {approach.practices.map((practice, practiceIndex) => (
                              <li 
                                key={practiceIndex} 
                                className="flex items-start gap-2 cursor-pointer hover:bg-white/60 p-2 rounded-md transition-colors"
                                onClick={() => handlePracticeClick(practice, approach.title)}
                              >
                                <BadgeCheck className="h-5 w-5 text-[#B87333] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{practice}</span>
                              </li>
                            ))}
                          </ul>
                          <Button 
                            className="w-full bg-white hover:bg-gray-50 text-[#B87333] border border-[#B87333]/20 shadow-sm group"
                            onClick={() => handleExploreClick(approach.title, approach.resourcePath)}
                          >
                            <span>Explore {approach.title}</span>
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
            
            {/* Personal Plan Tab Content */}
            <TabsContent value="personal" className="focus:outline-none mt-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <CircleUser className="h-6 w-6 text-[#9b87f5]" />
                      <span>Your Holistic Wellness Journey</span>
                    </h3>
                    <p className="text-gray-700 max-w-xl mb-4">
                      Create a personalized plan that integrates practices from various wellness dimensions,
                      aligned with your cultural values and specific needs. Begin with small steps toward
                      comprehensive wellbeing.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:opacity-90 text-white"
                      onClick={handleAssessmentStart}
                    >
                      Start Personalized Assessment
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Journey Steps */}
              <div className="relative mb-16">
                <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B87333] to-[#9b87f5] ml-[-1px] hidden md:block"></div>
                
                {[
                  {
                    title: "Awareness & Assessment",
                    description: "Begin with self-reflection and comprehensive assessment of your current state of wellbeing across all dimensions.",
                    icon: Brain
                  },
                  {
                    title: "Personalized Planning",
                    description: "Develop a customized plan that integrates practices from various wellness dimensions, aligned with your cultural values.",
                    icon: Compass
                  },
                  {
                    title: "Implementation & Practice",
                    description: "Gradually incorporate holistic practices into your daily routine, focusing on sustainable changes.",
                    icon: Sparkles
                  },
                  {
                    title: "Community & Support",
                    description: "Connect with others on similar journeys and access resources to support your holistic wellness goals.",
                    icon: HandHeart
                  },
                  {
                    title: "Growth & Evolution",
                    description: "Continue to refine your approach as you learn what works best for your unique needs and circumstances.",
                    icon: Sunset
                  }
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className={`relative flex md:items-center mb-12 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      } flex-col`}
                    >
                      <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} mb-4 md:mb-0`}>
                        <Card className="bg-white/90 backdrop-blur-sm border-[#B87333]/20 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3 justify-start md:justify-end">
                              <h3 className="text-xl font-bold text-[#B87333]">
                                {step.title}
                              </h3>
                              {index % 2 === 0 && (
                                <div className="p-2 rounded-full bg-[#B87333]/10">
                                  <Icon className="h-5 w-5 text-[#B87333]" />
                                </div>
                              )}
                              {index % 2 !== 0 && (
                                <div className="md:hidden p-2 rounded-full bg-[#B87333]/10">
                                  <Icon className="h-5 w-5 text-[#B87333]" />
                                </div>
                              )}
                            </div>
                            <p className={`text-gray-700 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="relative z-10 hidden md:block">
                        <div className={`
                          absolute top-1/2 transform -translate-y-1/2
                          ${index % 2 === 0 ? "left-[-24px]" : "right-[-24px]"}
                        `}>
                          <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B87333] to-[#9b87f5] flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 z-10 block md:hidden">
                        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B87333] to-[#9b87f5] flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/2 hidden md:block">
                        {index % 2 !== 0 && (
                          <div className="pl-12 flex items-center">
                            <div className="p-2 rounded-full bg-[#B87333]/10">
                              <Icon className="h-5 w-5 text-[#B87333]" />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Get Started */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-center"
              >
                <Button 
                  className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:opacity-90 text-white px-8 py-6 h-auto text-lg shadow-lg"
                  onClick={handleAssessmentStart}
                >
                  Begin Your Holistic Wellness Journey
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HolisticWellness;
