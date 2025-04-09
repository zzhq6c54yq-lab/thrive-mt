import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Building, Users, Calendar } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import FeatureCard from "./FeatureCard";
import { workshopData } from "@/data/workshopData";

interface WorkshopsTabProps {
  onFeatureClick: (path: string) => void;
}

const WorkshopsTab: React.FC<WorkshopsTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  // Select a few featured workshops
  const featuredWorkshops = [
    workshopData.find(w => w.id === "stress-management"),
    workshopData.find(w => w.id === "mindful-communication"),
  ].filter(Boolean);
  
  // Workshop cover images
  const getWorkshopImage = (workshopId: string) => {
    const imageMap: {[key: string]: string} = {
      'entrepreneurial-resilience': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
      'wellness-focused-team': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
      'stress-management': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      'mindful-communication': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
    };
    
    return imageMap[workshopId] || 'https://images.unsplash.com/photo-1552581234-26160f608093';
  };
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="h-32 overflow-hidden">
            <img 
              src={getWorkshopImage('entrepreneurial-resilience')} 
              alt="Entrepreneurial Resilience"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-900/30 rounded-full">
                <Building className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {isSpanish ? "Resiliencia Empresarial" : "Entrepreneurial Resilience"}
              </h3>
            </div>
            <p className="text-white/70 mb-4">
              {isSpanish 
                ? "Desarrolla fortaleza mental y resiliencia para los desafíos únicos de dirigir una pequeña empresa."
                : "Build mental toughness and resilience for the unique challenges of small business ownership."}
            </p>
            <div className="mb-4 p-2 bg-amber-900/20 rounded-lg text-sm text-white/70">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                <span>{isSpanish ? "19 de Abril, 2025 - 14:00 ET" : "April 19, 2025 - 2:00 PM ET"}</span>
              </div>
            </div>
            <Button 
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              onClick={() => onFeatureClick("workshops/stress-management")}
            >
              {isSpanish ? "Registrarse Ahora" : "Register Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="h-32 overflow-hidden">
            <img 
              src={getWorkshopImage('wellness-focused-team')} 
              alt="Building a Wellness-Focused Team"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-900/30 rounded-full">
                <Users className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {isSpanish ? "Creando un Equipo Enfocado en el Bienestar" : "Building a Wellness-Focused Team"}
              </h3>
            </div>
            <p className="text-white/70 mb-4">
              {isSpanish 
                ? "Aprende a crear una cultura laboral que apoye la salud mental de todos los miembros del equipo."
                : "Learn how to create a workplace culture that supports mental health for all team members."}
            </p>
            <div className="mb-4 p-2 bg-amber-900/20 rounded-lg text-sm text-white/70">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                <span>{isSpanish ? "26 de Abril, 2025 - 13:00 ET" : "April 26, 2025 - 1:00 PM ET"}</span>
              </div>
            </div>
            <Button 
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              onClick={() => onFeatureClick("workshops/social-connection")}
            >
              {isSpanish ? "Registrarse Ahora" : "Register Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-900/30 rounded-full">
              <FileText className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {isSpanish ? "Todos los Talleres para Pequeñas Empresas" : "All Small Business Workshops"}
            </h3>
          </div>
          <p className="text-white/70 mb-4">
            {isSpanish 
              ? "Explora nuestro catálogo completo de talleres diseñados específicamente para propietarios y empleados de pequeñas empresas."
              : "Browse our full catalog of workshops specifically designed for small business owners and employees."}
          </p>
          <Button 
            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            onClick={() => onFeatureClick("workshops")}
          >
            {isSpanish ? "Ver Todos los Talleres" : "View All Workshops"}
          </Button>
        </CardContent>
      </Card>
      
      {/* Display a few featured workshops */}
      <div className="col-span-1 md:col-span-2 mt-4">
        <h3 className="text-xl font-bold text-white mb-4">
          {isSpanish ? "Talleres Recomendados" : "Featured Workshops"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredWorkshops.map((workshop) => (
            workshop && (
              <FeatureCard
                key={workshop.id}
                title={workshop.title}
                description={workshop.description}
                icon={workshop.icon}
                color={workshop.color}
                onClick={() => onFeatureClick(`workshops/${workshop.id}`)}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopsTab;
