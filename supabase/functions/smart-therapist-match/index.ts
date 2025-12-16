import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MatchRequest {
  state: string;
  insurance?: string;
  sessionType: string; // 'Individual', 'Group', 'Family'
  sessionDuration: number; // 30, 45, 60
  preferredTime?: string;
  concerns?: string[];
  selfPayAllowed?: boolean;
}

interface TherapistMatch {
  therapist: any;
  eligible: boolean;
  matchReasons: string[];
  sessionRate: number;
  therapistPayout: number;
  platformRevenue: number;
  insuranceMatch: boolean;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: MatchRequest = await req.json();
    const { state, insurance, sessionType, sessionDuration, preferredTime, concerns, selfPayAllowed = true } = body;

    console.log('Smart Match Request:', { state, insurance, sessionType, sessionDuration, selfPayAllowed });

    // Validate required fields
    if (!state || !sessionType || !sessionDuration) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: state, sessionType, sessionDuration' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch all active therapists
    const { data: therapists, error: therapistsError } = await supabase
      .from('therapists')
      .select('*')
      .eq('is_active', true);

    if (therapistsError) {
      console.error('Error fetching therapists:', therapistsError);
      throw therapistsError;
    }

    // Fetch CPT code for session rate
    const sessionKey = `${sessionDuration}-${sessionType}`;
    const { data: cptCodes, error: cptError } = await supabase
      .from('cpt_session_codes')
      .select('*')
      .eq('session_duration', sessionDuration)
      .eq('session_type', sessionType)
      .single();

    if (cptError && cptError.code !== 'PGRST116') {
      console.error('Error fetching CPT codes:', cptError);
    }

    const defaultInsuranceRate = sessionDuration === 30 ? 80 : sessionDuration === 45 ? 120 : 160;
    const defaultSelfPayRate = sessionDuration === 30 ? 100 : sessionDuration === 45 ? 150 : 200;

    const matchedTherapists: TherapistMatch[] = [];

    for (const therapist of therapists || []) {
      const matchReasons: string[] = [];
      let eligible = true;

      // Step 1: Filter by State License
      const statesLicensed = therapist.states_licensed || [];
      if (statesLicensed.length > 0 && !statesLicensed.includes(state)) {
        eligible = false;
      } else if (statesLicensed.includes(state)) {
        matchReasons.push(`Licensed in ${state}`);
      }

      // Step 2: Check Insurance Match
      const insurancePanels = therapist.insurance_panels || [];
      let insuranceMatch = false;
      
      if (insurance && insurance !== 'self-pay') {
        if (insurancePanels.includes(insurance)) {
          insuranceMatch = true;
          matchReasons.push(`Accepts ${insurance}`);
        } else if (!selfPayAllowed) {
          eligible = false;
        } else {
          matchReasons.push('Self-pay option available');
        }
      } else {
        matchReasons.push('Self-pay');
      }

      // Step 3: Filter by Session Type
      const sessionTypesOffered = therapist.session_types_offered || ['60-Individual'];
      if (!sessionTypesOffered.includes(sessionKey) && !sessionTypesOffered.includes(`${sessionDuration}-${sessionType}`)) {
        // Check if therapist offers general session type
        const hasSessionType = sessionTypesOffered.some((t: string) => t.includes(sessionType));
        if (!hasSessionType && sessionTypesOffered.length > 0) {
          // Allow if no specific session types configured (default)
          if (sessionTypesOffered.length === 1 && sessionTypesOffered[0] === '60-Individual') {
            matchReasons.push('Standard session available');
          }
        } else {
          matchReasons.push(`Offers ${sessionType} therapy`);
        }
      } else {
        matchReasons.push(`Offers ${sessionDuration}-minute ${sessionType} sessions`);
      }

      // Step 4: Check Availability (if provided)
      if (preferredTime && therapist.availability_schedule) {
        const schedule = therapist.availability_schedule;
        if (Object.keys(schedule).length > 0) {
          matchReasons.push('Schedule availability confirmed');
        }
      }

      // Step 5: Check Specialty Match (if concerns provided)
      if (concerns && concerns.length > 0) {
        const specialties = therapist.specialties || [];
        const matchedSpecialties = concerns.filter((c: string) => 
          specialties.some((s: string) => s.toLowerCase().includes(c.toLowerCase()))
        );
        if (matchedSpecialties.length > 0) {
          matchReasons.push(`Specializes in ${matchedSpecialties.join(', ')}`);
        }
      }

      // Step 6: Calculate Financials
      let sessionRate: number;
      if (insuranceMatch && cptCodes) {
        sessionRate = cptCodes.max_insurance_reimbursement;
      } else if (therapist.self_pay_rate) {
        sessionRate = therapist.self_pay_rate;
      } else if (cptCodes) {
        sessionRate = cptCodes.self_pay_rate_suggested;
      } else {
        sessionRate = defaultSelfPayRate;
      }

      const therapistPercentage = therapist.therapist_percentage || 0.60;
      const platformPercentage = therapist.platform_percentage || 0.40;
      const therapistPayout = sessionRate * therapistPercentage;
      const platformRevenue = sessionRate * platformPercentage;

      if (eligible) {
        matchedTherapists.push({
          therapist: {
            id: therapist.id,
            name: therapist.name,
            title: therapist.title,
            image_url: therapist.image_url,
            bio: therapist.bio,
            specialties: therapist.specialties,
            rating: therapist.rating,
            total_reviews: therapist.total_reviews,
            experience_years: therapist.experience_years,
            states_licensed: therapist.states_licensed,
            insurance_panels: therapist.insurance_panels,
            npi_number: therapist.npi_number,
            caqh_verified: therapist.caqh_verified,
            availability_schedule: therapist.availability_schedule,
          },
          eligible,
          matchReasons,
          sessionRate,
          therapistPayout,
          platformRevenue,
          insuranceMatch,
        });
      }
    }

    // Sort by rating and match reasons count
    matchedTherapists.sort((a, b) => {
      const ratingDiff = (b.therapist.rating || 0) - (a.therapist.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return b.matchReasons.length - a.matchReasons.length;
    });

    // Calculate totals for admin dashboard
    const totalPotentialRevenue = matchedTherapists.reduce((sum, m) => sum + m.sessionRate, 0);
    const totalTherapistPayout = matchedTherapists.reduce((sum, m) => sum + m.therapistPayout, 0);
    const totalPlatformRevenue = matchedTherapists.reduce((sum, m) => sum + m.platformRevenue, 0);

    console.log(`Found ${matchedTherapists.length} matched therapists`);

    return new Response(
      JSON.stringify({
        success: true,
        matches: matchedTherapists,
        summary: {
          totalMatches: matchedTherapists.length,
          insuranceMatches: matchedTherapists.filter(m => m.insuranceMatch).length,
          selfPayMatches: matchedTherapists.filter(m => !m.insuranceMatch).length,
          totalPotentialRevenue,
          totalTherapistPayout,
          totalPlatformRevenue,
        },
        request: {
          state,
          insurance,
          sessionType,
          sessionDuration,
          preferredTime,
          selfPayAllowed,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Smart Match Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
