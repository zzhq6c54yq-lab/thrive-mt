import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  showIllustration?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  showIllustration = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md w-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/50 p-12 text-center">
        {showIllustration && Icon && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-bronze-500/20 flex items-center justify-center">
              <Icon className="w-10 h-10 text-bronze-500" />
            </div>
          </motion.div>
        )}
        
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-bronze-500 to-bronze-600 text-black hover:opacity-90 font-semibold"
          >
            {actionLabel}
          </Button>
        )}
      </Card>
    </motion.div>
  );
};