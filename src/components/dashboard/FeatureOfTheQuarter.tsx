
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const FEATURES_QUARTER = [
  {
    id: "barter-system",
    title: "Barter System",
    description: "Trade services and support with the community in a fair way.",
    route: "/barter-system",
    color: "from-zinc-900 to-zinc-800"
  },
  {
    id: "upgrade-plan",
    title: "Upgrade Plan",
    description: "Explore the latest system upgrade and support options.",
    route: "/subscription-plans",
    color: "from-[#B87333] to-[#E5C5A1]"
  },
  {
    id: "copay-credit",
    title: "Omni Co-Pay Credit",
    description: "Manage and redeem co-pay credits for your care.",
    route: "/copay-credits",
    color: "from-slate-900 to-slate-800"
  }
];

const FeatureOfTheQuarter: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleNavigation = (route: string, title: string) => {
    toast({
      title: isSpanish ? `Navegando a ${title}` : `Navigating to ${title}`,
      description: isSpanish
        ? "Cargando la función solicitada..."
        : "Loading your requested feature...",
      duration: 2000,
    });
    navigate(route);
  };

  return (
    <section className="w-full mt-8 mb-4">
      <h3 className="text-2xl font-bold text-center text-[#B87333] mb-7">Feature of the Quarter</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {FEATURES_QUARTER.map(feature => (
          <div
            key={feature.id}
            className={`flex flex-col justify-between items-center p-6 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
          >
            <h4 className="text-xl font-bold text-gray-100 mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-200 mb-5 text-center">{feature.description}</p>
            <Button
              className="w-44 h-14 text-lg bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-black font-bold rounded-xl shadow-md hover:scale-105 transition duration-150"
              style={{ minWidth: "11rem", minHeight: "3.5rem", fontSize: "1.15rem" }}
              onClick={() => handleNavigation(feature.route, feature.title)}
            >
              {isSpanish ? "Ir" : "Go"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureOfTheQuarter;
