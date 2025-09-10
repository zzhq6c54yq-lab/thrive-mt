import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Create Supabase client using the service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get the plan details from the request body
    const { planTitle, billingCycle = 'monthly' } = await req.json();
    logStep("Request body parsed", { planTitle, billingCycle });

    // Define pricing
    const planPricing = {
      'Basic': { monthly: 0, yearly: 0 },
      'Gold': { monthly: 500, yearly: 4800 }, // $5/month, $48/year (20% discount)
      'Platinum': { monthly: 1000, yearly: 9600 } // $10/month, $96/year (20% discount)
    };

    const pricing = planPricing[planTitle as keyof typeof planPricing];
    if (!pricing) throw new Error(`Invalid plan: ${planTitle}`);

    const amount = pricing[billingCycle as keyof typeof pricing];
    logStep("Pricing calculated", { planTitle, billingCycle, amount });

    // For free plan, just update the database and return success
    if (amount === 0) {
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        subscribed: true,
        subscription_tier: planTitle,
        subscription_end: null, // Free plan doesn't expire
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });

      logStep("Free plan activated");
      return new Response(JSON.stringify({ success: true, message: "Free plan activated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `${planTitle} Plan`,
              description: `ThriveMT ${planTitle} subscription - ${billingCycle} billing`
            },
            unit_amount: amount,
            recurring: { interval: billingCycle === 'yearly' ? 'year' : 'month' },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/subscription-plans`,
      metadata: {
        user_id: user.id,
        plan_title: planTitle,
        billing_cycle: billingCycle
      }
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});