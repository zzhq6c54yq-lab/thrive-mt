import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Shield, Clock, Calendar, CheckCircle, Loader2, Brain, Heart, Users, Briefcase, AlertCircle } from "lucide-react";
import { useSmartMatch, SmartMatchRequest } from "@/hooks/useSmartMatch";
import { SmartMatchResults } from "./SmartMatchResults";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const INSURANCE_PROVIDERS = [
  "Blue Cross Blue Shield",
  "Aetna",
  "UnitedHealthcare",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid",
  "Anthem",
  "Optum",
  "Magellan",
  "Other"
];

const SESSION_TYPES = [
  { value: "Individual", label: "Individual Therapy", description: "One-on-one sessions with your therapist", icon: <Brain className="w-5 h-5" /> },
  { value: "Family", label: "Family Therapy", description: "Sessions involving family members", icon: <Users className="w-5 h-5" /> },
  { value: "Group", label: "Group Therapy", description: "Sessions with other individuals", icon: <Heart className="w-5 h-5" /> },
];

const SESSION_DURATIONS = [
  { value: 30, label: "30 minutes", description: "Brief check-in session" },
  { value: 45, label: "45 minutes", description: "Standard session" },
  { value: 60, label: "60 minutes", description: "Extended session" },
];

const CONCERNS = [
  { name: "Anxiety", icon: <Brain className="w-4 h-4" /> },
  { name: "Depression", icon: <Heart className="w-4 h-4" /> },
  { name: "Trauma/PTSD", icon: <Shield className="w-4 h-4" /> },
  { name: "Relationships", icon: <Users className="w-4 h-4" /> },
  { name: "Work Stress", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Grief", icon: <Heart className="w-4 h-4" /> },
  { name: "Life Transitions", icon: <AlertCircle className="w-4 h-4" /> },
  { name: "Self-Esteem", icon: <Brain className="w-4 h-4" /> },
];

interface SmartMatchIntakeFormProps {
  onClose?: () => void;
}

export function SmartMatchIntakeForm({ onClose }: SmartMatchIntakeFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: "",
    insurance: "",
    selfPayAllowed: true,
    sessionType: "Individual",
    sessionDuration: 60,
    preferredTime: "",
    concerns: [] as string[],
  });

  const { findMatchesAsync, isLoading, data: matchResults } = useSmartMatch();
  const totalSteps = 5;

  const handleNext = async () => {
    if (step === totalSteps) {
      // Submit and find matches
      const request: SmartMatchRequest = {
        state: formData.state,
        insurance: formData.insurance || undefined,
        sessionType: formData.sessionType,
        sessionDuration: formData.sessionDuration,
        preferredTime: formData.preferredTime || undefined,
        concerns: formData.concerns.length > 0 ? formData.concerns : undefined,
        selfPayAllowed: formData.selfPayAllowed,
      };
      await findMatchesAsync(request);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleConcern = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.state !== "";
      case 2: return true; // Insurance is optional
      case 3: return formData.sessionType !== "";
      case 4: return true; // Scheduling is optional
      case 5: return true; // Concerns are optional
      default: return true;
    }
  };

  if (matchResults) {
    return <SmartMatchResults results={matchResults} onBack={() => setStep(1)} onClose={onClose} />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl font-semibold text-center">
          Find Your Perfect Therapist Match
        </CardTitle>
        <div className="flex justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full transition-colors ${
                i + 1 <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-center text-muted-foreground">Step {step} of {totalSteps}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Location */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-medium">Where are you located?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll match you with therapists licensed in your state.
                </p>
                <Select value={formData.state} onValueChange={(v) => setFormData(prev => ({ ...prev, state: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 2: Insurance */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Shield className="w-5 h-5" />
                  <h3 className="font-medium">Insurance Information</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll match you with therapists that accept your insurance.
                </p>
                <Select value={formData.insurance} onValueChange={(v) => setFormData(prev => ({ ...prev, insurance: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your insurance provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {INSURANCE_PROVIDERS.map((provider) => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                    <SelectItem value="self-pay">Self Pay / No Insurance</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="selfPay"
                    checked={formData.selfPayAllowed}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, selfPayAllowed: !!checked }))}
                  />
                  <Label htmlFor="selfPay" className="text-sm">
                    Show self-pay therapists if no insurance match is found
                  </Label>
                </div>
              </div>
            )}

            {/* Step 3: Session Type */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Users className="w-5 h-5" />
                  <h3 className="font-medium">Session Preferences</h3>
                </div>
                
                <div className="space-y-3">
                  <Label>Session Type</Label>
                  <RadioGroup
                    value={formData.sessionType}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, sessionType: v }))}
                    className="grid gap-3"
                  >
                    {SESSION_TYPES.map((type) => (
                      <Label
                        key={type.value}
                        htmlFor={type.value}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.sessionType === type.value
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <div className="text-primary">{type.icon}</div>
                        <div>
                          <p className="font-medium">{type.label}</p>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3 pt-4">
                  <Label>Session Duration</Label>
                  <RadioGroup
                    value={String(formData.sessionDuration)}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, sessionDuration: Number(v) }))}
                    className="flex flex-wrap gap-3"
                  >
                    {SESSION_DURATIONS.map((duration) => (
                      <Label
                        key={duration.value}
                        htmlFor={`duration-${duration.value}`}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                          formData.sessionDuration === duration.value
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={String(duration.value)} id={`duration-${duration.value}`} />
                        <div>
                          <p className="font-medium">{duration.label}</p>
                          <p className="text-xs text-muted-foreground">{duration.description}</p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 4: Scheduling */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-medium">Scheduling Preferences</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  When do you prefer to have your sessions? (Optional)
                </p>
                <Select value={formData.preferredTime} onValueChange={(v) => setFormData(prev => ({ ...prev, preferredTime: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                    <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                    <SelectItem value="weekends">Weekends Only</SelectItem>
                    <SelectItem value="flexible">Flexible / No Preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 5: Concerns */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Heart className="w-5 h-5" />
                  <h3 className="font-medium">What would you like to work on?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select any concerns you'd like to address (optional)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {CONCERNS.map((concern) => (
                    <motion.div
                      key={concern.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleConcern(concern.name)}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.concerns.includes(concern.name)
                          ? 'border-primary bg-primary/10'
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <div className="text-primary">{concern.icon}</div>
                      <span className="text-sm font-medium">{concern.name}</span>
                      {formData.concerns.includes(concern.name) && (
                        <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={handleNext} disabled={!canProceed() || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Finding Matches...
              </>
            ) : step === totalSteps ? (
              <>
                Find Matches
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
