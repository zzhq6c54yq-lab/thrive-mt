import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Mood type
export interface MoodLog {
  value: number;
  timestamp: string;
}

export function useMood(userId: string) {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoodLogs = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('daily_check_ins')
        .select('mood_score, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(30);

      if (fetchError) throw fetchError;

      setMoodLogs(
        (data || []).map((entry) => ({
          value: entry.mood_score,
          timestamp: entry.created_at,
        }))
      );
    } catch (err: any) {
      setError(err.message || "Failed to fetch mood logs");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const submitMood = useCallback(
    async (value: number) => {
      if (!userId) return;
      
      setLoading(true);
      setError(null);
      try {
        const { error: insertError } = await supabase
          .from('daily_check_ins')
          .insert({
            user_id: userId,
            mood_score: value,
          });

        if (insertError) throw insertError;
        
        await fetchMoodLogs(); // refresh logs after submit
      } catch (err: any) {
        setError(err.message || "Failed to submit mood");
      } finally {
        setLoading(false);
      }
    },
    [userId, fetchMoodLogs]
  );

  return {
    moodLogs,
    loading,
    error,
    fetchMoodLogs,
    submitMood,
  };
}
