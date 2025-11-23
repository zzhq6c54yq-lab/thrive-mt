import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProgressRing } from './ProgressRing';

interface GoalCardProps {
  title: string;
  description: string;
  current: number;
  target: number;
  type: string;
  status: 'active' | 'completed' | 'missed';
  dueDate?: Date;
  onComplete?: () => void;
  index?: number;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  title,
  description,
  current,
  target,
  type,
  status,
  dueDate,
  onComplete,
  index = 0,
}) => {
  const progress = (current / target) * 100;
  const isCompleted = status === 'completed';

  const getIcon = () => {
    switch (type) {
      case 'check-in':
        return <CheckCircle className="w-5 h-5" />;
      case 'activity':
        return <Target className="w-5 h-5" />;
      case 'journal':
        return <Clock className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className={`p-6 bg-gradient-to-br backdrop-blur-sm transition-all hover:shadow-xl ${
        isCompleted 
          ? 'from-[#D4AF37]/20 to-[#B8941F]/10 border-[#D4AF37]/60' 
          : 'from-gray-800/40 to-gray-900/40 border-gray-700/50'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`p-2 rounded-lg ${
              isCompleted ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-gray-700/50 text-gray-400'
            }`}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          
          <ProgressRing
            progress={progress}
            size={80}
            strokeWidth={6}
            color={isCompleted ? '#D4AF37' : '#6B7280'}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-400">
            <span className="text-white font-semibold">{current}</span> / {target} completed
          </div>
          
          {dueDate && (
            <div className="text-xs text-gray-500">
              Due {dueDate.toLocaleDateString()}
            </div>
          )}
        </div>

        {!isCompleted && progress >= 100 && onComplete && (
          <Button
            onClick={onComplete}
            className="w-full mt-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:opacity-90"
          >
            Mark Complete
          </Button>
        )}

        {isCompleted && (
          <div className="mt-4 flex items-center justify-center gap-2 text-[#D4AF37]">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Completed! 🎉</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
