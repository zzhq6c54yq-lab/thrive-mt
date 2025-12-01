
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import EpicDashboard from '@/components/dashboard/epic/EpicDashboard';

const Dashboard: React.FC = () => {
  const { user, profile, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/app/auth');
      } else if (profile?.is_therapist) {
        // Redirect therapists to their dashboard, bypass onboarding
        navigate('/app/therapist-dashboard');
      } else if (profile && !profile.onboarding_completed) {
        navigate('/app/onboarding');
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null; // Will redirect via useEffect
  }

  return <EpicDashboard />;
};

export default Dashboard;
