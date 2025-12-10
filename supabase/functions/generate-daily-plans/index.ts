import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Zod schema for optional input validation
const RequestSchema = z.object({
  userId: z.string().uuid().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)").optional()
}).optional();

interface Profile {
  id: string;
  primary_portal: string | null;
  goals: string[] | null;
  time_preference_minutes: number;
}

interface MoodData {
  created_at: string;
  mood_score: number;
  tags: string[] | null;
}

interface ActivityLog {
  activity_name: string;
  activity_type: string;
  completed_at: string;
  duration_minutes: number | null;
}

interface Activity {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  estimated_minutes: number;
  portal_tags: string[] | null;
  goal_tags: string[] | null;
  icon_name: string | null;
  route_path: string | null;
  points_reward: number | null;
}

interface AIGeneratedPlan {
  activities: Array<{
    activity_id: string;
    order: number;
    time_of_day: string;
    reasoning: string;
  }>;
  plan_summary: string;
  adaptive_note: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check - validate service role key or admin access
    const authHeader = req.headers.get('Authorization');
    const cronSecret = req.headers.get('x-cron-secret');
    
    // Allow if called with service role key (for cron jobs) or with valid cron secret
    const expectedCronSecret = Deno.env.get('CRON_SECRET');
    const isAuthorizedCron = cronSecret && expectedCronSecret && cronSecret === expectedCronSecret;
    
    // Also allow if called with service role key in Authorization header
    const isServiceRole = authHeader?.includes(SUPABASE_SERVICE_ROLE_KEY);
    
