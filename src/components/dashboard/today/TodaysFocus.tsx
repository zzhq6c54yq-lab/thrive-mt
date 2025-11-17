import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { DailyActivity } from '@/hooks/useTodayDashboard';

interface TodaysFocusProps {
  activities: DailyActivity[];
}

export default function TodaysFocus({ activities }: TodaysFocusProps) {
  const navigate = useNavigate();

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Icons.Circle;
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.Circle;
  };

  const getTimeOfDayLabel = (timeOfDay?: string) => {
    switch (timeOfDay) {
      case 'morning': return '🌅 Morning';
      case 'afternoon': return '☀️ Afternoon';
      case 'evening': return '🌙 Evening';
      default: return '';
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Today's Focus</CardTitle>
          <p className="text-sm text-muted-foreground">Building your personalized plan...</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            <div className="animate-pulse">Loading activities...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Today's Focus</CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your goals, here's your next step:
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.icon_name);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{activity.title}</h4>
                    {activity.time_of_day && (
                      <span className="text-xs text-muted-foreground">
                        {getTimeOfDayLabel(activity.time_of_day)}
                      </span>
                    )}
                  </div>
                  {activity.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {activity.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{activity.estimated_minutes} min</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => activity.route_path && navigate(activity.route_path)}
                className="flex-shrink-0 group-hover:bg-primary"
              >
                Start
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          );
        })}

        <p className="text-xs text-center text-muted-foreground pt-2 border-t border-border/30">
          Don't worry about doing everything. Even one step today matters.
        </p>
      </CardContent>
    </Card>
  );
}
