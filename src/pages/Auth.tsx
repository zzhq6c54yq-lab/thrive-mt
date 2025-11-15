import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Key } from "lucide-react";

const Auth: React.FC = () => {
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      // Call the therapist-access edge function
      const { data, error } = await supabase.functions.invoke('therapist-access', {
        body: { accessCode }
      });

      if (error) throw error;

      if (!data.access_token || !data.refresh_token) {
        throw new Error('Invalid response from server');
      }

      // Set the session with the tokens received from edge function
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      if (sessionError) throw sessionError;

      toast({
        title: "Welcome back!",
        description: "Therapist login successful.",
      });
      
      setShowAccessCodeDialog(false);
      setAccessCode("");
      // Navigation will be handled by the auth state listener
    } catch (error: any) {
      console.error('Therapist login error:', error);
      toast({
        title: "Login failed",
        description: error.message || 'Failed to authenticate. Please try again.',
        variant: "destructive",
      });
      setAccessCode("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md shadow-xl border-border/50 backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-2 text-center pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Therapist Portal
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your access code to continue
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            type="button"
            variant="default"
            className="w-full bg-primary hover:bg-primary/90 transition-all h-12 text-base"
            onClick={() => setShowAccessCodeDialog(true)}
          >
            <Key className="mr-2 h-5 w-5" />
            Staff Login
          </Button>
          
          <p className="text-center text-xs text-muted-foreground">
            For licensed therapists only
          </p>
        </CardContent>
      </Card>

      <Dialog open={showAccessCodeDialog} onOpenChange={setShowAccessCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Therapist Access</DialogTitle>
            <DialogDescription className="text-center">
              Enter your 4-digit access code to continue
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accessCode" className="text-sm font-medium">
                Access Code
              </Label>
              <Input
                id="accessCode"
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="0001"
                maxLength={4}
                className="text-center text-lg tracking-widest"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
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
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
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
