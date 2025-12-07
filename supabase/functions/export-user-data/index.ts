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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = user.id;

    console.log('Exporting data for user:', userId);

    // Collect all user data from various tables
    const [
      profileResult,
      journalEntriesResult,
      moodEntriesResult,
      checkInsResult,
      conversationsResult,
      messagesResult,
      assessmentResultsResult,
      homeworkTasksResult,
      breathingSessionsResult,
      gratitudeEntriesResult,
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('journal_entries').select('*').eq('user_id', userId).is('deleted_at', null),
      supabase.from('mood_entries').select('*').eq('user_id', userId),
      supabase.from('daily_check_ins').select('*').eq('user_id', userId),
      supabase.from('henry_conversations').select('*').eq('user_id', userId),
      supabase.from('henry_messages').select('*').eq('conversation_id', userId),
      supabase.from('assessment_results').select('*').eq('user_id', userId),
      supabase.from('homework_tasks').select('*').eq('assigned_to', userId),
      supabase.from('breathing_sessions').select('*').eq('user_id', userId),
      supabase.from('gratitude_entries').select('*').eq('user_id', userId),
    ]);

    const exportData = {
      exportedAt: new Date().toISOString(),
      userId: userId,
      profile: profileResult.data,
      journalEntries: journalEntriesResult.data || [],
      moodEntries: moodEntriesResult.data || [],
      dailyCheckIns: checkInsResult.data || [],
      aiConversations: conversationsResult.data || [],
      aiMessages: messagesResult.data || [],
      assessmentResults: assessmentResultsResult.data || [],
      homeworkTasks: homeworkTasksResult.data || [],
      breathingSessions: breathingSessionsResult.data || [],
      gratitudeEntries: gratitudeEntriesResult.data || [],
    };

    // Log the export for audit purposes
    await supabase.from('data_access_logs').insert({
      accessor_id: userId,
      data_type: 'full_export',
      access_reason: 'GDPR data portability request',
      accessed_user_id: userId,
    });

    console.log('Data export completed for user:', userId);

    return new Response(JSON.stringify(exportData), {
      status: 200,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="thrivemt-data-export-${userId}.json"`
      },
    });

  } catch (error) {
    console.error('Error in export-user-data:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
