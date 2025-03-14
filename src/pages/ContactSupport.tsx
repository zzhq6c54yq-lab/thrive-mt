
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ContactSupport = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Contact Support</h1>
          <p className="text-xl text-gray-300 max-w-3xl">We're here to help with any questions or concerns.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="message" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="message">Send Message</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="message" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  We'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Subject of your message" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">General Inquiries</h3>
                    <p className="text-blue-600">support@thrivemt.com</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Technical Support</h3>
                    <p className="text-blue-600">techsupport@thrivemt.com</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Billing Inquiries</h3>
                    <p className="text-blue-600">billing@thrivemt.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="phone" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Customer Service</h3>
                    <p className="text-blue-600">1-800-555-1234</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri: 8am-8pm EST</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Technical Support</h3>
                    <p className="text-blue-600">1-800-555-5678</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9am-6pm EST</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg mt-4">
                    <h3 className="font-medium mb-2">Mental Health Crisis Line</h3>
                    <p className="text-red-600">1-800-273-8255</p>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
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

export default ContactSupport;
