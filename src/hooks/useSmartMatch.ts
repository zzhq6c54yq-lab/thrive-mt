import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SmartMatchRequest {
  state: string;
  insurance?: string;
  sessionType: string;
  sessionDuration: number;
  preferredTime?: string;
  concerns?: string[];
  selfPayAllowed?: boolean;
}

export interface TherapistMatch {
  therapist: {
    id: string;
    name: string;
    title: string;
    image_url?: string;
    bio?: string;
    specialties: string[];
    rating?: number;
    total_reviews?: number;
    experience_years?: number;
    states_licensed?: string[];
    insurance_panels?: string[];
    npi_number?: string;
    caqh_verified?: boolean;
    availability_schedule?: Record<string, any>;
  };
  eligible: boolean;
  matchReasons: string[];
  sessionRate: number;
  therapistPayout: number;
  platformRevenue: number;
  insuranceMatch: boolean;
}

export interface SmartMatchResponse {
  success: boolean;
  matches: TherapistMatch[];
  summary: {
    totalMatches: number;
    insuranceMatches: number;
    selfPayMatches: number;
    totalPotentialRevenue: number;
    totalTherapistPayout: number;
    totalPlatformRevenue: number;
  };
  request: SmartMatchRequest;
}

export function useSmartMatch() {
  const [lastRequest, setLastRequest] = useState<SmartMatchRequest | null>(null);

  const mutation = useMutation({
    mutationFn: async (request: SmartMatchRequest): Promise<SmartMatchResponse> => {
      const { data, error } = await supabase.functions.invoke('smart-therapist-match', {
        body: request,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      setLastRequest(variables);
    },
  });

  return {
    findMatches: mutation.mutate,
    findMatchesAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    lastRequest,
    reset: mutation.reset,
  };
}

export function useCPTCodes() {
  return useQuery({
    queryKey: ['cpt-codes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cpt_session_codes')
        .select('*')
        .order('session_duration', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

export function useSmartMatchRequests(userId?: string) {
  return useQuery({
    queryKey: ['smart-match-requests', userId],
    queryFn: async () => {
      let query = supabase
        .from('smart_match_requests')
        .select(`
          *,
          therapists (
            name,
            title,
            image_url
          )
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: true,
  });
}

export function useSaveSmartMatchRequest() {
  return useMutation({
    mutationFn: async (request: {
      state: string;
      insurance_provider?: string;
      session_type: string;
      session_duration: number;
      preferred_time?: string;
      concerns?: string[];
      self_pay_allowed?: boolean;
      matched_therapist_id?: string;
      session_rate?: number;
      therapist_payout?: number;
      platform_revenue?: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('smart_match_requests')
        .insert({
          ...request,
          user_id: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
}
