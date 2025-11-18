import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { 
  Zap, 
  Heart, 
  MessageCircle, 
  Play, 
  Wind,
  X,
  Plus
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  urgent?: boolean;
}

export default function QuickActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { dashboardData } = useTodayDashboard();

  // Get context-aware actions based on user data
  const getContextualActions = (): QuickAction[] => {
    const actions: QuickAction[] = [];
    const now = new Date().getHours();

    // Always show emergency help
    actions.push({
      id: 'emergency',
      label: 'Emergency Help',
      icon: <Heart className="w-4 h-4" />,
      onClick: () => navigate('/crisis-resources'),
      color: 'bg-red-500 hover:bg-red-600',
      urgent: true
    });

    // Quick breathing - always helpful
    actions.push({
      id: 'breathing',
      label: 'Quick Breathing',
      icon: <Wind className="w-4 h-4" />,
      onClick: () => navigate('/breathing'),
      color: 'bg-blue-500 hover:bg-blue-600'
    });

    // Continue today's plan if activities exist
    if (dashboardData?.todaysPlan && dashboardData.todaysPlan.length > 0) {
      const firstIncomplete = dashboardData.todaysPlan[0];
      actions.push({
        id: 'continue-plan',
        label: `Start ${firstIncomplete.title}`,
        icon: <Play className="w-4 h-4" />,
        onClick: () => navigate(firstIncomplete.route_path || '/dashboard'),
        color: 'bg-green-500 hover:bg-green-600'
      });
    }

    // AI Chat - Between Session Companion
    actions.push({
      id: 'ai-chat',
      label: 'Talk to AI Companion',
      icon: <MessageCircle className="w-4 h-4" />,
      onClick: () => navigate('/mini-session'),
      color: 'bg-purple-500 hover:bg-purple-600'
    });

    // Morning check-in (before noon)
    if (now < 12) {
      actions.unshift({
        id: 'morning-checkin',
        label: 'Morning Check-in',
        icon: <Zap className="w-4 h-4" />,
        onClick: () => {
          const element = document.getElementById('quick-check-in');
          element?.scrollIntoView({ behavior: 'smooth' });
        },
        color: 'bg-amber-500 hover:bg-amber-600'
      });
    }

    return actions.slice(0, 5); // Show max 5 actions
  };

  const actions = getContextualActions();

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-3 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  onClick={() => {
                    action.onClick();
                    setIsExpanded(false);
                  }}
                  className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all w-full justify-start group`}
                  size="sm"
                >
                  <span className="mr-2">{action.icon}</span>
                  <span className="text-xs font-medium">{action.label}</span>
                  {action.urgent && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="ml-auto"
                    >
                      ❗
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-lg hover:shadow-xl transition-all"
          size="icon"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
