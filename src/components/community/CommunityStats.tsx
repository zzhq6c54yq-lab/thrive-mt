import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle, Sparkles, Users } from 'lucide-react';
import { SupportPost } from '@/hooks/useSupportWall';

interface CommunityStatsProps {
  posts: SupportPost[];
}

export const CommunityStats: React.FC<CommunityStatsProps> = ({ posts }) => {
  const totalHearts = posts.reduce((sum, post) => sum + post.hearts, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comment_count, 0);
  const totalCelebrations = posts.filter(p => p.category === 'celebration').length;
  const totalPosts = posts.length;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Community Impact This Week
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{totalPosts}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Users className="h-3 w-3" />
            Messages Shared
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{totalHearts}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Heart className="h-3 w-3" />
            Hearts Given
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{totalComments}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <MessageCircle className="h-3 w-3" />
            Comments
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{totalCelebrations}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" />
            Celebrations
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
