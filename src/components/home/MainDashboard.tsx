
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import InsightsSection from "@/components/dashboard/InsightsSection";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/dashboard/NewFeatures";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import GratitudeVisualizer from "@/components/mental-wellness/GratitudeVisualizer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showGratitudeVisualizer, setShowGratitudeVisualizer] = useState(false);
  
  // Function to handle featured workshop clicks
  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: "Opening Workshop",
      description: `Loading "${workshopTitle}" workshop content...`,
      duration: 1500
    });
    
    // Based on the workshop ID, navigate to the appropriate content
    switch(workshopId) {
      case "mindful-communication":
        navigate("/workshop/mindful-communication", { 
          state: { workshopTitle: "Mindful Communication" } 
        });
        break;
      case "emotional-regulation":
        navigate("/workshop/emotional-regulation", {
          state: { workshopTitle: "Emotional Regulation" }
        });
        break;
      case "stress-management":
        navigate("/workshop/stress-management", {
          state: { workshopTitle: "Stress Management" }
        });
        break;
      default:
        // If it's a military workshop
        if (workshopId.startsWith("military-")) {
          const militaryWorkshopId = workshopId.replace("military-", "");
          navigate(`/military-workshop/${militaryWorkshopId}`);
        } 
        // If it's a corporate workshop
        else if (workshopId.startsWith("corporate-")) {
          const corporateWorkshopId = workshopId.replace("corporate-", "");
          navigate("/corporate-wellness", { 
            state: { 
              workshop: workshopTitle, 
              showWorkshopContent: true 
            } 
          });
        }
        // For any other workshop type
        else {
          navigate(`/workshop/${workshopId}`);
        }
    }
  };
  
  const handleCloseGratitudeVisualizer = () => {
    setShowGratitudeVisualizer(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pt-6 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.03%22/></svg>')] opacity-20"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#B87333]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#9b87f5]/5 to-transparent blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#B87333]/3 via-[#E5C5A1]/5 to-[#B87333]/3 transform -skew-y-3"></div>
        <div className="absolute top-10 left-0 right-0 h-32 bg-gradient-to-r from-[#E5C5A1]/2 via-[#B87333]/4 to-[#E5C5A1]/2 transform skew-y-2" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-r from-[#B87333]/3 via-[#E5C5A1]/5 to-[#B87333]/3 transform -skew-y-2"></div>
      </div>
      
      <Header />
      
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />

      <NewFeatures />

      <div className="container mx-auto max-w-6xl px-4 py-6 relative z-10">
        {/* Gratitude Visualizer Section */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border-violet-500/20 shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-medium flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-400" />
                Daily Gratitude Visualizer
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-violet-200 hover:text-white hover:bg-violet-800/40"
                onClick={() => setShowGratitudeVisualizer(!showGratitudeVisualizer)}
              >
                {showGratitudeVisualizer ? "Close" : "Open"} Visualizer
              </Button>
            </CardHeader>
            <CardContent>
              {showGratitudeVisualizer ? (
                <GratitudeVisualizer onClose={handleCloseGratitudeVisualizer} />
              ) : (
                <p className="text-violet-200 text-sm">
                  Create visual representations of what you're grateful for today. Express your gratitude through beautiful imagery and affirmations.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <SpecializedPrograms />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <UpcomingAppointments />
          <InsightsSection />
          <QuizzesSection />
        </div>
        
        <FeaturedWorkshops 
          navigate={navigate} 
          onWorkshopClick={handleWorkshopClick}
        />

        <KeyFeatures />
      </div>
    </div>
  );
};

export default MainDashboard;
