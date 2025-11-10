import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import HomeButton from "@/components/HomeButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const specialtiesOptions = [
  "Anxiety", "Depression", "Trauma", "PTSD", "Grief", "Relationships", 
  "Family Issues", "Work Stress", "Self-Esteem", "Identity", "LGBTQ+", 
  "Addiction", "Eating Disorders", "Life Transitions", "Chronic Illness"
];

export default function TherapistAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    specialties: [] as string[],
    approach: "",
    experience_years: 0,
    license_number: "",
    image_url: "",
    hourly_rate: 150,
  });

  const { data: therapists, isLoading } = useQuery({
    queryKey: ["therapists-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("therapists")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const addTherapist = useMutation({
    mutationFn: async (therapistData: typeof formData) => {
      const { data, error } = await supabase
        .from("therapists")
        .insert([therapistData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapists-admin"] });
      toast({ title: "Therapist added successfully" });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error adding therapist", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteTherapist = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("therapists")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapists-admin"] });
      toast({ title: "Therapist deleted successfully" });
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("therapists")
        .update({ is_active: !is_active })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapists-admin"] });
      toast({ title: "Therapist status updated" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      bio: "",
      specialties: [],
      approach: "",
      experience_years: 0,
      license_number: "",
      image_url: "",
      hourly_rate: 150,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTherapist.mutate(formData);
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <HomeButton />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/real-time-therapy">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold">Therapist Management</h1>
              <p className="text-muted-foreground">Add and manage therapist profiles</p>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Therapist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Therapist</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Licensed Clinical Psychologist"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Specialties *</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {specialtiesOptions.map((specialty) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => toggleSpecialty(specialty)}
                        className={`p-2 text-sm rounded-md border transition-colors ${
                          formData.specialties.includes(specialty)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="approach">Therapeutic Approach</Label>
                    <Input
                      id="approach"
                      placeholder="e.g., CBT, Mindfulness"
                      value={formData.approach}
                      onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience_years">Years of Experience</Label>
                    <Input
                      id="experience_years"
                      type="number"
                      min="0"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="license_number">License Number</Label>
                    <Input
                      id="license_number"
                      value={formData.license_number}
                      onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.hourly_rate}
                      onChange={(e) => setFormData({ ...formData, hourly_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image_url">Profile Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addTherapist.isPending}>
                    {addTherapist.isPending ? "Adding..." : "Add Therapist"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading therapists...</div>
        ) : !therapists || therapists.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">No therapists added yet</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Therapist
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {therapists.map((therapist) => (
              <Card key={therapist.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {therapist.image_url && (
                      <img
                        src={therapist.image_url}
                        alt={therapist.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{therapist.name}</h3>
                          <p className="text-muted-foreground">{therapist.title}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {therapist.specialties.map((specialty: string) => (
                              <span
                                key={specialty}
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm mt-2">
                            ${therapist.hourly_rate}/hour • {therapist.experience_years} years exp
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant={therapist.is_active ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleActive.mutate({ id: therapist.id, is_active: therapist.is_active })}
                          >
                            {therapist.is_active ? "Active" : "Inactive"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this therapist?")) {
                                deleteTherapist.mutate(therapist.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
