import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import Page from "@/components/Page";
import { format } from "date-fns";
import { FileText, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MiniSession {
  id: string;
  created_at: string;
  focus: string;
  mood: number;
  anxiety: number;
  energy: number;
  urge_level?: number;
  coaching: string;
  summary: string;
  shared_with_therapist: boolean;
}

const MiniSessionHistory: React.FC = () => {
  const [sessions, setSessions] = useState<MiniSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await (supabase as any)
        .from('mini_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions((data || []) as unknown as MiniSession[]);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load session history",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShare = async (sessionId: string, currentState: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('mini_sessions')
        .update({ shared_with_therapist: !currentState })
        .eq('id', sessionId);

      if (error) throw error;

      setSessions(sessions.map(s => 
        s.id === sessionId ? { ...s, shared_with_therapist: !currentState } : s
      ));

      toast({
        title: currentState ? "Unshared" : "Shared with therapist",
        description: currentState 
          ? "Session removed from therapist view" 
          : "Your therapist can now see this session"
      });
    } catch (error) {
      console.error('Error toggling share:', error);
      toast({
        title: "Error",
        description: "Failed to update share status",
        variant: "destructive"
      });
    }
  };

  const getFocusLabel = (focus: string) => {
    const labels: Record<string, string> = {
      racing_thoughts: 'Racing Thoughts',
      conflict: 'Conflict Processing',
      low_mood: 'Low Mood',
      urge: 'Managing Urges',
      process_therapy: 'Therapy Processing'
    };
    return labels[focus] || focus;
  };

  if (isLoading) {
    return (
      <Page title="Session History" returnToMain>
        <div className="text-center text-muted-foreground">Loading...</div>
      </Page>
    );
  }

  return (
    <Page title="Session History" returnToMain>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Session History</h1>
            <p className="text-muted-foreground">Review your past sessions</p>
          </div>
          <Button onClick={() => navigate('/mini-session')}>
            New Session
          </Button>
        </div>

        {sessions.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No sessions yet. Start your first session to begin.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{getFocusLabel(session.focus)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(session.created_at), 'MMMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                  <Button
                    variant={session.shared_with_therapist ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleShare(session.id, session.shared_with_therapist)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {session.shared_with_therapist ? "Shared" : "Share"}
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Mood: {session.mood}/10 • Anxiety: {session.anxiety}/10 • Energy: {session.energy}/10
                    {session.urge_level !== undefined && ` • Urge: ${session.urge_level}/10`}
                  </p>
                </div>

                <div className="bg-card/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap text-sm">{session.coaching}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
};

export default MiniSessionHistory;
