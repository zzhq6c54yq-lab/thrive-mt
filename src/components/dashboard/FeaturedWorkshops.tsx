
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavigateFunction } from "react-router-dom";
import { workshopData } from "@/data/workshopData";
import { ArrowRight } from "lucide-react";

interface FeaturedWorkshopsProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ navigate, onWorkshopClick }) => {
  const [featuredWorkshops, setFeaturedWorkshops] = useState(workshopData.slice(0, 4));
  
  // Workshop cover images mapped to topics
  const getWorkshopImage = (workshopId: string) => {
    const imageMap: {[key: string]: string} = {
      'mindful-communication': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'emotional-regulation': 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'stress-management': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'better-sleep': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'cognitive-reframing': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'gratitude-practice': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'self-compassion': 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'social-connection': 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    };
    
    return imageMap[workshopId] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  };

  const handleViewAllWorkshops = () => {
    navigate("/workshops");
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredWorkshops.map((workshop) => {
          const colorClass = workshop.color.split(' ')[0];
          const accentColor = colorClass.includes('bg-[#') 
            ? colorClass.replace('bg-[', '').replace(']/10', '') 
            : '#9b87f5';
          
          return (
            <Card 
              key={workshop.id}
              className="overflow-hidden cursor-pointer group border-none shadow-md"
              style={{ borderLeft: `4px solid ${accentColor}` }}
              onClick={() => onWorkshopClick(workshop.id, workshop.title)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={getWorkshopImage(workshop.id)} 
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <h3 className="text-white text-lg font-medium line-clamp-2">{workshop.title}</h3>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          className="border-[#9b87f5]/50 text-[#9b87f5] hover:bg-[#9b87f5]/10"
          onClick={handleViewAllWorkshops}
        >
          View All Workshops
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedWorkshops;
