
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { UtensilsCrossed } from "lucide-react";

const HospitalityWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="Hospitality Industry Wellness"
      description="A dedicated mental health and wellness program designed specifically for restaurant and hospitality professionals facing the unique challenges of the service industry."
      whatToExpect={[
        "Industry-specific assessments tailored to the high-pressure environment of hospitality work",
        "Strategies for managing guest interactions and difficult customer situations",
        "Self-care resources for those who spend long hours on their feet",
        "Stress management techniques for fast-paced work environments",
        "Work-life balance tools for those with irregular schedules and late shifts",
        "Community support from peers who understand the unique challenges of hospitality work",
        "Practical workshops on building resilience and preventing burnout"
      ]}
      color="purple-500"
      gradientFrom="purple-400"
      gradientTo="indigo-500"
      borderColor="#9b87f5"
      portalPath="/hospitality-portal"
      icon={<UtensilsCrossed className="h-12 w-12 text-white" />}
      coverImage="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=1280&q=80"
      motivationalMessage="Your role in the hospitality industry brings joy, comfort, and memorable experiences to others. Now it's time to prioritize your own wellbeing with the same dedication you bring to serving others."
    />
  );
};

export default HospitalityWelcome;
