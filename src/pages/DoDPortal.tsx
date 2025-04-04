
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Book, CalendarCheck, Clipboard, Activity, Home } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DoDDashboard from "@/components/military/DoDDashboard";
import DoDResources from "@/components/military/DoDResources";
import DoDWorkshops from "@/components/military/DoDWorkshops";
import DoDAssessments from "@/components/military/DoDAssessments";
import DoDCommunity from "@/components/military/DoDCommunity";

const DoDPortal = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Apply military theme class to body on component mount
  useEffect(() => {
    document.body.classList.add('military-theme');
    
    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('military-theme');
    };
  }, []);

  const handleContinue = () => {
    setShowWelcome(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Welcome screen content
  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0C10] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/95 via-[#0A0C10]/90 to-[#0A0C10]/95 z-10"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png')] bg-cover bg-center opacity-10"></div>
        </div>
        
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleBack}
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Shield className="h-16 w-16 text-blue-400 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Department of Defense
              <span className="block text-lg md:text-xl mt-2 text-blue-400">Mental Health Support Portal</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Supporting the mental health and wellbeing of active duty military personnel, veterans, and their families with specialized resources, tools, and professional support.
            </p>

            <div className="bg-blue-900/20 border border-blue-400/20 rounded-lg p-6 mb-8 max-w-2xl w-full">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Our Mission</h2>
              <p className="text-white/70 mb-4">
                To provide comprehensive mental health support tailored to the unique needs and experiences of military personnel and their families, ensuring they have the resources they need to thrive both in service and beyond.
              </p>
              <p className="text-white/70">
                This portal offers specialized mental health resources, confidential assessments, peer support programs, and crisis intervention services designed specifically for the military community.
              </p>
            </div>

            <Button 
              onClick={handleContinue}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 rounded-md text-lg"
            >
              Enter Military Support Portal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main portal with tabbed interface
  return (
    <Page className="military-theme bg-[#0A0C10] min-h-screen" title="Military Support Portal">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-white">
              <span className="text-blue-400">DoD</span> Mental Health Portal
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-red-700/20 hover:bg-red-700/30 text-white border-red-700/50"
              onClick={() => navigate('/crisis-support')}
            >
              Emergency Resources
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-8 bg-[#141921] border border-blue-900/30">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              <Shield className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              <Book className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            
            <TabsTrigger 
              value="workshops" 
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              <CalendarCheck className="h-4 w-4 mr-2" />
              Workshops
            </TabsTrigger>
            
            <TabsTrigger 
              value="assessments" 
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              <Clipboard className="h-4 w-4 mr-2" />
              Assessments
            </TabsTrigger>
            
            <TabsTrigger 
              value="community" 
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              <Activity className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>
          
          <div className="px-4">
            <TabsContent value="dashboard">
              <DoDDashboard />
            </TabsContent>
            
            <TabsContent value="resources">
              <DoDResources />
            </TabsContent>
            
            <TabsContent value="workshops">
              <DoDWorkshops />
            </TabsContent>
            
            <TabsContent value="assessments">
              <DoDAssessments />
            </TabsContent>
            
            <TabsContent value="community">
              <DoDCommunity />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Page>
  );
};

export default DoDPortal;
