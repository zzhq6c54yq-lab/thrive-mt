
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Play, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleImageError } from "@/utils/imageUtils";

const Workshops = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBack = () => {
    navigate("/app/dashboard");
  };

  const handleJoinWorkshop = (workshopId: string, workshopTitle: string) => {
    toast({
      title: "Joining Workshop",
      description: "Taking you to the workshop content",
      duration: 1500,
    });
    
    // Navigate directly to the workshop content tab
    navigate(`/app/workshop/${workshopId}`, { state: { activeTab: "workshop", workshopTitle } });
  };

  // Workshop cover images mapped to topics with direct links
  const getWorkshopImage = (workshopId: string) => {
    const imageMap: {[key: string]: string} = {
      'mindful-communication': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      'emotional-regulation': 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'stress-management': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'better-sleep': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      'cognitive-reframing': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'gratitude-practice': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
      'self-compassion': 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      'social-connection': 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      'anxiety-management': 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      'boundary-setting': 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
      'values-alignment': 'https://images.unsplash.com/photo-1543618903355-efbc3e8e9284',
      'habit-formation': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952'
    };
    
    // Return the full URL directly without modification
    return imageMap[workshopId] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
  };

  return (
    <Page title="Thrive MT Mental Health Workshops" showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <Card className="border border-gray-200/20 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-white">Current Workshops Available</CardTitle>
                <CardDescription className="text-blue-200">
                  Guided 45-minute sessions with Henry to improve your mental wellbeing
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          
          {isExpanded && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {workshopData.map((workshop) => {
                  // Extract color code for styling
                  const colorClass = workshop.color.split(' ')[0];
                  const accentColor = colorClass.includes('bg-[#') 
                    ? colorClass.replace('bg-[', '').replace(']/10', '') 
                    : '#9b87f5';
                  
                  // Get the workshop image directly
                  const workshopImage = getWorkshopImage(workshop.id);
                    
                  return (
                    <div 
                      key={workshop.id}
                      className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01] group cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, #252535 0%, #1e1e2a 100%)`,
                        borderLeft: `4px solid ${accentColor}`
                      }}
                      onClick={() => handleJoinWorkshop(workshop.id, workshop.title)}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={workshopImage}
                          alt={workshop.title} 
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = handleImageError(e, `workshop-${workshop.id}`, 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d');
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e2a] to-transparent"></div>
                      </div>
                      
                      <div className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div 
                            className="p-3 rounded-full"
                            style={{ background: `${accentColor}25` }}
                          >
                            <workshop.icon className="h-6 w-6" style={{ color: accentColor }} />
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{workshop.duration}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#E5C5A1] transition-colors">
                          {workshop.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-6 text-sm line-clamp-2">
                          {workshop.description}
                        </p>
                        
                        <Button 
                          className="w-full flex items-center justify-center gap-2 hover:shadow-md"
                          style={{ 
                            backgroundColor: accentColor,
                            color: '#fff'
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent onClick
                            handleJoinWorkshop(workshop.id, workshop.title);
                          }}
                        >
                          Join Now
                          <Play className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </Page>
  );
};

export default Workshops;
