import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting cache (simple in-memory for demo)
const attemptCache = new Map<string, { count: number; resetAt: number }>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessCode } = await req.json();
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Rate limiting: 5 attempts per hour per IP
    const now = Date.now();
    const cacheKey = ip;
    const cached = attemptCache.get(cacheKey);
    
    if (cached && cached.resetAt > now) {
      if (cached.count >= 5) {
        console.log(`Rate limit exceeded for IP: ${ip}`);
        return new Response(
          JSON.stringify({ error: 'Too many attempts. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      cached.count++;
    } else {
      attemptCache.set(cacheKey, { count: 1, resetAt: now + 3600000 }); // 1 hour
    }

    // Get the stored access code from Supabase secrets
    const storedCode = Deno.env.get('ADMIN_ACCESS_CODE');
    
    if (!storedCode) {
      console.error('ADMIN_ACCESS_CODE not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const isValid = constantTimeCompare(accessCode, storedCode);

    // Initialize Supabase client with service role for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get admin credentials
    const adminEmail = Deno.env.get('ADMIN_EMAIL');
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    if (!adminEmail || !adminPassword) {
      console.error('Admin credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValid) {
      console.log(`Invalid access code attempt from ${ip}`);
      
      // Log failed attempt (no user context yet)
      await supabase.from('auth_user_audit').insert({
        user_id: '00000000-0000-0000-0000-000000000000', // placeholder for anonymous attempt
        action: 'admin_access_denied',
        operator: 'anonymous',
        details: {
          ip_address: ip,
          user_agent: userAgent,
          reason: 'Invalid access code',
          timestamp: new Date().toISOString(),
        }
      });

      return new Response(
        JSON.stringify({ error: 'Invalid access code' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Valid access code - now ensure admin account exists and sign in
    
    // Check if admin user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify admin account' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let adminUser = users?.find(u => u.email === adminEmail);

    // Create admin account if it doesn't exist
    if (!adminUser) {
      console.log('Creating admin account...');
      
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (createError) {
        console.error('Error creating admin user:', createError);
        return new Response(
          JSON.stringify({ error: 'Failed to create admin account' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      adminUser = newUser.user;

      // Assign admin role
      const { error: roleError } = await supabase.from('user_roles').insert({
        user_id: adminUser.id,
        role: 'admin',
      });

      if (roleError) {
        console.error('Error assigning admin role:', roleError);
        // Continue anyway - they can still access with the user
      }

      console.log(`Admin account created: ${adminEmail}`);
    }

    // Sign in as admin user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (signInError || !signInData.session) {
      console.error('Error signing in admin:', signInError);
      return new Response(
        JSON.stringify({ error: 'Failed to authenticate admin account' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log successful access
    await supabase.from('auth_user_audit').insert({
      user_id: adminUser.id,
      action: 'admin_access_granted',
      operator: adminEmail,
      details: {
        ip_address: ip,
        user_agent: userAgent,
        timestamp: new Date().toISOString(),
      }
    });

    // Clear rate limit on success
    attemptCache.delete(cacheKey);

    console.log(`Admin access granted to ${adminEmail}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        session: signInData.session,
        user: signInData.user,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-access function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Constant-time string comparison to prevent timing attacks
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}