    // For user-initiated calls, verify the user is an admin
    let isAdmin = false;
    if (authHeader && !isServiceRole) {
      const token = authHeader.replace('Bearer ', '');
      const supabaseAuth = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!);
      const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);
      
      if (!authError && user) {
        // Check if user has admin role
        const { data: adminRole } = await createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        isAdmin = !!adminRole;
      }
    }
    
    if (!isAuthorizedCron && !isServiceRole && !isAdmin) {
      console.error('Unauthorized access attempt to generate-daily-plans');
      return new Response(
        JSON.stringify({ error: 'Unauthorized. This endpoint requires admin access or service role key.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const startTime = Date.now();

    console.log('Starting daily plan generation...');

    // Get all active users (onboarding completed, checked in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activeUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id, primary_portal, goals, time_preference_minutes')
      .eq('onboarding_completed', true)
      .gte('updated_at', thirtyDaysAgo.toISOString())
      .not('id', 'is', null);

    if (usersError) throw usersError;

    console.log(`Found ${activeUsers?.length || 0} active users`);

    const results = {
      total: activeUsers?.length || 0,
      success: 0,
      failed: 0,
      errors: [] as Array<{ userId: string; error: string }>,
    };

    // Process in batches of 10 to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < (activeUsers?.length || 0); i += batchSize) {
      const batch = activeUsers!.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (user) => {
          try {
            await generatePlanForUser(supabase, user);
            results.success++;
            console.log(`✓ Generated plan for user ${user.id}`);
          } catch (error) {
            results.failed++;
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            results.errors.push({ userId: user.id, error: errorMsg });
            console.error(`✗ Failed for user ${user.id}:`, errorMsg);
          }
        })
      );

      // Rate limiting: wait 2 seconds between batches
      if (i + batchSize < (activeUsers?.length || 0)) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    const duration = Date.now() - startTime;
    const avgTimePerUser = results.total > 0 ? Math.round(duration / results.total) : 0;

    // Store analytics
    await supabase.from('plan_generation_analytics').insert({
      total_users: results.total,
      successful_generations: results.success,
      failed_generations: results.failed,
      avg_generation_time_ms: avgTimePerUser,
      errors: results.errors.length > 0 ? results.errors : null,
    });

    console.log('Generation complete:', results);

    return new Response(
      JSON.stringify({
        success: true,
        results,
        duration_ms: duration,
        avg_time_per_user_ms: avgTimePerUser,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Fatal error in generate-daily-plans:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function generatePlanForUser(supabase: any, user: Profile) {
  // 1. Fetch user's data in parallel
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [moodResult, activityResult, streakResult, availableActivitiesResult] = await Promise.all([
    supabase
      .from('daily_check_ins')
      .select('created_at, mood_score, tags')
      .eq('user_id', user.id)
      .gte('created_at', fourteenDaysAgo.toISOString())
      .order('created_at', { ascending: false }),
    supabase
      .from('user_activities')
      .select('activity_name, activity_type, completed_at, duration_minutes')
      .eq('user_id', user.id)
      .gte('completed_at', thirtyDaysAgo.toISOString())
      .order('completed_at', { ascending: false }),
    supabase
      .from('user_streaks')
      .select('current_streak')
      .eq('user_id', user.id)
      .eq('streak_type', 'check_in')
      .maybeSingle(),
    supabase
      .from('activities_catalog')
      .select('*')
      .eq('is_featured', true)
      .order('points_reward', { ascending: false }),
  ]);

  const moodData: MoodData[] = moodResult.data || [];
  const activityData: ActivityLog[] = activityResult.data || [];
  const currentStreak = streakResult.data?.current_streak || 0;
  const availableActivities: Activity[] = availableActivitiesResult.data || [];

  // 2. Analyze data
  const analysis = analyzeMoodTrends(moodData);
  const activityAnalysis = analyzeActivityCompletion(activityData, moodData);

  // 3. Filter activities based on user's portal and goals
  const relevantActivities = availableActivities.filter((activity) => {
    const matchesPortal =
      !activity.portal_tags ||
      activity.portal_tags.includes('all') ||
      (user.primary_portal && activity.portal_tags.includes(user.primary_portal));

    const matchesGoals =
      !activity.goal_tags ||
      !user.goals ||
      user.goals.some((goal) => activity.goal_tags?.includes(goal));

    return matchesPortal && matchesGoals;
  });

  // 4. Build AI prompt
  const prompt = buildPrompt(user, analysis, activityAnalysis, currentStreak, relevantActivities);

  // 5. Call Lovable AI Gateway
  if (!LOVABLE_API_KEY) {
    throw new Error('LOVABLE_API_KEY not configured');
  }

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content:
            'You are a mental health AI assistant creating personalized daily wellness plans. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: 500,
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      console.error('Rate limit exceeded for user:', user.id);
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (response.status === 402) {
      console.error('Payment required for AI generation');
      throw new Error('AI credits exhausted. Please add credits to continue.');
    }
    const errorText = await response.text();
    throw new Error(`Lovable AI Gateway error: ${response.status} ${errorText}`);
  }

  const aiResponse = await response.json();
  const plan: AIGeneratedPlan = JSON.parse(aiResponse.choices[0].message.content);

  // 6. Validate plan
  if (!plan.activities || plan.activities.length === 0) {
    throw new Error('AI generated empty plan');
  }

  // Verify all activity IDs exist
  const validActivityIds = new Set(relevantActivities.map((a) => a.id));
  const allValid = plan.activities.every((a) => validActivityIds.has(a.activity_id));
  if (!allValid) {
    throw new Error('AI returned invalid activity IDs');
  }

  // 7. Store plan in database
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const planDate = tomorrow.toISOString().split('T')[0];

  await supabase.from('daily_plans').upsert({
    user_id: user.id,
    plan_date: planDate,
    activities: plan.activities,
    generated_at: new Date().toISOString(),
    metadata: {
      plan_summary: plan.plan_summary,
      adaptive_note: plan.adaptive_note,
      analysis_snapshot: {
        mood_trend: analysis.trend,
        avg_mood: analysis.avgMood,
        completion_rate: activityAnalysis.completionRate,
        current_streak: currentStreak,
      },
    },
  });
}

function analyzeMoodTrends(moodData: MoodData[]) {
  if (moodData.length === 0) {
    return {
      avgMood: 3,
      trend: 'stable',
      lowDays: [],
      highDays: [],
    };
  }

  const avgMood = moodData.reduce((sum, m) => sum + m.mood_score, 0) / moodData.length;

  // Split into recent week vs previous week
  const recentWeek = moodData.slice(0, 7);
  const previousWeek = moodData.slice(7, 14);

  const recentAvg = recentWeek.length > 0
    ? recentWeek.reduce((sum, m) => sum + m.mood_score, 0) / recentWeek.length
    : avgMood;

  const previousAvg = previousWeek.length > 0
    ? previousWeek.reduce((sum, m) => sum + m.mood_score, 0) / previousWeek.length
    : avgMood;

  let trend = 'stable';
  if (recentAvg > previousAvg + 0.5) trend = 'improving';
  if (recentAvg < previousAvg - 0.5) trend = 'declining';

  const lowDays = moodData.filter((m) => m.mood_score <= 2).map((m) => m.created_at.split('T')[0]);
  const highDays = moodData.filter((m) => m.mood_score >= 4).map((m) => m.created_at.split('T')[0]);

  return {
    avgMood: Math.round(avgMood * 10) / 10,
    trend,
    lowDays,
    highDays,
  };
}

function analyzeActivityCompletion(activityData: ActivityLog[], moodData: MoodData[]) {
  if (activityData.length === 0) {
    return {
      completionRate: 0,
      topActivities: [],
      moodBoosters: [],
    };
  }

  // Count activity types
  const activityCounts: Record<string, number> = {};
  activityData.forEach((a) => {
    activityCounts[a.activity_name] = (activityCounts[a.activity_name] || 0) + 1;
  });

  const topActivities = Object.entries(activityCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name]) => name);

  // Simple completion rate (% of days with activities)
  const uniqueDays = new Set(activityData.map((a) => a.completed_at?.split('T')[0]));
  const completionRate = Math.round((uniqueDays.size / 30) * 100);

  // Identify mood boosters (activities correlated with higher mood)
  const moodBoosters: string[] = [];
  const activityDays = new Map<string, string[]>();
  activityData.forEach((a) => {
    const day = a.completed_at?.split('T')[0];
    if (day) {
      if (!activityDays.has(a.activity_name)) {
        activityDays.set(a.activity_name, []);
      }
      activityDays.get(a.activity_name)!.push(day);
    }
  });

  activityDays.forEach((days, activityName) => {
    const moodsOnThoseDays = moodData.filter((m) => days.includes(m.created_at.split('T')[0]));
    if (moodsOnThoseDays.length > 0) {
      const avgMoodOnActivityDays =
        moodsOnThoseDays.reduce((sum, m) => sum + m.mood_score, 0) / moodsOnThoseDays.length;
      if (avgMoodOnActivityDays > 3.5) {
        moodBoosters.push(activityName);
      }
    }
  });

  return {
    completionRate,
    topActivities,
    moodBoosters,
  };
}

function buildPrompt(
  user: Profile,
  moodAnalysis: any,
  activityAnalysis: any,
  currentStreak: number,
  availableActivities: Activity[]
) {
  return `You are a mental health AI assistant helping to create personalized daily wellness plans.

User Profile:
- Primary portal: ${user.primary_portal || 'general'}
- Goals: ${user.goals?.join(', ') || 'general wellness'}
- Time available: ${user.time_preference_minutes} minutes/day

Recent Mood Data (last 14 days):
- Average mood: ${moodAnalysis.avgMood}/5
- Trend: ${moodAnalysis.trend}
- Days with low mood: ${moodAnalysis.lowDays.length}
- Days with high mood: ${moodAnalysis.highDays.length}

Activity Completion Analysis (last 30 days):
- Most completed: ${activityAnalysis.topActivities.join(', ') || 'none yet'}
- Completion rate: ${activityAnalysis.completionRate}%
- Activities linked to mood improvements: ${activityAnalysis.moodBoosters.join(', ') || 'analyzing...'}
- Current check-in streak: ${currentStreak} days

Available Activities:
${JSON.stringify(
  availableActivities.map((a) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    minutes: a.estimated_minutes,
    description: a.description,
  })),
  null,
  2
)}

Task: Generate an optimized daily plan with 1-3 activities for tomorrow.

Requirements:
1. Total time must be ≤ ${user.time_preference_minutes} minutes
2. Prioritize activities that:
   - Match user's goals
   - Have shown mood improvement correlation
   - User has completed before (build on success)
   - Are appropriate for user's portal/context
3. Balance variety with consistency
4. If mood is declining, prioritize mood-boosting activities
5. If completion rate is low, suggest shorter/easier activities
6. Consider time of day recommendations

Return JSON only with this exact structure:
{
  "activities": [
    {
      "activity_id": "uuid-from-available-activities",
      "order": 1,
      "time_of_day": "morning",
      "reasoning": "Brief explanation why this activity for this user"
    }
  ],
  "plan_summary": "One sentence explaining the overall approach",
  "adaptive_note": "Encouraging observation about user's progress or a gentle suggestion (under 25 words)"
}`;
}
