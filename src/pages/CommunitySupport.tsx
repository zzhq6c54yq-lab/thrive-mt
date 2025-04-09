
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessagesSquare, Heart, Reply, Flag, UserRound, Clock, Users, ArrowRight, Send, Search, Link2, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import ChatRoomDialog from "@/components/community/ChatRoomDialog";

interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: number;
  likes: number;
  category: string;
  tags: string[];
  isLiked: boolean;
}

interface ChatGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  nextMeeting?: string;
  tags: string[];
  isJoined: boolean;
}

const CommunitySupport = () => {
  const [activeTab, setActiveTab] = useState("forums");
  const [searchQuery, setSearchQuery] = useState("");
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);
  const [activeChatGroup, setActiveChatGroup] = useState<ChatGroup | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "anxiety", label: "Anxiety" },
    { value: "depression", label: "Depression" },
    { value: "stress", label: "Stress Management" },
    { value: "addiction", label: "Addiction Recovery" },
    { value: "wellness", label: "General Wellness" }
  ];

  useEffect(() => {
    // Simulating data fetch
    const fetchData = () => {
      // Sample forum posts data
      const posts: ForumPost[] = [
        {
          id: "post-1",
          title: "How do you cope with social anxiety?",
          author: "AnxietyWarrior",
          date: "2 hours ago",
          content: "I've been struggling with social anxiety for years, especially in work settings. What strategies have helped you overcome similar challenges?",
          replies: 24,
          likes: 15,
          category: "anxiety",
          tags: ["social-anxiety", "work-stress", "coping-mechanisms"],
          isLiked: false
        },
        {
          id: "post-2",
          title: "Maintaining sobriety during stressful times",
          author: "RecoveryJourney",
          date: "5 hours ago",
          content: "I've been sober for 8 months, but recent family issues are triggering cravings. Could use some support and advice from others who've maintained recovery during difficult periods.",
          replies: 18,
          likes: 32,
          category: "addiction",
          tags: ["sobriety", "triggers", "family-stress"],
          isLiked: true
        },
        {
          id: "post-3",
          title: "Mindfulness techniques that actually work",
          author: "PresentMoment",
          date: "1 day ago",
          content: "I've tried several mindfulness practices but struggle to stick with them. Looking for simple techniques that have made a real difference in your daily life.",
          replies: 36,
          likes: 47,
          category: "stress",
          tags: ["mindfulness", "meditation", "daily-practice"],
          isLiked: false
        },
        {
          id: "post-4",
          title: "Depression and motivation strategies",
          author: "SmallSteps",
          date: "2 days ago",
          content: "When depression hits, even basic tasks feel impossible. What small routines or rewards help you maintain momentum on difficult days?",
          replies: 29,
          likes: 38,
          category: "depression",
          tags: ["motivation", "daily-routines", "self-care"],
          isLiked: false
        },
        {
          id: "post-5",
          title: "Healthy habits that improved your mental health",
          author: "BalancedLife",
          date: "3 days ago",
          content: "I'm looking to build more structure in my life to support my mental health. What habits have made the biggest positive impact for you?",
          replies: 42,
          likes: 56,
          category: "wellness",
          tags: ["habits", "lifestyle", "well-being"],
          isLiked: true
        }
      ];

      // Sample chat groups data
      const groups: ChatGroup[] = [
        {
          id: "group-1",
          name: "Anxiety Support Circle",
          description: "A safe space to discuss anxiety challenges and share coping strategies with others who understand.",
          members: 256,
          category: "anxiety",
          nextMeeting: "Today, 7:00 PM",
          tags: ["panic-attacks", "social-anxiety", "work-stress"],
          isJoined: false
        },
        {
          id: "group-2",
          name: "Recovery Together",
          description: "Supporting each other through addiction recovery with compassion and understanding.",
          members: 189,
          category: "addiction",
          nextMeeting: "Tomorrow, 6:30 PM",
          tags: ["substance-use", "sobriety", "recovery-journey"],
          isJoined: true
        },
        {
          id: "group-3",
          name: "Mindfulness Practitioners",
          description: "Daily check-ins and guided practices for developing mindfulness in everyday life.",
          members: 312,
          category: "stress",
          nextMeeting: "Wednesday, 8:00 PM",
          tags: ["meditation", "present-moment", "stress-reduction"],
          isJoined: false
        },
        {
          id: "group-4",
          name: "Depression Support Network",
          description: "A community for sharing experiences and finding hope during depressive episodes.",
          members: 278,
          category: "depression",
          nextMeeting: "Friday, 7:00 PM",
          tags: ["mood-disorders", "self-care", "coping-strategies"],
          isJoined: false
        },
        {
          id: "group-5",
          name: "Holistic Wellness Community",
          description: "Exploring the connection between physical, mental, and spiritual well-being.",
          members: 205,
          category: "wellness",
          nextMeeting: "Saturday, 10:00 AM",
          tags: ["nutrition", "exercise", "mind-body-connection"],
          isJoined: true
        }
      ];

      setForumPosts(posts);
      setChatGroups(groups);
    };

    fetchData();
  }, []);

  const filteredForumPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const filteredChatGroups = chatGroups.filter(group => {
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (postId: string) => {
    setForumPosts(posts => 
      posts.map(post => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          return {
            ...post,
            isLiked: newIsLiked,
            likes: newIsLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const toggleJoinGroup = (groupId: string) => {
    setChatGroups(groups => 
      groups.map(group => {
        if (group.id === groupId) {
          const newIsJoined = !group.isJoined;
          return {
            ...group,
            isJoined: newIsJoined,
            members: newIsJoined ? group.members + 1 : group.members - 1
          };
        }
        return group;
      })
    );

    const group = chatGroups.find(g => g.id === groupId);
    if (group) {
      toast({
        title: group.isJoined ? "Left group" : "Joined group",
        description: group.isJoined 
          ? `You have left ${group.name}` 
          : `You have joined ${group.name}. Welcome to the community!`,
      });
    }
  };

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Cannot create post",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      author: "You",
      date: "Just now",
      content: newPostContent,
      replies: 0,
      likes: 0,
      category: selectedCategory === "all" ? "wellness" : selectedCategory,
      tags: [],
      isLiked: false
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPost(false);

    toast({
      title: "Post created",
      description: "Your post has been published to the community.",
    });
  };

  const openChatRoom = (group: ChatGroup) => {
    if (!group.isJoined) {
      // Auto-join the group if not already joined
      toggleJoinGroup(group.id);
    }
    
    setActiveChatGroup(group);
    setChatRoomOpen(true);
    
    toast({
      title: "Entering Chat Room",
      description: `You've entered the ${group.name} chat room.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <HomeButton />
            <h1 className="text-3xl md:text-4xl font-bold ml-4">Community Support</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl">
            Connect with others on similar mental health journeys. Share experiences,
            ask questions, and find support in our forums and chat groups.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start mb-8">
          <div className="w-full md:w-2/3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2"
                placeholder="Search topics, keywords, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Tabs defaultValue="forums" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full max-w-md">
            <TabsTrigger value="forums" className="flex-1 flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" />
              Forums
            </TabsTrigger>
            <TabsTrigger value="chat-groups" className="flex-1 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Chat Groups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="forums">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Discussion Forums</h2>
              <Button 
                className="bg-[#B87333] hover:bg-[#B87333]/90"
                onClick={() => setShowNewPost(!showNewPost)}
              >
                {showNewPost ? "Cancel" : "Create New Post"}
              </Button>
            </div>

            {showNewPost && (
              <Card className="mb-8 border-[#B87333]">
                <CardHeader>
                  <CardTitle>Create a New Post</CardTitle>
                  <CardDescription>Share your thoughts, questions, or experiences with the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Post title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="mb-4"
                    />
                    <Textarea
                      placeholder="Write your post here..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={5}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#B87333] hover:bg-[#B87333]/90"
                    onClick={handleSubmitPost}
                  >
                    Post
                  </Button>
                </CardFooter>
              </Card>
            )}

            {filteredForumPosts.length === 0 && (
              <div className="text-center py-12">
                <MessagesSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or create a new post</p>
                <Button 
                  className="bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={() => setShowNewPost(true)}
                >
                  Create New Post
                </Button>
              </div>
            )}

            <div className="space-y-6">
              {filteredForumPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>
                    <CardDescription>
                      <span className="flex items-center gap-1">
                        <UserRound className="h-3 w-3" />
                        Posted by {post.author}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-4">
                      <button 
                        className="flex items-center gap-1 text-gray-500 hover:text-[#B87333]"
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-[#B87333] text-[#B87333]' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-[#B87333]">
                        <Reply className="h-4 w-4" />
                        <span>{post.replies}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                        <Flag className="h-4 w-4" />
                        <span>Report</span>
                      </button>
                    </div>
                    <Button 
                      className="bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
                    >
                      View Discussion
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="chat-groups">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Chat Groups</h2>
              <Button 
                className="bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
              >
                <Link2 className="mr-2 h-4 w-4" />
                Find More Groups
              </Button>
            </div>

            {filteredChatGroups.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No chat groups found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredChatGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{group.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {group.members} members
                      {group.nextMeeting && (
                        <>
                          <span className="mx-1">•</span>
                          <Calendar className="h-3 w-3" />
                          <span>Next: {group.nextMeeting}</span>
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{group.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      className={group.isJoined 
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-[#B87333] hover:bg-[#B87333]/90"}
                      onClick={() => toggleJoinGroup(group.id)}
                    >
                      {group.isJoined ? "Leave Group" : "Join Group"}
                    </Button>
                    <Button 
                      className="bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
                      disabled={!group.isJoined}
                      onClick={() => openChatRoom(group)}
                    >
                      {group.isJoined ? (
                        <>
                          Enter Chat
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      ) : "Join to Chat"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Chat Room Dialog */}
      {activeChatGroup && (
        <ChatRoomDialog
          isOpen={chatRoomOpen}
          onOpenChange={setChatRoomOpen}
          groupName={activeChatGroup.name}
          groupId={activeChatGroup.id}
        />
      )}
    </div>
  );
};

export default CommunitySupport;
