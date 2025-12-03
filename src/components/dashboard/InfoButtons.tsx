
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useTranslation from "@/hooks/useTranslation";

const InfoButtons: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const handleBarterSystem = () => {
    console.log("Barter System clicked");
    navigate("/app/barter-system");
  };

  const handleUpgradePlan = () => {
    console.log("Upgrade Plan clicked");
    navigate("/app/subscription-plans");
  };

  const handleOmniCredits = () => {
    console.log("Omni Credits clicked");
    navigate("/app/copay-credits");
  };

  return (
    <div className="flex justify-center gap-4 mt-4 mb-6">
      <Button
        onClick={handleBarterSystem}
        className="text-xs px-3 py-1 bg-black/80 hover:bg-black/90 text-white border border-gray-600 rounded-md transition-colors"
        size="sm"
      >
        {isSpanish ? "Sistema de Trueque" : "Barter System"}
      </Button>
      <Button
        onClick={handleUpgradePlan}
        className="text-xs px-3 py-1 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-black font-semibold border border-[#B87333] rounded-md transition-all duration-200 hover:shadow-lg"
        size="sm"
      >
        {isSpanish ? "Actualizar Plan" : "Upgrade Plan"}
      </Button>
      <Button
        onClick={handleOmniCredits}
        className="text-xs px-3 py-1 bg-black/80 hover:bg-black/90 text-white border border-gray-600 rounded-md transition-colors"
        size="sm"
      >
        {isSpanish ? "Créditos Omni" : "Omni Credits"}
      </Button>
    </div>
  );
};

export default InfoButtons;
