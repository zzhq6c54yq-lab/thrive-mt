
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Handshake, Landmark, ArrowRight, CreditCard, Clock, Users, Check } from "lucide-react";
import Page from "@/components/Page";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BarterSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if there's a success query parameter
    const urlParams = new URLSearchParams(location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
      setShowSuccess(true);
      toast({
        title: "Application Submitted Successfully!",
        description: "We've received your barter system application and will review it shortly.",
      });
      
      // Clean up the URL
      navigate('/app/barter-system', { replace: true });
    }
  }, [location, navigate, toast]);

  // This function properly navigates to the financial assistance page
  const handleStartApplication = () => {
    navigate("/app/financial-assistance");
  };

  // This function properly navigates to the contact support page  
  const handleContactSupport = () => {
    navigate("/contact");
  };

  return (
    <Page title="Barter System" showBackButton={true}>
      <div className="space-y-8">
        {showSuccess && (
          <div className="bg-[#B87333]/10 border border-[#B87333]/30 p-6 rounded-xl mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="bg-[#B87333]/20 p-3 rounded-full">
                <Check className="h-6 w-6 text-[#B87333]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#B87333] mb-1">Application Submitted Successfully!</h2>
                <p className="text-white/80">
                  Thank you for applying to our barter system program. We'll review your application and 
                  get back to you within 2 business days with next steps.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#221F26] to-[#1a1a1f] p-8 mb-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B87333]/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center z-10 relative">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
                  Thrive MT Barter System:
                </span>
                <br />
                <span className="font-light">A Commitment to Accessible Mental Health Care</span>
              </h1>
              <p className="text-white/80 mb-6 leading-relaxed">
                At Thrive MT, we understand that mental health care is a fundamental human right, not a privilege reserved for those who can afford it.
              </p>
              <Button 
                variant="gold"
                className="group"
                onClick={() => document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="w-full md:w-72 h-72 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Handshake className="w-40 h-40 text-[#B87333]/30" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <HandHeart className="w-24 h-24 text-[#B87333]/60 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Description */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-white/10 bg-[#1a1a1f]/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <p className="text-white/90 leading-relaxed mb-4">
                  To ensure that everyone has access to the support they need, we have developed a unique barter system 
                  designed to accommodate individuals who may be facing financial barriers. This innovative approach allows 
                  clients to engage in therapy while also fostering a sense of community and personal growth.
                </p>
                <p className="text-white/90 leading-relaxed mb-4">
                  When a potential client finds that they cannot afford the standard cost of therapy, they can easily 
                  fill out an online financial assistance form. This streamlined process allows us to assess individual 
                  circumstances and approve requests for reduced fees. For example, if the cost of therapy is $200 and a 
                  client can only afford to pay $5, Thrive MT will work with them to create a manageable financial plan. 
                </p>
                <p className="text-white/90 leading-relaxed">
                  The remaining balance of $195 can be addressed through community service, reinforcing our belief that 
                  mental health wellness should be supported by collective effort and community involvement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#1a1a1f]/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-white">Equitable & Meaningful Service</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-white/90 leading-relaxed mb-4">
                  The community service component of our barter system is structured with fairness in mind. We recognize 
                  the value of each individual's time and effort, which is why the hourly rate for community service 
                  aligns with the state minimum wage.
                </p>
                <p className="text-white/90 leading-relaxed">
                  This ensures that clients can earn credit toward their therapy costs in a way that is both equitable 
                  and meaningful. By participating in community service, clients not only work toward their financial 
                  obligations but also contribute positively to the community, creating a reciprocal relationship between 
                  personal healing and social responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#1a1a1f]/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-white">Our Commitment</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-white/90 leading-relaxed mb-4">
                  At Thrive MT, we believe that everyone deserves access to mental health resources, regardless of their 
                  financial situation. Our barter system is a testament to our commitment to inclusivity and compassion. 
                </p>
                <p className="text-white/90 leading-relaxed mb-4">
                  By removing financial obstacles, we empower individuals to prioritize their mental health and well-being 
                  without the added stress of financial strain. This approach not only enhances individual wellness but 
                  also strengthens the fabric of our community as a whole.
                </p>
                <p className="text-white/90 leading-relaxed">
                  In summary, Thrive MT's barter system exemplifies our dedication to making mental health care accessible 
                  to all. By offering a flexible payment option that incorporates community service, we provide a pathway 
                  for individuals to receive the therapy they need while also contributing to the greater good. Together, 
                  we can work toward a future where mental health wellness is recognized as a basic human right, ensuring 
                  that no one is left behind in their journey to healing and self-discovery.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info Cards & Application */}
          <div className="space-y-6">
            <Card className="border-white/10 bg-[#1a1a1f]/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#B87333]/20 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Apply for Financial Assistance</h3>
                      <p className="text-white/70 text-sm">Fill out our financial assistance form to determine your eligibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-[#B87333]/20 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Contribute Your Time</h3>
                      <p className="text-white/70 text-sm">Earn credit through community service hours valued at your state's minimum wage.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-[#B87333]/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Receive Quality Care</h3>
                      <p className="text-white/70 text-sm">Access the same high-quality therapy and resources as all Thrive MT clients.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="apply-now" className="border-white/10 bg-[#221F26] shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#B87333]/10 rounded-full blur-3xl"></div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Apply Now</CardTitle>
                <CardDescription className="text-white/70">
                  Take the first step towards accessible mental health care
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <p className="text-white/80 text-sm">
                    Our application process is simple, discreet, and designed with your privacy in mind.
                  </p>
                  
                  <Button 
                    variant="gold" 
                    className="w-full group"
                    onClick={handleStartApplication}
                  >
                    Start Application
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <p className="text-white/60 text-xs text-center">
                    We typically respond to applications within 2 business days
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#1a1a1f]/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Contact Us</CardTitle>
                <CardDescription className="text-white/70">
                  Have questions about our barter system?
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-white/80 mb-4 text-sm">
                  Our team is here to answer any questions you might have about our barter system and 
                  how it can help you access the care you need.
                </p>
                <Button 
                  variant="gold-outline" 
                  className="w-full"
                  onClick={handleContactSupport}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BarterSystem;
