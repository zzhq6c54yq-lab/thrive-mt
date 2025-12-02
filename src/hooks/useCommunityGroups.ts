import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useCommunityGroups = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: groups, isLoading } = useQuery({
    queryKey: ["community-groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_groups")
        .select("*")
        .eq("is_active", true)
        .order("member_count", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: memberships } = useQuery({
    queryKey: ["group-memberships", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("group_memberships")
        .select("*, group:community_groups(*)")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const joinGroup = useMutation({
    mutationFn: async (groupId: string) => {
      if (!userId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("group_memberships")
        .insert({
          group_id: groupId,
          user_id: userId,
          role: "member",
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Joined Group!",
        description: "Welcome to the community. Start connecting with others.",
      });
      queryClient.invalidateQueries({ queryKey: ["community-groups"] });
      queryClient.invalidateQueries({ queryKey: ["group-memberships"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Unable to Join",
        description: error.message === "User not authenticated" 
          ? "Please log in to join groups." 
          : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const leaveGroup = useMutation({
    mutationFn: async (groupId: string) => {
      if (!userId) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("group_memberships")
        .delete()
        .eq("group_id", groupId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Left Group",
        description: "You've left the community group.",
      });
      queryClient.invalidateQueries({ queryKey: ["group-memberships"] });
    },
  });

  return {
    groups,
    memberships,
    isLoading,
    joinGroup,
    leaveGroup,
  };
};
