import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod schema for input validation
const RequestSchema = z.object({
  addOnId: z.string().min(1, "Add-on ID is required").max(100),
  addOnTitle: z.string().min(1, "Add-on title is required").max(200),
  selectedPlan: z.string().max(50).optional(),
  billingCycle: z.enum(['monthly', 'yearly']).default('monthly'),
});

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECKOUT-ADDON] ${step}${detailsStr}`);
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

    const { addOnId, addOnTitle, selectedPlan, billingCycle } = parseResult.data;
    logStep("Request body parsed", { addOnId, addOnTitle, selectedPlan, billingCycle });

    // Calculate price based on selected plan
    let price = 3.00; // Default Basic plan price
    if (selectedPlan) {
      const plan = selectedPlan.toLowerCase();
      if (plan.includes('platinum')) price = 1.00;
      else if (plan.includes('gold')) price = 2.00;
    }

    // Convert to cents for Stripe
    const amount = Math.round(price * 100);
    logStep("Price calculated", { selectedPlan, price, amountCents: amount });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    }

    // Create checkout session for individual add-on
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `${addOnTitle} Add-on`,
              description: `ThriveMT ${addOnTitle} specialized program - ${billingCycle} billing`
            },
            unit_amount: amount,
            recurring: { interval: billingCycle === 'yearly' ? 'year' : 'month' },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&addon=${addOnId}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        user_id: user.id,
        addon_id: addOnId,
        addon_title: addOnTitle,
        billing_cycle: billingCycle,
        selected_plan: selectedPlan || 'Basic',
        type: 'addon_only'
      }
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in checkout-addon", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
