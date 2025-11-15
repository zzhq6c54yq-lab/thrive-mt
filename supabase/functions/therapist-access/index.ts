import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_ACCESS_CODE = Deno.env.get('THERAPIST_ACCESS_CODE');
const THERAPIST_EMAIL = Deno.env.get('THERAPIST_EMAIL');
const THERAPIST_PASSWORD = Deno.env.get('THERAPIST_PASSWORD');

// Rate limiting configuration (DISABLED UNTIL LAUNCH)
// const MAX_ATTEMPTS_PER_HOUR = 25;
// const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour in milliseconds

if (!VALID_ACCESS_CODE || !THERAPIST_EMAIL || !THERAPIST_PASSWORD) {
  throw new Error('Missing required environment variables');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessCode } = await req.json();
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

    // RATE LIMITING DISABLED UNTIL LAUNCH
    /*
    // Check rate limiting
    const { count: recentAttempts } = await supabaseClient
      .from('auth_user_audit')
      .select('*', { count: 'exact', head: true })
      .eq('operator', ip)
      .eq('action', 'therapist_access_attempt')
      .gte('created_at', new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString());

    if (recentAttempts && recentAttempts >= MAX_ATTEMPTS_PER_HOUR) {
      console.log(`Rate limit exceeded for IP: ${ip} (${recentAttempts}/${MAX_ATTEMPTS_PER_HOUR} attempts)`);
      await supabaseClient.from('auth_user_audit').insert({
        operator: ip,
        action: 'rate_limit_exceeded',
        user_id: '00000000-0000-0000-0000-000000000000',
        details: { timestamp: new Date().toISOString() }
      });
      return new Response(
        JSON.stringify({ error: 'Too many attempts. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    */

    // Constant-time comparison to prevent timing attacks
    const isValidCode = accessCode && constantTimeCompare(accessCode, VALID_ACCESS_CODE);
    
    // Log attempt
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

    // Try to sign in first - this is the most reliable way to check if user exists
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: THERAPIST_EMAIL,
      password: THERAPIST_PASSWORD,
    });

    // If sign in successful, return tokens immediately
    if (signInData?.session && !signInError) {
      console.log('Sign in successful');
      return new Response(
        JSON.stringify({ 
          access_token: signInData.session.access_token,
          refresh_token: signInData.session.refresh_token,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If sign in failed with invalid credentials, create the user
    if (signInError?.message?.includes('Invalid login credentials')) {
      console.log('User does not exist, creating therapist account');
      
      // Create the user
      const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: THERAPIST_EMAIL,
        password: THERAPIST_PASSWORD,
        email_confirm: true,
      });

      if (createError) {
        console.error('Error creating therapist user:', createError);
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

      console.log('Therapist account fully created, signing in');

      // Now sign in with the newly created account
      const { data: newSignInData, error: newSignInError } = await supabaseAdmin.auth.signInWithPassword({
        email: THERAPIST_EMAIL,
        password: THERAPIST_PASSWORD,
      });

      if (newSignInError || !newSignInData.session) {
        console.error('Error signing in after creation:', newSignInError);
        throw new Error(`Failed to sign in after creation: ${newSignInError?.message || 'No session returned'}`);
      }

      console.log('Sign in successful after creation');

      return new Response(
        JSON.stringify({ 
          access_token: newSignInData.session.access_token,
          refresh_token: newSignInData.session.refresh_token,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If sign in failed with some other error, throw it
    console.error('Unexpected sign in error:', signInError);
    throw new Error(`Sign in failed: ${signInError?.message || 'Unknown error'}`);

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
