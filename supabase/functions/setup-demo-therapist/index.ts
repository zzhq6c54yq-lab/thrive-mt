import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    console.log('Setting up demo therapist account...');

    const email = 'therapist@demo.com';
    const password = '0001';

    // First, check if profile already exists by querying the database directly
    const { data: existingProfile, error: profileQueryError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, is_therapist')
      .eq('email', email)
      .maybeSingle();

    if (profileQueryError) {
      console.error('Error querying existing profile:', profileQueryError);
    }

    let userId: string;

    // If profile exists, update the password instead of deleting
    if (existingProfile) {
      console.log('Found existing profile with ID:', existingProfile.id);
      console.log('Updating existing user password to 0001...');
      
      // Update the password instead of deleting and recreating
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingProfile.id,
        { 
          password: '0001', 
          email_confirm: true 
        }
      );
      
      if (updateError) {
        console.error('Error updating user password:', updateError);
        throw updateError;
      }
      
      console.log('User password updated successfully');
      userId = existingProfile.id;
      
      // Update profile to ensure correct settings
      const { error: profileUpdateError } = await supabaseAdmin
        .from('profiles')
        .update({
          is_therapist: true,
          onboarding_completed: true,
          display_name: 'Dr. Sarah Mitchell',
          email: email
        })
        .eq('id', userId);
        
      if (profileUpdateError) {
        console.error('Profile update error:', profileUpdateError);
        throw profileUpdateError;
      }
      
      console.log('Profile updated successfully');
      
    } else {
      // Create new therapist user with correct password
      console.log('Creating new therapist user...');
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          display_name: 'Dr. Sarah Mitchell'
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      console.log('Therapist user created:', authData.user.id);
      userId = authData.user.id;

      // Create profile
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userId,
          email: email,
          display_name: 'Dr. Sarah Mitchell',
          is_therapist: true,
          onboarding_completed: true
        });

      if (profileError) {
        console.error('Profile error:', profileError);
        throw profileError;
      }

      console.log('Profile created successfully');
    }

    // Delete any existing therapist records to avoid duplicates
    console.log('Cleaning up old therapist records...');
    await supabaseAdmin
      .from('therapists')
      .delete()
      .eq('user_id', userId);

    // Ensure therapist record exists
    console.log('Creating therapist record...');
    const { error: therapistError } = await supabaseAdmin
      .from('therapists')
      .insert({
        user_id: userId,
        name: 'Dr. Sarah Mitchell',
        title: 'Clinical Psychologist',
        bio: 'Specialized in trauma and anxiety disorders with 15+ years of experience.',
        specialties: ['Trauma', 'Anxiety', 'Depression', 'PTSD'],
        hourly_rate: 150,
        experience_years: 15,
        is_active: true
      });

    if (therapistError) {
      console.error('Therapist record error:', therapistError);
      throw therapistError;
    }

    console.log('Setup complete!');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Demo therapist account ready. You can now login with access code: 0001',
        userId: userId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in setup-demo-therapist:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
