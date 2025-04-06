
import React from "react";
import { Building, ChartBar, Brain, Users, FileText } from "lucide-react";
import FeatureCard from "./FeatureCard";
import useTranslation from "@/hooks/useTranslation";

interface EmployeeTabProps {
  onFeatureClick: (path: string) => void;
}

const EmployeeTab: React.FC<EmployeeTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <FeatureCard 
        title={isSpanish ? "Bienestar en el Trabajo" : "Workplace Wellness"}
        description={isSpanish 
          ? "Recursos para mantener el bienestar mental en un entorno de pequeña empresa" 
          : "Resources for maintaining mental wellbeing in a small business environment"}
        icon={Building}
        color="bg-emerald-600"
        onClick={() => onFeatureClick("employee-readiness")}
      />
      <FeatureCard 
        title={isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}
        description={isSpanish 
          ? "Estrategias para mantener límites saludables entre el trabajo y la vida personal" 
          : "Strategies for maintaining healthy boundaries between work and personal life"}
        icon={ChartBar}
        color="bg-indigo-600"
        onClick={() => onFeatureClick("wellness-challenges")}
      />
      <FeatureCard 
        title={isSpanish ? "Manejo del Estrés" : "Stress Management"}
        description={isSpanish 
          ? "Técnicas para manejar el estrés específico de trabajar en una pequeña empresa" 
          : "Techniques for managing stress specific to working in a small business"}
        icon={Brain}
        color="bg-purple-600"
        onClick={() => onFeatureClick("mental-wellness")}
      />
      <FeatureCard 
        title={isSpanish ? "Desarrollo de Carrera" : "Career Development"}
        description={isSpanish 
          ? "Recursos para el crecimiento profesional mientras cuidas tu salud mental" 
          : "Resources for professional growth while caring for your mental health"}
        icon={ChartBar}
        color="bg-cyan-600"
        onClick={() => onFeatureClick("resource-library")}
      />
      <FeatureCard 
        title={isSpanish ? "Comunidad de Apoyo" : "Support Community"}
        description={isSpanish 
          ? "Conéctate con otros empleados que enfrentan desafíos similares" 
          : "Connect with other employees facing similar challenges"}
        icon={Users}
        color="bg-pink-600"
        onClick={() => onFeatureClick("community-support")}
      />
      <FeatureCard 
        title={isSpanish ? "Evaluaciones de Bienestar" : "Wellness Assessments"}
        description={isSpanish 
          ? "Evaluaciones personalizadas para empleados de pequeñas empresas" 
          : "Personalized assessments for small business employees"}
        icon={FileText}
        color="bg-amber-600"
        onClick={() => onFeatureClick("mental-wellness/assessments")}
      />
    </div>
  );
};

export default EmployeeTab;
