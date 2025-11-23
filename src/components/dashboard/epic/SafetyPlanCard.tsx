import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Edit, Wind, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SafetyPlanCardProps {
  trustedContactName?: string;
  trustedContactPhone?: string;
}

export const SafetyPlanCard: React.FC<SafetyPlanCardProps> = ({
  trustedContactName = 'trusted contact',
  trustedContactPhone,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="border-2 border-blue-500/50 bg-blue-500/10 rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-shadow">Your Safety Plan</h3>
        <Button size="sm" variant="ghost" className="ml-auto">
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        When things feel really hard, here's your plan:
      </p>

      <div className="space-y-4">
        {/* Step 1: Breathe */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
            1
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">Breathe</p>
            <p className="text-xs text-muted-foreground mb-2">
              2-minute grounding exercise
            </p>
            <Button size="sm" variant="outline" onClick={() => navigate('/breathing')}>
              <Wind className="w-4 h-4 mr-1" />
              Start
            </Button>
          </div>
        </div>

        {/* Step 2: Reach Out */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
            2
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">Reach out</p>
            <p className="text-xs text-muted-foreground mb-2">
              Text {trustedContactName}
            </p>
            <Button
              size="sm"
              variant="outline"
              disabled={!trustedContactPhone}
              onClick={() => {
                if (trustedContactPhone) {
                  window.location.href = `sms:${trustedContactPhone}`;
                }
              }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
          </div>
        </div>

        {/* Step 3: Crisis Resources */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
            3
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">If you feel unsafe</p>
            <p className="text-xs text-muted-foreground mb-2">
              Access immediate crisis support
            </p>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => navigate('/crisis-resources')}
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              Crisis Resources
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          You're not alone. Help is always available.
        </p>
      </div>
    </motion.div>
  );
};
