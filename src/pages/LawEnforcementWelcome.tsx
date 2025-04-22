
import React from "react";
import { Shield } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const LawEnforcementWelcome = () => {
  const whatToExpect = [
    "Access to law enforcement-specific mental health resources and tools",
    "Confidential peer support networks with fellow officers",
    "Specialized stress management techniques for law enforcement work",
    "Critical incident and trauma support resources",
    "Family support services designed for law enforcement families",
    "24/7 crisis support from professionals who understand your job"
  ];

  return (
    <SpecializedProgramWelcome
      title="Law Enforcement Program"
      description="A dedicated mental health and wellness program designed specifically for law enforcement professionals. Get the support you need while serving and protecting."
      whatToExpect={whatToExpect}
      color="blue-600"
      gradientFrom="blue-600"
      gradientTo="blue-800"
      borderColor="blue-600"
      portalPath="/law-enforcement-portal"
      icon={<Shield className="w-12 h-12 text-white" />}
      coverImage="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
    />
  );
};

export default LawEnforcementWelcome;
