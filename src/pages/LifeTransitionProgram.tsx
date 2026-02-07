import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Circle, Clock, BookOpen, Heart, Target, Loader2, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { programContent } from '@/data/lifeTransitionDailyContent';
import DayContentView from '@/components/transitions/DayContentView';

const LifeTransitionProgram = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const isDemoMode = location.state?.demoUser === true;

  const content = programContent[slug as string];
  const totalWeeks = content?.weeks?.length || 6;

  const { data: program, isLoading } = useQuery({
    queryKey: ['life-transition-program', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('life_transition_programs')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ['transition-enrollment', slug, user?.id],
    queryFn: async () => {
      if (!user?.id || !program?.id) return null;
      const { data, error } = await supabase
        .from('user_transition_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('program_id', program.id)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id && !!program?.id,
  });

  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("Please log in to enroll");
      if (!program?.id) throw new Error("Program not found");
      const { error } = await supabase
        .from('user_transition_progress')
        .insert({
          user_id: user.id,
          program_id: program.id,
          current_week: 1,
          notes: { completedDays: {} },
        });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Enrolled Successfully! 🎉", description: `Your ${program?.title} journey begins now.` });
      queryClient.invalidateQueries({ queryKey: ['transition-enrollment', slug] });
      queryClient.invalidateQueries({ queryKey: ['transition-enrollments'] });
    },
    onError: (error: Error) => {
      toast({ title: "Enrollment Failed", description: error.message, variant: "destructive" });
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ weekNum, dayNum }: { weekNum: number; dayNum: number }) => {
      if (!enrollment?.id) return;
      
      const currentNotes = (enrollment.notes as any) || { completedDays: {} };
      const completedDays = currentNotes.completedDays || {};
      const weekKey = `week_${weekNum}`;
      const weekDays = completedDays[weekKey] || [];
      
      if (!weekDays.includes(dayNum)) {
        weekDays.push(dayNum);
      }
      completedDays[weekKey] = weekDays;

      // Auto-advance to next week if all 7 days completed
      let newCurrentWeek = enrollment.current_week || 1;
      if (weekDays.length === 7 && weekNum === newCurrentWeek && weekNum < totalWeeks) {
        newCurrentWeek = weekNum + 1;
      }

      const { error } = await supabase
        .from('user_transition_progress')
        .update({ 
          notes: { completedDays },
          current_week: newCurrentWeek,
        })
        .eq('id', enrollment.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Day completed! 🎉", description: "Keep up the amazing work!" });
      queryClient.invalidateQueries({ queryKey: ['transition-enrollment', slug] });
    },
  });

  const handleEnroll = () => {
    if (isDemoMode) {
      toast({ title: "Demo Mode", description: "Create an account to enroll in programs." });
      return;
    }
    if (!user) {
      navigate('/app/auth', { state: { returnTo: `/app/life-transitions/${slug}` } });
      return;
    }
    enrollMutation.mutate();
  };

  const getCompletedDaysForWeek = (weekNum: number): number[] => {
    const notes = (enrollment?.notes as any) || {};
    return notes.completedDays?.[`week_${weekNum}`] || [];
  };

  const getCurrentDayForWeek = (weekNum: number): number => {
    const completed = getCompletedDaysForWeek(weekNum);
    if (completed.length === 0) return 1;
    const maxCompleted = Math.max(...completed);
    return maxCompleted < 7 ? maxCompleted + 1 : 7;
  };

  const isWeekAccessible = (weekNum: number): boolean => {
    if (!enrollment) return false;
    if (weekNum === 1) return true;
    // Previous week must have all 7 days completed
    const prevWeekDays = getCompletedDaysForWeek(weekNum - 1);
    return prevWeekDays.length >= 7;
  };

  const isWeekCompleted = (weekNum: number): boolean => {
    return getCompletedDaysForWeek(weekNum).length >= 7;
  };

  const totalCompletedDays = content?.weeks?.reduce((sum, week) => {
    return sum + getCompletedDaysForWeek(week.week).length;
  }, 0) || 0;
  const totalDays = totalWeeks * 7;
  const progressPercent = enrollment ? (totalCompletedDays / totalDays) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-[#000000] p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-white mb-4">Program not found</h1>
          <Button onClick={() => navigate('/app/life-transitions')}>Browse Programs</Button>
        </div>
      </div>
    );
  }

  // Day view for a selected week
  if (selectedWeek !== null && content) {
    const week = content.weeks.find(w => w.week === selectedWeek);
    if (week) {
      return (
        <div className="min-h-screen bg-[#000000] p-6">
          <div className="max-w-4xl mx-auto">
            <DayContentView
              week={week}
              completedDays={getCompletedDaysForWeek(selectedWeek)}
              currentDay={getCurrentDayForWeek(selectedWeek)}
              onCompleteDay={(weekNum, dayNum) => updateProgressMutation.mutate({ weekNum, dayNum })}
              onBack={() => setSelectedWeek(null)}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Program Header */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={program.cover_image_url || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80'}
              alt={program.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>
          <div className="relative p-8 pt-32">
            <h1 className="text-4xl font-bold text-white mb-2">{program.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{program.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {totalWeeks} weeks
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {totalDays} daily lessons
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        {enrollment && (
          <Card className="bg-gray-900/50 border-[#D4AF37]/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Your Progress</h3>
              <span className="text-[#D4AF37] font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-sm text-gray-400 mt-2">
              {totalCompletedDays} of {totalDays} days completed • Week {enrollment.current_week || 1} of {totalWeeks}
            </p>
          </Card>
        )}

        {/* Weekly Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-[#D4AF37]" />
            Weekly Program
          </h2>
          
          {(content?.weeks || []).map((week, index) => {
            const accessible = enrollment ? isWeekAccessible(week.week) : false;
            const completed = enrollment ? isWeekCompleted(week.week) : false;
            const isCurrent = enrollment && week.week === (enrollment.current_week || 1);
            const completedDays = getCompletedDaysForWeek(week.week);

            return (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`p-6 transition-all cursor-pointer ${
                    !enrollment
                      ? 'bg-gray-900/50 border-gray-700/50'
                      : completed 
                        ? 'bg-green-900/20 border-green-500/30 hover:border-green-500/50' 
                        : isCurrent 
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] hover:bg-[#D4AF37]/25' 
                          : accessible
                            ? 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
                            : 'bg-gray-900/30 border-gray-800/30 opacity-60'
                  }`}
                  onClick={() => accessible && setSelectedWeek(week.week)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      completed 
                        ? 'bg-green-500' 
                        : isCurrent 
                          ? 'bg-[#D4AF37]' 
                          : accessible
                            ? 'bg-gray-700'
                            : 'bg-gray-800'
                    }`}>
                      {completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : !accessible && enrollment ? (
                        <Lock className="w-5 h-5 text-gray-500" />
                      ) : (
                        <span className="text-white font-bold">{week.week}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${
                        !accessible && enrollment ? 'text-gray-500' : 'text-white'
                      }`}>
                        Week {week.week}: {week.title}
                      </h3>
                      <p className={`text-sm ${
                        !accessible && enrollment ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {week.description}
                      </p>
                      {enrollment && accessible && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                            <div 
                              className="bg-[#D4AF37] h-1.5 rounded-full transition-all"
                              style={{ width: `${(completedDays.length / 7) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{completedDays.length}/7</span>
                        </div>
                      )}
                    </div>

                    {accessible && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Enroll CTA */}
        {!enrollment && (
          <Card className="bg-gradient-to-r from-[#D4AF37]/20 to-[#B87333]/20 border-[#D4AF37]/40 p-8 text-center">
            <Heart className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Begin?</h3>
            <p className="text-gray-400 mb-6">
              Start your {totalWeeks}-week journey with daily exercises, encouragement, and actionable tasks.
            </p>
            <Button 
              size="lg"
              onClick={handleEnroll}
              disabled={enrollMutation.isPending}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B87333] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
            >
              {enrollMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enrolling...</>
              ) : (
                'Enroll Now — Free'
              )}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LifeTransitionProgram;