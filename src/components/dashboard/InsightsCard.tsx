import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingUp, Heart, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const InsightsCard: React.FC = () => {
  const { data: insights, refetch } = useQuery({
    queryKey: ['user-insights'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_insights')
        .select('*')
        .eq('user_id', user.id)
        .eq('viewed', false)
        .order('generated_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data || [];
    }
  });

  // Generate insights on mount if none exist
  useEffect(() => {
    const generateInsightsIfNeeded = async () => {
      if (insights && insights.length === 0) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.functions.invoke('generate-insights', {
              body: { userId: user.id }
            });
            refetch();
          }
        } catch (error) {
          console.error('Failed to generate insights:', error);
        }
      }
    };

    generateInsightsIfNeeded();
  }, [insights, refetch]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'mood_trend':
        return <TrendingUp className="w-5 h-5" />;
      case 'activity_correlation':
        return <Heart className="w-5 h-5" />;
      case 'consistency':
        return <Brain className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border-bronze-500/30 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-bronze-500/20 rounded-full">
          <Sparkles className="w-5 h-5 text-bronze-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Your Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg border border-gray-700/50 hover:border-bronze-500/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-bronze-500/20 rounded-full text-bronze-400 flex-shrink-0">
                {getInsightIcon(insight.insight_type)}
              </div>
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed">
                  {insight.insight_text}
                </p>
                {insight.confidence_score && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-bronze-500 to-bronze-400 rounded-full"
                        style={{ width: `${insight.confidence_score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {Math.round(insight.confidence_score * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        AI-powered insights based on your recent activity
      </p>
    </Card>
  );
};