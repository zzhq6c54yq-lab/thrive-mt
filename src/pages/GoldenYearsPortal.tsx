
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ThriveButton from "@/components/navigation/ThriveButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import useFeatureActions, { ActionButtonConfig } from "@/hooks/useFeatureActions";
import { BookOpen, Calendar, Users, HeartHandshake, LifeBuoy, Lightbulb, Clock, Globe } from "lucide-react";

const GoldenYearsPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { handleActionClick } = useFeatureActions();
  
  const handleFeatureClick = (feature: string) => {
    // If it's the Legacy Journal, navigate directly to the journal page
    if (feature === "Legacy Journal") {
      navigate("/golden-years-journal", {
        state: { 
          stayInPortal: true,
          preventTutorial: true,
          portalPath: '/golden-years-portal'
        }
      });
      return;
    }
    
    // For other features, use the ActionConfig with proper configuration
    const actionConfig: ActionButtonConfig = {
      type: 'other',
      title: feature,
      path: `/golden-years-portal/${feature.toLowerCase().replace(/\s+/g, '-')}`
    };

    // Show a toast notification about the feature
    toast({
      title: `Accessing ${feature}`,
      description: "This feature is coming soon. Please check back later.",
      duration: 3000
    });
    
    // Use handleActionClick from useFeatureActions for consistent navigation behavior
    handleActionClick(actionConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#034b45] via-[#046b62] to-[#067b6d] text-white">
      {/* Navigation bar */}
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title="Golden Years Journey"
        portalMode={true}
        portalPath="/golden-years-welcome"
      />
      
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold mb-4">Welcome to Your Golden Years Journey</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Explore resources designed to enhance your wellbeing, connect with others, and embrace this meaningful time of life.
          </p>
        </div>
        
        {/* Featured Content */}
        <div className="bg-teal-900/30 backdrop-blur-md border border-teal-200/30 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-medium mb-4 flex items-center">
            <Lightbulb className="mr-2 h-6 w-6 text-teal-300" />
            Featured: Legacy Journal
          </h2>
          <p className="mb-6 text-teal-50">
            Preserve your life story, wisdom, and memories for future generations. Our guided journaling 
            experience helps you document your journey in a meaningful way that can be shared with loved ones.
          </p>
          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white px-6"
            onClick={() => handleFeatureClick("Legacy Journal")}
          >
            Start Your Journal
          </Button>
        </div>
        
        {/* Main Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Wellness Resources */}
          <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-200/20 rounded-xl p-6 hover:bg-teal-900/30 transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">Wellness Resources</h3>
              <div className="p-2 bg-teal-600/40 rounded-full">
                <HeartHandshake className="h-5 w-5 text-teal-200" />
              </div>
            </div>
            <p className="mb-6 text-teal-100">
              Age-appropriate exercises, nutrition advice, and mental wellness practices designed specifically for seniors.
            </p>
            <Button 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleFeatureClick("Wellness Resources")}
            >
              Explore Resources
            </Button>
          </div>
          
          {/* End-of-Life Planning */}
          <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-200/20 rounded-xl p-6 hover:bg-teal-900/30 transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">End-of-Life Planning</h3>
              <div className="p-2 bg-teal-600/40 rounded-full">
                <BookOpen className="h-5 w-5 text-teal-200" />
              </div>
            </div>
            <p className="mb-6 text-teal-100">
              Thoughtful resources to help with advance care planning, will preparation, and ensuring your wishes are documented.
            </p>
            <Button 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleFeatureClick("End-of-Life Planning")}
            >
              Access Planning Tools
            </Button>
          </div>
          
          {/* Community Connections */}
          <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-200/20 rounded-xl p-6 hover:bg-teal-900/30 transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">Community Connections</h3>
              <div className="p-2 bg-teal-600/40 rounded-full">
                <Users className="h-5 w-5 text-teal-200" />
              </div>
            </div>
            <p className="mb-6 text-teal-100">
              Connect with peers, join discussion groups, and find community events in your area.
            </p>
            <Button 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleFeatureClick("Community Connections")}
            >
              Join Community
            </Button>
          </div>
          
          {/* Memory & Cognitive Health */}
          <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-200/20 rounded-xl p-6 hover:bg-teal-900/30 transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">Memory & Cognitive Health</h3>
              <div className="p-2 bg-teal-600/40 rounded-full">
                <Lightbulb className="h-5 w-5 text-teal-200" />
              </div>
            </div>
            <p className="mb-6 text-teal-100">
              Brain exercises, memory techniques, and activities to maintain cognitive function and mental sharpness.
            </p>
            <Button 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleFeatureClick("Memory and Cognitive Health")}
            >
              Brain Fitness
            </Button>
          </div>
          
          {/* Life Transitions */}
          <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-200/20 rounded-xl p-6 hover:bg-teal-900/30 transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">Life Transitions</h3>
              <div className="p-2 bg-teal-600/40 rounded-full">
                <Clock className="h-5 w-5 text-teal-200" />
              </div>
            </div>
            <p className="mb-6 text-teal-100">
              Resources for major life changes: retirement, downsizing, loss of a spouse, and adapting to changing health needs.
            </p>
            <Button 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleFeatureClick("Life Transitions")}
            >
              Explore Guidance
            </Button>
          </div>
          
          {/* Family Connection Tools */}
          <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-200/20 rounded-xl p-6 hover:bg-teal-900/30 transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium">Family Connection Tools</h3>
              <div className="p-2 bg-teal-600/40 rounded-full">
                <Globe className="h-5 w-5 text-teal-200" />
              </div>
            </div>
            <p className="mb-6 text-teal-100">
              Tools to strengthen bonds with children and grandchildren, create memories, and bridge generational gaps.
            </p>
            <Button 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleFeatureClick("Family Connection Tools")}
            >
              Connect with Family
            </Button>
          </div>
        </div>
        
        {/* Calendar/Upcoming Events */}
        <div className="bg-teal-800/30 backdrop-blur-md border border-teal-200/30 rounded-xl p-6 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-teal-300" />
              Upcoming Events
            </h2>
            <Button 
              variant="outline" 
              className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
              onClick={() => handleFeatureClick("Calendar")}
            >
              View All Events
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="bg-teal-700/30 p-4 rounded-lg cursor-pointer hover:bg-teal-700/40 transition"
              onClick={() => handleFeatureClick("Virtual Wellness Workshop")}
            >
              <p className="text-teal-200 text-sm">June 20, 2025 • 2:00 PM</p>
              <h4 className="font-medium mb-1">Virtual Wellness Workshop</h4>
              <p className="text-sm text-teal-100">Learn gentle exercises you can do at home to maintain mobility.</p>
            </div>
            
            <div 
              className="bg-teal-700/30 p-4 rounded-lg cursor-pointer hover:bg-teal-700/40 transition"
              onClick={() => handleFeatureClick("Memory Sharing Circle")}
            >
              <p className="text-teal-200 text-sm">June 25, 2025 • 3:30 PM</p>
              <h4 className="font-medium mb-1">Memory Sharing Circle</h4>
              <p className="text-sm text-teal-100">Join our virtual circle to share stories from your past with peers.</p>
            </div>
          </div>
        </div>
        
        {/* Support Resources */}
        <div className="bg-red-900/20 border border-red-300/30 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <LifeBuoy className="h-5 w-5 text-red-300 mr-2" />
              <h3 className="font-medium text-lg">Need Assistance?</h3>
            </div>
            <p className="text-sm text-red-100">Resources for emergency help, caregiver support, or technical assistance.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              className="bg-red-700 hover:bg-red-800 text-white"
              onClick={() => handleFeatureClick("Emergency Resources")}
            >
              Emergency Resources
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-red-400 text-red-100 hover:bg-red-900/50"
              onClick={() => handleFeatureClick("Technical Support")}
            >
              Technical Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenYearsPortal;
