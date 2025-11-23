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

interface CinematicIntroProps {
  onContinue: () => void;
  onSkipToMain?: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onContinue, onSkipToMain }) => {
  const [showContent, setShowContent] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Español' | 'Português' | 'Filipino'>("English");
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [accessCodeDialogOpen, setAccessCodeDialogOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get time-aware greeting with deeper emotional resonance
  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return { text: "Sometimes the night feels long. We're here with you.", emoji: "🌙" };
    if (hour < 12) return { text: "Morning. Let's start gently together.", emoji: "🌅" };
    if (hour < 17) return { text: "You're here now. That's what matters.", emoji: "☀️" };
    if (hour < 21) return { text: "Evening. Time to breathe and be.", emoji: "🌆" };
    return { text: "Rest is healing too. We see you.", emoji: "✨" };
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
      navigate("/therapist-dashboard");
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
      navigate("/admin-portal");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 overflow-hidden relative">
      {/* Animated particle field */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      </motion.div>

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
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-400 text-lg mb-8"
            >
              {greeting.emoji} {greeting.text}
            </motion.p>

            {/* Logo with breathing animation */}
            <motion.div
              className="mb-8"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                alt="ThriveMT" 
                className="w-40 md:w-48 mx-auto drop-shadow-[0_0_30px_rgba(184,115,51,0.4)]"
              />
            </motion.div>

            {/* Main title with text glow */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-6xl md:text-8xl mb-8 font-bold"
            >
              <span className="text-white">Thrive</span>
              <span 
                className="gradient-heading ml-2" 
                style={{ 
                  textShadow: '0 0 20px rgba(184, 115, 51, 0.8), 0 0 40px rgba(184, 115, 51, 0.4)' 
                }}
              >
                MT
              </span>
            </motion.h1>

            {/* Tagline - Heart-centered invitation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light"
            >
              {selectedLanguage === 'Español' 
                ? "Un santuario para sanar, crecer y ser tú mismo" 
                : selectedLanguage === 'Português'
                  ? "Um santuário para curar, crescer e ser você mesmo"
                  : selectedLanguage === 'Filipino'
                    ? "Isang santuwaryo upang maghilom, lumaki, at maging totoo"
                    : "A sanctuary to heal, grow, and be yourself"}
            </motion.p>

            {/* CTA with shimmer effect */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <Button 
                className="group relative overflow-hidden bg-gradient-to-r from-[#B87333] via-[#D4AF37] to-[#B87333] hover:from-[#D4AF37] hover:via-[#E5C5A1] hover:to-[#D4AF37] text-background font-light text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-500 hover:scale-105"
                onClick={onContinue}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></span>
                <span className="relative flex items-center gap-2 font-light">
                  {selectedLanguage === 'Español' 
                    ? "Comienza tu sanación" 
                    : selectedLanguage === 'Português'
                      ? "Comece sua cura"
                      : selectedLanguage === 'Filipino'
                        ? "Simulan ang iyong paghilom"
                        : "Begin healing"}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAccessCodeDialog(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                <Key className="mr-2 h-4 w-4" />
                Therapist Portal
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAccessCodeDialogOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                <Key className="mr-2 h-4 w-4" />
                System Access
              </Button>
            </motion.div>

            {onSkipToMain && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-8"
              >
                <Button 
                  variant="ghost" 
                  className="text-xs text-gray-600 hover:text-gray-400"
                  onClick={onSkipToMain}
                >
                  Skip to Main Menu (Dev)
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Access code dialogs */}
      <Dialog open={showAccessCodeDialog} onOpenChange={(open) => {
        setShowAccessCodeDialog(open);
        if (!open) setAccessCode("");
      }}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-xl border-[#D4AF37]/30">
          <DialogHeader>
            <DialogTitle className="text-white">Staff Access</DialogTitle>
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

      <Dialog open={accessCodeDialogOpen} onOpenChange={(open) => {
        setAccessCodeDialogOpen(open);
        if (!open) setAccessCode("");
      }}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-xl border-[#D4AF37]/30">
          <DialogHeader>
            <DialogTitle className="text-white">Admin Access</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your 4-digit admin code
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adminAccessCode" className="text-gray-300">Access Code</Label>
              <Input
                id="adminAccessCode"
                type="password"
                placeholder="••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                maxLength={4}
                className="text-center text-2xl tracking-widest bg-gray-800/50 border-[#D4AF37]/30 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && accessCode.length === 4) {
                    handleAdminAccess();
                  }
                }}
              />
            </div>
            
            <Button
              onClick={handleAdminAccess}
              disabled={loading || accessCode.length !== 4}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]"
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
