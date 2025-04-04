
import React, { useState } from "react";
import { ArrowLeft, DollarSign, ClipboardList, FileText, HelpCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";

const FinancialAssistance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("programs");
  const [applicationStep, setApplicationStep] = useState<number>(0);

  const handleApplyClick = (program?: string) => {
    setActiveTab("apply");
    toast({
      title: "Application Started",
      description: program ? `You're applying for the ${program} program` : "Your financial assistance application has been initiated.",
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const startApplicationStep = (step: number) => {
    setApplicationStep(step);
    toast({
      title: `Step ${step} Started`,
      description: `You've started step ${step} of the application process.`,
    });
  };

  return (
    <Page title="Financial Assistance">
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
        <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Button 
                onClick={handleBackClick}
                variant="ghost" 
                className="text-green-400 hover:text-green-300 hover:bg-transparent p-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <HomeButton />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-4">Financial Assistance</h1>
            <p className="text-xl text-gray-300 max-w-3xl">Resources and programs to help make mental healthcare affordable.</p>
          </div>
        </div>

        <div className="container px-4 py-12 max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="programs">Assistance Programs</TabsTrigger>
              <TabsTrigger value="apply">Apply</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="programs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Available Financial Assistance
                  </CardTitle>
                  <CardDescription>
                    Programs designed to make mental healthcare accessible to everyone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-medium mb-2">Sliding Scale Fee Program</h3>
                      <p className="text-gray-700 mb-4">
                        Our sliding scale fee program adjusts the cost of therapy based on your income level. 
                        Pay what you can afford, ensuring that quality mental healthcare is accessible regardless of financial situation.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Based on household income</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">No minimum payment</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Reevaluated annually</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Simple application process</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleApplyClick("Sliding Scale Fee")}
                      >
                        Learn More & Apply
                      </Button>
                    </div>
                    
                    <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-medium mb-2">Therapy Scholarship Fund</h3>
                      <p className="text-gray-700 mb-4">
                        Our scholarship fund provides fully-funded therapy sessions for individuals facing significant financial hardship.
                        Limited scholarships are available based on need and are renewed every three months.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">100% covered sessions</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">3-month commitment</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Requires documentation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Competitive application</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleApplyClick("Therapy Scholarship Fund")}
                      >
                        Learn More & Apply
                      </Button>
                    </div>
                    
                    <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-medium mb-2">Payment Plans</h3>
                      <p className="text-gray-700 mb-4">
                        Flexible payment plans allow you to spread the cost of therapy over time with no interest charges.
                        Design a payment schedule that works with your budget.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">0% interest</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Customizable schedule</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">No credit check</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Easy setup</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleApplyClick("Payment Plan")}
                      >
                        Set Up Payment Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="apply" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-blue-500" />
                    Financial Assistance Application
                  </CardTitle>
                  <CardDescription>
                    Start your application for financial support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        Before You Begin
                      </h3>
                      <p className="text-gray-700 mb-2">
                        You'll need the following documents ready for upload:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>Proof of income (pay stubs, tax returns, etc.)</li>
                        <li>Proof of expenses (rent/mortgage, utilities, etc.)</li>
                        <li>Insurance information (if applicable)</li>
                        <li>Any relevant documentation of financial hardship</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Application Steps</h3>
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep === 1 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'} font-medium flex-shrink-0`}>
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Personal Information</h4>
                          <p className="text-gray-700 mb-2">
                            Basic contact details and demographic information.
                          </p>
                          <Button 
                            size="sm"
                            onClick={() => startApplicationStep(1)}
                          >
                            {applicationStep === 1 ? 'Currently in Progress' : 'Start Step 1'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep === 2 ? 'bg-blue-500 text-white' : (applicationStep > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')} font-medium flex-shrink-0`}>
                          2
                        </div>
                        <div>
                          <h4 className={`font-medium ${applicationStep < 1 ? 'text-gray-500' : ''}`}>Financial Information</h4>
                          <p className={`${applicationStep < 1 ? 'text-gray-500' : 'text-gray-700'} mb-2`}>
                            Income details, expenses, and financial obligations.
                          </p>
                          <Button 
                            size="sm" 
                            variant={applicationStep < 1 ? "outline" : "default"}
                            disabled={applicationStep < 1}
                            onClick={() => applicationStep >= 1 && startApplicationStep(2)}
                          >
                            {applicationStep === 2 ? 'Currently in Progress' : (applicationStep < 1 ? 'Complete Step 1 First' : 'Start Step 2')}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep === 3 ? 'bg-blue-500 text-white' : (applicationStep > 1 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')} font-medium flex-shrink-0`}>
                          3
                        </div>
                        <div>
                          <h4 className={`font-medium ${applicationStep < 2 ? 'text-gray-500' : ''}`}>Document Upload</h4>
                          <p className={`${applicationStep < 2 ? 'text-gray-500' : 'text-gray-700'} mb-2`}>
                            Upload required financial documentation.
                          </p>
                          <Button 
                            size="sm" 
                            variant={applicationStep < 2 ? "outline" : "default"}
                            disabled={applicationStep < 2}
                            onClick={() => applicationStep >= 2 && startApplicationStep(3)}
                          >
                            {applicationStep === 3 ? 'Currently in Progress' : (applicationStep < 2 ? 'Complete Step 2 First' : 'Start Step 3')}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${applicationStep === 4 ? 'bg-blue-500 text-white' : (applicationStep > 2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')} font-medium flex-shrink-0`}>
                          4
                        </div>
                        <div>
                          <h4 className={`font-medium ${applicationStep < 3 ? 'text-gray-500' : ''}`}>Review & Submit</h4>
                          <p className={`${applicationStep < 3 ? 'text-gray-500' : 'text-gray-700'} mb-2`}>
                            Review your application and submit for consideration.
                          </p>
                          <Button 
                            size="sm" 
                            variant={applicationStep < 3 ? "outline" : "default"}
                            disabled={applicationStep < 3}
                            onClick={() => applicationStep >= 3 && startApplicationStep(4)}
                          >
                            {applicationStep === 4 ? 'Submit Application' : (applicationStep < 3 ? 'Complete Previous Steps' : 'Review & Submit')}
                          </Button>
                        </div>
                      </div>
                      
                      {applicationStep === 4 && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="text-green-700 font-medium">Ready to Submit</h4>
                          <p className="text-green-700 mb-4">Your application is complete and ready for submission.</p>
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              toast({
                                title: "Application Submitted",
                                description: "Your financial assistance application has been submitted successfully. We'll review it within 5-7 business days.",
                              });
                              setApplicationStep(0);
                              setActiveTab("programs");
                            }}
                          >
                            Submit Application
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Applications are typically reviewed within 5-7 business days. You will be notified via email once a decision has been made.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Who qualifies for financial assistance?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Our financial assistance programs are designed to help individuals who face financial barriers to 
                          accessing mental healthcare. Eligibility is primarily based on income, expenses, and financial need. 
                          We use a sliding scale approach, meaning that the amount of assistance varies based on your specific 
                          financial situation. Our goal is to ensure that anyone who needs mental health support can access it, 
                          regardless of financial circumstances.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How much can I expect to pay with financial assistance?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Payment amounts vary widely based on individual financial circumstances. With our sliding scale program, 
                          you might pay anywhere from $5 to the full session fee based on your income and expenses. The Therapy 
                          Scholarship Fund may cover 100% of costs for those with significant financial hardship. During the application 
                          process, we'll provide an estimate of what your session costs would be with assistance.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How long does the application process take?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          The application itself typically takes about 30 minutes to complete if you have all required documents ready. 
                          Once submitted, applications are usually reviewed within 5-7 business days. In urgent situations, we can expedite 
                          the process - please contact our support team if you need immediate assistance.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Will applying for financial assistance affect my credit score?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          No, applying for our financial assistance programs will not affect your credit score. We do not run credit checks 
                          as part of the application process, and your information is kept strictly confidential.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>What if my financial situation changes?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          We understand that financial circumstances can change. If your situation improves or worsens after you've 
                          been approved for assistance, please contact us to reassess your eligibility. Our sliding scale is designed 
                          to be flexible and accommodate changes in your financial situation.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Can I still choose my therapist with financial assistance?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Yes, receiving financial assistance does not limit your choice of therapists. You can work with any therapist 
                          in our network who is accepting new clients. However, please note that some specialists with unique expertise 
                          may have limited availability for subsidized sessions.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" onClick={() => {
                    toast({
                      title: "Contact Support",
                      description: "Our financial support team will reach out to you within 24 hours.",
                    });
                  }}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Ask a Different Question
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Page>
  );
};

export default FinancialAssistance;
