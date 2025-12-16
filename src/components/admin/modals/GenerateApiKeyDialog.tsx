import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Copy, Key } from "lucide-react";

interface GenerateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const GenerateApiKeyDialog = ({ open, onOpenChange, onSuccess }: GenerateApiKeyDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    partner_name: "",
    rate_limit: 1000,
    scopes: [] as string[],
  });

  const availableScopes = ["read:users", "write:users", "read:sessions", "write:sessions", "read:analytics", "admin"];

  const toggleScope = (scope: string) => {
    setFormData((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scope) ? prev.scopes.filter((s) => s !== scope) : [...prev.scopes, scope],
    }));
  };

  const generateRandomKey = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "thrive_";
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = generateRandomKey();
      const keyPrefix = apiKey.substring(0, 12);

      // In production, you'd hash the key before storing
      const { error } = await supabase.from("api_keys").insert({
        partner_name: formData.partner_name,
        key_hash: apiKey, // In production: hash this
        key_prefix: keyPrefix,
        rate_limit: formData.rate_limit,
        scopes: formData.scopes,
        is_active: true,
      });

      if (error) throw error;

      setGeneratedKey(apiKey);
      toast({ title: "API key generated successfully" });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error generating API key",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      toast({ title: "API key copied to clipboard" });
    }
  };

  const handleClose = () => {
    setGeneratedKey(null);
    setFormData({ partner_name: "", rate_limit: 1000, scopes: [] });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Generate API Key</DialogTitle>
          <DialogDescription className="text-slate-400">
            Create a new API key for partner access.
          </DialogDescription>
        </DialogHeader>

        {generatedKey ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400 mb-2">API Key Generated Successfully!</p>
              <p className="text-xs text-slate-400 mb-3">
                Copy this key now. You won't be able to see it again.
              </p>
              <div className="flex gap-2">
                <Input value={generatedKey} readOnly className="bg-slate-800 border-slate-700 text-white font-mono text-sm" />
                <Button variant="outline" onClick={copyToClipboard} className="border-slate-600">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleClose} className="bg-[#B87333] hover:bg-[#A66329]">
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner_name" className="text-white">Partner Name</Label>
              <Input
                id="partner_name"
                value={formData.partner_name}
                onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Partner Organization"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate_limit" className="text-white">Rate Limit (requests/hour)</Label>
              <Input
                id="rate_limit"
                type="number"
                value={formData.rate_limit}
                onChange={(e) => setFormData({ ...formData, rate_limit: Number(e.target.value) })}
                className="bg-slate-800 border-slate-700 text-white"
                min={100}
                max={100000}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Scopes</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableScopes.map((scope) => (
                  <div key={scope} className="flex items-center space-x-2">
                    <Checkbox
                      id={scope}
                      checked={formData.scopes.includes(scope)}
                      onCheckedChange={() => toggleScope(scope)}
                    />
                    <label htmlFor={scope} className="text-sm text-slate-300 cursor-pointer">
                      {scope}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} className="border-slate-600">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#B87333] hover:bg-[#A66329]" disabled={loading}>
                <Key className="h-4 w-4 mr-2" />
                {loading ? "Generating..." : "Generate Key"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
