import React from "react";
import { Info, Calendar, Users, FileText, MessageSquare, BookOpen, PanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface PatientsTabProps {
  onFeatureClick: (path: string) => void;
}

const PatientsTab: React.FC<PatientsTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const patientResources = [
    {
      id: "newly-diagnosed",
      title: isSpanish ? "Recién Diagnosticado" : "Newly Diagnosed",
      icon: <Info className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Recursos para pacientes que recientemente han sido diagnosticados con cáncer"
        : "Resources for patients who have recently been diagnosed with cancer",
      path: "newly-diagnosed"
    },
    {
      id: "treatment",
      title: isSpanish ? "Durante el Tratamiento" : "During Treatment",
      icon: <Calendar className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Apoyo durante el proceso de tratamiento y citas médicas"
        : "Support through the treatment process and medical appointments",
      path: "treatment"
    },
    {
      id: "stages",
      title: isSpanish ? "Etapas del Cáncer" : "Cancer Stages",
      icon: <PanelTop className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Información sobre las diferentes etapas del cáncer y qué esperar"
        : "Information about different cancer stages and what to expect",
      path: "stages"
    },
    {
      id: "survivorship",
      title: isSpanish ? "Supervivencia" : "Survivorship",
      icon: <Users className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Recursos para la vida después del tratamiento del cáncer"
        : "Resources for life after cancer treatment",
      path: "survivorship"
    },
    {
      id: "peer-connect",
      title: isSpanish ? "Conectar con Otros Pacientes" : "Connect with Fellow Patients",
      icon: <MessageSquare className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Conéctate con otros pacientes para compartir experiencias"
        : "Connect with other patients to share experiences",
      path: "peer-connect"
    },
    {
      id: "events",
      title: isSpanish ? "Eventos y Talleres" : "Events & Workshops",
      icon: <Calendar className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Eventos virtuales y presenciales para pacientes"
        : "Virtual and in-person events for patients",
      path: "events"
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-3">
          {isSpanish ? "Recursos para Pacientes" : "Patient Resources"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Apoyo especializado para personas que están navegando su diagnóstico y tratamiento de cáncer." 
            : "Specialized support for individuals navigating cancer diagnosis and treatment."}
        </p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {patientResources.map(resource => (
          <motion.div key={resource.id} variants={item}>
            <ResourceCard
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              onClick={() => onFeatureClick(resource.path)}
              buttonText={isSpanish ? "Explorar" : "Explore"}
              colorTheme="rose"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/30 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-5 w-5 text-rose-500" />
          <h3 className="font-medium text-rose-600 dark:text-rose-400">
            {isSpanish ? "Tipos de Cáncer" : "Cancer Types"}
          </h3>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {isSpanish 
            ? "Información específica sobre diferentes tipos de cáncer, tratamientos y recursos." 
            : "Find specific information about different types of cancer, treatments, and resources."}
        </p>
        <Button 
          className="mt-3 bg-rose-500 hover:bg-rose-600 text-white"
          onClick={() => onFeatureClick("cancer-support/types/general")}
        >
          {isSpanish ? "Ver Todos los Tipos" : "View All Types"}
        </Button>
      </div>
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/20"
          onClick={() => onFeatureClick("cancer-support/immediate-support")}
        >
          {isSpanish ? "Necesito Apoyo Inmediato" : "I Need Immediate Support"}
        </Button>
      </div>
    </div>
  );
};

export default PatientsTab;
