import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
  status: string;
  target_user_count: number;
  scheduled_for: string | null;
  created_at: string;
}

interface ViewCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onSuccess: () => void;
}

export const ViewCampaignDialog = ({ open, onOpenChange, campaign, onSuccess }: ViewCampaignDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: campaign?.name || "",
    subject: campaign?.subject || "",
    content: campaign?.content || "",
    status: campaign?.status || "draft",
  });

  const handleSave = async () => {
    if (!campaign) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("marketing_campaigns")
        .update({
          name: formData.name,
          subject: formData.subject,
          content: formData.content,
          status: formData.status,
        })
        .eq("id", campaign.id);

      if (error) throw error;

      toast({ title: "Campaign updated successfully" });
      onSuccess();
      setEditing(false);
    } catch (error) {
      toast({
        title: "Error updating campaign",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNow = async () => {
    if (!campaign) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("marketing_campaigns")
        .update({ status: "sending" })
        .eq("id", campaign.id);

      if (error) throw error;

      toast({ title: "Campaign is now sending!" });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error sending campaign",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-500/20 text-green-400";
      case "sending": return "bg-blue-500/20 text-blue-400";
      case "scheduled": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">{editing ? "Edit Campaign" : "Campaign Details"}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {campaign.type} campaign
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {editing ? (
            <>
              <div className="space-y-2">
                <Label className="text-white">Campaign Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Subject</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                <Badge variant="outline">{campaign.type}</Badge>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{campaign.name}</h4>
                <p className="text-slate-400">{campaign.subject}</p>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-300 whitespace-pre-wrap">{campaign.content}</p>
              </div>
              <div className="text-sm text-slate-400">
                <p>Target: {campaign.target_user_count} users</p>
                <p>Created: {new Date(campaign.created_at).toLocaleString()}</p>
                {campaign.scheduled_for && (
                  <p>Scheduled: {new Date(campaign.scheduled_for).toLocaleString()}</p>
                )}
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)} className="border-slate-600">
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setEditing(true)} className="border-slate-600">
                Edit
              </Button>
              {campaign.status === "draft" && (
                <Button onClick={handleSendNow} className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading}>
                  {loading ? "Sending..." : "Send Now"}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
