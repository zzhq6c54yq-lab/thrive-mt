import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddTherapistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddTherapistDialog = ({ open, onOpenChange, onSuccess }: AddTherapistDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    hourly_rate: 150,
    specialties: "",
    experience_years: 5,
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const specialtiesArray = formData.specialties.split(",").map(s => s.trim()).filter(Boolean);

      const { error } = await supabase.from("therapists").insert({
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        hourly_rate: formData.hourly_rate,
        specialties: specialtiesArray,
        experience_years: formData.experience_years,
        is_active: formData.is_active,
        rating: null,
        total_reviews: 0,
      });

      if (error) throw error;

      toast({ title: "Therapist added successfully" });
      onSuccess();
      onOpenChange(false);
      setFormData({ name: "", title: "", bio: "", hourly_rate: 150, specialties: "", experience_years: 5, is_active: true });
    } catch (error) {
      toast({
        title: "Error adding therapist",
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
          <DialogTitle className="text-white">Add New Therapist</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new therapist to the platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Dr. Jane Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Licensed Clinical Psychologist"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Brief professional background and approach to therapy..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialties" className="text-white">Specialties (comma-separated)</Label>
            <Input
              id="specialties"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="Anxiety, Depression, CBT, Trauma"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourly_rate" className="text-white">Hourly Rate ($)</Label>
              <Input
                id="hourly_rate"
                type="number"
                value={formData.hourly_rate}
                onChange={(e) => setFormData({ ...formData, hourly_rate: Number(e.target.value) })}
                className="bg-slate-800 border-slate-700 text-white"
                min={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience_years" className="text-white">Years of Experience</Label>
              <Input
                id="experience_years"
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: Number(e.target.value) })}
                className="bg-slate-800 border-slate-700 text-white"
                min={0}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="is_active" className="text-white">Active (accepting new clients)</Label>
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
              {loading ? "Adding..." : "Add Therapist"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
