import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  call_id: z.string().uuid("Invalid call ID format"),
  end_time: z.string().optional(),
  status: z.enum(['ended', 'missed', 'declined', 'failed']).optional().default('ended'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate request body
    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(JSON.stringify({
        error: 'Invalid request',
        details: parseResult.error.errors.map(e => e.message)
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { call_id, end_time, status } = parseResult.data;

    // Check if call exists and user is a participant
    const { data: call, error: callError } = await supabase
      .from('phone_calls')
      .select('*')
      .eq('id', call_id)
      .single();

    if (callError || !call) {
      // Try video_sessions table as fallback
      const { data: videoSession, error: videoError } = await supabase
        .from('video_sessions')
        .select('*')
        .eq('id', call_id)
        .single();

      if (videoError || !videoSession) {
        return new Response(JSON.stringify({ error: 'Call not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Verify user is a participant in video session
      if (videoSession.therapist_id !== user.id && videoSession.client_id !== user.id) {
        return new Response(JSON.stringify({ error: 'Not a call participant' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Update video session
      const endTimeValue = end_time ? new Date(end_time).toISOString() : new Date().toISOString();
      const startTime = videoSession.started_at ? new Date(videoSession.started_at) : new Date();
      const endTimeDate = new Date(endTimeValue);
      const durationSeconds = Math.floor((endTimeDate.getTime() - startTime.getTime()) / 1000);

      const { error: updateError } = await supabase
        .from('video_sessions')
        .update({
          ended_at: endTimeValue,
          status: status,
          duration_seconds: durationSeconds > 0 ? durationSeconds : 0
        })
        .eq('id', call_id);

      if (updateError) throw updateError;

      console.log(`[end-call] Video session ${call_id} ended. Duration: ${durationSeconds}s`);

      return new Response(JSON.stringify({
        success: true,
        type: 'video_session',
        duration_seconds: durationSeconds
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verify user is a participant in phone call
    if (call.caller_id !== user.id && call.callee_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not a call participant' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Update phone call
    const endTimeValue = end_time ? new Date(end_time).toISOString() : new Date().toISOString();
    const startTime = call.started_at ? new Date(call.started_at) : new Date();
    const endTimeDate = new Date(endTimeValue);
    const durationSeconds = Math.floor((endTimeDate.getTime() - startTime.getTime()) / 1000);

    const { error: updateError } = await supabase
      .from('phone_calls')
      .update({
        ended_at: endTimeValue,
        status: status,
        duration_seconds: durationSeconds > 0 ? durationSeconds : 0
      })
      .eq('id', call_id);

    if (updateError) throw updateError;

    console.log(`[end-call] Phone call ${call_id} ended. Duration: ${durationSeconds}s`);

    return new Response(JSON.stringify({
      success: true,
      type: 'phone_call',
      duration_seconds: durationSeconds
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[end-call] Error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
