
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendarSectionProps {
  onEventClick: (event: string) => void;
  onViewAllClick: () => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ onEventClick, onViewAllClick }) => {
  return (
    <div className="bg-amber-800/30 backdrop-blur-md border border-amber-200/30 rounded-xl p-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-amber-300" />
          Upcoming Events
        </h2>
        <Button 
          variant="outline" 
          className="border-amber-400 text-amber-100 hover:bg-amber-700/50"
          onClick={onViewAllClick}
        >
          View All Events
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className="bg-amber-700/30 p-4 rounded-lg cursor-pointer hover:bg-amber-700/40 transition"
          onClick={() => onEventClick("Virtual Wellness Workshop")}
        >
          <p className="text-amber-200 text-sm">June 20, 2025 • 2:00 PM</p>
          <h4 className="font-medium mb-1">Virtual Wellness Workshop</h4>
          <p className="text-sm text-amber-100">Learn gentle exercises you can do at home to maintain mobility.</p>
        </div>
        
        <div 
          className="bg-amber-700/30 p-4 rounded-lg cursor-pointer hover:bg-amber-700/40 transition"
          onClick={() => onEventClick("Memory Sharing Circle")}
        >
          <p className="text-amber-200 text-sm">June 25, 2025 • 3:30 PM</p>
          <h4 className="font-medium mb-1">Memory Sharing Circle</h4>
          <p className="text-sm text-amber-100">Join our virtual circle to share stories from your past with peers.</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
