import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, AlertCircle, Wrench, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  broadcast_type: string;
  target_audience: string;
  is_active: boolean;
  show_as_popup: boolean;
  created_at: string;
}

const BroadcastPopup: React.FC = () => {
  const { user } = useUser();
  const [activeBroadcast, setActiveBroadcast] = useState<Broadcast | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      checkForBroadcasts();
      subscribeToNewBroadcasts();
    }
  }, [user]);

  const checkForBroadcasts = async () => {
    if (!user) return;

    try {
      // Get broadcasts the user hasn't read yet
      const { data: broadcasts, error } = await supabase
        .from('admin_broadcasts')
        .select('*')
        .eq('is_active', true)
        .eq('show_as_popup', true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (broadcasts && broadcasts.length > 0) {
        // Check which ones user has already read
        const { data: reads } = await supabase
          .from('broadcast_reads')
          .select('broadcast_id')
          .eq('user_id', user.id);

        const readIds = new Set(reads?.map(r => r.broadcast_id) || []);
        const unreadBroadcasts = broadcasts.filter(b => !readIds.has(b.id));

        if (unreadBroadcasts.length > 0) {
          // Show the most recent unread broadcast
          setActiveBroadcast(unreadBroadcasts[0] as Broadcast);
          setOpen(true);
        }
      }
    } catch (error) {
      console.error('Error checking broadcasts:', error);
    }
  };

  const subscribeToNewBroadcasts = () => {
    const channel = supabase
      .channel('broadcast-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_broadcasts',
        },
        (payload) => {
          const newBroadcast = payload.new as Broadcast;
          if (newBroadcast.is_active && newBroadcast.show_as_popup) {
            setActiveBroadcast(newBroadcast);
            setOpen(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleDismiss = async () => {
    if (!activeBroadcast || !user) return;

    try {
      // Mark as read
      await supabase.from('broadcast_reads').insert({
        broadcast_id: activeBroadcast.id,
        user_id: user.id,
      });
    } catch (error) {
      // Ignore duplicate errors
      console.error('Error marking broadcast as read:', error);
    }

    setOpen(false);
    setActiveBroadcast(null);
    
    // Check for more broadcasts after dismissing
    setTimeout(checkForBroadcasts, 500);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
          bgClass: 'bg-red-500/10 border-red-500/30',
          titleClass: 'text-red-400',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
          bgClass: 'bg-yellow-500/10 border-yellow-500/30',
          titleClass: 'text-yellow-400',
        };
      case 'maintenance':
        return {
          icon: <Wrench className="w-8 h-8 text-orange-500" />,
          bgClass: 'bg-orange-500/10 border-orange-500/30',
          titleClass: 'text-orange-400',
        };
      default:
        return {
          icon: <Info className="w-8 h-8 text-blue-500" />,
          bgClass: 'bg-blue-500/10 border-blue-500/30',
          titleClass: 'text-blue-400',
        };
    }
  };

  if (!activeBroadcast) return null;

  const styles = getTypeStyles(activeBroadcast.broadcast_type);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`bg-slate-900 ${styles.bgClass} max-w-md`}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {styles.icon}
            <DialogTitle className={`text-xl ${styles.titleClass}`}>
              {activeBroadcast.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-300 text-base leading-relaxed">
            {activeBroadcast.message}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
          <span className="text-xs text-slate-500">
            {new Date(activeBroadcast.created_at).toLocaleString()}
          </span>
          <Button
            onClick={handleDismiss}
            className={
              activeBroadcast.broadcast_type === 'critical'
                ? 'bg-red-600 hover:bg-red-700'
                : activeBroadcast.broadcast_type === 'warning'
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-[#B87333] hover:bg-[#A66323]'
            }
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastPopup;
