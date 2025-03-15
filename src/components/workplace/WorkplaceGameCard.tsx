
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, BadgeInfo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface WorkplaceGameCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  type: string;
  playerCount: string;
  timeToComplete: string;
  benefits: string[];
  color: string;
}

const WorkplaceGameCard: React.FC<WorkplaceGameCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  type,
  playerCount,
  timeToComplete,
  benefits,
  color
}) => {
  const { toast } = useToast();
  
  const handleStartGame = () => {
    toast({
      title: "Starting Activity",
      description: `${title} is ready to begin!`,
      duration: 2000,
    });
  };
  
  const formatType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group border border-gray-200">
      <div className="h-1.5" style={{ backgroundColor: color }}></div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="p-2.5 rounded-full" 
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color: color }} />
          </div>
          <Badge 
            variant="outline" 
            className="text-xs font-normal"
            style={{ borderColor: color, color: color }}
          >
            {formatType(type)}
          </Badge>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3.5 w-3.5 mr-1" />
            {playerCount}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {timeToComplete}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs font-medium text-gray-700">Benefits</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeInfo className="h-3 w-3 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">How this activity can improve workplace wellbeing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {benefits.map((benefit, index) => (
              <span 
                key={index}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={handleStartGame}
          className="w-full mt-auto"
          variant="outline"
          style={{ borderColor: `${color}40`, color: color }}
        >
          Start Activity
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkplaceGameCard;
