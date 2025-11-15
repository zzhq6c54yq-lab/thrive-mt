
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";
import useTranslation from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Key } from "lucide-react";

const Index = () => {
  const { preferredLanguage, setPreferredLanguage } = useTranslation();
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      // Call edge function to validate and create session
      const { data, error } = await supabase.functions.invoke('therapist-access', {
        body: { accessCode }
      });

      if (error) throw error;

      // Set the session with tokens from edge function
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
      navigate("/therapist-dashboard");
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

  return (
    <div className="min-h-screen">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAccessCodeDialog(true)}
        className="fixed top-4 right-4 z-50 bg-background/95 backdrop-blur-sm"
      >
        <Key className="mr-2 h-4 w-4" />
        Staff Login
      </Button>

      <OnboardingContainer />
      <CrisisOverlay />

      <Dialog open={showAccessCodeDialog} onOpenChange={setShowAccessCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Therapist Access</DialogTitle>
            <DialogDescription>
              Enter the 4-digit access code to continue to the therapist dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accessCode">Access Code</Label>
              <Input
                id="accessCode"
                type="password"
                placeholder="Enter 4-digit code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                maxLength={4}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTherapistAccessCode();
                  }
                }}
                className="text-center text-2xl tracking-widest"
              />
            </div>
            <Button
              onClick={handleTherapistAccessCode}
              disabled={loading || accessCode.length !== 4}
              className="w-full"
            >
              {loading ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
