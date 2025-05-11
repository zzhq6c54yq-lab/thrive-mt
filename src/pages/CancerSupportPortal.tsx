
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import useTranslation from "@/hooks/useTranslation";
import TabNavigation from "@/components/cancer-support/TabNavigation";
import PortalHeader from "@/components/cancer-support/PortalHeader";
import PatientsTab from "@/components/cancer-support/PatientsTab";
import CaregiversTab from "@/components/cancer-support/CaregiversTab";
import ResourcesTab from "@/components/cancer-support/ResourcesTab";
import CommunitiesTab from "@/components/cancer-support/CommunitiesTab";
import RemembranceTab from "@/components/cancer-support/RemembranceTab";
import ChildrenTab from "@/components/cancer-support/ChildrenTab";

const CancerSupportPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children'>('patients');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  // Set active tab based on URL params if they exist
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'caregivers' || tab === 'resources' || tab === 'communities' || 
        tab === 'remembrance' || tab === 'children') {
      setActiveTab(tab as any);
    }
  }, [location.search]);

  const handleTabChange = (tab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children') => {
    setActiveTab(tab);
  };

  const handleFeatureClick = (path: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: isSpanish ? "Accediendo a recursos específicos" : "Accessing specific cancer support resources",
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
      case 'patients':
        return <PatientsTab onFeatureClick={handleFeatureClick} />;
      case 'caregivers':
        return <CaregiversTab onFeatureClick={handleFeatureClick} />;
      case 'resources':
        return <ResourcesTab onFeatureClick={handleFeatureClick} />;
      case 'communities':
        return <CommunitiesTab onFeatureClick={handleFeatureClick} />;
      case 'remembrance':
        return <RemembranceTab onFeatureClick={handleFeatureClick} />;
      case 'children':
        return <ChildrenTab onFeatureClick={handleFeatureClick} />;
      default:
        return null;
    }
  };

  return (
    <Page title={isSpanish ? "Portal de Apoyo para el Cáncer" : "Cancer Support Portal"} returnToMain>
      <div className="space-y-6">
        <PortalHeader />

        <div className="bg-[#FDF2F2] dark:bg-[#1F1A1A] border border-rose-300/30 dark:border-rose-500/20 rounded-lg overflow-hidden shadow-lg">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CancerSupportPortal;
