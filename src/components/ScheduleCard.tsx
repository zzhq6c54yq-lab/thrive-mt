
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface Meeting {
  id: string;
  title: string;
  type: "class" | "aa" | "na";
  startTime: Date;
  duration: number; // in minutes
  availableSpots: number;
  totalSpots: number;
  description: string;
}

interface ScheduleCardProps {
  meeting: Meeting;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ meeting }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleJoin = () => {
    if (meeting.availableSpots === 0) {
      toast({
        title: "Meeting is Full",
        description: "Sorry, this meeting is already fully booked. Please try another time slot.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Meeting Joined",
      description: `You've successfully joined "${meeting.title}". A confirmation has been sent to your email.`,
    });
    
    // In a real application, we would update the backend to reduce available spots
    // For now, let's simulate navigation to a meeting room
    setTimeout(() => {
      navigate(`/virtual-meetings/room/${meeting.id}`, { 
        state: { meetingDetails: meeting }
      });
    }, 1500);
  };
  
  const endTime = new Date(meeting.startTime.getTime() + meeting.duration * 60000);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "text-blue-600 bg-blue-100";
      case "aa":
        return "text-purple-600 bg-purple-100";
      case "na":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "class":
        return "Mental Health Class";
      case "aa":
        return "AA Meeting";
      case "na":
        return "NA Meeting";
      default:
        return "Meeting";
    }
  };
  
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getTypeColor(meeting.type)}`}>
              {getTypeLabel(meeting.type)}
            </span>
            <CardTitle className="text-lg">{meeting.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(meeting.startTime, "EEEE, MMMM d")}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {format(meeting.startTime, "h:mm a")} - {format(endTime, "h:mm a")}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {meeting.availableSpots} of {meeting.totalSpots} spots available
            </span>
          </div>
        </div>
        <CardDescription className="mb-4">{meeting.description}</CardDescription>
        <div className="flex justify-end">
          <Button 
            onClick={handleJoin}
            disabled={meeting.availableSpots === 0}
            className={meeting.availableSpots === 0 ? "bg-gray-400" : ""}
          >
            {meeting.availableSpots === 0 ? "Fully Booked" : "Join Meeting"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
