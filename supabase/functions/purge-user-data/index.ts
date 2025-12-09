import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RequestSchema = z.object({
  confirmation: z.literal('DELETE_ALL_MY_DATA'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: 'Confirmation required. Send { "confirmation": "DELETE_ALL_MY_DATA" }' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const userId = user.id;
    console.log('Starting data purge for user:', userId);

    await supabase.from('auth_user_audit').insert({ user_id: userId, action: 'gdpr_deletion_request', details: { requested_at: new Date().toISOString() }, operator: 'user_self_service' });

    const deletionResults = await Promise.allSettled([
      supabase.from('profiles').update({ deleted_at: new Date().toISOString() }).eq('id', userId),
      supabase.from('journal_entries').update({ deleted_at: new Date().toISOString() }).eq('user_id', userId),
      supabase.from('mood_entries').delete().eq('user_id', userId),
      supabase.from('daily_check_ins').delete().eq('user_id', userId),
      supabase.from('henry_conversations').delete().eq('user_id', userId),
      supabase.from('breathing_sessions').delete().eq('user_id', userId),
      supabase.from('binaural_sessions').delete().eq('user_id', userId),
      supabase.from('gratitude_entries').delete().eq('user_id', userId),
    ]);

    const successCount = deletionResults.filter(r => r.status === 'fulfilled').length;
    const failureCount = deletionResults.filter(r => r.status === 'rejected').length;

    await supabase.from('auth_user_audit').insert({ user_id: userId, action: 'gdpr_deletion_completed', details: { completed_at: new Date().toISOString(), success_count: successCount, failure_count: failureCount }, operator: 'system' });

    return new Response(JSON.stringify({ success: true, message: 'Your data has been scheduled for deletion.', deletedTables: successCount, failedTables: failureCount }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error in purge-user-data:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
