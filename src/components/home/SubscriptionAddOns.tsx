
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, GraduationCap, Briefcase, Sparkles, ArrowLeft, ArrowRight, Users, Check } from "lucide-react";
import { motion } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";

interface AddOn {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  gradient: string;
  borderColor: string;
  imagePath: string;
  price: {
    basic: string;
    gold: string;
    platinum: string;
  };
}

interface SubscriptionAddOnsProps {
  selectedPlan: string | null;
  selectedAddOns: string[];
  onAddOnToggle: (id: string) => void;
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
  onSkip,
}) => {
  const { getTranslatedText, preferredLanguage } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Get image URL with fallback
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('https://')) {
      return imagePath;
    }
    return "https://images.unsplash.com/photo-1506726446959-adfa26e7aea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  };

  // Display pricing based on selected plan and billing cycle
  const getPriceDisplay = (addOn: AddOn) => {
    let basePrice = 0;
    
    if (!selectedPlan || selectedPlan.toLowerCase() === 'basic') {
      basePrice = 3;
    } else if (selectedPlan.toLowerCase() === 'gold') {
      basePrice = 2;
    } else if (selectedPlan.toLowerCase() === 'platinum') {
      basePrice = 1;
    }

    if (billingCycle === 'yearly') {
      const yearlyPrice = basePrice * 12;
      const discountedPrice = Math.round(yearlyPrice * 0.8);
      
      return (
        <div className="flex flex-col items-end">
          <span className="text-xs text-white/70 line-through">${yearlyPrice}/year</span>
          <span className="text-lg font-bold">${discountedPrice}/year</span>
        </div>
      );
    }

    return `$${basePrice}/month`;
  };

  // Get the price based on plan for display in summary
  const getAddOnPrice = (id: string) => {
    const addOn = addOns.find(a => a.id === id);
    if (!addOn) return "$0";
    
    let basePrice = 0;
    if (!selectedPlan || selectedPlan.toLowerCase() === 'basic') {
      basePrice = 3;
    } else if (selectedPlan.toLowerCase() === 'gold') {
      basePrice = 2;
    } else if (selectedPlan.toLowerCase() === 'platinum') {
      basePrice = 1;
    }

    if (billingCycle === 'yearly') {
      const yearlyPrice = basePrice * 12;
      const discountedPrice = Math.round(yearlyPrice * 0.8);
      return `$${discountedPrice}/year`;
    }
    
    return `$${basePrice}/month`;
  };

  // Calculate total price for all selected add-ons
  const calculateTotalPrice = () => {
    if (selectedAddOns.length === 0) return 0;
    
    let basePrice = 0;
    if (!selectedPlan || selectedPlan.toLowerCase() === 'basic') {
      basePrice = 3;
    } else if (selectedPlan.toLowerCase() === 'gold') {
      basePrice = 2;
    } else if (selectedPlan.toLowerCase() === 'platinum') {
      basePrice = 1;
    }
    
    const monthlyTotal = basePrice * selectedAddOns.length;
    
    if (billingCycle === 'yearly') {
      const yearlyPrice = monthlyTotal * 12;
      return Math.round(yearlyPrice * 0.8);
    }
    
    return monthlyTotal;
  };

  // Get translated payment period text
  const getPaymentPeriodText = (isYearly: boolean) => {
    if (preferredLanguage === 'Español') {
      return isYearly ? 'Anual' : 'Mensual';
    } else if (preferredLanguage === 'Português') {
      return isYearly ? 'Anual' : 'Mensal';
    }
    return isYearly ? 'Yearly' : 'Monthly';
  };

  // Calculate savings percentage
  const savingsText = () => {
    if (preferredLanguage === 'Español') {
      return '¡Ahorra 20%!';
    } else if (preferredLanguage === 'Português') {
      return 'Economize 20%!';
    }
    return 'Save 20%!';
  };

  const addOns: AddOn[] = [
    {
      id: "dod",
      title: getTranslatedText('dodTitle'),
      description: getTranslatedText('dodDesc'),
      icon: Shield,
      path: "/dod-welcome",
      gradient: "from-[#0EA5E9]/80 to-[#2563EB]/80",
      borderColor: "#0EA5E9",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"),
      price: {
        basic: "$3/month",
        gold: "$2/month",
        platinum: "$1/month"
      }
    },
    {
      id: "college",
      title: getTranslatedText('collegeTitle'),
      description: getTranslatedText('collegeDesc'),
      icon: GraduationCap,
      path: "/college-welcome",
      gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
      borderColor: "#8B5CF6",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"),
      price: {
        basic: "$3/month",
        gold: "$2/month",
        platinum: "$1/month"
      }
    },
    {
      id: "business",
      title: getTranslatedText('businessTitle'),
      description: getTranslatedText('businessDesc'),
      icon: Briefcase,
      path: "/small-business-selection",
      gradient: "from-[#F97316]/80 to-[#FB923C]/80",
      borderColor: "#F97316",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"),
      price: {
        basic: "$3/month",
        gold: "$2/month",
        platinum: "$1/month"
      }
    },
    {
      id: "adolescent",
      title: getTranslatedText('adolescentTitle'),
      description: getTranslatedText('adolescentDesc'),
      icon: Users,
      path: "/adolescent-selection",
      gradient: "from-[#D946EF]/80 to-[#EC4899]/80",
      borderColor: "#D946EF",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"),
      price: {
        basic: "$3/month",
        gold: "$2/month",
        platinum: "$1/month"
      }
    },
    {
      id: "golden",
      title: getTranslatedText('goldenTitle'),
      description: getTranslatedText('goldenDesc'),
      icon: Sparkles,
      path: "/golden-years-welcome",
      gradient: "from-[#D4AF37]/80 to-[#B8860B]/80",
      borderColor: "#D4AF37",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"),
      price: {
        basic: "$3/month",
        gold: "$2/month",
        platinum: "$1/month"
      }
    }
  ];

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  // Get appropriate header text based on language
  const getHeaderText = () => {
    if (preferredLanguage === 'Español') {
      return "Profundiza en tu viaje de salud mental";
    } else if (preferredLanguage === 'Português') {
      return "Aprofunde sua jornada de saúde mental";
    }
    return "Deepen your mental health journey";
  };

  // Get appropriate subheader text based on language
  const getSubheaderText = () => {
    if (preferredLanguage === 'Español') {
      return "Agregando uno de nuestros programas especializados";
    } else if (preferredLanguage === 'Português') {
      return "Adicionando um de nossos programas especializados";
    }
    return "By adding one of our specialized programs";
  };

  // Get pricing explanation based on selected plan and language
  const getPricingExplanation = () => {
    if (!selectedPlan) return "";
    
    if (preferredLanguage === 'Español') {
      if (selectedPlan.toLowerCase() === 'gold') {
        return "Los suscriptores de Gold ahorran $1/mes en cada complemento";
      } else if (selectedPlan.toLowerCase() === 'platinum') {
        return "Los suscriptores de Platinum ahorran $2/mes en cada complemento";
      }
      return "Precio estándar para suscriptores Basic";
    } else if (preferredLanguage === 'Português') {
      if (selectedPlan.toLowerCase() === 'gold') {
        return "Assinantes Gold economizam $1/mês em cada adicional";
      } else if (selectedPlan.toLowerCase() === 'platinum') {
        return "Assinantes Platinum economizam $2/mês em cada adicional";
      }
      return "Preço padrão para assinantes Basic";
    } else {
      if (selectedPlan.toLowerCase() === 'gold') {
        return "Gold subscribers save $1/month on each add-on";
      } else if (selectedPlan.toLowerCase() === 'platinum') {
        return "Platinum subscribers save $2/month on each add-on";
      }
      return "Standard pricing for Basic subscribers";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in py-10 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D946EF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl w-full mx-auto px-4 z-10">
        {/* Enhanced header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
            {getHeaderText()}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {getSubheaderText()}
          </p>
          
          {selectedPlan && (
            <div className="mt-4 mb-2">
              <span className="font-medium text-amber-300 inline-block py-1 px-3 rounded-full bg-amber-900/30 border border-amber-500/20">
                {selectedPlan} {getTranslatedText('planSelected')}
              </span>
              <p className="text-sm text-amber-200/70 mt-2">{getPricingExplanation()}</p>
            </div>
          )}

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
                {getPaymentPeriodText(false)}
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-[#B87333] text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                {getPaymentPeriodText(true)}
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                  {savingsText()}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {addOns.map((addOn) => (
            <motion.div 
              key={addOn.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 ${
                selectedAddOns.includes(addOn.id) ? 'ring-2 ring-[#B87333]' : 'hover:scale-102'
              }`}
              onClick={() => onAddOnToggle(addOn.id)}
              variants={cardVariants}
            >
              {/* Background image */}
              <div className="absolute inset-0 h-[60%] z-0">
                <img 
                  src={addOn.imagePath} 
                  alt={addOn.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506726446959-adfa26e7aea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <addOn.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    {selectedAddOns.includes(addOn.id) && (
                      <div className="bg-[#B87333] text-white p-1 rounded-full">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              
                {/* Bottom info section */}
                <div className={`p-4 bg-gradient-to-br ${addOn.gradient} mt-auto`}>
                  <h3 className="font-semibold text-lg mb-1">
                    {addOn.title}
                  </h3>
                  <p className="text-sm text-white/90 mb-3 line-clamp-2">
                    {addOn.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{getPriceDisplay(addOn)}</span>
                    <Button 
                      variant="outline" 
                      className="bg-white/20 border-white/10 text-white hover:bg-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddOnToggle(addOn.id);
                      }}
                    >
                      {selectedAddOns.includes(addOn.id) ? getTranslatedText('selected') : getTranslatedText('select')}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Border highlight on selection */}
              {selectedAddOns.includes(addOn.id) && (
                <div 
                  className="absolute inset-0 border-2 opacity-100 transition-opacity"
                  style={{ borderColor: addOn.borderColor }}  
                ></div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced summary section */}
        {selectedAddOns.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">
              {getTranslatedText('selectedAddOns')}
            </h3>
            <div className="space-y-3">
              {selectedAddOns.map(id => {
                const addOn = addOns.find(a => a.id === id);
                if (!addOn) return null;
                return (
                  <div key={id} className="flex justify-between items-center py-1">
                    <div className="flex items-center">
                      <addOn.icon className="h-5 w-5 mr-3 text-[#B87333]" />
                      <span className="font-medium">{addOn.title}</span>
                    </div>
                    <span className="font-medium">{getAddOnPrice(id)}</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-2 font-bold">
                <span>{billingCycle === 'yearly' ? 'Yearly Total:' : 'Monthly Total:'}</span>
                <span className="text-xl text-[#E5C5A1]">${calculateTotalPrice()}{billingCycle === 'yearly' ? '/year' : '/month'}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap justify-center space-x-4 gap-3 mt-8">
          <Button 
            variant="outline"
            className="border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 flex items-center gap-2"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            {getTranslatedText('previous')}
          </Button>
          <Button 
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white flex items-center gap-2"
            onClick={onContinue}
          >
            {getTranslatedText('continue')}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={onSkip}
          >
            {getTranslatedText('skipForNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAddOns;
