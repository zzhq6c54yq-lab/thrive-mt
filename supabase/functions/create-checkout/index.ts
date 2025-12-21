import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Pricing configuration (in cents)
const PLAN_PRICING = {
  Basic: { monthly: 0, yearly: 0 },
  Gold: { monthly: 500, yearly: 4800 }, // $5/month, $48/year (20% off)
  Platinum: { monthly: 1000, yearly: 9600 }, // $10/month, $96/year (20% off)
};

const ADDON_PRICING = {
  Basic: 300, // $3/month per add-on
  Gold: 200,  // $2/month per add-on
  Platinum: 100, // $1/month per add-on
};

// Zod schema for input validation
const RequestSchema = z.object({
  planTitle: z.enum(['Basic', 'Gold', 'Platinum']),
  billingCycle: z.enum(['monthly', 'yearly']).default('monthly'),
  selectedAddOns: z.array(z.string()).max(20).default([]),
});

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

    const rawBody = await req.json();
    
    // Validate input with Zod
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      logStep("Validation error", parseResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request',
          details: parseResult.error.errors.map(e => e.message)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { planTitle, billingCycle, selectedAddOns } = parseResult.data;
    logStep("Request body parsed", { planTitle, billingCycle, selectedAddOns });

    // Calculate total amount
    const planPricing = PLAN_PRICING[planTitle];
    const basePriceCents = billingCycle === 'yearly' ? planPricing.yearly : planPricing.monthly;
    
    // Calculate add-on pricing
    const addonPricePerUnit = ADDON_PRICING[planTitle];
    const addonsTotalCents = selectedAddOns.length * addonPricePerUnit * (billingCycle === 'yearly' ? 12 : 1);
    
    const totalAmountCents = basePriceCents + addonsTotalCents;
    const totalAmountDollars = totalAmountCents / 100;

    logStep("Amount calculated", { 
      planTitle, 
      billingCycle, 
      basePriceCents, 
      addonsTotalCents, 
      totalAmountCents,
      totalAmountDollars
    });

    // For free plan with no add-ons, just create/update subscription and return success
    if (totalAmountCents === 0) {
      const { error: subError } = await supabaseClient
        .from("subscriptions")
        .upsert({
          user_id: user.id,
          plan_tier: planTitle,
          status: "active",
          billing_cycle: billingCycle,
          amount: 0,
          currency: "USD",
          payment_method: "free",
          started_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { 
          onConflict: "user_id",
          ignoreDuplicates: false
        });

      if (subError) {
        logStep("ERROR: Failed to create free subscription", { error: subError });
        throw new Error("Failed to activate free plan");
      }

      logStep("Free plan activated");
      return new Response(JSON.stringify({ success: true, message: "Free plan activated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
      
      // Update profile with Stripe customer ID
      await supabaseClient
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Build product description
    const addonsText = selectedAddOns.length > 0 
      ? ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}`
      : '';
    const productName = `ThriveMT ${planTitle} Plan${addonsText}`;
    const productDescription = `${billingCycle === 'yearly' ? 'Annual' : 'Monthly'} subscription - ${planTitle} tier mental wellness access${addonsText}`;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: productName,
              description: productDescription,
            },
            unit_amount: totalAmountCents,
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
        billing_cycle: billingCycle,
        selected_addons: JSON.stringify(selectedAddOns),
        total_amount_cents: totalAmountCents.toString(),
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
