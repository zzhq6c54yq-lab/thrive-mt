
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users, Calendar, Shield, Medal, Sparkles } from "lucide-react";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

const DoDCommunity = () => {
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

  const communityPosts = [
    {
      id: "p1",
      author: { name: "Michael R.", avatar: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png", role: "Army Veteran" },
      content: "Found the mindfulness techniques from yesterday's workshop really helpful for managing my anxiety. Anyone else implement these in their daily routine?",
      likes: 23, comments: 8, time: "2 hours ago"
    },
    {
      id: "p2",
      author: { name: "Sarah J.", avatar: "", role: "Marine Corps, Active" },
      content: "Just completed my first week of the transition program. The resume building session was incredibly valuable - highly recommend to anyone preparing for civilian job hunting.",
      likes: 17, comments: 5, time: "4 hours ago"
    },
    {
      id: "p3",
      author: { name: "James T.", avatar: "", role: "Air Force Veteran" },
      content: "Looking for recommendations on sleep hygiene techniques that have worked well for other veterans dealing with insomnia.",
      likes: 31, comments: 14, time: "Yesterday"
    }
  ];

  const successStories = [
    { id: "ss1", title: "Finding Purpose After Service", quote: "The PTSD program and community support helped me find my footing when I felt lost after leaving the Marines.", author: "David M., Marine Corps Veteran", featured: true },
    { id: "ss2", title: "Family Healing Journey", quote: "The family therapy sessions helped my wife and kids understand what I was going through.", author: "Robert K., Army Veteran", featured: false },
    { id: "ss3", title: "From Struggle to Strength", quote: "After three deployments, I didn't recognize myself anymore. The therapy and peer support programs helped me rediscover who I am.", author: "Jennifer L., Navy Veteran", featured: false }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Military Community Support</h2>
        <p className="text-blue-200/80 mb-6">
          Connect with fellow service members, veterans, and military families who understand your unique experiences.
        </p>
      </div>

      {/* Featured Success Story */}
      {successStories.filter(story => story.featured).map(story => (
        <Card key={story.id} className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-blue-900/30 mt-1">
                <Medal className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-white">{story.title}</h3>
                  <Badge className="bg-blue-500/30 text-blue-300 hover:bg-blue-500/40">Featured Story</Badge>
                </div>
                <blockquote className="border-l-2 border-blue-500/50 pl-4 italic text-blue-200/90 mb-4">
                  "{story.quote}"
                </blockquote>
                <p className="text-blue-400">— {story.author}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Real Community Groups from Database */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Support Groups</h3>
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
                <Card key={group.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-white">{group.name}</CardTitle>
                      {group.category && (
                        <Badge className="bg-blue-500/30 text-blue-300 hover:bg-blue-500/40">
                          {group.category}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-white/70">{group.member_count || 0} members</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isMember ? (
                      <>
                        <Button
                          variant="outline"
                          className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                          onClick={() => navigate(`/app/community-groups/${group.id}`)}
                        >
                          Open Chat
                        </Button>
                        <Badge className="bg-green-500/30 text-green-300">Joined</Badge>
                      </>
                    ) : (
                      <Button
                        className="bg-blue-700 hover:bg-blue-800 text-white w-full"
                        onClick={() => handleJoinGroup(group.id)}
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
      </div>

      {/* Community Discussion */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Community Discussions</h3>
        </div>
        <Card className="bg-[#141921] border-blue-900/30">
          <div className="border-t border-blue-900/30">
            {communityPosts.map((post, index) => (
              <div key={post.id} className={`p-4 ${index !== communityPosts.length - 1 ? 'border-b border-blue-900/30' : ''}`}>
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 border border-blue-400/30">
                    {post.author.avatar ? (
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    ) : (
                      <AvatarFallback className="bg-blue-900/50 text-blue-200">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{post.author.name}</span>
                      <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                        {post.author.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70">{post.time}</p>
                  </div>
                </div>
                <p className="text-white/90 mb-3">{post.content}</p>
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-900/30">
                    <Shield className="h-4 w-4 mr-1.5" />
                    Like ({post.likes})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-900/30">
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Reply ({post.comments})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Success Stories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-white">Success Stories</h3>
            <Badge className="bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white">Inspiring</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.filter(story => !story.featured).map((story) => (
            <Card key={story.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">{story.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-2 border-blue-500/50 pl-4 italic text-blue-200/80 mb-2">
                  "{story.quote}"
                </blockquote>
                <p className="text-right text-blue-400 text-sm">— {story.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoDCommunity;
