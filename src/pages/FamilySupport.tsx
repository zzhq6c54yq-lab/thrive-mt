
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Users, BookOpen, MessageCircle, Video, Calendar, Download, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const FamilySupport = () => {
  const { toast } = useToast();

  const handleResourceAction = (action: string) => {
    toast({
      title: action,
      description: "Resource added to your saved items.",
    });
  };

  const resources = [
    {
      title: "Supporting a Loved One with Depression",
      description: "Learn how to provide meaningful support to family members experiencing depression.",
      type: "Guide",
      time: "15 min read"
    },
    {
      title: "Communication Strategies for Families",
      description: "Effective techniques for improving communication about mental health within families.",
      type: "Article",
      time: "10 min read"
    },
    {
      title: "Recognizing Warning Signs",
      description: "How to identify signs that your loved one may need additional mental health support.",
      type: "Checklist",
      time: "5 min read"
    },
    {
      title: "Self-Care for Caregivers",
      description: "Maintaining your own mental health while supporting others.",
      type: "Guide",
      time: "12 min read"
    }
  ];

  const workshops = [
    {
      title: "Family Communication Workshop",
      date: "June 25, 2023",
      time: "7:00 PM EST",
      description: "Learn effective communication techniques for discussing mental health within families.",
      participants: 24
    },
    {
      title: "Supporting Teens with Anxiety",
      date: "July 2, 2023",
      time: "6:30 PM EST",
      description: "Specialized guidance for parents of teenagers experiencing anxiety disorders.",
      participants: 18
    },
    {
      title: "Caregiver Resilience Building",
      date: "July 10, 2023",
      time: "7:00 PM EST",
      description: "Strategies to maintain your wellbeing while supporting a family member with mental health challenges.",
      participants: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/25 to-[#B87333]/15 transform -skew-y-3"></div>
          <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/10 via-[#B87333]/15 to-[#E5C5A1]/10 transform skew-y-2"></div>
        </div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Family & Caregiver Support</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Resources and guidance for supporting loved ones through their mental health journey.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="support">Support Groups</TabsTrigger>
            <TabsTrigger value="consultation">Consultation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="border-[#B87333]/30 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <span className="px-2 py-1 bg-[#B87333]/10 text-[#B87333] text-xs rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{resource.time}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      onClick={() => handleResourceAction("Resource Saved")}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResourceAction("Resource Downloaded")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="border-[#B87333]/30 bg-[#B87333]/5 mt-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#B87333]" />
                  Featured Guide
                </CardTitle>
                <CardDescription>
                  Comprehensive resource for families and caregivers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">The Family Mental Health Toolkit</h3>
                  <p className="text-gray-700 mb-4">
                    A complete guide for families supporting loved ones with mental health challenges. Includes communication strategies, crisis planning, self-care tips, and resource directories.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      30+ resources
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Printable worksheets
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Expert reviewed
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-[#B87333] hover:bg-[#A56625]"
                    onClick={() => handleResourceAction("Toolkit Downloaded")}
                  >
                    Download Toolkit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workshops" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {workshops.map((workshop, index) => (
                <Card key={index} className="border-[#B87333]/30 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{workshop.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {workshop.date} • {workshop.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{workshop.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{workshop.participants} participants registered</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      onClick={() => {
                        toast({
                          title: "More Information",
                          description: `Details about ${workshop.title} workshop are now available.`,
                        });
                      }}
                    >
                      More Info
                    </Button>
                    <Button 
                      className="bg-[#B87333] hover:bg-[#A56625]"
                      onClick={() => {
                        toast({
                          title: "Registration Confirmed",
                          description: `You've been registered for ${workshop.title}.`,
                        });
                      }}
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="border-[#B87333]/30 mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Workshop Request</CardTitle>
                <CardDescription>
                  Don't see a workshop that meets your family's needs?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We can create customized workshops for specific family situations and mental health conditions. 
                  Let us know what topics would be most helpful for you and your family.
                </p>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#A56625]"
                  onClick={() => {
                    toast({
                      title: "Request Submitted",
                      description: "Thank you for your workshop request. Our team will contact you within 48 hours.",
                    });
                  }}
                >
                  Request a Workshop
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-6 animate-fade-in">
            <Card className="border-[#B87333]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#B87333]" />
                  Family Support Groups
                </CardTitle>
                <CardDescription>
                  Connect with other families and caregivers who understand what you're going through
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Parents Supporting Teens</h3>
                        <p className="text-sm text-gray-600">For parents of teenagers with anxiety, depression, or other mental health challenges</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Weekly
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Tuesdays, 7:00 PM EST</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4 text-gray-500" />
                        <span>Virtual Meeting</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 bg-[#B87333] hover:bg-[#A56625]"
                      onClick={() => {
                        toast({
                          title: "Group Joined",
                          description: "You've been added to the Parents Supporting Teens group.",
                        });
                      }}
                    >
                      Join Group
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Partners and Spouses Circle</h3>
                        <p className="text-sm text-gray-600">Support for those whose partners are experiencing mental health challenges</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Bi-weekly
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Every other Thursday, 8:00 PM EST</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4 text-gray-500" />
                        <span>Virtual Meeting</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 bg-[#B87333] hover:bg-[#A56625]"
                      onClick={() => {
                        toast({
                          title: "Group Joined",
                          description: "You've been added to the Partners and Spouses Circle.",
                        });
                      }}
                    >
                      Join Group
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Siblings Support Network</h3>
                        <p className="text-sm text-gray-600">For siblings of individuals with serious mental illness</p>
                      </div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Monthly
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>First Saturday of each month, 11:00 AM EST</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4 text-gray-500" />
                        <span>Virtual Meeting</span>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 bg-[#B87333] hover:bg-[#A56625]"
                      onClick={() => {
                        toast({
                          title: "Group Joined",
                          description: "You've been added to the Siblings Support Network.",
                        });
                      }}
                    >
                      Join Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#B87333]/30 bg-[#B87333]/5 mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#B87333]" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Our support groups are safe spaces for families and caregivers to share experiences and find comfort. To ensure a supportive environment for all participants, we ask everyone to follow these guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Respect confidentiality — what's shared in the group stays in the group</li>
                  <li>Practice active listening without judgment</li>
                  <li>Share your experiences but avoid giving direct advice</li>
                  <li>Recognize that everyone's journey is unique</li>
                  <li>Be mindful of sharing time so everyone has a chance to speak</li>
                  <li>Focus on support rather than criticism</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultation" className="space-y-6 animate-fade-in">
            <Card className="border-[#B87333]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-[#B87333]" />
                  Family Consultation Services
                </CardTitle>
                <CardDescription>
                  One-on-one guidance for specific family situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-2">Family Support Specialist Consultation</h3>
                    <p className="text-gray-700 mb-4">
                      Schedule a private session with a family support specialist who can provide personalized guidance 
                      for your specific situation. Our specialists are trained to help families navigate the mental health system, 
                      develop coping strategies, and create supportive home environments.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Personalized action plans</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Communication strategies</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Resource coordination</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Crisis prevention planning</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#B87333] hover:bg-[#A56625]"
                      onClick={() => {
                        toast({
                          title: "Consultation Request Sent",
                          description: "A family support specialist will contact you within 24 hours to schedule your consultation.",
                        });
                      }}
                    >
                      Request Consultation
                    </Button>
                  </div>
                  
                  <div className="p-5 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium mb-2">Family Therapy Referral</h3>
                    <p className="text-gray-700 mb-4">
                      For families seeking ongoing therapeutic support, our referral specialists can connect you with 
                      licensed family therapists who specialize in mental health-related family dynamics. We'll help match 
                      you with a therapist who fits your family's unique needs and preferences.
                    </p>
                    <Button 
                      className="w-full bg-[#B87333] hover:bg-[#A56625]"
                      onClick={() => {
                        toast({
                          title: "Referral Process Started",
                          description: "We've initiated your family therapy referral. A specialist will contact you shortly to discuss your needs.",
                        });
                      }}
                    >
                      Start Referral Process
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-[#B87333]/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Crisis Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    For urgent situations when a family member is in crisis, our crisis support team is available 24/7.
                  </p>
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Crisis Support",
                        description: "Connecting you with our crisis support team immediately.",
                        variant: "destructive"
                      });
                    }}
                  >
                    Access Crisis Support
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-[#B87333]/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Insurance & Financial Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Get assistance with insurance questions and financial support options for family therapy and support services.
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                    onClick={() => {
                      toast({
                        title: "Support Options",
                        description: "Our team will contact you to discuss insurance and financial support options.",
                      });
                    }}
                  >
                    Explore Options
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FamilySupport;
