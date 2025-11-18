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

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get current user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error('User authentication failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the attempt
    await supabase.from('auth_user_audit').insert({
      user_id: user.id,
      action: isValid ? 'admin_access_granted' : 'admin_access_denied',
      operator: user.email || user.id,
      details: {
        ip_address: ip,
        user_agent: userAgent,
        timestamp: new Date().toISOString(),
      }
    });

    if (!isValid) {
      console.log(`Invalid access code attempt from ${ip}`);
      return new Response(
        JSON.stringify({ error: 'Invalid access code' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has admin role
    const { data: hasAdmin } = await supabase.rpc('is_admin');

    if (!hasAdmin) {
      console.log(`Non-admin user ${user.id} attempted admin access`);
      await supabase.from('auth_user_audit').insert({
        user_id: user.id,
        action: 'admin_access_unauthorized',
        operator: user.email || user.id,
        details: {
          reason: 'User does not have admin role',
          ip_address: ip,
        }
      });

      return new Response(
        JSON.stringify({ error: 'Unauthorized: Admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate secure session token
    const sessionToken = crypto.randomUUID() + '-' + crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Create session
    const { error: sessionError } = await supabase
      .from('admin_sessions')
      .insert({
        user_id: user.id,
        session_token: sessionToken,
        ip_address: ip,
        user_agent: userAgent,
        expires_at: expiresAt.toISOString(),
      });

    if (sessionError) {
      console.error('Failed to create session:', sessionError);
      return new Response(
        JSON.stringify({ error: 'Failed to create session' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clear rate limit on success
    attemptCache.delete(cacheKey);

    console.log(`Admin access granted to ${user.email}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sessionToken,
        expiresAt: expiresAt.toISOString(),
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
