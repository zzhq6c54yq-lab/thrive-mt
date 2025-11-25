import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { userId } = await req.json();

    console.log('[GenerateInsights] Analyzing data for user:', userId);

    // Get user's mood check-ins from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: checkIns } = await supabaseClient
      .from('daily_check_ins')
      .select('mood_score, tags, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Get user activities
    const { data: activities } = await supabaseClient
      .from('user_activities')
      .select('activity_type, duration_minutes, completed_at')
      .eq('user_id', userId)
      .gte('completed_at', thirtyDaysAgo.toISOString());

    // Generate insights
    const insights = [];

    // Mood trend insight
    if (checkIns && checkIns.length > 0) {
      const avgMood = checkIns.reduce((sum, c) => sum + c.mood_score, 0) / checkIns.length;
      const recentMood = checkIns.slice(-7).reduce((sum, c) => sum + c.mood_score, 0) / Math.min(7, checkIns.length);
      const change = ((recentMood - avgMood) / avgMood) * 100;

      if (Math.abs(change) > 10) {
        insights.push({
          user_id: userId,
          insight_type: 'mood_trend',
          insight_text: change > 0 
            ? `Your mood has improved ${Math.round(change)}% in the last week. Keep up the great work!`
            : `Your mood has dipped ${Math.round(Math.abs(change))}% recently. Let's focus on self-care activities.`,
          confidence_score: 0.85,
          supporting_data: { avgMood, recentMood, change }
        });
      }
    }

    // Activity correlation insight
    if (activities && activities.length > 5 && checkIns && checkIns.length > 0) {
      const activityDays = new Set(activities.map(a => new Date(a.completed_at).toDateString()));
      const moodByActivity = checkIns.filter(c => 
        activityDays.has(new Date(c.created_at).toDateString())
      );

      if (moodByActivity.length > 0) {
        const avgMoodWithActivity = moodByActivity.reduce((sum, c) => sum + c.mood_score, 0) / moodByActivity.length;
        const avgMoodOverall = checkIns.reduce((sum, c) => sum + c.mood_score, 0) / checkIns.length;

        if (avgMoodWithActivity > avgMoodOverall + 0.5) {
          insights.push({
            user_id: userId,
            insight_type: 'activity_correlation',
            insight_text: `Your mood tends to be higher on days you complete wellness activities. Try to maintain consistency!`,
            confidence_score: 0.75,
            supporting_data: { avgMoodWithActivity, avgMoodOverall }
          });
        }
      }
    }

    // Consistency insight
    if (checkIns && checkIns.length >= 7) {
      const last7Days = checkIns.slice(-7);
      insights.push({
        user_id: userId,
        insight_type: 'consistency',
        insight_text: `You've checked in ${last7Days.length} times this week. This level of self-awareness is powerful - you're building something real.`,
        confidence_score: 1.0,
        supporting_data: { checkInCount: last7Days.length }
      });
    }

    // Save insights
    if (insights.length > 0) {
      const { error } = await supabaseClient
        .from('user_insights')
        .insert(insights);

      if (error) throw error;
    }

    console.log('[GenerateInsights] Generated', insights.length, 'insights');

    return new Response(
      JSON.stringify({
        success: true,
        insightsGenerated: insights.length,
        insights: insights.map(i => i.insight_text)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[GenerateInsights] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});