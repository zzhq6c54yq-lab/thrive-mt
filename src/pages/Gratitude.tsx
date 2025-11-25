import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Heart, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';

interface GratitudeEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
}

export default function Gratitude() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', description: '', category: 'general' });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('gratitude_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching gratitude entries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gratitude entries',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    if (!user || !newEntry.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a title for your gratitude entry',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('gratitude_entries')
        .insert({
          user_id: user.id,
          title: newEntry.title,
          description: newEntry.description,
          category: newEntry.category,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Gratitude entry added!',
      });

      setNewEntry({ title: '', description: '', category: 'general' });
      setShowDialog(false);
      fetchEntries();
    } catch (error) {
      console.error('Error adding gratitude entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to add gratitude entry',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gratitude_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Deleted',
        description: 'Gratitude entry removed',
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete entry',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            Gratitude Visualizer
          </h1>
          <p className="text-gray-300 text-lg">Cultivate appreciation and visualize what you're grateful for</p>
        </motion.div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-400">
            {entries.length} gratitude {entries.length === 1 ? 'entry' : 'entries'}
          </p>
          
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button variant="gold" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Gratitude
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-[#D4AF37]/40">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#D4AF37]">New Gratitude Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">What are you grateful for?</label>
                  <Input
                    placeholder="E.g., My supportive family"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">More details (optional)</label>
                  <Textarea
                    placeholder="Why are you grateful for this?"
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>
                <Button onClick={handleAddEntry} variant="gold" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : entries.length === 0 ? (
          <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-12 text-center">
            <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Start Your Gratitude Journey</h3>
            <p className="text-gray-300 mb-6">
              Begin by adding things you're grateful for. Watch your gratitude garden grow!
            </p>
            <Button variant="gold" onClick={() => setShowDialog(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Entry
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6 hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  
                  <Heart className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">{entry.title}</h3>
                  {entry.description && (
                    <p className="text-gray-300 text-sm mb-3">{entry.description}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
