import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SharedCalendarEvent } from "@/types/database-extensions";
import { format } from "date-fns";
import { Clock, MapPin, User, Calendar, Repeat, Bell, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EventDetailsDialogProps {
  event: SharedCalendarEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventDeleted: () => void;
}

const eventTypeLabels: Record<string, string> = {
  sports: "Sports",
  school: "School",
  activities: "Activities",
  appointments: "Appointments",
  "pickup-dropoff": "Pickup/Dropoff",
  other: "Other"
};

const recurrenceLabels: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  monthly: "Monthly"
};

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  event,
  open,
  onOpenChange,
  onEventDeleted
}) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  if (!event) return null;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setIsDeleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if user is the creator
      if (event.creator_id !== user.id) {
        toast({
          title: "Permission denied",
          description: "You can only delete events you created",
          variant: "destructive"
        });
        return;
      }

      const { error } = await (supabase as any)
        .from('shared_calendar_events')
        .delete()
        .eq('id', event.id);

      if (error) throw error;

      toast({
        title: "Event deleted",
        description: "The event has been removed from the calendar"
      });

      onEventDeleted();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast({
        title: "Failed to delete",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: event.color }}
            />
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {eventTypeLabels[event.event_type] || event.event_type}
            </Badge>
            {event.is_recurring && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Repeat className="w-3 h-3" />
                {recurrenceLabels[event.recurrence_rule || ''] || 'Recurring'}
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">
                  {format(new Date(event.start_time), "EEEE, MMMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">
                  {format(new Date(event.start_time), "h:mm a")}
                  {event.end_time && (
                    <> - {format(new Date(event.end_time), "h:mm a")}</>
                  )}
                </p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-foreground">{event.location}</p>
                </div>
              </div>
            )}

            {event.child_name && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-foreground">{event.child_name}</p>
                </div>
              </div>
            )}

            {event.reminder_minutes > 0 && (
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-foreground">
                    Reminder: {event.reminder_minutes === 60 ? "1 hour" : event.reminder_minutes === 1440 ? "1 day" : `${event.reminder_minutes} minutes`} before
                  </p>
                </div>
              </div>
            )}

            {event.description && (
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete Event"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
