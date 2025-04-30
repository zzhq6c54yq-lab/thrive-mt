
import React, { useState } from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import EducatorsAssessments from "@/components/educators/EducatorsAssessments";
import EducatorsWorkshops from "@/components/educators/EducatorsWorkshops";
import EducatorsCommunity from "@/components/educators/EducatorsCommunity";
import EducatorsResources from "@/components/educators/EducatorsResources";
import EducatorsDashboard from "@/components/educators/EducatorsDashboard";

const EducatorsPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Check if we have a tab specified in the state
  React.useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL without navigating
    navigate(`/educators-portal`, {
      state: {
        ...location.state,
        tab: value,
        stayInPortal: true,
        preventTutorial: true
      }
    });
  };

  return (
    <Page title="Esteemed Educators Portal" showBackButton={false}>
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Esteemed Educators Mental Health Portal
        </h1>
        <p className="text-purple-100 mt-2">
          Resources, support, and community for education professionals
        </p>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-auto">
          <TabsTrigger value="dashboard" className="text-md">Dashboard</TabsTrigger>
          <TabsTrigger value="assessments" className="text-md">Assessments</TabsTrigger>
          <TabsTrigger value="workshops" className="text-md">Workshops</TabsTrigger>
          <TabsTrigger value="community" className="text-md">Community</TabsTrigger>
          <TabsTrigger value="resources" className="text-md">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0">
          <EducatorsDashboard />
        </TabsContent>

        <TabsContent value="assessments" className="mt-0">
          <EducatorsAssessments />
        </TabsContent>

        <TabsContent value="workshops" className="mt-0">
          <EducatorsWorkshops />
        </TabsContent>

        <TabsContent value="community" className="mt-0">
          <EducatorsCommunity />
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <EducatorsResources />
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default EducatorsPortal;
