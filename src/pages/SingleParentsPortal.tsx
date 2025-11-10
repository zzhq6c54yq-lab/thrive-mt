import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import useTranslation from "@/hooks/useTranslation";

// Tab components will be imported once created
const ParentWellnessTab = React.lazy(() => import("@/components/single-parents/ParentWellnessTab"));
const ParentingToolsTab = React.lazy(() => import("@/components/single-parents/ParentingToolsTab"));
const ParentNetworkTab = React.lazy(() => import("@/components/single-parents/ParentNetworkTab"));
const ResourcesTab = React.lazy(() => import("@/components/single-parents/ResourcesTab"));
const WorkshopsTab = React.lazy(() => import("@/components/single-parents/WorkshopsTab"));
const TabNavigation = React.lazy(() => import("@/components/single-parents/TabNavigation"));
const PortalHeader = React.lazy(() => import("@/components/single-parents/PortalHeader"));

type TabType = 'wellness' | 'tools' | 'network' | 'resources' | 'workshops';

const SingleParentsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('wellness');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

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
      case 'wellness':
        return <ParentWellnessTab onFeatureClick={handleFeatureClick} />;
      case 'tools':
        return <ParentingToolsTab onFeatureClick={handleFeatureClick} />;
      case 'network':
        return <ParentNetworkTab onFeatureClick={handleFeatureClick} />;
      case 'resources':
        return <ResourcesTab onFeatureClick={handleFeatureClick} />;
      case 'workshops':
        return <WorkshopsTab onFeatureClick={handleFeatureClick} />;
      default:
        return null;
    }
  };

  return (
    <Page title={isSpanish ? "Portal de Padres Solteros" : "Single Parents Portal"} returnToMain>
      <div className="space-y-6">
        <PortalHeader />

        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="p-6">
            <React.Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
              {renderTabContent()}
            </React.Suspense>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SingleParentsPortal;
