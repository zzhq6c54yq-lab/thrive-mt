import React from "react";
import { Baby, MessageSquare, HeartHandshake, School, Users, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface ChildrenTabProps {
  onFeatureClick: (path: string) => void;
}

const ChildrenTab: React.FC<ChildrenTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const childrenResources = [
    {
      id: "talking-to-children",
      title: isSpanish ? "Hablando con Niños sobre el Cáncer" : "Talking to Children About Cancer",
      icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Guías para explicar el cáncer a niños de diferentes edades"
        : "Guidelines for explaining cancer to children of different ages",
      path: "talking-to-children"
    },
    {
      id: "children-emotions",
      title: isSpanish ? "Manejando Emociones" : "Managing Emotions",
      icon: <HeartHandshake className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Ayudando a los niños a navegar los sentimientos complejos relacionados con el cáncer"
        : "Helping children navigate complex feelings related to cancer",
      path: "children-emotions"
    },
    {
      id: "parenting-through-treatment",
      title: isSpanish ? "Crianza Durante el Tratamiento" : "Parenting Through Treatment",
      icon: <Baby className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Consejos para padres que están recibiendo tratamiento para el cáncer"
        : "Advice for parents who are undergoing cancer treatment",
      path: "parenting-through-treatment"
    },
    {
      id: "family-activities",
      title: isSpanish ? "Actividades Familiares" : "Family Activities",
      icon: <Puzzle className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Actividades que familias pueden hacer juntas durante los desafíos del cáncer"
        : "Activities families can do together during cancer challenges",
      path: "family-activities"
    },
    {
      id: "pediatric-cancer",
      title: isSpanish ? "Cáncer Pediátrico" : "Pediatric Cancer",
      icon: <Baby className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Recursos específicos para familias con niños diagnosticados con cáncer"
        : "Specific resources for families with children diagnosed with cancer",
      path: "pediatric-cancer"
    },
    {
      id: "family-support",
      title: isSpanish ? "Grupos de Apoyo Familiar" : "Family Support Groups",
      icon: <Users className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Conecta con otras familias que están enfrentando desafíos similares"
        : "Connect with other families facing similar challenges",
      path: "family-support"
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-3">
          {isSpanish ? "Recursos para Niños y Padres" : "Children & Parents Resources"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Apoyo para familias que están manejando el cáncer con niños involucrados." 
            : "Support for families managing cancer with children involved."}
        </p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {childrenResources.map(resource => (
          <motion.div key={resource.id} variants={item}>
            <ResourceCard
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              onClick={() => onFeatureClick(resource.path)}
              buttonText={isSpanish ? "Explorar" : "Explore"}
              colorTheme="amber"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-5 rounded-lg mt-6">
        <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">
          {isSpanish ? "Recursos Adicionales" : "Additional Resources"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("hospital-school")}
          >
            <School className="mr-2 h-4 w-4" />
            {isSpanish ? "Escuela en el Hospital" : "Hospital Schooling"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("parent-connect")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isSpanish ? "Conectar con Otros Padres" : "Connect with Parents"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("kids-connect")}
          >
            <Puzzle className="mr-2 h-4 w-4" />
            {isSpanish ? "Actividades para Niños" : "Kids' Activities"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("teen-programs")}
          >
            <Users className="mr-2 h-4 w-4" />
            {isSpanish ? "Programas para Adolescentes" : "Teen Programs"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChildrenTab;
