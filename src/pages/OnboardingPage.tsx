
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';

const OnboardingPage: React.FC = () => {
  const { user, profile, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/app/auth');
      } else if (profile?.onboarding_completed) {
        navigate('/app/dashboard');
      }
    }
  }, [user, profile, loading, navigate]);

  const handleOnboardingComplete = () => {
    navigate('/app/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-gray-800 text-xl">Setting up your experience...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return <OnboardingWizard onComplete={handleOnboardingComplete} />;
};

export default OnboardingPage;
