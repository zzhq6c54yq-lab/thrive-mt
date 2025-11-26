import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extract userId from JWT token instead of request body
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id; // Use authenticated user, not client-supplied
    const { henryConversationId, reason } = await req.json();

    console.log('Creating therapist conversation for user:', userId);

    // Find an available therapist (for MVP: get first active therapist)
    const { data: therapist, error: therapistError } = await supabase
      .from('therapists')
      .select('id, name, user_id')
      .eq('is_active', true)
      .limit(1)
      .single();

    if (therapistError || !therapist) {
      console.error('No available therapist found:', therapistError);
      throw new Error('No available therapist found');
    }

    console.log('Selected therapist:', therapist.name);

    // Fetch Henry conversation context
    let henryContext = '';
    if (henryConversationId) {
      const { data: conversation } = await supabase
        .from('henry_conversations')
        .select('current_risk_level, metadata')
        .eq('id', henryConversationId)
        .single();

      const { data: messages } = await supabase
        .from('henry_messages')
        .select('role, content, created_at')
        .eq('conversation_id', henryConversationId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (conversation && messages) {
        const topics = messages
          .filter(m => m.role === 'user')
          .slice(0, 5)
          .map(m => m.content.substring(0, 100))
          .join('\n- ');

        henryContext = `**Henry AI Context Summary:**

**Risk Level:** ${conversation.current_risk_level || 'low'}

**Recent Topics Discussed:**
- ${topics}

**Reason for Escalation:** ${reason === 'crisis_detected' ? 'Crisis detected by AI' : 'User requested human support'}

---`;
      }
    }

    // Create system message with Henry context
    const { data: systemMessage, error: systemError } = await supabase
      .from('therapist_messages')
      .insert({
        client_id: userId,
        therapist_id: therapist.id,
        message_text: henryContext || 'New conversation started from Henry AI',
        sender_type: 'system',
        is_read: false,
        is_urgent: reason === 'crisis_detected'
      })
      .select()
      .single();

    if (systemError) {
      console.error('Error creating system message:', systemError);
      throw systemError;
    }

    console.log('Conversation created successfully');

    return new Response(
      JSON.stringify({
        success: true,
        conversationId: systemMessage.id,
        therapistName: therapist.name,
        therapistId: therapist.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-therapist-conversation:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
