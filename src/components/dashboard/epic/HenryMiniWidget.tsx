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
      className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground mb-3">
            {message}
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={onStart}>
              Yes, start
            </Button>
            <Button size="sm" variant="ghost" onClick={onDismiss}>
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
