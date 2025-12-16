import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddSSOProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddSSOProviderDialog = ({ open, onOpenChange, onSuccess }: AddSSOProviderDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    tenant_id: "",
    provider: "saml",
    entity_id: "",
    sso_url: "",
    is_enabled: true,
  });

  useEffect(() => {
    if (open) {
      fetchTenants();
    }
  }, [open]);

  const fetchTenants = async () => {
    const { data } = await supabase.from("tenants").select("id, name").eq("is_active", true);
    setTenants(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("sso_configurations").insert({
        tenant_id: formData.tenant_id,
        provider: formData.provider,
        config: {
          entity_id: formData.entity_id,
          sso_url: formData.sso_url,
        },
        is_enabled: formData.is_enabled,
      });

      if (error) throw error;

      toast({ title: "SSO provider added successfully" });
      onSuccess();
      onOpenChange(false);
      setFormData({ tenant_id: "", provider: "saml", entity_id: "", sso_url: "", is_enabled: true });
    } catch (error) {
      toast({
        title: "Error adding SSO provider",
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
          <DialogTitle className="text-white">Add SSO Provider</DialogTitle>
          <DialogDescription className="text-slate-400">
            Configure Single Sign-On for an enterprise tenant.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Tenant</Label>
            <Select value={formData.tenant_id} onValueChange={(value) => setFormData({ ...formData, tenant_id: value })}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select a tenant" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {tenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">SSO Provider</Label>
            <Select value={formData.provider} onValueChange={(value) => setFormData({ ...formData, provider: value })}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="saml">SAML 2.0</SelectItem>
                <SelectItem value="oidc">OpenID Connect</SelectItem>
                <SelectItem value="azure">Azure AD</SelectItem>
                <SelectItem value="okta">Okta</SelectItem>
                <SelectItem value="google">Google Workspace</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="entity_id" className="text-white">Entity ID / Issuer</Label>
            <Input
              id="entity_id"
              value={formData.entity_id}
              onChange={(e) => setFormData({ ...formData, entity_id: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="https://idp.company.com/metadata"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sso_url" className="text-white">SSO Login URL</Label>
            <Input
              id="sso_url"
              value={formData.sso_url}
              onChange={(e) => setFormData({ ...formData, sso_url: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="https://idp.company.com/sso/login"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="is_enabled" className="text-white">Enable SSO</Label>
            <Switch
              id="is_enabled"
              checked={formData.is_enabled}
              onCheckedChange={(checked) => setFormData({ ...formData, is_enabled: checked })}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-600">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading || !formData.tenant_id}>
              {loading ? "Adding..." : "Add SSO Provider"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
