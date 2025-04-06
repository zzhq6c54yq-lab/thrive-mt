
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import useTranslation from "@/hooks/useTranslation";
import PortalHeader from "@/components/small-business/PortalHeader";
import TabNavigation from "@/components/small-business/TabNavigation";
import BusinessOwnerTab from "@/components/small-business/BusinessOwnerTab";
import EmployeeTab from "@/components/small-business/EmployeeTab";
import ResourcesTab from "@/components/small-business/ResourcesTab";
import WorkshopsTab from "@/components/small-business/WorkshopsTab";

const SmallBusinessPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'employee' | 'resources' | 'workshops'>('business');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  // Set active tab based on URL params if they exist
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'employee') {
      setActiveTab('employee');
    }
  }, [location.search]);

  const handleTabChange = (tab: 'business' | 'employee' | 'resources' | 'workshops') => {
    setActiveTab(tab);
  };

  const handleFeatureClick = (path: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: isSpanish ? "Accediendo a recursos específicos" : "Accessing specific resources",
      duration: 2000
    });
    
    navigate(`/${path}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return <BusinessOwnerTab onFeatureClick={handleFeatureClick} />;
      case 'employee':
        return <EmployeeTab onFeatureClick={handleFeatureClick} />;
      case 'resources':
        return <ResourcesTab onFeatureClick={handleFeatureClick} />;
      case 'workshops':
        return <WorkshopsTab onFeatureClick={handleFeatureClick} />;
      default:
        return null;
    }
  };

  return (
    <Page title={isSpanish ? "Portal de Pequeñas Empresas" : "Small Business Portal"} returnToMain>
      <div className="space-y-6">
        <PortalHeader />

        <div className="bg-[#1A1811] border border-amber-900/30 rounded-lg overflow-hidden shadow-lg">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SmallBusinessPortal;
