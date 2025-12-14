
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';

interface OnboardingData {
  fullName: string;
  userType: string;
  goals: string[];
  mentalHealthNeeds: string[];
  consentAccepted: boolean;
}

const OnboardingWizard: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    userType: '',
    goals: [],
    mentalHealthNeeds: [],
    consentAccepted: false
  });
  const { updateProfile } = useUser();
  const { toast } = useToast();

  const steps = [
    { title: "Welcome! Let's get to know you", component: StepPersonalInfo },
    { title: "How do you identify?", component: StepUserType },
    { title: "What are your wellness goals?", component: StepGoals },
    { title: "What support are you looking for?", component: StepMentalHealthNeeds },
    { title: "Your Privacy & Consent", component: StepConsent }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    if (!data.consentAccepted) {
      toast({
        title: "Please accept the terms",
        description: "You need to agree to our Terms of Service and Privacy Policy to continue.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Get current user for audit log
      const { data: { user } } = await supabase.auth.getUser();
      
      // Log consent acceptance
      if (user) {
        await supabase.from('auth_user_audit').insert({
          user_id: user.id,
          action: 'CONSENT_ACCEPTED',
          details: {
            terms_version: '1.0',
            privacy_policy_accepted: true,
            timestamp: new Date().toISOString(),
            source: 'onboarding',
          },
        });
      }
      
      await updateProfile({
        user_type: data.userType,
        goals: [...data.goals, ...data.mentalHealthNeeds],
        onboarding_completed: true,
        consent_accepted_at: new Date().toISOString(),
      });
      
      toast({
        title: "Welcome aboard!",
        description: `Welcome to ThriveMT! Your personalized dashboard is ready.`,
        variant: "success"
      });
      
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive"
      });
    }
  };

  const CurrentStepComponent = steps[step].component;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-bronze/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bronze/10 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <Card className="w-full max-w-2xl shadow-2xl border border-border bg-card/95 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
            {steps[step].title}
          </CardTitle>
          <div className="flex justify-center mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 mx-1 rounded-full transition-colors ${
                  index <= step ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1]' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <CurrentStepComponent data={data} setData={setData} />
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-2 border-border text-foreground hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A0622D] hover:to-[#D4B48F] text-white"
            >
              {step === steps.length - 1 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StepPersonalInfo: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}> = ({ data, setData }) => (
  <div className="space-y-4">
    <Label htmlFor="fullName">What's your name?</Label>
    <Input
      id="fullName"
      value={data.fullName}
      onChange={(e) => setData({ ...data, fullName: e.target.value })}
      placeholder="Enter your full name"
      className="text-lg p-3"
    />
  </div>
);

const StepUserType: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}> = ({ data, setData }) => (
  <RadioGroup 
    value={data.userType} 
    onValueChange={(value) => setData({ ...data, userType: value })}
    className="space-y-3"
  >
    {[
      { value: 'veteran', label: '🎖️ Military Veteran', desc: 'Former military service member' },
      { value: 'adolescent', label: '🧒 Teen/Young Adult', desc: 'Ages 13-25' },
      { value: 'first_responder', label: '🚨 First Responder', desc: 'Police, Fire, EMS, Healthcare' },
      { value: 'educator', label: '📚 Educator', desc: 'Teacher, Professor, School Staff' },
      { value: 'corporate', label: '💼 Corporate Professional', desc: 'Business professional' },
      { value: 'golden_years', label: '🌅 Golden Years', desc: 'Senior adult (55+)' },
      { value: 'default', label: '👤 General User', desc: 'None of the above' }
    ].map((option) => (
      <div key={option.value} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${data.userType === option.value ? 'bg-[#B87333]/20 border border-[#B87333]/40' : 'hover:bg-muted border border-transparent'}`}>
        <RadioGroupItem value={option.value} id={option.value} />
        <div className="flex-1">
          <Label htmlFor={option.value} className="text-base font-medium cursor-pointer text-foreground">
            {option.label}
          </Label>
          <p className="text-sm text-muted-foreground">{option.desc}</p>
        </div>
      </div>
    ))}
  </RadioGroup>
);

const StepGoals: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}> = ({ data, setData }) => {
  const goals = [
    'Reduce stress and anxiety',
    'Improve sleep quality',
    'Build better relationships',
    'Increase self-confidence',
    'Manage work-life balance',
    'Process trauma or grief',
    'Develop coping strategies',
    'Improve communication skills'
  ];

  const toggleGoal = (goal: string) => {
    const newGoals = data.goals.includes(goal)
      ? data.goals.filter(g => g !== goal)
      : [...data.goals, goal];
    setData({ ...data, goals: newGoals });
  };

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground mb-4">Select all that apply to you:</p>
      {goals.map((goal) => (
        <div key={goal} className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${data.goals.includes(goal) ? 'bg-[#B87333]/20 border border-[#B87333]/40' : 'hover:bg-muted border border-transparent'}`}>
          <Checkbox
            id={goal}
            checked={data.goals.includes(goal)}
            onCheckedChange={() => toggleGoal(goal)}
          />
          <Label htmlFor={goal} className="cursor-pointer flex-1 text-foreground">
            {goal}
          </Label>
        </div>
      ))}
    </div>
  );
};

