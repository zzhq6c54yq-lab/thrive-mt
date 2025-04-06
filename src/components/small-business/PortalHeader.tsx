
import React from "react";
import { Briefcase } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const PortalHeader: React.FC = () => {
  const { isSpanish } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-[#F97316]/30 to-[#FB923C]/30 p-6 rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-white/10 rounded-full">
          <Briefcase className="h-10 w-10 text-[#F97316]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSpanish ? "Recursos de Bienestar Mental para Pequeñas Empresas" : "Small Business Mental Wellness Resources"}
          </h2>
          <p className="text-white/80">
            {isSpanish 
              ? "Recursos especializados para apoyar la salud mental de emprendedores y empleados de pequeñas empresas."
              : "Specialized resources to support the mental health of entrepreneurs and small business employees."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalHeader;
