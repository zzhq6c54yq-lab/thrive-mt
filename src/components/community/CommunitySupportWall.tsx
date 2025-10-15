import React, { useState, useMemo } from "react";
import { useSupportWall, SupportWallCategory } from "@/hooks/useSupportWall";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Search, TrendingUp, Pin } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { PostCard } from "./PostCard";
import { PostComposer } from "./PostComposer";
import { CategoryFilter } from "./CategoryFilter";
import { CommunityStats } from "./CommunityStats";

type SortOption = 'recent' | 'hearts' | 'comments' | 'bookmarks';

const CommunitySupportWall: React.FC = () => {
  const { posts, postMessage, toggleHeart, toggleBookmark, reportPost, loading } = useSupportWall();
  const [selectedCategory, setSelectedCategory] = useState<SupportWallCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      // Always keep pinned posts at top
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;

      switch (sortBy) {
        case 'hearts':
          return b.hearts - a.hearts;
        case 'comments':
          return b.comment_count - a.comment_count;
        case 'bookmarks':
          return b.bookmark_count - a.bookmark_count;
        case 'recent':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return sorted;
  }, [posts, selectedCategory, sortBy, searchQuery]);

  const pinnedPosts = filteredAndSortedPosts.filter(p => p.is_pinned);
  const trendingPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.hearts + b.comment_count * 2) - (a.hearts + a.comment_count * 2))
      .slice(0, 3);
  }, [posts]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Community Support Wall</h1>
        <p className="text-muted-foreground">
          Share encouragement, celebrate wins, and support each other in our safe, anonymous community
        </p>
      </div>

      {/* Community Stats */}
      <CommunityStats posts={posts} />

      {/* Trending Posts */}
      {trendingPosts.length > 0 && (
        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-orange-400" />
              <h3 className="font-semibold text-foreground">Trending This Week</h3>
            </div>
            <div className="grid gap-2">
              {trendingPosts.map((post) => (
                <div key={post.id} className="text-sm bg-background/50 p-3 rounded-lg">
                  <p className="text-foreground line-clamp-2 italic">"{post.content}"</p>
                  <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                    <span>❤️ {post.hearts}</span>
                    <span>💬 {post.comment_count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Post Composer */}
      {user ? (
        <PostComposer onSubmit={postMessage} />
      ) : (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-foreground mb-4">Sign in to share encouragement with the community</p>
            <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <div className="space-y-4">
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'recent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('recent')}
            >
              Recent
            </Button>
            <Button
              variant={sortBy === 'hearts' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('hearts')}
            >
              Most Hearts
            </Button>
            <Button
              variant={sortBy === 'comments' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('comments')}
            >
              Most Comments
            </Button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading community messages...</p>
          </div>
        ) : filteredAndSortedPosts.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground text-lg mb-2">No messages yet</p>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term' : 'Be the first to share some encouragement!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleHeart={toggleHeart}
              onToggleBookmark={toggleBookmark}
              onReport={reportPost}
              isAuthenticated={!!user}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommunitySupportWall;
