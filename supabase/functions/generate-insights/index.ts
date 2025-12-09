import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: 'Invalid request', details: parseResult.error.errors.map(e => e.message) }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { userId } = parseResult.data;
    console.log('[GenerateInsights] Analyzing data for user:', userId);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: checkIns } = await supabaseClient.from('daily_check_ins').select('mood_score, tags, created_at').eq('user_id', userId).gte('created_at', thirtyDaysAgo.toISOString());
    const { data: activities } = await supabaseClient.from('user_activities').select('activity_type, duration_minutes, completed_at').eq('user_id', userId).gte('completed_at', thirtyDaysAgo.toISOString());

    const insights = [];

    if (checkIns && checkIns.length > 0) {
      const avgMood = checkIns.reduce((sum, c) => sum + c.mood_score, 0) / checkIns.length;
      const recentMood = checkIns.slice(-7).reduce((sum, c) => sum + c.mood_score, 0) / Math.min(7, checkIns.length);
      const change = ((recentMood - avgMood) / avgMood) * 100;

      if (Math.abs(change) > 10) {
        insights.push({
          user_id: userId,
          insight_type: 'mood_trend',
          insight_text: change > 0 ? `Your mood has improved ${Math.round(change)}% in the last week. Keep up the great work!` : `Your mood has dipped ${Math.round(Math.abs(change))}% recently. Let's focus on self-care activities.`,
          confidence_score: 0.85,
          supporting_data: { avgMood, recentMood, change }
        });
      }
    }

    if (checkIns && checkIns.length >= 7) {
      insights.push({
        user_id: userId,
        insight_type: 'consistency',
        insight_text: `You've checked in ${checkIns.slice(-7).length} times this week. This level of self-awareness is powerful - you're building something real.`,
        confidence_score: 1.0,
        supporting_data: { checkInCount: checkIns.slice(-7).length }
      });
    }

    if (insights.length > 0) {
      await supabaseClient.from('user_insights').insert(insights);
    }

    console.log('[GenerateInsights] Generated', insights.length, 'insights');

    return new Response(JSON.stringify({ success: true, insightsGenerated: insights.length, insights: insights.map(i => i.insight_text) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
  } catch (error) {
    console.error('[GenerateInsights] Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
  }
});
