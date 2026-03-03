
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Calendar, MapPin, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const TransportCommunity: React.FC = () => {
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
        <h2 className="text-2xl font-bold mb-2 text-white">Transport Industry Community</h2>
        <p className="text-white/70">
          Connect with fellow transportation workers who understand your unique challenges
        </p>
      </div>
      
      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Support Groups</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Support Groups - Real from DB */}
        <TabsContent value="groups">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Community Groups</h3>
            <Button variant="link" className="text-blue-400" onClick={() => navigate("/app/community")}>
              Browse All Groups
            </Button>
          </div>

          {isLoading ? (
            <div className="text-white/60 text-center py-8">Loading groups...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups?.slice(0, 4).map((group) => {
                const isMember = myGroupIds.includes(group.id);
                return (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-500" />
                          {group.name}
                        </CardTitle>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                          {group.member_count || 0} members
                        </span>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {group.category && (
                        <Badge variant="outline">{group.category}</Badge>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {isMember ? (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => navigate(`/app/community-groups/${group.id}`)}
                          >
                            Open Chat
                          </Button>
                          <Badge className="bg-green-500/30 text-green-300">Joined</Badge>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleJoinGroup(group.id)}
                          className="bg-blue-500 hover:bg-blue-600 w-full"
                          disabled={joinGroup.isPending}
                        >
                          {joinGroup.isPending ? "Joining..." : "Join Group"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        {/* Events - link to community */}
        <TabsContent value="events">
          <div className="space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Wellness Events & Meetups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join community events to connect with other transportation workers in person and online.
                </p>
                <Button onClick={() => navigate("/app/community")} className="bg-blue-500 hover:bg-blue-600">
                  View Community Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Community Guidelines</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Our community is built on mutual respect, understanding, and support. All conversations are confidential.
        </p>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Be respectful and supportive of all community members</li>
          <li>• Keep discussions confidential</li>
          <li>• If you or someone you know is in crisis, call 988 (Suicide & Crisis Lifeline)</li>
        </ul>
      </div>
    </div>
  );
};

export default TransportCommunity;
