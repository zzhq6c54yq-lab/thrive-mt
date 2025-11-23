import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HenryMiniWidgetProps {
  message: string;
  onStart: () => void;
  onDismiss: () => void;
}

export const HenryMiniWidget: React.FC<HenryMiniWidgetProps> = ({
  message,
  onStart,
  onDismiss,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 rounded-lg p-6 border border-[#D4AF37]/40 hover:border-[#D4AF37]/60 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0 shadow-lg">
          <Sparkles className="w-6 h-6 text-black" />
        </div>
        <div className="flex-1">
          <p className="text-base text-foreground mb-4 leading-relaxed">
            {message}
          </p>
          <div className="flex gap-3">
            <Button size="sm" variant="gold" onClick={onStart} className="shadow-md hover:shadow-lg transition-shadow">
              Yes, let's do it
            </Button>
            <Button size="sm" variant="ghost" onClick={onDismiss} className="text-muted-foreground hover:text-foreground">
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
