import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SectionAnalytics {
  user_id: string;
  section_id: string;
  total_views: number;
  total_time_seconds: number;
  interaction_count: number;
  engagement_score: number;
}

async function aggregateSectionAnalytics(supabaseClient: any, userId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const { data: interactions } = await supabaseClient
    .from('dashboard_section_interactions')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', startOfDay.toISOString())
    .lte('timestamp', endOfDay.toISOString());
  
  if (!interactions || interactions.length === 0) return;
  
  // Group by section
  const sectionMap = new Map<string, SectionAnalytics>();
  
  interactions.forEach((interaction: any) => {
    if (!sectionMap.has(interaction.section_id)) {
      sectionMap.set(interaction.section_id, {
        user_id: userId,
        section_id: interaction.section_id,
        total_views: 0,
        total_time_seconds: 0,
        interaction_count: 0,
        engagement_score: 0
      });
    }
    
    const analytics = sectionMap.get(interaction.section_id)!;
    
    if (interaction.interaction_type === 'view') {
      analytics.total_views++;
    }
    
    if (interaction.duration_seconds) {
      analytics.total_time_seconds += interaction.duration_seconds;
    }
    
    analytics.interaction_count++;
  });
  
  // Calculate engagement scores (0-100)
  sectionMap.forEach(analytics => {
    const viewScore = Math.min(analytics.total_views * 10, 30);
    const timeScore = Math.min(analytics.total_time_seconds / 60, 40);
    const interactionScore = Math.min(analytics.interaction_count * 2, 30);
    
    analytics.engagement_score = viewScore + timeScore + interactionScore;
  });
  
  // Upsert analytics
  const analyticsArray = Array.from(sectionMap.values());
  
  await supabaseClient
    .from('dashboard_section_analytics')
    .upsert(
      analyticsArray.map(a => ({
        ...a,
        date: date.toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      })),
      { onConflict: 'user_id,section_id,date' }
    );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Run for all users for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data: users } = await supabaseClient
      .from('profiles')
      .select('id');
    
    if (users) {
      for (const user of users) {
        await aggregateSectionAnalytics(supabaseClient, user.id, yesterday);
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, processed: users?.length || 0 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
