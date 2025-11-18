import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EngagementData {
  section_id: string;
  avg_engagement_score: number;
  total_interactions: number;
}

async function optimizeDashboardLayout(supabaseClient: any, userId: string) {
  // Get layout preferences
  const { data: prefs } = await supabaseClient
    .from('dashboard_layout_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  // Don't optimize if user locked layout or disabled learning
  if (!prefs || prefs.is_locked || !prefs.learning_enabled) {
    return null;
  }
  
  // Don't optimize if user manually customized recently (within 7 days)
  if (prefs.is_custom) {
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date(prefs.updated_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceUpdate < 7) {
      return null; // Respect recent manual changes
    }
  }
  
  // Get engagement data from last 14 days
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  
  const { data: analytics } = await supabaseClient
    .from('dashboard_section_analytics')
    .select('*')
    .eq('user_id', userId)
    .gte('date', fourteenDaysAgo.toISOString().split('T')[0]);
  
  if (!analytics || analytics.length === 0) {
    return null; // Not enough data
  }
  
  // Calculate average engagement per section
  const sectionEngagement = new Map<string, EngagementData>();
  
  analytics.forEach((record: any) => {
    if (!sectionEngagement.has(record.section_id)) {
      sectionEngagement.set(record.section_id, {
        section_id: record.section_id,
        avg_engagement_score: 0,
        total_interactions: 0
      });
    }
    
    const data = sectionEngagement.get(record.section_id)!;
    data.avg_engagement_score += record.engagement_score || 0;
    data.total_interactions += record.interaction_count || 0;
  });
  
  // Calculate averages
  sectionEngagement.forEach(data => {
    data.avg_engagement_score = data.avg_engagement_score / analytics.length;
  });
  
  // Sort sections by engagement (highest first)
  const sortedSections = Array.from(sectionEngagement.values())
    .sort((a, b) => b.avg_engagement_score - a.avg_engagement_score)
    .map(d => d.section_id);
  
  // Only update if order actually changes
  const currentOrder = prefs.section_order as string[];
  const orderChanged = JSON.stringify(currentOrder) !== JSON.stringify(sortedSections);
  
  if (!orderChanged) {
    return null;
  }
  
  // Update layout
  await supabaseClient
    .from('dashboard_layout_preferences')
    .update({
      section_order: sortedSections,
      last_auto_adjustment: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);
  
  return {
    userId,
    oldOrder: currentOrder,
    newOrder: sortedSections,
    engagementData: Array.from(sectionEngagement.values())
  };
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
    
    // Run for all eligible users
    const { data: users } = await supabaseClient
      .from('dashboard_layout_preferences')
      .select('user_id')
      .eq('learning_enabled', true)
      .eq('is_locked', false);
    
    const results = [];
    
    if (users) {
      for (const user of users) {
        const result = await optimizeDashboardLayout(supabaseClient, user.user_id);
        if (result) {
          results.push(result);
        }
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        optimized: results.length,
        results 
      }),
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
