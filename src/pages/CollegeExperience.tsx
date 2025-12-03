
import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Backpack, BookOpen, Brain, Calendar, Compass, CopyCheck, GraduationCap, 
  HeartHandshake, Lightbulb, MapPin, PartyPopper, Sparkles, 
  User, Users, Coffee, Moon, Clock, Utensils, Dumbbell, 
  FileText, CalendarDays, Building, AlertTriangle,
  ArrowRight, Play, Plus
} from "lucide-react";

const CollegeExperience: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("resources");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleResourceClick = (name: string, path: string) => {
    toast({
      title: `Accessing ${name}`,
      description: "Loading your resource...",
      duration: 2000
    });
    
    // Check if the path exists in the routes, otherwise navigate to mental-wellness-tools as fallback
    // In a real app, you'd have all these routes properly defined
    if (path.startsWith("/")) {
      navigate(path);
    } else {
      navigate(`/${path}`);
    }
  };
  
  const mentalHealthResources = [
    {
      title: "Academic Stress Management",
      description: "Techniques for balancing coursework, exams, and deadlines",
      icon: BookOpen,
      path: "/app/mental-wellness-tools",
      category: "academic"
    },
    {
      title: "Campus Counseling Services",
      description: "Directory of free mental health services available on campus",
      icon: MapPin,
      path: "/app/resource-library",
      category: "support"
    },
    {
      title: "Peer Support Network",
      description: "Connect with trained student mentors for one-on-one conversations",
      icon: Users,
      path: "/app/community-support",
      category: "support"
    },
    {
      title: "Time Management Workshop",
      description: "Interactive tools to balance academics, social life, and self-care",
      icon: Calendar,
      path: "/app/workshops",
      category: "academic"
    },
    {
      title: "Test Anxiety Relief",
      description: "Strategies to manage anxiety and perform your best on exams",
      icon: CopyCheck,
      path: "/app/mental-wellness-tools",
      category: "academic"
    },
    {
      title: "Mindfulness for Students",
      description: "Quick meditation practices adapted for busy student schedules",
      icon: Brain,
      path: "/app/mindfulness",
      category: "wellness"
    },
    {
      title: "Healthy Sleep Habits",
      description: "Improve your sleep quality despite dorm life and late-night study sessions",
      icon: Moon,
      path: "/app/mindfulness",
      category: "wellness"
    },
    {
      title: "Social Anxiety Workshop",
      description: "Navigate campus social life with confidence and ease",
      icon: User,
      path: "/app/workshops",
      category: "social"
    },
    {
      title: "Financial Stress Relief",
      description: "Coping strategies for students dealing with financial pressure",
      icon: Lightbulb,
      path: "/app/financial-assistance",
      category: "lifestyle"
    },
    {
      title: "Substance Use Awareness",
      description: "Education and support for making informed choices about alcohol and drugs",
      icon: Coffee,
      path: "/app/resource-library",
      category: "wellness"
    },
    {
      title: "Nutrition on a Budget",
      description: "Eating well in college with limited time and money",
      icon: Utensils,
      path: "/app/lifestyle-integration",
      category: "wellness"
    },
    {
      title: "Campus Workout Guide",
      description: "Making the most of your campus recreation facilities",
      icon: Dumbbell,
      path: "/app/holistic-wellness",
      category: "wellness"
    }
  ];

  const upcomingWorkshops = [
    {
      title: "Exam Week Survival",
      date: "Oct 12, 2023",
      time: "3:00 PM - 4:30 PM",
      location: "Student Union Room 302",
      spots: 15,
      description: "Learn effective strategies to manage stress and maintain focus during final exams."
    },
    {
      title: "Mindfulness Meditation Workshop",
      date: "Oct 15, 2023",
      time: "5:00 PM - 6:00 PM",
      location: "Campus Recreation Center",
      spots: 20,
      description: "A beginner-friendly introduction to meditation practices specifically designed for busy students."
    },
    {
      title: "Creating Your College-Life Balance",
      date: "Oct 18, 2023",
      time: "4:00 PM - 5:30 PM",
      location: "Virtual (Zoom)",
      spots: "Unlimited",
      description: "Interactive workshop on creating sustainable routines that support your academic and personal well-being."
    }
  ];

  const campusServices = [
    {
      title: "Student Counseling Center",
      description: "Free confidential counseling for all enrolled students",
      hours: "Mon-Fri: 9AM-5PM",
      contact: "counseling@university.edu",
      location: "Health Services Building, 2nd Floor"
    },
    {
      title: "Crisis Support Line",
      description: "24/7 phone support for urgent mental health concerns",
      hours: "24/7",
      contact: "555-HELP (4357)",
      location: "N/A (Phone Service)"
    },
    {
      title: "Wellness Coaching",
      description: "One-on-one sessions to develop personalized wellness strategies",
      hours: "Mon-Thu: 10AM-7PM, Fri: 10AM-5PM",
      contact: "wellness@university.edu",
      location: "Student Union, Room 203"
    }
  ];

  const filteredResources = mentalHealthResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-[#8B5CF6] animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl font-medium">Loading college resources...</p>
        </div>
      </div>
    );
  }

  return (
    <Page title="College Mental Health Resources" fullWidth={true}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#6E59A5]/30 to-[#D946EF]/30 p-5 rounded-xl">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Your Campus Wellness Journey Starts Here
              </h2>
              <p className="text-white font-medium mb-4">
                College life brings unique challenges to your mental health. We've gathered resources 
                specifically designed for students like you balancing academics, social life, 
                personal growth, and wellness.
              </p>
              <Button 
                className="bg-[#D946EF] hover:bg-[#D946EF]/80 text-white font-medium shadow-lg group transition-all duration-300 hover:translate-x-1"
                onClick={() => navigate("/app/mindfulness")}
              >
                Start Your Journey <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
              </Button>
            </div>
            <div className="md:w-1/3 flex-shrink-0">
              <div className="p-4 rounded-full bg-[#8B5CF6]/40 inline-flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <Input
              type="search"
              placeholder="Search for resources, topics, or concerns..."
              className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="mt-2 text-sm font-medium text-white">
              Try searching for: stress, sleep, anxiety, exams, social, time management
            </p>
          </div>
        </div>

        {/* Navigation Tabs Section - Redesigned to prevent overlap */}
        <div className="mb-4">
          <div className="bg-[#1A1F2C]/80 p-4 rounded-xl border border-[#8B5CF6]/30">
            <h3 className="text-white font-medium mb-4 text-center text-xl">Navigate College Wellness Resources</h3>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="resources" 
                  className="bg-[#1A1F2C] text-white border border-[#8B5CF6]/30 py-3 px-2 flex flex-col items-center gap-2 data-[state=active]:bg-[#8B5CF6] data-[state=active]:border-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-all duration-200 h-auto"
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-medium text-sm">Resources</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="workshops" 
                  className="bg-[#1A1F2C] text-white border border-[#D946EF]/30 py-3 px-2 flex flex-col items-center gap-2 data-[state=active]:bg-[#D946EF] data-[state=active]:border-[#D946EF] hover:bg-[#D946EF]/20 transition-all duration-200 h-auto"
                >
                  <CalendarDays className="h-5 w-5" />
                  <span className="font-medium text-sm">Workshops</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="bg-[#1A1F2C] text-white border border-[#8B5CF6]/30 py-3 px-2 flex flex-col items-center gap-2 data-[state=active]:bg-[#8B5CF6] data-[state=active]:border-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-all duration-200 h-auto"
                >
                  <Building className="h-5 w-5" />
                  <span className="font-medium text-sm">Campus Services</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="crisis" 
                  className="bg-[#1A1F2C] text-white border border-[#F87171]/50 py-3 px-2 flex flex-col items-center gap-2 data-[state=active]:bg-[#F87171] data-[state=active]:border-[#F87171] hover:bg-[#F87171]/20 transition-all duration-200 h-auto"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium text-sm">Crisis Support</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                {activeTab === "resources" && (
                  <TabsContent value="resources" className="mt-0">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#8B5CF6]" />
                        <span>Mental Health Resources</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredResources.map((resource, index) => (
                          <Card 
                            key={index}
                            className="border-[#8B5CF6]/30 bg-[#1A1F2C]/50 hover:bg-[#1A1F2C]/70 transition-colors cursor-pointer hover:border-[#8B5CF6]/60"
                            onClick={() => handleResourceClick(resource.title, resource.path)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="p-2 rounded-lg bg-[#8B5CF6]/30">
                                  <resource.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/20 text-white font-medium">
                                  {resource.category}
                                </span>
                              </div>
                              <CardTitle className="mt-3 text-lg font-medium text-white">{resource.title}</CardTitle>
                              <CardDescription className="text-[#D6BCFA]">{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button 
                                variant="outline" 
                                className="w-full bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/40 border-[#8B5CF6]/50 hover:text-white text-white flex items-center justify-center gap-2 group"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent card click from firing
                                  handleResourceClick(resource.title, resource.path);
                                }}
                              >
                                <span>Explore Resource</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {filteredResources.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-white font-medium">No resources found matching "{searchTerm}". Try a different search term.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                )}
                
                {activeTab === "workshops" && (
                  <TabsContent value="workshops" className="mt-0">
                    <div className="bg-[#1A1F2C]/50 border border-[#8B5CF6]/30 rounded-lg p-6 mb-4 w-full">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
                        <Calendar className="h-5 w-5 text-[#D946EF]" />
                        <span>Upcoming Mental Health Workshops</span>
                      </h3>
                      <p className="text-[#D6BCFA] mb-6 font-medium">
                        All workshops are free for enrolled students. Register early as spots fill quickly.
                      </p>
                      
                      <div className="space-y-6 w-full">
                        {upcomingWorkshops.map((workshop, index) => (
                          <div 
                            key={index} 
                            className="border border-[#8B5CF6]/30 rounded-lg p-4 hover:bg-[#1A1F2C]/70 transition-colors w-full"
                          >
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                              <div>
                                <h4 className="font-medium text-[#D946EF]">{workshop.title}</h4>
                                <p className="text-white text-sm">{workshop.description}</p>
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                  <span className="text-xs flex items-center gap-1 text-[#D6BCFA]">
                                    <Calendar className="h-3 w-3" /> {workshop.date}
                                  </span>
                                  <span className="text-xs flex items-center gap-1 text-[#D6BCFA]">
                                    <Clock className="h-3 w-3" /> {workshop.time}
                                  </span>
                                  <span className="text-xs flex items-center gap-1 text-[#D6BCFA]">
                                    <MapPin className="h-3 w-3" /> {workshop.location}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0">
                <Button 
                  className="bg-[#D946EF] hover:bg-[#D946EF]/80 text-white font-medium shadow-md transition-all duration-300 group"
                  onClick={() => navigate("/app/workshops")}
                >
                  <span>Join Workshop</span>
                  <Play className="ml-1 h-4 w-4 group-hover:scale-110 transition-transform" />
                                </Button>
                                <div className="text-xs text-[#D6BCFA] mt-1 text-center">
                                  {typeof workshop.spots === 'number' ? `${workshop.spots} spots left` : workshop.spots}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="mt-6 w-full bg-gradient-to-r from-[#D946EF]/80 to-[#8B5CF6]/80 hover:from-[#D946EF] hover:to-[#8B5CF6] text-white font-medium shadow-md transition-all duration-300 border-none"
                        onClick={() => navigate("/app/workshops")}
                      >
                        <span>View All Workshops</span>
                        <CalendarDays className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                )}
                
                {activeTab === "services" && (
                  <TabsContent value="services" className="mt-0">
                    <div className="bg-[#1A1F2C]/50 border border-[#8B5CF6]/30 rounded-lg p-6 w-full">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
                        <MapPin className="h-5 w-5 text-[#8B5CF6]" />
                        <span>Campus Mental Health Services</span>
                      </h3>
                      <p className="text-[#D6BCFA] mb-6 font-medium">
                        Services available to all enrolled students, typically covered by your student health fee.
                      </p>
                      
                      <div className="space-y-6 w-full">
                        {campusServices.map((service, index) => (
                          <div 
                            key={index} 
                            className="border border-[#8B5CF6]/30 rounded-lg p-4 hover:bg-[#1A1F2C]/70 transition-colors w-full"
                          >
                            <h4 className="font-medium text-[#8B5CF6]">{service.title}</h4>
                            <p className="text-white text-sm mt-1">{service.description}</p>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div className="flex items-center gap-1 text-[#D6BCFA]">
                                <Clock className="h-3 w-3" /> 
                                <span>{service.hours}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#D6BCFA]">
                                <User className="h-3 w-3" /> 
                                <span>{service.contact}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#D6BCFA]">
                                <MapPin className="h-3 w-3" /> 
                                <span>{service.location}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Button 
                                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white shadow-md transition-all duration-300 group"
                                onClick={() => navigate("/contact")}
                              >
                                <span>Connect Now</span>
                                <Plus className="ml-1 h-4 w-4 group-hover:rotate-90 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="mt-6 w-full bg-gradient-to-r from-[#8B5CF6]/80 to-[#6E59A5]/80 hover:from-[#8B5CF6] hover:to-[#6E59A5] text-white font-medium shadow-md transition-all duration-300 border-none"
                        onClick={() => navigate("/resource-library")}
                      >
                        <span>View All Campus Services</span>
                        <Building className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                )}
                
                {activeTab === "crisis" && (
                  <TabsContent value="crisis" className="mt-0">
                    <div className="bg-[#F87171]/20 border border-[#F87171]/40 rounded-lg p-6 w-full">
                      <h3 className="text-xl font-medium mb-4 text-white">Immediate Crisis Support</h3>
                      <p className="mb-6 text-white font-medium">
                        If you're experiencing a mental health emergency, please use one of these resources for immediate help:
                      </p>
                      
                      <div className="space-y-6 w-full">
                        <div className="bg-[#F87171]/30 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">Campus Crisis Line (24/7)</h4>
                          <p className="text-2xl font-bold text-white mt-2">555-HELP (4357)</p>
                          
                          <Button 
                            className="mt-3 bg-white text-[#F87171] hover:bg-white/90 font-medium shadow-md transition-all duration-300 group border-none"
                            onClick={() => navigate("/crisis-support")}
                          >
                            <span>Call Now</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="bg-[#1A1F2C]/60 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">National Crisis Text Line</h4>
                          <p className="text-white mt-1">Text HOME to 741741 to connect with a Crisis Counselor</p>
                          
                          <Button 
                            className="mt-3 bg-[#F87171]/80 hover:bg-[#F87171] text-white font-medium shadow-md transition-all duration-300 group border-none"
                            onClick={() => navigate("/crisis-support")}
                          >
                            <span>Text Now</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="bg-[#1A1F2C]/60 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">National Suicide Prevention Lifeline</h4>
                          <p className="text-white mt-1">1-800-273-8255 (Available 24/7)</p>
                          
                          <Button 
                            className="mt-3 bg-[#F87171]/80 hover:bg-[#F87171] text-white font-medium shadow-md transition-all duration-300 group border-none"
                            onClick={() => navigate("/crisis-support")}
                          >
                            <span>Call Lifeline</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        
                        <div className="bg-[#1A1F2C]/60 rounded-lg p-4 w-full">
                          <h4 className="font-medium text-white">Emergency Services</h4>
                          <p className="text-white mt-1">Call 911 or go to your nearest emergency room</p>
                          
                          <Button 
                            className="mt-3 bg-[#F87171]/80 hover:bg-[#F87171] text-white font-medium shadow-md transition-all duration-300 group border-none"
                            onClick={() => navigate("/crisis-support")}
                          >
                            <span>Emergency Services</span>
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-white/20 pt-4 text-white w-full">
                        <p className="font-medium">
                          For non-emergency support, please contact the Student Counseling Center during business hours
                          or schedule an appointment through the student portal.
                        </p>
                        
                        <Button 
                          className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white font-medium shadow-md transition-all duration-300 border border-white/30"
                          onClick={() => navigate("/scheduling")}
                        >
                          <span>Schedule Counseling Appointment</span>
                          <Calendar className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
            <Compass className="h-5 w-5 text-[#D946EF]" />
            <span>Quick Access</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="border-[#8B5CF6]/40 bg-[#1A1F2C]/50 hover:bg-[#8B5CF6]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/app/mental-wellness-tools")}
            >
              <GraduationCap className="h-5 w-5" />
              <span>Academic Support</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#8B5CF6]" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#D946EF]/40 bg-[#1A1F2C]/50 hover:bg-[#D946EF]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/app/community-support")}
            >
              <HeartHandshake className="h-5 w-5" />
              <span>Peer Counseling</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#D946EF]" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#8B5CF6]/40 bg-[#1A1F2C]/50 hover:bg-[#8B5CF6]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/resource-library")}
            >
              <Backpack className="h-5 w-5" />
              <span>Student Resources</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#8B5CF6]" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#D946EF]/40 bg-[#1A1F2C]/50 hover:bg-[#D946EF]/30 h-auto py-4 flex flex-col gap-2 text-white transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/self-help-resources")}
            >
              <Sparkles className="h-5 w-5" />
              <span>Self-Care Ideas</span>
              <ArrowRight className="h-4 w-4 mt-1 text-[#D946EF]" />
            </Button>
          </div>
        </div>
        
        {/* Student Stories Section */}
        <div className="mt-6 bg-gradient-to-r from-[#6E59A5]/20 to-[#D946EF]/20 p-5 rounded-xl">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-[#8B5CF6]" />
            <span>Student Stories</span>
          </h3>
          
          <div className="italic text-[#E0E0E0] font-medium bg-black/40 p-4 rounded-lg border-l-2 border-[#8B5CF6]/50 pl-4">
            "The mindfulness workshops helped me manage my anxiety during midterms. I went from 
            constant panic to being able to focus and perform much better on exams."
            <div className="mt-2 text-sm text-[#D0D0D0] font-semibold">— Junior, Psychology</div>
          </div>
          
          <Button 
            className="mt-5 bg-[#8B5CF6]/30 hover:bg-[#8B5CF6]/50 text-white font-medium border border-[#8B5CF6]/50 transition-all duration-300 group"
            onClick={() => navigate("/community-support")}
          >
            <span>Share Your Story</span>
            <Plus className="ml-1 h-4 w-4 group-hover:rotate-90 transition-transform" />
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default CollegeExperience;
