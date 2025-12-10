import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_ACCESS_CODE = Deno.env.get('THERAPIST_ACCESS_CODE');
const THERAPIST_EMAIL = Deno.env.get('THERAPIST_EMAIL');
const THERAPIST_PASSWORD = Deno.env.get('THERAPIST_PASSWORD');

// Rate limiting configuration (DEMO MODE - 75 attempts per hour)
const MAX_ATTEMPTS_PER_HOUR = 75;
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour in milliseconds

if (!VALID_ACCESS_CODE || !THERAPIST_EMAIL || !THERAPIST_PASSWORD) {
  throw new Error('Missing required environment variables');
}

// Zod schema for input validation
const RequestSchema = z.object({
  accessCode: z.string().min(1, "Access code is required")
});

// Constant-time string comparison to prevent timing attacks
function constantTimeCompare(a: string, b: string): boolean {
  // If lengths differ, already not equal (but still compare to maintain constant time)
  if (a.length !== b.length) {
    // Compare against a fixed string to maintain timing
    b = a;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0 && a.length === b.length;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request body with Zod
    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request', details: parseResult.error.format() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { accessCode } = parseResult.data;
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    console.log('Access code validation attempt from:', ip);
    
    // Create client for rate limiting checks
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Constant-time comparison to prevent timing attacks
    const isValidCode = accessCode && constantTimeCompare(accessCode, VALID_ACCESS_CODE);
    
    // Log all attempts for rate limiting tracking
    await supabaseClient.from('auth_user_audit').insert({
      operator: ip,
      action: 'therapist_access_attempt',
      user_id: '00000000-0000-0000-0000-000000000000',
      details: { 
        timestamp: new Date().toISOString(),
        success: isValidCode 
      }
    });
    
    // Log success/failure for audit trail
    await supabaseClient.from('auth_user_audit').insert({
      operator: ip,
      action: isValidCode ? 'therapist_access_success' : 'therapist_access_failed',
      user_id: '00000000-0000-0000-0000-000000000000',
      details: { timestamp: new Date().toISOString() }
    });
    
    // Validate access code
    if (!isValidCode) {
      console.log('Invalid access code provided');
      return new Response(
        JSON.stringify({ error: 'Access denied' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Access code valid, attempting sign in first');

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Try to sign in first to check if user exists
    let existingUser = null;
    try {
      const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
        email: THERAPIST_EMAIL!,
        password: THERAPIST_PASSWORD!,
      });
      
      if (signInData.user) {
        existingUser = signInData.user;
        console.log('Therapist user exists and credentials are valid');
      }
    } catch (signInAttemptError) {
      console.log('Sign in attempt during user check:', signInAttemptError);
    }

    if (existingUser) {
      console.log('Therapist user exists, updating password to match environment variable');
      
      // User exists - update their password to match the env variable
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        { password: THERAPIST_PASSWORD }
      );

      if (updateError) {
        console.error('Error updating therapist password:', updateError);
        
        // Check if it's a weak password error
        if (updateError.message.includes('Password should contain')) {
          return new Response(
            JSON.stringify({ 
              error: 'Configuration Error',
              details: 'The THERAPIST_PASSWORD secret does not meet security requirements. Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*()_+-=[]{};\':"|<>?,./`~).'
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        throw new Error(`Failed to update therapist password: ${updateError.message}`);
      }

      console.log('Password updated, signing in');
    } else {
      console.log('Therapist user does not exist, creating account');
      
      // Create the user
      const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: THERAPIST_EMAIL,
        password: THERAPIST_PASSWORD,
        email_confirm: true,
      });

      if (createError) {
        console.error('Error creating therapist user:', createError);
        
        // Check if it's a weak password error
        if (createError.message.includes('Password should contain')) {
          return new Response(
            JSON.stringify({ 
              error: 'Configuration Error',
              details: 'The THERAPIST_PASSWORD secret does not meet security requirements. Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*()_+-=[]{};\':"|<>?,./`~).'
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        throw new Error(`Failed to create therapist account: ${createError.message}`);
      }

      console.log('Therapist user created:', userData.user.id);

      // Create profile
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userData.user.id,
          email: THERAPIST_EMAIL,
          display_name: 'Demo Therapist',
          is_therapist: true,
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      // Create therapist record
      const { error: therapistError } = await supabaseAdmin
        .from('therapists')
        .insert({
          user_id: userData.user.id,
          name: 'Demo Therapist',
          title: 'Licensed Therapist',
          bio: 'Demo therapist account for testing',
          specialties: ['General Counseling'],
          hourly_rate: 150,
          is_active: true,
        });

      if (therapistError) {
        console.error('Error creating therapist record:', therapistError);
        throw new Error(`Failed to create therapist record: ${therapistError.message}`);
      }

      console.log('Therapist account fully created');
    }

    // Sign in with the therapist credentials (works for both existing and new users)
    console.log('Signing in with therapist credentials');
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: THERAPIST_EMAIL,
      password: THERAPIST_PASSWORD,
    });

    if (signInError || !signInData.session) {
      console.error('Error signing in:', signInError);
      throw new Error(`Failed to sign in: ${signInError?.message || 'No session returned'}`);
    }

    console.log('Sign in successful');

    return new Response(
      JSON.stringify({ 
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in therapist-access function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
