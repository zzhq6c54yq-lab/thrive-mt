import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Zod schema for input validation
const RequestSchema = z.object({
  token: z.string().min(32, "Invalid token format").max(64, "Invalid token format")
});

serve(async (req) => {
  // Handle CORS preflight
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

    const { token } = parseResult.data;

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log('Verifying reset token:', token.substring(0, 8) + '...');

    // Fetch and verify token
    const { data: resetToken, error: fetchError } = await supabaseClient
      .from('therapist_access_reset_tokens')
      .select('*')
      .eq('token', token)
      .eq('is_valid', true)
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (fetchError || !resetToken) {
      console.log('Invalid or expired token');
      
      // Log failed verification attempt
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                 req.headers.get('x-real-ip') || 
                 'unknown';
      
      await supabaseClient.from('auth_user_audit').insert({
        operator: ip,
        action: 'therapist_reset_verification_failed',
        user_id: '00000000-0000-0000-0000-000000000000',
        details: { token_prefix: token.substring(0, 8), error: 'Invalid or expired token' }
      });

      return new Response(
        JSON.stringify({ 
          error: 'Invalid or expired reset token. Please request a new one.',
          code: 'INVALID_TOKEN'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Token verified for IP:', resetToken.ip_address);

    // Clear all rate limit attempts for this IP
    const { error: deleteError } = await supabaseClient
      .from('auth_user_audit')
      .delete()
      .eq('operator', resetToken.ip_address)
      .eq('action', 'therapist_access_attempt');

    if (deleteError) {
      console.error('Error clearing rate limit attempts:', deleteError);
      throw new Error('Failed to clear rate limit');
    }

    console.log('Rate limit cleared for IP:', resetToken.ip_address);

    // Mark token as used
    const { error: updateError } = await supabaseClient
      .from('therapist_access_reset_tokens')
      .update({ 
        used_at: new Date().toISOString(),
        is_valid: false 
      })
      .eq('id', resetToken.id);

    if (updateError) {
      console.error('Error marking token as used:', updateError);
      throw new Error('Failed to mark token as used');
    }

    // Log successful reset
    await supabaseClient.from('auth_user_audit').insert({
      operator: resetToken.ip_address,
      action: 'therapist_reset_successful',
      user_id: '00000000-0000-0000-0000-000000000000',
      details: { 
        ip_address: resetToken.ip_address,
        email: resetToken.email,
        token_id: resetToken.id
      }
    });

    console.log('Reset successful');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Rate limit cleared successfully. You can now try logging in again.',
        ip_address: resetToken.ip_address
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in verify-therapist-reset:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to verify reset token' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
