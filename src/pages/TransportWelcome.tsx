
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { Truck } from "lucide-react";

const TransportWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="Transport Industry Wellness"
      description="A specialized mental health and wellness program designed specifically for truck drivers and transportation workers facing the unique challenges of life on the road."
      whatToExpect={[
        "Industry-tailored assessments addressing the mental health challenges of long-haul driving and transportation work",
        "Resources for managing isolation and maintaining social connections while on the road",
        "Stress management techniques for handling traffic, tight schedules, and delivery pressures",
        "Health strategies for maintaining physical and mental wellness with limited access to facilities",
        "Sleep hygiene approaches for those with irregular schedules and overnight routes",
        "Community support from peers who understand the transportation industry's unique demands",
        "Practical workshops on preventing burnout and maintaining work-life balance in a mobile workplace"
      ]}
      color="blue-500"
      gradientFrom="blue-400"
      gradientTo="blue-600"
      borderColor="#3B82F6"
      portalPath="/transport-portal"
      icon={<Truck className="h-12 w-12 text-white" />}
      coverImage="https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&w=1280&q=80"
      motivationalMessage="Your role in keeping our world connected through transportation is essential. While you focus on delivering for others, this program is designed to help you prioritize your own mental wellbeing on the journey."
    />
  );
};

export default TransportWelcome;
