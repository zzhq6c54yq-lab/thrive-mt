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
      {/* Subtle background glow - tight around logo area */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#D4AF37]/8 rounded-full blur-[80px]" />
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto px-4 z-10"
          >
            {/* Logo with atom orbs */}
            <motion.div
              className="mb-6 relative inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative w-36 md:w-44 h-36 md:h-44 mx-auto flex items-center justify-center">
                
                <img 
                  src={THRIVE_LOGO} 
                  alt="ThriveMT"
                  className="w-28 md:w-36 relative z-10 drop-shadow-[0_0_30px_rgba(184,115,51,0.4)]"
                />
              </div>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl md:text-7xl mb-4 font-bold"
            >
              <span className="text-white">Thrive</span>
              <motion.span 
                className="ml-2 inline-block" 
                style={{ 
                  background: 'linear-gradient(135deg, #D4AF37, #E5C5A1, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.7)) drop-shadow(0 0 40px rgba(212,175,55,0.4))',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(212,175,55,0.7)) drop-shadow(0 0 40px rgba(212,175,55,0.4))',
                    'drop-shadow(0 0 30px rgba(212,175,55,0.9)) drop-shadow(0 0 60px rgba(212,175,55,0.6))',
                    'drop-shadow(0 0 20px rgba(212,175,55,0.7)) drop-shadow(0 0 40px rgba(212,175,55,0.4))',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                MT
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 mb-10 font-semibold tracking-wide"
            >
              Build the Best You
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
                onClick={() => navigate("/app/auth")}
              >
                Sign In
              </Button>

              {/* Create Account Button */}
              <Button 
                className="w-64 bg-gradient-to-r from-[#B87333] via-[#D4AF37] to-[#B87333] hover:from-[#D4AF37] hover:via-[#E5C5A1] hover:to-[#D4AF37] text-background font-light text-base py-5 rounded-xl shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
                onClick={() => navigate("/app/auth?mode=signup")}
              >
                Create Account
              </Button>

              {/* Sign in with Google */}
              <Button 
                variant="outline"
                className="w-64 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40 font-light text-base py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                onClick={async () => {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                      redirectTo: `${window.location.origin}/app/dashboard`,
                    },
                  });
                  if (error) {
                    toast({
                      title: "Something went wrong",
                      description: error.message,
                      variant: "destructive",
                    });
                  }
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
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

      {/* Bottom: Staff Access */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center gap-3">
        {/* Staff Access Menu - Opens upward */}
        <div className="relative group">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-white/30 hover:text-white/60 transition-colors font-light"
          >
            <Key className="mr-2 h-3 w-3" />
            Staff Access
          </Button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-gray-900/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-lg shadow-xl p-2 min-w-[160px]">
              <button
                onClick={() => setAccessCodeDialogOpen(true)}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#D4AF37]/10 rounded-md transition-colors"
              >
                Admin Access
              </button>
              <button
                onClick={() => setShowCoachAccessDialog(true)}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#D4AF37]/10 rounded-md transition-colors"
              >
                Coach Portal
              </button>
              <button
                onClick={() => setShowAccessCodeDialog(true)}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#D4AF37]/10 rounded-md transition-colors"
              >
                Therapist Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicIntro;
