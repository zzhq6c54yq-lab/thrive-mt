import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTherapists(specialties?: string[]) {
  return useQuery({
    queryKey: ["therapists", specialties],
    queryFn: async () => {
      let query = supabase
        .from("therapists")
        .select("*")
        .eq("is_active", true)
        .order("rating", { ascending: false });

      // Filter by specialties if provided
      if (specialties && specialties.length > 0) {
        query = query.overlaps("specialties", specialties);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
}

export function useTherapistBookings(userId: string) {
  return useQuery({
    queryKey: ["user-bookings", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("therapy_bookings")
        .select(`
          *,
          therapists (
            name,
            title,
            image_url
          )
        `)
        .eq("user_id", userId)
        .order("appointment_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}
