import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import HenryDialog from '@/components/henry/HenryDialog';

interface HenryContextualTipProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const HenryContextualTip: React.FC<HenryContextualTipProps> = ({
  message,
  actionText = "Chat with Henry",
  onAction,
  className = ''
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      setIsChatOpen(true);
    }
  };

  if (isDismissed) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 rounded-xl p-4 border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all shadow-md ${className}`}
        >
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-white/50"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            {/* Henry Avatar */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-md opacity-40" />
              <Avatar className="w-12 h-12 border-2 border-[#D4AF37]/50 relative">
                <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black font-bold">
                  H
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {message}
              </p>
              
              <Button
                size="sm"
                onClick={handleAction}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold shadow-md"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {actionText}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Henry Chat Dialog */}
      <HenryDialog 
        isOpen={isChatOpen} 
        onOpenChange={setIsChatOpen}
      />
    </>
  );
};

export default HenryContextualTip;
