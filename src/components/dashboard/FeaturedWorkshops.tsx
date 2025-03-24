
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, ArrowRight } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface FeaturedWorkshopsProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ navigate, onWorkshopClick }) => {
  const workshops = [
    {
      id: "mindful-communication",
      title: "Mindful Communication",
      description: "Learn effective communication techniques rooted in mindfulness principles to improve relationships.",
      instructor: "Dr. Sarah Johnson",
      date: "Tuesdays & Thursdays",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "emotional-regulation",
      title: "Emotional Regulation",
      description: "Develop skills to manage difficult emotions and respond rather than react to challenging situations.",
      instructor: "Dr. Michael Chen",
      date: "Mondays & Wednesdays",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "stress-management",
      title: "Stress Management",
      description: "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.",
      instructor: "Dr. Robert Taylor",
      date: "Fridays",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Monthly Featured Workshops</h2>
        <Button 
          variant="link" 
          className="text-[#E5C5A1] px-0 flex items-center"
          onClick={() => navigate("/workshops")}
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="bg-[#252535] border-[#3d3d5c] rounded-lg hover:bg-[#2a2a40] transition-colors">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={workshop.image} 
                alt={workshop.title} 
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] to-transparent opacity-60"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-xl">{workshop.title}</CardTitle>
              <CardDescription className="text-gray-400">{workshop.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-gray-400 mb-1">
                <Users className="mr-2 h-4 w-4 text-[#E5C5A1]" />
                <span className="text-sm">{workshop.instructor}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <CalendarDays className="mr-2 h-4 w-4 text-[#E5C5A1]" />
                <span className="text-sm">{workshop.date}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#a66a2e] text-white"
                onClick={() => onWorkshopClick(workshop.id, workshop.title)}
              >
                View Workshop
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkshops;
