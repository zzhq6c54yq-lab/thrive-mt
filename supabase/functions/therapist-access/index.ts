import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_ACCESS_CODE = "0001";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessCode } = await req.json();
    
    console.log('Access code validation attempt');
    
    // Validate access code
    if (accessCode !== VALID_ACCESS_CODE) {
      console.log('Invalid access code provided');
      return new Response(
        JSON.stringify({ error: 'Invalid access code' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

    console.log('Looking up therapist user');

    // First, find the user by email
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error fetching users:', userError);
      throw userError;
    }

    let therapistUser = userData.users.find(u => u.email === 'therapist@demo.com');
    
    // If therapist user doesn't exist, create it
    if (!therapistUser) {
      console.log('Therapist user not found, creating new user');
      
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: 'therapist@demo.com',
        password: crypto.randomUUID(), // Random password since we use access codes
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          is_therapist: true
        }
      });

      if (createError) {
        console.error('Error creating therapist user:', createError);
        throw createError;
      }

      therapistUser = newUser.user;
      console.log('Therapist user created:', therapistUser.id);

      // Update the profile to set is_therapist flag
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({ is_therapist: true })
        .eq('id', therapistUser.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        // Don't throw - the user is created, profile update is not critical for login
      }
    }

    console.log('Creating session for therapist user:', therapistUser.id);

    // Create a session for the existing user
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
      userId: therapistUser.id,
    });

    if (sessionError) {
      console.error('Error creating session:', sessionError);
      throw sessionError;
    }

    console.log('Session created successfully');

    return new Response(
      JSON.stringify({ 
        access_token: sessionData.access_token,
        refresh_token: sessionData.refresh_token,
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
