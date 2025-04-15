
import React from "react";
import ResourceCard from "./ResourceCard";
import { HeartHandshake, BookOpen, Users, Lightbulb, Clock, Globe } from "lucide-react";

interface ResourcesSectionProps {
  onResourceClick: (feature: string) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onResourceClick }) => {
  const resources = [
    {
      title: "Wellness Resources",
      description: "Age-appropriate exercises, nutrition advice, and mental wellness practices designed specifically for seniors.",
      icon: <HeartHandshake className="h-5 w-5 text-amber-200" />,
      buttonText: "Explore Resources"
    },
    {
      title: "End-of-Life Planning",
      description: "Thoughtful resources to help with advance care planning, will preparation, and ensuring your wishes are documented.",
      icon: <BookOpen className="h-5 w-5 text-amber-200" />,
      buttonText: "Access Planning Tools"
    },
    {
      title: "Community Connections",
      description: "Connect with peers, join discussion groups, and find community events in your area.",
      icon: <Users className="h-5 w-5 text-amber-200" />,
      buttonText: "Join Community"
    },
    {
      title: "Memory & Cognitive Health",
      description: "Brain exercises, memory techniques, and activities to maintain cognitive function and mental sharpness.",
      icon: <Lightbulb className="h-5 w-5 text-amber-200" />,
      buttonText: "Brain Fitness"
    },
    {
      title: "Life Transitions",
      description: "Resources for major life changes: retirement, downsizing, loss of a spouse, and adapting to changing health needs.",
      icon: <Clock className="h-5 w-5 text-amber-200" />,
      buttonText: "Explore Guidance"
    },
    {
      title: "Family Connection Tools",
      description: "Tools to strengthen bonds with children and grandchildren, create memories, and bridge generational gaps.",
      icon: <Globe className="h-5 w-5 text-amber-200" />,
      buttonText: "Connect with Family"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {resources.map((resource, index) => (
        <ResourceCard
          key={index}
          title={resource.title}
          description={resource.description}
          icon={resource.icon}
          onResourceClick={onResourceClick}
          buttonText={resource.buttonText}
        />
      ))}
    </div>
  );
};

export default ResourcesSection;
