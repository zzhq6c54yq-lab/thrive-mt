import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  accessCode: z.string().min(1, "Access code is required")
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get coach code from environment variable (not hardcoded)
    const COACH_CODE = Deno.env.get('COACH_ACCESS_CODE');
    
    if (!COACH_CODE) {
      console.error('COACH_ACCESS_CODE environment variable not set');
      return new Response(
        JSON.stringify({ valid: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate request body with Zod
    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid request', details: parseResult.error.format() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { accessCode } = parseResult.data;

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // Check rate limiting - max 5 failed attempts per hour per IP
    const { data: recentAttempts } = await supabase
      .from('auth_user_audit')
      .select('id')
      .eq('action', 'coach_access_denied')
      .gte('created_at', oneHourAgo);

    // Filter by IP in JavaScript since JSONB filtering varies
    const ipAttempts = recentAttempts?.filter(
      (attempt: any) => attempt.details?.ip_address === ip
    ) || [];

    if (ipAttempts.length >= 5) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ valid: false, error: 'Too many attempts. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(accessCode);
    const storedBytes = encoder.encode(COACH_CODE);
    
    let isValid = inputBytes.length === storedBytes.length;
    for (let i = 0; i < Math.max(inputBytes.length, storedBytes.length); i++) {
      if (inputBytes[i] !== storedBytes[i]) {
        isValid = false;
      }
    }

    if (isValid) {
      // Log successful access
      await supabase.from('auth_user_audit').insert({
        user_id: '00000000-0000-0000-0000-000000000000', // System user for coach access
        action: 'coach_access_granted',
        details: { ip_address: ip }
      });

      return new Response(
        JSON.stringify({ 
          valid: true, 
          coachName: "Coach",
          message: "Let's change some lives today! 🚀"
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Log failed attempt for rate limiting
      await supabase.from('auth_user_audit').insert({
        user_id: '00000000-0000-0000-0000-000000000000', // System user for coach access
        action: 'coach_access_denied',
        details: { ip_address: ip }
      });

      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "Hmm, that code doesn't look right. Try again?" 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error validating coach access:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Something went wrong. Give it another shot!' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
