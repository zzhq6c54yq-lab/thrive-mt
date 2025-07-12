
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";
import { addOns } from "./subscription-addons/data";

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

  // Get pricing based on selected plan - $3 for Basic/Free, $2 for Gold, $1 for Platinum
  const getPriceForPlan = (basePrice: number): number => {
    if (!selectedPlan) return 3; // Default pricing
    
    const planLower = selectedPlan.toLowerCase();
    if (planLower.includes('basic') || planLower.includes('free')) {
      return 3;
    } else if (planLower.includes('gold')) {
      return 2;
    } else if (planLower.includes('platinum')) {
      return 1;
    }
    return 3; // Default to basic pricing
  };

  // Only show the "no add-ons" message after user tries to continue without selections
  const handleContinue = () => {
    if (selectedAddOns.length === 0) {
      setShowNoAddOnsMessage(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowNoAddOnsMessage(false), 3000);
    } else {
      onContinue();
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    setShowNoAddOnsMessage(false); // Hide message when user starts selecting
    onAddOnToggle(addOnId);
  };

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
          {addOns.map((addOn) => {
            const displayPrice = getPriceForPlan(addOn.basePrice);
            const Icon = addOn.icon;
            
            return (
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
                      src={addOn.imagePath}
                      alt={isSpanish ? addOn.titleSpanish : addOn.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
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
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-[#B87333]" />
                    <h3 className="text-lg font-bold text-white">
                      {isSpanish ? addOn.titleSpanish : addOn.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 mb-3 text-sm">
                    {isSpanish ? addOn.descriptionSpanish : addOn.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#B87333] font-bold">
                      ${displayPrice.toFixed(2)} / {isSpanish ? "mes" : "month"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        selectedAddOns.includes(addOn.id) 
                          ? "bg-[#B87333] hover:bg-[#A56625] text-white border-[#B87333]" 
                          : "bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50"
                      }`}
                    >
                      {selectedAddOns.includes(addOn.id)
                        ? isSpanish ? "Quitar" : "Remove"
                        : isSpanish ? "Añadir" : "Add"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="bg-background border-muted-foreground text-foreground hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isSpanish ? "Atrás" : "Back"}
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={onSkip}
            variant="outline"
            className="bg-background border-muted-foreground text-foreground hover:bg-muted"
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
