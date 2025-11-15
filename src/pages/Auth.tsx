
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { authSchema } from "@/lib/validations";
import { z } from "zod";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        // Check if user is therapist before redirecting
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_therapist")
          .eq("id", session.user.id)
          .single();
        
        if (profile?.is_therapist) {
          navigate("/therapist-dashboard");
        } else {
          navigate("/");
        }
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Check for therapist demo login code "0001"
    if (email === "0001" && password === "0001") {
      const { error } = await supabase.auth.signInWithPassword({ 
        email: "therapist@demo.com", 
        password: "0001" 
      });
      if (error) {
        toast({ title: "Therapist login failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome, Dr. Mitchell!", description: "Therapist dashboard loading..." });
        navigate("/therapist-dashboard");
      }
      setLoading(false);
      return;
    }

    // Validate input with Zod
    try {
      authSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
        setLoading(false);
        return;
      }
    }

    if (isLogin) {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        // Check if user is a therapist and redirect accordingly
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_therapist")
          .eq("id", data.user.id)
          .single();
        
        if (profile?.is_therapist) {
          navigate("/therapist-dashboard");
        }
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/` }
      });
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Sign up successful!", description: "Check your email for confirmation." });
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-2xl border border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{isLogin ? "Log In" : "Sign Up"}</CardTitle>
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
          
          <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold text-primary">Therapist Demo:</span> Enter <span className="font-mono bg-background px-2 py-1 rounded">0001</span> for both email and password
            </p>
          </div>

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
    </div>
  );
};

export default Auth;
