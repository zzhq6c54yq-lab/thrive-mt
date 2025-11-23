import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

export function useLastSeen() {
  const { user } = useUser();
  const [lastCheckIn, setLastCheckIn] = useState<Date | undefined>();

  useEffect(() => {
    if (!user) return;

    const fetchLastCheckIn = async () => {
      const { data } = await supabase
        .from('daily_check_ins')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(2); // Get last 2 to find the previous one

      if (data && data.length > 1) {
        // Get the second-to-last check-in (the previous one)
        setLastCheckIn(new Date(data[1].created_at));
      }
    };

    fetchLastCheckIn();
  }, [user]);

  // Update last activity timestamp
  useEffect(() => {
    if (!user) return;

    const updateLastActivity = async () => {
      await supabase
        .from('profiles')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('id', user.id);
    };

    updateLastActivity();

    // Update every 5 minutes while user is active
    const interval = setInterval(updateLastActivity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return { lastCheckIn };
}
