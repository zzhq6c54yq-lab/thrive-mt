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
    let userId: string;

    console.log('Attempting to create or update therapist user...');
    
    // Try to create the user first
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        display_name: 'Dr. Sarah Mitchell'
      }
    });

    // If user already exists, get their ID and update password
    if (authError && authError.message.includes('duplicate')) {
      console.log('User already exists, fetching user ID and updating password...');
      
      // Get user by email
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        console.error('Error listing users:', listError);
        throw listError;
      }
      
      const existingUser = users?.find(u => u.email === email);
      if (!existingUser) {
        console.error('Could not find existing user despite duplicate error');
        throw new Error('User exists but could not be found');
      }
      
      userId = existingUser.id;
      console.log('Found existing user with ID:', userId);
      
      // Update password
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { password: '0001', email_confirm: true }
      );
      
      if (updateError) {
        console.error('Error updating user password:', updateError);
        throw updateError;
      }
      
      console.log('Password updated successfully');
    } else if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    } else {
      userId = authData.user.id;
      console.log('New user created with ID:', userId);
    }

    // Ensure profile exists (upsert for both new and existing users)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        display_name: 'Dr. Sarah Mitchell',
        is_therapist: true,
        onboarding_completed: true
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Profile upsert error:', profileError);
      throw profileError;
    }

    console.log('Profile ensured successfully');

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
