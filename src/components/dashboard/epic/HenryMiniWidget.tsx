import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex-shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-md opacity-40" />
          <Avatar className="w-12 h-12 border-2 border-[#D4AF37]/50 relative shadow-lg">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black font-bold">
              H
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <div className="flex-1">
          <p className="text-base text-foreground mb-4 leading-relaxed">
            {message}
          </p>
          <div className="flex gap-3">
            <Button size="sm" variant="default" onClick={onStart} className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold shadow-md hover:shadow-lg transition-all">
              Yes, let's do it! 🎉
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
