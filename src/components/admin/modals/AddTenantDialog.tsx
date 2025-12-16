import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddTenantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddTenantDialog = ({ open, onOpenChange, onSuccess }: AddTenantDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    subscription_tier: "basic",
    max_users: 100,
    custom_domain: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("tenants").insert({
        name: formData.name,
        subdomain: formData.subdomain.toLowerCase().replace(/\s+/g, "-"),
        subscription_tier: formData.subscription_tier,
        max_users: formData.max_users,
        custom_domain: formData.custom_domain || null,
        is_active: formData.is_active,
        current_user_count: 0,
      });

      if (error) throw error;

      toast({ title: "Tenant created successfully" });
      onSuccess();
      onOpenChange(false);
      setFormData({ name: "", subdomain: "", subscription_tier: "basic", max_users: 100, custom_domain: "", is_active: true });
    } catch (error) {
      toast({
        title: "Error creating tenant",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add Enterprise Tenant</DialogTitle>
          <DialogDescription className="text-slate-400">
            Set up a new enterprise client with their own workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Organization Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Acme Corporation"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subdomain" className="text-white">Subdomain</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                value={formData.subdomain}
                onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="acme"
                required
              />
              <span className="text-slate-400">.thrive-mental.com</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Subscription Tier</Label>
              <Select value={formData.subscription_tier} onValueChange={(value) => setFormData({ ...formData, subscription_tier: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_users" className="text-white">Max Users</Label>
              <Input
                id="max_users"
                type="number"
                value={formData.max_users}
                onChange={(e) => setFormData({ ...formData, max_users: Number(e.target.value) })}
                className="bg-slate-800 border-slate-700 text-white"
                min={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom_domain" className="text-white">Custom Domain (optional)</Label>
            <Input
              id="custom_domain"
              value={formData.custom_domain}
              onChange={(e) => setFormData({ ...formData, custom_domain: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="wellness.acme.com"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="is_active" className="text-white">Active</Label>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-600">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading}>
              {loading ? "Creating..." : "Create Tenant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
