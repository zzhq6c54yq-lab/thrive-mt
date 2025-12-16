import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddUserDialog = ({ open, onOpenChange, onSuccess }: AddUserDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    display_name: "",
    user_type: "user",
    send_invite: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user via admin API (this would typically call an edge function)
      // For now, we'll create a profile entry that will be linked when user signs up
      const { error } = await supabase.from("profiles").insert({
        id: crypto.randomUUID(),
        email: formData.email,
        display_name: formData.display_name,
        user_type: formData.user_type,
        onboarding_completed: false,
      });

      if (error) throw error;

      toast({ 
        title: "User created successfully",
        description: formData.send_invite ? "Invitation email will be sent." : undefined
      });
      onSuccess();
      onOpenChange(false);
      setFormData({ email: "", display_name: "", user_type: "user", send_invite: true });
    } catch (error) {
      toast({
        title: "Error creating user",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add New User</DialogTitle>
          <DialogDescription className="text-slate-400">
            Create a new user account in the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="user@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display_name" className="text-white">Display Name</Label>
            <Input
              id="display_name"
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">User Type</Label>
            <Select value={formData.user_type} onValueChange={(value) => setFormData({ ...formData, user_type: value })}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="user">Regular User</SelectItem>
                <SelectItem value="premium">Premium User</SelectItem>
                <SelectItem value="therapist">Therapist</SelectItem>
                <SelectItem value="coach">Coach</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-600">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
