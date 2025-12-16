import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvestorRequest {
  name: string;
  email: string;
  company?: string;
  investmentRange?: string;
  meetingReason?: string;
  preferredTimes?: string;
  requestType: 'deck_request' | 'founder_meeting';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InvestorRequest = await req.json();
    const { name, email, company, investmentRange, meetingReason, preferredTimes, requestType } = data;

    console.log("Processing investor request:", requestType, "from:", name, email);

    if (requestType === 'deck_request') {
      // Send notification to investor relations
      await resend.emails.send({
        from: "ThriveMT Investor Relations <noreply@thrive-mental.com>",
        to: ["investor@thrive-mental.com"],
        subject: `Investor Deck Request - ${name}${company ? ` (${company})` : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
              <h1 style="color: #000; margin: 0;">New Investor Deck Request</h1>
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
                  <td style="padding: 10px 0; color: #888;">Company/Fund:</td>
                  <td style="padding: 10px 0; color: #fff;">${company || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Investment Range:</td>
                  <td style="padding: 10px 0; color: #fff;">${investmentRange || "Not specified"}</td>
                </tr>
              </table>
              <div style="margin-top: 20px;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Reply to ${name}
                </a>
              </div>
            </div>
          </div>
        `,
      });

      // Send confirmation to requester
      await resend.emails.send({
        from: "ThriveMT Investor Relations <noreply@thrive-mental.com>",
        to: [email],
        subject: "Your Investor Deck Request - ThriveMT",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
              <h1 style="color: #000; margin: 0;">Thank You, ${name}!</h1>
            </div>
            <div style="padding: 30px; background: #1a1a1a; color: #fff;">
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for your interest in ThriveMT. We've received your request for our investor deck.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Our investor relations team will review your request and send you the comprehensive deck within 24-48 hours.
              </p>
              <div style="margin-top: 30px; padding: 20px; background: #2a2a2a; border-radius: 8px;">
                <p style="margin: 0; color: #888; font-size: 14px;">
                  <strong style="color: #D4A574;">What to Expect:</strong><br><br>
                  • Market analysis and opportunity size<br>
                  • Business model and unit economics<br>
                  • Growth projections and milestones<br>
                  • Team background and vision
                </p>
              </div>
              <p style="font-size: 14px; color: #888; margin-top: 20px;">
                For immediate inquiries, contact us at <a href="mailto:investor@thrive-mental.com" style="color: #D4A574;">investor@thrive-mental.com</a>
              </p>
            </div>
          </div>
        `,
      });
    } else if (requestType === 'founder_meeting') {
      // Send notification to founder
      await resend.emails.send({
        from: "ThriveMT <noreply@thrive-mental.com>",
        to: ["founder@thrive-mental.com"],
        subject: `Founder Meeting Request - ${name}${company ? ` (${company})` : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
              <h1 style="color: #000; margin: 0;">New Founder Meeting Request</h1>
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
                  <td style="padding: 10px 0; color: #888;">Company:</td>
                  <td style="padding: 10px 0; color: #fff;">${company || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Preferred Times:</td>
                  <td style="padding: 10px 0; color: #fff;">${preferredTimes || "Flexible"}</td>
                </tr>
              </table>
              
              <h3 style="color: #D4A574; margin-top: 30px;">Meeting Purpose</h3>
              <div style="background: #2a2a2a; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
                ${meetingReason}
              </div>
              
              <div style="margin-top: 20px;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Schedule with ${name}
                </a>
              </div>
            </div>
          </div>
        `,
      });

      // Send confirmation to requester
      await resend.emails.send({
        from: "ThriveMT <noreply@thrive-mental.com>",
        to: [email],
        subject: "Meeting Request Received - ThriveMT",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
              <h1 style="color: #000; margin: 0;">Meeting Request Received</h1>
            </div>
            <div style="padding: 30px; background: #1a1a1a; color: #fff;">
              <p style="font-size: 16px; line-height: 1.6;">
                Hi ${name},
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for your interest in meeting with our founder. We've received your request and will reach out within 48 hours to schedule a time.
              </p>
              <div style="margin-top: 30px; padding: 20px; background: #2a2a2a; border-radius: 8px;">
                <p style="margin: 0; color: #888; font-size: 14px;">
                  <strong style="color: #D4A574;">Your Request Summary:</strong><br><br>
                  <strong>Topic:</strong> ${meetingReason}<br>
                  ${preferredTimes ? `<strong>Preferred Times:</strong> ${preferredTimes}` : ''}
                </p>
              </div>
              <p style="font-size: 14px; color: #888; margin-top: 20px;">
                For urgent matters, reach us at <a href="mailto:founder@thrive-mental.com" style="color: #D4A574;">founder@thrive-mental.com</a>
              </p>
            </div>
          </div>
        `,
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-investor-request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
