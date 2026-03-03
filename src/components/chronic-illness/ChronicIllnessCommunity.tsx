
import React from "react";
import { Users, MessageSquare, Video, Calendar, Globe, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ChronicIllnessCommunity: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const supportGroups = [
    {
      id: "group1",
      title: "Chronic Pain Support Circle",
      description: "A supportive community for those dealing with persistent pain conditions.",
      members: 245,
      nextMeeting: "Tomorrow, 3:00 PM",
      tags: ["Pain Management", "Support", "Weekly"],
      path: "/chronic-illness/groups"
    },
    {
      id: "group2",
      title: "Autoimmune Alliance",
      description: "Connect with others managing autoimmune conditions to share experiences and resources.",
      members: 189,
      nextMeeting: "Wednesday, 6:00 PM",
      tags: ["Autoimmune", "Discussion", "Bi-weekly"],
      path: "/chronic-illness/groups"
    },
    {
      id: "group3",
      title: "Caregiver Connection",
      description: "For those caring for loved ones with chronic conditions.",
      members: 156,
      nextMeeting: "Friday, 7:30 PM",
      tags: ["Caregiving", "Support", "Weekly"],
      path: "/chronic-illness/groups"
    }
  ];
  
  const discussionForums = [
    {
      id: "forum1",
      title: "Managing Work Life with Chronic Illness",
      description: "Strategies for balancing career demands with health management.",
      activeUsers: 34,
      totalPosts: 286,
      path: "/chronic-illness/community"
    },
    {
      id: "forum2",
      title: "Treatment Experiences & Feedback",
      description: "Share your experiences with different treatments and therapies.",
      activeUsers: 28,
      totalPosts: 437,
      path: "/chronic-illness/community"
    },
    {
      id: "forum3",
      title: "Mental Health & Chronic Conditions",
      description: "Discussing the emotional and psychological aspects of chronic illness.",
      activeUsers: 41,
      totalPosts: 319,
      path: "/chronic-illness/community"
    }
  ];

  const handleJoinGroup = (group: any) => {
    toast({
      title: `Joining ${group.title}`,
      description: "Loading group details...",
      duration: 1500,
    });
    
    navigate(group.path, {
      state: {
        fromChronicIllness: true,
        stayInPortal: true,
        portalPath: "/chronic-illness-portal",
        preventTutorial: true,
        groupId: group.id,
        groupTitle: group.title
      }
    });
  };
  
  const handleViewForum = (forum: any) => {
    toast({
      title: `Viewing ${forum.title}`,
      description: "Loading discussion forum...",
      duration: 1500,
    });
    
    navigate(forum.path, {
      state: {
        fromChronicIllness: true,
        stayInPortal: true,
        portalPath: "/chronic-illness-portal",
        preventTutorial: true,
        forumId: forum.id,
        forumTitle: forum.title
      }
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Chronic Illness Community</h2>
        <p className="text-purple-700 dark:text-purple-300">
          Connect with others who understand the challenges of living with chronic conditions.
        </p>
      </div>
      
      {/* Support Groups Section */}
      <div>
        <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Support Groups
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportGroups.map((group) => (
            <Card key={group.id} className="bg-white dark:bg-gray-800/50 border-purple-200 dark:border-purple-900/50 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-200">{group.title}</CardTitle>
                <CardDescription className="line-clamp-2">{group.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-600" />
                      {group.members} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      {group.nextMeeting}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {group.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleJoinGroup(group)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Group
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Discussion Forums Section */}
      <div>
        <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Discussion Forums
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discussionForums.map((forum) => (
            <Card key={forum.id} className="bg-white dark:bg-gray-800/50 border-purple-200 dark:border-purple-900/50 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-200">{forum.title}</CardTitle>
                <CardDescription className="line-clamp-2">{forum.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-purple-600" />
                    {forum.activeUsers} active now
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    {forum.totalPosts} posts
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleViewForum(forum)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Discussion
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChronicIllnessCommunity;
