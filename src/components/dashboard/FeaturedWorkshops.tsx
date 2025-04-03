
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface FeaturedWorkshopsProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ navigate, onWorkshopClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  // Adjust workshops per page based on screen size
  const getWorkshopsPerPage = () => {
    // Using window.innerWidth directly for responsiveness
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3; // Default to desktop
  };
  
  const [workshopsPerPage, setWorkshopsPerPage] = useState(getWorkshopsPerPage());
  
  // Update workshopsPerPage on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setWorkshopsPerPage(getWorkshopsPerPage());
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    title: isSpanish ? "Talleres Mensuales Destacados" : "Monthly Featured Workshops",
    viewAll: isSpanish ? "Ver Todo" : "View All",
    page: isSpanish ? "Página" : "Page",
    of: isSpanish ? "de" : "of",
    viewWorkshop: isSpanish ? "Ver Taller" : "View Workshop",
    prev: isSpanish ? "Anterior" : "Previous page",
    next: isSpanish ? "Siguiente" : "Next page"
  };
  
  const workshops = [
    {
      id: "mindful-communication",
      title: isSpanish ? "Comunicación Consciente" : "Mindful Communication",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "emotional-regulation",
      title: isSpanish ? "Regulación Emocional" : "Emotional Regulation",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "stress-management",
      title: isSpanish ? "Manejo del Estrés" : "Stress Management",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "better-sleep",
      title: isSpanish ? "Mejores Hábitos de Sueño" : "Better Sleep Habits",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "cognitive-reframing",
      title: isSpanish ? "Reestructuración Cognitiva" : "Cognitive Reframing",
      image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "gratitude-practice",
      title: isSpanish ? "Práctica de Gratitud" : "Gratitude Practice",
      image: "https://images.unsplash.com/photo-1518602164809-512c39454922?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "self-compassion",
      title: isSpanish ? "Habilidades de Autocompasión" : "Self-Compassion Skills",
      image: "https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "social-connection",
      title: isSpanish ? "Construyendo Conexión Social" : "Building Social Connection",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "anxiety-management",
      title: isSpanish ? "Kit de Herramientas para Manejar la Ansiedad" : "Anxiety Management Toolkit",
      image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "boundary-setting",
      title: isSpanish ? "Establecimiento de Límites Saludables" : "Healthy Boundary Setting",
      image: "https://images.unsplash.com/photo-1568260843567-3e0d96a5eb1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "values-alignment",
      title: isSpanish ? "Viviendo según tus Valores" : "Living by Your Values",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "habit-formation",
      title: isSpanish ? "Dominio de la Formación de Hábitos" : "Habit Formation Mastery",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const pageCount = Math.ceil(workshops.length / workshopsPerPage);
  const displayedWorkshops = workshops.slice(
    currentPage * workshopsPerPage, 
    (currentPage + 1) * workshopsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">{translations.title}</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#3d3d5c] text-gray-300 flex items-center"
            onClick={prevPage}
            aria-label={translations.prev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs sm:text-sm text-gray-300">
            {translations.page} {currentPage + 1} {translations.of} {pageCount}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#3d3d5c] text-gray-300 flex items-center"
            onClick={nextPage}
            aria-label={translations.next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="link" 
            className="text-[#E5C5A1] px-0 flex items-center ml-2 sm:ml-4"
            onClick={() => navigate("/workshops")}
          >
            {translations.viewAll}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedWorkshops.map((workshop) => (
          <Card key={workshop.id} className="bg-[#252535] border-[#3d3d5c] rounded-lg hover:bg-[#2a2a40] transition-colors overflow-hidden">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={workshop.image} 
                alt={workshop.title} 
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] to-transparent opacity-60"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg sm:text-xl">{workshop.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#a66a2e] text-white"
                onClick={() => onWorkshopClick(workshop.id, workshop.title)}
              >
                {translations.viewWorkshop}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkshops;
