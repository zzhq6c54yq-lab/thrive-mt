import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trophy, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

interface MiniWinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MiniWinDialog({ open, onOpenChange }: MiniWinDialogProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const quickWins = [
    "Completed a task I've been putting off",
    "Practiced self-care today",
    "Had a meaningful conversation",
    "Learned something new",
    "Made someone smile",
  ];

  const handleSave = async (quickWin?: string) => {
    if (!user) return;
    
    const winTitle = quickWin || title;
    if (!winTitle.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a title for your mini win',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from('mini_wins').insert({
        user_id: user.id,
        title: winTitle,
        description: quickWin ? '' : description,
        category: 'general',
      });

      if (error) throw error;

      toast({
        title: '🎉 Mini Win Captured!',
        description: 'Your achievement has been recorded',
      });

      setTitle('');
      setDescription('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving mini win:', error);
      toast({
        title: 'Error',
        description: 'Failed to save mini win',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-[#D4AF37]/40 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#D4AF37] flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Capture a Mini Win
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p className="text-sm text-gray-300">
            Celebrate your progress, no matter how small. Every step counts!
          </p>

          <div className="space-y-3">
            <label className="text-sm text-gray-300 font-medium">Quick Options:</label>
            <div className="space-y-2">
              {quickWins.map((win) => (
                <Button
                  key={win}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 bg-gray-800 border-gray-700 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/40 text-white"
                  onClick={() => handleSave(win)}
                  disabled={saving}
                >
                  <Sparkles className="w-4 h-4 mr-2 flex-shrink-0 text-[#D4AF37]" />
                  <span className="text-sm">{win}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <label className="text-sm text-gray-300 font-medium mb-2 block">Or write your own:</label>
            <Input
              placeholder="What did you accomplish?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white mb-3"
            />
            <Textarea
              placeholder="Add more details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
            />
          </div>

          <Button 
            onClick={() => handleSave()} 
            disabled={!title.trim() || saving}
            variant="gold" 
            className="w-full"
          >
            <Trophy className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Mini Win'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
