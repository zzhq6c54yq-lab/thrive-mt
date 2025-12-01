import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useUser();

  // Redirect authenticated users with completed onboarding to dashboard
  useEffect(() => {
    if (!loading && user && profile?.onboarding_completed) {
      navigate('/app/dashboard');
    }
  }, [user, profile, loading, navigate]);

  return (
    <div className="min-h-screen">
      <OnboardingContainer />
      <CrisisOverlay />
    </div>
  );
};

export default Index;
