
import React from "react";
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
  // Only get the first 4 workshops
  const featuredWorkshops = workshopData.slice(0, 4);
  
  // Workshop cover images mapped to topics with high-quality, relevant images
  const getWorkshopImage = (workshopId: string) => {
    const imageMap: {[key: string]: string} = {
      'mindful-communication': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'emotional-regulation': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'stress-management': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'better-sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'cognitive-reframing': 'https://images.unsplash.com/photo-1454692173233-f4f34c13cfda?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'gratitude-practice': 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'self-compassion': 'https://images.unsplash.com/photo-1531081144778-a3d0613172a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'social-connection': 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'anxiety-management': 'https://images.unsplash.com/photo-1559000357-f6b52ddfcbba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'boundary-setting': 'https://images.unsplash.com/photo-1572504050773-a93cbcdee34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'values-alignment': 'https://images.unsplash.com/photo-1520853504280-249365dd7617?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'habit-formation': 'https://images.unsplash.com/photo-1616197439049-799b519adc48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    };
    
    return imageMap[workshopId] || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  };

  const handleViewAllWorkshops = () => {
    navigate("/app/workshops");
  };

  return (
    <div>
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
