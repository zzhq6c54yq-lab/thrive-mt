import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages, ChevronDown, RotateCcw, Key, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface IntroScreenProps {
  onContinue: () => void;
  onSkipToMain?: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue, onSkipToMain }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Español' | 'Português' | 'Filipino'>("English");
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'Español') {
      setSelectedLanguage('Español');
    } else if (savedLanguage === 'Português') {
      setSelectedLanguage('Português');
    } else if (savedLanguage === 'Filipino') {
      setSelectedLanguage('Filipino');
    }
  }, []);
  
  const selectLanguage = (language: 'English' | 'Español' | 'Português' | 'Filipino') => {
    setSelectedLanguage(language);
    localStorage.setItem('preferredLanguage', language);
    window.dispatchEvent(new Event('languageChange'));
  };
  
  const handleBeginJourney = () => {
    onContinue();
  };

  const handleResetDemo = () => {
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('thriveOnboardingProgress');
    window.location.reload();
  };

  const handleTherapistAccessCode = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('therapist-access', {
        body: { accessCode }
      });

      if (error) {
        const isRateLimitError = error.message?.includes('Too many attempts') || 
                                error.message?.includes('429');
        setIsRateLimited(isRateLimitError);
        
        toast({
          title: "Access denied",
          description: isRateLimitError 
            ? "Too many attempts. Request a reset link to try again."
            : "Invalid access code or too many attempts.",
          variant: "destructive",
        });
        setAccessCode("");
        setLoading(false);
        return;
      }

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
      setIsRateLimited(false);
      setResetRequested(false);
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

  const handleRequestReset = async () => {
    setResetLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('request-therapist-reset', {
        body: {}
      });

      if (error) throw error;

      if (data?.error) throw new Error(data.error);

      setResetRequested(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for the reset link (valid for 1 hour).",
      });
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "Could not send reset link. Try again later.",
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] overflow-hidden relative z-50">
      <div className="floating-bg"></div>
      
      <div className="text-center max-w-2xl mx-auto px-4 z-10">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
            alt="Copper Outline Logo" 
            className="w-40 md:w-48 mx-auto intro-logo-icon"
          />
        </div>
        <h1 className="intro-logo-text text-6xl md:text-8xl mb-8">
          <span className="text-white">Thrive</span>
          <span className="gradient-heading ml-2" style={{ 
            textShadow: '0 0 10px rgba(184, 115, 51, 0.8), 0 0 20px rgba(184, 115, 51, 0.4)' 
          }}>MT</span>
        </h1>
        <p className="intro-tagline text-xl md:text-2xl text-gray-300">
          {selectedLanguage === 'Español' 
            ? "porque la vida debe ser más que solo sobrevivir" 
            : selectedLanguage === 'Português'
              ? "porque a vida deve ser mais do que apenas sobreviver"
              : selectedLanguage === 'Filipino'
                ? "dahil ang buhay ay dapat na higit pa sa simpleng pagiging buhay lamang"
                : "because life should be more than just surviving"}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Button 
            className="group bg-[#B87333] hover:bg-[#B87333]/80 hero-button shadow-[0_0_15px_rgba(184,115,51,0.4)]"
            onClick={handleBeginJourney}
          >
            {selectedLanguage === 'Español' 
              ? "Comienza Tu Viaje" 
              : selectedLanguage === 'Português'
                ? "Comece Sua Jornada"
                : selectedLanguage === 'Filipino'
                  ? "Simulan ang Iyong Paglalakbay"
                  : "Begin Your Journey"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAccessCodeDialog(true)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <Key className="mr-2 h-4 w-4" />
            Staff Access
          </Button>
        </div>
        
        {/* Development Skip Button */}
        {onSkipToMain && (
          <div className="mt-6">
            <Button 
              variant="ghost" 
              className="text-xs text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100"
              onClick={onSkipToMain}
            >
              Skip to Main Menu (Dev)
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showAccessCodeDialog} onOpenChange={(open) => {
        setShowAccessCodeDialog(open);
        if (!open) {
          setIsRateLimited(false);
          setResetRequested(false);
          setAccessCode("");
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Therapist Access</DialogTitle>
            <DialogDescription>
              Enter the 4-digit access code to continue to the therapist dashboard.
            </DialogDescription>
          </DialogHeader>
          
          {!resetRequested ? (
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
                  disabled={isRateLimited}
                  className="text-center text-2xl tracking-widest"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && accessCode.length === 4 && !isRateLimited) {
                      handleTherapistAccessCode();
                    }
                  }}
                />
              </div>
              
              <Button
                onClick={handleTherapistAccessCode}
                disabled={loading || accessCode.length !== 4 || isRateLimited}
                className="w-full"
              >
                {loading ? "Verifying..." : "Continue"}
              </Button>
              
              {isRateLimited && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    Too many failed attempts. Request a reset link to try again.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleRequestReset}
                    disabled={resetLoading}
                    className="w-full"
                  >
                    {resetLoading ? (
                      <>
                        <Mail className="mr-2 h-4 w-4 animate-pulse" />
                        Sending reset link...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Request Reset Link
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Check Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a reset link to your email. Click the link to clear your rate limit.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  The link expires in 1 hour.
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setResetRequested(false);
                  setIsRateLimited(false);
                  setShowAccessCodeDialog(false);
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntroScreen;
