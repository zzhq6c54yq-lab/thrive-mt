
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
      id: "stressRelief",
      title: isSpanish ? "Alivio del Estrés" : "Stress Relief",
      description: isSpanish
        ? "Acceso a ejercicios de relajación guiados y técnicas de manejo del estrés."
        : "Access to guided relaxation exercises and stress management techniques.",
      price: 9.99,
      image: "/lovable-uploads/add-on-stress-relief.webp",
    },
    {
      id: "sleepImprovement",
      title: isSpanish ? "Mejora del Sueño" : "Sleep Improvement",
      description: isSpanish
        ? "Recursos para mejorar la calidad del sueño, incluyendo meditaciones y consejos."
        : "Resources to improve sleep quality, including meditations and tips.",
      price: 12.99,
      image: "/lovable-uploads/add-on-sleep-improvement.webp",
    },
    {
      id: "personalizedCoaching",
      title: isSpanish ? "Coaching Personalizado" : "Personalized Coaching",
      description: isSpanish
        ? "Sesiones de coaching individualizadas para ayudarte a alcanzar tus metas de bienestar."
        : "One-on-one coaching sessions to help you achieve your wellness goals.",
      price: 29.99,
      image: "/lovable-uploads/add-on-personalized-coaching.webp",
    },
    {
      id: "nutritionGuidance",
      title: isSpanish ? "Guía de Nutrición" : "Nutrition Guidance",
      description: isSpanish
        ? "Planes de alimentación personalizados y consejos de nutrición para apoyar tu salud."
        : "Personalized meal plans and nutrition tips to support your health.",
      price: 14.99,
      image: "/lovable-uploads/add-on-nutrition-guidance.webp",
    },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addOns.map((addOn) => (
            <Card
              key={addOn.id}
              className={`bg-[#141921] border-[#B87333]/30 hover:border-[#B87333] transition-colors ${
                selectedAddOns.includes(addOn.id) ? "border-2 border-[#B87333]" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={addOn.image}
                    alt={addOn.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
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
                <p className="text-gray-300 mb-3">{addOn.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#B87333] font-bold">
                    ${addOn.price.toFixed(2)} / {isSpanish ? "mes" : "month"}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handleAddOnToggle(addOn.id)}
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
