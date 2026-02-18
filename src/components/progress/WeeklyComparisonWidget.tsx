import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Brain, Activity, CalendarCheck, Wrench, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useWeeklyComparison } from '@/hooks/useWeeklyComparison';

interface MetricRowProps {
  icon: React.ReactNode;
  label: string;
  thisWeekValue: string;
  lastWeekValue: string;
  change: number | null;
  unit?: string;
  delay?: number;
}

const ChangeChip: React.FC<{ change: number | null }> = ({ change }) => {
  if (change === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
        <Minus className="w-3 h-3" /> No prior data
      </span>
    );
  }
  const positive = change >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
        positive
          ? 'bg-green-500/15 text-green-400'
          : 'bg-red-500/15 text-red-400'
      }`}
    >
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {positive ? '+' : ''}{change}%
    </span>
  );
};

const MetricRow: React.FC<MetricRowProps> = ({
  icon, label, thisWeekValue, lastWeekValue, change, delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/50 hover:border-border transition-colors"
  >
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">Last week: {lastWeekValue}</p>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-foreground">{thisWeekValue}</p>
    </div>
    <div className="min-w-[90px] text-right">
      <ChangeChip change={change} />
    </div>
  </motion.div>
);

const WeeklyComparisonWidget: React.FC = () => {
  const { thisWeek, lastWeek, changes, isLoading, hasThisWeekData } = useWeeklyComparison();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading this week's data…</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasThisWeekData) {
    return (
      <Card className="border-dashed border-border/60">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center gap-3">
          <div className="p-4 rounded-full bg-primary/10">
            <CalendarCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">No data this week yet</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Complete a check-in, breathing session, or wellness activity to start comparing your week-over-week progress.
          </p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      icon: <Brain className="w-4 h-4" />,
      label: 'Average Mood',
      thisWeekValue: thisWeek.avgMood !== null ? `${thisWeek.avgMood}/5` : '—',
      lastWeekValue: lastWeek.avgMood !== null ? `${lastWeek.avgMood}/5` : 'No data',
      change: changes.mood,
    },
    {
      icon: <Activity className="w-4 h-4" />,
      label: 'Activity Minutes',
      thisWeekValue: `${thisWeek.activityMinutes} min`,
      lastWeekValue: lastWeek.activityMinutes > 0 ? `${lastWeek.activityMinutes} min` : 'No data',
      change: changes.activityMinutes,
    },
    {
      icon: <CalendarCheck className="w-4 h-4" />,
      label: 'Check-in Consistency',
      thisWeekValue: `${thisWeek.checkInDays} day${thisWeek.checkInDays !== 1 ? 's' : ''}`,
      lastWeekValue: lastWeek.checkInDays > 0 ? `${lastWeek.checkInDays} days` : 'No data',
      change: changes.checkInDays,
    },
    {
      icon: <Wrench className="w-4 h-4" />,
      label: 'Tools Used',
      thisWeekValue: `${thisWeek.toolsUsed} tool${thisWeek.toolsUsed !== 1 ? 's' : ''}`,
      lastWeekValue: lastWeek.toolsUsed > 0 ? `${lastWeek.toolsUsed} tools` : 'No data',
      change: changes.toolsUsed,
    },
  ];

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">This Week vs. Last Week</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Real-time comparison from your Supabase activity data
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {metrics.map((m, i) => (
          <MetricRow key={m.label} {...m} delay={i * 0.08} />
        ))}
      </CardContent>
    </Card>
  );
};

export default WeeklyComparisonWidget;
