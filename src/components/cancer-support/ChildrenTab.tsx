
import React from "react";
import { Baby, MessageSquare, HeartHandshake, School, Users, Puzzle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

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
      path: "cancer-support/talking-to-children"
    },
    {
      id: "children-emotions",
      title: isSpanish ? "Manejando Emociones" : "Managing Emotions",
      icon: <HeartHandshake className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Ayudando a los niños a navegar los sentimientos complejos relacionados con el cáncer"
        : "Helping children navigate complex feelings related to cancer",
      path: "cancer-support/children-emotions"
    },
    {
      id: "parenting-through-treatment",
      title: isSpanish ? "Crianza Durante el Tratamiento" : "Parenting Through Treatment",
      icon: <Baby className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Consejos para padres que están recibiendo tratamiento para el cáncer"
        : "Advice for parents who are undergoing cancer treatment",
      path: "cancer-support/parenting-through-treatment"
    },
    {
      id: "family-activities",
      title: isSpanish ? "Actividades Familiares" : "Family Activities",
      icon: <Puzzle className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Actividades que familias pueden hacer juntas durante los desafíos del cáncer"
        : "Activities families can do together during cancer challenges",
      path: "cancer-support/family-activities"
    },
    {
      id: "pediatric-cancer",
      title: isSpanish ? "Cáncer Pediátrico" : "Pediatric Cancer",
      icon: <Baby className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Recursos específicos para familias con niños diagnosticados con cáncer"
        : "Specific resources for families with children diagnosed with cancer",
      path: "cancer-support/pediatric-cancer"
    },
    {
      id: "family-support",
      title: isSpanish ? "Grupos de Apoyo Familiar" : "Family Support Groups",
      icon: <Users className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Conecta con otras familias que están enfrentando desafíos similares"
        : "Connect with other families facing similar challenges",
      path: "cancer-support/family-support"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
          {isSpanish ? "Recursos para Niños y Padres" : "Children & Parents Resources"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isSpanish 
            ? "Apoyo para familias que están manejando el cáncer con niños involucrados." 
            : "Support for families managing cancer with children involved."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {childrenResources.map(resource => (
          <Card key={resource.id} className="border-amber-200 dark:border-amber-900/30 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 p-0 h-auto hover:bg-transparent"
                    onClick={() => onFeatureClick(resource.path)}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-5 rounded-lg mt-6">
        <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">
          {isSpanish ? "Recursos Adicionales" : "Additional Resources"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("cancer-support/hospital-school")}
          >
            <School className="mr-2 h-4 w-4" />
            {isSpanish ? "Escuela en el Hospital" : "Hospital Schooling"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("cancer-support/parent-connect")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isSpanish ? "Conectar con Otros Padres" : "Connect with Parents"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("cancer-support/kids-connect")}
          >
            <Puzzle className="mr-2 h-4 w-4" />
            {isSpanish ? "Actividades para Niños" : "Kids' Activities"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400 justify-start"
            onClick={() => onFeatureClick("cancer-support/teen-programs")}
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
