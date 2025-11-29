import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCoaches(specialties?: string[]) {
  return useQuery({
    queryKey: ["coaches", specialties],
    queryFn: async () => {
      let query = supabase
        .from("coaches")
        .select("*")
        .eq("is_active", true)
        .order("rating", { ascending: false });

      if (specialties && specialties.length > 0) {
        query = query.overlaps("specialties", specialties);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
}
