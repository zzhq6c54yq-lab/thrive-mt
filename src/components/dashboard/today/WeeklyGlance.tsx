import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, ArrowRight, Flame, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeeklyGlanceProps {
  streak: number;
  challengesCompleted: number;
  latestAssessment: { score: number; label: string } | null;
  moodTrend: { date: string; score: number }[];
  insight: { insight_text: string; insight_type: string } | null;
}

export default function WeeklyGlance({
  streak,
  challengesCompleted,
  latestAssessment,
  moodTrend,
  insight
}: WeeklyGlanceProps) {
  const navigate = useNavigate();

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          This Week at a Glance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stat Chips */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-medium text-muted-foreground">Streak</span>
            </div>
            <p className="text-2xl font-bold text-orange-500">{streak}</p>
            <p className="text-xs text-muted-foreground">days</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-muted-foreground">Done</span>
            </div>
            <p className="text-2xl font-bold text-blue-500">{challengesCompleted}</p>
            <p className="text-xs text-muted-foreground">activities</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-muted-foreground">PHQ-9</span>
            </div>
            {latestAssessment ? (
              <>
                <p className="text-2xl font-bold text-green-500">{latestAssessment.score}</p>
                <p className="text-xs text-muted-foreground">{latestAssessment.label}</p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">Not taken</p>
            )}
          </motion.div>
        </div>

        {/* Mood Trend Chart */}
        {moodTrend.length > 0 && (
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-3">Mood Trend (Last 7 Days)</h4>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={moodTrend}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  domain={[1, 5]} 
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Insight */}
        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-lg bg-primary/5 border border-primary/20"
          >
            <p className="text-sm text-foreground/90">
              💡 {insight.insight_text}
            </p>
          </motion.div>
        )}

        {/* View Full Insights Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/progress-analytics')}
        >
          View Full Insights
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
