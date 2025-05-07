
import React from "react";
import { Stethoscope } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const ChronicIllnessWelcome: React.FC = () => {
  const whatToExpect = [
    "Educational resources about chronic illness management",
    "Tools for tracking symptoms, medications, and appointments",
    "Emotional support and coping strategies tailored to chronic conditions",
    "Community forums to connect with others facing similar challenges",
    "Access to specialized mental health professionals",
    "Guided meditations and relaxation techniques for pain and stress management",
    "Goal setting tools to help you on your wellness journey",
    "Resources for family members and caregivers",
    "Integration options with health tracking apps",
    "Personalized content based on your specific health needs"
  ];

  return (
    <SpecializedProgramWelcome
      title="Chronic Illness Support Program"
      description="A specialized program designed to support your mental health and wellbeing while living with chronic health conditions."
      whatToExpect={whatToExpect}
      color="purple"
      gradientFrom="purple"
      gradientTo="violet"
      borderColor="purple"
      portalPath="/chronic-illness-portal"
      icon={<Stethoscope className="w-8 h-8 text-white" />}
      coverImage="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1280&q=80"
      motivationalMessage="Living with chronic illness can be challenging, but you don't have to face it alone. This program offers tools, support, and community to help you thrive despite your health challenges."
    />
  );
};

export default ChronicIllnessWelcome;
