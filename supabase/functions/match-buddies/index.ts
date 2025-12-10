import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  preferences: z.object({
    goals: z.array(z.string()).optional(),
    communicationStyle: z.string().optional(),
    frequency: z.string().optional(),
    timezone: z.string().optional()
  }).optional()
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate request body with Zod
    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request', details: parseResult.error.format() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { userId, preferences } = parseResult.data;
    
    // Validate that the requesting user matches the userId
    if (userId !== user.id) {
      return new Response(
        JSON.stringify({ error: 'User ID mismatch' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[match-buddies] Processing match request for user: ${userId}`);
    console.log(`[match-buddies] Preferences:`, preferences);

    // Check if user already has an active match
    const { data: existingMatch } = await supabase
      .from('buddy_matches')
      .select('*')
      .or(`user_1_id.eq.${userId},user_2_id.eq.${userId}`)
      .eq('status', 'active')
      .single();

    if (existingMatch) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'You already have an active buddy match',
          match: existingMatch 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Look for pending match requests from other users
    const { data: pendingRequests, error: pendingError } = await supabase
      .from('buddy_matches')
      .select('*, user_1:profiles!buddy_matches_user_1_id_fkey(id, display_name, avatar_url)')
      .eq('status', 'pending')
      .neq('user_1_id', userId)
      .is('user_2_id', null)
      .limit(10);

    if (pendingError) {
      console.error('[match-buddies] Error fetching pending requests:', pendingError);
    }

    // Simple matching algorithm - find a compatible match based on shared goals
    let bestMatch = null;
    let bestScore = 0;

    if (pendingRequests && pendingRequests.length > 0) {
      for (const request of pendingRequests) {
        const requestGoals = request.goals_shared?.goals || [];
        const userGoals = preferences?.goals || [];
        
        // Calculate match score based on shared goals
        const sharedGoals = userGoals.filter((goal: string) => 
          requestGoals.includes(goal)
        );
        const score = sharedGoals.length;

        if (score > bestScore) {
          bestScore = score;
          bestMatch = request;
        }
      }
    }

    if (bestMatch) {
      // Found a match! Update the pending request
      const { data: updatedMatch, error: updateError } = await supabase
        .from('buddy_matches')
        .update({
          user_2_id: userId,
          status: 'active',
          matched_at: new Date().toISOString(),
          goals_shared: {
            ...bestMatch.goals_shared,
            user_2_goals: preferences?.goals || []
          }
        })
        .eq('id', bestMatch.id)
        .select('*, user_1:profiles!buddy_matches_user_1_id_fkey(id, display_name, avatar_url), user_2:profiles!buddy_matches_user_2_id_fkey(id, display_name, avatar_url)')
        .single();

      if (updateError) {
        console.error('[match-buddies] Error updating match:', updateError);
        throw updateError;
      }

      console.log(`[match-buddies] Match found! Paired ${userId} with ${bestMatch.user_1_id}`);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Match found!',
          match: updatedMatch,
          buddyProfile: updatedMatch.user_1
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // No compatible match found, create a pending request
      const { data: newRequest, error: insertError } = await supabase
        .from('buddy_matches')
        .insert({
          user_1_id: userId,
          status: 'pending',
          goals_shared: {
            goals: preferences?.goals || [],
            communication_style: preferences?.communicationStyle,
            frequency: preferences?.frequency,
            timezone: preferences?.timezone
          }
        })
        .select()
        .single();

      if (insertError) {
        console.error('[match-buddies] Error creating request:', insertError);
        throw insertError;
      }

      console.log(`[match-buddies] No match found, created pending request for ${userId}`);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Match request submitted! We\'ll notify you when we find a compatible buddy.',
          pending: true,
          request: newRequest
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('[match-buddies] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
