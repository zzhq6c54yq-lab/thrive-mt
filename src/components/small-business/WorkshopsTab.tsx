
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Building, Users, Calendar } from "lucide-react";

interface WorkshopsTabProps {
  onFeatureClick: (path: string) => void;
}

const WorkshopsTab: React.FC<WorkshopsTabProps> = ({ onFeatureClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-900/30 rounded-full">
              <Building className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Entrepreneurial Resilience</h3>
          </div>
          <p className="text-white/70 mb-4">
            Build mental toughness and resilience for the unique challenges of small business ownership.
          </p>
          <div className="mb-4 p-2 bg-amber-900/20 rounded-lg text-sm text-white/70">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-amber-400" />
              <span>April 19, 2025 - 2:00 PM ET</span>
            </div>
          </div>
          <Button 
            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            onClick={() => onFeatureClick("workshops")}
          >
            Register Now
          </Button>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-900/30 rounded-full">
              <Users className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Building a Wellness-Focused Team</h3>
          </div>
          <p className="text-white/70 mb-4">
            Learn how to create a workplace culture that supports mental health for all team members.
          </p>
          <div className="mb-4 p-2 bg-amber-900/20 rounded-lg text-sm text-white/70">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-amber-400" />
              <span>April 26, 2025 - 1:00 PM ET</span>
            </div>
          </div>
          <Button 
            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            onClick={() => onFeatureClick("workshops")}
          >
            Register Now
          </Button>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-900/30 rounded-full">
              <FileText className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">All Small Business Workshops</h3>
          </div>
          <p className="text-white/70 mb-4">
            Browse our full catalog of workshops specifically designed for small business owners and employees.
          </p>
          <Button 
            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            onClick={() => onFeatureClick("workshops")}
          >
            View All Workshops
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopsTab;
