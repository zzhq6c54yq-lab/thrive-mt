
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Package, Trophy, Gem, Check } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

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

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  selectedPlan,
  onPlanSelect,
  onContinue,
  onPrevious,
  onSkip,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { getTranslatedText } = useTranslation();
  
  const getDiscountedPrice = (price: number) => {
    if (billingCycle === 'yearly') {
      return (price * 0.8 * 12).toFixed(2); // 20% discount for yearly
    }
    return price;
  };

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 0,
      features: [
        "Access to essential mental wellness tools",
        "Join virtual meetings and classes",
        "Digital sponsor access",
        "Limited workshop access"
      ]
    },
    {
      name: 'Gold',
      monthlyPrice: 5,
      features: [
        "5% bonus on all co-pay credits",
        "Access to all mental wellness tools",
        "Extended workshop library",
        "Priority access to virtual meetings",
        "Personalized wellness plan"
      ]
    },
    {
      name: 'Platinum',
      monthlyPrice: 10,
      features: [
        "10% bonus on all co-pay credits",
        "Unlimited access to all platform features",
        "Premium workshop content",
        "Early access to new features",
        "Advanced analytics and insights",
        "Personalized wellness roadmap"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in py-10">
      <div className="max-w-6xl w-full mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{getTranslatedText('choosePlan')}</h2>
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={billingCycle === 'monthly' ? "default" : "outline"}
              onClick={() => setBillingCycle('monthly')}
              className={billingCycle === 'monthly' ? 'bg-[#B87333]' : ''}
            >
              {getTranslatedText('monthly')}
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? "default" : "outline"}
              onClick={() => setBillingCycle('yearly')}
              className={billingCycle === 'yearly' ? 'bg-[#B87333]' : ''}
            >
              {getTranslatedText('yearly')} - 20% {getTranslatedText('off')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/10 rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedPlan === plan.name
                  ? 'border-[#B87333] transform scale-105'
                  : 'border-transparent hover:border-[#B87333]/50'
              }`}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2">
                  {billingCycle === 'monthly' ? (
                    <p className="text-3xl font-bold">
                      ${getDiscountedPrice(plan.monthlyPrice)}/mo
                    </p>
                  ) : (
                    <>
                      <p className="text-3xl font-bold">
                        ${getDiscountedPrice(plan.monthlyPrice)}/year
                      </p>
                      <p className="text-sm text-[#B87333]">
                        {getTranslatedText('save20')}
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-[#B87333] mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  selectedPlan === plan.name
                    ? 'bg-[#B87333] hover:bg-[#B87333]/90'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                onClick={() => onPlanSelect(plan.name)}
              >
                {selectedPlan === plan.name ? getTranslatedText('selected') : getTranslatedText('select')}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onPrevious}>
            {getTranslatedText('previous')}
          </Button>
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/90"
            onClick={onContinue}
          >
            {getTranslatedText('continue')}
          </Button>
          <Button variant="ghost" onClick={onSkip}>
            {getTranslatedText('skipForNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
