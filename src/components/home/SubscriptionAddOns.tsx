
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";

interface AddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface SubscriptionAddOnsProps {
  selectedPlan: string | null;
  selectedAddOns: string[];
  onAddOnToggle: (addOnId: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const SubscriptionAddOns: React.FC<SubscriptionAddOnsProps> = ({
  selectedPlan,
  selectedAddOns,
  onAddOnToggle,
  onContinue,
  onPrevious,
  onSkip
}) => {
  const { isSpanish } = useTranslation();
  const [showNoAddOnsMessage, setShowNoAddOnsMessage] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Only show the "no add-ons" message after user has interacted and tries to continue
  const handleContinue = () => {
    setHasInteracted(true);
    if (selectedAddOns.length === 0) {
      setShowNoAddOnsMessage(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowNoAddOnsMessage(false), 3000);
    } else {
      onContinue();
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    setHasInteracted(true);
    setShowNoAddOnsMessage(false); // Hide message when user starts selecting
    onAddOnToggle(addOnId);
  };

  const addOns: AddOn[] = [
    {
      id: "dod",
      title: isSpanish ? "Departamento de Defensa" : "Department of Defense",
      description: isSpanish
        ? "Recursos especializados para personal militar activo, veteranos y sus familias."
        : "Specialized resources for active military personnel, veterans, and their families.",
      price: 19.99,
      image: "/lovable-uploads/dod-addon.webp",
    },
    {
      id: "college",
      title: isSpanish ? "La Experiencia Universitaria" : "The College Experience",
      description: isSpanish
        ? "Apoyo para estudiantes universitarios navegando el estrés académico y la transición a la vida adulta."
        : "Support for college students navigating academic stress and transition to adult life.",
      price: 14.99,
      image: "/lovable-uploads/college-addon.webp",
    },
    {
      id: "small-business",
      title: isSpanish ? "Pequeñas Empresas" : "Small Business",
      description: isSpanish
        ? "Herramientas de bienestar mental diseñadas para emprendedores y equipos de pequeñas empresas."
        : "Mental wellness tools designed for entrepreneurs and small business teams.",
      price: 24.99,
      image: "/lovable-uploads/business-addon.webp",
    },
    {
      id: "adolescent",
      title: isSpanish ? "La Experiencia Adolescente" : "Adolescent Experience",
      description: isSpanish
        ? "Recursos especializados para adolescentes y sus familias navegando los desafíos únicos de esta etapa."
        : "Specialized resources for teens and their families navigating the unique challenges of this stage.",
      price: 16.99,
      image: "/lovable-uploads/teen-addon.webp",
    },
    {
      id: "golden-years",
      title: isSpanish ? "Los Años Dorados" : "The Golden Years",
      description: isSpanish
        ? "Apoyo integral para adultos mayores enfocado en el bienestar mental y la conexión social."
        : "Comprehensive support for older adults focused on mental wellness and social connection.",
      price: 18.99,
      image: "/lovable-uploads/golden-addon.webp",
    },
    {
      id: "first-responders",
      title: isSpanish ? "Primeros Auxilios" : "First Responders",
      description: isSpanish
        ? "Recursos especializados para bomberos, paramédicos, policías y otros primeros auxilios."
        : "Specialized resources for firefighters, paramedics, police officers, and other first responders.",
      price: 22.99,
      image: "/lovable-uploads/first-responder-addon.webp",
    },
    {
      id: "hospitality",
      title: isSpanish ? "Industria de Hospitalidad" : "Hospitality Industry",
      description: isSpanish
        ? "Apoyo para trabajadores de restaurantes, hoteles y servicios de hospitalidad."
        : "Support for restaurant, hotel, and hospitality service workers.",
      price: 15.99,
      image: "/lovable-uploads/hospitality-addon.webp",
    },
    {
      id: "transportation",
      title: isSpanish ? "Industria del Transporte" : "Transportation Industry",
      description: isSpanish
        ? "Recursos para conductores de camiones, pilotos, y otros profesionales del transporte."
        : "Resources for truck drivers, pilots, and other transportation professionals.",
      price: 17.99,
      image: "/lovable-uploads/transport-addon.webp",
    },
    {
      id: "chronic-illness",
      title: isSpanish ? "Enfermedad Crónica" : "Chronic Illness",
      description: isSpanish
        ? "Apoyo especializado para personas que viven con condiciones de salud crónicas."
        : "Specialized support for individuals living with chronic health conditions.",
      price: 21.99,
      image: "/lovable-uploads/chronic-illness-addon.webp",
    },
    {
      id: "educators",
      title: isSpanish ? "Educadores" : "Educators",
      description: isSpanish
        ? "Recursos para maestros, profesores y personal educativo enfrentando el estrés del aula."
        : "Resources for teachers, professors, and educational staff facing classroom stress.",
      price: 16.99,
      image: "/lovable-uploads/educators-addon.webp",
    },
    {
      id: "law-enforcement",
      title: isSpanish ? "Fuerzas del Orden" : "Law Enforcement",
      description: isSpanish
        ? "Apoyo especializado para oficiales de policía y personal de seguridad pública."
        : "Specialized support for police officers and public safety personnel.",
      price: 20.99,
      image: "/lovable-uploads/law-enforcement-addon.webp",
    },
    {
      id: "cancer-support",
      title: isSpanish ? "Apoyo contra el Cáncer" : "Cancer Support",
      description: isSpanish
        ? "Recursos comprensivos para pacientes de cáncer, sobrevivientes y sus familias."
        : "Comprehensive resources for cancer patients, survivors, and their families.",
      price: 25.99,
      image: "/lovable-uploads/cancer-support-addon.webp",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          {isSpanish ? "Personaliza Tu Experiencia" : "Customize Your Experience"}
        </h1>
        <p className="text-gray-300 text-lg">
          {isSpanish 
            ? "Selecciona complementos adicionales para personalizar tu viaje de bienestar"
            : "Select additional add-ons to personalize your wellness journey"
          }
        </p>
        {selectedPlan && (
          <p className="text-[#B87333] text-lg mt-2">
            {isSpanish ? `Plan seleccionado: ${selectedPlan}` : `Selected plan: ${selectedPlan}`}
          </p>
        )}
      </div>

      {/* Conditional Message */}
      <AnimatePresence>
        {showNoAddOnsMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 mx-auto max-w-md"
          >
            <Card className="bg-blue-900/80 border-blue-700">
              <CardContent className="p-4 text-center">
                <p className="text-blue-200">
                  {isSpanish 
                    ? "¡No hay complementos seleccionados! ¿Quieres continuar sin complementos o explorar las opciones?"
                    : "No add-ons selected! Would you like to continue without add-ons or explore the options?"
                  }
                </p>
                <div className="flex gap-2 mt-3 justify-center">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={onContinue}
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                  >
                    {isSpanish ? "Continuar Sin Complementos" : "Continue Without Add-ons"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add-ons Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {addOns.map((addOn) => (
            <Card
              key={addOn.id}
              className={`bg-[#141921] border-[#B87333]/30 hover:border-[#B87333] transition-colors cursor-pointer ${
                selectedAddOns.includes(addOn.id) ? "border-2 border-[#B87333]" : ""
              }`}
              onClick={() => handleAddOnToggle(addOn.id)}
            >
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={addOn.image}
                    alt={addOn.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/lovable-uploads/placeholder.webp';
                    }}
                  />
                  {selectedAddOns.includes(addOn.id) && (
                    <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {isSpanish ? "¡Seleccionado!" : "Selected!"}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{addOn.title}</h3>
                <p className="text-gray-300 mb-3 text-sm">{addOn.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#B87333] font-bold">
                    ${addOn.price.toFixed(2)} / {isSpanish ? "mes" : "month"}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-white/20 text-white hover:bg-white/10 ${
                      selectedAddOns.includes(addOn.id) ? "bg-[#B87333] hover:bg-[#A56625]" : ""
                    }`}
                  >
                    {selectedAddOns.includes(addOn.id)
                      ? isSpanish ? "Quitar" : "Remove"
                      : isSpanish ? "Añadir" : "Add"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isSpanish ? "Atrás" : "Back"}
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={onSkip}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isSpanish ? "Omitir" : "Skip"}
          </Button>
          
          <Button
            onClick={handleContinue}
            className="bg-[#B87333] hover:bg-[#A56625] text-white"
          >
            {isSpanish ? "Continuar" : "Continue"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAddOns;
