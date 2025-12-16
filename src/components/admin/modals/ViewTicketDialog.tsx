import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface Ticket {
  id: string;
  ticket_number: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  is_crisis: boolean;
  created_at: string;
  first_response_at: string | null;
  resolved_at: string | null;
}

interface ViewTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket | null;
  onSuccess: () => void;
}

export const ViewTicketDialog = ({ open, onOpenChange, ticket, onSuccess }: ViewTicketDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [newStatus, setNewStatus] = useState(ticket?.status || "open");

  const handleRespond = async () => {
    if (!ticket || !response.trim()) return;
    setLoading(true);

    try {
      // Insert response
      await supabase.from("ticket_responses").insert([{
        ticket_id: ticket.id,
        message: response,
        responder_type: "admin",
      }]);

      // Update ticket status and first response time
      await supabase.from("support_tickets").update({
        status: newStatus,
        first_response_at: ticket.first_response_at || new Date().toISOString(),
        resolved_at: newStatus === "resolved" ? new Date().toISOString() : null,
      }).eq("id", ticket.id);

      toast({ title: "Response sent successfully" });
      onSuccess();
      onOpenChange(false);
      setResponse("");
    } catch (error) {
      toast({
        title: "Error sending response",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500/20 text-red-400";
      case "high": return "bg-orange-500/20 text-orange-400";
      case "medium": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-green-500/20 text-green-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {ticket.is_crisis && <AlertTriangle className="h-5 w-5 text-red-400" />}
            Ticket {ticket.ticket_number}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {ticket.subject}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
            <Badge variant="outline" className="text-slate-300">{ticket.category}</Badge>
            {ticket.is_crisis && <Badge className="bg-red-500/20 text-red-400">🚨 CRISIS</Badge>}
          </div>
          <div className="text-sm text-slate-400">
            <p>Created: {new Date(ticket.created_at).toLocaleString()}</p>
            {ticket.first_response_at && (
              <p>First Response: {new Date(ticket.first_response_at).toLocaleString()}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-white">Update Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="waiting_user">Waiting on User</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="response" className="text-white">Response</Label>
            <Textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
              placeholder="Type your response to the user..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-600">
            Cancel
          </Button>
          <Button onClick={handleRespond} className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading || !response.trim()}>
            {loading ? "Sending..." : "Send Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
