
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Video, Filter, Search, Clock, MapPin, CalendarDays, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Workshop data
const workshops = [
  {
    id: 1,
    title: "Combat Stress Management",
    type: "Virtual Workshop",
    description: "Learn effective techniques for managing stress related to combat experiences and deployment.",
    instructor: "Col. James Harrison, PhD",
    date: "April 15, 2023",
    time: "2:00 PM - 4:00 PM ET",
    format: "Virtual",
    participants: 42,
    thumbnail: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=360&q=80",
    featured: true,
    tags: ["PTSD", "Stress", "Combat"]
  },
  {
    id: 2,
    title: "Military to Civilian Transition",
    type: "On-demand Course",
    description: "A comprehensive program to help service members successfully transition to civilian life and careers.",
    instructor: "Linda Martinez, Career Specialist",
    date: "Self-paced",
    time: "On-demand",
    format: "On-demand",
    participants: 128,
    thumbnail: "https://images.unsplash.com/photo-1607707972895-7f994d4c8203?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=360&q=80",
    featured: true,
    tags: ["Career", "Transition", "Civilian Life"]
  },
  {
    id: 3,
    title: "Family Resilience Building",
    type: "In-person Workshop",
    description: "Strategies and support for military families dealing with deployment, relocation, and reintegration.",
    instructor: "Dr. Sarah Thompson",
    date: "April 22, 2023",
    time: "10:00 AM - 3:00 PM PT",
    format: "In-person",
    location: "Fort Bragg Family Center",
    participants: 35,
    thumbnail: "https://images.unsplash.com/photo-1528712623442-24d329292bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=360&q=80",
    featured: false,
    tags: ["Family", "Resilience", "Support"]
  },
  {
    id: 4,
    title: "Mindfulness for Veterans",
    type: "Virtual Workshop",
    description: "Introduction to mindfulness practices specifically adapted for veterans and military personnel.",
    instructor: "Mark Johnson, Mindfulness Coach",
    date: "April 30, 2023",
    time: "7:00 PM - 8:30 PM ET",
    format: "Virtual",
    participants: 64,
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=360&q=80",
    featured: false,
    tags: ["Mindfulness", "Meditation", "Mental Health"]
  },
  {
    id: 5,
    title: "Military Sexual Trauma: Healing Path",
    type: "Support Group",
    description: "Confidential support group for service members affected by military sexual trauma.",
    instructor: "Dr. Jennifer Williams & Capt. David Miller",
    date: "Weekly - Thursdays",
    time: "6:00 PM - 7:30 PM CT",
    format: "Virtual",
    participants: 18,
    thumbnail: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=360&q=80",
    featured: false,
    tags: ["MST", "Trauma", "Support Group"]
  },
  {
    id: 6,
    title: "Financial Readiness for Veterans",
    type: "Virtual Workshop",
    description: "Learn financial planning strategies specifically for veterans transitioning to civilian life.",
    instructor: "Michael Stevens, Financial Advisor",
    date: "May 10, 2023",
    time: "1:00 PM - 3:00 PM ET",
    format: "Virtual",
    participants: 52,
    thumbnail: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=360&q=80",
    featured: false,
    tags: ["Financial", "Planning", "Benefits"]
  }
];

