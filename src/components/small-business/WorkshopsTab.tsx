import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Building, Users, Calendar, Clock, BookOpen, CheckCircle, Download } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import FeatureCard from "./FeatureCard";
import { workshopData } from "@/data/workshopData";
import { Badge } from "@/components/ui/badge";
import { handleImageError } from "@/utils/imageUtils";

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
  
  // Workshop cover images with direct URLs
  const getWorkshopImage = (workshopId: string) => {
    const imageMap: {[key: string]: string} = {
      'entrepreneurial-resilience': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
      'wellness-focused-team': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
      'stress-management': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      'mindful-communication': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      'emotional-regulation': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
      'better-sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
      'cognitive-reframing': 'https://images.unsplash.com/photo-1454692173233-f4f34c13cfda',
      'gratitude-practice': 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6',
      'self-compassion': 'https://images.unsplash.com/photo-1531081144778-a3d0613172a7',
      'social-connection': 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
      'anxiety-management': 'https://images.unsplash.com/photo-1559000357-f6b52ddfcbba',
      'boundary-setting': 'https://images.unsplash.com/photo-1572504050773-a93cbcdee34e',
      'values-alignment': 'https://images.unsplash.com/photo-1520853504280-249365dd7617',
      'habit-formation': 'https://images.unsplash.com/photo-1616197439049-799b519adc48',
      'transition': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = handleImageError(e, 'workshops-tab', 'https://images.unsplash.com/photo-1552581234-26160f608093');
              }}
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
            <div className="mb-4 flex gap-2 flex-wrap">
              <div className="p-2 bg-amber-900/20 rounded-lg text-sm text-white/70 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                <span>{isSpanish ? "19 de Abril, 2025 - 14:00 ET" : "April 19, 2025 - 2:00 PM ET"}</span>
              </div>
              <Badge className="bg-amber-700/50 text-white">
                {isSpanish ? "Incluye Ejercicios Prácticos" : "Includes Practical Exercises"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center text-white/70 text-sm">
                <Clock className="h-4 w-4 mr-1 text-amber-400" />
                <span>45 min</span>
              </div>
              <div className="flex items-center text-white/70 text-sm">
                <BookOpen className="h-4 w-4 mr-1 text-amber-400" />
                <span>3 {isSpanish ? "secciones" : "sections"}</span>
              </div>
              <div className="flex items-center text-white/70 text-sm">
                <CheckCircle className="h-4 w-4 mr-1 text-amber-400" />
                <span>4 {isSpanish ? "resultados" : "outcomes"}</span>
              </div>
              <div className="flex items-center text-white/70 text-sm">
                <Download className="h-4 w-4 mr-1 text-amber-400" />
                <span>{isSpanish ? "Hojas de Trabajo" : "Worksheets"}</span>
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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = handleImageError(e, 'workshops-tab', 'https://images.unsplash.com/photo-1552581234-26160f608093');
              }}
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
            <div className="mb-4 flex gap-2 flex-wrap">
              <div className="p-2 bg-amber-900/20 rounded-lg text-sm text-white/70 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                <span>{isSpanish ? "26 de Abril, 2025 - 13:00 ET" : "April 26, 2025 - 1:00 PM ET"}</span>
              </div>
              <Badge className="bg-amber-700/50 text-white">
                {isSpanish ? "Incluye Ejercicios Prácticos" : "Includes Practical Exercises"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center text-white/70 text-sm">
                <Clock className="h-4 w-4 mr-1 text-amber-400" />
                <span>45 min</span>
              </div>
              <div className="flex items-center text-white/70 text-sm">
                <BookOpen className="h-4 w-4 mr-1 text-amber-400" />
                <span>3 {isSpanish ? "secciones" : "sections"}</span>
              </div>
              <div className="flex items-center text-white/70 text-sm">
                <CheckCircle className="h-4 w-4 mr-1 text-amber-400" />
                <span>4 {isSpanish ? "resultados" : "outcomes"}</span>
              </div>
              <div className="flex items-center text-white/70 text-sm">
                <Download className="h-4 w-4 mr-1 text-amber-400" />
                <span>{isSpanish ? "Hojas de Trabajo" : "Worksheets"}</span>
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
      
      {/* Display featured workshops with enhanced info */}
      <div className="col-span-1 md:col-span-2 mt-4">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          {isSpanish ? "Talleres Recomendados" : "Featured Intensive Workshops"}
          <Badge className="ml-2 bg-amber-600">NEW</Badge>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredWorkshops.map((workshop) => (
            workshop && (
              <Card 
                key={workshop.id}
                className="overflow-hidden hover:border-amber-600 transition-colors cursor-pointer group"
                onClick={() => onFeatureClick(`workshops/${workshop.id}`)}
              >
                <div className="relative h-36 overflow-hidden">
                  <img 
                    src={getWorkshopImage(workshop.id)} 
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = handleImageError(e, `featured-workshop-${workshop.id}`, 'https://images.unsplash.com/photo-1552581234-26160f608093');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-3">
                    <Badge className="bg-amber-600">
                      {isSpanish ? "Intensivo" : "Intensive"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 rounded-full mt-1" style={{ backgroundColor: workshop.color }}>
                      <workshop.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold line-clamp-1">{workshop.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {workshop.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      <span>{workshop.sections?.length || 3} {isSpanish ? "secciones" : "sections"}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      <span>{workshop.learningOutcomes?.length || 4} {isSpanish ? "resultados" : "outcomes"}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      <span>{isSpanish ? "Materiales" : "Materials"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
          
          <Card 
            className="overflow-hidden border-dashed border-gray-300 hover:border-amber-600 transition-colors cursor-pointer flex items-center justify-center h-full"
            onClick={() => onFeatureClick("workshops")}
          >
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">
                {isSpanish ? "Explorar Todos los Talleres Intensivos" : "Explore All Intensive Workshops"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isSpanish ? "12 talleres disponibles" : "12 workshops available"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkshopsTab;
