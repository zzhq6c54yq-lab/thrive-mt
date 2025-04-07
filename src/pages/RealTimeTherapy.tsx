
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, CheckCircle, Info, ArrowRight, Search, FileCheck, Calendar, CreditCard, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HomeButton from "@/components/HomeButton";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const insuranceProviders = [
  "Blue Cross Blue Shield",
  "Aetna",
  "UnitedHealthcare",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid"
];

const therapistKeywords = [
  { name: "Anxiety", icon: "💭" },
  { name: "Depression", icon: "😔" },
  { name: "Trauma", icon: "🛡️" },
  { name: "PTSD", icon: "⚡" },
  { name: "Grief", icon: "💔" },
  { name: "Relationships", icon: "👫" },
  { name: "Family Issues", icon: "👨‍👩‍👧‍👦" },
  { name: "Work Stress", icon: "💼" },
  { name: "Self-Esteem", icon: "🔍" },
  { name: "Identity", icon: "🧩" },
  { name: "LGBTQ+", icon: "🌈" },
  { name: "Addiction", icon: "🔄" },
  { name: "Eating Disorders", icon: "🍽️" },
  { name: "Life Transitions", icon: "🔄" },
  { name: "Chronic Illness", icon: "🏥" }
];

const importantFacts = [
  {
    title: "Therapy Takes Time",
    description: "Meaningful progress often takes multiple sessions. Be patient with yourself and the process."
  },
  {
    title: "It's Normal to Feel Uncomfortable",
    description: "Discussing difficult topics can bring up strong emotions. This is a normal part of healing."
  },
  {
    title: "Finding the Right Therapist Matters",
    description: "The therapeutic relationship is important. It's okay to try different therapists until you find the right fit."
  },
  {
    title: "Therapy is Confidential",
    description: "Your privacy is protected by law, with exceptions only in cases of imminent harm or abuse."
  }
];

const therapistProfiles = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    experience: "12 years",
    approach: "Cognitive Behavioral Therapy, Mindfulness",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 124,
    nextAvailable: "Today"
  },
  {
    id: 2,
    name: "Michael Rodriguez, LMFT",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Family Issues", "LGBTQ+"],
    experience: "8 years",
    approach: "Solution-Focused, Emotionally Focused Therapy",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 97,
    nextAvailable: "Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Amira Hassan",
    title: "Psychiatrist & Psychotherapist",
    specialties: ["Anxiety", "Depression", "Medication Management"],
    experience: "15 years",
    approach: "Integrative Psychiatry, Psychodynamic",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 143,
    nextAvailable: "This week"
  }
];

