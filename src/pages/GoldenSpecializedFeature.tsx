
import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavigationBar from "@/components/navigation/NavigationBar";
import { ArrowLeft, Info, Book, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This is a template page for Golden Years specialized features
// It will dynamically load content based on the feature parameter

const GoldenSpecializedFeature: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { feature } = useParams<{ feature: string }>();
  
  // Extract feature name from URL for display
  const getFeatureName = () => {
    if (!feature) return "Feature";
    
    // Remove "golden-" prefix if present
    let featureName = feature.startsWith("golden-") ? feature.substring("golden-".length) : feature;
    
    // Convert kebab-case to Title Case
    return featureName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Handle navigation back to portal
  const handleBack = () => {
    navigate("/golden-years-portal", { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      }
    });
  };
  
  // Generate sample content based on feature name
  const getFeatureContent = () => {
    const featureName = getFeatureName().toLowerCase();
    
    if (featureName.includes('wellness') || featureName.includes('health')) {
      return {
        title: `Senior ${getFeatureName()}`,
        description: "Resources tailored to senior health and wellness needs.",
        icon: <Book className="h-8 w-8 text-teal-300" />,
        content: [
          { title: "Age-Appropriate Exercise Guide", description: "Gentle exercises designed specifically for seniors to maintain mobility and strength." },
          { title: "Nutrition for Seniors", description: "Dietary recommendations to support good health in your golden years." },
          { title: "Mental Wellness Practices", description: "Techniques to maintain cognitive function and emotional wellbeing." },
          { title: "Sleep Improvement Guide", description: "Tips to improve sleep quality, which often changes with age." }
        ]
      };
    }
    else if (featureName.includes('community') || featureName.includes('connection')) {
      return {
        title: getFeatureName(),
        description: "Connect with peers and build meaningful relationships.",
        icon: <Link2 className="h-8 w-8 text-teal-300" />,
        content: [
          { title: "Local Senior Groups", description: "Find community groups and activities in your area." },
          { title: "Virtual Connections", description: "Online forums and video chats to connect with others from the comfort of home." },
          { title: "Intergenerational Programs", description: "Activities that connect seniors with younger generations." },
          { title: "Volunteer Opportunities", description: "Ways to give back to your community and share your skills." }
        ]
      };
    }
    else {
      return {
        title: getFeatureName(),
        description: "Specialized resources for your golden years journey.",
        icon: <Info className="h-8 w-8 text-teal-300" />,
        content: [
          { title: "Getting Started", description: "Introduction to this feature and how it can support your wellbeing." },
          { title: "Key Resources", description: "Essential tools and information specific to this area." },
          { title: "Expert Guidance", description: "Advice from professionals specializing in senior needs." },
          { title: "Related Features", description: "Other Golden Years resources you might find helpful." }
        ]
      };
    }
  };
  
  const featureContent = getFeatureContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#034b45] via-[#046b62] to-[#067b6d] text-white">
      {/* Navigation bar */}
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title={featureContent.title}
        portalMode={true}
        portalPath="/golden-years-portal"
        backButtonAction={handleBack}
      />
      
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-teal-700/30 rounded-full mr-4">
              {featureContent.icon}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">{featureContent.title}</h1>
              <p className="text-teal-100">{featureContent.description}</p>
            </div>
          </div>
          
          <Card className="bg-teal-900/30 backdrop-blur-md border-teal-200/30">
            <CardContent className="p-6">
              <p className="text-teal-100 mb-6">
                This specialized content has been tailored specifically for seniors in their golden years.
                Explore the resources below to enhance your wellbeing and make the most of this meaningful
                time of life.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featureContent.content.map((item, index) => (
                  <div key={index} className="bg-teal-800/40 p-5 rounded-lg">
                    <h3 className="text-xl font-medium mb-2 text-teal-200">{item.title}</h3>
                    <p className="text-teal-100">{item.description}</p>
                    <Button 
                      className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
                      onClick={() => {
                        toast({
                          title: "Resource Accessed",
                          description: `Opening ${item.title}`,
                          duration: 2000,
                        });
                      }}
                    >
                      View Resource
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          variant="outline" 
          className="mb-8 border-teal-400/50 text-teal-100 hover:bg-teal-800/50"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Golden Years Portal
        </Button>
      </div>
    </div>
  );
};

export default GoldenSpecializedFeature;
