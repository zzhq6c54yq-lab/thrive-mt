
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const TransportWorkshops: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleWorkshopClick = (path: string, title: string) => {
    toast({
      title: "Opening Workshop",
      description: `Loading ${title}...`,
      duration: 1500,
    });
    navigate(path, {
      state: {
        stayInPortal: true,
        preventTutorial: true,
        portalPath: "/transport-portal",
        fromPortal: true,
        portalType: "transport"
      }
    });
  };

  // Sample upcoming workshops
  const upcomingWorkshops = [
    {
      id: "stress-mng",
      title: "Stress Management for Truckers",
      date: "May 15, 2025",
      time: "8:00 PM - 9:30 PM EST",
      format: "Virtual",
      attendees: 42,
      tags: ["Stress", "Mental Health"],
      description: "Learn practical techniques to manage stress on the road, including breathing exercises, mindfulness practices, and cognitive reframing strategies.",
      instructor: "Dr. Michael Reynolds",
      path: "/transport-workshops/stress-management"
    },
    {
      id: "family-balance",
      title: "Family Connections While On The Road",
      date: "May 22, 2025",
      time: "7:00 PM - 8:30 PM EST",
      format: "Virtual",
      attendees: 28,
      tags: ["Family", "Relationships"],
      description: "Strategies for maintaining strong family bonds during long periods away from home, including communication techniques and meaningful connection rituals.",
      instructor: "Sarah Johnson, LMFT",
      path: "/transport-workshops/family-connections"
    },
    {
      id: "health-road",
      title: "Health & Wellness for Transport Workers",
      date: "May 25, 2025",
      time: "1:00 PM - 3:00 PM EST",
      format: "Virtual",
      attendees: 35,
      tags: ["Health", "Wellness"],
      description: "Comprehensive approaches to maintaining physical and mental health while working in transportation, including nutrition, exercise, and sleep strategies.",
      instructor: "Mark Williams, Health Coach",
      path: "/transport-workshops/health-wellness"
    }
  ];

  // Sample on-demand workshops
  const onDemandWorkshops = [
    {
      id: "sleep-hygiene",
      title: "Sleep Hygiene for Irregular Schedules",
      duration: "75 minutes",
      tags: ["Sleep", "Health"],
      description: "Techniques to optimize sleep quality when dealing with changing schedules and sleeping in different locations.",
      instructor: "Dr. Amanda Chen, Sleep Specialist",
      path: "/transport-workshops/sleep-hygiene"
    },
    {
      id: "isolation",
      title: "Combating Isolation on the Road",
      duration: "60 minutes",
      tags: ["Mental Health", "Social"],
      description: "Strategies for maintaining social connections and preventing feelings of isolation during long periods of solo driving.",
      instructor: "Thomas Rodriguez, Counselor",
      path: "/transport-workshops/isolation"
    },
    {
      id: "cab-exercise",
      title: "In-Cab Exercise Routines",
      duration: "45 minutes",
      tags: ["Fitness", "Physical Health"],
      description: "Simple but effective exercises that can be performed in and around your vehicle during breaks to maintain physical health.",
      instructor: "Lisa Montgomery, Physical Therapist",
      path: "/transport-workshops/cab-exercise"
    },
    {
      id: "mindfulness",
      title: "Mindfulness for the Moving World",
      duration: "50 minutes",
      tags: ["Meditation", "Mental Health"],
      description: "Learn how to practice mindfulness and meditation techniques specifically adapted for transportation professionals.",
      instructor: "Robert Chang, Mindfulness Coach",
      path: "/transport-workshops/mindfulness"
    }
  ];

  // Sample in-person workshops
  const inPersonWorkshops = [
    {
      id: "wellness-northeast",
      title: "Driver Wellness Day - Northeast Region",
      date: "June 10, 2025",
      time: "10:00 AM - 4:00 PM EST",
      location: "Truck Stop America, Plainfield, NJ",
      attendees: 25,
      tags: ["Wellness", "In-Person"],
      description: "A full day of wellness activities including health screenings, wellness workshops, and one-on-one consultations with health professionals.",
      path: "/transport-workshops/wellness-northeast"
    },
    {
      id: "wellness-midwest",
      title: "Driver Wellness Day - Midwest Region",
      date: "June 17, 2025",
      time: "10:00 AM - 4:00 PM CST",
      location: "Flying J Travel Center, Morris, IL",
      attendees: 20,
      tags: ["Wellness", "In-Person"],
      description: "A full day of wellness activities including health screenings, wellness workshops, and one-on-one consultations with health professionals.",
      path: "/transport-workshops/wellness-midwest"
    },
    {
      id: "wellness-west",
      title: "Driver Wellness Day - West Coast",
      date: "June 24, 2025",
      time: "10:00 AM - 4:00 PM PST",
      location: "Love's Travel Stop, Sacramento, CA",
      attendees: 22,
      tags: ["Wellness", "In-Person"],
      description: "A full day of wellness activities including health screenings, wellness workshops, and one-on-one consultations with health professionals.",
      path: "/transport-workshops/wellness-west"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Transport Industry Wellness Workshops</h2>
        <p className="text-white/70">
          Interactive sessions designed to support the mental health and wellbeing of truck drivers and transportation workers
        </p>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Upcoming Live Workshops</span>
          </TabsTrigger>
          <TabsTrigger value="ondemand" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>On-Demand Workshops</span>
          </TabsTrigger>
          <TabsTrigger value="inperson" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>In-Person Events</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Upcoming Live Workshops */}
        <TabsContent value="upcoming">
          <div className="space-y-6">
            {upcomingWorkshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-xl">{workshop.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {workshop.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{workshop.attendees} attending</span>
                  </div>
                  <div className="text-sm text-gray-700 font-medium pt-2">
                    Instructor: {workshop.instructor}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleWorkshopClick(workshop.path, workshop.title)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleWorkshopClick(`${workshop.path}/register`, "Workshop Registration")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* On-Demand Workshops */}
        <TabsContent value="ondemand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onDemandWorkshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {workshop.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Duration: {workshop.duration}</span>
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    Instructor: {workshop.instructor}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => handleWorkshopClick(workshop.path, workshop.title)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Watch Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* In-Person Events */}
        <TabsContent value="inperson">
          <div className="space-y-6">
            {inPersonWorkshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-xl">{workshop.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {workshop.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Limited to {workshop.attendees} attendees</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleWorkshopClick(workshop.path, workshop.title)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleWorkshopClick(`${workshop.path}/register`, "Workshop Registration")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Reserve Spot
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Request a Workshop</h3>
            <p className="text-white/70 text-sm mb-4">
              Don't see what you're looking for? We can create custom workshops tailored to specific mental health needs 
              in the transportation industry. Let us know what topics you'd like to see covered.
            </p>
            <Button 
              onClick={() => handleWorkshopClick("/transport-workshops/request", "Workshop Request")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Request a Topic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportWorkshops;
