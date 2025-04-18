
import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Users, FileText, ArrowUpRight, ArrowLeft } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const GoldenSpecializedFeature: React.FC = () => {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature: string }>();
  const location = useLocation();
  const { toast } = useToast();
  const { getTranslatedText } = useTranslation();
  
  // Extract the feature name from the URL parameter
  const featureName = feature?.charAt(0).toUpperCase() + feature?.slice(1).replace(/-/g, ' ');
  
  const getFeatureIcon = (feature?: string) => {
    if (!feature) return Heart;
    
    if (feature.includes('memory') || feature.includes('cognitive')) return Brain;
    if (feature.includes('community') || feature.includes('family')) return Users;
    if (feature.includes('planning') || feature.includes('transitions')) return FileText;
    return Heart;
  };
  
  const FeatureIcon = getFeatureIcon(feature);
  
  const getFeatureContent = () => {
    if (!feature) return null;
    
    // Map of feature content
    const featureContents: Record<string, { title: string; description: string }> = {
      "years-memory": {
        title: "Memory & Cognitive Health",
        description: "Resources and exercises to help maintain and improve cognitive function, memory skills, and brain health as you age."
      },
      "years-planning": {
        title: "End of Life Planning", 
        description: "Comprehensive tools and guidance to help you create legal documents, make important healthcare decisions, and communicate your wishes to loved ones."
      },
      "years-transitions": {
        title: "Life Transitions",
        description: "Support and resources for navigating significant life changes such as retirement, moving, loss of a spouse, and other major transitions."
      },
      "years-community": {
        title: "Community Connections",
        description: "Tools and resources to help you stay connected with your community, find local senior activities, and build meaningful relationships."
      },
      "years-family": {
        title: "Family Connection Tools",
        description: "Resources to strengthen bonds with family members across generations, including communication guides, shared activities, and digital connection tools."
      },
      "years-wellness": {
        title: "Wellness Resources",
        description: "Holistic approaches to wellness including physical activity recommendations, nutrition guidance, and stress management techniques tailored for seniors."
      },
      "years-guide": {
        title: "Legacy Journal Guide",
        description: "Comprehensive guide on creating your legacy journal, including prompts, organization tips, and ways to share your story with future generations."
      }
    };
    
    // Find matching content
    let content = {
      title: featureName || "Feature",
      description: "Resources and tools to support your golden years journey."
    };
    
    // Look for matching content based on the feature URL parameter
    Object.entries(featureContents).forEach(([key, value]) => {
      if (feature.includes(key)) {
        content = value;
      }
    });
    
    return content;
  };
  
  const content = getFeatureContent();
  
  const handleBackToPortal = () => {
    navigate('/golden-years-portal', { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      }
    });
  };
  
  useEffect(() => {
    // Check if we came from the portal
    const fromPortal = location.state?.stayInPortal === true;
    
    if (!fromPortal) {
      // If not coming from the portal, redirect to welcome page
      navigate('/golden-years-welcome');
    }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B6F1D] via-[#B89237] to-[#DAB258] text-white">
      {/* Enhanced metallic gold background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 via-amber-500/10 to-amber-800/20 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <NavigationBar
        showBackButton={true}
        showHomeButton={false}
        showThriveButton={true}
        title={content?.title || "Golden Years Feature"}
        portalMode={true}
        portalPath="/golden-years-portal"
      />
      
      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 backdrop-blur-md border-2 border-amber-400/30 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-amber-500/30 rounded-full">
                <FeatureIcon className="h-8 w-8 text-amber-100" />
              </div>
              <h1 className="text-3xl font-semibold text-amber-50">{content?.title}</h1>
            </div>
            <p className="text-amber-100 text-lg">{content?.description}</p>
          </div>
          
          <CardContent className="p-6">
            <div className="bg-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-400/30 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-amber-100">Welcome to {content?.title}</h2>
              <p className="mb-4 text-white/90">
                This section is designed specifically for seniors in their golden years, providing specialized resources and support.
              </p>
              <p className="text-white/90">
                Our goal is to help you maintain independence, build connections, and find joy in every day. Browse through the 
                resources below to find tools, guides, and activities tailored to your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-900/20 backdrop-blur-sm rounded-xl p-5 border border-amber-400/30">
                <h3 className="text-xl font-medium mb-3 text-amber-100">Featured Resources</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span>Interactive guides and tutorials</span>
                  </li>
                  <li className="flex items-center gap-2 text-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span>Educational videos and articles</span>
                  </li>
                  <li className="flex items-center gap-2 text-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span>Downloadable worksheets and templates</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-900/20 backdrop-blur-sm rounded-xl p-5 border border-amber-400/30">
                <h3 className="text-xl font-medium mb-3 text-amber-100">Community Support</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span>Discussion forums and groups</span>
                  </li>
                  <li className="flex items-center gap-2 text-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span>Virtual events and meetups</span>
                  </li>
                  <li className="flex items-center gap-2 text-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span>Expert Q&A sessions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                className="bg-amber-800 hover:bg-amber-900 text-white border border-amber-400/30"
                onClick={handleBackToPortal}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Golden Years Portal
              </Button>
              
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-400/30"
                onClick={() => navigate('/golden-years-journal', { 
                  state: { 
                    stayInPortal: true,
                    preventTutorial: true,
                    portalPath: '/golden-years-portal'
                  }
                })}
              >
                Explore Legacy Journal
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoldenSpecializedFeature;
