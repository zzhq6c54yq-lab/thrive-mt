import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Parse request
    const { targetPortal } = await req.json().catch(() => ({}));

    // Check subscription using service role for reliable access
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: subscription, error: subError } = await serviceClient
      .from("subscriptions")
      .select("subscription_tier, status")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle();

    if (subError) {
      console.error("Subscription lookup error:", subError);
      return new Response(
        JSON.stringify({ error: "Unable to verify subscription" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isTrinity = subscription?.subscription_tier === "Trinity";

    if (!isTrinity) {
      return new Response(
        JSON.stringify({
          authorized: false,
          tier: subscription?.subscription_tier || "Free",
          message: "Trinity subscription required for cross-platform access.",
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user profile for cross-platform welcome
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("display_name, email, avatar_url")
      .eq("id", userId)
      .single();

    // Log cross-platform access
    await serviceClient.from("audit_logs").insert({
      user_id: userId,
      action: "TRINITY_CROSS_PLATFORM_ACCESS",
      table_name: "verify-trinity-access",
      record_id: targetPortal || "general",
      actor_role: "trinity_subscriber",
    });

    return new Response(
      JSON.stringify({
        authorized: true,
        tier: "Trinity",
        userId,
        profile: {
          displayName: profile?.display_name,
          email: profile?.email,
          avatarUrl: profile?.avatar_url,
        },
        accessiblePortals: ["thrive-st", "thrive-pt", "thrive-mt"],
        message: `Welcome back, ${profile?.display_name || "valued member"}! Your Trinity subscription grants you elite access across all Thrive platforms.`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("verify-trinity-access error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
