
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ThriveButtonProps {
  className?: string;
}

const ThriveButton: React.FC<ThriveButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  const handleNavigateToMain = () => {
    // Store current location for return navigation
    const currentPath = window.location.pathname;
    localStorage.setItem('lastVisitedPath', currentPath);
    
    // Ensure onboarding is marked complete
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    navigate('/app/dashboard');
  };
  
  return (
    <button
      onClick={handleNavigateToMain}
      className={`border-2 border-[#B87333] px-3 py-1 rounded-md transition-all duration-300 hover:shadow-[0_0_8px_rgba(184,115,51,0.5)] ${className}`}
    >
      <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#B87333]">
        THRIVE
      </span>
    </button>
  );
};

export default ThriveButton;
