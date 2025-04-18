
import React from "react";
import useTranslation from "@/hooks/useTranslation";

interface WelcomeTextProps {
  userName: string;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({ userName }) => {
  const { isSpanish, getTranslatedText } = useTranslation();
  const displayName = userName || "Friend";
  
  return (
    <div className="text-center mt-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
          {getTranslatedText('welcome')}
        </span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#B87333] to-[#E5C5A1] animate-gradient-x" style={{backgroundSize: '200% auto', animationDelay: '0.5s'}}>
          Thrive MT
        </span>
      </h1>
      <p className="mt-3 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1]/90 to-[#B87333]/90">
        {isSpanish ? `¡Hola ${displayName}! Trabajemos en tu viaje de salud mental` : `Hey ${displayName}! Let's work on your mental health journey`}
      </p>
    </div>
  );
};

export default WelcomeText;
