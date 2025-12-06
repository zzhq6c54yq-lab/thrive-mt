import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SMSDialogProps {
  phoneNumber: string;
  clientId?: string;
  clientName?: string;
  trigger?: React.ReactNode;
}

const SMS_TEMPLATES = [
  { id: "custom", label: "Custom Message" },
  { id: "appointment_reminder", label: "Appointment Reminder" },
  { id: "wellness_checkin", label: "Wellness Check-in" },
  { id: "session_confirmation", label: "Session Confirmation" },
  { id: "reschedule", label: "Reschedule Notice" },
  { id: "follow_up", label: "Follow-up Message" },
];

export default function SMSDialog({
  phoneNumber,
  clientId,
  clientName,
  trigger,
}: SMSDialogProps) {
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState("custom");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const MAX_CHARS = 160;
  const charCount = message.length;

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    // Templates are handled server-side, but we can show preview
    if (value === "custom") {
      setMessage("");
    } else if (value === "wellness_checkin") {
      setMessage(`Hi ${clientName || "there"}, just checking in. How are you feeling today on a scale of 1-10? Reply with a number. - ThriveMT`);
    } else if (value === "follow_up") {
      setMessage(`Hi ${clientName || "there"}, hope you're doing well since our last session. Remember to practice the techniques we discussed. - ThriveMT`);
    } else if (value === "appointment_reminder") {
      setMessage(`Hi ${clientName || "there"}, this is a reminder about your therapy session tomorrow. - ThriveMT`);
    } else if (value === "session_confirmation") {
      setMessage(`Your therapy session has been confirmed. We look forward to seeing you! - ThriveMT`);
    } else if (value === "reschedule") {
      setMessage(`Hi ${clientName || "there"}, your session has been rescheduled. Please confirm by replying YES. - ThriveMT`);
    }
  };

  const handleSend = async () => {
    if (!phoneNumber) {
      toast({
        title: "No phone number",
        description: "Client phone number is not available.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim() && template === "custom") {
      toast({
        title: "Message required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke("send-sms", {
        body: {
          to: phoneNumber,
          message: template === "custom" ? message : undefined,
          template: template !== "custom" ? template : undefined,
          templateData: {
            name: clientName || "there",
          },
          clientId,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to send SMS");
      }

      toast({
        title: "SMS sent",
        description: `Message sent to ${clientName || phoneNumber}`,
      });

      setOpen(false);
      setMessage("");
      setTemplate("custom");

    } catch (error: any) {
      console.error("SMS error:", error);
      toast({
        title: "Failed to send SMS",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            SMS
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#B87333]" />
            Send SMS to {clientName || "Client"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Template</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {SMS_TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Message</Label>
              <span className={`text-xs ${charCount > MAX_CHARS ? 'text-red-400' : 'text-white/40'}`}>
                {charCount}/{MAX_CHARS}
              </span>
            </div>
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/5 border-white/10 min-h-[120px] resize-none"
              disabled={template !== "custom" && template !== ""}
            />
            {charCount > MAX_CHARS && (
              <p className="text-xs text-amber-400">
                Message exceeds 160 characters and may be split into multiple texts.
              </p>
            )}
          </div>

          <div className="text-xs text-white/40">
            <p>Sending to: {phoneNumber}</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isLoading || (!message.trim() && template === "custom")}
            className="bg-[#B87333] hover:bg-[#B8941F] text-black"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send SMS
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
