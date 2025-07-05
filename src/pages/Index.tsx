
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
        
        {/* Language selector */}
        <div className="fixed top-4 right-20 z-40">
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value as any)}
            className="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
          >
            <option value="English">English</option>
            <option value="Español">Español</option>
            <option value="Português">Português</option>
            <option value="Filipino">Filipino</option>
          </select>
        </div>
      </div>
    </UserProvider>
  );
};

export default Index;
