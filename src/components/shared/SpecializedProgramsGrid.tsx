
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import militaryVeterans from '@/assets/military-veterans.jpg';
import goldenYears from '@/assets/golden-years.jpg';
import lawEnforcement from '@/assets/law-enforcement.jpg';
import cancerSupport from '@/assets/cancer-support.jpg';
import adolescentExperience from '@/assets/adolescent-experience.jpg';

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
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
      gradient: "from-green-600 to-emerald-800"
    },
    {
      id: "college-experience",
      title: isSpanish ? "Experiencia Universitaria" : "College Experience",
      description: isSpanish 
        ? "Recursos para estudiantes universitarios y transiciones académicas."
        : "Resources for college students and academic transitions.",
      path: "/college-welcome",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80",
      gradient: "from-blue-600 to-indigo-800"
    },
    {
      id: "small-businesses",
      title: isSpanish ? "Pequeñas Empresas" : "Small Businesses",
      description: isSpanish 
        ? "Bienestar y apoyo para propietarios y empleados de pequeñas empresas."
        : "Wellness and support for small business owners and employees.",
      path: "/small-business-welcome",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80",
      gradient: "from-amber-600 to-orange-800"
    },
    {
      id: "golden-years",
      title: isSpanish ? "Años Dorados (65+)" : "Golden Years (65+)",
      description: isSpanish 
        ? "Bienestar especializado para adultos mayores y sus familias."
        : "Specialized wellness for older adults and their families.",
      path: "/golden-years-welcome",
      image: goldenYears,
      gradient: "from-amber-500 to-yellow-700"
    },
    {
      id: "adolescents",
      title: isSpanish ? "Adolescentes" : "Adolescents",
      description: isSpanish 
        ? "Apoyo integral para adolescentes y sus familias."
        : "Comprehensive support for adolescents and their families.",
      path: "/adolescent-welcome",
      image: adolescentExperience,
      gradient: "from-purple-600 to-pink-800"
    },
    {
      id: "first-responders",
      title: isSpanish ? "Primeros Auxilios" : "First Responders",
      description: isSpanish 
        ? "Recursos para bomberos, paramédicos y personal de emergencia."
        : "Resources for firefighters, paramedics, and emergency personnel.",
      path: "/first-responders-welcome",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=500&q=80",
      gradient: "from-red-600 to-orange-800"
    },
    {
      id: "hospitality",
      title: isSpanish ? "Industria Hotelera" : "Hospitality Industry",
      description: isSpanish 
        ? "Apoyo para trabajadores de hoteles, restaurantes y turismo."
        : "Support for hotel, restaurant, and tourism workers.",
      path: "/hospitality-welcome",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80",
      gradient: "from-teal-600 to-cyan-800"
    },
    {
      id: "transportation",
      title: isSpanish ? "Industria de Transporte" : "Transportation Industry",
      description: isSpanish 
        ? "Apoyo para conductores, pilotos y trabajadores del transporte."
        : "Support for drivers, pilots, and transportation workers.",
      path: "/transport-welcome",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80",
      gradient: "from-gray-600 to-slate-800"
    },
    {
      id: "law-enforcement",
      title: isSpanish ? "Aplicación de la Ley" : "Law Enforcement",
      description: isSpanish 
        ? "Apoyo integral para oficiales de policía y personal de seguridad."
        : "Comprehensive support for police officers and security personnel.",
      path: "/law-enforcement-welcome",
      image: lawEnforcement,
      gradient: "from-blue-700 to-indigo-900"
    },
    {
      id: "educators",
      title: isSpanish ? "Educadores Estimados" : "Esteemed Educators",
      description: isSpanish 
        ? "Recursos para maestros, profesores y personal educativo."
        : "Resources for teachers, professors, and educational staff.",
      path: "/educators-welcome",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80",
      gradient: "from-indigo-600 to-purple-800"
    },
    {
      id: "chronic-illness",
      title: isSpanish ? "Enfermedades Crónicas" : "Chronic Illness",
      description: isSpanish 
        ? "Apoyo para pacientes con enfermedades crónicas y sus familias."
        : "Support for patients with chronic illnesses and their families.",
      path: "/chronic-illness-welcome",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
      gradient: "from-purple-600 to-violet-800"
    },
    {
      id: "cancer-support",
      title: isSpanish ? "Apoyo para el Cáncer" : "Cancer Support",
      description: isSpanish 
        ? "Apoyo especializado para pacientes con cáncer y sus familias."
        : "Specialized support for cancer patients and their families.",
      path: "/cancer-support-welcome",
      image: cancerSupport,
      gradient: "from-pink-600 to-rose-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {programs.map((program, index) => (
        <motion.div
          key={program.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer"
          onClick={() => onProgramClick(program.path)}
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-32 overflow-hidden">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80";
                }}
              />
            </div>
            <div className={`bg-gradient-to-r ${program.gradient} p-4`}>
              <h3 className="text-white text-lg font-bold leading-tight mb-3">{program.title}</h3>
              <p className="text-white/90 text-sm mb-4 line-clamp-3">
                {program.description}
              </p>
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/30 hover:border-white/50"
              >
                {isSpanish ? "Explorar Portal" : "Explore Portal"}
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SpecializedProgramsGrid;
