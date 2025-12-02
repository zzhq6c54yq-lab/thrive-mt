import { useState } from "react";
import { useBuddyMatch } from "@/hooks/useBuddyMatch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart, MessageCircle, Clock, Globe, Sparkles } from "lucide-react";

const EnhancedBuddyMatchingFlow = ({ userId }: { userId?: string }) => {
  const { createMatchRequest } = useBuddyMatch(userId);
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    goals: [] as string[],
    ageRange: "",
    experienceLevel: "",
    communicationStyle: "",
    availabilityTimes: [] as string[],
    conversationDepth: "",
    frequency: "",
    languages: [] as string[],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    interests: [] as string[],
  });

  const totalSteps = 10;

  const goalOptions = [
    "Anxiety Management", "Depression Support", "Sleep Improvement", "Stress Reduction",
    "Mindfulness Practice", "Exercise & Fitness", "Sobriety & Recovery", "Grief Support",
    "Caregiving Support", "Work-Life Balance", "Self-Esteem Building", "Relationship Issues"
  ];

  const ageRangeOptions = ["18-25", "26-35", "36-45", "46-55", "55+", "No Preference"];

  const experienceLevelOptions = [
    { value: "first-time", label: "First time seeking mental health support" },
    { value: "returning", label: "Returning after a break" },
    { value: "experienced", label: "Experienced with mental health journey" },
    { value: "peer-support", label: "Have provided peer support before" }
  ];

  const styleOptions = [
    "Supportive & Encouraging",
    "Direct & Honest",
    "Casual & Friendly",
    "Structured & Goal-Focused",
    "Gentle & Patient"
  ];

  const availabilityOptions = [
    "Weekday Mornings", "Weekday Afternoons", "Weekday Evenings",
    "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings"
  ];

  const depthOptions = [
    { value: "surface", label: "Light & Surface Level - General check-ins" },
    { value: "moderate", label: "Moderate Depth - Share struggles occasionally" },
    { value: "deep", label: "Deep Conversations - Open about challenges" }
  ];

  const frequencyOptions = [
    "Daily Check-ins",
    "2-3 times per week",
    "Weekly Updates",
    "As Needed"
  ];

  const languageOptions = ["English", "Spanish", "Portuguese", "Filipino", "French", "Mandarin", "Other"];

  const interestOptions = [
    "Meditation", "Exercise", "Journaling", "Reading", "Cooking", "Art/Creativity",
    "Gaming", "Music", "Nature/Outdoors", "Yoga", "Podcasts", "Movies/TV"
  ];

  const getStepTitle = () => {
    const titles: Record<number, string> = {
      1: "Your Goals",
      2: "Age Preference",
      3: "Experience Level",
      4: "Communication Style",
      5: "Availability",
      6: "Conversation Depth",
      7: "Check-in Frequency",
      8: "Languages",
      9: "Timezone",
      10: "Interests"
    };
    return titles[step];
  };

  const handleSubmit = () => {
    createMatchRequest.mutate(preferences);
  };

  const toggleArrayItem = (field: keyof typeof preferences, item: string) => {
    const arr = preferences[field] as string[];
    setPreferences(prev => ({
      ...prev,
      [field]: arr.includes(item)
        ? arr.filter(i => i !== item)
        : [...arr, item]
    }));
  };

  return (
    <Card className="p-8 glass-card max-w-2xl mx-auto bg-[#0a0a0a] border-[#D4AF37]/30">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">
              Step {step} of {totalSteps}: {getStepTitle()}
            </h2>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="space-y-4">
            <Label className="text-white">What are your main goals? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <Checkbox
                    id={goal}
                    checked={preferences.goals.includes(goal)}
                    onCheckedChange={() => toggleArrayItem('goals', goal)}
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37]"
                  />
                  <label htmlFor={goal} className="text-sm text-gray-300 cursor-pointer">{goal}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Age Range */}
        {step === 2 && (
          <div className="space-y-4">
            <Label className="text-white">Preferred age range for your buddy?</Label>
            <RadioGroup
              value={preferences.ageRange}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, ageRange: value }))}
              className="space-y-2"
            >
              {ageRangeOptions.map((range) => (
                <div key={range} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <RadioGroupItem value={range} id={range} className="border-[#D4AF37]/50" />
                  <Label htmlFor={range} className="text-gray-300 cursor-pointer">{range}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && (
          <div className="space-y-4">
            <Label className="text-white">What's your experience with mental health support?</Label>
            <RadioGroup
              value={preferences.experienceLevel}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, experienceLevel: value }))}
              className="space-y-2"
            >
              {experienceLevelOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <RadioGroupItem value={option.value} id={option.value} className="border-[#D4AF37]/50" />
                  <Label htmlFor={option.value} className="text-gray-300 cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Communication Style */}
        {step === 4 && (
          <div className="space-y-4">
            <Label className="text-white">What communication style do you prefer?</Label>
            <RadioGroup
              value={preferences.communicationStyle}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, communicationStyle: value }))}
              className="space-y-2"
            >
              {styleOptions.map((style) => (
                <div key={style} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <RadioGroupItem value={style} id={style} className="border-[#D4AF37]/50" />
                  <Label htmlFor={style} className="text-gray-300 cursor-pointer">{style}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 5: Availability */}
        {step === 5 && (
          <div className="space-y-4">
            <Label className="text-white">When are you typically available? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3">
              {availabilityOptions.map((time) => (
                <div key={time} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <Checkbox
                    id={time}
                    checked={preferences.availabilityTimes.includes(time)}
                    onCheckedChange={() => toggleArrayItem('availabilityTimes', time)}
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37]"
                  />
                  <label htmlFor={time} className="text-sm text-gray-300 cursor-pointer">{time}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Conversation Depth */}
        {step === 6 && (
          <div className="space-y-4">
            <Label className="text-white">How deep do you want conversations to go?</Label>
            <RadioGroup
              value={preferences.conversationDepth}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, conversationDepth: value }))}
              className="space-y-2"
            >
              {depthOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <RadioGroupItem value={option.value} id={option.value} className="border-[#D4AF37]/50" />
                  <Label htmlFor={option.value} className="text-gray-300 cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 7: Frequency */}
        {step === 7 && (
          <div className="space-y-4">
            <Label className="text-white">How often would you like to check in?</Label>
            <RadioGroup
              value={preferences.frequency}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, frequency: value }))}
              className="space-y-2"
            >
              {frequencyOptions.map((freq) => (
                <div key={freq} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <RadioGroupItem value={freq} id={freq} className="border-[#D4AF37]/50" />
                  <Label htmlFor={freq} className="text-gray-300 cursor-pointer">{freq}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 8: Languages */}
        {step === 8 && (
          <div className="space-y-4">
            <Label className="text-white">What languages are you comfortable with? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3">
              {languageOptions.map((lang) => (
                <div key={lang} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <Checkbox
                    id={lang}
                    checked={preferences.languages.includes(lang)}
                    onCheckedChange={() => toggleArrayItem('languages', lang)}
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37]"
                  />
                  <label htmlFor={lang} className="text-sm text-gray-300 cursor-pointer">{lang}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 9: Timezone */}
        {step === 9 && (
          <div className="space-y-4">
            <Label className="text-white">Your Timezone</Label>
            <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg">
              <Globe className="w-6 h-6 text-[#D4AF37]" />
              <div>
                <p className="text-white font-medium">{preferences.timezone}</p>
                <p className="text-xs text-gray-400">
                  We'll match you with someone in a compatible timezone for easier scheduling.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 10: Interests */}
        {step === 10 && (
          <div className="space-y-4">
            <Label className="text-white">What activities interest you? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg">
                  <Checkbox
                    id={interest}
                    checked={preferences.interests.includes(interest)}
                    onCheckedChange={() => toggleArrayItem('interests', interest)}
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37]"
                  />
                  <label htmlFor={interest} className="text-sm text-gray-300 cursor-pointer">{interest}</label>
                </div>
              ))}
            </div>
          </div>
        )}

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
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]" 
              disabled={createMatchRequest.isPending}
            >
              {createMatchRequest.isPending ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Finding Your Match...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Find My Buddy
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EnhancedBuddyMatchingFlow;
