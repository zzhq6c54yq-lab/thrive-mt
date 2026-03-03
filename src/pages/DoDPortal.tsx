
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, Globe, BookOpen, HeartPulse, Calendar, Zap, AlertCircle, Video, FileText, Award, Star, Flag, MapPin, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import DoDDashboard from "@/components/military/DoDDashboard";
import DoDCommunity from "@/components/military/DoDCommunity";
import DoDResources from "@/components/military/DoDResources";
import DoDWorkshops from "@/components/military/DoDWorkshops";
import DoDAssessments from "@/components/military/DoDAssessments";
import PortalHenrySection from "@/components/henry/PortalHenrySection";

const DoDPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops'>('dashboard');
  
  // Get state from location to maintain context between navigations
  const returnToMain = location.state?.returnToMain || false;
  const preventTutorial = location.state?.preventTutorial || false;
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para personal militar" : "Accessing specific resources for military personnel",
      duration: 2000
    });
    
    // For specialized DoD content, we'll show the appropriate tab
    if (feature === "resources") {
      setActiveTab("resources");
    } else if (feature === "workshops") {
      setActiveTab("workshops");
    } else if (feature === "community-support") {
      setActiveTab("community");
    } else if (feature === "mental-wellness/assessments") {
      setActiveTab("assessments");
    } else {
      // For other features, navigate as before but maintain context
      navigate(`/app/${feature}`, { 
        state: { 
          fromSpecializedProgram: true,
          preventTutorial: true,
          returnToPortal: "/app/dod-portal", // Add this to enable returning to portal
          portalState: {
            activeTab,
            returnToMain,
            preventTutorial
          }
        }
      });
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  // Use the real DoDCommunity component instead of inline placeholder

  return (
    <Page 
      title={isSpanish ? "Militares y Veteranos" : "Military and Veterans"} 
      returnToMain={returnToMain}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#0c193d] to-[#0d2563] p-6 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-lg relative overflow-hidden">
          {/* Patriotic flag background element */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5">
              {/* Red and white stripes */}
              <div className="absolute bottom-0 left-0 right-0 h-full">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-[14.28%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                  />
                ))}
              </div>
              
              {/* Blue field with stars */}
              <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-900">
                <div className="grid grid-cols-5 gap-2 p-2">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <Star className="h-2 w-2 text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Shield className="h-10 w-10 text-[#0EA5E9]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-red-400" />
                <Star className="h-4 w-4 text-white" />
                <Star className="h-4 w-4 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para el Personal Militar y Veteranos" : "Resources for Military Personnel & Veterans"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para miembros actuales y anteriores de las fuerzas armadas y sus familias."
                  : "Specialized mental wellness resources designed specifically for current and former members of the armed forces and their families."}
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
              <>
                <PortalHenrySection 
                  portalName="Military & Veterans"
                  portalMessage="I understand your unique challenges as a service member or veteran. Whether you're dealing with deployment stress, transition challenges, or anything else, I'm here to support you. You've served with honor - now let's focus on your wellbeing."
                  quickActions={[
                    { 
                      label: "PTSD Resources", 
                      onClick: () => handleFeatureClick("resources") 
                    },
                    { 
                      label: "Veteran Support", 
                      onClick: () => handleFeatureClick("community-support") 
                    }
                  ]}
                  accentColor="#0EA5E9"
                  className="mb-6"
                />
                <DoDDashboard />
              </>
            )}
            {activeTab === 'resources' && <DoDResources />}
            {activeTab === 'community' && <DoDCommunity />}
            {activeTab === 'assessments' && <DoDAssessments />}
            {activeTab === 'workshops' && <DoDWorkshops />}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DoDPortal;
