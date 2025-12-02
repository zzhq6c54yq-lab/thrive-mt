import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSupportCircle = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ["support-circle", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("support_circle_members")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });

  const inviteMember = useMutation({
    mutationFn: async (member: {
      member_email: string;
      member_name: string;
      relationship: string;
    }) => {
      if (!userId) throw new Error("User not authenticated");

      const invite_token = crypto.randomUUID();

      const { error } = await supabase
        .from("support_circle_members")
        .insert({
          user_id: userId,
          ...member,
          invite_token,
          status: "pending",
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Invitation Sent!",
        description: "Your support person will receive an email invitation.",
      });
      queryClient.invalidateQueries({ queryKey: ["support-circle"] });
    },
  });

  const removeMember = useMutation({
    mutationFn: async (memberId: string) => {
      const { error } = await supabase
        .from("support_circle_members")
        .delete()
        .eq("id", memberId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Member Removed",
        description: "Support circle member has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["support-circle"] });
    },
  });

  const updatePermissions = useMutation({
    mutationFn: async ({ memberId, permissionType, enabled }: { 
      memberId: string; 
      permissionType: string;
      enabled: boolean;
    }) => {
      const { error } = await supabase
        .from("support_circle_permissions")
        .upsert({
          member_id: memberId,
          permission_type: permissionType,
          enabled,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Permissions Updated",
        description: "Support circle member permissions have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["support-circle"] });
    },
  });

  return {
    members,
    isLoading,
    inviteMember,
    removeMember,
    updatePermissions,
  };
};
