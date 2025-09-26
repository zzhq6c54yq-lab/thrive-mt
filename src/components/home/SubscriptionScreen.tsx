import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Package, Trophy, Gem, Check, Shield, Siren, GraduationCap } from "lucide-react";
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
      price: translations.basic.price, // Always Free
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

  const addOns = [
    {
      id: "dod",
      title: isSpanish ? "Militares y Veteranos" : "Military and Veterans",
      description: isSpanish ? "Apoyo especializado para personal militar" : "Specialized support for military personnel",
      icon: Shield
    },
    {
      id: "first-responders",
      title: isSpanish ? "Servicios de Emergencia" : "First Responders",
      description: isSpanish ? "Apoyo dedicado para personal de emergencias" : "Dedicated support for emergency service personnel",
      icon: Siren
    },
    {
      id: "college",
      title: isSpanish ? "La Experiencia Universitaria" : "The College Experience",
      description: isSpanish ? "Recursos para estudiantes universitarios" : "Resources for college students",
      icon: GraduationCap
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in py-10 relative overflow-hidden">
      {/* Enhanced Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.1%22/><circle cx=%2210%22 cy=%2210%22 r=%220.5%22 fill=%22%23E5C5A1%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
      
      {/* Enhanced Decorative elements with animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B87333]/30 to-[#E5C5A1]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '4s'}}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D946EF]/25 to-[#9b87f5]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '6s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#B87333]/10 to-transparent rounded-full blur-2xl -z-10 animate-pulse" style={{animationDuration: '8s'}}></div>
      
      <div className="max-w-5xl w-full mx-auto px-4 z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>{translations.title}</h2>
          <p className="text-xl text-gray-300 mb-4">{translations.subtitle}</p>
          <p className="text-lg text-[#E5C5A1] font-semibold">✨ Start your mental wellness journey with plans designed for every need ✨</p>
          
          {/* Enhanced Billing cycle toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex p-1 bg-gradient-to-r from-gray-800/60 to-gray-800/40 rounded-xl border border-[#B87333]/30 shadow-lg backdrop-blur-sm">
              <button
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly' 
                    ? 'bg-[#B87333] text-white shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                {translations.monthly}
              </button>
              <button
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                {translations.yearly}
                <span className="text-xs bg-green-500/30 text-green-200 px-3 py-1 rounded-full font-bold animate-pulse">
                  {translations.yearlyDiscount}
                </span>
              </button>
            </div>
          </div>
          
          {/* Savings highlight for yearly */}
          {billingCycle === 'yearly' && (
            <div className="text-center mt-4">
              <p className="text-green-400 font-semibold text-lg animate-fade-in">
                🎉 You're saving up to 20% with yearly billing! 🎉
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {subscriptionPlans.map((plan, index) => (
            <div 
              key={plan.title}
              className={`${plan.color} rounded-2xl overflow-hidden transition-all duration-500 transform ${selectedPlan === plan.title ? 'scale-110 ring-4 ring-[#B87333] shadow-2xl z-10' : 'hover:scale-105 hover:shadow-xl'} relative cursor-pointer border-2 group animate-fade-in`}
              style={{animationDelay: `${index * 150}ms`}}
              onClick={() => onPlanSelect(plan.title)}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="p-8 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl md:text-3xl font-bold">{plan.price}</p>
                      {plan.price !== "Free" && plan.price !== "Gratis" && billingCycle === 'yearly' && (
                        <span className="text-sm opacity-60">
                          {isSpanish ? "/año" : "/year"}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && plan.price !== "Free" && plan.price !== "Gratis" && (
                      <p className="text-green-400 text-sm font-semibold mt-1">
                        {isSpanish ? "¡Ahorro anual!" : "Annual savings!"}
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                    <plan.icon className="h-8 w-8" />
                  </div>
                </div>
                <p className="mb-6 text-sm opacity-90 leading-relaxed">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="p-0.5 rounded-full bg-green-500/20 mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Button 
                  className={`w-full transition-all duration-300 py-4 text-lg font-semibold ${
                    selectedPlan === plan.title 
                      ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-lg transform scale-105' 
                      : plan.title === 'Basic' || plan.title === 'Básico'
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                        : plan.title === 'Gold' || plan.title === 'Oro'
                          ? 'bg-gradient-to-r from-[#B87333] to-[#D4A574] hover:from-[#A56625] hover:to-[#C19660] text-white'
                          : 'bg-gradient-to-r from-[#7E69AB] to-[#9B7DB8] hover:from-[#6B5A91] hover:to-[#8A6FA5] text-white'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlanSelect(plan.title);
                  }}
                >
                  {selectedPlan === plan.title ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="h-5 w-5" />
                      {translations.selected}
                    </span>
                  ) : (
                    translations.select
                  )}
                </Button>
              </div>
              {plan.recommended && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                    ⭐ {translations.recommend}
                  </div>
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
