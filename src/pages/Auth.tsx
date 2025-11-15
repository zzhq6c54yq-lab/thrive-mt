
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, Key, Copy } from "lucide-react";
import { authSchema } from "@/lib/validations";
import { z } from "zod";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
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
                navigate("/therapist-dashboard");
              } else {
                navigate("/");
              }
            });
        }, 0);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  const handleTherapistAccessCode = async () => {
    if (accessCode !== "0001") {
      toast({
        title: "Invalid access code",
        description: "Please enter a valid therapist access code.",
        variant: "destructive",
      });
      setAccessCode("");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "therapist@demo.com",
        password: "0001",
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_therapist")
          .eq("id", data.user.id)
          .single();

        if (profile?.is_therapist) {
          navigate("/therapist-dashboard");
        }
      }

      toast({
        title: "Welcome back!",
        description: "Therapist login successful.",
      });
      setShowAccessCodeDialog(false);
      setAccessCode("");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      setAccessCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_therapist")
            .eq("id", data.user.id)
            .single();

          if (profile?.is_therapist) {
            navigate("/therapist-dashboard");
            return;
          }
        }

        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link.",
        });
      }
    } catch (error: any) {
      toast({
        title: isLogin ? "Login failed" : "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{isLogin ? "Log In" : "Sign Up"}</CardTitle>
          
          {isLogin && (
            <>
              <Button
                type="button"
                variant="secondary"
                className="w-full mt-4"
                onClick={() => setShowAccessCodeDialog(true)}
              >
                <Key className="mr-2 h-4 w-4" />
                Therapist Login
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-1">
                For licensed therapists only
              </p>
            </>
          )}
        </CardHeader>
        <CardContent>
          {!isLogin && (
            <Alert className="mb-4 border-primary/20 bg-primary/5">
              <Mail className="h-4 w-4" />
              <AlertTitle>Email Confirmation Required</AlertTitle>
              <AlertDescription>
                After signing up, you'll receive a confirmation email. Click the link to activate your account.
              </AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleAuth}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  className="pl-10"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-4 space-y-2">
            <Button
              variant="link"
              className="w-full"
              onClick={() => setIsLogin(l => !l)}
              disabled={loading}
            >
              {isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Log in"}
            </Button>
            
            {isLogin && (
              <Link to="/auth/resend" className="block text-center text-sm text-muted-foreground hover:text-primary">
                Didn't receive confirmation email?
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAccessCodeDialog} onOpenChange={setShowAccessCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Therapist Access</DialogTitle>
            <DialogDescription>
              Enter your 4-digit access code to continue
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access-code">Access Code</Label>
              <Input
                id="access-code"
                type="password"
                placeholder="Enter 4-digit code"
                maxLength={4}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && accessCode.length === 4) {
                    handleTherapistAccessCode();
                  }
                }}
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowAccessCodeDialog(false);
                  setAccessCode("");
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleTherapistAccessCode}
                disabled={loading || accessCode.length !== 4}
              >
                {loading ? "Verifying..." : "Submit"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
