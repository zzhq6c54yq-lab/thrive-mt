
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Workshops = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBack = () => {
    navigate("/");
  };

  const handleJoinWorkshop = (workshopId: string) => {
    toast({
      title: "Joining Workshop",
      description: "Taking you to the workshop content",
      duration: 1500,
    });
    
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <Page title="Thrive MT Mental Health Workshops" showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-gray-800">Current Workshops Available</CardTitle>
                <CardDescription>
                  Guided 45-minute sessions with Henry to improve your mental wellbeing
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500">
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
                    
                  return (
                    <div 
                      key={workshop.id}
                      className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01] group"
                      style={{
                        background: `linear-gradient(135deg, #ffffff 0%, #f6f6f6 100%)`,
                        borderLeft: `4px solid ${accentColor}`
                      }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div 
                            className="p-3 rounded-full"
                            style={{ background: `${accentColor}15` }}
                          >
                            <workshop.icon className="h-6 w-6" style={{ color: accentColor }} />
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{workshop.duration}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
                          {workshop.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 text-sm">
                          {workshop.description}
                        </p>
                        
                        <Button 
                          className="w-full flex items-center justify-center gap-2 hover:shadow-md"
                          style={{ 
                            backgroundColor: accentColor,
                            color: '#fff'
                          }}
                          onClick={() => handleJoinWorkshop(workshop.id)}
                        >
                          Join Now
                          <Play className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      
                      {/* Highlight effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ background: accentColor }}
                      ></div>
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
