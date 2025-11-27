
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UtensilsCrossed, BarChart4, ClipboardList, BookOpen, Users, CalendarDays } from "lucide-react";
import HospitalityDashboard from "@/components/hospitality/HospitalityDashboard";
import HospitalityAssessments from "@/components/hospitality/HospitalityAssessments";
import HospitalityResources from "@/components/hospitality/HospitalityResources";
import HospitalityCommunity from "@/components/hospitality/HospitalityCommunity";
import HospitalityWorkshops from "@/components/hospitality/HospitalityWorkshops";
import HomeButton from "@/components/HomeButton";

const HospitalityPortal: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // Set the active tab based on location state, if available
    if (location.state?.tab) {
      return location.state.tab;
    }
    return "dashboard";
  });

  return (
    <Page title="Hospitality Industry Portal" showBackButton={false}>
      <div className="absolute top-4 right-4 z-10">
        <HomeButton />
      </div>
      
      <div className="flex items-center mb-8">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
          <UtensilsCrossed className="h-8 w-8 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Hospitality Wellness Portal
          </h1>
          <p className="text-white/70">
            Mental health resources tailored for restaurant and hospitality professionals
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Assessments</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
          </TabsTrigger>
          <TabsTrigger value="workshops" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Workshops</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <HospitalityDashboard />
        </TabsContent>
        
        <TabsContent value="assessments">
          <HospitalityAssessments />
        </TabsContent>
        
        <TabsContent value="resources">
          <HospitalityResources />
        </TabsContent>
        
        <TabsContent value="community">
          <HospitalityCommunity />
        </TabsContent>
        
        <TabsContent value="workshops">
          <HospitalityWorkshops />
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default HospitalityPortal;
