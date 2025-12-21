import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
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

    // First, check if user has a subscription in the database
    const { data: existingSub } = await supabaseClient
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (existingSub && existingSub.status === "active") {
      logStep("Found active subscription in database", { 
        tier: existingSub.plan_tier, 
        nextBilling: existingSub.next_billing_date 
      });
      
      return new Response(JSON.stringify({
        subscribed: true,
        subscription_tier: existingSub.plan_tier,
        subscription_end: existingSub.next_billing_date,
        billing_cycle: existingSub.billing_cycle,
        amount: existingSub.amount,
        status: existingSub.status,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // If no active subscription in DB, check Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No Stripe customer found, returning Basic tier");
      
      // Ensure user has a Basic subscription in DB
      await supabaseClient
        .from("subscriptions")
        .upsert({
          user_id: user.id,
          plan_tier: "Basic",
          status: "active",
          billing_cycle: "monthly",
          amount: 0,
          currency: "USD",
          payment_method: "free",
          updated_at: new Date().toISOString(),
        }, { 
          onConflict: "user_id",
          ignoreDuplicates: false
        });

      return new Response(JSON.stringify({ 
        subscribed: true, 
        subscription_tier: "Basic", 
        subscription_end: null,
        billing_cycle: "monthly",
        amount: 0,
        status: "active",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Update profile with Stripe customer ID
    await supabaseClient
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    if (subscriptions.data.length === 0) {
      logStep("No active Stripe subscription, returning Basic tier");
      
      // Update DB to reflect Basic tier
      await supabaseClient
        .from("subscriptions")
        .upsert({
          user_id: user.id,
          plan_tier: "Basic",
          status: "active",
          billing_cycle: "monthly",
          amount: 0,
          currency: "USD",
          payment_method: "free",
          updated_at: new Date().toISOString(),
        }, { 
          onConflict: "user_id",
          ignoreDuplicates: false
        });

      return new Response(JSON.stringify({ 
        subscribed: true, 
        subscription_tier: "Basic", 
        subscription_end: null,
        billing_cycle: "monthly",
        amount: 0,
        status: "active",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Has active Stripe subscription
    const subscription = subscriptions.data[0];
    const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
    const item = subscription.items.data[0];
    const priceAmount = item.price.unit_amount || 0;
    const interval = item.price.recurring?.interval;
    
    // Determine tier based on price
    let subscriptionTier = "Basic";
    if (priceAmount >= 900 && priceAmount <= 1500) {
      subscriptionTier = "Platinum"; // ~$10 monthly
    } else if (priceAmount >= 9000 && priceAmount <= 12000) {
      subscriptionTier = "Platinum"; // ~$96 yearly + add-ons
    } else if (priceAmount >= 400 && priceAmount <= 800) {
      subscriptionTier = "Gold"; // ~$5 monthly
    } else if (priceAmount >= 4500 && priceAmount <= 6000) {
      subscriptionTier = "Gold"; // ~$48 yearly + add-ons
    } else if (priceAmount > 1500) {
      subscriptionTier = "Platinum"; // Higher amounts with add-ons
    } else if (priceAmount > 0) {
      subscriptionTier = "Gold"; // Any paid amount
    }
    
    logStep("Determined subscription tier", { priceAmount, interval, subscriptionTier });

    // Sync to database
    const { error: syncError } = await supabaseClient
      .from("subscriptions")
      .upsert({
        user_id: user.id,
        plan_tier: subscriptionTier,
        status: "active",
        billing_cycle: interval === "year" ? "yearly" : "monthly",
        amount: priceAmount / 100,
        currency: "USD",
        stripe_subscription_id: subscription.id,
        next_billing_date: subscriptionEnd.split('T')[0],
        payment_method: "stripe",
        updated_at: new Date().toISOString(),
      }, { 
        onConflict: "user_id",
        ignoreDuplicates: false
      });

    if (syncError) {
      logStep("ERROR: Failed to sync subscription to DB", { error: syncError });
    }

    logStep("Returning subscription info", { subscribed: true, subscriptionTier });
    return new Response(JSON.stringify({
      subscribed: true,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      billing_cycle: interval === "year" ? "yearly" : "monthly",
      amount: priceAmount / 100,
      status: "active",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});