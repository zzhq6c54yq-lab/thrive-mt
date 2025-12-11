import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Circle, Clock, BookOpen, Heart, Target, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const weeklyModules: Record<string, Array<{ week: number; title: string; description: string }>> = {
  // Database slug: 'divorce-recovery'
  'divorce-recovery': [
    { week: 1, title: 'Processing Your Emotions', description: 'Understanding and accepting the range of emotions you may experience.' },
    { week: 2, title: 'Building Your Support System', description: 'Identifying and strengthening your support network.' },
    { week: 3, title: 'Self-Care Foundations', description: 'Establishing healthy routines and self-care practices.' },
    { week: 4, title: 'Co-Parenting Strategies', description: 'Effective communication and co-parenting techniques.' },
    { week: 5, title: 'Financial Independence', description: 'Managing finances and building financial stability.' },
    { week: 6, title: 'Rediscovering Yourself', description: 'Exploring your identity and personal goals.' },
    { week: 7, title: 'Moving Forward', description: 'Creating a vision for your future and taking action.' },
    { week: 8, title: 'Celebrating Growth', description: 'Reflecting on progress and maintaining momentum.' },
  ],
  // Database slug: 'job-loss' (Career Transition Support)
  'job-loss': [
    { week: 1, title: 'Self-Assessment', description: 'Identifying your skills, values, and career goals.' },
    { week: 2, title: 'Exploring Options', description: 'Researching industries and opportunities.' },
    { week: 3, title: 'Building Your Brand', description: 'Resume, LinkedIn, and personal branding.' },
    { week: 4, title: 'Networking Strategies', description: 'Building professional connections.' },
    { week: 5, title: 'Interview Preparation', description: 'Mastering the interview process.' },
    { week: 6, title: 'Negotiation Skills', description: 'Salary and benefits negotiation.' },
  ],
  // Database slug: 'grief-healing' (Grief & Loss Support)
  'grief-healing': [
    { week: 1, title: 'Understanding Grief', description: 'Learning about the grief process.' },
    { week: 2, title: 'Honoring Your Feelings', description: 'Allowing yourself to feel without judgment.' },
    { week: 3, title: 'Memory and Legacy', description: 'Preserving memories and creating meaning.' },
    { week: 4, title: 'Daily Coping', description: 'Managing daily life while grieving.' },
    { week: 5, title: 'Finding Support', description: 'Connecting with others who understand.' },
    { week: 6, title: 'Moving Through Grief', description: 'Finding hope and healing.' },
  ],
  // Database slug: 'new-parent'
  'new-parent': [
    { week: 1, title: 'Preparing for Change', description: 'Mental preparation for parenthood.' },
    { week: 2, title: 'Self-Care for Parents', description: 'Maintaining your wellbeing.' },
    { week: 3, title: 'Partner Communication', description: 'Strengthening your relationship.' },
    { week: 4, title: 'Building Routines', description: 'Creating sustainable daily patterns.' },
    { week: 5, title: 'Managing Stress', description: 'Coping with parenting pressures.' },
    { week: 6, title: 'Finding Your Village', description: 'Building your support community.' },
  ],
  // Database slug: 'retirement'
  'retirement': [
    { week: 1, title: 'Identity Beyond Work', description: 'Exploring who you are outside of your career.' },
    { week: 2, title: 'Creating Purpose', description: 'Finding meaningful activities.' },
    { week: 3, title: 'Social Connections', description: 'Maintaining and building relationships.' },
    { week: 4, title: 'Health & Wellness', description: 'Prioritizing physical and mental health.' },
    { week: 5, title: 'Financial Peace', description: 'Managing retirement finances confidently.' },
    { week: 6, title: 'Embracing the Journey', description: 'Living your best retirement life.' },
  ],
  // Database slug: 'chronic-illness'
  'chronic-illness': [
    { week: 1, title: 'Acceptance & Adjustment', description: 'Coming to terms with your diagnosis.' },
    { week: 2, title: 'Managing Energy', description: 'Pacing yourself and setting boundaries.' },
    { week: 3, title: 'Communication', description: 'Talking to loved ones and healthcare providers.' },
    { week: 4, title: 'Mental Wellness', description: 'Addressing anxiety and depression.' },
    { week: 5, title: 'Building Support', description: 'Finding community and resources.' },
    { week: 6, title: 'Living Fully', description: 'Finding joy and purpose.' },
  ],
};

const LifeTransitionProgram = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if demo mode
  const isDemoMode = location.state?.demoUser === true;

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

  // Enrollment mutation
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
          notes: {},
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Enrolled Successfully! 🎉",
        description: `Your ${program?.title} journey begins now.`,
      });
      queryClient.invalidateQueries({ queryKey: ['transition-enrollment', slug] });
      queryClient.invalidateQueries({ queryKey: ['transition-enrollments'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEnroll = () => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "Create an account to enroll in programs and track your progress.",
      });
      return;
    }
    if (!user) {
      navigate('/app/auth', { state: { returnTo: `/app/life-transitions/${slug}` } });
      return;
    }
    enrollMutation.mutate();
  };

  const modules = weeklyModules[slug as keyof typeof weeklyModules] || [];
  const currentWeek = enrollment?.current_week || 1;
  const progressPercent = (currentWeek / modules.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-white">Loading program...</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-[#000000] p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-white mb-4">Program not found</h1>
          <Button onClick={() => navigate('/app/life-transitions')}>
            Browse Programs
          </Button>
        </div>
      </div>
    );
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
                {program.duration_weeks} weeks
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {modules.length} modules
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
              Week {currentWeek} of {modules.length}
            </p>
          </Card>
        )}

        {/* Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-[#D4AF37]" />
            Weekly Modules
          </h2>
          
          {modules.map((module, index) => {
            const isCompleted = enrollment && module.week < currentWeek;
            const isCurrent = enrollment && module.week === currentWeek;
            const isLocked = enrollment && module.week > currentWeek;
            
            return (
              <motion.div
                key={module.week}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-6 transition-all ${
                  isCurrent 
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37]' 
                    : isCompleted 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-gray-900/50 border-gray-700/50'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500' 
                        : isCurrent 
                          ? 'bg-[#D4AF37]' 
                          : 'bg-gray-700'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold">{module.week}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${
                        isLocked ? 'text-gray-500' : 'text-white'
                      }`}>
                        {module.title}
                      </h3>
                      <p className={`text-sm ${
                        isLocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {module.description}
                      </p>
                      
                      {isCurrent && (
                        <Button 
                          size="sm" 
                          className="mt-3 bg-[#D4AF37] hover:bg-[#B87333] text-black"
                        >
                          Continue Module
                        </Button>
                      )}
                    </div>
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
              Start your {program.title.toLowerCase()} journey today.
            </p>
            <Button 
              size="lg"
              onClick={handleEnroll}
              disabled={enrollMutation.isPending}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B87333] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
            >
              {enrollMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enrolling...
                </>
              ) : (
                'Enroll Now'
              )}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LifeTransitionProgram;
