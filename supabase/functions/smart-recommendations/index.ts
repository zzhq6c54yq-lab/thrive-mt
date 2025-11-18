import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Recommendation {
  toolName: string;
  toolPath: string;
  reasoning: string;
  urgency: 'low' | 'medium' | 'high';
  estimatedTime: string;
  expectedBenefit: string;
  confidence: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Fetch user profile and goals
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('goals, primary_portal, time_preference_minutes')
      .eq('id', user.id)
      .single();

    // Fetch mood trends (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: moodData } = await supabaseClient
      .from('daily_check_ins')
      .select('mood_score, created_at')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: false });

    // Fetch recent activities
    const { data: activities } = await supabaseClient
      .from('user_activities')
      .select('activity_name, activity_type, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(50);

    // Fetch latest assessment scores
    const { data: assessments } = await supabaseClient
      .from('wellness_metrics')
      .select('metric_type, metric_value, recorded_at')
      .eq('user_id', user.id)
      .order('recorded_at', { ascending: false })
      .limit(10);

    // Analyze data and generate recommendations
    const recommendations: Recommendation[] = [];

    // Calculate mood trend
    const recentMoods = moodData?.slice(0, 7) || [];
    const avgRecentMood = recentMoods.length > 0
      ? recentMoods.reduce((sum, m) => sum + m.mood_score, 0) / recentMoods.length
      : 3;

    // Recommend based on low mood
    if (avgRecentMood < 2.5) {
      recommendations.push({
        toolName: 'Meditation Studio',
        toolPath: '/meditation',
        reasoning: `Your mood has been lower this week (avg ${avgRecentMood.toFixed(1)}/5). Meditation can help regulate emotions and reduce stress.`,
        urgency: 'high',
        estimatedTime: '10 minutes',
        expectedBenefit: 'Improve mood by 20-30%',
        confidence: 85
      });

      recommendations.push({
        toolName: 'Between-Session Companion',
        toolPath: '/mini-session',
        reasoning: 'Your mood scores suggest you might benefit from some guided reflection with our AI companion.',
        urgency: 'high',
        estimatedTime: '15 minutes',
        expectedBenefit: 'Process emotions, gain perspective',
        confidence: 80
      });
    }

    // Check for activity patterns
    const meditationCount = activities?.filter(a => 
      a.activity_name.toLowerCase().includes('meditat')
    ).length || 0;

    const journalingCount = activities?.filter(a => 
      a.activity_name.toLowerCase().includes('journal')
    ).length || 0;

    // Recommend meditation if mood improved on meditation days
    if (meditationCount > 0 && avgRecentMood > 3) {
      recommendations.push({
        toolName: 'Meditation Studio',
        toolPath: '/meditation',
        reasoning: 'Your mood tends to be better on days you meditate. Keep this beneficial practice going!',
        urgency: 'medium',
        estimatedTime: '10-20 minutes',
        expectedBenefit: 'Maintain emotional balance',
        confidence: 90
      });
    }

    // Recommend journaling if underutilized
    if (journalingCount < 3) {
      recommendations.push({
        toolName: 'Journaling',
        toolPath: '/journaling',
        reasoning: 'Regular journaling helps process emotions and gain clarity. Try it a few times this week.',
        urgency: 'low',
        estimatedTime: '10 minutes',
        expectedBenefit: 'Better emotional processing, reduced stress',
        confidence: 75
      });
    }

    // Check assessment scores for high stress/anxiety
    const stressScores = assessments?.filter(a => a.metric_type === 'stress') || [];
    const anxietyScores = assessments?.filter(a => a.metric_type === 'anxiety') || [];

    if (stressScores.length > 0 && stressScores[0].metric_value > 7) {
      recommendations.push({
        toolName: 'Breathing Exercises',
        toolPath: '/breathing',
        reasoning: `Your latest stress score is ${stressScores[0].metric_value}/10. Breathing exercises can provide immediate relief.`,
        urgency: 'high',
        estimatedTime: '3-5 minutes',
        expectedBenefit: 'Quick stress reduction',
        confidence: 95
      });
    }

    if (anxietyScores.length > 0 && anxietyScores[0].metric_value > 7) {
      recommendations.push({
        toolName: 'Binaural Beats',
        toolPath: '/binaural-beats',
        reasoning: `Your anxiety score is elevated (${anxietyScores[0].metric_value}/10). Sound therapy can help calm your nervous system.`,
        urgency: 'medium',
        estimatedTime: '20 minutes',
        expectedBenefit: 'Reduce anxiety, promote relaxation',
        confidence: 80
      });
    }

    // Goal-based recommendations
    if (profile?.goals?.includes('stress_management')) {
      if (!recommendations.some(r => r.toolName === 'Meditation Studio')) {
        recommendations.push({
          toolName: 'Meditation Studio',
          toolPath: '/meditation',
          reasoning: 'Based on your goal of stress management, meditation is one of the most effective tools.',
          urgency: 'medium',
          estimatedTime: '15 minutes',
          expectedBenefit: 'Long-term stress reduction',
          confidence: 85
        });
      }
    }

    // Default recommendation if no specific patterns found
    if (recommendations.length === 0) {
      recommendations.push({
        toolName: 'Daily Challenges',
        toolPath: '/wellness-challenges',
        reasoning: 'Start with daily challenges to build consistency and explore different wellness tools.',
        urgency: 'low',
        estimatedTime: '5-10 minutes',
        expectedBenefit: 'Build healthy habits, earn rewards',
        confidence: 70
      });
    }

    // Sort by urgency and confidence, return top 3
    const sortedRecommendations = recommendations
      .sort((a, b) => {
        const urgencyWeight = { high: 3, medium: 2, low: 1 };
        const scoreA = urgencyWeight[a.urgency] * a.confidence;
        const scoreB = urgencyWeight[b.urgency] * b.confidence;
        return scoreB - scoreA;
      })
      .slice(0, 3);

    return new Response(
      JSON.stringify({ recommendations: sortedRecommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
