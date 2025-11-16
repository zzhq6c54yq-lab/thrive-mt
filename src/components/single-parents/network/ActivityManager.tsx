import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { ParentConnection, SharedActivity } from "@/types/database-extensions";
import { ListTodo, Plus, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const ActivityManager: React.FC = () => {
  const [activities, setActivities] = useState<SharedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's connections
      const { data: connections, error: connectionsError } = await (supabase as any)
        .from('parent_connections')
        .select('id')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (connectionsError) {
        // Check if table doesn't exist yet
        if (connectionsError.message?.includes('relation') || connectionsError.message?.includes('does not exist')) {
          console.log('Parent connections feature not yet configured');
          setIsLoading(false);
          return;
        }
        throw connectionsError;
      }

      if (!connections || connections.length === 0) {
        setActivities([]);
        setIsLoading(false);
        return;
      }

      const connectionIds = connections.map(c => c.id);

      // Get activities for these connections
      const { data, error } = await (supabase as any)
        .from('shared_activities')
        .select('*')
        .in('connection_id', connectionIds)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setActivities((data || []) as unknown as SharedActivity[]);
    } catch (error) {
      console.error('Error loading activities:', error);
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = async (activityId: string, currentState: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('shared_activities')
        .update({ 
          completed: !currentState,
          completed_at: !currentState ? new Date().toISOString() : null
        })
        .eq('id', activityId);

      if (error) throw error;

      setActivities(activities.map(a => 
        a.id === activityId ? { 
          ...a, 
          completed: !currentState,
          completed_at: !currentState ? new Date().toISOString() : null
        } : a
      ));

      toast({
        title: !currentState ? "Activity completed!" : "Activity reopened",
        description: !currentState ? "Great job!" : "Activity marked as incomplete"
      });
    } catch (error) {
      console.error('Error toggling activity:', error);
      toast({
        title: "Error",
        description: "Failed to update activity",
        variant: "destructive"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'low': 'text-green-600 bg-green-500/10',
      'medium': 'text-yellow-600 bg-yellow-500/10',
      'high': 'text-red-600 bg-red-500/10'
    };
    return colors[priority] || colors.medium;
  };

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading activities...</div>;
  }

  const todoActivities = activities.filter(a => !a.completed);
  const completedActivities = activities.filter(a => a.completed);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <ListTodo className="w-5 h-5" />
          Activities & Tasks
        </h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* To Do */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">To Do ({todoActivities.length})</h4>
          <div className="space-y-2">
            {todoActivities.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground text-sm">No pending activities</p>
              </Card>
            ) : (
              todoActivities.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 mt-0.5"
                      onClick={() => toggleComplete(activity.id, activity.completed)}
                    >
                      <div className="w-5 h-5 rounded border-2 border-muted-foreground" />
                    </Button>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground mb-1">{activity.title}</h5>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-rose-500/10 text-rose-600 capitalize">
                          {activity.activity_type}
                        </span>
                        {activity.due_date && (
                          <span className="text-xs text-muted-foreground">
                            Due: {format(new Date(activity.due_date), 'MMM d')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Completed */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Completed ({completedActivities.length})</h4>
          <div className="space-y-2">
            {completedActivities.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground text-sm">No completed activities yet</p>
              </Card>
            ) : (
              completedActivities.map((activity) => (
                <Card key={activity.id} className="p-4 opacity-60">
                  <div className="flex items-start gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 mt-0.5"
                      onClick={() => toggleComplete(activity.id, activity.completed)}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </Button>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground mb-1 line-through">{activity.title}</h5>
                      {activity.completed_at && (
                        <p className="text-xs text-muted-foreground">
                          Completed {format(new Date(activity.completed_at), 'MMM d, h:mm a')}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityManager;
