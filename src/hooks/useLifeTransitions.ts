import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLifeTransitions = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: programs, isLoading } = useQuery({
    queryKey: ["life-transition-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("life_transition_programs")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const { data: enrollments } = useQuery({
    queryKey: ["transition-enrollments", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("user_transition_progress")
        .select("*, program:life_transition_programs(*)")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const enrollInProgram = useMutation({
    mutationFn: async (programId: string) => {
      if (!userId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("user_transition_progress")
        .insert({
          user_id: userId,
          program_id: programId,
          current_week: 1,
          notes: {},
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Enrolled Successfully!",
        description: "Your life transition journey begins now.",
      });
      queryClient.invalidateQueries({ queryKey: ["transition-enrollments"] });
    },
  });

  const updateProgress = useMutation({
    mutationFn: async ({ enrollmentId, notes }: { enrollmentId: string; notes: any }) => {
      const { error } = await supabase
        .from("user_transition_progress")
        .update({ notes })
        .eq("id", enrollmentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transition-enrollments"] });
    },
  });

  return {
    programs,
    enrollments,
    isLoading,
    enrollInProgram,
    updateProgress,
  };
};
