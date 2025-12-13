import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react";
import { useCompassionateToast } from "@/hooks/useCompassionateToast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AuthMode = 'login' | 'signup' | 'forgot-password';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError, toast } = useCompassionateToast();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  
  const showLogoutMessage = searchParams.get("logged_out") === "true";

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Check if therapist
        supabase
          .from("profiles")
          .select("is_therapist")
          .eq("id", data.session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.is_therapist) {
              navigate("/app/therapist-dashboard");
            } else {
              navigate("/app/dashboard");
            }
          });
      } else {
        setCheckingSession(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Defer async operations to prevent deadlock
        setTimeout(() => {
          supabase
            .from("profiles")
            .select("is_therapist")
            .eq("id", session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile?.is_therapist) {
                navigate("/app/therapist-dashboard");
              } else {
                navigate("/app/dashboard");
              }
            });
        }, 0);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        showSuccess("Welcome back", "We're glad you're here.");
      } else if (mode === 'signup') {
        if (!consentAccepted) {
          toast({
            title: "Please accept the terms",
            description: "You need to agree to our Terms of Service and Privacy Policy to create an account.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        const { error, data: signUpData } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app/dashboard`,
            data: {
              consent_accepted_at: new Date().toISOString(),
              terms_version: '1.0',
            },
          },
        });
        if (error) throw error;
        
        // Log consent acceptance
        if (signUpData?.user) {
          await supabase.from('auth_user_audit').insert({
            user_id: signUpData.user.id,
            action: 'CONSENT_ACCEPTED',
            details: {
              terms_version: '1.0',
              privacy_policy_accepted: true,
              timestamp: new Date().toISOString(),
            },
          });
        }
        
        toast({
          title: "You're almost there",
          description: "We've sent a confirmation email. Check your inbox to complete sign up.",
        });
      }
    } catch (error: any) {
      // Compassionate error messages
      let errorMessage = "Let's try that together again.";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Those details didn't match. Would you like to try again or reset your password?";
      } else if (error.message?.includes("User already registered")) {
        errorMessage = "Looks like you already have an account. Try signing in instead.";
      } else if (error.message?.includes("Password should be")) {
        errorMessage = "Your password needs to be at least 6 characters to keep your account safe.";
      } else if (error.message?.includes("Email")) {
        errorMessage = "Let's double-check that email address.";
      }
      
      toast({
        title: "We couldn't complete that",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "We need your email",
        description: "Enter your email address so we can send you a reset link.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/app/auth?reset=true`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Check your inbox",
        description: "We've sent password reset instructions to your email.",
      });
      setMode('login');
    } catch (error: any) {
      toast({
        title: "We couldn't send that",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    setShowGuestWarning(false);
    navigate("/app/dashboard");
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-[#B87333]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
            alt="ThriveMT Logo"
            className="h-24 w-24 mx-auto object-contain filter drop-shadow-[0_0_12px_rgba(184,115,51,0.6)]"
          />
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Thrive<span className="text-[#B87333]">MT</span>
            </h1>
            {showLogoutMessage ? (
              <p className="text-white/60 text-lg">
                Take care. We'll be here when you return.
              </p>
            ) : mode === 'forgot-password' ? (
              <p className="text-white/60 text-lg">
                No worries, it happens. Let's reset your password.
              </p>
            ) : (
              <p className="text-white/60 text-lg">
                {mode === 'login' ? "Welcome back" : "Begin your journey with us"}
              </p>
            )}
          </div>
        </div>

        {mode === 'forgot-password' ? (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white py-3"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-[#B87333] hover:text-[#E5C5A1] transition-colors"
            >
              Back to sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white/80">Password</Label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-sm text-[#B87333] hover:text-[#E5C5A1] transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <Checkbox
                  id="consent"
                  checked={consentAccepted}
                  onCheckedChange={(checked) => setConsentAccepted(checked === true)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-[#B87333] data-[state=checked]:border-[#B87333]"
                />
                <Label htmlFor="consent" className="text-sm text-white/70 leading-relaxed cursor-pointer">
                  I have read and agree to the{' '}
                  <Link to="/terms-of-service" className="text-[#B87333] hover:text-[#E5C5A1] underline" target="_blank">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#B87333] hover:text-[#E5C5A1] underline" target="_blank">
                    Privacy Policy
                  </Link>
                  . I consent to the processing of my mental health data as described.
                </Label>
              </div>
            )}

            <Button 
              type="submit"
              disabled={loading || (mode === 'signup' && !consentAccepted)}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white py-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}

        {mode !== 'forgot-password' && (
          <div className="text-center space-y-4">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#B87333] hover:text-[#E5C5A1] transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
            
            <div className="pt-4">
              <Button 
                variant="ghost"
                onClick={() => setShowGuestWarning(true)}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Continue as Guest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Guest Mode Warning Dialog */}
      <AlertDialog open={showGuestWarning} onOpenChange={setShowGuestWarning}>
        <AlertDialogContent className="bg-gray-900 border-[#B87333]/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#B87333]" />
              Just so you know
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              As a guest, your progress and data won't be saved when you leave. 
              You're welcome to explore, but creating an account lets you keep 
              your journey safe and pick up right where you left off.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10">
              Create Account Instead
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleGuestContinue}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white"
            >
              Continue as Guest
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Auth;
