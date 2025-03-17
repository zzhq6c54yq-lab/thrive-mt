
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { workshopData } from "@/data/workshopData";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, Volume, ExternalLink, Calendar, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeaturedWorkshops: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const featuredWorkshops = workshopData.slice(0, 3);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleVideo = (index: number) => {
    setActiveVideoIndex(activeVideoIndex === index ? null : index);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleWorkshopJoin = (workshopId: string) => {
    toast({
      title: "Joining Workshop",
      description: "Taking you to the workshop content",
      duration: 1500,
    });
    
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <div className="mb-12">
      <div className="mb-6 relative">
        <h2 className="text-3xl font-bold inline-flex items-center gap-3 relative">
          <Calendar className="h-6 w-6 text-[#B87333]" />
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] tracking-tight">
            Monthly Featured Workshops
          </span>
        </h2>
        <div className="absolute -bottom-2 left-0 w-72 h-[2px] bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredWorkshops.map((workshop, index) => {
          const colorClass = workshop.color.split(' ')[0];
          const accentColor = colorClass.includes('bg-[') 
            ? colorClass.replace('bg-[', '').replace(']/10', '') 
            : '#9b87f5';
          const isActive = activeVideoIndex === index;
            
          return (
            <div 
              key={workshop.id}
              className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01] group h-full"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, #f6f6f6 100%)`,
                borderLeft: `4px solid ${accentColor}`
              }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div 
                    className="p-3 rounded-full"
                    style={{ background: `${accentColor}15` }}
                  >
                    <workshop.icon className="h-6 w-6" style={{ color: accentColor }} />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-200/80"
                    onClick={() => toggleVideo(index)}
                  >
                    {isActive ? 
                      <Pause className="h-4 w-4 text-gray-700" /> : 
                      <Play className="h-4 w-4 text-gray-700" />
                    }
                  </Button>
                </div>
                
                <h3 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
                  {workshop.title}
                </h3>
                
                {isActive ? (
                  <div className="relative mb-4 flex-grow rounded-md overflow-hidden bg-black/5">
                    <div className="aspect-video rounded-md overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <video 
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted={isMuted}
                        poster={`https://picsum.photos/seed/${workshop.id}/640/360`}
                      >
                        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                        >
                          {isMuted ? 
                            <Volume className="h-4 w-4" /> : 
                            <Volume2 className="h-4 w-4" />
                          }
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/workshop/${workshop.id}`, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Preview: {workshop.title} introduction</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    {workshop.description}
                  </p>
                )}
                
                <div className="mt-auto pt-2">
                  <Button 
                    className="w-full flex items-center justify-center gap-2 hover:shadow-md"
                    style={{ 
                      backgroundColor: accentColor,
                      color: '#fff'
                    }}
                    onClick={() => handleWorkshopJoin(workshop.id)}
                  >
                    Join Workshop
                  </Button>
                </div>
              </div>
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: accentColor }}
              ></div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <Button
          variant="outline" 
          className="border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
          onClick={() => navigate("/workshops")}
        >
          View All Workshops
        </Button>
      </div>
    </div>
  );
};

export default FeaturedWorkshops;
