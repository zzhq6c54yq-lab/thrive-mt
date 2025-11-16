import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, X, Plus, Eye, Save, RotateCcw, ExternalLink } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  title: z.string().min(2, "Title is required").max(100),
  bio: z.string().max(1000).optional(),
  approach: z.string().max(800).optional(),
  specialties: z.array(z.string()).min(1, "Add at least one specialty").max(15),
  experience_years: z.number().min(0).max(70).optional().nullable(),
  license_number: z.string().max(50).optional(),
  hourly_rate: z.number().min(0).max(999),
  image_url: z.string().optional().nullable(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileTabProps {
  therapist: any;
  onUpdate: () => void;
}

const commonSpecialties = [
  "Anxiety & Depression",
  "Trauma & PTSD",
  "Relationship Issues",
  "Grief & Loss",
  "Addiction & Recovery",
  "Family Therapy",
  "Child & Adolescent",
  "Career Counseling",
  "LGBTQ+ Affirming",
  "Cultural Sensitivity",
  "Mindfulness & Meditation",
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "EMDR",
  "Stress Management",
  "Life Transitions",
  "Anger Management",
  "Eating Disorders",
  "OCD",
  "Bipolar Disorder",
];

export function ProfileTab({ therapist, onUpdate }: ProfileTabProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: therapist?.name || "",
      title: therapist?.title || "",
      bio: therapist?.bio || "",
      approach: therapist?.approach || "",
      specialties: therapist?.specialties || [],
      experience_years: therapist?.experience_years || null,
      license_number: therapist?.license_number || "",
      hourly_rate: Number(therapist?.hourly_rate) || 150,
      image_url: therapist?.image_url || null,
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const specialties = form.watch("specialties");
  const bio = form.watch("bio");
  const approach = form.watch("approach");

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image under 2MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${therapist.id}-${Date.now()}.${fileExt}`;
      const filePath = `therapist-avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("client-documents")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from("client-documents")
        .getPublicUrl(filePath);

      form.setValue("image_url", data.publicUrl, { shouldDirty: true });
      setImagePreview(data.publicUrl);

      toast({
        title: "Image uploaded",
        description: "Your profile photo has been uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const addSpecialty = () => {
    if (!newSpecialty.trim()) return;
    const current = form.getValues("specialties");
    if (current.includes(newSpecialty.trim())) {
      toast({
        title: "Duplicate specialty",
        description: "This specialty is already added",
        variant: "destructive",
      });
      return;
    }
    if (current.length >= 15) {
      toast({
        title: "Maximum reached",
        description: "You can only add up to 15 specialties",
        variant: "destructive",
      });
      return;
    }
    form.setValue("specialties", [...current, newSpecialty.trim()], { shouldDirty: true });
    setNewSpecialty("");
  };

  const removeSpecialty = (specialty: string) => {
    const current = form.getValues("specialties");
    form.setValue(
      "specialties",
      current.filter((s) => s !== specialty),
      { shouldDirty: true }
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("therapists")
        .update({
          name: data.name,
          title: data.title,
          bio: data.bio || null,
          approach: data.approach || null,
          specialties: data.specialties,
          experience_years: data.experience_years,
          license_number: data.license_number || null,
          hourly_rate: data.hourly_rate,
          image_url: data.image_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userData.user.id)
        .eq("id", therapist.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      form.reset(data);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleDiscard = () => {
    if (isDirty) {
      if (confirm("Discard unsaved changes?")) {
        form.reset();
        setImagePreview(null);
      }
    }
  };

  const profileCompleteness = () => {
    let score = 0;
    if (form.watch("name")) score += 15;
    if (form.watch("title")) score += 15;
    if (form.watch("bio") && form.watch("bio")!.length > 50) score += 20;
    if (form.watch("approach") && form.watch("approach")!.length > 50) score += 20;
    if (form.watch("specialties")?.length >= 3) score += 15;
    if (form.watch("image_url")) score += 15;
    return score;
  };

  const completeness = profileCompleteness();

  return (
    <div className="space-y-6">
      {/* Profile Completeness */}
      <Card className="bg-black/20 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Profile Completeness</CardTitle>
          <CardDescription>
            Complete your profile to attract more clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{completeness}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-black/20 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Basic Information</CardTitle>
              <CardDescription>
                Your public profile information visible to clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={imagePreview || form.watch("image_url") || ""} />
                  <AvatarFallback className="text-2xl">
                    {form.watch("name")?.charAt(0) || "T"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Upload className="h-4 w-4" />
                      Upload Profile Photo
                    </div>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended: 400x400px, JPG or PNG, under 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Sarah Johnson" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Licensed Clinical Psychologist" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience_years"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={70}
                          placeholder="10"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val ? parseInt(val) : null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="license_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="PSY12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hourly_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate (USD) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            min={0}
                            max={999}
                            step={5}
                            placeholder="150"
                            className="pl-7"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* About You */}
          <Card className="bg-black/20 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">About You</CardTitle>
              <CardDescription>
                Tell clients about your background and approach to therapy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your background, training, and what drives your passion for therapy..."
                        className="min-h-[120px] resize-none"
                        maxLength={1000}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <span>Help clients understand your journey and expertise</span>
                      <span className="text-xs">{bio?.length || 0}/1000</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="approach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Therapeutic Approach</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your therapeutic style, methodologies you use (CBT, DBT, EMDR, etc.), and how you work with clients..."
                        className="min-h-[120px] resize-none"
                        maxLength={800}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <span>Explain your methods and treatment philosophy</span>
                      <span className="text-xs">{approach?.length || 0}/800</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card className="bg-black/20 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Specialties & Focus Areas</CardTitle>
              <CardDescription>
                Add the areas where you have expertise (1-15 specialties)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Specialties */}
              <div className="flex flex-wrap gap-2">
                {specialties?.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="pr-1 py-1.5"
                  >
                    {specialty}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0.5 ml-1 hover:bg-transparent"
                      onClick={() => removeSpecialty(specialty)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {specialties?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No specialties added yet</p>
                )}
              </div>

              {/* Add Specialty */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type a specialty or select from suggestions..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSpecialty();
                    }
                  }}
                  disabled={specialties?.length >= 15}
                  list="specialty-suggestions"
                />
                <datalist id="specialty-suggestions">
                  {commonSpecialties.map((spec) => (
                    <option key={spec} value={spec} />
                  ))}
                </datalist>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpecialty}
                  disabled={!newSpecialty.trim() || specialties?.length >= 15}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>

              {/* Common Suggestions */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {commonSpecialties
                    .filter((spec) => !specialties?.includes(spec))
                    .slice(0, 8)
                    .map((spec) => (
                      <Button
                        key={spec}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewSpecialty(spec);
                          setTimeout(() => addSpecialty(), 0);
                        }}
                        disabled={specialties?.length >= 15}
                      >
                        {spec}
                      </Button>
                    ))}
                </div>
              </div>

              {form.formState.errors.specialties && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.specialties.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (therapist?.id) {
                  const url = `/therapist/${therapist.id}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                } else {
                  toast({
                    title: "Preview unavailable",
                    description: "Therapist profile not loaded yet",
                    variant: "destructive",
                  });
                }
              }}
              disabled={!therapist?.id}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview as Patient
            </Button>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscard}
                disabled={!isDirty || isSubmitting}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Discard Changes
              </Button>
              <Button type="submit" disabled={!isDirty || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
