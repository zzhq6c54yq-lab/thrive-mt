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
        .select(`
          *,
          user_1:profiles!buddy_matches_user_1_id_fkey(id, display_name, avatar_url),
          user_2:profiles!buddy_matches_user_2_id_fkey(id, display_name, avatar_url)
        `)
        .or(`user_1_id.eq.${userId},user_2_id.eq.${userId}`)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      return data;
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
    return currentMatch.user_1_id === userId 
      ? currentMatch.user_2 
      : currentMatch.user_1;
  };

  return {
    currentMatch,
    isLoading,
    createMatchRequest,
    getBuddyId,
    getBuddyProfile,
  };
};
