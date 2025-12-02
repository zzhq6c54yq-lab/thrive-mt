import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Shield, Users, Award, CheckCircle } from "lucide-react";

interface PeerVolunteerSignupProps {
  userId?: string;
  onComplete?: () => void;
}

const PeerVolunteerSignup = ({ userId, onComplete }: PeerVolunteerSignupProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    trainingBackground: [] as string[],
    specialties: [] as string[],
    availabilityHours: "",
    motivation: "",
    agreeToGuidelines: false,
    agreeToBackground: false,
  });

  const totalSteps = 4;

  const trainingOptions = [
    "Mental Health First Aid",
    "Crisis Intervention Training",
    "Active Listening Certification",
    "Peer Support Specialist Training",
    "Recovery Coach Training",
    "Trauma-Informed Care",
    "No formal training (willing to learn)"
  ];

  const specialtyOptions = [
    "Anxiety & Stress",
    "Depression",
    "Grief & Loss",
    "Addiction Recovery",
    "LGBTQ+ Support",
    "Veterans/Military",
    "Caregiving",
    "Young Adults",
    "Chronic Illness",
    "General Support"
  ];

  const availabilityOptions = [
    "1-3 hours/week",
    "4-6 hours/week",
    "7-10 hours/week",
    "10+ hours/week"
  ];

  const handleSubmit = async () => {
    if (!userId) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to apply as a peer volunteer.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('buddy_volunteers' as any)
        .insert({
          user_id: userId,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          experience_description: formData.experience,
          training_background: formData.trainingBackground,
          specialties: formData.specialties,
          availability_hours: formData.availabilityHours,
          motivation: formData.motivation,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for wanting to help others. We'll review your application soon.",
      });
      
      onComplete?.();
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (field: 'trainingBackground' | 'specialties', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  return (
    <Card className="p-8 glass-card max-w-2xl mx-auto bg-[#0a0a0a] border-[#D4AF37]/30">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">Become a Peer Volunteer</h2>
          </div>
          <p className="text-gray-400">
            Help others on their mental health journey by becoming an accountability buddy volunteer.
          </p>
          
          {/* Progress */}
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold">Personal Information</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300">Full Name *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="bg-gray-800/50 border-[#D4AF37]/30 text-white"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label className="text-gray-300">Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800/50 border-[#D4AF37]/30 text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone (Optional)</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-gray-800/50 border-[#D4AF37]/30 text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Experience & Training */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
              <Award className="w-5 h-5" />
              <h3 className="font-semibold">Experience & Training</h3>
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Tell us about your experience</Label>
              <Textarea
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="bg-gray-800/50 border-[#D4AF37]/30 text-white min-h-[100px]"
                placeholder="Share your personal experience with mental health, recovery, or supporting others..."
              />
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Training Background (Select all that apply)</Label>
              <div className="grid grid-cols-1 gap-2">
                {trainingOptions.map((training) => (
                  <div key={training} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                    <Checkbox
                      id={training}
                      checked={formData.trainingBackground.includes(training)}
                      onCheckedChange={() => toggleArrayItem('trainingBackground', training)}
                      className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37]"
                    />
                    <label htmlFor={training} className="text-sm text-gray-300 cursor-pointer">{training}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Specialties & Availability */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
              <Shield className="w-5 h-5" />
              <h3 className="font-semibold">Specialties & Availability</h3>
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Areas you'd like to support (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {specialtyOptions.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                    <Checkbox
                      id={specialty}
                      checked={formData.specialties.includes(specialty)}
                      onCheckedChange={() => toggleArrayItem('specialties', specialty)}
                      className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37]"
                    />
                    <label htmlFor={specialty} className="text-sm text-gray-300 cursor-pointer">{specialty}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Weekly Availability</Label>
              <RadioGroup
                value={formData.availabilityHours}
                onValueChange={(value) => setFormData(prev => ({ ...prev, availabilityHours: value }))}
                className="space-y-2"
              >
                {availabilityOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                    <RadioGroupItem value={option} id={option} className="border-[#D4AF37]/50" />
                    <Label htmlFor={option} className="text-gray-300 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 4: Motivation & Agreement */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
              <Heart className="w-5 h-5" />
              <h3 className="font-semibold">Your Why & Agreements</h3>
            </div>
            
            <div>
              <Label className="text-gray-300 mb-2 block">Why do you want to be a peer volunteer?</Label>
              <Textarea
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                className="bg-gray-800/50 border-[#D4AF37]/30 text-white min-h-[100px]"
                placeholder="Share what motivates you to help others on their mental health journey..."
              />
            </div>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-start space-x-3 bg-gray-800/50 p-4 rounded-lg">
                <Checkbox
                  id="guidelines"
                  checked={formData.agreeToGuidelines}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToGuidelines: checked as boolean }))}
                  className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] mt-1"
                />
                <label htmlFor="guidelines" className="text-sm text-gray-300 cursor-pointer">
                  I agree to follow ThriveMT's peer support guidelines, including maintaining confidentiality, 
                  setting appropriate boundaries, and escalating crisis situations to professional staff.
                </label>
              </div>
              
              <div className="flex items-start space-x-3 bg-gray-800/50 p-4 rounded-lg">
                <Checkbox
                  id="background"
                  checked={formData.agreeToBackground}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToBackground: checked as boolean }))}
                  className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] mt-1"
                />
                <label htmlFor="background" className="text-sm text-gray-300 cursor-pointer">
                  I understand that a brief screening process may be required and consent to providing 
                  additional information if requested.
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)} 
              className="flex-1 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              Back
            </Button>
          )}
          {step < totalSteps ? (
            <Button 
              onClick={() => setStep(step + 1)} 
              className="flex-1 bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]"
              disabled={step === 1 && (!formData.fullName || !formData.email)}
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]" 
              disabled={loading || !formData.agreeToGuidelines || !formData.agreeToBackground}
            >
              {loading ? (
                "Submitting..."
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Submit Application
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PeerVolunteerSignup;
