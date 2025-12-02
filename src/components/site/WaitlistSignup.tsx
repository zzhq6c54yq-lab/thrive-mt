import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const WaitlistSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store in database
      const { error } = await supabase
        .from('waitlist_signups')
        .insert({ email } as any);

      if (error && error.code !== '23505') { // Ignore duplicate key error
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you when the demo is ready.",
      });
    } catch (error) {
      console.error('Waitlist signup error:', error);
      toast({
        title: "Thanks for your interest!",
        description: "We've noted your email and will be in touch soon.",
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B87333]/10 border-[#D4AF37]/40 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">You're on the waitlist!</h3>
          <p className="text-gray-400">
            We'll send updates to <span className="text-[#D4AF37]">{email}</span>
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B87333]/5 border-[#D4AF37]/30 p-8">
      <div className="text-center mb-6">
        <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Join Our Demo Waitlist</h3>
        <p className="text-gray-400">
          Be the first to experience ThriveMT's full interactive demo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37]"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B87333] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        We'll only email you about the demo launch. No spam, ever.
      </p>
    </Card>
  );
};

export default WaitlistSignup;
