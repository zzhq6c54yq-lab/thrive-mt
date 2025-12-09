import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  to: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number too long")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format"),
  message: z.string().max(1600, "Message too long").optional(),
  template: z.enum([
    'appointment_reminder',
    'wellness_checkin',
    'session_confirmation',
    'reschedule',
    'follow_up'
  ]).optional(),
  templateData: z.record(z.string()).optional(),
  clientId: z.string().uuid("Invalid client ID").optional(),
});

// SMS templates for common use cases
const SMS_TEMPLATES: Record<string, string> = {
  appointment_reminder: "Hi {name}, this is a reminder about your therapy session tomorrow at {time}. - ThriveMT",
  wellness_checkin: "Hi {name}, just checking in. How are you feeling today on a scale of 1-10? Reply with a number. - ThriveMT",
  session_confirmation: "Your therapy session has been confirmed for {date} at {time}. We look forward to seeing you! - ThriveMT",
  reschedule: "Hi {name}, your session has been rescheduled to {date} at {time}. Please confirm by replying YES. - ThriveMT",
  follow_up: "Hi {name}, hope you're doing well since our last session. Remember to practice the techniques we discussed. - ThriveMT",
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
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const rawBody = await req.json();
    
    // Validate input with Zod
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      console.error('Validation error:', parseResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request',
          details: parseResult.error.errors.map(e => e.message)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { to, message, template, templateData, clientId } = parseResult.data;

    // Build message from template or use custom message
    let finalMessage = message;
    if (template && SMS_TEMPLATES[template]) {
      finalMessage = SMS_TEMPLATES[template];
      if (templateData) {
        Object.entries(templateData).forEach(([key, value]) => {
          finalMessage = finalMessage!.replace(`{${key}}`, value);
        });
      }
    }

    if (!finalMessage) {
      return new Response(
        JSON.stringify({ error: 'Message content is required (either message or template)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
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
        Body: finalMessage,
      }),
    });

    const twilioData = await twilioResponse.json();

    if (!twilioResponse.ok) {
      console.error('Twilio error:', twilioData);
      throw new Error(twilioData.message || 'Failed to send SMS');
    }

    // Log SMS in database for HIPAA compliance
    const { error: logError } = await supabase
      .from('sms_messages')
      .insert({
        message_sid: twilioData.sid,
        from_number: twilioPhone,
        to_number: formattedTo,
        therapist_id: user.id,
        client_id: clientId || null,
        message_body: finalMessage,
        status: twilioData.status,
        direction: 'outbound',
        template_used: template || null,
      });

    if (logError) {
      console.error('Failed to log SMS:', logError);
    }

    console.log('SMS sent successfully:', twilioData.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: twilioData.sid,
        status: twilioData.status
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-sms function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
