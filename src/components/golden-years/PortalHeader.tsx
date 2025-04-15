
import React from "react";

interface PortalHeaderProps {
  title: string;
  subtitle: string;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="text-xl text-amber-100 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default PortalHeader;
