import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Sunrise, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface TodayOverviewCardProps {
  dashboardData: DashboardData;
  onCheckInComplete: () => void;
}

const quickTags = ['Stressed', 'Tired', 'Anxious', 'Hopeful', 'Energized', 'Grateful'];

export const TodayOverviewCard: React.FC<TodayOverviewCardProps> = ({
  dashboardData,
  onCheckInComplete,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [moodValue, setMoodValue] = useState([3]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [autoPlanEnabled, setAutoPlanEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleQuickCheckIn = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await supabase.from('daily_check_ins').insert({
        user_id: user.id,
        mood_score: moodValue[0],
        tags: selectedTags,
      });
      
      toast.success('Check-in saved!');
      onCheckInComplete();
    } catch (error) {
      console.error('Error saving check-in:', error);
      toast.error('Failed to save check-in');
    } finally {
      setSaving(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const todaysPlan = dashboardData.todaysPlan.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Mood Check-In */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-shadow">How are you feeling right now?</h3>
          
          <Slider
            value={moodValue}
            onValueChange={setMoodValue}
            max={5}
            min={1}
            step={1}
            className="mb-4"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            {quickTags.map((tag) => (
              <Button
                key={tag}
                size="sm"
                variant={selectedTags.includes(tag) ? 'gold' : 'outline'}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <Button variant="gold" onClick={handleQuickCheckIn} disabled={saving} className="w-full">
            Save Check-in
          </Button>

          {/* Mood Sparkline */}
          {dashboardData.weeklyStats.moodTrend.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Last 7 days</p>
              <div className="flex items-end gap-1 h-12">
                {dashboardData.weeklyStats.moodTrend.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-primary/30 rounded-t"
                    style={{ height: `${(point.score / 5) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Today's Plan */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-shadow">Today's Plan</h3>
            <div className="flex items-center gap-2">
              <Label htmlFor="auto-plan" className="text-xs text-muted-foreground">
                Auto-plan
              </Label>
              <Switch
                id="auto-plan"
                checked={autoPlanEnabled}
                onCheckedChange={setAutoPlanEnabled}
              />
            </div>
          </div>

          <div className="space-y-3">
            {todaysPlan.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No activities planned yet</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => navigate('/app/onboarding')}
                >
                  Set Your Goals
                </Button>
              </div>
            ) : (
              todaysPlan.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {activity.time_of_day === 'morning' && <Sunrise className="w-4 h-4 text-[#D4AF37]" />}
                    {activity.time_of_day === 'afternoon' && <Sun className="w-4 h-4 text-[#D4AF37]" />}
                    {activity.time_of_day === 'evening' && <Moon className="w-4 h-4 text-[#D4AF37]" />}
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time_of_day?.charAt(0).toUpperCase() + activity.time_of_day?.slice(1)} · {activity.estimated_minutes} min
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() => activity.route_path && navigate(activity.route_path)}
                  >
                    Start
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-6 border-t border-[#D4AF37]/20 mt-6">
        <Button size="sm" variant="outline" onClick={() => navigate('/app/journal')}>
          <BookOpen className="w-4 h-4 mr-1" />
          Journal
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate('/app/messages')}>
          <MessageSquare className="w-4 h-4 mr-1" />
          Message therapist
        </Button>
      </div>
    </motion.div>
  );
};
