import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false } }
);

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Pricing configuration
const PRICING = {
  Gold: { monthly: 500, yearly: 4800 }, // cents
  Platinum: { monthly: 1000, yearly: 9600 }, // cents
};

function determinePlanTier(amountCents: number): string {
  // Check Platinum pricing first (higher amounts)
  if (amountCents >= 9500 && amountCents <= 10500) return "Platinum"; // ~$10 monthly (with potential add-ons)
  if (amountCents >= 9000 && amountCents <= 11000) return "Platinum"; // ~$96 yearly
  
  // Check Gold pricing
  if (amountCents >= 400 && amountCents <= 700) return "Gold"; // ~$5 monthly
  if (amountCents >= 4500 && amountCents <= 5500) return "Gold"; // ~$48 yearly
  
  // Broader ranges for add-on combinations
  if (amountCents >= 1000) return "Platinum";
  if (amountCents >= 500) return "Gold";
  
  return "Basic";
}

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature) {
    logStep("ERROR: No stripe-signature header");
    return new Response("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Development mode - parse without signature verification
      logStep("WARNING: No webhook secret configured, parsing body directly");
      event = JSON.parse(body);
    }
    
    logStep("Event received", { type: event.type, id: event.id });
  } catch (err) {
    logStep("ERROR: Webhook signature verification failed", { error: err.message });
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        logStep("Processing checkout.session.completed", { sessionId: session.id });
        
        const userId = session.metadata?.user_id;
        const planTitle = session.metadata?.plan_title || "Gold";
        const billingCycle = session.metadata?.billing_cycle || "monthly";
        const selectedAddons = session.metadata?.selected_addons 
          ? JSON.parse(session.metadata.selected_addons) 
          : [];

        if (!userId) {
          logStep("ERROR: No user_id in session metadata");
          break;
        }

        // Get subscription details from Stripe
        const subscriptionId = session.subscription as string;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const amountCents = session.amount_total || 0;

        // Update profile with Stripe customer ID
        await supabaseAdmin
          .from("profiles")
          .update({ stripe_customer_id: session.customer as string })
          .eq("id", userId);

        // Create or update subscription in database
        const { error: subError } = await supabaseAdmin
          .from("subscriptions")
          .upsert({
            user_id: userId,
            plan_tier: planTitle,
            status: "active",
            billing_cycle: billingCycle,
            amount: amountCents / 100,
            currency: session.currency?.toUpperCase() || "USD",
            stripe_subscription_id: subscriptionId,
            next_billing_date: new Date(subscription.current_period_end * 1000).toISOString().split('T')[0],
            payment_method: "stripe",
            started_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, { 
            onConflict: "user_id",
            ignoreDuplicates: false
          });

        if (subError) {
          logStep("ERROR: Failed to create subscription", { error: subError });
        } else {
          logStep("Subscription created/updated successfully", { userId, planTitle });
        }

        // Create payment transaction record
        const { error: txError } = await supabaseAdmin
          .from("payment_transactions")
          .insert({
            user_id: userId,
            amount: amountCents / 100,
            currency: session.currency?.toUpperCase() || "USD",
            payment_method: "stripe",
            payment_gateway: "stripe",
            gateway_transaction_id: session.payment_intent as string,
            status: "completed",
            metadata: {
              session_id: session.id,
              plan_title: planTitle,
              billing_cycle: billingCycle,
              selected_addons: selectedAddons,
            },
          });

        if (txError) {
          logStep("ERROR: Failed to create transaction", { error: txError });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        logStep("Processing invoice.payment_succeeded", { invoiceId: invoice.id });

        if (!invoice.subscription) break;

        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const customerId = invoice.customer as string;

        // Find user by Stripe customer ID
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) {
          logStep("ERROR: No profile found for customer", { customerId });
          break;
        }

        // Update subscription with new billing date
        const { error } = await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "active",
            next_billing_date: new Date(subscription.current_period_end * 1000).toISOString().split('T')[0],
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", profile.id);

        if (error) {
          logStep("ERROR: Failed to update subscription", { error });
        } else {
          logStep("Subscription renewed successfully", { userId: profile.id });
        }

        // Create payment transaction
        await supabaseAdmin
          .from("payment_transactions")
          .insert({
            user_id: profile.id,
            amount: (invoice.amount_paid || 0) / 100,
            currency: invoice.currency?.toUpperCase() || "USD",
            payment_method: "stripe",
            payment_gateway: "stripe",
            gateway_transaction_id: invoice.payment_intent as string,
            status: "completed",
            metadata: {
              invoice_id: invoice.id,
              type: "renewal",
            },
          });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        logStep("Processing invoice.payment_failed", { invoiceId: invoice.id });

        const customerId = invoice.customer as string;

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) break;

        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", profile.id);

        logStep("Subscription marked as past_due", { userId: profile.id });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing customer.subscription.deleted", { subscriptionId: subscription.id });

        const customerId = subscription.customer as string;

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) break;

        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "cancelled",
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", profile.id);

        logStep("Subscription cancelled", { userId: profile.id });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing customer.subscription.updated", { subscriptionId: subscription.id });

        const customerId = subscription.customer as string;

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) break;

        // Determine plan tier from amount
        const item = subscription.items.data[0];
        const amountCents = item?.price?.unit_amount || 0;
        const interval = item?.price?.recurring?.interval;
        const planTier = determinePlanTier(amountCents);

        await supabaseAdmin
          .from("subscriptions")
          .update({
            plan_tier: planTier,
            status: subscription.status === "active" ? "active" : subscription.status,
            billing_cycle: interval === "year" ? "yearly" : "monthly",
            amount: amountCents / 100,
            next_billing_date: new Date(subscription.current_period_end * 1000).toISOString().split('T')[0],
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", profile.id);

        logStep("Subscription updated", { userId: profile.id, planTier });
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    logStep("ERROR: Processing failed", { error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
