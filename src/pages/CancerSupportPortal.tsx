
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
    console.log("[CancerSupportPortal] Navigating to:", path);
    
    toast({
      title: isSpanish ? "Accediendo a Recursos Especializados" : "Accessing Specialized Resources",
      description: isSpanish ? "Cargando contenido específico de apoyo contra el cáncer" : "Loading specific cancer support content",
      duration: 2000
    });
    
    // Enhanced path handling for cancer support
    let finalPath = path;
    
    // Handle both absolute and relative paths
    if (!path.startsWith('/')) {
      finalPath = `/cancer-support/${path}`;
    }
    
    // Special handling for remembrance resources
    if (path.includes('memorial') || path.includes('grief') || path.includes('legacy') || path.includes('bereavement')) {
      // These are already properly mapped in App.tsx
      finalPath = path.startsWith('/') ? path : `/${path}`;
    }
    
    console.log("[CancerSupportPortal] Final navigation path:", finalPath);
    
    navigate(finalPath, { 
      state: { 
        fromCancerSupport: true, 
        preventTutorial: true,
        returnToPortal: "/cancer-support-portal",
        cancerSupportContext: true,
        specializedContent: true,
        portalTab: activeTab
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
        return <PatientsTab onFeatureClick={handleFeatureClick} />;
    }
  };

  return (
    <Page title={isSpanish ? "Portal de Apoyo para el Cáncer" : "Cancer Support Portal"} returnToMain>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 dark:from-rose-900 dark:via-pink-900 dark:to-purple-900">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {isSpanish ? "Portal de Apoyo para el Cáncer" : "Cancer Support Portal"}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                {isSpanish 
                  ? "Recursos completos y apoyo para pacientes, cuidadores y familias afectadas por el cáncer" 
                  : "Comprehensive resources and support for patients, caregivers, and families affected by cancer"}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-rose-200/50 dark:border-rose-800/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>
      </div>
    </Page>
  );
};

export default CancerSupportPortal;
