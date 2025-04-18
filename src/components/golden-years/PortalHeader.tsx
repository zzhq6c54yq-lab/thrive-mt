
import React from "react";
import useTranslation from "@/hooks/useTranslation";

interface PortalHeaderProps {
  title: string;
  subtitle: string;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ title, subtitle }) => {
  const { preferredLanguage } = useTranslation();
  
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-semibold mb-4 text-amber-50">{title}</h1>
      <p className="text-xl text-amber-100 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default PortalHeader;
