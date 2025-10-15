import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ResendConfirmation = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { toast } = useToast();

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive'
      });
      return;
    }

    if (cooldown > 0) {
      toast({
        title: 'Please Wait',
        description: `You can request a new email in ${cooldown} seconds.`,
        variant: 'default'
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      });

      if (error) {
        toast({
          title: 'Resend Failed',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Email Sent! 📧',
          description: 'Check your inbox for the confirmation link.',
          variant: 'default'
        });
        
        // Start 60-second cooldown
        setCooldown(60);
        const interval = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl"
    >
      <div className="flex items-center justify-center mb-6">
        <Mail className="h-12 w-12 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">Resend Confirmation Email</h2>
      <p className="text-muted-foreground text-center mb-6">
        Enter your email address and we'll send you a new confirmation link.
      </p>

      <form onSubmit={handleResend} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading || cooldown > 0}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || cooldown > 0}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : cooldown > 0 ? (
            `Wait ${cooldown}s`
          ) : (
            'Resend Confirmation Email'
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Already confirmed? <a href="/auth" className="text-primary hover:underline">Go to Login</a>
      </p>
    </motion.div>
  );
};

export default ResendConfirmation;
