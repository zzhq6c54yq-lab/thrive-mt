import React from "react";
import { Heart } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const PortalHeader: React.FC = () => {
  const { isSpanish } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-rose-600 to-pink-800 rounded-lg p-8 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">
          {isSpanish ? "Portal de Bienestar para Padres Solteros" : "Single Parent Wellness Portal"}
        </h1>
      </div>
      <p className="text-white/90 text-lg">
        {isSpanish 
          ? "Tu comunidad para fortaleza, apoyo y autocuidado"
          : "Your community for strength, support, and self-care"}
      </p>
    </div>
  );
};

export default PortalHeader;
