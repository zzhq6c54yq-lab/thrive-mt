import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, CheckCircle, Info, ArrowRight, Search, FileCheck, Calendar, CreditCard, Users, Loader2, Settings } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedProgressBar } from "@/components/therapy/AnimatedProgressBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTherapists } from "@/hooks/useTherapists";
import { BookingFlow } from "@/components/therapy/BookingFlow";

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

// Removed hardcoded therapist profiles - now using real database data

const TherapistMatchingDialog = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [preferredApproach, setPreferredApproach] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [extraDetails, setExtraDetails] = useState("");
  const [insurance, setInsurance] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);
  const { toast } = useToast();
  
  const { data: allTherapists, isLoading: loadingTherapists } = useTherapists();
  const [matchedTherapists, setMatchedTherapists] = useState<any[]>([]);

  const stepLabels = ["Concerns", "Preferences", "Insurance", "Review"];

  const handleNextStep = async () => {
    if (step === 1 && concerns.length === 0) {
      toast({
        title: "Please select at least one concern",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 4) {
      setIsSearching(true);
      
      // Simulate matching algorithm with loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const filteredTherapists = (allTherapists || [])
        .filter(therapist => 
          concerns.some(concern => therapist.specialties.includes(concern))
        );
      
      setMatchedTherapists(
        filteredTherapists.length > 0 ? filteredTherapists : (allTherapists || [])
      );
      
      setIsSearching(false);
    }
    
    setDirection(1);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleSchedule = (therapist: any) => {
    setSelectedTherapist(therapist);
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
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
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleConcern(keyword.name)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300
                    ${concerns.includes(keyword.name) 
                      ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] shadow-[0_0_20px_hsl(var(--primary)/0.2)] ring-2 ring-[hsl(var(--primary))]/20" 
                      : "hover:border-[hsl(var(--primary))]/50 hover:shadow-md hover:bg-muted/30"}
                  `}
                >
                  <span className="text-xl mr-2">{keyword.icon}</span>
                  <span className="font-medium">{keyword.name}</span>
                  {concerns.includes(keyword.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.div>
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
            {isSearching ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Loader2 className="h-12 w-12 text-[hsl(var(--primary))] mx-auto mb-2" />
                  </motion.div>
                  <h2 className="text-xl font-medium">Finding your perfect match...</h2>
                  <p className="text-sm text-muted-foreground">
                    Analyzing your preferences and matching with therapists
                  </p>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg overflow-hidden p-4">
                    <div className="flex items-center mb-4">
                      <Skeleton className="w-16 h-16 rounded-full mr-4" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="text-center mb-6"
                >
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h2 className="text-xl font-medium">We found {matchedTherapists.length} therapists for you!</h2>
                  <p className="text-sm text-muted-foreground">
                    Based on your preferences, these therapists would be a good match:
                  </p>
                </motion.div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {matchedTherapists.map((therapist, index) => (
                    <motion.div
                      key={therapist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                    >
                      <div className="flex items-center p-4">
                        {therapist.image_url && (
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 ring-2 ring-muted group-hover:ring-[hsl(var(--primary))] transition-all">
                            <img 
                              src={therapist.image_url} 
                              alt={therapist.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-grow">
                          <h3 className="font-medium">{therapist.name}</h3>
                          <p className="text-sm text-muted-foreground">{therapist.title}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm ml-1">{therapist.rating?.toFixed(1) || "N/A"}</span>
                            </div>
                            <span className="text-xs text-muted-foreground mx-2">•</span>
                            <span className="text-sm text-muted-foreground">{therapist.total_reviews || 0} reviews</span>
                            <span className="text-xs text-muted-foreground mx-2">•</span>
                            <span className="text-sm">${therapist.hourly_rate}/hr</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 pb-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {therapist.specialties.map((specialty, idx) => (
                            <motion.span 
                              key={idx}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                concerns.includes(specialty) 
                                  ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium" 
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {specialty}
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          <span className="font-medium">Approach:</span> {therapist.approach}
                        </p>
                      </div>
                      
                      <div className="bg-muted/30 px-4 py-3 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{therapist.experience_years} years exp</span>
                        <Button 
                          onClick={() => handleSchedule(therapist)}
                          className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white transition-all hover:scale-105"
                        >
                          Schedule Consultation
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Don't see a good fit? <Button variant="link" className="p-0 h-auto">View more therapists</Button>
                </p>
              </>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-medium w-full shadow-lg hover:shadow-xl transition-all">
            <Search className="mr-2 h-4 w-4" />
            Match Me With A Therapist
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] backdrop-blur-xl bg-background/95 border-muted shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Find Your Perfect Therapist Match</DialogTitle>
          <DialogDescription className="text-base">
            Answer a few questions to help us match you with the right therapist for your needs.
          </DialogDescription>
        </DialogHeader>
        
        {step <= 4 && (
          <AnimatedProgressBar 
            currentStep={step} 
            totalSteps={4} 
            stepLabels={stepLabels}
          />
        )}
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        
        <DialogFooter className={step === 5 ? "justify-center" : ""}>
          {step > 1 && step < 5 && (
            <Button variant="outline" onClick={handlePrevStep} className="hover:bg-muted">
              Back
            </Button>
          )}
          {step < 5 && (
            <Button 
              onClick={handleNextStep} 
              disabled={isSearching}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 hover:scale-105 transition-all"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                <>
                  {step === 4 ? 'Find Therapists' : 'Next Step'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
          {step === 5 && !isSearching && (
            <Button variant="outline" onClick={() => { setStep(1); setDirection(-1); }}>
              Start New Search
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {selectedTherapist && (
      <BookingFlow
        therapistId={selectedTherapist.id}
        therapistName={selectedTherapist.name}
        hourlyRate={selectedTherapist.hourly_rate}
        onClose={() => setSelectedTherapist(null)}
      />
    )}
  </>
  );
};

const RealTimeTherapy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary-glow))] to-[hsl(var(--primary))] text-white py-16 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link to="/home" className="inline-flex items-center text-white hover:text-white/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-light mb-4"
          >
            Real-Time Therapy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/90 max-w-3xl"
          >
            Connect with licensed therapists through secure video sessions that fit your schedule and needs.
          </motion.p>
        </div>
      </motion.div>

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
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-xl mb-6">Browse by Common Concerns</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {therapistKeywords.slice(0, 10).map((keyword, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline"
                    className="flex flex-col h-auto py-4 w-full hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-2xl mb-1">{keyword.icon}</span>
                    <span className="text-sm text-center">{keyword.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.img 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
              alt="Woman in online therapy session"
              className="w-full rounded-lg object-cover h-[300px] md:h-full shadow-lg"
            />
            <div>
              <h3 className="text-xl mb-4 font-medium">How Online Therapy Works</h3>
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
              <div className="mt-6">
                <TherapistMatchingDialog />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Insurance Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light mb-8">Insurance Information</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            We work with most major insurance providers to make therapy accessible and affordable. 
            Verify your coverage during the sign-up process.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insuranceProviders.map((provider, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Card className="p-4 text-center hover:border-[hsl(var(--primary))]/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {provider}
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            Don't see your insurance? Contact us to discuss other payment options and sliding scale fees.
          </p>
        </motion.section>

        {/* Before You Start Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-light mb-8">Things to Know Before Starting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {importantFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full border-muted hover:border-[hsl(var(--primary))]/30">
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Info className="h-6 w-6 text-[hsl(var(--primary))] flex-shrink-0" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl mb-2 font-medium">{fact.title}</h3>
                      <p className="text-muted-foreground">{fact.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg mb-6 max-w-3xl mx-auto text-muted-foreground">
              Ready to take the first step on your mental health journey?
            </p>
            <TherapistMatchingDialog />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default RealTimeTherapy;
