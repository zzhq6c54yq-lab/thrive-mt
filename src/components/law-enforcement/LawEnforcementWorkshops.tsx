
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Calendar, Clock, BookOpen, Video, MessageSquare, Heart } from "lucide-react";
import useFeatureActions from "@/hooks/useFeatureActions";

const LawEnforcementWorkshops = () => {
  const { handleActionClick } = useFeatureActions();
  const [filter, setFilter] = useState<string>("all");
  
  const workshops = [
    {
      id: "w1",
      title: "Stress Management for Law Enforcement",
      description: "Learn effective techniques for managing the unique stressors of law enforcement work",
      icon: Shield,
      date: "May 10, 2025",
      time: "1:00 PM - 3:00 PM EST",
      instructor: "Dr. Sarah Johnson",
      capacity: 30,
      enrolled: 18,
      category: "wellness"
    },
    {
      id: "w2",
      title: "Critical Incident Debriefing",
      description: "How to process and recover from critical incidents with psychological first aid techniques",
      icon: Shield,
      date: "May 15, 2025",
      time: "10:00 AM - 12:00 PM EST",
      instructor: "Capt. Michael Roberts (Ret.)",
      capacity: 25,
      enrolled: 22,
      category: "support"
    },
    {
      id: "w3",
      title: "Family Resilience for Law Enforcement",
      description: "Building stronger family connections despite the challenges of police work",
      icon: Heart,
      date: "May 22, 2025",
      time: "6:30 PM - 8:30 PM EST",
      instructor: "Dr. Lisa Martinez",
      capacity: 35,
      enrolled: 14,
      category: "family"
    },
    {
      id: "w4",
      title: "Sleep Optimization for Shift Workers",
      description: "Strategies to improve sleep quality for those working night shifts and irregular hours",
      icon: Shield,
      date: "June 5, 2025",
      time: "2:00 PM - 4:00 PM EST",
      instructor: "Dr. James Williams",
      capacity: 30,
      enrolled: 12,
      category: "wellness"
    },
    {
      id: "w5",
      title: "Peer Support Training",
      description: "Learn how to effectively support fellow officers through difficult times",
      icon: Users,
      date: "June 12, 2025",
      time: "9:00 AM - 4:00 PM EST",
      instructor: "Sgt. David Thompson",
      capacity: 20,
      enrolled: 19,
      category: "support"
    },
    {
      id: "w6",
      title: "Mindfulness for First Responders",
      description: "Using mindfulness techniques to improve focus, decision making, and stress management",
      icon: Shield,
      date: "June 18, 2025",
      time: "1:00 PM - 3:00 PM EST",
      instructor: "Dr. Emma Chen",
      capacity: 30,
      enrolled: 8,
      category: "wellness"
    }
  ];

  const filteredWorkshops = filter === "all" 
    ? workshops 
    : workshops.filter(workshop => workshop.category === filter);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Law Enforcement Workshops</h2>
        <p className="text-blue-200/80 mb-6 max-w-3xl">
          Access specialized workshops and training designed for law enforcement professionals to support your mental wellness.
        </p>
      </div>
      
      {/* Featured Workshop */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-blue-700/30 border-blue-700/30 overflow-hidden">
        <div className="relative">
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-sm">
            Featured Workshop
          </div>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1 h-full">
                <div className="bg-blue-800/50 h-full flex items-center justify-center p-8">
                  <Shield className="h-24 w-24 text-white opacity-75" />
                </div>
              </div>
              <div className="md:col-span-2 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Law Enforcement Resilience Training</h3>
                <div className="flex items-center text-blue-200/80 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">June 25-26, 2025</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>9:00 AM - 4:00 PM EST (Both Days)</span>
                </div>
                <p className="text-white/80 mb-6">
                  This comprehensive two-day training program is designed to build resilience in law enforcement professionals. 
                  Learn evidence-based techniques to manage stress, prevent burnout, and maintain optimal performance 
                  under pressure. Taught by experienced officers and mental health professionals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-white text-blue-900 hover:bg-blue-50"
                    onClick={() => handleActionClick({
                      type: 'workshop',
                      id: 'resilience-training',
                      title: 'Law Enforcement Resilience Training'
                    })}
                  >
                    Register Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => handleActionClick({
                      type: 'other',
                      path: '/law-enforcement-workshops/resilience-training',
                      title: 'Learn More About Resilience Training'
                    })}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      
      {/* Workshop Filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"}
          className={filter === "all" ? "bg-blue-700" : "border-blue-700/50 text-blue-400"}
          onClick={() => setFilter("all")}
        >
          All Workshops
        </Button>
        <Button 
          variant={filter === "wellness" ? "default" : "outline"}
          className={filter === "wellness" ? "bg-blue-700" : "border-blue-700/50 text-blue-400"}
          onClick={() => setFilter("wellness")}
        >
          Wellness
        </Button>
        <Button 
          variant={filter === "support" ? "default" : "outline"}
          className={filter === "support" ? "bg-blue-700" : "border-blue-700/50 text-blue-400"}
          onClick={() => setFilter("support")}
        >
          Officer Support
        </Button>
        <Button 
          variant={filter === "family" ? "default" : "outline"}
          className={filter === "family" ? "bg-blue-700" : "border-blue-700/50 text-blue-400"}
          onClick={() => setFilter("family")}
        >
          Family Resources
        </Button>
      </div>
      
      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkshops.map((workshop) => (
          <Card key={workshop.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-blue-900/30">
                  <workshop.icon className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle className="text-white">{workshop.title}</CardTitle>
              </div>
              <CardDescription className="text-blue-200/70">{workshop.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-white">{workshop.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-white">{workshop.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-white">{workshop.enrolled} enrolled / {workshop.capacity} spots</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="text-white">Instructor: {workshop.instructor}</span>
              </div>
              
              {/* Workshop format options */}
              <div className="flex gap-2 pt-2">
                <div className="flex items-center gap-1 bg-blue-900/20 text-blue-200 px-2 py-1 rounded-full text-xs">
                  <Video className="h-3 w-3" />
                  <span>Virtual</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-900/20 text-blue-200 px-2 py-1 rounded-full text-xs">
                  <MessageSquare className="h-3 w-3" />
                  <span>Discussion</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleActionClick({
                  type: 'workshop',
                  id: workshop.id,
                  title: workshop.title
                })}
              >
                Register for Workshop
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Request Workshop */}
      <Card className="bg-[#141921] border-blue-900/30">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Don't see what you need?</h3>
              <p className="text-blue-200/70">
                Request a specific workshop or training for your department or individual needs.
              </p>
            </div>
            <Button 
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20"
              onClick={() => handleActionClick({
                type: 'other',
                path: '/law-enforcement-workshop-request',
                title: 'Request Workshop'
              })}
            >
              Request a Workshop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawEnforcementWorkshops;
