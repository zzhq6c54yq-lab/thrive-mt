import React from "react";
import { BookOpen, FileText, Apple, Beaker, GraduationCap, DollarSign, UserCog, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface ResourcesTabProps {
  onFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const resourceItems = [
    {
      id: "cancer-types",
      title: isSpanish ? "Tipos de Cáncer" : "Cancer Types",
      icon: <BookOpen className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Información sobre varios tipos de cáncer y sus tratamientos"
        : "Information about various cancer types and their treatments",
      path: "cancer-types"
    },
    {
      id: "treatment-options",
      title: isSpanish ? "Opciones de Tratamiento" : "Treatment Options",
      icon: <FileText className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Guías detalladas sobre tratamientos y terapias"
        : "Detailed guides on treatments and therapies",
      path: "treatment-options"
    },
    {
      id: "side-effects",
      title: isSpanish ? "Efectos Secundarios" : "Side Effects",
      icon: <FileText className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Manejo de efectos secundarios comunes de los tratamientos"
        : "Managing common treatment side effects",
      path: "side-effects"
    },
    {
      id: "nutrition",
      title: isSpanish ? "Nutrición" : "Nutrition",
      icon: <Apple className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Consejos de alimentación durante y después del tratamiento"
        : "Dietary guidance during and after treatment",
      path: "nutrition"
    },
    {
      id: "clinical-trials",
      title: isSpanish ? "Ensayos Clínicos" : "Clinical Trials",
      icon: <Beaker className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Información sobre investigaciones y ensayos clínicos actuales"
        : "Information on current research and clinical trials",
      path: "clinical-trials"
    },
    {
      id: "research-updates",
      title: isSpanish ? "Actualizaciones de Investigación" : "Research Updates",
      icon: <GraduationCap className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Noticias y avances recientes en la investigación del cáncer"
        : "Recent news and advances in cancer research",
      path: "research-updates"
    }
  ];
  
  const practicalResources = [
    {
      id: "financial-resources",
      title: isSpanish ? "Recursos Financieros" : "Financial Resources",
      icon: <DollarSign className="h-5 w-5 text-cyan-500" />,
      path: "financial-resources"
    },
    {
      id: "healthcare-navigation",
      title: isSpanish ? "Navegación del Sistema de Salud" : "Healthcare Navigation",
      icon: <UserCog className="h-5 w-5 text-cyan-500" />,
      path: "healthcare-navigation"
    },
    {
      id: "legal-resources",
      title: isSpanish ? "Recursos Legales" : "Legal Resources",
      icon: <Scale className="h-5 w-5 text-cyan-500" />,
      path: "legal-resources"
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent mb-3">
          {isSpanish ? "Biblioteca de Recursos" : "Resource Library"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Acceso a información confiable y educativa sobre el cáncer." 
            : "Access to reliable, educational information about cancer."}
        </p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {resourceItems.map(resource => (
          <motion.div key={resource.id} variants={item}>
            <ResourceCard
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              onClick={() => onFeatureClick(resource.path)}
              buttonText={isSpanish ? "Ver" : "View"}
              colorTheme="cyan"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent mb-4">
            {isSpanish ? "Recursos Prácticos" : "Practical Resources"}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {practicalResources.map(resource => (
            <Button 
              key={resource.id}
              variant="outline" 
              size="sm"
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-cyan-300/50 dark:border-cyan-700/50 text-cyan-600 dark:text-cyan-400 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => onFeatureClick(resource.path)}
            >
              {resource.icon}
              <span className="text-sm">{resource.title}</span>
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/30 dark:to-blue-950/30 backdrop-blur-sm border border-cyan-300/50 dark:border-cyan-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
              {isSpanish ? "Historias de Sobrevivientes" : "Survivor Stories"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isSpanish 
                ? "Lee historias inspiradoras de personas que han superado el cáncer"
                : "Read inspiring stories from people who have overcome cancer"}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-cyan-300/50 dark:border-cyan-700/50 text-cyan-600 dark:text-cyan-400 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
              onClick={() => onFeatureClick("cancer-support/survivor-stories")}
            >
              {isSpanish ? "Leer Historias" : "Read Stories"}
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 backdrop-blur-sm border border-purple-300/50 dark:border-purple-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">
              {isSpanish ? "Inspiración Diaria" : "Daily Inspiration"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isSpanish 
                ? "Mensajes motivacionales y afirmaciones para cada día"
                : "Motivational messages and affirmations for each day"}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-300/50 dark:border-purple-700/50 text-purple-600 dark:text-purple-400 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
              onClick={() => onFeatureClick("cancer-support/daily-inspiration")}
            >
              {isSpanish ? "Ver Mensajes" : "View Messages"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