const WorkshopCard = ({ 
  workshop, 
  featured = false,
  onRegister,
  onLearnMore
}) => {
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${
      featured 
        ? 'border-blue-600/30 bg-gradient-to-b from-blue-900/30 to-blue-950/30' 
        : 'border-blue-900/30 bg-[#141921]'
    }`}>
      <div className="relative h-[180px] overflow-hidden">
        <img 
          src={workshop.thumbnail} 
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {featured && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded-full">
            Featured
          </div>
        )}
        
        <div className="absolute top-2 left-2 bg-[#141921]/90 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
          {workshop.format === "Virtual" ? (
            <Video className="h-3 w-3 text-blue-400" />
          ) : workshop.format === "In-person" ? (
            <MapPin className="h-3 w-3 text-blue-400" />
          ) : (
            <Play className="h-3 w-3 text-blue-400" />
          )}
          <span>{workshop.type}</span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 flex-wrap mb-1">
            {workshop.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-xs bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <CardTitle className="text-xl text-white">{workshop.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-white/70">
          <Users className="h-3 w-3" />
          <span>Instructor: {workshop.instructor}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-sm text-white/80">
        <p className="mb-4">{workshop.description}</p>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-blue-300">
            <Calendar className="h-4 w-4" />
            <span>{workshop.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-blue-300">
            <Clock className="h-4 w-4" />
            <span>{workshop.time}</span>
          </div>
          
          {workshop.location && (
            <div className="flex items-center gap-2 text-blue-300">
              <MapPin className="h-4 w-4" />
              <span>{workshop.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-blue-300">
            <Users className="h-4 w-4" />
            <span>{workshop.participants} participants</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto pt-2">
        <div className="w-full grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
            onClick={() => onLearnMore(workshop)}
          >
            Learn More
          </Button>
          <Button 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => onRegister(workshop)}
          >
            Register
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const DoDWorkshops = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleWorkshops, setVisibleWorkshops] = useState(workshops);
  
  // Get the return portal path from location state
  const returnToPortal = location.state?.returnToPortal || "/dod-portal";
  
  // Handle workshop registration
  const handleRegisterWorkshop = (workshop) => {
    toast({
      title: "Workshop Registration",
      description: `You've successfully registered for "${workshop.title}"`,
      duration: 2000,
    });
  };
  
  // Handle learn more about workshop
  const handleLearnMoreWorkshop = (workshop) => {
    // Navigate to workshop detail with navigation state to allow returning to portal
    navigate(`/workshop/${workshop.id}`, {
      state: {
        preventTutorial: true,
        returnToPortal: returnToPortal,
        workshopData: workshop
      }
    });
  };
  
  // Handle search
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term) {
      setVisibleWorkshops(workshops);
    } else {
      const filtered = workshops.filter(workshop => 
        workshop.title.toLowerCase().includes(term.toLowerCase()) ||
        workshop.description.toLowerCase().includes(term.toLowerCase()) ||
        workshop.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
      setVisibleWorkshops(filtered);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Military-Specific Workshops</h2>
        <p className="text-blue-200/80 mb-6">
          Specialized workshops and training sessions designed for service members, veterans, and military families.
        </p>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search workshops by title, description, or tags..."
              className="w-full py-2.5 pl-10 pr-4 bg-[#0c1016] border border-blue-900/30 rounded-md text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-300 hover:bg-blue-900/50 whitespace-nowrap"
            onClick={() => {
              toast({
                title: "Filters",
                description: "Opening workshop filter options",
                duration: 1500
              });
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      
      {/* Featured Workshops */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">Featured Workshops</h3>
          <Button 
            variant="link" 
            className="text-blue-400"
            onClick={() => {
              toast({
                title: "Calendar View",
                description: "Opening monthly workshop calendar",
                duration: 1500
              });
            }}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visibleWorkshops
            .filter(workshop => workshop.featured)
            .map(workshop => (
              <WorkshopCard 
                key={workshop.id} 
                workshop={workshop} 
                featured={true}
                onRegister={handleRegisterWorkshop}
                onLearnMore={handleLearnMoreWorkshop}
              />
            ))}
        </div>
      </div>
      
      {/* All Workshops */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Upcoming Workshops</h3>
        
        {visibleWorkshops.length === 0 ? (
          <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-6 text-center">
            <p className="text-white text-lg mb-2">No workshops match your search</p>
            <p className="text-blue-200/70">Try adjusting your search terms or filters</p>
            <Button 
              variant="outline" 
              className="mt-4 border-blue-500 text-blue-300 hover:bg-blue-900/50"
              onClick={() => {
                setSearchTerm("");
                setVisibleWorkshops(workshops);
              }}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleWorkshops
              .filter(workshop => !workshop.featured)
              .map(workshop => (
                <WorkshopCard 
                  key={workshop.id} 
                  workshop={workshop} 
                  onRegister={handleRegisterWorkshop}
                  onLearnMore={handleLearnMoreWorkshop}
                />
              ))}
          </div>
        )}
      </div>
      
      {/* Request Section */}
      <div className="mt-10">
        <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Need a Specific Workshop?</h3>
                <p className="text-blue-200/80 mb-4">
                  Don't see what you're looking for? Request a workshop on a specific topic or for your unit.
                </p>
              </div>
              <Button 
                className="bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => {
                  toast({
                    title: "Workshop Request",
                    description: "Opening workshop request form",
                    duration: 1500
                  });
                }}
              >
                Request Workshop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoDWorkshops;
