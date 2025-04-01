import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Sparkles } from "lucide-react";

import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import NewFeatures from "@/components/dashboard/NewFeatures";
import InsightsSection from "@/components/dashboard/InsightsSection";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";

interface MainDashboardProps {
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  showHenry: boolean;
  toggleHenry: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ 
  selectedQualities, 
  selectedGoals, 
  navigateToFeature,
  showHenry,
  toggleHenry
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showGratitude, setShowGratitude] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false);

  const handleGratitudeToggle = () => {
    setShowGratitude(prev => !prev);
  };

  const handleQuizzesToggle = () => {
    setShowQuizzes(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] pb-20">
      <header className="py-6 px-4">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
              alt="Thrive Logo"
              className="h-10 w-auto mr-4 rounded-full shadow-md"
            />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
              Thrive Mental Wellness
            </h1>
          </div>
          
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigateToFeature("/profile")}>
              My Profile
            </Button>
            <Button onClick={toggleHenry}>
              {showHenry ? "Hide Assistant" : "Show Assistant"}
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container max-w-6xl mx-auto px-4">
        <ThriveHeader
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
        />
        
        {/* Add prominent button for new wellness features right after the header */}
        <div className="flex justify-center mb-10">
          <Button 
            onClick={() => navigate('/wellness-features')}
            className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:from-[#A86323] hover:to-[#8b77e5] text-white font-medium py-6 px-8 h-auto text-lg shadow-lg transform transition hover:scale-105"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Explore All Wellness Features
          </Button>
        </div>
        
        <UpcomingAppointments />
        
        <KeyFeatures navigateToFeature={navigateToFeature} />
        
        <FeaturedWorkshops />
        
        <NewFeatures />
        
        <InsightsSection />
        
        <GratitudeVisualizer />
        
        <QuizzesSection />
        
        {/* Add a section highlighting the new wellness features */}
        <div className="mb-12 p-6 bg-gradient-to-r from-[#1E1E2D]/90 to-[#2D2D3D]/90 backdrop-blur-sm rounded-xl border border-[#B87333]/20 relative overflow-hidden mt-8">
          <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
            New Wellness Tools Available
          </h2>
          
          <p className="text-white/80 mb-6">
            We've added 10 powerful tools to help with your mental health journey, including mood tracking, 
            meditation library, crisis resources, and more.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {["Mood Tracking", "Guided Meditation", "Peer Support", 
              "Crisis Resources", "Appointment Scheduling", "Progress Tracking"].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#B87333]/20 flex items-center justify-center text-[#B87333]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/wellness-features')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-6"
            >
              Explore All 10 Features
            </Button>
          </div>
        </div>
        
        <SpecializedPrograms />
        
        <footer className="py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Thrive Mental Wellness. All rights reserved.</p>
          <p className="mt-2">
            <a href="/privacy-security" className="hover:underline">Privacy & Security</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainDashboard;
