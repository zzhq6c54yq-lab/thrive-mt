import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, CheckCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CareerApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const positions = [
  "Licensed Clinical Social Worker (LCSW)",
  "Licensed Professional Counselor (LPC)",
  "Licensed Marriage & Family Therapist (LMFT)",
  "Clinical Psychologist (PhD/PsyD)",
  "Mental Wellness Coach",
  "Other Clinical Position",
];

export function CareerApplicationDialog({ open, onOpenChange }: CareerApplicationDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Resume must be under 10MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.position) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let resumeUrl = null;

      // Upload resume if provided
      if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Date.now()}-${formData.fullName.replace(/\s+/g, '-')}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        
        resumeUrl = publicUrl;
      }

      // Save to database
      const { error: dbError } = await supabase
        .from('career_applications')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          position: formData.position,
          cover_letter: formData.coverLetter || null,
          resume_url: resumeUrl,
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-career-application', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          coverLetter: formData.coverLetter,
          resumeUrl,
        },
      });

      if (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and get back to you soon.",
      });

      // Reset form
      setFormData({ fullName: "", email: "", phone: "", position: "", coverLetter: "" });
      setResumeFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: "Submission failed",
        description: "We couldn't submit your application. Please try again or email hiring@thrive-mental.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black border-bronze-500/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-400 to-bronze-500 bg-clip-text text-transparent">
            Apply to Join ThriveMT
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Upload your resume and tell us about yourself. We'll reach out if there's a fit.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your full name"
                required
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="text-foreground">Position *</Label>
              <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                <SelectTrigger className="bg-black/50 border-bronze-500/30">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className="text-foreground">Resume (PDF or Word)</Label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-bronze-500/30 hover:bg-bronze-500/10"
              >
                <Upload className="w-4 h-4 mr-2" />
                {resumeFile ? "Change File" : "Upload Resume"}
              </Button>
              {resumeFile && (
                <div className="flex items-center gap-2 text-bronze-400">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm truncate max-w-[200px]">{resumeFile.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-foreground">Cover Letter / Why ThriveMT?</Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Tell us about your experience and why you want to join ThriveMT..."
              rows={5}
              className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>

          <p className="text-xs text-foreground/50 text-center">
            By submitting, you agree to our privacy policy. Your information will only be used for recruitment purposes.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
