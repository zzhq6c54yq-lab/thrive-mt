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
    console.log('Setting up therapist account...');
    
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

    const email = 'therapist@demo.com';
    const password = '0001';
    let userId: string;

    // Always list all users to find if therapist exists
    console.log('Checking all users...');
    const { data: allUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
      throw listError;
    }

    const existingUser = allUsers?.users?.find(u => u.email === email);
    
    if (existingUser) {
      console.log('Found existing user:', existingUser.id);
      userId = existingUser.id;
      
      // Update password
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id, 
        { password, email_confirm: true }
      );
      
      if (updateError) {
        console.error('Password update error:', updateError);
      } else {
        console.log('Password updated to: 0001');
      }
    } else {
      // Create new user
      console.log('Creating new user...');
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          display_name: 'Dr. Sarah Mitchell'
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }
      
      userId = authData.user.id;
      console.log('New user created:', userId);
    }

    // Update or insert profile
    console.log('Updating profile...');
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        is_therapist: true,
        onboarding_completed: true,
        display_name: 'Dr. Sarah Mitchell'
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Profile error:', profileError);
    } else {
      console.log('Profile updated');
    }

    // Update or insert therapist record
    console.log('Updating therapist record...');
    const { error: therapistError } = await supabaseAdmin
      .from('therapists')
      .upsert({
        id: '550e8400-e29b-41d4-a716-446655440000',
        user_id: userId,
        name: 'Dr. Sarah Mitchell',
        title: 'Clinical Psychologist',
        bio: 'Specialized in trauma and anxiety disorders with 15+ years of experience.',
        specialties: ['Trauma', 'Anxiety', 'Depression', 'PTSD'],
        hourly_rate: 150,
        experience_years: 15,
        is_active: true
      }, {
        onConflict: 'id'
      });

    if (therapistError) {
      console.error('Therapist error:', therapistError);
    } else {
      console.log('Therapist record updated');
    }

    console.log('Setup complete! Use code 0001 to login');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Therapist account ready! Use code 0001 in staff login',
        userId: userId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
