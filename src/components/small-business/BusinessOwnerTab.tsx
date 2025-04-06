
import React from "react";
import { Brain, Wallet, Building, ChartBar, Handshake, HelpCircle } from "lucide-react";
import FeatureCard from "./FeatureCard";
import useTranslation from "@/hooks/useTranslation";

interface BusinessOwnerTabProps {
  onFeatureClick: (path: string) => void;
}

const BusinessOwnerTab: React.FC<BusinessOwnerTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <FeatureCard 
        title={isSpanish ? "Manejo del Estrés" : "Stress Management"}
        description={isSpanish 
          ? "Técnicas específicas para manejar el estrés de dirigir un negocio" 
          : "Specific techniques for managing the stress of running a business"}
        icon={Brain}
        color="bg-amber-600"
        onClick={() => onFeatureClick("mental-wellness")}
      />
      <FeatureCard 
        title={isSpanish ? "Salud Financiera" : "Financial Wellness"}
        description={isSpanish 
          ? "Recursos para reducir la ansiedad relacionada con las finanzas empresariales" 
          : "Resources for reducing anxiety related to business finances"}
        icon={Wallet}
        color="bg-green-600"
        onClick={() => onFeatureClick("resource-library")}
      />
      <FeatureCard 
        title={isSpanish ? "Liderazgo Saludable" : "Healthy Leadership"}
        description={isSpanish 
          ? "Crear una cultura de trabajo que priorice el bienestar mental" 
          : "Building a workplace culture that prioritizes mental wellbeing"}
        icon={Building}
        color="bg-blue-600"
        onClick={() => onFeatureClick("workshops")}
      />
      <FeatureCard 
        title={isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}
        description={isSpanish 
          ? "Estrategias para equilibrar las demandas empresariales y la vida personal" 
          : "Strategies for balancing business demands and personal life"}
        icon={ChartBar}
        color="bg-purple-600"
        onClick={() => onFeatureClick("holistic-wellness")}
      />
      <FeatureCard 
        title={isSpanish ? "Redes de Apoyo" : "Support Networks"}
        description={isSpanish 
          ? "Conéctate con otros emprendedores que entienden tus desafíos" 
          : "Connect with other entrepreneurs who understand your challenges"}
        icon={Handshake}
        color="bg-pink-600"
        onClick={() => onFeatureClick("community-support")}
      />
      <FeatureCard 
        title={isSpanish ? "Crisis y Soporte" : "Crisis & Support"}
        description={isSpanish 
          ? "Recursos para cuando los desafíos empresariales afectan severamente la salud mental" 
          : "Resources for when business challenges severely impact mental health"}
        icon={HelpCircle}
        color="bg-red-600"
        onClick={() => onFeatureClick("crisis-support")}
      />
    </div>
  );
};

export default BusinessOwnerTab;
