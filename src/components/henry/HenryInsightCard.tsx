import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Award, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HenryDialog from '@/components/henry/HenryDialog';

interface HenryInsightCardProps {
  insight: string;
  metric?: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  };
  encouragement?: string;
  className?: string;
}

const HenryInsightCard: React.FC<HenryInsightCardProps> = ({
  insight,
  metric,
  encouragement,
  className = ''
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getTrendIcon = () => {
    if (!metric?.trend) return null;
    if (metric.trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (metric.trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <Award className="h-4 w-4 text-[#D4AF37]" />;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className={className}
      >
        <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 border-[#D4AF37]/30 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
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
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="text-base font-bold text-shadow">Henry's Insight 💡</h4>
                </div>

                <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
                  {insight}
                </p>

                {/* Metric Display */}
                {metric && (
                  <div className="bg-white/50 rounded-lg p-3 mb-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">
                        {metric.label}
                      </span>
                      {getTrendIcon()}
                    </div>
                    <div className="text-2xl font-bold text-[#D4AF37] mt-1">
                      {metric.value}
                    </div>
                  </div>
                )}

                {/* Encouragement */}
                {encouragement && (
                  <p className="text-xs text-foreground/80 italic mb-3 pl-3 border-l-2 border-[#D4AF37]/50">
                    {encouragement}
                  </p>
                )}

                {/* Action Button */}
                <Button
                  size="sm"
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold shadow-md"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Ask Henry about this
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Henry Chat Dialog */}
      <HenryDialog 
        isOpen={isChatOpen} 
        onOpenChange={setIsChatOpen}
      />
    </>
  );
};

export default HenryInsightCard;
