import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SiteContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          role: formData.role || null,
          message: formData.message,
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          message: formData.message,
        },
      });

      if (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      setFormData({ name: "", email: "", role: "", message: "" });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to send",
        description: "We couldn't send your message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      <SiteHeroSection
        title="We're Here for You"
        subtitle="Questions? Ideas? Just want to talk? Reach out."
      />

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-black border-[#D4AF37]/20 p-8">
                <Mail className="w-10 h-10 text-bronze-400 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">General Support</h3>
                <a href="mailto:support@thrive-mental.com" className="text-bronze-400 hover:text-bronze-300">
                  support@thrive-mental.com
                </a>
              </Card>

              <Card className="bg-black border-[#D4AF37]/20 p-8">
                <MessageSquare className="w-10 h-10 text-bronze-400 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Business Inquiries</h3>
                <a href="mailto:business@thrive-mental.com" className="text-bronze-400 hover:text-bronze-300">
                  business@thrive-mental.com
                </a>
              </Card>

              <Card className="bg-black border-[#D4AF37]/20 p-8">
                <Mail className="w-10 h-10 text-bronze-400 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Investor Relations</h3>
                <a href="mailto:investor@thrive-mental.com" className="text-bronze-400 hover:text-bronze-300">
                  investor@thrive-mental.com
                </a>
              </Card>

              <Card className="bg-[#141921] border-bronze-500/20 p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Office Hours</h3>
                <p className="text-foreground/80">Monday - Friday: 9am - 6pm MT</p>
                <p className="text-foreground/80">Saturday - Sunday: Closed</p>
                <p className="text-sm text-foreground/60 mt-4">Emergency support available 24/7 for active clients</p>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-black border-[#D4AF37]/20 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-black border-[#D4AF37]/20"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-black border-[#D4AF37]/20"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">I am a...</label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-black border-[#D4AF37]/20">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Potential Client</SelectItem>
                      <SelectItem value="therapist">Therapist</SelectItem>
                      <SelectItem value="coach">Coach</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="partner">Business Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                    className="bg-black border-[#D4AF37]/20"
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteContact;
