import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UniversalEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'warm' | 'minimal';
  showHenry?: boolean;
}

export const UniversalEmptyState: React.FC<UniversalEmptyStateProps> = ({
  icon: Icon = Heart,
  title,
  message,
  actionLabel,
  onAction,
  variant = 'default',
  showHenry = false
}) => {
  const variants = {
    default: 'bg-gradient-to-br from-card/80 to-card border-border/50',
    warm: 'bg-gradient-to-br from-bronze-500/10 to-amber-500/5 border-bronze-500/20',
    minimal: 'bg-transparent border-transparent'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex items-center justify-center py-12 px-4"
    >
      <div className={`max-w-md w-full rounded-2xl border p-8 text-center ${variants[variant]}`}>
        {/* Icon with gentle glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-bronze-500/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-bronze-500" />
            </div>
            {/* Gentle pulse effect */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-bronze-500/10"
            />
          </div>
        </motion.div>

        {/* Henry's presence (optional) */}
        {showHenry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-bronze-400" />
            <span className="text-sm text-bronze-400 italic">Henry says...</span>
          </motion.div>
        )}

        {/* Title - empathetic language */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-medium text-foreground mb-3"
        >
          {title}
        </motion.h3>

        {/* Message - supportive tone */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-6 leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Action button */}
        {actionLabel && onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onAction}
              className="bg-gradient-to-r from-bronze-500 to-bronze-600 text-primary-foreground hover:opacity-90 font-medium px-6"
            >
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UniversalEmptyState;
