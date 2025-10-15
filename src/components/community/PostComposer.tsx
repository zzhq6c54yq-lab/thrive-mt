import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, Heart, ThumbsUp, HelpCircle, BookOpen, MessageCircle } from 'lucide-react';
import { SupportWallCategory } from '@/hooks/useSupportWall';
import { useToast } from '@/hooks/use-toast';

interface PostComposerProps {
  onSubmit: (content: string, category: SupportWallCategory, tags?: string[]) => Promise<void>;
}

const categories: { value: SupportWallCategory; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'celebration', label: 'Celebration', icon: <Sparkles className="h-4 w-4" />, description: 'Share your wins!' },
  { value: 'struggling', label: 'Struggling', icon: <Heart className="h-4 w-4" />, description: "You're not alone" },
  { value: 'gratitude', label: 'Gratitude', icon: <ThumbsUp className="h-4 w-4" />, description: 'What are you grateful for?' },
  { value: 'question', label: 'Question', icon: <HelpCircle className="h-4 w-4" />, description: 'Ask the community' },
  { value: 'resource', label: 'Resource', icon: <BookOpen className="h-4 w-4" />, description: 'Share helpful tips' },
  { value: 'general', label: 'General', icon: <MessageCircle className="h-4 w-4" />, description: 'Everything else' },
];

export const PostComposer: React.FC<PostComposerProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SupportWallCategory>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({ title: 'Please write a message', variant: 'destructive' });
      return;
    }

    if (content.length > 500) {
      toast({ title: 'Message too long', description: 'Please keep messages under 500 characters.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(content, selectedCategory);
      setContent('');
      setSelectedCategory('general');
      toast({ title: 'Posted!', description: 'Your message has been shared with the community.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to post message. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            What would you like to share?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className="justify-start"
              >
                {cat.icon}
                <span className="ml-2">{cat.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={categories.find(c => c.value === selectedCategory)?.description || "Share your thoughts..."}
          className="min-h-[120px] bg-background/50 border-primary/30"
          maxLength={500}
        />

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {content.length}/500 characters
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Posting...' : 'Post Anonymously'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
