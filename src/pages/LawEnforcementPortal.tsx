
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, BookOpen, HeartPulse, Calendar, Users, AlertCircle, Video } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import LawEnforcementResources from "@/components/law-enforcement/LawEnforcementResources";
import LawEnforcementCommunity from "@/components/law-enforcement/LawEnforcementCommunity";
import LawEnforcementAssessments from "@/components/law-enforcement/LawEnforcementAssessments";
import LawEnforcementWorkshops from "@/components/law-enforcement/LawEnforcementWorkshops";

const LawEnforcementPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>('dashboard');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para personal de la ley" : "Accessing specific resources for law enforcement personnel",
      duration: 2000
    });
    
    if (feature === "resources") {
      setActiveTab("resources");
    } else if (feature === "workshops") {
      setActiveTab("workshops");
    } else if (feature === "community-support") {
      setActiveTab("community");
    } else if (feature === "mental-wellness/assessments") {
      setActiveTab("assessments");
    } else {
      navigate(`/${feature}`, { 
        state: { 
          fromSpecializedProgram: true,
          preventTutorial: true,
          returnToPortal: "/law-enforcement-portal",
          portalState: {
            activeTab,
            returnToMain: location.state?.returnToMain,
            preventTutorial: location.state?.preventTutorial
          }
        }
      });
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  return (
    <Page 
      title={isSpanish ? "Portal de Fuerzas del Orden" : "Law Enforcement Portal"} 
      returnToMain={location.state?.returnToMain}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#0c193d] to-[#0d2563] p-6 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Shield className="h-10 w-10 text-[#0EA5E9]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para Personal de las Fuerzas del Orden" : "Resources for Law Enforcement Personnel"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para profesionales de las fuerzas del orden y personal de seguridad."
                  : "Specialized mental wellness resources designed specifically for law enforcement professionals and security personnel."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1319] border border-blue-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'dashboard' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('workshops')}
            >
              Workshops
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="p-4 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
                      <HeartPulse className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Stress Management</h3>
                    <p className="text-white/70 mb-4">
                      Access specialized tools and resources for managing law enforcement-specific stress.
                    </p>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleFeatureClick("stress-management")}
                    >
                      Access Resources
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="p-4 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Peer Support</h3>
                    <p className="text-white/70 mb-4">
                      Connect with fellow officers and access peer support resources.
                    </p>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleFeatureClick("peer-support")}
                    >
                      Join Network
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="p-4 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
                      <AlertCircle className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Critical Incident Support</h3>
                    <p className="text-white/70 mb-4">
                      Access immediate support and resources for critical incident management.
                    </p>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleFeatureClick("critical-support")}
                    >
                      Get Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'resources' && <LawEnforcementResources />}
            {activeTab === 'community' && <LawEnforcementCommunity />}
            {activeTab === 'assessments' && <LawEnforcementAssessments />}
            {activeTab === 'workshops' && <LawEnforcementWorkshops />}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default LawEnforcementPortal;
