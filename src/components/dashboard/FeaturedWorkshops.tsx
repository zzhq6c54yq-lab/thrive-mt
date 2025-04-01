
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface FeaturedWorkshopsProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ navigate, onWorkshopClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const workshopsPerPage = 3;
  
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
    },
    {
      id: "better-sleep",
      title: "Better Sleep Habits",
      description: "Develop healthy sleep routines and overcome insomnia with evidence-based techniques.",
      instructor: "Dr. Lisa Martinez",
      date: "Mondays & Wednesdays",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "cognitive-reframing",
      title: "Cognitive Reframing",
      description: "Learn to identify negative thought patterns and transform them into more balanced perspectives.",
      instructor: "Dr. James Wilson",
      date: "Tuesdays",
      image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "gratitude-practice",
      title: "Gratitude Practice",
      description: "Harness the power of gratitude to increase happiness and resilience in your daily life.",
      instructor: "Dr. Emma Thompson",
      date: "Thursdays",
      image: "https://images.unsplash.com/photo-1518602164809-512c39454922?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "self-compassion",
      title: "Self-Compassion Skills",
      description: "Break free from self-criticism and develop a kinder relationship with yourself.",
      instructor: "Dr. Anna Kim",
      date: "Wednesdays",
      image: "https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "social-connection",
      title: "Building Social Connection",
      description: "Strengthen relationships and overcome isolation with evidence-based strategies.",
      instructor: "Dr. Thomas Parker",
      date: "Mondays & Fridays",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "anxiety-management",
      title: "Anxiety Management Toolkit",
      description: "Practical strategies to understand and manage anxiety in your daily life.",
      instructor: "Dr. Rachel Greene",
      date: "Tuesdays & Thursdays",
      image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "boundary-setting",
      title: "Healthy Boundary Setting",
      description: "Learn to establish and maintain healthy boundaries in all your relationships.",
      instructor: "Dr. Samuel Washington",
      date: "Wednesdays",
      image: "https://images.unsplash.com/photo-1568260843567-3e0d96a5eb1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "values-alignment",
      title: "Living by Your Values",
      description: "Clarify your core values and align your daily choices with what matters most to you.",
      instructor: "Dr. Michelle Rodriguez",
      date: "Fridays",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "habit-formation",
      title: "Habit Formation Mastery",
      description: "Learn the science behind effective habit change and develop skills for lasting change.",
      instructor: "Dr. Benjamin Harris",
      date: "Mondays",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const pageCount = Math.ceil(workshops.length / workshopsPerPage);
  const displayedWorkshops = workshops.slice(
    currentPage * workshopsPerPage, 
    (currentPage + 1) * workshopsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Monthly Featured Workshops</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#3d3d5c] text-gray-300 flex items-center"
            onClick={prevPage}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-300">
            Page {currentPage + 1} of {pageCount}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#3d3d5c] text-gray-300 flex items-center"
            onClick={nextPage}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="link" 
            className="text-[#E5C5A1] px-0 flex items-center ml-4"
            onClick={() => navigate("/workshops")}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedWorkshops.map((workshop) => (
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
