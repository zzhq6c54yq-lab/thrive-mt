import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import militaryVeterans from '@/assets/military-veterans.jpg';
import goldenYears from '@/assets/golden-years.jpg';
import lawEnforcement from '@/assets/law-enforcement.jpg';
import cancerSupport from '@/assets/cancer-support.jpg';
import adolescentExperience from '@/assets/adolescent-experience.jpg';

interface SpecializedProgramsSectionProps {
  trackClick?: (sectionId: string, metadata?: Record<string, any>) => void;
}

const SpecializedProgramsSection: React.FC<SpecializedProgramsSectionProps> = ({ trackClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const programs = [
    {
      id: "veteran-military",
      title: isSpanish ? "Militares y Veteranos" : "Military and Veterans",
      description: isSpanish 
        ? "Apoyo especializado para veteranos y personal militar activo."
        : "Specialized support for veterans and active military personnel.",
      path: "/dod-welcome",
      image: militaryVeterans,
      gradient: "from-green-600/80 to-emerald-800/80"
    },
    {
      id: "college-experience",
      title: isSpanish ? "Experiencia Universitaria" : "College Experience",
      description: isSpanish 
        ? "Recursos para estudiantes universitarios y transiciones académicas."
        : "Resources for college students and academic transitions.",
      path: "/college-welcome",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80",
      gradient: "from-blue-600/80 to-indigo-800/80"
    },
    {
      id: "small-businesses",
      title: isSpanish ? "Pequeñas Empresas" : "Small Businesses",
      description: isSpanish 
        ? "Bienestar y apoyo para propietarios y empleados de pequeñas empresas."
        : "Wellness and support for small business owners and employees.",
      path: "/small-business-welcome",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80",
      gradient: "from-amber-600/80 to-orange-800/80"
    },
    {
      id: "golden-years",
      title: isSpanish ? "Años Dorados (65+)" : "Golden Years (65+)",
      description: isSpanish 
        ? "Bienestar especializado para adultos mayores y sus familias."
        : "Specialized wellness for older adults and their families.",
      path: "/golden-years-welcome",
      image: goldenYears,
      gradient: "from-amber-500/80 to-yellow-700/80"
    },
    {
      id: "adolescents",
      title: isSpanish ? "Adolescentes" : "Adolescents",
      description: isSpanish 
        ? "Apoyo integral para adolescentes y sus familias."
        : "Comprehensive support for adolescents and their families.",
      path: "/adolescent-welcome",
      image: adolescentExperience,
      gradient: "from-purple-600/80 to-pink-800/80"
    },
    {
      id: "first-responders",
      title: isSpanish ? "Primeros Auxilios" : "First Responders",
      description: isSpanish 
        ? "Recursos para bomberos, paramédicos y personal de emergencia."
        : "Resources for firefighters, paramedics, and emergency personnel.",
      path: "/first-responders-welcome",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=500&q=80",
      gradient: "from-red-600/80 to-orange-800/80"
    },
    {
      id: "hospitality",
      title: isSpanish ? "Industria Hotelera" : "Hospitality Industry",
      description: isSpanish 
        ? "Apoyo para trabajadores de hoteles, restaurantes y turismo."
        : "Support for hotel, restaurant, and tourism workers.",
      path: "/hospitality-welcome",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80",
      gradient: "from-teal-600/80 to-cyan-800/80"
    },
    {
      id: "transportation",
      title: isSpanish ? "Industria de Transporte" : "Transportation Industry",
      description: isSpanish 
        ? "Apoyo para conductores, pilotos y trabajadores del transporte."
        : "Support for drivers, pilots, and transportation workers.",
      path: "/transport-welcome",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80",
      gradient: "from-gray-600/80 to-slate-800/80"
    },
    {
      id: "law-enforcement",
      title: isSpanish ? "Aplicación de la Ley" : "Law Enforcement",
      description: isSpanish 
        ? "Apoyo integral para oficiales de policía y personal de seguridad."
        : "Comprehensive support for police officers and security personnel.",
      path: "/law-enforcement-welcome",
      image: lawEnforcement,
      gradient: "from-blue-700/80 to-indigo-900/80"
    },
    {
      id: "educators",
      title: isSpanish ? "Educadores Estimados" : "Esteemed Educators",
      description: isSpanish 
        ? "Recursos para maestros, profesores y personal educativo."
        : "Resources for teachers, professors, and educational staff.",
      path: "/educators-welcome",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80",
      gradient: "from-indigo-600/80 to-purple-800/80"
    },
    {
      id: "chronic-illness",
      title: isSpanish ? "Enfermedades Crónicas" : "Chronic Illness",
      description: isSpanish 
        ? "Apoyo para pacientes con enfermedades crónicas y sus familias."
        : "Support for patients with chronic illnesses and their families.",
      path: "/chronic-illness-welcome",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
      gradient: "from-purple-600/80 to-violet-800/80"
    },
    {
      id: "cancer-support",
      title: isSpanish ? "Apoyo para el Cáncer" : "Cancer Support",
      description: isSpanish 
        ? "Apoyo especializado para pacientes con cáncer y sus familias."
        : "Specialized support for cancer patients and their families.",
      path: "/cancer-support-welcome",
      image: cancerSupport,
      gradient: "from-pink-600/80 to-rose-800/80"
    },
    {
      id: "single-parents",
      title: isSpanish ? "Padres Solteros" : "Single Parents",
      description: isSpanish 
        ? "Apoyo integral para padres solteros que equilibran familia y bienestar."
        : "Comprehensive support for single parents balancing family and wellbeing.",
      path: "/single-parents-welcome",
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=500&q=80",
      gradient: "from-rose-600/80 to-pink-800/80"
    }
  ];

  const handleProgramClick = (program: typeof programs[0]) => {
    trackClick?.("specialized-programs", { programId: program.id, programTitle: program.title });
    
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? `Abriendo ${program.title}` : `Opening ${program.title}`,
      duration: 1500,
    });
    
    navigate(program.path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#B87333] to-[#D4AF37]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#B87333] via-[#D4AF37] to-[#B87333] bg-clip-text text-transparent">
              {isSpanish ? "Complementos para mejorar tu viaje" : "Add-ons to enhance your mental health journey"}
            </h2>
          </div>
          <p className="text-sm text-gray-400 ml-14">
            {isSpanish 
              ? "Programas diseñados para encontrarte donde estás y mejorar este viaje en el que te encuentras"
              : "Programs designed to meet you where you are to enhance this journey you're on"}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {programs.map((program, index) => (
              <CarouselItem key={program.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <Card 
                    className="group cursor-pointer overflow-hidden border-gray-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 h-[400px] relative"
                    onClick={() => handleProgramClick(program)}
                  >
                    {/* Cover Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                        {program.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-4 line-clamp-2 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {program.description}
                      </p>
                      <Button 
                        size="sm"
                        className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        {isSpanish ? "Explorar Portal" : "Explore Portal"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious className="static translate-y-0 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#D4AF37]/50">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <span className="text-sm text-gray-400">
              {isSpanish ? "Desliza para ver más" : "Swipe to see more"}
            </span>
            <CarouselNext className="static translate-y-0 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#D4AF37]/50">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </Card>
    </motion.div>
  );
};

export default SpecializedProgramsSection;
