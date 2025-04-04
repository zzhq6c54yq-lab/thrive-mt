
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Calendar, Target, BookOpen, Users, Heart, Award, BrainCircuit, Sparkles, Globe, MessageSquare, FileText, Lightbulb, Medal, Star, Clock, Headphones, Phone, HelpCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import TutorialButton from "@/components/tutorials/TutorialButton";

// Resource Card Component
const ResourceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  onClick: () => void;
  gradient?: string;
}> = ({ title, description, icon, badge, onClick, gradient = "from-[#0EA5E9]/80 to-[#2563EB]/80" }) => (
  <Card 
    className="relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 group bg-transparent border-0"
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-all`}></div>
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
    
    <CardHeader className="relative z-10 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        </div>
        {badge && (
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>
    </CardHeader>
    
    <CardContent className="relative z-10 pt-0">
      <CardDescription className="text-white/90">{description}</CardDescription>
    </CardContent>
    
    <CardFooter className="relative z-10 pt-2">
      <Button 
        size="sm"
        variant="outline" 
        className="bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 transition-all duration-300"
      >
        Explore <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </CardFooter>
    
    <div className="absolute top-0 right-0 h-20 w-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
  </Card>
);

// Featured Expert Component
const FeaturedExpert: React.FC<{
  name: string;
  role: string;
  imageSrc?: string;
  quote: string;
}> = ({ name, role, imageSrc, quote }) => (
  <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-[#0EA5E9]/30 shadow-lg hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300 hover:border-[#0EA5E9]/50">
    <div className="flex items-center gap-4 mb-3">
      <Avatar className="h-16 w-16 border-2 border-[#0EA5E9]/50">
        <AvatarImage src={imageSrc} alt={name} />
        <AvatarFallback className="bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] text-white">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm text-white/70">{role}</p>
      </div>
    </div>
    <blockquote className="text-white/80 italic text-sm border-l-2 border-[#0EA5E9]/50 pl-3">
      "{quote}"
    </blockquote>
  </div>
);

// Emergency Resources Component
const EmergencyResourcesBox: React.FC = () => (
  <div className="bg-gradient-to-r from-[#e63b3b]/80 to-[#b91c1c]/80 p-4 rounded-xl text-white mb-6">
    <div className="flex items-center gap-3 mb-3">
      <Phone className="h-6 w-6 text-white animate-pulse" />
      <h3 className="text-lg font-bold">24/7 Crisis Resources</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-medium mb-1">Veterans Crisis Line</h4>
        <div className="flex items-center justify-between">
          <p className="text-white font-bold">988, Press 1</p>
          <Button size="sm" variant="outline" className="bg-white/20 hover:bg-white/30 border-white/40">
            <ExternalLink className="h-4 w-4 mr-1" /> Website
          </Button>
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
        <h4 className="font-medium mb-1">Military OneSource</h4>
        <div className="flex items-center justify-between">
          <p className="text-white font-bold">800-342-9647</p>
          <Button size="sm" variant="outline" className="bg-white/20 hover:bg-white/30 border-white/40">
            <ExternalLink className="h-4 w-4 mr-1" /> Website
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Welcome screens before the main portal
const WelcomeScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <HomeButton />
      </div>
      
      <div className="absolute top-4 left-4 z-20">
        <TutorialButton featureId="military-support" />
      </div>
      
      <div className="mb-6">
        <Shield className="h-16 w-16 text-[#0EA5E9] mx-auto mb-3 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
        Military Mental Health Portal
      </h1>
      
      <div className="max-w-2xl relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0EA5E9]/20 to-[#2563EB]/20 rounded-lg blur"></div>
        <div className="relative bg-black/40 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
          <p className="text-xl mb-6 text-white/90 font-medium">
            This specialized portal provides comprehensive mental health support tailored for service members, 
            veterans, and their families. We understand the unique challenges of military life.
          </p>
          <p className="text-lg mb-6 text-white/90 font-medium">
            You'll find resources for PTSD, combat stress, deployment challenges, and transition assistance. 
            Our goal is to ensure that no warrior faces their battles alone.
          </p>
          <p className="text-lg mb-4 text-white/90 font-medium">
            Your service matters. Your mental health matters. Let us support you in your journey.
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onContinue}
        className="mt-8 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0D94D1] hover:to-[#2254CC] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
      >
        Continue <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

const PortalIntroScreen: React.FC<{ onEnterPortal: () => void }> = ({ onEnterPortal }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <HomeButton />
      </div>
      
      <div className="absolute top-4 left-4 z-20">
        <TutorialButton featureId="military-support" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
        Welcome to Your Military Support Portal
      </h1>
      
      <div className="max-w-3xl mb-8 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0EA5E9]/20 to-[#2563EB]/20 rounded-lg blur"></div>
        <div className="relative bg-black/40 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
          <p className="text-xl mb-6 text-white/90 font-medium">
            This secure space provides military personnel and veterans with specialized mental health 
            resources designed to address the unique challenges you face, both during service and beyond.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-left">
              <Shield className="h-6 w-6 text-[#0EA5E9] mb-2" />
              <h3 className="text-white font-medium mb-1">Specialized Support</h3>
              <p className="text-white/80 text-sm">Evidence-based resources for combat stress, PTSD, and reintegration challenges</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-left">
              <Users className="h-6 w-6 text-[#0EA5E9] mb-2" />
              <h3 className="text-white font-medium mb-1">For You & Your Family</h3>
              <p className="text-white/80 text-sm">Support extends to families who serve alongside you</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-left">
              <BrainCircuit className="h-6 w-6 text-[#0EA5E9] mb-2" />
              <h3 className="text-white font-medium mb-1">Confidential Access</h3>
              <p className="text-white/80 text-sm">Secure resources that respect your privacy and service</p>
            </div>
          </div>
          
          <p className="text-lg mb-4 text-white/90 font-medium">
            From combat stress to civilian transition, from deployment to returning home—we're here for every 
            step of your journey. Your strength got you through service; let us help with what comes next.
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onEnterPortal}
        className="mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0D94D1] hover:to-[#2254CC] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
      >
        Enter Military Support Portal <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

// Main Portal Screen with enhanced tabbed content
const PortalScreen: React.FC<{ onNavigateToSupport: () => void }> = ({ onNavigateToSupport }) => {
  const navigate = useNavigate();
  
  const handleResourceClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="py-6 px-4 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-[#0EA5E9]" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2563EB]">
            Military Mental Health Hub
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <TutorialButton featureId="military-support" />
          <HomeButton />
        </div>
      </div>

      {/* Emergency Resources Box */}
      <EmergencyResourcesBox />
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1a2f] via-[#0f2547] to-[#0c1a2f] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><rect width=%223%22 height=%223%22 fill=%22%230EA5E9%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
        
        {/* Subtle American flag pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2230%22 viewBox=%220 0 100 30%22><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%220%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%223%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%226%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%229%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%2212%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2215%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%2218%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2221%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%2224%22 fill-opacity=%220.1%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2227%22 fill-opacity=%220.1%22/><rect width=%2230%22 height=%2215%22 fill=%22%23002868%22 fill-opacity=%220.15%22/></svg>')] bg-repeat"></div>
        
        <div className="relative p-8 md:p-12 z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Your Mental Health <span className="text-[#0EA5E9]">Matters</span>
              </h2>
              <p className="text-xl text-white/80 mb-6">
                As a service member or veteran, you've shown extraordinary strength. 
                The challenges of military life—deployment, combat, and transition—can 
                affect your mental health in unique ways. You deserve support that 
                understands your service and sacrifice.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-[#0EA5E9] hover:bg-[#0D94D1] text-white"
                  onClick={onNavigateToSupport}
                >
                  Explore All Resources
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/10"
                  onClick={() => navigate("/real-time-therapy")}
                >
                  Connect with a Therapist
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0EA5E9]/30 to-[#2563EB]/30 rounded-full blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                <Shield className="h-32 w-32 text-[#0EA5E9]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Highlighted Programs */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Featured Programs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#0c4a6e]/90 to-[#082f49]/90 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
            <div className="p-6 flex flex-col h-full">
              <Target className="h-10 w-10 text-[#0EA5E9] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">PTSD Recovery Program</h3>
              <p className="text-white/80 mb-4 flex-grow">
                A structured 12-week program focused on trauma recovery using evidence-based practices including CPT and EMDR.
              </p>
              <Button 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white self-start"
                onClick={() => navigate("/military-resources")}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0369a1]/90 to-[#075985]/90 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
            <div className="p-6 flex flex-col h-full">
              <BookOpen className="h-10 w-10 text-[#0EA5E9] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Transition Readiness</h3>
              <p className="text-white/80 mb-4 flex-grow">
                Prepare for civilian life with our comprehensive program covering mental health, career, and lifestyle adjustments.
              </p>
              <Button 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white self-start"
                onClick={() => navigate("/lifestyle-integration")}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0284c7]/90 to-[#0ea5e9]/90 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
            <div className="p-6 flex flex-col h-full">
              <Users className="h-10 w-10 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Family Resilience</h3>
              <p className="text-white/80 mb-4 flex-grow">
                Support for military families dealing with deployment, relocation, and the unique stressors of military life.
              </p>
              <Button 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white self-start"
                onClick={() => navigate("/family-support")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Experts */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Mental Health Experts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeaturedExpert 
            name="Dr. James Carter" 
            role="Military Psychologist, Veteran" 
            quote="Having served for 15 years, I understand firsthand the mental challenges service members face. My approach combines clinical expertise with lived experience."
          />
          <FeaturedExpert 
            name="Dr. Maria Sanchez" 
            role="PTSD Specialist" 
            quote="PTSD treatment has evolved dramatically. We now have powerful tools that can significantly reduce symptoms and improve quality of life."
          />
          <FeaturedExpert 
            name="Col. David Thompson (Ret.)" 
            role="Transition Counselor" 
            quote="The shift to civilian life requires mental preparation. My goal is to help service members make this transition with confidence and purpose."
          />
        </div>
      </div>
      
      {/* Resource Categories */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Explore Resources</h2>
        </div>
        
        <Tabs defaultValue="mental-health" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/30 mb-6 p-1 rounded-lg">
            <TabsTrigger value="mental-health" className="data-[state=active]:bg-[#0EA5E9]">Mental Health</TabsTrigger>
            <TabsTrigger value="support-groups" className="data-[state=active]:bg-[#0EA5E9]">Support Groups</TabsTrigger>
            <TabsTrigger value="self-help" className="data-[state=active]:bg-[#0EA5E9]">Self-Help</TabsTrigger>
            <TabsTrigger value="benefits" className="data-[state=active]:bg-[#0EA5E9]">Benefits & Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mental-health" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ResourceCard 
                title="PTSD Resources" 
                description="Evidence-based treatments and coping strategies for post-traumatic stress"
                icon={<BrainCircuit className="h-5 w-5 text-white" />}
                badge="Featured"
                onClick={() => handleResourceClick("/resource-library")}
              />
              <ResourceCard 
                title="Combat Stress" 
                description="Tools and techniques for managing stress related to combat experiences"
                icon={<Target className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/mental-wellness-tools")}
                gradient="from-[#2563EB]/80 to-[#1E40AF]/80"
              />
              <ResourceCard 
                title="Depression & Anxiety" 
                description="Resources for understanding and managing depression and anxiety in military contexts"
                icon={<Heart className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/resource-library")}
                gradient="from-[#3B82F6]/80 to-[#1D4ED8]/80"
              />
              <ResourceCard 
                title="Substance Recovery" 
                description="Programs supporting recovery from substance use disorders"
                icon={<Award className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/holistic-wellness")}
                gradient="from-[#0284C7]/80 to-[#0369A1]/80"
              />
              <ResourceCard 
                title="Sleep Improvement" 
                description="Strategies and resources for better sleep and managing insomnia"
                icon={<Clock className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/mindfulness")}
                gradient="from-[#0EA5E9]/80 to-[#0284C7]/80"
              />
              <ResourceCard 
                title="Traumatic Brain Injury" 
                description="Resources for TBI assessment, treatment, and ongoing support"
                icon={<BrainCircuit className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/resource-library")}
                gradient="from-[#7DD3FC]/80 to-[#38BDF8]/80"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="support-groups" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ResourceCard 
                title="Peer Support Groups" 
                description="Connect with other service members and veterans in group settings"
                icon={<Users className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/community-support")}
                gradient="from-[#8B5CF6]/80 to-[#7C3AED]/80"
              />
              <ResourceCard 
                title="Family Support Circles" 
                description="Groups for military families to share experiences and coping strategies"
                icon={<Users className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/family-support")}
                gradient="from-[#A855F7]/80 to-[#9333EA]/80"
              />
              <ResourceCard 
                title="Deployment Groups" 
                description="Support during pre-deployment, deployment, and post-deployment phases"
                icon={<Globe className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/virtual-meetings")}
                gradient="from-[#D946EF]/80 to-[#C026D3]/80"
              />
              <ResourceCard 
                title="Combat Veterans Circle" 
                description="Specialized groups for those who have experienced combat"
                icon={<Target className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/community-support")}
                gradient="from-[#EC4899]/80 to-[#DB2777]/80"
              />
              <ResourceCard 
                title="Grief & Loss Support" 
                description="Groups focused on processing grief and loss in military contexts"
                icon={<Heart className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/virtual-meetings")}
                gradient="from-[#F472B6]/80 to-[#EC4899]/80"
              />
              <ResourceCard 
                title="Transition Groups" 
                description="Support for the transition from military to civilian life"
                icon={<ArrowRight className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/lifestyle-integration")}
                gradient="from-[#FB7185]/80 to-[#F43F5E]/80"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="self-help" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ResourceCard 
                title="Mindfulness Practices" 
                description="Military-focused mindfulness and meditation techniques"
                icon={<BrainCircuit className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/mindfulness")}
                gradient="from-[#10B981]/80 to-[#059669]/80"
              />
              <ResourceCard 
                title="Digital Health Tools" 
                description="Apps and online resources designed for military mental health"
                icon={<Sparkles className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/mental-wellness-tools")}
                gradient="from-[#34D399]/80 to-[#10B981]/80"
              />
              <ResourceCard 
                title="Stress Management" 
                description="Practical techniques for managing stress in military environments"
                icon={<Target className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/mental-wellness-tools")}
                gradient="from-[#6EE7B7]/80 to-[#34D399]/80"
              />
              <ResourceCard 
                title="Sleep Hygiene" 
                description="Strategies for improving sleep quality despite irregular schedules"
                icon={<Clock className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/mindfulness")}
                gradient="from-[#A7F3D0]/80 to-[#6EE7B7]/80"
              />
              <ResourceCard 
                title="Physical Wellness" 
                description="Exercise and nutrition approaches to support mental health"
                icon={<Award className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/holistic-wellness")}
                gradient="from-[#D1FAE5]/80 to-[#A7F3D0]/80"
              />
              <ResourceCard 
                title="Journaling Guides" 
                description="Structured journaling approaches for processing military experiences"
                icon={<FileText className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/journaling")}
                gradient="from-[#059669]/80 to-[#047857]/80"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ResourceCard 
                title="VA Mental Health" 
                description="Guide to accessing VA mental health services and benefits"
                icon={<Shield className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/resource-library")}
                gradient="from-[#F59E0B]/80 to-[#D97706]/80"
              />
              <ResourceCard 
                title="Healthcare Navigation" 
                description="Help understanding TRICARE mental health coverage and options"
                icon={<Heart className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/copay-credits")}
                gradient="from-[#FBBF24]/80 to-[#F59E0B]/80"
              />
              <ResourceCard 
                title="Disability Benefits" 
                description="Information on mental health disability claims and support"
                icon={<Shield className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/financial-assistance")}
                gradient="from-[#FCD34D]/80 to-[#FBBF24]/80"
              />
              <ResourceCard 
                title="Emergency Resources" 
                description="Crisis lines and emergency mental health services for veterans"
                icon={<MessageSquare className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/crisis-support")}
                gradient="from-[#FDE68A]/80 to-[#FCD34D]/80"
              />
              <ResourceCard 
                title="Education Benefits" 
                description="Using GI Bill benefits for mental health education and training"
                icon={<BookOpen className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/resource-library")}
                gradient="from-[#D97706]/80 to-[#B45309]/80"
              />
              <ResourceCard 
                title="Family Services" 
                description="Mental health services available to military families and dependents"
                icon={<Users className="h-5 w-5 text-white" />}
                onClick={() => handleResourceClick("/family-support")}
                gradient="from-[#B45309]/80 to-[#92400E]/80"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Interactive Assessment Section - NEW SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Mental Health Check-in</h2>
        </div>
        
        <div className="bg-gradient-to-r from-[#0c1a2f]/90 to-[#0f2547]/90 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full transform -translate-x-20 translate-y-20"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-4">Confidential Self-Assessment</h3>
            <p className="text-white/80 mb-6">
              Not sure where to start? Take our confidential assessment to get personalized recommendations 
              based on your current needs and experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">PTSD Screening</h4>
                <p className="text-white/70 text-sm mb-3">Brief 5-question assessment based on PCL-5 criteria.</p>
                <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white">
                  Start Assessment
                </Button>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Depression Check</h4>
                <p className="text-white/70 text-sm mb-3">Based on PHQ-9 to identify depression symptoms.</p>
                <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white">
                  Start Assessment
                </Button>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Anxiety Assessment</h4>
                <p className="text-white/70 text-sm mb-3">Quick GAD-7 assessment for anxiety symptoms.</p>
                <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white">
                  Start Assessment
                </Button>
              </div>
            </div>
            
            <div className="flex items-center text-white/70 text-sm">
              <HelpCircle className="h-4 w-4 mr-2 text-[#0EA5E9]" />
              <p>All assessments are confidential and for informational purposes only, not diagnostic.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Audio/Visual Resources - NEW SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Multimedia Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#0EA5E9]/20 p-3 rounded-lg">
                <Headphones className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Guided Meditation Sessions</h3>
            </div>
            <p className="text-white/80 mb-4">
              Combat-focused mindfulness meditations designed specifically for service members 
              and veterans experiencing hypervigilance and stress responses.
            </p>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                className="justify-between border-[#0EA5E9]/40 hover:bg-[#0EA5E9]/10"
                onClick={() => navigate("/binaural-beats")}
              >
                <span>Combat Stress Reduction (10 min)</span>
                <Headphones className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between border-[#0EA5E9]/40 hover:bg-[#0EA5E9]/10"
                onClick={() => navigate("/binaural-beats")}
              >
                <span>Sleep Preparation for Veterans (20 min)</span>
                <Headphones className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#0EA5E9]/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Veteran Stories</h3>
            </div>
            <p className="text-white/80 mb-4">
              Hear from veterans who have navigated their mental health journeys and found paths to healing.
            </p>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                className="justify-between border-[#0EA5E9]/40 hover:bg-[#0EA5E9]/10"
                onClick={() => navigate("/military-blog")}
              >
                <span>From Combat to Counselor: SSgt. Martin's Journey</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between border-[#0EA5E9]/40 hover:bg-[#0EA5E9]/10"
                onClick={() => navigate("/military-blog")}
              >
                <span>Finding Peace: A Marine's PTSD Recovery</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-[#0EA5E9]/30">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#0EA5E9]/20 px-3 py-2 rounded-lg">
                <Calendar className="h-5 w-5 text-[#0EA5E9]" />
              </div>
              <span className="text-white/70 text-sm">Virtual</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">PTSD Awareness Workshop</h3>
            <p className="text-white/70 text-sm mb-3">May 15, 2023 • 2:00 PM EST</p>
            <Button variant="outline" size="sm" className="w-full border-[#0EA5E9]/50 text-[#0EA5E9] hover:bg-[#0EA5E9]/10">
              Register Now
            </Button>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-[#0EA5E9]/30">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#0EA5E9]/20 px-3 py-2 rounded-lg">
                <Users className="h-5 w-5 text-[#0EA5E9]" />
              </div>
              <span className="text-white/70 text-sm">In-Person</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Transition Readiness Summit</h3>
            <p className="text-white/70 text-sm mb-3">June 3-5, 2023 • Washington, DC</p>
            <Button variant="outline" size="sm" className="w-full border-[#0EA5E9]/50 text-[#0EA5E9] hover:bg-[#0EA5E9]/10">
              Learn More
            </Button>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-[#0EA5E9]/30">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#0EA5E9]/20 px-3 py-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-[#0EA5E9]" />
              </div>
              <span className="text-white/70 text-sm">Virtual</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Family Resilience Webinar</h3>
            <p className="text-white/70 text-sm mb-3">May 23, 2023 • 7:00 PM EST</p>
            <Button variant="outline" size="sm" className="w-full border-[#0EA5E9]/50 text-[#0EA5E9] hover:bg-[#0EA5E9]/10">
              Register Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Success Stories */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-gradient-to-b from-[#0EA5E9] to-[#2563EB] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Success Stories</h2>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <div className="mb-3">
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
              </div>
              <blockquote className="text-white/80 italic mb-4">
                "After three tours, I didn't think anyone could understand what I was going through. The PTSD program here changed everything. I finally have tools that work."
              </blockquote>
              <div className="mt-auto">
                <p className="text-white font-medium">Staff Sergeant Michael J.</p>
                <p className="text-white/60 text-sm">U.S. Army, 15 years of service</p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="mb-3">
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
              </div>
              <blockquote className="text-white/80 italic mb-4">
                "As a military spouse, I often felt overlooked. The family support resources here helped me not only support my husband but also take care of my own mental health."
              </blockquote>
              <div className="mt-auto">
                <p className="text-white font-medium">Jennifer L.</p>
                <p className="text-white/60 text-sm">Military spouse, 8 years</p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="mb-3">
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
                <Star className="h-5 w-5 text-[#0EA5E9] inline-block" />
              </div>
              <blockquote className="text-white/80 italic mb-4">
                "Transitioning to civilian life was harder than I expected. The resources and transition program here gave me the structure and support I needed during that critical time."
              </blockquote>
              <div className="mt-auto">
                <p className="text-white font-medium">Lieutenant Commander David R.</p>
                <p className="text-white/60 text-sm">U.S. Navy (Retired)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] opacity-90"></div>
        
        {/* Very subtle flag pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2230%22 viewBox=%220 0 100 30%22><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%220%22 fill-opacity=%220.07%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%226%22 fill-opacity=%220.07%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2212%22 fill-opacity=%220.07%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2218%22 fill-opacity=%220.07%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2224%22 fill-opacity=%220.07%22/></svg>')] bg-repeat"></div>
        
        <div className="relative p-8 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to take the next step?</h2>
              <p className="text-white/80 text-lg">
                Connect with specialized support designed for military personnel and their families.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-white text-[#0EA5E9] hover:bg-white/90"
                onClick={() => navigate("/real-time-therapy")}
              >
                Find a Therapist
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                onClick={onNavigateToSupport}
              >
                Explore All Resources
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoDPortal: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'intro' | 'portal'>('welcome');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Add a subtle American flag background pattern to the main content
    const addPatrioticBackground = () => {
      document.body.classList.add('military-theme');
    };
    
    addPatrioticBackground();
    
    return () => {
      document.body.classList.remove('military-theme');
    };
  }, []);

  const handleContinueToIntro = () => {
    setScreenState('intro');
    window.scrollTo(0, 0);
  };

  const handleEnterPortal = () => {
    setScreenState('portal');
    window.scrollTo(0, 0);
    
    toast({
      title: "Welcome to the Military Support Portal",
      description: "Accessing specialized mental health resources for military personnel and families",
      duration: 3000
    });
  };

  const handleNavigateToSupport = () => {
    navigate("/military-support");
  };

  const renderCurrentScreen = () => {
    switch (screenState) {
      case 'welcome':
        return <WelcomeScreen onContinue={handleContinueToIntro} />;
      case 'intro':
        return <PortalIntroScreen onEnterPortal={handleEnterPortal} />;
      case 'portal':
        return <PortalScreen onNavigateToSupport={handleNavigateToSupport} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      {/* American flag subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2230%22 viewBox=%220 0 100 30%22><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%220%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%223%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%226%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%229%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%2212%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2215%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%2218%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2221%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23BF0A30%22 y=%2224%22 fill-opacity=%220.03%22/><rect width=%22100%22 height=%223%22 fill=%22%23FFFFFF%22 y=%2227%22 fill-opacity=%220.03%22/></svg>')] bg-repeat opacity-50"></div>
      
      {/* Stars pattern in the background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%230EA5E9%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl relative overflow-hidden border border-[#0EA5E9]/20">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#0EA5E9]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#2563EB]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-tr from-[#BF0A30]/10 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default DoDPortal;

