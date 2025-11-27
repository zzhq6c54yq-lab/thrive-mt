import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface HenryDailyInsightProps {
  insight: string;
  onSetReminder?: () => void;
  onAskHenry?: () => void;
}

export const HenryDailyInsight: React.FC<HenryDailyInsightProps> = ({
  insight,
  onSetReminder,
  onAskHenry,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 border border-[#D4AF37]/30 rounded-lg p-6"
    >
      <div className="flex items-start gap-3 mb-3">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex-shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-md opacity-40" />
          <Avatar className="w-10 h-10 border-2 border-[#D4AF37]/50 relative">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black font-bold">
              H
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="text-lg font-bold text-shadow">Henry's Insight for You 💡</h4>
          </div>
          <p className="text-sm text-foreground mb-4">
            {insight}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {onSetReminder && (
          <Button size="sm" variant="gold" onClick={onSetReminder}>
            <Bell className="w-4 h-4 mr-1" />
            Set a morning reminder
          </Button>
        )}
        {onAskHenry && (
          <Button size="sm" variant="outline" onClick={onAskHenry}>
            <MessageSquare className="w-4 h-4 mr-1" />
            Ask Henry about this
          </Button>
        )}
      </div>
    </motion.div>
  );
};
