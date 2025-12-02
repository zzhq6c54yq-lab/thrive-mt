import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Badge {
  id: string;
  badge_key: string;
  title: string;
  description: string;
  icon_name: string;
  category: string;
  tier: string;
  points_value: number;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_key: string;
  earned_at: string;
  progress: number;
  completed: boolean;
}

export function useUserBadges(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-badges", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID required");

      // Fetch all badge definitions
      const { data: allBadges, error: badgesError } = await supabase
        .from("achievement_badges")
        .select("*")
        .order("points_value", { ascending: true });

      if (badgesError) throw badgesError;

      // Fetch user's earned badges
      const { data: userBadges, error: earnedError } = await supabase
        .from("user_badges")
        .select("*")
        .eq("user_id", userId);

      if (earnedError) throw earnedError;

      // Map user badges with full badge details
      const earnedBadges = userBadges?.map(ub => {
        const badge = allBadges?.find(b => b.badge_key === ub.badge_key);
        return { ...ub, badge };
      }) || [];

      // Calculate total points
      const totalPoints = earnedBadges
        .filter(eb => eb.completed && eb.badge)
        .reduce((sum, eb) => sum + (eb.badge?.points_value || 0), 0);

      const earnedBadgeKeys = new Set(
        earnedBadges.filter(eb => eb.completed).map(eb => eb.badge_key)
      );

      return {
        allBadges: allBadges || [],
        earnedBadges: earnedBadges.filter(eb => eb.completed),
        userBadges: userBadges || [],
        totalPoints,
        earnedCount: earnedBadgeKeys.size,
        totalCount: allBadges?.length || 0,
        lockedBadges: allBadges?.filter(b => !earnedBadgeKeys.has(b.badge_key)) || [],
      };
    },
    enabled: !!userId,
  });
}