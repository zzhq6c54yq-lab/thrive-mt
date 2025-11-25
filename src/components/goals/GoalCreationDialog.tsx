import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { addDays, addWeeks, endOfWeek, endOfMonth } from 'date-fns';

interface GoalCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalType: 'weekly' | 'monthly';
  onSuccess?: () => void;
}

export function GoalCreationDialog({ open, onOpenChange, goalType, onSuccess }: GoalCreationDialogProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [category, setCategory] = useState('wellness');
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'wellness', label: 'Mental Wellness' },
    { value: 'check-in', label: 'Check-ins' },
    { value: 'activity', label: 'Activities' },
    { value: 'journal', label: 'Journaling' },
    { value: 'mood', label: 'Mood Tracking' },
    { value: 'personal', label: 'Personal Growth' },
    { value: 'professional', label: 'Professional' },
  ];

  const getDeadline = () => {
    return goalType === 'weekly' ? endOfWeek(new Date()) : endOfMonth(new Date());
  };

  const handleSave = async () => {
    if (!user) return;

    if (!title.trim() || !target) {
      toast({
        title: 'Error',
        description: 'Please fill in the title and target',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from('user_goals').insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        target: parseFloat(target),
        current: 0,
        goal_type: goalType,
        category,
        deadline: getDeadline().toISOString(),
        completed: false,
      });

      if (error) throw error;

      toast({
        title: 'Goal Created! 🎯',
        description: `Your ${goalType} goal has been added`,
      });

      setTitle('');
      setDescription('');
      setTarget('');
      setCategory('wellness');
      onOpenChange(false);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: 'Error',
        description: 'Failed to create goal',
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
            <Target className="w-6 h-6" />
            Create {goalType === 'weekly' ? 'Weekly' : 'Monthly'} Goal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-gray-300 font-medium mb-2 block">Goal Title *</label>
            <Input
              placeholder="E.g., Complete 5 daily check-ins"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 font-medium mb-2 block">Description</label>
            <Textarea
              placeholder="Why is this goal important to you?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-white">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-300 font-medium mb-2 block">Target (number) *</label>
            <Input
              type="number"
              placeholder="E.g., 5"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              min="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              How many times do you want to achieve this?
            </p>
          </div>

          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-3">
            <p className="text-sm text-gray-300">
              Deadline: {getDeadline().toLocaleDateString()}
            </p>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={!title.trim() || !target || saving}
            variant="gold" 
            className="w-full"
          >
            <Target className="w-4 h-4 mr-2" />
            {saving ? 'Creating...' : 'Create Goal'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
