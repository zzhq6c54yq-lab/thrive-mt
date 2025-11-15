import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTherapist(therapistId: string | undefined) {
  return useQuery({
    queryKey: ["therapist", therapistId],
    queryFn: async () => {
      if (!therapistId) throw new Error("Therapist ID is required");
      
      const { data: therapist, error: therapistError } = await supabase
        .from("therapists")
        .select("*")
        .eq("id", therapistId)
        .eq("is_active", true)
        .single();

      if (therapistError) throw therapistError;

      const { data: availability, error: availabilityError } = await supabase
        .from("therapist_availability")
        .select("*")
        .eq("therapist_id", therapistId)
        .eq("is_available", true)
        .order("day_of_week", { ascending: true });

      if (availabilityError) throw availabilityError;

      return { therapist, availability };
    },
    enabled: !!therapistId,
  });
}
