import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { X, Star, Lock, Users, Calendar, FileText, Video } from 'lucide-react';
import { AddOn } from './data/types';
import PreviewPortal from './PreviewPortal';
import { createClient } from '@supabase/supabase-js';
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
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  if (!isOpen) return null;

  const getPrice = () => {
    if (!selectedPlan) return '$3.00';
    const plan = selectedPlan.toLowerCase();
    if (plan.includes('platinum')) return '$1.00';
    if (plan.includes('gold')) return '$2.00';
    return '$3.00';
  };

  const translations = {
    preview: isSpanish ? 'Vista Previa' : 'Preview',
    portalPreview: isSpanish ? 'Vista Previa del Portal' : 'Portal Preview',
    keyFeatures: isSpanish ? 'Características Principales' : 'Key Features',
    sampleContent: isSpanish ? 'Contenido de Muestra' : 'Sample Content',
    continueToCheckout: isSpanish ? 'Continuar al Pago' : 'Continue to Checkout',
    thisIsPreview: isSpanish ? 'Esta es una vista previa - Suscríbete para desbloquear' : 'This is a preview - Subscribe to unlock',
    perMonth: isSpanish ? '/mes' : '/month',
    unlockFullAccess: isSpanish ? 'Desbloquear Acceso Completo' : 'Unlock Full Access',
    targetAudience: isSpanish ? 'Audiencia Objetivo' : 'Target Audience',
  };

  const handleCheckout = () => {
    onCheckout(addOn.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-gradient-to-r ${addOn.gradient} bg-opacity-20`}>
                <addOn.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{addOn.title}</h2>
                <p className="text-white/70">{translations.preview}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-[#E5C5A1]">{getPrice()}{translations.perMonth}</div>
                <div className="text-sm text-white/60">{selectedPlan || 'Basic'} Plan</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Portal Preview Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Video className="h-5 w-5 text-[#B87333]" />
              {translations.portalPreview}
            </h3>
            <PreviewPortal addOn={addOn} />
          </div>

          {/* Key Features Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-[#B87333]" />
              {translations.keyFeatures}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addOn.features.map((feature, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-[#B87333] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Content Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#B87333]" />
              {translations.sampleContent}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-white font-medium text-sm">Community Groups</span>
                  </div>
                  <p className="text-white/70 text-xs">Join specialized support groups...</p>
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="text-center">
                      <Lock className="h-6 w-6 text-white/80 mx-auto mb-2" />
                      <p className="text-white/80 text-xs">{translations.thisIsPreview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-green-400" />
                    <span className="text-white font-medium text-sm">Workshops</span>
                  </div>
                  <p className="text-white/70 text-xs">Access exclusive workshops and training...</p>
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="text-center">
                      <Lock className="h-6 w-6 text-white/80 mx-auto mb-2" />
                      <p className="text-white/80 text-xs">{translations.thisIsPreview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                    <span className="text-white font-medium text-sm">Resources</span>
                  </div>
                  <p className="text-white/70 text-xs">Download specialized resources and guides...</p>
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="text-center">
                      <Lock className="h-6 w-6 text-white/80 mx-auto mb-2" />
                      <p className="text-white/80 text-xs">{translations.thisIsPreview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h3 className="text-lg font-medium text-white/90 mb-2">{translations.targetAudience}:</h3>
            <p className="text-white/70">{addOn.targetAudience}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm p-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <div className="text-lg font-semibold text-white mb-1">
                {translations.unlockFullAccess}
              </div>
              <div className="text-white/70 text-sm">
                {translations.targetAudience}: {addOn.targetAudience}
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {translations.continueToCheckout} {getPrice()}{translations.perMonth}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddOnPreview;