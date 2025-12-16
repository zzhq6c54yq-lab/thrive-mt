import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BetaSignupRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: BetaSignupRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get current beta signup count
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: countData } = await supabase.rpc('get_beta_signup_count');
    const totalSignups = countData || 1001;

    // Send notification email to admin
    const emailResponse = await resend.emails.send({
      from: "ThriveMT Beta <onboarding@resend.dev>",
      to: ["beta@thrive-mental.com"],
      subject: `🎉 New Beta Signup: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #B87333, #D4A574); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Beta Signup!</h1>
          </div>
          
          <div style="background: #1a1a1a; padding: 30px; border-radius: 0 0 8px 8px; color: #ffffff;">
            <p style="color: #B87333; font-size: 18px; margin-bottom: 20px;">Someone just joined the ThriveMT beta waitlist!</p>
            
            <div style="background: #2a2a2a; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; color: #888;">Email Address:</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: #B87333; font-weight: bold;">${email}</p>
            </div>
            
            <div style="background: #2a2a2a; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; color: #888;">Total Beta Signups:</p>
              <p style="margin: 5px 0 0 0; font-size: 24px; color: #B87333; font-weight: bold;">${totalSignups.toLocaleString()}</p>
            </div>
            
            <div style="background: #2a2a2a; padding: 15px; border-radius: 6px;">
              <p style="margin: 0; color: #888;">Signed Up At:</p>
              <p style="margin: 5px 0 0 0; color: #ffffff;">${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>
            </div>
          </div>
          
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
            This is an automated notification from ThriveMT Beta Signup System
          </p>
        </div>
      `,
    });

    console.log("Beta signup notification sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in notify-beta-signup:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
