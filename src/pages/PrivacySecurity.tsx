
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, FileCheck, BookOpen, RefreshCw, Fingerprint, Key, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const PrivacySecurity = () => {
  const { toast } = useToast();

  const handleSecurityAction = (action: string) => {
    toast({
      title: action,
      description: `Your ${action.toLowerCase()} settings have been updated successfully.`,
    });
  };

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
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Privacy & Security</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Your mental health information is protected with state-of-the-art security and strict privacy controls.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
            <TabsTrigger value="security">Security Features</TabsTrigger>
            <TabsTrigger value="policy">Privacy Policy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="privacy" className="space-y-6 animate-fade-in">
            <Card className="border-[#B87333]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <Eye className="h-5 w-5 text-[#B87333]" />
                  Your Privacy Controls
                </CardTitle>
                <CardDescription>
                  Manage how your information is used and shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Data Sharing Settings</h3>
                        <p className="text-sm text-gray-600">Control what data is shared with therapists and support services</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                        onClick={() => handleSecurityAction("Data Sharing")}
                      >
                        Manage
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Therapy session notes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Progress tracking data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Personal contact information</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Communication Preferences</h3>
                        <p className="text-sm text-gray-600">Manage how we contact you</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                        onClick={() => handleSecurityAction("Communication Preferences")}
                      >
                        Manage
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Appointment reminders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Therapist messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Marketing emails</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Third-Party Connections</h3>
                        <p className="text-sm text-gray-600">Manage connections to other services</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                        onClick={() => handleSecurityAction("Third-Party Connections")}
                      >
                        Manage
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Health apps integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Insurance provider access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Social media connections</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Privacy Dashboard</h3>
                        <p className="text-sm text-gray-600">View how your data is used</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                        onClick={() => handleSecurityAction("Privacy Dashboard")}
                      >
                        View
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Data use summary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Download your data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Delete account options</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#B87333]/10 rounded-lg border border-[#B87333]/20">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#B87333]" />
                    Your Data Rights
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    As a user of Thrive MT, you have the following rights regarding your personal data:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm">Right to access your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm">Right to correct inaccuracies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm">Right to delete your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm">Right to data portability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm">Right to restrict processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm">Right to object to processing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 animate-fade-in">
            <Card className="border-[#B87333]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#B87333]" />
                  Security Features
                </CardTitle>
                <CardDescription>
                  State-of-the-art security to protect your sensitive mental health information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                    <Fingerprint className="h-8 w-8 text-[#B87333] mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Biometric Authentication</h3>
                    <p className="text-sm text-gray-600">Secure access with fingerprint or face recognition</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-3 w-full text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      onClick={() => handleSecurityAction("Biometric Authentication")}
                    >
                      Setup
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                    <Key className="h-8 w-8 text-[#B87333] mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-3 w-full text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      onClick={() => handleSecurityAction("Two-Factor Authentication")}
                    >
                      Enable
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                    <RefreshCw className="h-8 w-8 text-[#B87333] mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Session Management</h3>
                    <p className="text-sm text-gray-600">View and manage active login sessions</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-3 w-full text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      onClick={() => handleSecurityAction("Session Management")}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  <h3 className="text-xl font-medium mb-4">Our Security Commitments</h3>
                  
                  <div className="flex gap-3 p-4 border-l-4 border-[#B87333] bg-[#B87333]/5 rounded-r-lg">
                    <Lock className="h-6 w-6 flex-shrink-0 text-[#B87333]" />
                    <div>
                      <h4 className="font-medium">End-to-End Encryption</h4>
                      <p className="text-sm text-gray-600">
                        All your therapy sessions, messages, and personal data are protected with end-to-end encryption, ensuring only you and your therapist can access your information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-4 border-l-4 border-[#B87333] bg-[#B87333]/5 rounded-r-lg">
                    <Shield className="h-6 w-6 flex-shrink-0 text-[#B87333]" />
                    <div>
                      <h4 className="font-medium">HIPAA Compliance</h4>
                      <p className="text-sm text-gray-600">
                        Our platform is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA), which establishes national standards for protecting sensitive patient health information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-4 border-l-4 border-[#B87333] bg-[#B87333]/5 rounded-r-lg">
                    <FileCheck className="h-6 w-6 flex-shrink-0 text-[#B87333]" />
                    <div>
                      <h4 className="font-medium">Regular Security Audits</h4>
                      <p className="text-sm text-gray-600">
                        We conduct regular third-party security audits and penetration testing to ensure our systems remain secure against evolving threats and vulnerabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policy" className="space-y-6 animate-fade-in">
            <Card className="border-[#B87333]/30">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#B87333]" />
                  Privacy Policy
                </CardTitle>
                <CardDescription>
                  Last updated: June 15, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">1. Introduction</h3>
                    <p className="text-gray-700">
                      Thrive MT ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mental health platform.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">2. Information We Collect</h3>
                    <p className="text-gray-700 mb-2">
                      We collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>
                        <span className="font-medium">Personal Information:</span> Name, email address, phone number, date of birth, and payment information.
                      </li>
                      <li>
                        <span className="font-medium">Health Information:</span> Mental health history, assessment responses, therapy notes, and progress tracking data.
                      </li>
                      <li>
                        <span className="font-medium">Usage Information:</span> How you interact with our platform, including features used and time spent.
                      </li>
                      <li>
                        <span className="font-medium">Device Information:</span> IP address, browser type, operating system, and device identifiers.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">3. How We Use Your Information</h3>
                    <p className="text-gray-700 mb-2">
                      We use your information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>To provide and improve our mental health services</li>
                      <li>To match you with appropriate therapists and resources</li>
                      <li>To facilitate communication between you and your therapist</li>
                      <li>To process payments and manage your account</li>
                      <li>To send appointment reminders and important notifications</li>
                      <li>To analyze usage patterns and improve our platform</li>
                      <li>To comply with legal and regulatory requirements</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">4. Information Sharing and Disclosure</h3>
                    <p className="text-gray-700 mb-2">
                      We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>
                        <span className="font-medium">Your Therapist:</span> Information necessary for providing therapy services.
                      </li>
                      <li>
                        <span className="font-medium">Service Providers:</span> Third-party vendors who help us operate our platform (e.g., payment processors, cloud storage providers).
                      </li>
                      <li>
                        <span className="font-medium">Legal Requirements:</span> When required by law or to protect rights, safety, and security.
                      </li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      We do not sell or rent your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">5. Data Security</h3>
                    <p className="text-gray-700">
                      We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include encryption, access controls, regular security assessments, and staff training.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">6. Your Rights</h3>
                    <p className="text-gray-700 mb-2">
                      Depending on your location, you may have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Access the personal information we hold about you</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your personal information</li>
                      <li>Restrict or object to certain processing activities</li>
                      <li>Receive your information in a portable format</li>
                      <li>Withdraw consent where processing is based on consent</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">7. Contact Us</h3>
                    <p className="text-gray-700">
                      If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact our Privacy Officer at privacy@thrivemt.com or 1-800-THRIVE-MT.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrivacySecurity;
