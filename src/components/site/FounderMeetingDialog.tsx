import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FounderMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FounderMeetingDialog({ open, onOpenChange }: FounderMeetingDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    meetingReason: "",
    preferredTimes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.meetingReason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('investor_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          request_type: 'founder_meeting',
          meeting_reason: formData.meetingReason,
          preferred_times: formData.preferredTimes || null,
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-investor-request', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          meetingReason: formData.meetingReason,
          preferredTimes: formData.preferredTimes,
          requestType: 'founder_meeting',
        },
      });

      if (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast({
        title: "Meeting Request Submitted!",
        description: "We'll reach out to schedule a time that works for you.",
      });

      setFormData({ name: "", email: "", company: "", meetingReason: "", preferredTimes: "" });
      onOpenChange(false);
    } catch (error) {
      console.error('Meeting request error:', error);
      toast({
        title: "Request failed",
        description: "We couldn't process your request. Please email founder@thrive-mental.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-black border-bronze-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-400 to-bronze-500 bg-clip-text text-transparent flex items-center gap-2">
            <Calendar className="w-6 h-6 text-bronze-400" />
            Book a Founder Meeting
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Meet directly with our founder to discuss investment opportunities, partnerships, or vision.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">Company / Organization</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your firm or company"
              className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingReason" className="text-foreground">What Would You Like to Discuss? *</Label>
            <Textarea
              id="meetingReason"
              value={formData.meetingReason}
              onChange={(e) => setFormData({ ...formData, meetingReason: e.target.value })}
              placeholder="Investment opportunity, partnership, strategic collaboration..."
              rows={3}
              required
              className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredTimes" className="text-foreground">Preferred Meeting Times</Label>
            <Textarea
              id="preferredTimes"
              value={formData.preferredTimes}
              onChange={(e) => setFormData({ ...formData, preferredTimes: e.target.value })}
              placeholder="e.g., Weekday mornings, Tuesdays after 2pm..."
              rows={2}
              className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Meeting"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
