import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCoach(coachId: string | undefined) {
  return useQuery({
    queryKey: ["coach", coachId],
    queryFn: async () => {
      if (!coachId) throw new Error("Coach ID is required");
      
      const { data: coach, error } = await supabase
        .from("coaches")
        .select("*")
        .eq("id", coachId)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return coach;
    },
    enabled: !!coachId,
  });
}
