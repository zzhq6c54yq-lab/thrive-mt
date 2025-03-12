import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Package, Trophy, Gem, Check } from "lucide-react";

interface SubscriptionPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
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

const subscriptionPlans: SubscriptionPlan[] = [
  {
    title: "Basic",
    price: "Free",
    description: "Start your mental health journey with essential features",
    features: [
      "Access to essential mental wellness tools",
      "Join virtual meetings and classes",
      "Digital sponsor access",
      "Limited workshop access"
    ],
    icon: Package,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    recommended: false
  },
  {
    title: "Gold",
    price: "$5/month",
    description: "Enhanced features for a more personalized experience",
    features: [
      "5% bonus on all co-pay credits",
      "Access to all mental wellness tools",
      "Extended workshop library",
      "Priority access to virtual meetings",
      "Personalized wellness plan"
    ],
    icon: Trophy,
    color: "bg-[#FEF7CD] text-[#B87333] border-[#B87333]/30",
    recommended: true
  },
  {
    title: "Platinum",
    price: "$10/month",
    description: "Our most comprehensive mental health package",
    features: [
      "10% bonus on all co-pay credits",
      "Unlimited access to all platform features",
      "Premium workshop content",
      "Early access to new features",
      "Advanced analytics and insights",
      "Personalized wellness roadmap"
    ],
    icon: Gem,
    color: "bg-[#E5DEFF] text-[#7E69AB] border-[#7E69AB]/30",
    recommended: false
  }
];

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  selectedPlan,
  onPlanSelect,
  onContinue,
  onPrevious,
  onSkip,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a35] text-white animate-fade-in py-10">
      <div className="max-w-5xl w-full mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Choose Your Plan</h2>
          <p className="text-xl text-gray-300">Select the subscription that best fits your mental wellness needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {subscriptionPlans.map((plan) => (
            <div 
              key={plan.title}
              className={`${plan.color} rounded-xl overflow-hidden transition-all duration-300 transform ${selectedPlan === plan.title ? 'scale-105 ring-2 ring-[#B87333]' : 'hover:scale-102'}`}
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
                  {selectedPlan === plan.title ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-[#B87333] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Recommended
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
            Previous
          </Button>
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/90 flex items-center gap-2"
            onClick={onContinue}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            onClick={onSkip}
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
