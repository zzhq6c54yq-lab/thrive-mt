import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  role?: string;
  message: string;
}

const getRoleEmail = (role?: string): string => {
  switch (role) {
    case 'investor':
      return 'investor@thrive-mental.com';
    case 'partner':
    case 'business':
      return 'business@thrive-mental.com';
    case 'therapist':
    case 'coach':
      return 'hiring@thrive-mental.com';
    default:
      return 'support@thrive-mental.com';
  }
};

const getRoleLabel = (role?: string): string => {
  switch (role) {
    case 'client':
      return 'Potential Client';
    case 'therapist':
      return 'Therapist';
    case 'coach':
      return 'Coach';
    case 'investor':
      return 'Investor';
    case 'partner':
      return 'Business Partner';
    default:
      return 'Other';
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, role, message }: ContactRequest = await req.json();

    console.log("Processing contact form from:", name, email, "role:", role);

    const toEmail = getRoleEmail(role);
    const roleLabel = getRoleLabel(role);

    // Send notification to appropriate team
    await resend.emails.send({
      from: "ThriveMT Contact <noreply@thrive-mental.com>",
      to: [toEmail],
      replyTo: email,
      subject: `New Contact Form Submission - ${name} (${roleLabel})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 30px; background: #1a1a1a; color: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #888;">Name:</td>
                <td style="padding: 10px 0; color: #fff;"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Email:</td>
                <td style="padding: 10px 0; color: #fff;"><a href="mailto:${email}" style="color: #D4A574;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Role:</td>
                <td style="padding: 10px 0; color: #fff;">${roleLabel}</td>
              </tr>
            </table>
            
            <h3 style="color: #D4A574; margin-top: 30px;">Message</h3>
            <div style="background: #2a2a2a; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
              ${message}
            </div>
            
            <div style="margin-top: 20px;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reply to ${name}
              </a>
            </div>
          </div>
          <div style="padding: 20px; background: #0d0d0d; text-align: center; color: #666; font-size: 12px;">
            <p>This message was submitted via the ThriveMT contact form</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to sender
    await resend.emails.send({
      from: "ThriveMT <noreply@thrive-mental.com>",
      to: [email],
      subject: "We Received Your Message - ThriveMT",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Thank You, ${name}!</h1>
          </div>
          <div style="padding: 30px; background: #1a1a1a; color: #fff;">
            <p style="font-size: 16px; line-height: 1.6;">
              We've received your message and appreciate you reaching out to us.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Our team typically responds within 24-48 hours during business days (Monday-Friday, 9am-6pm MT).
            </p>
            
            <div style="margin-top: 30px; padding: 20px; background: #2a2a2a; border-radius: 8px;">
              <p style="margin: 0; color: #888; font-size: 14px;">
                <strong style="color: #D4A574;">Your Message:</strong><br><br>
                ${message}
              </p>
            </div>
            
            <p style="font-size: 14px; color: #888; margin-top: 20px;">
              In the meantime, explore our resources at <a href="https://thrive-mental.com" style="color: #D4A574;">thrive-mental.com</a>
            </p>
          </div>
          <div style="padding: 20px; background: #0d0d0d; text-align: center; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} ThriveMT. Here for you.</p>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
