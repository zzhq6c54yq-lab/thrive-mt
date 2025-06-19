
import React from "react";
import { useNavigate } from "react-router-dom";
import { Flower, BookOpen, HeartHandshake, MessageSquare, Star, Leaf, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

interface RemembranceTabProps {
  onFeatureClick: (path: string) => void;
}

const RemembranceTab: React.FC<RemembranceTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleResourceClick = (path: string, title: string) => {
    console.log("[RemembranceTab] Navigating to:", path);
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: title,
      duration: 1500
    });
    
    // Use consistent navigation pattern
    if (path.startsWith('/cancer-support/')) {
      // For cancer support specific pages, use onFeatureClick
      onFeatureClick(path);
    } else {
      // For general pages, use direct navigation
      navigate(path);
    }
  };
  
  const remembranceResources = [
    {
      id: "memorial-garden",
      title: isSpanish ? "Jardín Memorial Virtual" : "Virtual Memorial Garden",
      icon: <Flower className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Un espacio virtual para honrar a los seres queridos que hemos perdido"
        : "A virtual space to honor loved ones we have lost",
      path: "/memorial-garden"
    },
    {
      id: "grief-resources",
      title: isSpanish ? "Recursos para el Duelo" : "Grief Resources",
      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Información y apoyo para navegar el proceso de duelo"
        : "Information and support for navigating the grief process",
      path: "/grief-resources"
    },
    {
      id: "legacy-projects",
      title: isSpanish ? "Proyectos de Legado" : "Legacy Projects",
      icon: <Star className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Ideas para crear legados significativos para honrar a los seres queridos"
        : "Ideas for creating meaningful legacies to honor loved ones",
      path: "/legacy-projects"
    },
    {
      id: "bereavement-community",
      title: isSpanish ? "Comunidad de Duelo" : "Bereavement Community",
      icon: <HeartHandshake className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Conéctate con otros que han experimentado pérdidas similares"
        : "Connect with others who have experienced similar losses",
      path: "/community-support"
    },
    {
      id: "memorial-wall",
      title: isSpanish ? "Muro Conmemorativo" : "Memorial Wall",
      icon: <Leaf className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Comparte recuerdos y reflexiones sobre tus seres queridos"
        : "Share memories and reflections about your loved ones",
      path: "/journaling"
    },
    {
      id: "grief-groups",
      title: isSpanish ? "Grupos de Duelo" : "Grief Groups",
      icon: <MessageSquare className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Grupos de apoyo facilitados por profesionales especializados en duelo"
        : "Support groups facilitated by grief specialists",
      path: "/workshops"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          {isSpanish ? "Recursos de Conmemoración" : "Remembrance Resources"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isSpanish 
            ? "Apoyo para honrar y recordar a los seres queridos que han fallecido de cáncer." 
            : "Support for honoring and remembering loved ones who have passed away from cancer."}
        </p>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 italic text-sm border-l-4 border-indigo-300 pl-4 py-1">
        {isSpanish 
          ? "Cada persona que perdemos por el cáncer deja un legado de amor, fortaleza y recuerdos que vale la pena honrar y preservar."
          : "Every person we lose to cancer leaves behind a legacy of love, strength, and memories worth honoring and preserving."}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {remembranceResources.map(resource => (
          <Card key={resource.id} className="border-indigo-200 dark:border-indigo-900/30 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/20 p-2 rounded-full">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-indigo-600 dark:text-indigo-400 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 p-0 h-auto hover:bg-transparent"
                    onClick={() => handleResourceClick(resource.path, resource.title)}
                  >
                    {isSpanish ? "Visitar" : "Visit"}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800/30 mt-6">
        <h3 className="font-medium text-indigo-600 dark:text-indigo-400 mb-3">
          {isSpanish ? "Honrar a Través de la Acción" : "Honoring Through Action"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {isSpanish 
            ? "Muchas personas encuentran consuelo al participar en acciones significativas para honrar a sus seres queridos y ayudar a otros."
            :  "Many people find comfort in engaging in meaningful actions to honor their loved ones and help others."}
        </p>
        <Button 
          className="bg-indigo-500 hover:bg-indigo-600 text-white"
          onClick={() => handleResourceClick("/wellness-challenges", isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges")}
        >
          {isSpanish ? "Explorar Formas de Honrar su Memoria" : "Explore Ways to Honor Their Memory"}
        </Button>
      </div>
    </div>
  );
};

export default RemembranceTab;
