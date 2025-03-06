
import React, { useState, useEffect } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [startFadeOut, setStartFadeOut] = useState(false);
  
  useEffect(() => {
    // Start the fade out effect after 8 seconds (increased from 5)
    const fadeOutTimer = setTimeout(() => {
      setStartFadeOut(true);
    }, 8000);
    
    // Complete the transition after 12 seconds total (increased from 8)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 12000);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-start pt-24 md:pt-32 text-white">
      <div className="text-center">
        <div className={`intro-logo-icon mb-4 ${startFadeOut ? 'logo-persist' : ''}`}>
          <img 
            src="/lovable-uploads/7d06dcc4-22d6-4a52-8d1a-ad5febe60afb.png" 
            alt="Thrive MT Logo" 
            className="h-64 w-auto mx-auto" 
            style={{ filter: "brightness(0) saturate(100%) invert(100%) sepia(43%) saturate(1352%) hue-rotate(337deg) brightness(89%) contrast(91%)" }}
          />
        </div>
        <h1 className={`intro-logo-text text-5xl md:text-7xl font-bold mb-2 ${startFadeOut ? 'logo-text-persist' : ''}`}>
          <span className="copper-text">Thrive MT</span>
        </h1>
        <h2 className={`intro-logo-text text-2xl md:text-3xl font-semibold mb-4 ${startFadeOut ? 'fade-out-fast' : ''}`}>
          <span className="text-white">New Beginnings</span>
        </h2>
        <p className={`intro-tagline text-xl md:text-2xl text-[#B87333] mb-4 ${startFadeOut ? 'fade-out-fast' : ''}`}>
          because life should be more than just surviving
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
