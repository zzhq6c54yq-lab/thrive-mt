
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const ContactSupport = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form logic would go here in a real application
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll respond shortly.",
    });
    
    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/app/dashboard" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Contact Support</h1>
          <p className="text-xl text-gray-300 max-w-3xl">We're here to help with any questions or concerns you may have.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email address" 
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="What is this regarding?" 
                    value={formState.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">Your Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your issue or question in detail" 
                    className="min-h-[150px]" 
                    value={formState.message}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#B87333]" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Available Monday - Friday, 9am - 5pm ET</p>
                <Button variant="outline" className="w-full">
                  1-800-THRIVE-1
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#B87333]" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">We typically respond within 24 hours</p>
                <Button variant="outline" className="w-full">
                  support@thrive-mental.com
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#B87333]" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Start a conversation with our support team</p>
                <Button className="w-full bg-[#B87333] hover:bg-[#B87333]/90">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
