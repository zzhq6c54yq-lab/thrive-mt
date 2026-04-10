
import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import { HeartHandshake, BookOpen, Users, Lightbulb, Clock, Globe, Brain, UserRound } from "lucide-react";
import useFeatureActions from "@/hooks/useFeatureActions";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

interface ResourcesSectionProps {
  onResourceClick: (feature: string) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onResourceClick }) => {
  const { handleActionClick } = useFeatureActions();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingResource, setLoadingResource] = useState<string | null>(null);
  
  const resources = [
    {
      title: "Wellness Resources",
      description: "Age-appropriate exercises, nutrition advice, and mental wellness practices designed specifically for seniors.",
      icon: <HeartHandshake className="h-5 w-5 text-amber-200" />,
      buttonText: "Explore Resources",
      action: { type: 'other', title: "Wellness Resources", path: "golden-years-wellness" }
    },
    {
      title: "End of Life Planning",
      description: "Thoughtful resources to help with advance care planning, will preparation, and ensuring your wishes are documented.",
      icon: <BookOpen className="h-5 w-5 text-amber-200" />,
      buttonText: "Access Planning Tools",
      action: { type: 'other', title: "End of Life Planning", path: "golden-years-planning" }
    },
    {
      title: "Community Connections",
      description: "Connect with peers, join discussion groups, and find community events in your area.",
      icon: <Users className="h-5 w-5 text-amber-200" />,
      buttonText: "Join Community",
      action: { type: 'join', title: "Community Connections", path: "golden-years-community" }
    },
    {
      title: "Memory & Cognitive Health",
      description: "Brain exercises, memory techniques, and activities to maintain cognitive function and mental sharpness.",
      icon: <Brain className="h-5 w-5 text-amber-200" />,
      buttonText: "Brain Fitness",
      action: { type: 'other', title: "Memory & Cognitive Health", path: "golden-years-memory" }
    },
    {
      title: "Life Transitions",
      description: "Resources for major life changes: retirement, downsizing, loss of a spouse, and adapting to changing health needs.",
      icon: <Clock className="h-5 w-5 text-amber-200" />,
      buttonText: "Explore Guidance",
      action: { type: 'other', title: "Life Transitions", path: "golden-years-transitions" }
    },
    {
      title: "Family Connection Tools",
      description: "Tools to strengthen bonds with children and grandchildren, create memories, and bridge generational gaps.",
      icon: <UserRound className="h-5 w-5 text-amber-200" />,
      buttonText: "Connect with Family",
      action: { type: 'other', title: "Family Connection Tools", path: "golden-years-family" }
    }
  ];

  const handleResourceClick = (resource: any) => {
    setLoadingResource(resource.title);
    
    // Show a toast notification
    toast({
      title: `Accessing ${resource.title}`,
      description: "Loading your requested resources...",
      duration: 1500,
    });
    
    setTimeout(() => {
      // Ensure we're using the correct navigation path and state
      if (resource.action) {
        // Fix: Ensure proper navigation state
        if (resource.action.type === 'other' || resource.action.type === 'join') {
          // For direct navigation to specific feature pages
          navigate(`/${resource.action.path}`, {
            state: { 
              stayInPortal: true,
              preventTutorial: true,
              portalPath: '/app/golden-years-portal',
              featureName: resource.title
            }
          });
        } else {
          // Use the feature actions handler for other action types
          handleActionClick(resource.action);
        }
      } else {
        // Fallback to the parent component's click handler
        onResourceClick(resource.title);
      }
      
      setLoadingResource(null);
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {resources.map((resource, index) => (
        <ResourceCard
          key={index}
          title={resource.title}
          description={resource.description}
          icon={resource.icon}
          onResourceClick={() => handleResourceClick(resource)}
          buttonText={resource.buttonText}
          isLoading={loadingResource === resource.title}
        />
      ))}
    </div>
  );
};

export default ResourcesSection;
