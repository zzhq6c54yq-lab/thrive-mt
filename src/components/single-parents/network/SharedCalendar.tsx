import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { ParentConnection, SharedCalendarEvent } from "@/types/database-extensions";
import { Calendar, Plus } from "lucide-react";
import { format } from "date-fns";

const SharedCalendar: React.FC = () => {
  const [events, setEvents] = useState<SharedCalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's connections
      const { data: connections } = await (supabase as any)
        .from('parent_connections')
        .select('id')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (!connections || connections.length === 0) {
        setEvents([]);
        setIsLoading(false);
        return;
      }

      const connectionIds = connections.map(c => c.id);

      // Get events for these connections
      const { data, error } = await (supabase as any)
        .from('shared_calendar_events')
        .select('*')
        .in('connection_id', connectionIds)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(10);

      if (error) throw error;

      setEvents((data || []) as unknown as SharedCalendarEvent[]);
    } catch (error) {
      console.error('Error loading events:', error);
      toast({
        title: "Error",
        description: "Failed to load calendar events",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'sports': 'bg-blue-500',
      'school': 'bg-green-500',
      'activities': 'bg-purple-500',
      'appointments': 'bg-red-500',
      'pickup-dropoff': 'bg-orange-500',
      'other': 'bg-gray-500'
    };
    return colors[type] || colors.other;
  };

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Shared Calendar
        </h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="p-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No upcoming events. Create one to get started!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-1 h-full ${getEventTypeColor(event.event_type)} rounded-full`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {event.event_type.replace('-', ' ')}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(event.start_time), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  )}
                  {event.child_name && (
                    <span className="inline-block px-2 py-1 text-xs bg-rose-500/10 text-rose-600 rounded">
                      {event.child_name}
                    </span>
                  )}
                  {event.location && (
                    <p className="text-xs text-muted-foreground mt-2">📍 {event.location}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedCalendar;
