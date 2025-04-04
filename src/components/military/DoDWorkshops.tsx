
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Video, Filter, Search, Clock, MapPin, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DoDWorkshops = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const workshops = [
    {
      id: "w1",
      title: "Combat Stress Management",
      description: "Learn techniques to manage stress related to combat experiences and deployments.",
      type: "virtual",
      date: "April 15, 2025",
      time: "2:00 PM - 4:00 PM ET",
      facilitator: "Dr. Michael Rivera, Military Psychologist",
      spots: 15,
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      tags: ["stress", "combat", "coping"]
    },
    {
      id: "w2",
      title: "Military Family Resilience",
      description: "Strengthening family bonds and communication during deployment and reintegration.",
      type: "in-person",
      location: "Ft. Belvoir Community Center",
      date: "April 18, 2025",
      time: "10:00 AM - 12:00 PM ET",
      facilitator: "Sarah Johnson, LMFT, Military Family Specialist",
      spots: 20,
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      tags: ["family", "communication", "resilience"]
    },
    {
      id: "w3",
      title: "PTSD & Trauma Recovery",
      description: "Evidence-based approaches to trauma recovery specifically for combat veterans.",
      type: "virtual",
      date: "April 22, 2025",
      time: "6:00 PM - 8:00 PM ET",
      facilitator: "Col. James Peterson (Ret.), PhD, Trauma Specialist",
      spots: 12,
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      tags: ["ptsd", "trauma", "recovery"]
    },
    {
      id: "w4",
      title: "Transitioning to Civilian Life",
      description: "Practical guidance for service members preparing for civilian career transitions.",
      type: "hybrid",
      location: "Naval Base San Diego & Online",
      date: "April 25, 2025",
      time: "1:00 PM - 5:00 PM PT",
      facilitator: "Veteran Transition Team & Career Counselors",
      spots: 30,
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      tags: ["transition", "career", "civilian"]
    },
    {
      id: "w5",
      title: "Military Sexual Trauma Support Group",
      description: "Confidential group for MST survivors with trauma-informed facilitators.",
      type: "in-person",
      location: "VA Medical Center - Confidential Room",
      date: "Weekly - Thursdays",
      time: "5:00 PM - 6:30 PM",
      facilitator: "Dr. Elena Martinez, MST Program Coordinator",
      spots: 8,
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      tags: ["mst", "support", "trauma"]
    },
    {
      id: "w6",
      title: "Combat Mindfulness Training",
      description: "Mindfulness techniques adapted specifically for combat veterans.",
      type: "virtual",
      date: "May 3, 2025",
      time: "11:00 AM - 1:00 PM ET",
      facilitator: "Master Sgt. Robert Williams (Ret.), Mindfulness Instructor",
      spots: 25,
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      tags: ["mindfulness", "meditation", "coping"]
    }
  ];
  
  const filteredWorkshops = workshops.filter(workshop => {
    if (filterType !== "all" && workshop.type !== filterType) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        workshop.title.toLowerCase().includes(query) ||
        workshop.description.toLowerCase().includes(query) ||
        workshop.tags.some(tag => tag.includes(query))
      );
    }
    
    return true;
  });
  
  const getWorkshopTypeIcon = (type) => {
    switch(type) {
      case 'virtual': return <Video className="h-4 w-4 text-blue-400" />;
      case 'in-person': return <Users className="h-4 w-4 text-green-400" />;
      case 'hybrid': return <div className="flex"><Users className="h-4 w-4 text-green-400" /><Video className="h-4 w-4 text-blue-400 ml-1" /></div>;
      default: return <Calendar className="h-4 w-4 text-blue-400" />;
    }
  };
  
  const getWorkshopTypeLabel = (type) => {
    switch(type) {
      case 'virtual': return 'Virtual Workshop';
      case 'in-person': return 'In-Person';
      case 'hybrid': return 'Hybrid Event';
      default: return 'Workshop';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Military Mental Health Workshops</h2>
        <p className="text-blue-200/80 mb-6">
          Specialized workshops and support groups designed for service members, veterans, and military families.
        </p>
        
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search workshops..."
              className="w-full py-2.5 pl-10 pr-4 bg-[#0c1016] border border-blue-900/30 rounded-md text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <Filter className="h-5 w-5 text-blue-400" />
            <span className="text-blue-400 mr-2">Filter:</span>
            <div className="bg-[#141921] border border-blue-900/30 rounded-md flex">
              <button 
                className={`px-3 py-1.5 ${filterType === 'all' ? 'bg-blue-900/30 text-blue-400' : 'text-white/80'}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1.5 ${filterType === 'virtual' ? 'bg-blue-900/30 text-blue-400' : 'text-white/80'}`}
                onClick={() => setFilterType('virtual')}
              >
                Virtual
              </button>
              <button 
                className={`px-3 py-1.5 ${filterType === 'in-person' ? 'bg-blue-900/30 text-blue-400' : 'text-white/80'}`}
                onClick={() => setFilterType('in-person')}
              >
                In-Person
              </button>
              <button 
                className={`px-3 py-1.5 ${filterType === 'hybrid' ? 'bg-blue-900/30 text-blue-400' : 'text-white/80'}`}
                onClick={() => setFilterType('hybrid')}
              >
                Hybrid
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workshops Grid */}
      {filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <Card key={workshop.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors overflow-hidden flex flex-col">
              <div className="h-40 bg-blue-900/20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#141921] via-transparent to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 opacity-30 bg-cover bg-center"
                  style={{ backgroundImage: `url(${workshop.image})` }}
                ></div>
                <div className="absolute top-3 right-3 z-20">
                  <div className="flex items-center gap-1.5 bg-[#0c1016]/80 backdrop-blur-sm py-1 px-2 rounded-md border border-blue-900/30">
                    {getWorkshopTypeIcon(workshop.type)}
                    <span className="text-xs text-white/90">{getWorkshopTypeLabel(workshop.type)}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-300">{workshop.date}</span>
                </div>
                <CardTitle className="text-white">{workshop.title}</CardTitle>
                <CardDescription className="line-clamp-2">{workshop.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2 items-center">
                    <Clock className="h-4 w-4 text-blue-400/70" />
                    <span className="text-white/70">{workshop.time}</span>
                  </div>
                  
                  {workshop.location && (
                    <div className="flex gap-2 items-center">
                      <MapPin className="h-4 w-4 text-blue-400/70" />
                      <span className="text-white/70">{workshop.location}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 items-center">
                    <Users className="h-4 w-4 text-blue-400/70" />
                    <span className="text-white/70">{workshop.spots} spots available</span>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {workshop.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="border-blue-700/50 text-blue-300 bg-blue-900/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white" 
                  onClick={() => navigate(`/workshop/${workshop.id}`)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-500/50 text-blue-300 hover:bg-blue-900/30"
                >
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-blue-900/30 rounded-lg">
          <div className="p-3 bg-blue-900/20 rounded-full mb-3">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-1">No workshops found</h3>
          <p className="text-blue-200/70 text-center max-w-md mb-4">
            We couldn't find any workshops that match your search criteria. Please try different search terms or check back later.
          </p>
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
            onClick={() => {
              setSearchQuery("");
              setFilterType("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default DoDWorkshops;
