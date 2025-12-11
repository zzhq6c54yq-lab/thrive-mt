
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Package, Trophy, Gem, Check, Sparkles, Zap, Brain, Heart, StarIcon, Shield, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";

interface SubscriptionPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  addOnPrice: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  recommended: boolean;
}

const SubscriptionPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, subscription, checkSubscription } = useUser();

  const getPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      const yearlyPrice = basePrice * 12;
      const discountedPrice = Math.round(yearlyPrice * 0.8);
      return `$${discountedPrice}/year`;
    }
    return `$${basePrice}/month`;
  };

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "basic",
      title: "Basic",
      price: "Free",
      description: "Start your mental health journey with essential features",
      features: [
        "Access to essential mental wellness tools",
        "Join virtual meetings and classes",
        "Digital sponsor access",
        "Limited workshop access",
        "Add-ons at $3/month each"
      ],
      addOnPrice: "$3/each",
      icon: Package,
      color: "text-gray-800",
      bgGradient: "from-gray-100 to-gray-200",
      recommended: false
    },
    {
      id: "gold",
      title: "Gold",
      price: billingCycle === 'monthly' ? "$5/month" : getPrice(5),
      description: "Enhanced features for a more personalized experience",
      features: [
        "5% bonus on all co-pay credits",
        "Access to all mental wellness tools",
        "Extended workshop library",
        "Priority access to virtual meetings",
        "Personalized wellness plan",
        "Exclusive mindfulness exercises",
        "Add-ons at $2/month each"
      ],
      addOnPrice: "$2/each",
      icon: Trophy,
      color: "text-[#B87333]",
      bgGradient: "from-[#FEF7CD] to-[#F8E4B8]",
      recommended: false
    },
    {
      id: "platinum",
      title: "Platinum",
      price: billingCycle === 'monthly' ? "$10/month" : getPrice(10),
      description: "Our most comprehensive mental health package",
      features: [
        "10% bonus on all co-pay credits",
        "Unlimited access to all platform features",
        "Premium workshop content",
        "Early access to new features",
        "Advanced analytics and insights",
        "Personalized wellness roadmap",
        "Priority support access",
        "Family account options",
        "Add-ons at $1/month each"
      ],
      addOnPrice: "$1/each",
      icon: Gem,
      color: "text-[#7E69AB]",
      bgGradient: "from-[#E5DEFF] to-[#D5C8F8]",
      recommended: true
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "Select a subscription plan to continue",
        variant: "destructive"
      });
      return;
    }

    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    const selectedPlanData = subscriptionPlans.find(p => p.id === selectedPlan);  
    setLoading(selectedPlan);
    
    try {
      // For Basic plan, just update status locally
      if (selectedPlanData?.title === "Basic") {
        await checkSubscription();
        toast({
          title: "Basic Plan Activated",
          description: "You now have access to basic features.",
        });
        navigate("/app/dashboard");
        return;
      }

      // For paid plans, create Stripe checkout
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planTitle: selectedPlanData?.title,
          billingCycle: billingCycle
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Payment",
          description: "A new tab will open with the secure payment form.",
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Page title="Upgrade Your Mental Health Journey" fullWidth>
      <div className="min-h-[calc(100vh-200px)] relative overflow-hidden animate-fade-in">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c2e4a] via-[#2d3748] to-[#1a1a1f] -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.05%22 stroke-width=%221%22/></svg>')] opacity-40 -z-10"></div>
        
        {/* Animated background gradients */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '20s'}}></div>
        
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-lg rounded-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/30 via-[#E5C5A1]/50 to-[#B87333]/30 rounded-full opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" style={{animationDuration: '2.5s'}}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B87333]/20 to-transparent blur-sm"></div>
                <Brain className="h-8 w-8 text-[#E5C5A1] relative z-10 animate-pulse" style={{animationDuration: '3s'}}/>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
              Elevate Your Mental Wellness
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Invest in yourself with our premium plans designed to strengthen your mental health journey.
              Access exclusive resources, personalized support, and advanced tools for comprehensive wellbeing.
            </p>
            
            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <button
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    billingCycle === 'monthly' 
                      ? 'bg-[#B87333] text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
                    billingCycle === 'yearly' 
                      ? 'bg-[#B87333] text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                    Save 20%!
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-500 transform ${
                  selectedPlan === plan.id ? 'scale-105 ring-4 ring-[#B87333]' : 'hover:scale-102'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-100`}></div>
                
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23000000%22 fill-opacity=%220.1%22/></svg>')] opacity-20"></div>
                {plan.recommended && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] background-animate" style={{backgroundSize: '200% auto'}}></div>
                )}
                
                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`text-2xl font-bold ${plan.color}`}>{plan.title}</h3>
                      <p className={`text-3xl font-semibold mt-1 ${plan.color}`}>{plan.price}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-white/20 backdrop-blur-sm ${plan.color}`}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <p className={`mb-6 ${plan.color} opacity-90`}>{plan.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className={`h-5 w-5 mr-3 flex-shrink-0 mt-0.5 ${plan.color}`} />
                        <span className={`text-sm ${plan.color} opacity-90`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${selectedPlan === plan.id ? 
                      'bg-[#B87333] hover:bg-[#B87333]/90 text-white' : 
                      'bg-black/30 hover:bg-black/40 text-white'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={subscription?.subscription_tier === plan.title}
                  >
                    {subscription?.subscription_tier === plan.title ? 'Current Plan' :
                     selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </div>
                
                {plan.recommended && (
                  <div className="absolute top-4 right-0 bg-[#B87333] text-white text-xs font-bold px-4 py-1 rounded-l-full shadow-lg transform translate-x-2 group-hover:translate-x-0 transition-transform">
                    MOST POPULAR
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#B87333]/20">
                  <Heart className="h-6 w-6 text-[#E5C5A1]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Why Upgrade Your Plan?</h3>
                  <p className="text-gray-300">
                    Premium plans provide deeper mental health resources, personalized guidance, 
                    and advanced tools to help you build resilience and achieve lasting wellness.
                  </p>
                </div>
              </div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#B87333] to-[#A05C1B] hover:opacity-90 text-white min-w-40 group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubscribe}
                disabled={!selectedPlan || loading !== null}
              >
                <span className="mr-2">
                  {loading ? `Processing ${loading}...` : "Subscribe Now"}
                </span>
                {!loading && <Zap className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            <p>All plans include a 7-day free trial. Cancel anytime. No hidden fees.</p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SubscriptionPlansPage;
