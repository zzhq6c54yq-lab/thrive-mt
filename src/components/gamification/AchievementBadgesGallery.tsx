import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useUserBadges } from "@/hooks/useUserBadges";
import { useUser } from "@/contexts/UserContext";
import { BadgeCard } from "./BadgeCard";
import { Skeleton } from "@/components/ui/skeleton";

export function AchievementBadgesGallery() {
  const { user } = useUser();
  const { data: badgesData, isLoading } = useUserBadges(user?.id);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!badgesData) return null;

  const { allBadges, earnedBadges, totalPoints, earnedCount, totalCount, lockedBadges } = badgesData;

  const categories = ["all", ...new Set(allBadges.map(b => b.category))];

  const earnedBadgeKeys = new Set(earnedBadges.map(eb => eb.badge_key));

  const filteredBadges = selectedCategory === "all"
    ? allBadges
    : allBadges.filter(b => b.category === selectedCategory);

  const earnedFiltered = filteredBadges.filter(b => earnedBadgeKeys.has(b.badge_key));
  const lockedFiltered = filteredBadges.filter(b => !earnedBadgeKeys.has(b.badge_key));

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <Card className="bg-gradient-to-br from-[#D4A574]/10 to-[#B87333]/10 border-[#D4A574]/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Trophy className="w-10 h-10 mx-auto mb-2 text-[#D4AF37]" />
              <div className="text-3xl font-bold bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent">
                {totalPoints}
              </div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {earnedCount}
              </div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-muted-foreground">
                {lockedBadges.length}
              </div>
              <div className="text-sm text-muted-foreground">Locked Badges</div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Collection Progress</span>
              <span className="font-medium">
                {Math.round((earnedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(earnedCount / totalCount) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#D4A574] to-[#B87333]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-6 flex-wrap h-auto">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="capitalize">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-6">
              {/* Earned Badges */}
              {earnedFiltered.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#D4AF37]" />
                    Earned ({earnedFiltered.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {earnedFiltered.map((badge, index) => {
                      const userBadge = earnedBadges.find(eb => eb.badge_key === badge.badge_key);
                      return (
                        <BadgeCard
                          key={badge.id}
                          badge={{
                            id: badge.id,
                            name: badge.title,
                            description: badge.description,
                            icon_name: badge.icon_name,
                            category: badge.category,
                            points_value: badge.points_value,
                          }}
                          earned={true}
                          earnedAt={userBadge?.earned_at}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Locked Badges */}
              {lockedFiltered.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    Locked ({lockedFiltered.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {lockedFiltered.map((badge, index) => (
                      <BadgeCard
                        key={badge.id}
                        badge={{
                          id: badge.id,
                          name: badge.title,
                          description: badge.description,
                          icon_name: badge.icon_name,
                          category: badge.category,
                          points_value: badge.points_value,
                        }}
                        earned={false}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}