import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddOn } from './data/types';
import PreviewPortal from './PreviewPortal';
import { useToast } from '@/hooks/use-toast';
import useTranslation from '@/hooks/useTranslation';

interface AddOnPreviewProps {
  addOn: AddOn;
  selectedPlan: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (addOnId: string) => void;
}

const AddOnPreview: React.FC<AddOnPreviewProps> = ({
  addOn,
  selectedPlan,
  isOpen,
  onClose,
  onCheckout
}) => {
  const [screenState, setScreenState] = useState<'welcome' | 'what-to-expect' | 'portal-preview'>('welcome');
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const getPrice = () => {
    if (!selectedPlan) return '$3.00';
    const plan = selectedPlan.toLowerCase();
    if (plan.includes('platinum')) return '$1.00';
    if (plan.includes('gold')) return '$2.00';
    return '$3.00';
  };

  const translations = {
    month: isSpanish ? "mes" : "month",
    continue: isSpanish ? "Continuar" : "Continue",
    whatToExpect: isSpanish ? "Qué Esperar" : "What to Expect",
    enterPortal: isSpanish ? "Ingresar al Portal" : "Enter Portal",
    portal: isSpanish ? "Portal" : "Portal",
    monthlyPrice: isSpanish ? "Precio mensual" : "Monthly Price",
    continueToCheckout: isSpanish ? "Continuar al pago" : "Continue to Checkout"
  };

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else if (screenState === 'what-to-expect') {
      setScreenState('portal-preview');
      window.scrollTo(0, 0);
    }
  };

  const handleCheckout = () => {
    toast({
      title: "Redirecting to Checkout",
      description: `Processing ${addOn.title} subscription`,
      duration: 2000,
    });
    
    setTimeout(() => {
      onCheckout(addOn.id);
    }, 500);
  };

  if (!isOpen) return null;

  const backgroundImageStyle = {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white"
          style={backgroundImageStyle}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          
          <div className="min-h-screen p-4 flex items-center justify-center">
            <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden w-full">
              {/* Close Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10"></div>
              
              <motion.div 
                key={screenState}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
              >
                {screenState === 'welcome' ? (
                  <>
                    <div className="p-5 rounded-full bg-primary/30 backdrop-blur-sm mb-6">
                      <addOn.icon className="h-16 w-16 text-white" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-white">
                      {addOn.title}
                    </h1>

                    {addOn.targetAudience && (
                      <div className="max-w-3xl mx-auto mb-10 bg-gradient-to-r from-purple-800/40 to-pink-800/40 p-6 rounded-lg border-l-4 border-purple-500 shadow-lg backdrop-blur-sm">
                        <div className="flex items-start">
                          <Heart className="text-pink-400 mr-3 min-w-[24px] mt-1" />
                          <p className="text-xl italic text-white leading-relaxed font-light">
                            "{addOn.targetAudience}"
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="max-w-2xl mb-10">
                      <p className="text-xl mb-6 text-white font-medium">
                        {addOn.description}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleContinue}
                      className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                    >
                      {translations.continue} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                ) : screenState === 'what-to-expect' ? (
                  <>
                    <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-white">
                      {translations.whatToExpect}
                    </h1>
                    
                    <div className="max-w-3xl mb-10">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
                        <ul className="space-y-4 text-left">
                          {addOn.features.slice(0, 5).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 rounded-full bg-primary/40 mr-3 mt-1">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              </div>
                              <span className="text-lg text-white">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleContinue}
                      className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                    >
                      {translations.enterPortal} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-white">
                      {addOn.title} {translations.portal}
                    </h1>
                    
                    <div className="max-w-4xl w-full mb-8">
                      <PreviewPortal addOn={addOn} />
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-md">
                      <p className="text-sm text-white/80 mb-2">{translations.monthlyPrice}</p>
                      <p className="text-3xl font-bold text-white">{getPrice()}/{translations.month}</p>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                    >
                      {translations.continueToCheckout} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddOnPreview;