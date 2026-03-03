
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calendar, ExternalLink, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const HospitalityCommunity: React.FC = () => {
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
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Hospitality Community</h2>
        <p className="text-white/70">
          Connect with peers who understand the unique challenges of restaurant and hospitality work
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discussion Groups - Real from DB */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              Community Groups
            </h3>
            <Button variant="link" className="text-purple-400" onClick={() => navigate("/app/community")}>
              Browse All
            </Button>
          </div>

          {isLoading ? (
            <div className="text-white/60 text-center py-8">Loading groups...</div>
          ) : (
            groups?.slice(0, 3).map((group) => {
              const isMember = myGroupIds.includes(group.id);
              return (
                <Card key={group.id} className="bg-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-white/70 mb-3">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{group.member_count || 0} members</span>
                      {group.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{group.category}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isMember ? (
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => navigate(`/app/community-groups/${group.id}`)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" /> Open Chat
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => handleJoinGroup(group.id)}
                        disabled={joinGroup.isPending}
                      >
                        <UserRoundPlus className="mr-2 h-4 w-4" />
                        {joinGroup.isPending ? "Joining..." : "Join Group"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
        
        {/* Community Events - navigate to community page */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Community Events
          </h3>
          
          <Card className="bg-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Virtual Coffee Hour</CardTitle>
                  <CardDescription>Casual conversation with industry peers</CardDescription>
                </div>
                <Badge className="bg-purple-900 text-purple-300">Tomorrow, 10 AM</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                Join us for a casual virtual coffee hour to connect with others in the hospitality industry.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/app/community")}>
                View in Community
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Industry Mental Health Panel</CardTitle>
                  <CardDescription>Expert discussion on hospitality wellness</CardDescription>
                </div>
                <Badge className="bg-blue-900 text-blue-300">Next Tuesday, 7 PM</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                A panel of mental health experts and industry veterans discuss the unique challenges of hospitality work.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/app/community")}>
                View in Community
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* External Resources */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-white">Industry Support Organizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start bg-white/10" onClick={() => window.open("https://www.restaurantworkershealth.org", "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Restaurant Workers' Health Group
          </Button>
          <Button variant="outline" className="justify-start bg-white/10" onClick={() => window.open("https://www.hospitalityaction.org.uk", "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Hospitality Action
          </Button>
          <Button variant="outline" className="justify-start bg-white/10" onClick={() => window.open("https://www.changingtones.org", "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Chefs With Issues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalityCommunity;