const TherapistMatchingDialog = () => {
  const [step, setStep] = useState(1);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [preferredApproach, setPreferredApproach] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [extraDetails, setExtraDetails] = useState("");
  const [insurance, setInsurance] = useState("");
  const [matchedTherapists, setMatchedTherapists] = useState(therapistProfiles);
  const { toast } = useToast();

  const handleNextStep = () => {
    if (step === 1 && concerns.length === 0) {
      toast({
        title: "Please select at least one concern",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 4) {
      // Simulate matching algorithm
      const filteredTherapists = therapistProfiles
        .filter(therapist => 
          concerns.some(concern => therapist.specialties.includes(concern))
        );
      
      setMatchedTherapists(
        filteredTherapists.length > 0 ? filteredTherapists : therapistProfiles
      );
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleSchedule = (therapistId: number) => {
    toast({
      title: "Appointment Scheduled!",
      description: "Your initial consultation has been confirmed.",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">What issues would you like to address?</h2>
            <p className="text-sm text-gray-500">Select all that apply.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {therapistKeywords.map((keyword, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleConcern(keyword.name)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors
                    ${concerns.includes(keyword.name) 
                      ? "bg-[#B87333]/10 border-[#B87333] text-[#B87333]" 
                      : "hover:border-[#B87333]/50"}
                  `}
                >
                  <span className="text-xl mr-2">{keyword.icon}</span>
                  <span>{keyword.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Therapy preferences</h2>
            
            <div className="space-y-4">
              <div>
                <Label>What approach would you prefer?</Label>
                <RadioGroup value={preferredApproach} onValueChange={setPreferredApproach}>
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="directive" id="directive" />
                    <Label htmlFor="directive">Directive (more structured guidance)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-directive" id="non-directive" />
                    <Label htmlFor="non-directive">Non-directive (more exploratory)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="no-preference" />
                    <Label htmlFor="no-preference">No preference</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Do you have a gender preference for your therapist?</Label>
                <RadioGroup value={preferredGender} onValueChange={setPreferredGender}>
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="no-preference-gender" />
                    <Label htmlFor="no-preference-gender">No preference</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Anything else you'd like your therapist to know?</Label>
                <Textarea 
                  placeholder="E.g., specific cultural considerations, previous therapy experience, etc."
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Insurance information</h2>
            <p className="text-sm text-gray-500">We'll match you with therapists that accept your insurance.</p>
            
            <div className="space-y-4">
              <div>
                <Label>Select your insurance provider</Label>
                <Select value={insurance} onValueChange={setInsurance}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select insurance provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                    <SelectItem value="self-pay">Self Pay / No Insurance</SelectItem>
                    <SelectItem value="other">Other (not listed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-top space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm leading-tight">
                  I authorize Thrive to share my information with matched therapists for the purpose of scheduling a consultation.
                </Label>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <Info className="h-4 w-4 inline-block mr-1" />
                  If your insurance isn't listed or you don't have insurance, select "Self Pay" and we can discuss sliding scale options.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Review and submit</h2>
            
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h3 className="text-sm font-medium">Issues to address</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {concerns.map((concern, idx) => (
                    <span key={idx} className="text-sm bg-[#B87333]/10 text-[#B87333] px-2 py-0.5 rounded-full">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
              
              {preferredApproach && (
                <div className="border-b pb-2">
                  <h3 className="text-sm font-medium">Preferred approach</h3>
                  <p className="text-sm">{preferredApproach}</p>
                </div>
              )}
              
              {preferredGender && (
                <div className="border-b pb-2">
                  <h3 className="text-sm font-medium">Preferred therapist gender</h3>
                  <p className="text-sm">{preferredGender}</p>
                </div>
              )}
              
              {insurance && (
                <div className="border-b pb-2">
                  <h3 className="text-sm font-medium">Insurance</h3>
                  <p className="text-sm">{insurance}</p>
                </div>
              )}
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 inline-block mr-1" />
                  We'll match you with therapists who specialize in your concerns and accept your insurance.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h2 className="text-xl font-medium">We found therapists for you!</h2>
              <p className="text-sm text-gray-500">
                Based on your preferences, these therapists would be a good match:
              </p>
            </div>
            
            <div className="space-y-4">
              {matchedTherapists.map((therapist) => (
                <div key={therapist.id} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center p-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={therapist.image} 
                        alt={therapist.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{therapist.name}</h3>
                      <p className="text-sm text-gray-600">{therapist.title}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm ml-1">{therapist.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-600">{therapist.reviews} reviews</span>
                        <span className="text-xs text-gray-500 mx-2">•</span>
                        <span className="text-sm text-green-600">Available {therapist.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {therapist.specialties.map((specialty, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            concerns.includes(specialty) 
                              ? "bg-[#B87333]/10 text-[#B87333]" 
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Approach:</span> {therapist.approach}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                    <span className="text-sm text-gray-600">{therapist.experience} experience</span>
                    <Button 
                      onClick={() => handleSchedule(therapist.id)}
                      className="bg-[#B87333] hover:bg-[#B87333]/90 text-white"
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Don't see a good fit? <Button variant="link" className="p-0 h-auto">View more therapists</Button>
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#B87333] hover:bg-[#B87333]/90 text-white font-medium w-full">
          <Search className="mr-2 h-4 w-4" />
          Match Me With A Therapist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Find Your Perfect Therapist Match</DialogTitle>
          <DialogDescription>
            Answer a few questions to help us match you with the right therapist for your needs.
          </DialogDescription>
        </DialogHeader>
        
        {step <= 4 && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`w-6 h-1 rounded-full ${s <= step ? 'bg-[#B87333]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500">Step {step} of 4</div>
          </div>
        )}
        
        {renderStep()}
        
        <DialogFooter className={step === 5 ? "justify-center" : ""}>
          {step > 1 && step < 5 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          {step < 5 && (
            <Button onClick={handleNextStep} className="bg-[#B87333] hover:bg-[#B87333]/90">
              {step === 4 ? 'Find Therapists' : 'Next Step'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 5 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Start New Search
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RealTimeTherapy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/home" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Real-Time Therapy</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Connect with licensed therapists through secure video sessions that fit your schedule and needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 max-w-6xl mx-auto">
        {/* Find a Therapist Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Find a Therapist That's Right for You</h2>
          
          <Card className="p-6 mb-10 bg-gradient-to-r from-[#F8F4EC] to-[#F3F0E9]">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2">What issues would you like to address?</h3>
                <p className="text-gray-600">
                  We'll match you with therapists specialized in your areas of concern
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "Find the Perfect Match", icon: <Users className="h-6 w-6 text-[#B87333]" />, description: "Answer a few questions and we'll connect you with therapists that fit your unique needs and preferences" },
                  { title: "Schedule an Appointment", icon: <Calendar className="h-6 w-6 text-[#B87333]" />, description: "Choose from available time slots that work with your schedule for in-person or virtual sessions" },
                  { title: "Simplified Payment", icon: <CreditCard className="h-6 w-6 text-[#B87333]" />, description: "We work with most major insurance providers and offer transparent self-pay options" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-center mb-2">
                      {item.icon}
                    </div>
                    <h4 className="text-center font-medium mb-1">{item.title}</h4>
                    <p className="text-center text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <TherapistMatchingDialog />
            </CardContent>
          </Card>
          
          <div className="mb-10">
            <h3 className="text-xl mb-6">Browse by Common Concerns</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {therapistKeywords.slice(0, 10).map((keyword, index) => (
                <Button 
                  key={index} 
                  variant="outline"
                  className="flex flex-col h-auto py-4 border-gray-200 hover:bg-[#B87333]/10 hover:text-[#B87333] hover:border-[#B87333]"
                >
                  <span className="text-2xl mb-1">{keyword.icon}</span>
                  <span className="text-sm text-center">{keyword.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
              alt="Woman in online therapy session"
              className="w-full rounded-lg object-cover h-[300px] md:h-full"
            />
            <div>
              <h3 className="text-xl mb-4">How Online Therapy Works</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Complete a brief questionnaire about your needs and preferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Browse therapist profiles and select someone you connect with</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Schedule your first session at a time that works for you</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Connect via our secure video platform from anywhere</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Continue regular sessions to build a therapeutic relationship</span>
                </li>
              </ul>
              <TherapistMatchingDialog />
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Insurance Information</h2>
          <p className="mb-6 text-lg">
            We work with most major insurance providers to make therapy accessible and affordable. 
            Verify your coverage during the sign-up process.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insuranceProviders.map((provider, index) => (
              <Card key={index} className="p-4 text-center hover:border-[#B87333]/50 transition-colors">
                {provider}
              </Card>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            Don't see your insurance? Contact us to discuss other payment options and sliding scale fees.
          </p>
        </section>

        {/* Before You Start Section */}
        <section>
          <h2 className="text-3xl font-light mb-8">Things to Know Before Starting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {importantFacts.map((fact, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <Info className="h-6 w-6 text-[#B87333] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl mb-2">{fact.title}</h3>
                    <p className="text-muted-foreground">{fact.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Ready to take the first step on your mental health journey?
            </p>
            <TherapistMatchingDialog />
          </div>
        </section>
      </div>
    </div>
  );
};

export default RealTimeTherapy;
