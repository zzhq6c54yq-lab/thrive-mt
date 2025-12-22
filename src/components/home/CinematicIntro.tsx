import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Key } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { THRIVE_LOGO } from "@/constants/branding";

interface CinematicIntroProps {
  onContinue: () => void;
  onSkipToMain?: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onContinue, onSkipToMain }) => {
  const [showContent, setShowContent] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Español' | 'Português' | 'Filipino'>("English");
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [showCoachAccessDialog, setShowCoachAccessDialog] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [coachAccessCode, setCoachAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get time-aware greeting with deeper emotional resonance
  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "Sometimes the night feels long. We're here with you - because you matter.";
    if (hour < 12) return "Morning. Let's start gently together - you deserve this.";
    if (hour < 17) return "You're here now. That's what matters - because you're worth it.";
    if (hour < 21) return "Evening. Time to breathe and be - you hold worth.";
    return "Rest is healing too. We see you - because you matter.";
  };

  const greeting = getTimeAwareGreeting();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) setSelectedLanguage(savedLanguage as any);
    
    // Cinematic reveal after fade from black
    setTimeout(() => setShowContent(true), 800);
  }, []);

  const selectLanguage = (language: typeof selectedLanguage) => {
    setSelectedLanguage(language);
    localStorage.setItem('preferredLanguage', language);
    window.dispatchEvent(new Event('languageChange'));
  };

  const handleTherapistAccess = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('therapist-access', {
        body: { accessCode }
      });

      if (error) throw error;

      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      toast({
        title: "Welcome back",
        description: "We're so glad you're here.",
      });
      
      setShowAccessCodeDialog(false);
      setAccessCode("");
      navigate("/app/therapist-dashboard");
    } catch (error: any) {
      toast({
        title: "Let's try that together again",
        description: "The code doesn't seem right. Take your time - we're not going anywhere.",
        variant: "destructive",
      });
      setAccessCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleCoachAccess = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('coach-access', {
        body: { accessCode: coachAccessCode }
      });

      if (error) throw error;

      if (data.valid) {
        sessionStorage.setItem('coachAccess', 'true');
        sessionStorage.setItem('coachName', data.coachName || 'Coach');
        toast({
          title: data.message || "Hey there! 👋",
          description: "Welcome to your coach portal!",
        });
        setShowCoachAccessDialog(false);
        setCoachAccessCode("");
        navigate("/app/coach-dashboard");
      } else {
        throw new Error(data.error || "Invalid access code");
      }
    } catch (error: any) {
      toast({
        title: "Hmm, that doesn't look right",
        description: error.message || "Try that code again?",
        variant: "destructive",
      });
      setCoachAccessCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAccess = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-access', {
        body: { accessCode }
      });

      if (error) throw error;

      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      toast({
        title: "Welcome",
        description: "Access granted.",
      });
      
      setAccessCodeDialogOpen(false);
      setAccessCode("");
      navigate("/app/admin-portal");
    } catch (error: any) {
      toast({
        title: "Let's try that again",
        description: "The code doesn't match. Take your time.",
        variant: "destructive",
      });
      setAccessCode("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto px-4 z-10"
          >
            {/* Time-aware greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-400 text-lg mb-8"
            >
              {greeting}
            </motion.p>

            {/* Logo */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img 
                src={THRIVE_LOGO} 
                alt="ThriveMT"
                className="w-24 md:w-32 mx-auto drop-shadow-[0_0_30px_rgba(184,115,51,0.4)]"
              />
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl md:text-7xl mb-6 font-bold"
            >
              <span className="text-white">Thrive</span>
              <span 
                className="gradient-heading ml-2" 
                style={{ 
                  textShadow: '0 0 20px rgba(184, 115, 51, 0.6)' 
                }}
              >
                MT
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 font-light"
            >
              {selectedLanguage === 'Español' 
                ? "Un santuario para sanar, crecer y ser tú mismo" 
                : selectedLanguage === 'Português'
                  ? "Um santuário para curar, crescer e ser você mesmo"
                  : selectedLanguage === 'Filipino'
                    ? "Isang santuwaryo upang maghilom, lumaki, at maging totoo"
                    : "A sanctuary to heal, grow, and be yourself"}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Sign In Button */}
              <Button 
                variant="outline"
                className="w-64 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] font-light text-base py-5 rounded-xl transition-all duration-300"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>

              {/* Create Account Button */}
              <Button 
                className="w-64 bg-gradient-to-r from-[#B87333] via-[#D4AF37] to-[#B87333] hover:from-[#D4AF37] hover:via-[#E5C5A1] hover:to-[#D4AF37] text-background font-light text-base py-5 rounded-xl shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
                onClick={() => navigate("/auth?mode=signup")}
              >
                Create Account
              </Button>

              {/* Continue as Guest */}
              <Button 
                variant="ghost"
                className="w-64 text-gray-400 hover:text-white hover:bg-white/5 font-light text-sm py-4"
                onClick={onContinue}
              >
                Continue as Guest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {/* Staff Access Menu */}
              <div className="relative group mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors font-light"
                >
                  <Key className="mr-2 h-3 w-3" />
                  Staff Access
                </Button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-gray-900/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-lg shadow-xl p-2 min-w-[160px]">
                    <button
                      onClick={() => setShowAccessCodeDialog(true)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#D4AF37]/10 rounded-md transition-colors"
                    >
                      Therapist Portal
                    </button>
                    <button
                      onClick={() => setShowCoachAccessDialog(true)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#D4AF37]/10 rounded-md transition-colors"
                    >
                      Coach Portal
                    </button>
                    <button
                      onClick={() => setAccessCodeDialogOpen(true)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#D4AF37]/10 rounded-md transition-colors"
                    >
                      Admin Access
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Therapist Access Dialog */}
      <Dialog open={showAccessCodeDialog} onOpenChange={(open) => {
        setShowAccessCodeDialog(open);
        if (!open) setAccessCode("");
      }}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-xl border-[#D4AF37]/30">
          <DialogHeader>
            <DialogTitle className="text-white">Therapist Access</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your 4-digit access code
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accessCode" className="text-gray-300">Access Code</Label>
              <Input
                id="accessCode"
                type="password"
                placeholder="••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                maxLength={4}
                className="text-center text-2xl tracking-widest bg-gray-800/50 border-[#D4AF37]/30 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && accessCode.length === 4) {
                    handleTherapistAccess();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleTherapistAccess}
              disabled={loading || accessCode.length !== 4}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]"
            >
              {loading ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Access Dialog */}
      <Dialog open={accessCodeDialogOpen} onOpenChange={(open) => {
        setAccessCodeDialogOpen(open);
        if (!open) setAccessCode("");
      }}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-xl border-[#D4AF37]/30">
          <DialogHeader>
            <DialogTitle className="text-white">Admin Access</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your 6-digit admin code
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adminAccessCode" className="text-gray-300">Access Code</Label>
              <Input
                id="adminAccessCode"
                type="password"
                placeholder="••••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-widest bg-gray-800/50 border-[#D4AF37]/30 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && accessCode.length === 6) {
                    handleAdminAccess();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleAdminAccess}
              disabled={loading || accessCode.length !== 6}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]"
            >
              {loading ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Coach Access Dialog */}
      <Dialog open={showCoachAccessDialog} onOpenChange={(open) => {
        setShowCoachAccessDialog(open);
        if (!open) setCoachAccessCode("");
      }}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-xl border-teal-500/30">
          <DialogHeader>
            <DialogTitle className="text-white">Coach Access</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your access code to get started
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="coachAccessCode" className="text-gray-300">Access Code</Label>
              <Input
                id="coachAccessCode"
                type="password"
                placeholder="••••"
                value={coachAccessCode}
                onChange={(e) => setCoachAccessCode(e.target.value)}
                maxLength={4}
                className="text-center text-2xl tracking-widest bg-gray-800/50 border-teal-500/30 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && coachAccessCode.length === 4) {
                    handleCoachAccess();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleCoachAccess}
              disabled={loading || coachAccessCode.length !== 4}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-500"
            >
              {loading ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CinematicIntro;
