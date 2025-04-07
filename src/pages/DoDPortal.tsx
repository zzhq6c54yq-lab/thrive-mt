
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, Briefcase, Globe, BookOpen, HeartPulse, Calendar, Zap, AlertCircle, Video, FileText, Award, Star, Flag, MapPin, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import DoDDashboard from "@/components/military/DoDDashboard";
import DoDResources from "@/components/military/DoDResources";
import DoDWorkshops from "@/components/military/DoDWorkshops";
import DoDAssessments from "@/components/military/DoDAssessments";

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
      navigate(`/${feature}`, { 
        state: { 
          fromSpecializedProgram: true,
          preventTutorial: true,
          returnToPortal: "/dod-portal",
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

  // Military community support content
  const CommunitySupport = () => (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Military Community Support</h2>
        <p className="text-blue-200/80 mb-6">
          Connect with fellow service members, veterans, and military families who understand your unique experiences.
        </p>
      </div>
      
      {/* Featured Community Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
          <CardContent className="p-6">
            <div className="p-4 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Combat Veterans Group</h3>
            <p className="text-white/70 mb-4">
              A peer support group for veterans who have experienced combat, focusing on shared understanding and mutual support.
            </p>
            <div className="flex justify-between items-center text-sm text-blue-300/70 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>427 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Weekly meetings</span>
              </div>
            </div>
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => {
                toast({
                  title: "Group Joined",
                  description: "You've successfully joined the Combat Veterans Group",
                  duration: 2000
                });
              }}
            >
              Join Group
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
          <CardContent className="p-6">
            <div className="p-4 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
              <HeartPulse className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Military Families Connect</h3>
            <p className="text-white/70 mb-4">
              Support network for spouses, children, and family members of active duty personnel and veterans.
            </p>
            <div className="flex justify-between items-center text-sm text-blue-300/70 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>618 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Daily discussions</span>
              </div>
            </div>
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => {
                toast({
                  title: "Group Joined",
                  description: "You've successfully joined the Military Families Connect group",
                  duration: 2000
                });
              }}
            >
              Join Group
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
          <CardContent className="p-6">
            <div className="p-4 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
              <Briefcase className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Transition Warriors</h3>
            <p className="text-white/70 mb-4">
              For service members and veterans navigating the transition to civilian life, careers, and community.
            </p>
            <div className="flex justify-between items-center text-sm text-blue-300/70 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>352 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Bi-weekly meetings</span>
              </div>
            </div>
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => {
                toast({
                  title: "Group Joined",
                  description: "You've successfully joined the Transition Warriors group",
                  duration: 2000
                });
              }}
            >
              Join Group
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Community Events */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                <span className="block text-sm">APR</span>
                <span className="block text-xl font-bold">15</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">Virtual Coffee Meetup</h3>
                <div className="flex items-center text-sm text-white/70 mb-1">
                  <Video className="h-3 w-3 mr-1 text-blue-400" />
                  <span>Online | 10:00 AM ET</span>
                </div>
                <p className="text-xs text-white/60">Casual conversation with fellow veterans</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                onClick={() => {
                  toast({
                    title: "Joined Event",
                    description: "You've joined the Virtual Coffee Meetup",
                    duration: 2000
                  });
                }}
              >
                Join
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                <span className="block text-sm">APR</span>
                <span className="block text-xl font-bold">20</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">Family Day Picnic</h3>
                <div className="flex items-center text-sm text-white/70 mb-1">
                  <MapPin className="h-3 w-3 mr-1 text-blue-400" />
                  <span>Veterans Memorial Park | 11:00 AM - 3:00 PM</span>
                </div>
                <p className="text-xs text-white/60">Family-friendly event with activities and resources</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                onClick={() => {
                  toast({
                    title: "RSVP Confirmed",
                    description: "You've RSVP'd to the Family Day Picnic",
                    duration: 2000
                  });
                }}
              >
                RSVP
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Find Local Support */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-900/40 rounded-full">
              <MapPin className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Find Local Support</h3>
          </div>
          <p className="text-blue-200/80 mb-4">
            Connect with in-person support groups and resources in your area. Enter your location to find military-friendly resources near you.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter ZIP code or city"
              className="flex-grow py-2 px-4 bg-[#0c1016] border border-blue-900/30 rounded-md text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white whitespace-nowrap"
              onClick={() => {
                toast({
                  title: "Support Finder",
                  description: "Searching for local support resources near you",
                  duration: 2000
                });
              }}
            >
              Find Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Page 
      title={isSpanish ? "Departamento de Defensa" : "Department of Defense"} 
      returnToMain={returnToMain}
    >
      {/* Full width container */}
      <div className="space-y-6 w-full">
        <div className="bg-gradient-to-r from-[#0c193d] to-[#0d2563] p-6 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-lg relative overflow-hidden">
          {/* Patriotic flag background element */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10">
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

        {/* Full width content container with expanded tab area */}
        <div className="bg-[#0F1319] border border-blue-900/30 rounded-lg overflow-hidden shadow-lg w-full">
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
          
          {/* Expanded content area with wider padding */}
          <div className="p-4 md:p-6 w-full">
            {activeTab === 'dashboard' && <DoDDashboard />}
            {activeTab === 'resources' && <DoDResources />}
            {activeTab === 'community' && <CommunitySupport />}
            {activeTab === 'assessments' && <DoDAssessments />}
            {activeTab === 'workshops' && <DoDWorkshops />}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DoDPortal;
