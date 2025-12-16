import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CareerApplicationRequest {
  fullName: string;
  email: string;
  phone?: string;
  position: string;
  coverLetter?: string;
  resumeUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, position, coverLetter, resumeUrl }: CareerApplicationRequest = await req.json();

    console.log("Processing career application from:", fullName, email);

    // Send notification email to hiring team
    const hiringEmailResponse = await resend.emails.send({
      from: "ThriveMT Careers <noreply@thrive-mental.com>",
      to: ["hiring@thrive-mental.com"],
      subject: `New Job Application: ${position} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">New Job Application</h1>
          </div>
          <div style="padding: 30px; background: #1a1a1a; color: #fff;">
            <h2 style="color: #D4A574; margin-top: 0;">Applicant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #888;">Name:</td>
                <td style="padding: 10px 0; color: #fff;"><strong>${fullName}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Email:</td>
                <td style="padding: 10px 0; color: #fff;"><a href="mailto:${email}" style="color: #D4A574;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Phone:</td>
                <td style="padding: 10px 0; color: #fff;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Position:</td>
                <td style="padding: 10px 0; color: #fff;"><strong>${position}</strong></td>
              </tr>
            </table>
            
            ${coverLetter ? `
              <h3 style="color: #D4A574; margin-top: 30px;">Cover Letter</h3>
              <div style="background: #2a2a2a; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
                ${coverLetter}
              </div>
            ` : ""}
            
            ${resumeUrl ? `
              <div style="margin-top: 30px;">
                <a href="${resumeUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  View Resume
                </a>
              </div>
            ` : ""}
          </div>
          <div style="padding: 20px; background: #0d0d0d; text-align: center; color: #666; font-size: 12px;">
            <p>This is an automated notification from ThriveMT Careers Portal</p>
          </div>
        </div>
      `,
    });

    console.log("Hiring team email sent:", hiringEmailResponse);

    // Send confirmation email to applicant
    const applicantEmailResponse = await resend.emails.send({
      from: "ThriveMT Careers <noreply@thrive-mental.com>",
      to: [email],
      subject: "We Received Your Application - ThriveMT",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #D4A574 0%, #B87333 100%); padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Thank You, ${fullName}!</h1>
          </div>
          <div style="padding: 30px; background: #1a1a1a; color: #fff;">
            <p style="font-size: 16px; line-height: 1.6;">
              We're excited to receive your application for the <strong style="color: #D4A574;">${position}</strong> position at ThriveMT.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Our team will carefully review your application and get back to you within 5-7 business days if your qualifications match our current needs.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to learn more about our mission and values at <a href="https://thrive-mental.com" style="color: #D4A574;">thrive-mental.com</a>.
            </p>
            <div style="margin-top: 30px; padding: 20px; background: #2a2a2a; border-radius: 8px;">
              <p style="margin: 0; color: #888; font-size: 14px;">
                <strong style="color: #D4A574;">What's Next?</strong><br><br>
                • We'll review your application thoroughly<br>
                • If there's a fit, we'll reach out to schedule an interview<br>
                • Questions? Reply to this email or contact hiring@thrive-mental.com
              </p>
            </div>
          </div>
          <div style="padding: 20px; background: #0d0d0d; text-align: center; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} ThriveMT. Building the future of mental health care.</p>
          </div>
        </div>
      `,
    });

    console.log("Applicant confirmation email sent:", applicantEmailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-career-application:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
