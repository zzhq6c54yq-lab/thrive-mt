import React from "react";
import { HeartHandshake, BookOpen, MessageSquare, Calendar, FileText, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface CaregiversTabProps {
  onFeatureClick: (path: string) => void;
}

const CaregiversTab: React.FC<CaregiversTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const caregiverResources = [
    {
      id: "caregiver-basics",
      title: isSpanish ? "Conceptos Básicos para Cuidadores" : "Caregiver Basics",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Información esencial para nuevos cuidadores de pacientes con cáncer"
        : "Essential information for new cancer caregivers",
      path: "caregiver-basics"
    },
    {
      id: "caregiver-selfcare",
      title: isSpanish ? "Autocuidado para Cuidadores" : "Caregiver Self-Care",
      icon: <Heart className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Cómo cuidar de tu propio bienestar mientras cuidas a otros"
        : "How to care for your own wellbeing while caring for others",
      path: "caregiver-selfcare"
    },
    {
      id: "caregiver-communication",
      title: isSpanish ? "Comunicación Efectiva" : "Effective Communication",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Consejos para comunicarse con pacientes y profesionales médicos"
        : "Tips for communicating with patients and healthcare professionals",
      path: "caregiver-communication"
    },
    {
      id: "financial-navigation",
      title: isSpanish ? "Navegación Financiera" : "Financial Navigation",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Ayuda para manejar los aspectos financieros del cuidado"
        : "Help managing the financial aspects of caregiving",
      path: "financial-navigation"
    },
    {
      id: "caregiver-workshops",
      title: isSpanish ? "Talleres para Cuidadores" : "Caregiver Workshops",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Talleres educativos diseñados específicamente para cuidadores"
        : "Educational workshops designed specifically for caregivers",
      path: "caregiver-workshops"
    },
    {
      id: "caregiver-stories",
      title: isSpanish ? "Historias de Cuidadores" : "Caregiver Stories",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Experiencias compartidas por otros cuidadores de pacientes con cáncer"
        : "Experiences shared by other cancer caregivers",
      path: "caregiver-stories"
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-3">
          {isSpanish ? "Recursos para Cuidadores" : "Caregiver Resources"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Apoyo dedicado para quienes cuidan a seres queridos con cáncer." 
            : "Dedicated support for those caring for loved ones with cancer."}
        </p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {caregiverResources.map(resource => (
          <motion.div key={resource.id} variants={item}>
            <ResourceCard
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              onClick={() => onFeatureClick(resource.path)}
              buttonText={isSpanish ? "Explorar" : "Explore"}
              colorTheme="purple"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button 
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => onFeatureClick("cancer-support/caregiver-forum")}
        >
          {isSpanish ? "Foro de Discusión de Cuidadores" : "Caregiver Discussion Forum"}
        </Button>
        <Button 
          variant="outline" 
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-300/50 dark:border-purple-700/50 text-purple-600 dark:text-purple-400 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
          onClick={() => onFeatureClick("cancer-support/caregiver-groups")}
        >
          {isSpanish ? "Grupos de Apoyo" : "Support Groups"}
        </Button>
      </div>
    </div>
  );
};

export default CaregiversTab;
