
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FinancialAssistance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    incomeRange: "",
    sessionCost: 200,
    canContribute: "",
    reason: "",
    preferredService: "",
    howHeard: "",
    availability: [],
    agreeToPolicies: false,
  });

  const updateForm = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone) {
          toast({
            title: "Missing information",
            description: "Please fill out all required fields.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 2:
        if (!formData.incomeRange || !formData.canContribute || !formData.reason) {
          toast({
            title: "Missing information",
            description: "Please fill out all required fields.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 3:
        if (!formData.preferredService || formData.availability.length === 0) {
          toast({
            title: "Missing information",
            description: "Please select your preferred service and availability.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 4:
        if (!formData.agreeToPolicies) {
          toast({
            title: "Agreement required",
            description: "You must agree to our policies to continue.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application submitted!",
        description: "We'll review your application and contact you within 2 business days.",
      });
      navigate("/app/barter-system?success=true");
    }, 2000);
  };

  const toggleAvailability = (day: string) => {
    setFormData((prev) => {
      const currentAvailability = [...prev.availability];
      if (currentAvailability.includes(day)) {
        return {
          ...prev,
          availability: currentAvailability.filter((d) => d !== day),
        };
      } else {
        return {
          ...prev,
          availability: [...currentAvailability, day],
        };
      }
    });
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
              i < step ? "bg-[#B87333] text-white" : 
              i === step ? "bg-[#B87333] text-white" : 
              "bg-white border border-gray-300 text-gray-500"
            }`}
          >
            {i < step ? <Check className="h-5 w-5" /> : i}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Page title="Financial Assistance Application" showBackButton={true}>
      <div className="max-w-3xl mx-auto">
        <Card className="border-white/10 bg-[#1a1a1f]/80 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#B87333]/20 to-[#B87333]/5 border-b border-[#B87333]/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-white">Barter System Application</CardTitle>
                <CardDescription className="text-white/70">
                  Step {step} of 4: {
                    step === 1 ? "Personal Information" :
                    step === 2 ? "Financial Information" :
                    step === 3 ? "Service Preferences" :
                    "Review & Submit"
                  }
                </CardDescription>
              </div>
              <div className="bg-[#B87333]/20 p-2 rounded-full">
                <FileText className="h-5 w-5 text-[#B87333]" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {renderStepIndicator()}

            {step === 1 && (
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="howHeard">How did you hear about us?</Label>
                  <Select 
                    value={formData.howHeard}
                    onValueChange={(value) => updateForm("howHeard", value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friend">Friend or Family</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="healthcare">Healthcare Provider</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={nextStep} className="bg-[#B87333] hover:bg-[#B87333]/90 text-white">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="incomeRange">Annual Household Income *</Label>
                  <Select 
                    value={formData.incomeRange}
                    onValueChange={(value) => updateForm("incomeRange", value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select an income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under15k">Under $15,000</SelectItem>
                      <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                      <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                      <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                      <SelectItem value="over75k">Over $75,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <p className="text-sm">Standard session cost: <span className="font-semibold">${formData.sessionCost}</span></p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canContribute">How much can you contribute per session? *</Label>
                  <Input
                    id="canContribute"
                    type="number"
                    min="0"
                    placeholder="Enter amount in dollars"
                    value={formData.canContribute}
                    onChange={(e) => updateForm("canContribute", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Please briefly explain why you're seeking financial assistance *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Share your current situation..."
                    value={formData.reason}
                    onChange={(e) => updateForm("reason", e.target.value)}
                    className="bg-white/10 border-white/20 text-white min-h-[100px]"
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="border-white/20 text-white hover:bg-white/10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={nextStep} className="bg-[#B87333] hover:bg-[#B87333]/90 text-white">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Service Preferences</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredService">Preferred Service Type *</Label>
                  <Select 
                    value={formData.preferredService}
                    onValueChange={(value) => updateForm("preferredService", value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Therapy</SelectItem>
                      <SelectItem value="group">Group Therapy</SelectItem>
                      <SelectItem value="family">Family Counseling</SelectItem>
                      <SelectItem value="substance">Substance Use Treatment</SelectItem>
                      <SelectItem value="other">Other Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Availability for Community Service (Select all that apply) *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Weekday Mornings", "Weekday Afternoons", "Weekday Evenings", "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings"].map((day) => (
                      <div
                        key={day}
                        onClick={() => toggleAvailability(day)}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          formData.availability.includes(day)
                            ? "bg-[#B87333]/30 border border-[#B87333]/50"
                            : "bg-white/10 border border-white/20 hover:bg-white/20"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded border ${
                            formData.availability.includes(day)
                              ? "bg-[#B87333] border-[#B87333]"
                              : "border-white/50"
                          }`}>
                            {formData.availability.includes(day) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>{day}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="border-white/20 text-white hover:bg-white/10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={nextStep} className="bg-[#B87333] hover:bg-[#B87333]/90 text-white">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Personal Information</h4>
                    <p>Name: {formData.fullName}</p>
                    <p>Email: {formData.email}</p>
                    <p>Phone: {formData.phone}</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Financial Information</h4>
                    <p>Income Range: {
                      formData.incomeRange === "under15k" ? "Under $15,000" :
                      formData.incomeRange === "15k-30k" ? "$15,000 - $30,000" :
                      formData.incomeRange === "30k-50k" ? "$30,000 - $50,000" :
                      formData.incomeRange === "50k-75k" ? "$50,000 - $75,000" :
                      formData.incomeRange === "over75k" ? "Over $75,000" :
                      "Not specified"
                    }</p>
                    <p>Session Cost: ${formData.sessionCost}</p>
                    <p>Your Contribution: ${formData.canContribute || 0}</p>
                    <p className="font-medium text-[#B87333]">Balance to be covered by community service: ${(formData.sessionCost - (parseInt(formData.canContribute) || 0)) || 0}</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Service Preferences</h4>
                    <p>Preferred Service: {
                      formData.preferredService === "individual" ? "Individual Therapy" :
                      formData.preferredService === "group" ? "Group Therapy" :
                      formData.preferredService === "family" ? "Family Counseling" :
                      formData.preferredService === "substance" ? "Substance Use Treatment" :
                      formData.preferredService === "other" ? "Other Services" :
                      "Not specified"
                    }</p>
                    <p>Available for community service: {formData.availability.join(", ") || "None selected"}</p>
                  </div>
                </div>
                
                <div className="bg-[#B87333]/10 p-4 rounded-lg border border-[#B87333]/30">
                  <div className="flex items-start space-x-2">
                    <div 
                      className={`w-5 h-5 rounded border mt-1 cursor-pointer flex items-center justify-center ${
                        formData.agreeToPolicies ? "bg-[#B87333] border-[#B87333]" : "border-white/50"
                      }`}
                      onClick={() => updateForm("agreeToPolicies", !formData.agreeToPolicies)}
                    >
                      {formData.agreeToPolicies && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <Label className="text-sm">
                        I understand that by applying for financial assistance, I am committing to participate in community service hours at the rate of the state minimum wage to cover the balance of my therapy costs. I also understand that all information provided will be kept confidential and used solely for determining financial assistance eligibility. *
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={prevStep} className="border-white/20 text-white hover:bg-white/10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting} 
                    className="bg-[#B87333] hover:bg-[#B87333]/90 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default FinancialAssistance;
