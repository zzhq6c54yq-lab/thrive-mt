import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useBuddyMatch = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: currentMatch, isLoading } = useQuery({
    queryKey: ["buddy-match", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("buddy_matches")
        .select("*")
        .or(`user_1_id.eq.${userId},user_2_id.eq.${userId}`)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Fetch buddy profile separately since there are no FK constraints
      const buddyId = data.user_1_id === userId ? data.user_2_id : data.user_1_id;
      const { data: buddyProfile } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("id", buddyId)
        .maybeSingle();

      return {
        ...data,
        buddy_profile: buddyProfile,
      };
    },
    enabled: !!userId,
  });

  const createMatchRequest = useMutation({
    mutationFn: async (preferences: any) => {
      if (!userId) throw new Error("User not authenticated");

      const { data, error } = await supabase.functions.invoke("match-buddies", {
        body: { userId, preferences },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Match request submitted!",
        description: "We're finding the perfect accountability buddy for you.",
      });
      queryClient.invalidateQueries({ queryKey: ["buddy-match"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit match request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getBuddyId = () => {
    if (!currentMatch || !userId) return null;
    return currentMatch.user_1_id === userId 
      ? currentMatch.user_2_id 
      : currentMatch.user_1_id;
  };

  const getBuddyProfile = () => {
    if (!currentMatch || !userId) return null;
    return currentMatch.buddy_profile;
  };

  return {
    currentMatch,
    isLoading,
    createMatchRequest,
    getBuddyId,
    getBuddyProfile,
  };
};
