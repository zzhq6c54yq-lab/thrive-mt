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

    const { userId, triggerSource, severity, triggerData } = await req.json();

    console.log('[CrisisEscalation] Processing crisis event:', { userId, triggerSource, severity });

    // Create crisis escalation record
    const { data: escalation, error: escalationError } = await supabaseClient
      .from('crisis_escalations_v2')
      .insert({
        user_id: userId,
        trigger_source: triggerSource,
        severity,
        trigger_data: triggerData,
        status: 'open'
      })
      .select()
      .single();

    if (escalationError) {
      console.error('[CrisisEscalation] Failed to create escalation:', escalationError);
      throw escalationError;
    }

    // Log crisis event
    await supabaseClient
      .from('crisis_events')
      .insert({
        user_id: userId,
        event_type: triggerSource,
        source: 'automated'
      });

    // Send notification to admins/crisis team
    const { data: admins } = await supabaseClient
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (admins && admins.length > 0) {
      const notifications = admins.map(admin => ({
        recipient_id: admin.user_id,
        sender_type: 'system',
        notification_type: 'crisis_alert',
        title: `Crisis Alert: ${severity.toUpperCase()}`,
        message: `User needs immediate support. Source: ${triggerSource}`,
        link: `/admin/crisis-escalations/${escalation.id}`
      }));

      await supabaseClient
        .from('cross_dashboard_notifications')
        .insert(notifications);
    }

    console.log('[CrisisEscalation] Crisis escalation created:', escalation.id);

    return new Response(
      JSON.stringify({
        success: true,
        escalationId: escalation.id,
        message: 'Crisis escalation created and team notified'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[CrisisEscalation] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});