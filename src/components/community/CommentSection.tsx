import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Send } from 'lucide-react';
import { useSupportWall, Comment } from '@/hooks/useSupportWall';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  postId: string;
  isAuthenticated: boolean;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, isAuthenticated }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchComments, postComment, toggleCommentHeart } = useSupportWall();
  const { toast } = useToast();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    const data = await fetchComments(postId);
    setComments(data);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !isAuthenticated) return;

    if (newComment.length > 300) {
      toast({ title: 'Comment too long', description: 'Please keep comments under 300 characters.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      await postComment(postId, newComment);
      setNewComment('');
      await loadComments();
      toast({ title: 'Comment posted', description: 'Your supportive message has been shared.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to post comment. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleHeart = async (commentId: string) => {
    if (!isAuthenticated) return;
    await toggleCommentHeart(commentId);
    await loadComments();
  };

  return (
    <div className="space-y-4">
      {isAuthenticated && (
        <div className="flex gap-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a supportive comment..."
            className="min-h-[80px] bg-background/50"
            maxLength={300}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isLoading}
            size="sm"
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to share support!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-background/30 rounded-lg p-3">
              <p className="text-sm text-foreground mb-2">{comment.content}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleHeart(comment.id)}
                  disabled={!isAuthenticated}
                  className={`h-6 px-2 ${
                    comment.user_has_hearted ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                  }`}
                >
                  <Heart className={`h-3 w-3 mr-1 ${comment.user_has_hearted ? 'fill-current' : ''}`} />
                  {comment.hearts > 0 && comment.hearts}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
