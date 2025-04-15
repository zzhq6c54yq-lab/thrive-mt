import React from "react";
import ResourceCard from "./ResourceCard";
import { HeartHandshake, BookOpen, Users, Lightbulb, Clock, Globe, Brain, UserRound } from "lucide-react";
import useFeatureActions from "@/hooks/useFeatureActions";

interface ResourcesSectionProps {
  onResourceClick: (feature: string) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onResourceClick }) => {
  const { handleActionClick } = useFeatureActions();
  
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
    if (resource.action) {
      handleActionClick(resource.action);
    } else {
      onResourceClick(resource.title);
    }
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
        />
      ))}
    </div>
  );
};

export default ResourcesSection;