const StepMentalHealthNeeds: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}> = ({ data, setData }) => {
  const needs = [
    'Crisis support resources',
    'Therapy session scheduling',
    'Peer support community',
    'Mindfulness and meditation',
    'Journaling and reflection',
    'Educational resources',
    'Family support tools',
    'Professional counseling'
  ];

  const toggleNeed = (need: string) => {
    const newNeeds = data.mentalHealthNeeds.includes(need)
      ? data.mentalHealthNeeds.filter(n => n !== need)
      : [...data.mentalHealthNeeds, need];
    setData({ ...data, mentalHealthNeeds: newNeeds });
  };

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground mb-4">What kind of support are you looking for?</p>
      {needs.map((need) => (
        <div key={need} className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${data.mentalHealthNeeds.includes(need) ? 'bg-[#B87333]/20 border border-[#B87333]/40' : 'hover:bg-muted border border-transparent'}`}>
          <Checkbox
            id={need}
            checked={data.mentalHealthNeeds.includes(need)}
            onCheckedChange={() => toggleNeed(need)}
          />
          <Label htmlFor={need} className="cursor-pointer flex-1 text-foreground">
            {need}
          </Label>
        </div>
      ))}
    </div>
  );
};

const StepConsent: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}> = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-[#B87333]/10 rounded-lg border border-[#B87333]/30">
        <Shield className="h-8 w-8 text-[#B87333] flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground">Your Privacy Matters</h3>
          <p className="text-sm text-muted-foreground">
            We take your privacy seriously. Your mental health data is encrypted and protected.
          </p>
        </div>
      </div>
      
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>Before we continue, please review and accept our policies:</p>
        
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Your data is encrypted and stored securely</li>
          <li>We never share your personal information without consent</li>
          <li>You can export or delete your data at any time</li>
          <li>AI features are for support only, not medical advice</li>
        </ul>
      </div>

      <div className={`flex items-start space-x-3 p-4 rounded-lg transition-colors ${data.consentAccepted ? 'bg-[#B87333]/20 border-2 border-[#B87333]/50' : 'bg-muted/50 border-2 border-border hover:border-[#B87333]/40'}`}>
        <Checkbox
          id="consent"
          checked={data.consentAccepted}
          onCheckedChange={(checked) => setData({ ...data, consentAccepted: checked === true })}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer text-foreground">
          I have read and agree to the{' '}
          <Link to="/terms-of-service" className="text-[#B87333] hover:text-[#E5C5A1] underline" target="_blank">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-[#B87333] hover:text-[#E5C5A1] underline" target="_blank">
            Privacy Policy
          </Link>
          . I consent to the processing of my mental health data as described in these policies.
        </Label>
      </div>
      
      {!data.consentAccepted && (
        <p className="text-amber-500 text-sm flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Please accept the terms above to complete your setup.
        </p>
      )}
    </div>
  );
};

export default OnboardingWizard;
