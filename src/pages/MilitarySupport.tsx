
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Users, BookOpen, Calendar, Heart, Globe, MessageSquare, FileText } from "lucide-react";
import HomeButton from "@/components/HomeButton";

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}> = ({ title, description, icon, link }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg hover:shadow-[0_0_15px_rgba(184,115,51,0.2)] transition-all duration-300 hover:border-[#B87333]/40 cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2 text-white/90">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const MilitarySupport: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
                Military Support Portal
              </span>
            </h1>
            <p className="text-white/70">Resources and support for service members and veterans</p>
          </div>
          <HomeButton />
        </div>
        
        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/5 mb-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 gap-2 bg-black/30 mb-8 p-1 rounded-lg">
              <TabsTrigger value="resources" className="data-[state=active]:bg-[#B87333]/90">Resources</TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-[#B87333]/90">Community</TabsTrigger>
              <TabsTrigger value="wellness" className="data-[state=active]:bg-[#B87333]/90">Wellness</TabsTrigger>
              <TabsTrigger value="assistance" className="data-[state=active]:bg-[#B87333]/90">Assistance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FeatureCard 
                  title="Military Workshops" 
                  description="Specialized workshops and training sessions for military personnel"
                  icon={<Shield className="h-6 w-6 text-white" />} 
                  link="/military-workshops"
                />
                <FeatureCard 
                  title="Resource Library" 
                  description="Curated resources specifically for service members and veterans"
                  icon={<BookOpen className="h-6 w-6 text-white" />} 
                  link="/military-resources"
                />
                <FeatureCard 
                  title="Transition Assistance" 
                  description="Support for transitioning from military to civilian life"
                  icon={<Globe className="h-6 w-6 text-white" />} 
                  link="/lifestyle-integration"
                />
                <FeatureCard 
                  title="Crisis Support" 
                  description="Immediate assistance and crisis intervention resources"
                  icon={<Heart className="h-6 w-6 text-white" />} 
                  link="/crisis-support"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FeatureCard 
                  title="Peer Support Groups" 
                  description="Connect with other service members and veterans"
                  icon={<Users className="h-6 w-6 text-white" />} 
                  link="/community-support"
                />
                <FeatureCard 
                  title="Military Family Support" 
                  description="Resources and community for military families"
                  icon={<Users className="h-6 w-6 text-white" />} 
                  link="/family-support"
                />
                <FeatureCard 
                  title="Virtual Meetings" 
                  description="Online AA/NA support groups and virtual meetings"
                  icon={<MessageSquare className="h-6 w-6 text-white" />} 
                  link="/virtual-meetings"
                />
                <FeatureCard 
                  title="Military Affirmations" 
                  description="Daily affirmations and positive resources"
                  icon={<FileText className="h-6 w-6 text-white" />} 
                  link="/military-affirmations"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="wellness" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FeatureCard 
                  title="Mental Health Tools" 
                  description="Tools and resources for maintaining mental health"
                  icon={<Heart className="h-6 w-6 text-white" />} 
                  link="/mental-wellness-tools"
                />
                <FeatureCard 
                  title="Mindfulness & Sleep" 
                  description="Resources for mindfulness, meditation, and better sleep"
                  icon={<Heart className="h-6 w-6 text-white" />} 
                  link="/mindfulness"
                />
                <FeatureCard 
                  title="PTSD Resources" 
                  description="Specialized resources for those experiencing PTSD"
                  icon={<Shield className="h-6 w-6 text-white" />} 
                  link="/resource-library"
                />
                <FeatureCard 
                  title="Activity Scheduling" 
                  description="Schedule activities and appointments"
                  icon={<Calendar className="h-6 w-6 text-white" />} 
                  link="/scheduling"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="assistance" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FeatureCard 
                  title="Financial Resources" 
                  description="Financial assistance programs for veterans and service members"
                  icon={<Shield className="h-6 w-6 text-white" />} 
                  link="/financial-assistance"
                />
                <FeatureCard 
                  title="VA Benefits Navigation" 
                  description="Help understanding and accessing VA benefits"
                  icon={<FileText className="h-6 w-6 text-white" />} 
                  link="/resource-library"
                />
                <FeatureCard 
                  title="Mental Health Coverage" 
                  description="Information about mental health coverage and options"
                  icon={<Heart className="h-6 w-6 text-white" />} 
                  link="/copay-credits"
                />
                <FeatureCard 
                  title="Support Hotlines" 
                  description="Direct access to support hotlines and emergency contacts"
                  icon={<MessageSquare className="h-6 w-6 text-white" />} 
                  link="/crisis-support"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-center">
            <Button 
              variant="gold-outline" 
              className="mx-2"
              onClick={() => navigate("/military-blog")}
            >
              View Military Blog
            </Button>
            <Button 
              variant="gold" 
              className="mx-2"
              onClick={() => navigate("/virtual-meetings")}
            >
              Join Virtual AA/NA Meeting
            </Button>
          </div>
        </div>
        
        {/* Quote Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center mb-8">
          <blockquote className="text-xl italic text-white/80">
            "The strength of a warrior is not measured by physical might alone, but by the resilience of the mind and the courage to seek help when needed."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default MilitarySupport;
