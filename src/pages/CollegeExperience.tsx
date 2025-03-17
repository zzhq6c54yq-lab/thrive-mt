import React, { useState } from "react";
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
  User, Users, Coffee, Moon, Clock, Utensils, Dumbbell 
} from "lucide-react";

const CollegeExperience: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResourceClick = (name: string, path: string) => {
    toast({
      title: `Accessing ${name}`,
      description: "Loading your resource...",
      duration: 2000
    });
    // In a real app, navigate to the specific resource
    // For now we'll just log it
    console.log(`Navigating to: ${path}`);
  };
  
  const mentalHealthResources = [
    {
      title: "Academic Stress Management",
      description: "Techniques for balancing coursework, exams, and deadlines",
      icon: BookOpen,
      path: "/college-stress-management",
      category: "academic"
    },
    {
      title: "Campus Counseling Services",
      description: "Directory of free mental health services available on campus",
      icon: MapPin,
      path: "/campus-services",
      category: "support"
    },
    {
      title: "Peer Support Network",
      description: "Connect with trained student mentors for one-on-one conversations",
      icon: Users,
      path: "/peer-support",
      category: "support"
    },
    {
      title: "Time Management Workshop",
      description: "Interactive tools to balance academics, social life, and self-care",
      icon: Calendar,
      path: "/time-management",
      category: "academic"
    },
    {
      title: "Test Anxiety Relief",
      description: "Strategies to manage anxiety and perform your best on exams",
      icon: CopyCheck,
      path: "/exam-anxiety",
      category: "academic"
    },
    {
      title: "Mindfulness for Students",
      description: "Quick meditation practices adapted for busy student schedules",
      icon: Brain,
      path: "/student-mindfulness",
      category: "wellness"
    },
    {
      title: "Healthy Sleep Habits",
      description: "Improve your sleep quality despite dorm life and late-night study sessions",
      icon: Moon,
      path: "/sleep-habits",
      category: "wellness"
    },
    {
      title: "Social Anxiety Workshop",
      description: "Navigate campus social life with confidence and ease",
      icon: User,
      path: "/social-anxiety",
      category: "social"
    },
    {
      title: "Financial Stress Relief",
      description: "Coping strategies for students dealing with financial pressure",
      icon: Lightbulb,
      path: "/financial-stress",
      category: "lifestyle"
    },
    {
      title: "Substance Use Awareness",
      description: "Education and support for making informed choices about alcohol and drugs",
      icon: Coffee,
      path: "/substance-awareness",
      category: "wellness"
    },
    {
      title: "Nutrition on a Budget",
      description: "Eating well in college with limited time and money",
      icon: Utensils,
      path: "/student-nutrition",
      category: "wellness"
    },
    {
      title: "Campus Workout Guide",
      description: "Making the most of your campus recreation facilities",
      icon: Dumbbell,
      path: "/campus-workout",
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

  // Filter resources based on search term
  const filteredResources = mentalHealthResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page title="College Mental Health Resources">
      <div className="space-y-8">
        {/* Header section with intro and search */}
        <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#D946EF]/10 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">
                Your Campus Wellness Journey Starts Here
              </h2>
              <p className="text-white mb-4">
                College life brings unique challenges to your mental health. We've gathered resources 
                specifically designed for students like you balancing academics, social life, 
                personal growth, and wellness.
              </p>
            </div>
            <div className="md:w-1/3 flex-shrink-0">
              <div className="p-4 rounded-full bg-[#8B5CF6]/20 inline-flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-[#8B5CF6]" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <Input
              type="search"
              placeholder="Search for resources, topics, or concerns..."
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="mt-2 text-sm text-white/70">
              Try searching for: stress, sleep, anxiety, exams, social, time management
            </p>
          </div>
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="services">Campus Services</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource, index) => (
                <Card 
                  key={index}
                  className="border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer hover:border-[#8B5CF6]/30"
                  onClick={() => handleResourceClick(resource.title, resource.path)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-lg bg-[#8B5CF6]/10">
                        <resource.icon className="h-5 w-5 text-[#8B5CF6]" />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white">
                        {resource.category}
                      </span>
                    </div>
                    <CardTitle className="mt-3 text-lg font-medium text-white">{resource.title}</CardTitle>
                    <CardDescription className="text-white/90">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-[#8B5CF6]/20 border-[#8B5CF6]/30 hover:text-white text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/80">No resources found matching "{searchTerm}". Try a different search term.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="workshops" className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-[#D946EF]" />
                <span>Upcoming Mental Health Workshops</span>
              </h3>
              <p className="text-white/90 mb-4">
                All workshops are free for enrolled students. Register early as spots fill quickly.
              </p>
              
              <div className="space-y-4">
                {upcomingWorkshops.map((workshop, index) => (
                  <div 
                    key={index} 
                    className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h4 className="font-medium text-[#8B5CF6]">{workshop.title}</h4>
                        <p className="text-white/90 text-sm">{workshop.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs flex items-center gap-1 text-white/90">
                            <Calendar className="h-3 w-3" /> {workshop.date}
                          </span>
                          <span className="text-xs flex items-center gap-1 text-white/90">
                            <Clock className="h-3 w-3" /> {workshop.time}
                          </span>
                          <span className="text-xs flex items-center gap-1 text-white/90">
                            <MapPin className="h-3 w-3" /> {workshop.location}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button variant="outline" className="hover:bg-[#D946EF]/20 border-[#D946EF]/30 text-white">
                          Join Workshop
                        </Button>
                        <div className="text-xs text-white/80 mt-1 text-center">
                          {typeof workshop.spots === 'number' ? `${workshop.spots} spots left` : workshop.spots}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="mt-4 w-full border-[#D946EF]/30 hover:bg-[#D946EF]/10 text-white">
                View All Workshops
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5 text-[#8B5CF6]" />
                <span>Campus Mental Health Services</span>
              </h3>
              <p className="text-white/90 mb-4">
                Services available to all enrolled students, typically covered by your student health fee.
              </p>
              
              <div className="space-y-4">
                {campusServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                  >
                    <h4 className="font-medium text-[#8B5CF6]">{service.title}</h4>
                    <p className="text-white/90 text-sm mt-1">{service.description}</p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-white/80">
                        <Clock className="h-3 w-3" /> 
                        <span>{service.hours}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80">
                        <User className="h-3 w-3" /> 
                        <span>{service.contact}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80">
                        <MapPin className="h-3 w-3" /> 
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="crisis" className="space-y-4">
            <div className="bg-[#F87171]/10 border border-[#F87171]/30 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2 text-white">Immediate Crisis Support</h3>
              <p className="mb-4 text-white/80">
                If you're experiencing a mental health emergency, please use one of these resources for immediate help:
              </p>
              
              <div className="space-y-4">
                <div className="bg-[#F87171]/20 rounded-lg p-4">
                  <h4 className="font-medium text-white">Campus Crisis Line (24/7)</h4>
                  <p className="text-2xl font-bold text-white mt-2">555-HELP (4357)</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white">National Crisis Text Line</h4>
                  <p className="text-white/80 mt-1">Text HOME to 741741 to connect with a Crisis Counselor</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white">National Suicide Prevention Lifeline</h4>
                  <p className="text-white/80 mt-1">1-800-273-8255 (Available 24/7)</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white">Emergency Services</h4>
                  <p className="text-white/80 mt-1">Call 911 or go to your nearest emergency room</p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-white/10 pt-4 text-white/70">
                <p>
                  For non-emergency support, please contact the Student Counseling Center during business hours
                  or schedule an appointment through the student portal.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick access links */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#D946EF]" />
            <span>Quick Access</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/10 h-auto py-4 flex flex-col gap-2"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Academic Support</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#D946EF]/20 hover:bg-[#D946EF]/10 h-auto py-4 flex flex-col gap-2"
            >
              <HeartHandshake className="h-5 w-5" />
              <span>Peer Counseling</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/10 h-auto py-4 flex flex-col gap-2"
            >
              <Backpack className="h-5 w-5" />
              <span>Student Resources</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#D946EF]/20 hover:bg-[#D946EF]/10 h-auto py-4 flex flex-col gap-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Self-Care Ideas</span>
            </Button>
          </div>
        </div>
        
        {/* Student testimonials */}
        <div className="mt-8 bg-gradient-to-r from-[#8B5CF6]/5 to-[#D946EF]/5 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#8B5CF6]" />
            <span>Student Stories</span>
          </h3>
          
          <div className="italic text-white/80 border-l-2 border-[#8B5CF6]/30 pl-4">
            "The mindfulness workshops helped me manage my anxiety during midterms. I went from 
            constant panic to being able to focus and perform much better on exams."
            <div className="mt-2 text-sm text-white/60">— Junior, Psychology</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CollegeExperience;
