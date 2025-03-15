
import React from 'react';
import { LucideIcon, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface WorkplaceWorkshopCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
}

const WorkplaceWorkshopCard: React.FC<WorkplaceWorkshopCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  color,
  duration
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartWorkshop = () => {
    toast({
      title: "Workshop Selected",
      description: "Loading your workplace wellness workshop...",
      duration: 1500,
    });
    
    // In a real app, this would navigate to the specific workshop
    // navigate(`/workplace-workshop/${id}`);
    
    // For now, just show a toast
    setTimeout(() => {
      toast({
        title: "Workshop Ready",
        description: `${title} workshop is ready for you to begin.`,
        duration: 2000,
      });
    }, 1500);
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className={`p-5 ${color.split(' ')[0].replace('/10', '/5')}`}>
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-full ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {duration}
              </div>
            </div>
            
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
          
          <div className="p-4 mt-auto">
            <Button 
              className="w-full justify-between"
              variant="outline"
              onClick={handleStartWorkshop}
            >
              Start Workshop
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkplaceWorkshopCard;
