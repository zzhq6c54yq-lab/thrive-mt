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
    console.log('Creating therapist account...');
    
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

    // Try to create the user - if it already exists, this will fail gracefully
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        display_name: 'Dr. Sarah Mitchell'
      }
    });

    if (authError) {
      // Check if user already exists
      if (authError.message?.includes('already registered')) {
        console.log('User already exists, fetching existing user...');
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = existingUsers?.users?.find(u => u.email === email);
        
        if (existingUser) {
          console.log('Found existing user:', existingUser.id);
          
          // Update password
          await supabaseAdmin.auth.admin.updateUserById(existingUser.id, { password });
          console.log('Password updated');
          
          // Update profile
          const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({
              is_therapist: true,
              onboarding_completed: true,
              display_name: 'Dr. Sarah Mitchell'
            })
            .eq('id', existingUser.id);

          if (profileError) {
            console.error('Profile update error:', profileError);
          } else {
            console.log('Profile updated');
          }

          // Update therapist record
          const { error: therapistError } = await supabaseAdmin
            .from('therapists')
            .upsert({
              id: '550e8400-e29b-41d4-a716-446655440000',
              user_id: existingUser.id,
              name: 'Dr. Sarah Mitchell',
              title: 'Clinical Psychologist',
              bio: 'Specialized in trauma and anxiety disorders with 15+ years of experience.',
              specialties: ['Trauma', 'Anxiety', 'Depression', 'PTSD'],
              hourly_rate: 150,
              experience_years: 15,
              is_active: true
            });

          if (therapistError) {
            console.error('Therapist update error:', therapistError);
          } else {
            console.log('Therapist record updated');
          }

          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Existing therapist account updated. Login with 0001/0001',
              userId: existingUser.id
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200 
            }
          );
        }
      }
      
      console.error('Auth error:', authError);
      throw authError;
    }

    console.log('New user created:', authData.user.id);

    // Update profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        is_therapist: true,
        onboarding_completed: true,
        display_name: 'Dr. Sarah Mitchell'
      })
      .eq('id', authData.user.id);

    if (profileError) {
      console.error('Profile error:', profileError);
    } else {
      console.log('Profile updated');
    }

    // Create therapist record
    const { error: therapistError } = await supabaseAdmin
      .from('therapists')
      .upsert({
        id: '550e8400-e29b-41d4-a716-446655440000',
        user_id: authData.user.id,
        name: 'Dr. Sarah Mitchell',
        title: 'Clinical Psychologist',
        bio: 'Specialized in trauma and anxiety disorders with 15+ years of experience.',
        specialties: ['Trauma', 'Anxiety', 'Depression', 'PTSD'],
        hourly_rate: 150,
        experience_years: 15,
        is_active: true
      });

    if (therapistError) {
      console.error('Therapist error:', therapistError);
    } else {
      console.log('Therapist record created');
    }

    console.log('Setup complete!');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Therapist account created successfully. Login with 0001/0001',
        userId: authData.user.id
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
