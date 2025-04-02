
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface FeaturedWorkshopsProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ navigate, onWorkshopClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const workshopsPerPage = 3;
  
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
      description: isSpanish 
        ? "Aprende técnicas efectivas de comunicación basadas en principios de atención plena para mejorar las relaciones." 
        : "Learn effective communication techniques rooted in mindfulness principles to improve relationships.",
      instructor: isSpanish ? "Dra. Sarah Johnson" : "Dr. Sarah Johnson",
      date: isSpanish ? "Martes y Jueves" : "Tuesdays & Thursdays",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "emotional-regulation",
      title: isSpanish ? "Regulación Emocional" : "Emotional Regulation",
      description: isSpanish 
        ? "Desarrolla habilidades para manejar emociones difíciles y responder en lugar de reaccionar a situaciones desafiantes." 
        : "Develop skills to manage difficult emotions and respond rather than react to challenging situations.",
      instructor: isSpanish ? "Dr. Michael Chen" : "Dr. Michael Chen",
      date: isSpanish ? "Lunes y Miércoles" : "Mondays & Wednesdays",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "stress-management",
      title: isSpanish ? "Manejo del Estrés" : "Stress Management",
      description: isSpanish 
        ? "Estrategias basadas en evidencia para reducir el estrés y desarrollar resiliencia en entornos de alta presión." 
        : "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.",
      instructor: isSpanish ? "Dr. Robert Taylor" : "Dr. Robert Taylor",
      date: isSpanish ? "Viernes" : "Fridays",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "better-sleep",
      title: isSpanish ? "Mejores Hábitos de Sueño" : "Better Sleep Habits",
      description: isSpanish 
        ? "Desarrolla rutinas saludables de sueño y supera el insomnio con técnicas basadas en evidencia." 
        : "Develop healthy sleep routines and overcome insomnia with evidence-based techniques.",
      instructor: isSpanish ? "Dra. Lisa Martinez" : "Dr. Lisa Martinez",
      date: isSpanish ? "Lunes y Miércoles" : "Mondays & Wednesdays",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "cognitive-reframing",
      title: isSpanish ? "Reestructuración Cognitiva" : "Cognitive Reframing",
      description: isSpanish 
        ? "Aprende a identificar patrones de pensamiento negativos y transformarlos en perspectivas más equilibradas." 
        : "Learn to identify negative thought patterns and transform them into more balanced perspectives.",
      instructor: isSpanish ? "Dr. James Wilson" : "Dr. James Wilson",
      date: isSpanish ? "Martes" : "Tuesdays",
      image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "gratitude-practice",
      title: isSpanish ? "Práctica de Gratitud" : "Gratitude Practice",
      description: isSpanish 
        ? "Aprovecha el poder de la gratitud para aumentar la felicidad y la resiliencia en tu vida diaria." 
        : "Harness the power of gratitude to increase happiness and resilience in your daily life.",
      instructor: isSpanish ? "Dra. Emma Thompson" : "Dr. Emma Thompson",
      date: isSpanish ? "Jueves" : "Thursdays",
      image: "https://images.unsplash.com/photo-1518602164809-512c39454922?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "self-compassion",
      title: isSpanish ? "Habilidades de Autocompasión" : "Self-Compassion Skills",
      description: isSpanish 
        ? "Libérate de la autocrítica y desarrolla una relación más amable contigo mismo." 
        : "Break free from self-criticism and develop a kinder relationship with yourself.",
      instructor: isSpanish ? "Dra. Anna Kim" : "Dr. Anna Kim",
      date: isSpanish ? "Miércoles" : "Wednesdays",
      image: "https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "social-connection",
      title: isSpanish ? "Construyendo Conexión Social" : "Building Social Connection",
      description: isSpanish 
        ? "Fortalece relaciones y supera el aislamiento con estrategias basadas en evidencia." 
        : "Strengthen relationships and overcome isolation with evidence-based strategies.",
      instructor: isSpanish ? "Dr. Thomas Parker" : "Dr. Thomas Parker",
      date: isSpanish ? "Lunes y Viernes" : "Mondays & Fridays",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "anxiety-management",
      title: isSpanish ? "Kit de Herramientas para Manejar la Ansiedad" : "Anxiety Management Toolkit",
      description: isSpanish 
        ? "Estrategias prácticas para entender y manejar la ansiedad en tu vida diaria." 
        : "Practical strategies to understand and manage anxiety in your daily life.",
      instructor: isSpanish ? "Dra. Rachel Greene" : "Dr. Rachel Greene",
      date: isSpanish ? "Martes y Jueves" : "Tuesdays & Thursdays",
      image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "boundary-setting",
      title: isSpanish ? "Establecimiento de Límites Saludables" : "Healthy Boundary Setting",
      description: isSpanish 
        ? "Aprende a establecer y mantener límites saludables en todas tus relaciones." 
        : "Learn to establish and maintain healthy boundaries in all your relationships.",
      instructor: isSpanish ? "Dr. Samuel Washington" : "Dr. Samuel Washington",
      date: isSpanish ? "Miércoles" : "Wednesdays",
      image: "https://images.unsplash.com/photo-1568260843567-3e0d96a5eb1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "values-alignment",
      title: isSpanish ? "Viviendo según tus Valores" : "Living by Your Values",
      description: isSpanish 
        ? "Clarifica tus valores fundamentales y alinea tus decisiones diarias con lo que más te importa." 
        : "Clarify your core values and align your daily choices with what matters most to you.",
      instructor: isSpanish ? "Dra. Michelle Rodriguez" : "Dr. Michelle Rodriguez",
      date: isSpanish ? "Viernes" : "Fridays",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "habit-formation",
      title: isSpanish ? "Dominio de la Formación de Hábitos" : "Habit Formation Mastery",
      description: isSpanish 
        ? "Aprende la ciencia detrás del cambio efectivo de hábitos y desarrolla habilidades para un cambio duradero." 
        : "Learn the science behind effective habit change and develop skills for lasting change.",
      instructor: isSpanish ? "Dr. Benjamin Harris" : "Dr. Benjamin Harris",
      date: isSpanish ? "Lunes" : "Mondays",
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{translations.title}</h2>
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
          <span className="text-sm text-gray-300">
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
            className="text-[#E5C5A1] px-0 flex items-center ml-4"
            onClick={() => navigate("/workshops")}
          >
            {translations.viewAll}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedWorkshops.map((workshop) => (
          <Card key={workshop.id} className="bg-[#252535] border-[#3d3d5c] rounded-lg hover:bg-[#2a2a40] transition-colors">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={workshop.image} 
                alt={workshop.title} 
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] to-transparent opacity-60"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-xl">{workshop.title}</CardTitle>
              <CardDescription className="text-gray-400">{workshop.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-gray-400 mb-1">
                <Users className="mr-2 h-4 w-4 text-[#E5C5A1]" />
                <span className="text-sm">{workshop.instructor}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <CalendarDays className="mr-2 h-4 w-4 text-[#E5C5A1]" />
                <span className="text-sm">{workshop.date}</span>
              </div>
            </CardContent>
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
