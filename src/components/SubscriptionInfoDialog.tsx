
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Check, Info, Percent, Crown } from 'lucide-react';

interface SubscriptionPlan {
  title: string;
  price: string;
  coPayCredit?: string;
  features: { text: string }[];
  recommended?: boolean;
}

const SubscriptionInfoDialog = () => {
  const subscriptionPlans = [
    {
      title: "Free",
      price: "$0",
      coPayCredit: "5%",
      features: [
        { text: "Basic mental wellness tools" },
        { text: "Limited AI sponsor assistance" },
        { text: "Access to community support forums" },
        { text: "Daily mood tracking" }
      ]
    },
    {
      title: "Gold",
      price: "$5",
      coPayCredit: "15%",
      features: [
        { text: "All Free features" },
        { text: "Advanced mental wellness tools" },
        { text: "Enhanced AI sponsor capabilities" },
        { text: "Guided meditation library" },
        { text: "Priority community support" }
      ],
      recommended: true
    },
    {
      title: "Platinum",
      price: "$10",
      coPayCredit: "25%",
      features: [
        { text: "All Gold features" },
        { text: "Premium mental wellness tools" },
        { text: "Advanced emotional intelligence training" },
        { text: "Personalized wellness plan" },
        { text: "1-on-1 coaching sessions" },
        { text: "24/7 crisis support" }
      ]
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline_copper" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          Subscription Plans
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Crown className="h-5 w-5 text-[#B87333]" />
            Subscription Plans
          </DialogTitle>
          <DialogDescription>
            Choose the plan that best fits your mental wellness journey
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {subscriptionPlans.map((plan, index) => (
            <Card key={index} className={`p-4 flex flex-col border-[#3a3a40] bg-[#2a2a30] ${
              plan.recommended ? 'border-[#B87333] relative' : ''
            }`}>
              {plan.recommended && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-[#B87333] text-white text-xs px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold text-white text-center mb-2">{plan.title}</h3>
              <div className="text-center mb-3">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4 bg-[#3a3a40] rounded-md p-2">
                <Percent className="h-4 w-4 text-[#B87333]" />
                <span className="text-[#B87333] font-semibold">{plan.coPayCredit}</span>
                <span className="text-gray-300 text-sm">co-pay credit</span>
              </div>
              
              <ul className="space-y-2 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="min-w-4 h-4 text-[#B87333] mt-1" />
                    <span className="text-sm text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          Upgrade your subscription to access premium features and increase your co-pay credit percentage.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionInfoDialog;
