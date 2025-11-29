import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const COACH_CODE = "0003";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessCode } = await req.json();

    if (!accessCode) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Access code required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Simple validation - check if code matches
    if (accessCode === COACH_CODE) {
      return new Response(
        JSON.stringify({ 
          valid: true, 
          coachName: "Maya Thompson",
          message: "Hey Maya! Welcome back! 👋"
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "Hmm, that code doesn't look right. Try again?" 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error validating coach access:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Something went wrong. Give it another shot!' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
