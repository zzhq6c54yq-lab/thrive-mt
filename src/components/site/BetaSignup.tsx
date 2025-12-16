import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Sparkles, CheckCircle, PartyPopper } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

const BetaSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [currentCount, setCurrentCount] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch initial count on mount
  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc('get_beta_signup_count');
      if (!error && data !== null) {
        setCurrentCount(data);
      } else {
        // Fallback to base count if function fails
        setCurrentCount(1001);
      }
    };
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      const { error } = await supabase
        .from('beta_signups')
        .insert({ email: normalizedEmail });

      if (error) {
        // Check for duplicate email (unique constraint violation)
        if (error.code === '23505') {
          setIsDuplicate(true);
          toast({
            title: "You're already signed up!",
            description: "We have your email saved. We'll notify you when it's time!",
          });
        } else {
          throw error;
        }
      } else {
        // Success - send notification email to admin
        try {
          await supabase.functions.invoke('notify-beta-signup', {
            body: { email: normalizedEmail }
          });
        } catch (notifyError) {
          // Don't fail the signup if notification fails
          console.error("Failed to send notification:", notifyError);
        }
        
        // Increment counter and show success
        setIsSubmitted(true);
        setCurrentCount((prev) => (prev !== null ? prev + 1 : 1002));
        toast({
          title: "Welcome to the beta!",
          description: "We'll be in touch soon with exclusive updates.",
        });
      }
    } catch (error) {
      console.error("Beta signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <Card className="bg-black/50 border-bronze-500/30 p-8 text-center backdrop-blur-sm">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-bronze-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">You're in the beta!</h3>
        <p className="text-foreground/60 mb-4">
          We'll send updates to <span className="text-bronze-400">{email}</span>
        </p>
        {currentCount !== null && (
          <div className="mt-6 pt-6 border-t border-bronze-500/20">
            <p className="text-sm text-foreground/50">People in the beta</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-500 bg-clip-text text-transparent">
              {currentCount.toLocaleString()}
            </p>
          </div>
        )}
      </Card>
    );
  }

  // Already signed up state
  if (isDuplicate) {
    return (
      <Card className="bg-black/50 border-bronze-500/30 p-8 text-center backdrop-blur-sm">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center">
            <PartyPopper className="w-8 h-8 text-bronze-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">You're already on the beta list!</h3>
        <p className="text-foreground/60 mb-4">
          We have <span className="text-bronze-400">{email}</span> saved.
        </p>
        <p className="text-foreground/50 text-sm">
          We'll notify you when it's time to join.
        </p>
        {currentCount !== null && (
          <div className="mt-6 pt-6 border-t border-bronze-500/20">
            <p className="text-sm text-foreground/50">People in the beta</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-500 bg-clip-text text-transparent">
              {currentCount.toLocaleString()}
            </p>
          </div>
        )}
      </Card>
    );
  }

  // Default signup form
  return (
    <Card className="bg-black/50 border-bronze-500/30 p-8 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-bronze-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Join the ThriveMT Beta</h3>
        <p className="text-foreground/60">
          Be among the first to experience the future of mental wellness
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-black/50 border-bronze-500/30 focus:border-bronze-500 text-foreground placeholder:text-foreground/40"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Joining..." : "Join the Beta"}
        </Button>
      </form>

      {currentCount !== null && (
        <div className="mt-6 pt-6 border-t border-bronze-500/20 text-center">
          <p className="text-sm text-foreground/50 mb-1">People already in the beta</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-500 bg-clip-text text-transparent">
            {currentCount.toLocaleString()}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-foreground/40 mt-4">
        Questions? <a href="mailto:beta@thrive-mental.com" className="text-bronze-400 hover:underline">beta@thrive-mental.com</a>
      </p>
    </Card>
  );
};

export default BetaSignup;
