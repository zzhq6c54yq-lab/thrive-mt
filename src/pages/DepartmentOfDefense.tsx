
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { inspirationalQuotes } from "@/data/militaryEducationalData";
import HomeButton from "@/components/HomeButton";

// Imported components
import InitialMessage from "@/components/military/InitialMessage";
import WelcomeScreen from "@/components/military/WelcomeScreen";
import CrisisResourcesBar from "@/components/military/CrisisResourcesBar";
import QuoteOfTheDay from "@/components/military/QuoteOfTheDay";
import TabNavigation from "@/components/military/TabNavigation";
import PortalHeader from "@/components/military/PortalHeader";
import DashboardTabContent from "@/components/military/DashboardTabContent";
import GenericTabContent from "@/components/military/GenericTabContent";

const DepartmentOfDefense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Show initial deep message for 8 seconds, then transition to welcome
    if (showInitialMessage) {
      console.log("Showing initial message");
      const timer = setTimeout(() => {
        console.log("Timer expired, transitioning to welcome screen");
        setShowInitialMessage(false);
        setShowWelcome(true);
      }, 8000); // 8 seconds
      return () => clearTimeout(timer);
    }
    
    // Welcome screen stays until user clicks Enter Portal
    // No automatic transition anymore
  }, [showInitialMessage]);

  useEffect(() => {
    // Rotate quotes every 8 seconds
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % inspirationalQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleButtonClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} feature will be available soon`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    console.log("Tab changed to:", value);
  };

  // Deep care-filled message screen
  if (showInitialMessage) {
    console.log("Rendering initial message");
    return <InitialMessage />;
  }

  // Welcome screen that stays until user clicks Enter Portal
  if (showWelcome) {
    console.log("Rendering welcome screen");
    return <WelcomeScreen onEnterPortal={() => setShowWelcome(false)} />;
  }

  // Main content - only shown after clicking Enter Portal
  console.log("Rendering main DoD content");
  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <Helmet>
        <title>Department of Defense Mental Health Portal | Thrive MT</title>
        <meta name="description" content="Specialized mental health resources for active duty military, veterans, and their families." />
      </Helmet>

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0A1929]/80 to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <PortalHeader />
            <HomeButton className="bg-[#0A1929]/80 border border-[#B87333]/30" />
          </div>

          {/* Persistent Menu Bar - Always visible under header */}
          <div className="sticky top-0 z-30 bg-[#0A1929]/95 border-b border-[#B87333]/30 mb-6 pb-2 backdrop-blur-sm">
            <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />
          </div>

          <CrisisResourcesBar />

          {/* Quote of the Day */}
          <QuoteOfTheDay quote={inspirationalQuotes[currentQuote]} />

          <div className="my-8">
            <Tabs value={activeTab} className="w-full">
              {/* Tab Content */}
              <TabsContent value="dashboard" className="space-y-8">
                <DashboardTabContent />
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-8">
                <GenericTabContent 
                  title="Military-Specific Resources" 
                  description="Curated content for service members and veterans"
                  type="resources" 
                />
              </TabsContent>
              
              <TabsContent value="education" className="space-y-8">
                <GenericTabContent 
                  title="Education & Resources" 
                  description="Learn about mental health and wellness"
                  type="education" 
                />
              </TabsContent>
              
              <TabsContent value="assessments" className="space-y-8">
                <GenericTabContent 
                  title="Mental Health Assessments" 
                  description="Professional-grade assessments tailored for military personnel"
                  type="assessments" 
                />
              </TabsContent>
              
              <TabsContent value="programs" className="space-y-8">
                <GenericTabContent 
                  title="Specialized Programs" 
                  description="Programs designed for the unique needs of military personnel"
                  type="programs" 
                />
              </TabsContent>
              
              <TabsContent value="profile" className="space-y-8">
                <GenericTabContent 
                  title="My Profile" 
                  description="View and update your personal information"
                  type="profile" 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentOfDefense;
