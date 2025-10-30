
import React from "react";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";
import useTranslation from "@/hooks/useTranslation";

const Index = () => {
  const { preferredLanguage, setPreferredLanguage } = useTranslation();

  return (
    <div className="min-h-screen">
      <OnboardingContainer />
      <CrisisOverlay />
    </div>
  );
};

export default Index;
