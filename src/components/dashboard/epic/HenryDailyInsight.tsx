import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-indigo-400" />
        <h4 className="text-lg font-bold text-shadow">Henry's Insight for You</h4>
      </div>
      <p className="text-sm text-foreground mb-4">
        {insight}
      </p>
      <div className="flex flex-wrap gap-2">
        {onSetReminder && (
          <Button size="sm" onClick={onSetReminder}>
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
