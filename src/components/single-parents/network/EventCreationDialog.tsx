import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectionId: string;
  onEventCreated: () => void;
}

const eventTypes = [
  { value: "sports", label: "Sports" },
  { value: "school", label: "School" },
  { value: "activities", label: "Activities" },
  { value: "appointments", label: "Appointments" },
  { value: "pickup-dropoff", label: "Pickup/Dropoff" },
  { value: "other", label: "Other" }
];

const reminderOptions = [
  { value: "0", label: "At time of event" },
  { value: "15", label: "15 minutes before" },
  { value: "30", label: "30 minutes before" },
  { value: "60", label: "1 hour before" },
  { value: "1440", label: "1 day before" }
];

const colorOptions = [
  { value: "#f43f5e", label: "Rose" },
  { value: "#8b5cf6", label: "Purple" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#10b981", label: "Green" },
  { value: "#f59e0b", label: "Amber" }
];

const EventCreationDialog: React.FC<EventCreationDialogProps> = ({
  open,
  onOpenChange,
  connectionId,
  onEventCreated
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("other");
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [childName, setChildName] = useState("");
  const [color, setColor] = useState("#f43f5e");
  const [reminderMinutes, setReminderMinutes] = useState("60");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState("weekly");
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!title || !startDate) {
      toast({
        title: "Missing information",
        description: "Please provide a title and start date",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Combine date and time
      const startDateTime = new Date(startDate);
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      startDateTime.setHours(startHours, startMinutes, 0);

      const endDateTime = new Date(startDate);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      endDateTime.setHours(endHours, endMinutes, 0);

      const { error } = await (supabase as any)
        .from('shared_calendar_events')
        .insert({
          creator_id: user.id,
          connection_id: connectionId,
          title,
          description: description || null,
          event_type: eventType,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          location: location || null,
          child_name: childName || null,
          color,
          is_recurring: isRecurring,
          recurrence_rule: isRecurring ? recurrenceRule : null,
          reminder_minutes: parseInt(reminderMinutes)
        });

      if (error) throw error;

      toast({
        title: "Event created",
        description: "Calendar event has been added successfully"
      });

      // Reset form
      setTitle("");
      setDescription("");
      setEventType("other");
      setStartDate(undefined);
      setStartTime("09:00");
      setEndTime("10:00");
      setLocation("");
      setChildName("");
      setColor("#f43f5e");
      setReminderMinutes("60");
      setIsRecurring(false);
      setRecurrenceRule("weekly");
      
      onEventCreated();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        title: "Failed to create event",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Calendar Event</DialogTitle>
          <DialogDescription>
            Add a shared event to coordinate schedules
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Soccer practice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isCreating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-type">Event Type *</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger id="event-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10"
                  disabled={isCreating}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-10"
                  disabled={isCreating}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Park Avenue Field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isCreating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="child-name">Child's Name</Label>
            <Input
              id="child-name"
              placeholder="e.g., Emma"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              disabled={isCreating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add notes about this event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isCreating}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Event Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger id="color">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: opt.value }} />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder">Reminder</Label>
            <Select value={reminderMinutes} onValueChange={setReminderMinutes}>
              <SelectTrigger id="reminder">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reminderOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="recurring">Recurring Event</Label>
              <p className="text-sm text-muted-foreground">
                Repeat this event on a schedule
              </p>
            </div>
            <Switch
              id="recurring"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
              disabled={isCreating}
            />
          </div>

          {isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="recurrence">Repeat Frequency</Label>
              <Select value={recurrenceRule} onValueChange={setRecurrenceRule}>
                <SelectTrigger id="recurrence">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Every 2 weeks</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating || !title || !startDate}>
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventCreationDialog;
