import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT and get user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { to, clientId } = await req.json();

    if (!to) {
      throw new Error('Phone number is required');
    }

    // Get Twilio credentials
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !twilioPhone) {
      throw new Error('Twilio credentials not configured');
    }

    // Format phone number
    const formattedTo = to.startsWith('+') ? to : `+1${to.replace(/\D/g, '')}`;

    // Make Twilio API call
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`;
    const credentials = btoa(`${accountSid}:${authToken}`);

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: formattedTo,
        From: twilioPhone,
        Url: 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient',
      }),
    });

    const twilioData = await twilioResponse.json();

    if (!twilioResponse.ok) {
      console.error('Twilio error:', twilioData);
      throw new Error(twilioData.message || 'Failed to place call');
    }

    // Log call in database for HIPAA compliance
    const { error: logError } = await supabase
      .from('phone_calls')
      .insert({
        call_sid: twilioData.sid,
        from_number: twilioPhone,
        to_number: formattedTo,
        therapist_id: user.id,
        client_id: clientId || null,
        status: twilioData.status,
        direction: 'outbound',
      });

    if (logError) {
      console.error('Failed to log call:', logError);
    }

    console.log('Call placed successfully:', twilioData.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        callSid: twilioData.sid,
        status: twilioData.status
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in place-call function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
