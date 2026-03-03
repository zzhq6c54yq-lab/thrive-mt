
import React from "react";
import { Users, MessageSquare, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

const ChronicIllnessCommunity: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { groups, memberships, isLoading, joinGroup } = useCommunityGroups(user?.id);
  const { toast } = useToast();

  const myGroupIds = memberships?.map(m => m.group_id) || [];

  const handleJoinGroup = (groupId: string) => {
    if (!user?.id) {
      toast({
        title: "Please Log In",
        description: "You need to be logged in to join groups.",
        variant: "destructive",
      });
      return;
    }
    joinGroup.mutate(groupId);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Chronic Illness Community</h2>
        <p className="text-purple-700 dark:text-purple-300">
          Connect with others who understand the challenges of living with chronic conditions.
        </p>
      </div>
      
      {/* Support Groups Section - Real from DB */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Support Groups
          </h3>
          <Button variant="link" className="text-purple-400" onClick={() => navigate("/app/community")}>
            Browse All Groups
          </Button>
        </div>

        {isLoading ? (
          <div className="text-muted-foreground text-center py-8">Loading groups...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groups?.slice(0, 3).map((group) => {
              const isMember = myGroupIds.includes(group.id);
              return (
                <Card key={group.id} className="bg-white dark:bg-gray-800/50 border-purple-200 dark:border-purple-900/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-purple-800 dark:text-purple-200">{group.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-purple-600" />
                        {group.member_count || 0} members
                      </span>
                      {group.category && (
                        <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700">
                          {group.category}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isMember ? (
                      <Button
                        onClick={() => navigate(`/app/community-groups/${group.id}`)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Open Chat
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleJoinGroup(group.id)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={joinGroup.isPending}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {joinGroup.isPending ? "Joining..." : "Join Group"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChronicIllnessCommunity;
