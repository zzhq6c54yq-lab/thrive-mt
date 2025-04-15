
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Package, Trophy, Gem, Check } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface SubscriptionPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  addOnPrice: string;
  icon: React.ElementType;
  color: string;
  recommended: boolean;
}

interface SubscriptionScreenProps {
  selectedPlan: string | null;
  onPlanSelect: (plan: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  selectedPlan,
  onPlanSelect,
  onContinue,
  onPrevious,
  onSkip,
}) => {
  const { isSpanish, getTranslatedText } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Translations
  const translations = {
    title: isSpanish ? "Elige Tu Plan" : "Choose Your Plan",
    subtitle: isSpanish ? "Selecciona la suscripción que mejor se adapte a tus necesidades de bienestar mental" : "Select the subscription that best fits your mental wellness needs",
    basic: {
      title: isSpanish ? "Básico" : "Basic",
      price: isSpanish ? "Gratis" : "Free",
      description: isSpanish ? "Comienza tu viaje de salud mental con funciones esenciales" : "Start your mental health journey with essential features",
      features: isSpanish ? [
        "Acceso a herramientas esenciales de bienestar mental",
        "Únete a reuniones y clases virtuales",
        "Acceso a patrocinador digital",
        "Acceso limitado a talleres",
        "Complementos a $3/mes cada uno"
      ] : [
        "Access to essential mental wellness tools",
        "Join virtual meetings and classes",
        "Digital sponsor access",
        "Limited workshop access",
        "Add-ons at $3/month each"
      ],
      addOnPrice: isSpanish ? "$3/cada uno" : "$3/each"
    },
    gold: {
      title: isSpanish ? "Oro" : "Gold",
      price: isSpanish ? "$5/mes" : "$5/month",
      description: isSpanish ? "Funciones mejoradas para una experiencia más personalizada" : "Enhanced features for a more personalized experience",
      features: isSpanish ? [
        "5% de bonificación en todos los créditos de copago",
        "Acceso a todas las herramientas de bienestar mental",
        "Biblioteca de talleres ampliada",
        "Acceso prioritario a reuniones virtuales",
        "Plan de bienestar personalizado",
        "Complementos a $2/mes cada uno"
      ] : [
        "5% bonus on all co-pay credits",
        "Access to all mental wellness tools",
        "Extended workshop library",
        "Priority access to virtual meetings",
        "Personalized wellness plan",
        "Add-ons at $2/month each"
      ],
      addOnPrice: isSpanish ? "$2/cada uno" : "$2/each"
    },
    platinum: {
      title: isSpanish ? "Platino" : "Platinum",
      price: isSpanish ? "$10/mes" : "$10/month",
      description: isSpanish ? "Nuestro paquete de salud mental más completo" : "Our most comprehensive mental health package",
      features: isSpanish ? [
        "10% de bonificación en todos los créditos de copago",
        "Acceso ilimitado a todas las funciones de la plataforma",
        "Contenido premium de talleres",
        "Acceso anticipado a nuevas funciones",
        "Análisis e información avanzados",
        "Hoja de ruta de bienestar personalizada",
        "Complementos a $1/mes cada uno"
      ] : [
        "10% bonus on all co-pay credits",
        "Unlimited access to all platform features",
        "Premium workshop content",
        "Early access to new features",
        "Advanced analytics and insights",
        "Personalized wellness roadmap",
        "Add-ons at $1/month each"
      ],
      addOnPrice: isSpanish ? "$1/cada uno" : "$1/each"
    },
    recommend: isSpanish ? "Recomendado" : "Recommended",
    select: isSpanish ? "Seleccionar Plan" : "Select Plan",
    selected: isSpanish ? "Seleccionado" : "Selected",
    previous: isSpanish ? "Anterior" : "Previous",
    continue: isSpanish ? "Continuar" : "Continue",
    skip: isSpanish ? "Omitir por Ahora" : "Skip for Now",
    monthly: isSpanish ? "Mensual" : "Monthly",
    yearly: isSpanish ? "Anual" : "Yearly",
    yearlyDiscount: isSpanish ? "¡Ahorra 20%!" : "Save 20%!"
  };
  
  // Calculate yearly prices with 20% discount
  const getYearlyPrice = (monthlyPrice: string) => {
    if (monthlyPrice === "Free" || monthlyPrice === "Gratis") return monthlyPrice;
    const numericPrice = parseInt(monthlyPrice.replace(/\D/g, ''));
    const yearlyPrice = numericPrice * 12 * 0.8;
    return `$${yearlyPrice}/year`;
  };
  
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      title: translations.basic.title,
      price: billingCycle === 'monthly' ? translations.basic.price : translations.basic.price,
      description: translations.basic.description,
      features: translations.basic.features,
      addOnPrice: translations.basic.addOnPrice,
      icon: Package,
      color: "bg-gray-100 text-gray-800 border-gray-200",
      recommended: false
    },
    {
      title: translations.gold.title,
      price: billingCycle === 'monthly' ? translations.gold.price : getYearlyPrice(translations.gold.price),
      description: translations.gold.description,
      features: translations.gold.features,
      addOnPrice: translations.gold.addOnPrice,
      icon: Trophy,
      color: "bg-[#FEF7CD] text-[#B87333] border-[#B87333]/30",
      recommended: false
    },
    {
      title: translations.platinum.title,
      price: billingCycle === 'monthly' ? translations.platinum.price : getYearlyPrice(translations.platinum.price),
      description: translations.platinum.description,
      features: translations.platinum.features,
      addOnPrice: translations.platinum.addOnPrice,
      icon: Gem,
      color: "bg-[#E5DEFF] text-[#7E69AB] border-[#7E69AB]/30",
      recommended: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in py-10 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D946EF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-5xl w-full mx-auto px-4 z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">{translations.title}</h2>
          <p className="text-xl text-gray-300">{translations.subtitle}</p>
          
          {/* Billing cycle toggle */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <button
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-[#B87333] text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                {translations.monthly}
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-[#B87333] text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                {translations.yearly}
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                  {translations.yearlyDiscount}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {subscriptionPlans.map((plan) => (
            <div 
              key={plan.title}
              className={`${plan.color} rounded-xl overflow-hidden transition-all duration-300 transform ${selectedPlan === plan.title ? 'scale-105 ring-2 ring-[#B87333]' : 'hover:scale-102'} relative`}
              onClick={() => onPlanSelect(plan.title)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                    <p className="text-xl font-semibold">{plan.price}</p>
                  </div>
                  <plan.icon className="h-8 w-8" />
                </div>
                <p className="mb-4 text-sm">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-4 border-t ${plan.recommended ? 'bg-[#B87333]/20 border-[#B87333]/30' : 'bg-black/5 border-gray-700/20'}`}>
                <Button 
                  className={`w-full ${selectedPlan === plan.title ? 'bg-[#B87333] hover:bg-[#B87333]/90' : 'bg-black/30 hover:bg-black/40'}`}
                  onClick={() => onPlanSelect(plan.title)}
                >
                  {selectedPlan === plan.title ? translations.selected : translations.select}
                </Button>
              </div>
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-[#B87333] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {translations.recommend}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            variant="outline"
            className="border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 flex items-center gap-2"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            {translations.previous}
          </Button>
          <Button 
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white flex items-center gap-2"
            onClick={onContinue}
          >
            {translations.continue}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={onSkip}
          >
            {translations.skip}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
