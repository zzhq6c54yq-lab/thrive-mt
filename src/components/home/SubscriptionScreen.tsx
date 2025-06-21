
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Check, Package, Trophy, Crown } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface SubscriptionScreenProps {
  selectedPlan: string | null;
  onPlanSelect: (planTitle: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  selectedPlan,
  onPlanSelect,
  onContinue,
  onPrevious,
  onSkip
}) => {
  const { isSpanish, isPortuguese, isFilipino } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: "basic",
      title: isSpanish ? "Básico" : isPortuguese ? "Básico" : isFilipino ? "Basic" : "Basic",
      subtitle: isSpanish ? "Gratis" : isPortuguese ? "Grátis" : isFilipino ? "Libre" : "Free",
      price: "$0",
      icon: <Package className="w-8 h-8" />,
      description: isSpanish ? "Comienza tu viaje de salud mental con funciones esenciales" :
                   isPortuguese ? "Comece sua jornada de saúde mental com recursos essenciais" :
                   isFilipino ? "Simulan ang inyong paglalakbay sa kalusugang pangkaisipan gamit ang mga pangunahing feature" :
                   "Start your mental health journey with essential features",
      features: [
        isSpanish ? "Acceso a herramientas esenciales de bienestar mental" :
        isPortuguese ? "Acesso a ferramentas essenciais de bem-estar mental" :
        isFilipino ? "Access sa mga pangunahing tool para sa mental wellness" :
        "Access to essential mental wellness tools",
        
        isSpanish ? "Únete a reuniones y clases virtuales" :
        isPortuguese ? "Participe de reuniões e aulas virtuais" :
        isFilipino ? "Sumali sa mga virtual na meeting at klase" :
        "Join virtual meetings and classes",
        
        isSpanish ? "Acceso a padrino digital" :
        isPortuguese ? "Acesso a padrinho digital" :
        isFilipino ? "Access sa digital sponsor" :
        "Digital sponsor access",
        
        isSpanish ? "Acceso limitado a talleres" :
        isPortuguese ? "Acesso limitado a workshops" :
        isFilipino ? "Limited na access sa mga workshop" :
        "Limited workshop access",
        
        isSpanish ? "Complementos a $3/mes cada uno" :
        isPortuguese ? "Complementos a $3/mês cada" :
        isFilipino ? "Mga add-on sa $3/buwan bawat isa" :
        "Add-ons at $3/month each"
      ],
      color: "border-gray-300",
      buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      id: "gold",
      title: isSpanish ? "Oro" : isPortuguese ? "Ouro" : isFilipino ? "Gold" : "Gold",
      subtitle: isSpanish ? "$5/mes" : isPortuguese ? "$5/mês" : isFilipino ? "$5/buwan" : "$5/month",
      price: isYearly ? "$48" : "$5",
      priceNote: isYearly ? (isSpanish ? "/año" : isPortuguese ? "/ano" : isFilipino ? "/taon" : "/year") : 
                           (isSpanish ? "/mes" : isPortuguese ? "/mês" : isFilipino ? "/buwan" : "/month"),
      icon: <Trophy className="w-8 h-8" />,
      description: isSpanish ? "Mejora tu bienestar con herramientas avanzadas y apoyo" :
                   isPortuguese ? "Melhore seu bem-estar com ferramentas avançadas e suporte" :
                   isFilipino ? "Pagandahin ang inyong kapakanan gamit ang mga advanced na tool at suporta" :
                   "Enhance your wellbeing with advanced tools and support",
      features: [
        isSpanish ? "Todo del plan Básico" : isPortuguese ? "Tudo do plano Básico" : isFilipino ? "Lahat mula sa Basic plan" : "Everything from Basic plan",
        isSpanish ? "Herramientas premium de bienestar mental" : isPortuguese ? "Ferramentas premium de bem-estar mental" : isFilipino ? "Premium na mga tool para sa mental wellness" : "Premium mental wellness tools",
        isSpanish ? "Acceso completo a talleres" : isPortuguese ? "Acesso completo a workshops" : isFilipino ? "Buong access sa mga workshop" : "Full workshop access",
        isSpanish ? "Seguimiento de progreso avanzado" : isPortuguese ? "Rastreamento avançado de progresso" : isFilipino ? "Advanced na progress tracking" : "Advanced progress tracking",
        isSpanish ? "Ahorra $1/mes en cada complemento" : isPortuguese ? "Economize $1/mês em cada complemento" : isFilipino ? "Makatipid ng $1/buwan sa bawat add-on" : "Save $1/month on each add-on"
      ],
      color: "border-yellow-500 bg-yellow-50",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
      popular: true
    },
    {
      id: "platinum",
      title: isSpanish ? "Platino" : isPortuguese ? "Platino" : isFilipino ? "Platinum" : "Platinum",
      subtitle: isSpanish ? "$15/mes" : isPortuguese ? "$15/mês" : isFilipino ? "$15/buwan" : "$15/month",
      price: isYearly ? "$144" : "$15",
      priceNote: isYearly ? (isSpanish ? "/año" : isPortuguese ? "/ano" : isFilipino ? "/taon" : "/year") : 
                           (isSpanish ? "/mes" : isPortuguese ? "/mês" : isFilipino ? "/buwan" : "/month"),
      icon: <Crown className="w-8 h-8" />,
      description: isSpanish ? "Experiencia completa con acceso prioritario y características exclusivas" :
                   isPortuguese ? "Experiência completa com acesso prioritário e recursos exclusivos" :
                   isFilipino ? "Kumpletong karanasan na may priority access at exclusive na mga feature" :
                   "Complete experience with priority access and exclusive features",
      features: [
        isSpanish ? "Todo del plan Oro" : isPortuguese ? "Tudo do plano Ouro" : isFilipino ? "Lahat mula sa Gold plan" : "Everything from Gold plan",
        isSpanish ? "Sesiones de terapia 1-on-1" : isPortuguese ? "Sessões de terapia 1-a-1" : isFilipino ? "1-on-1 na mga therapy session" : "1-on-1 therapy sessions",
        isSpanish ? "Acceso prioritario a nuevas funciones" : isPortuguese ? "Acesso prioritário a novos recursos" : isFilipino ? "Priority access sa mga bagong feature" : "Priority access to new features",
        isSpanish ? "Sesiones grupales exclusivas" : isPortuguese ? "Sessões de grupo exclusivas" : isFilipino ? "Exclusive na group session" : "Exclusive group sessions",
        isSpanish ? "Ahorra $2/mes en cada complemento" : isPortuguese ? "Economize $2/mês em cada complemento" : isFilipino ? "Makatipid ng $2/buwan sa bawat add-on" : "Save $2/month on each add-on"
      ],
      color: "border-purple-500 bg-purple-50",
      buttonColor: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] px-4 py-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isSpanish ? "Elige Tu Plan" : 
             isPortuguese ? "Escolha Seu Plano" :
             isFilipino ? "Piliin ang Inyong Plan" :
             "Choose Your Plan"}
          </h1>
          <p className="text-gray-300">
            {isSpanish ? "Selecciona el plan que mejor se adapte a tus necesidades de bienestar" :
             isPortuguese ? "Selecione o plano que melhor se adapta às suas necessidades de bem-estar" :
             isFilipino ? "Piliin ang plan na pinakamahusay na tumugma sa inyong mga pangangailangan sa kapakanan" :
             "Select the plan that best fits your wellness needs"}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="flex items-center bg-[#2a2a35] rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md transition-colors ${
                !isYearly ? 'bg-[#B87333] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isSpanish ? "Mensual" : isPortuguese ? "Mensal" : isFilipino ? "Buwanan" : "Monthly"}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                isYearly ? 'bg-[#B87333] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isSpanish ? "Anual" : isPortuguese ? "Anual" : isFilipino ? "Taunan" : "Yearly"}
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                {isSpanish ? "¡Ahorra 20%!" : isPortuguese ? "Economize 20%!" : isFilipino ? "Makatipid ng 20%!" : "Save 20%!"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`${plan.color} ${
                selectedPlan === plan.title ? 'ring-2 ring-[#B87333]' : ''
              } ${plan.popular ? 'scale-105' : ''} bg-[#2a2a35] border-gray-700 text-white relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#B87333] text-white px-4 py-1 rounded-full text-sm font-medium">
                    {isSpanish ? "Más Popular" : isPortuguese ? "Mais Popular" : isFilipino ? "Pinakasikat" : "Most Popular"}
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <div className="text-3xl font-bold text-[#B87333]">
                  {plan.price}
                  {plan.priceNote && <span className="text-lg text-gray-400">{plan.priceNote}</span>}
                </div>
                <p className="text-gray-400">{plan.subtitle}</p>
                <p className="text-sm text-gray-300">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => onPlanSelect(plan.title)}
                  className={`w-full ${
                    selectedPlan === plan.title 
                      ? 'bg-[#B87333] hover:bg-[#B87333]/80' 
                      : plan.buttonColor
                  } text-white`}
                >
                  {selectedPlan === plan.title 
                    ? (isSpanish ? "Seleccionado" : isPortuguese ? "Selecionado" : isFilipino ? "Napili" : "Selected")
                    : (isSpanish ? "Seleccionar Plan" : isPortuguese ? "Selecionar Plano" : isFilipino ? "Piliin ang Plan" : "Select Plan")
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={onPrevious}
            variant="outline" 
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isSpanish ? "Anterior" : isPortuguese ? "Anterior" : isFilipino ? "Nakaraan" : "Previous"}
          </Button>
          
          <Button 
            onClick={onContinue}
            className="bg-[#B87333] hover:bg-[#B87333]/80 text-white"
            disabled={!selectedPlan}
          >
            {isSpanish ? "Continuar" : isPortuguese ? "Continuar" : isFilipino ? "Magpatuloy" : "Continue"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            {isSpanish ? "Omitir por ahora" : isPortuguese ? "Pular por enquanto" : isFilipino ? "Laktawan muna" : "Skip for now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
