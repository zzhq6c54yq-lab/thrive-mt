import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { ParentConnection, SharedCalendarEvent } from "@/types/database-extensions";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, List } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import EventCreationDialog from "./EventCreationDialog";
import CalendarGrid from "./CalendarGrid";
import EventDetailsDialog from "./EventDetailsDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SharedCalendar: React.FC = () => {
  const [events, setEvents] = useState<SharedCalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SharedCalendarEvent | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
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
        setEvents([]);
        setIsLoading(false);
        return;
      }

      const connectionIds = connections.map((c: any) => c.id);
      
      // Set first connection as default for creating events
      if (connectionIds.length > 0 && !selectedConnectionId) {
        setSelectedConnectionId(connectionIds[0]);
      }

      // Get events for these connections
      const { data, error } = await (supabase as any)
        .from('shared_calendar_events')
        .select('*')
        .in('connection_id', connectionIds)
        .order('start_time', { ascending: true });

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

  const handleAddEvent = () => {
    if (!selectedConnectionId) {
      toast({
        title: "No connections",
        description: "You need to connect with another parent first",
        variant: "destructive"
      });
      return;
    }
    setCreateDialogOpen(true);
  };

  const handleEventClick = (event: SharedCalendarEvent) => {
    setSelectedEvent(event);
    setDetailsDialogOpen(true);
  };

  const upcomingEvents = events.filter(e => new Date(e.start_time) >= new Date());

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading calendar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Shared Calendar
        </h3>
        <Button size="sm" onClick={handleAddEvent}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="p-8 text-center">
          <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No events yet. Create your first event!</p>
        </Card>
      ) : (
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-2" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h4 className="text-lg font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <CalendarGrid
              events={events}
              currentMonth={currentMonth}
              onEventClick={handleEventClick}
            />
          </TabsContent>

          <TabsContent value="list" className="space-y-4 mt-4">
            {upcomingEvents.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No upcoming events</p>
              </Card>
            ) : (
              upcomingEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-1 h-16 rounded" 
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.start_time), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                      </p>
                      {event.location && (
                        <p className="text-sm text-muted-foreground mt-1">📍 {event.location}</p>
                      )}
                      {event.child_name && (
                        <p className="text-sm text-muted-foreground">👤 {event.child_name}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2 py-1 rounded bg-muted text-foreground capitalize">
                        {event.event_type.replace('-', ' ')}
                      </span>
                      {event.is_recurring && (
                        <p className="text-xs text-muted-foreground mt-1">🔁 Recurring</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}

      <EventCreationDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        connectionId={selectedConnectionId}
        onEventCreated={loadEvents}
      />

      <EventDetailsDialog
        event={selectedEvent}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onEventDeleted={loadEvents}
      />
    </div>
  );
};

export default SharedCalendar;
