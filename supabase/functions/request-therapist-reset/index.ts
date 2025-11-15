import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const THERAPIST_EMAIL = Deno.env.get('THERAPIST_EMAIL')!;

const resend = new Resend(RESEND_API_KEY);

// Rate limiting for reset requests
const MAX_RESET_REQUESTS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour

// Generate cryptographically secure random token
function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars[randomBytes[i] % chars.length];
  }
  return token;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get IP address
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               req.headers.get('x-real-ip') || 
               'unknown';

    console.log('Reset request from IP:', ip);

    // Check rate limit for reset requests
    const { count: resetRequestCount } = await supabaseClient
      .from('auth_user_audit')
      .select('*', { count: 'exact', head: true })
      .eq('operator', ip)
      .eq('action', 'therapist_reset_request')
      .gte('created_at', new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString());

    if (resetRequestCount && resetRequestCount >= MAX_RESET_REQUESTS_PER_HOUR) {
      console.log(`Reset request rate limit exceeded for IP: ${ip} (${resetRequestCount}/${MAX_RESET_REQUESTS_PER_HOUR})`);
      
      await supabaseClient.from('auth_user_audit').insert({
        operator: ip,
        action: 'reset_request_rate_limit_exceeded',
        user_id: '00000000-0000-0000-0000-000000000000',
        details: { ip_address: ip, attempts: resetRequestCount }
      });

      return new Response(
        JSON.stringify({ error: 'Too many reset requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if IP is actually rate-limited (has exceeded access attempts)
    const { count: accessAttempts } = await supabaseClient
      .from('auth_user_audit')
      .select('*', { count: 'exact', head: true })
      .eq('operator', ip)
      .eq('action', 'therapist_access_attempt')
      .gte('created_at', new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString());

    console.log(`IP ${ip} has ${accessAttempts} access attempts in the last hour`);

    // Generate secure token
    const token = generateSecureToken(32);
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Store token in database
    const { error: tokenError } = await supabaseClient
      .from('therapist_access_reset_tokens')
      .insert({
        ip_address: ip,
        token,
        email: THERAPIST_EMAIL,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error('Error storing reset token:', tokenError);
      throw new Error('Failed to create reset token');
    }

    // Log reset request
    await supabaseClient.from('auth_user_audit').insert({
      operator: ip,
      action: 'therapist_reset_request',
      user_id: '00000000-0000-0000-0000-000000000000',
      details: { 
        ip_address: ip, 
        email: THERAPIST_EMAIL,
        access_attempts: accessAttempts 
      }
    });

    // Determine app URL (try to get from headers or use default)
    const origin = req.headers.get('origin') || req.headers.get('referer') || 'https://thrive-mt.lovable.app';
    const appUrl = new URL(origin).origin;
    const resetLink = `${appUrl}/therapist-reset?token=${token}`;

    console.log('Sending reset email to:', THERAPIST_EMAIL);

    // Send email with reset link
    const emailResponse = await resend.emails.send({
      from: 'Thrive <onboarding@resend.dev>',
      to: [THERAPIST_EMAIL],
      subject: 'Thrive - Therapist Access Reset Link',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Therapist Access Reset</h1>
            </div>
            <div class="content">
              <p>Hi,</p>
              <p>We received a request to reset your therapist access due to rate limiting.</p>
              <p>Click the button below to clear your rate limit and try again:</p>
              <div style="text-align: center;">
                <a href="${resetLink}" class="button">Reset Access (Valid for 1 hour)</a>
              </div>
              <div class="warning">
                <strong>⏰ This link expires in 1 hour</strong>
              </div>
              <p style="font-size: 14px; color: #6b7280;">If you didn't request this, you can safely ignore this email. The rate limit will automatically reset in 1 hour.</p>
              <p style="font-size: 14px; color: #6b7280;">Current access attempts from your location: ${accessAttempts || 0}</p>
            </div>
            <div class="footer">
              <p>Best regards,<br>The Thrive Support Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reset link sent to your email',
        tokenId: token.substring(0, 8) + '...' // Only return partial token for logging
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in request-therapist-reset:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send reset link' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
