import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Bookmark, Flag, MoreVertical } from 'lucide-react';
import { SupportPost } from '@/hooks/useSupportWall';
import { formatDistanceToNow } from 'date-fns';
import { CommentSection } from './CommentSection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, ThumbsUp, HelpCircle, BookOpen } from 'lucide-react';

interface PostCardProps {
  post: SupportPost;
  onToggleHeart: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onReport: (postId: string, reason: string) => void;
  isAuthenticated: boolean;
}

const categoryConfig = {
  celebration: { icon: Sparkles, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  struggling: { icon: Heart, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  gratitude: { icon: ThumbsUp, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  question: { icon: HelpCircle, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  resource: { icon: BookOpen, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  general: { icon: MessageCircle, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onToggleHeart,
  onToggleBookmark,
  onReport,
  isAuthenticated,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const { toast } = useToast();

  const config = categoryConfig[post.category];
  const CategoryIcon = config.icon;

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast({ title: 'Please provide a reason for reporting', variant: 'destructive' });
      return;
    }
    onReport(post.id, reportReason);
    setReportDialogOpen(false);
    setReportReason('');
    toast({ title: 'Report submitted', description: 'Thank you for helping keep our community safe.' });
  };

  return (
    <>
      <Card className={`${config.bg} border-l-4 ${config.border} hover:bg-opacity-80 transition-all`}>
        <CardContent className="p-6">
          {post.is_pinned && (
            <div className="mb-2 flex items-center gap-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">Pinned Post</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-3 text-sm">
            <CategoryIcon className={`h-4 w-4 ${config.color}`} />
            <span className={`${config.color} font-semibold capitalize`}>{post.category}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>

          <blockquote className="text-foreground text-lg italic mb-4 leading-relaxed">
            "{post.content}"
          </blockquote>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleHeart(post.id)}
                disabled={!isAuthenticated}
                className={`${
                  post.user_has_hearted ? 'text-red-400 hover:text-red-300' : 'text-muted-foreground hover:text-red-400'
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 ${post.user_has_hearted ? 'fill-current' : ''}`} />
                {post.hearts}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comment_count}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleBookmark(post.id)}
                disabled={!isAuthenticated}
                className={`${
                  post.user_has_bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${post.user_has_bookmarked ? 'fill-current' : ''}`} />
                {post.bookmark_count > 0 && post.bookmark_count}
              </Button>
            </div>

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setReportDialogOpen(true)}>
                    <Flag className="h-4 w-4 mr-2" />
                    Report Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {showComments && (
            <div className="mt-4 pt-4 border-t border-border">
              <CommentSection postId={post.id} isAuthenticated={isAuthenticated} />
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Post</DialogTitle>
            <DialogDescription>
              Please describe why you're reporting this post. Our team will review it.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Reason for reporting..."
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReport}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
