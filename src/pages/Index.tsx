
import React from "react";
import { UserProvider } from "@/contexts/UserContext";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";
import useTranslation from "@/hooks/useTranslation";

const Index = () => {
  const { preferredLanguage, setPreferredLanguage } = useTranslation();

  console.log("[Index] Rendering with new onboarding system");

  return (
    <UserProvider>
      <div className="min-h-screen">
        <OnboardingContainer />
        <CrisisOverlay />
        
      </div>
    </UserProvider>
  );
};

export default Index;
