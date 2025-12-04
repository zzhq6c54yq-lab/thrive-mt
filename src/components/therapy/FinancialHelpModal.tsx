import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Users, DollarSign, HandHelping, Sparkles, CheckCircle, Shield, Clock, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface FinancialHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FinancialHelpModal({ open, onOpenChange }: FinancialHelpModalProps) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleClose = () => {
    setStep(1);
    onOpenChange(false);
  };

  const handleApply = () => {
    handleClose();
    navigate("/app/barter-application");
  };

  const handleLearnMore = () => {
    handleClose();
    navigate("/app/barter-system");
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4"
          >
            <motion.div
              className="mx-auto mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
                <div className="relative p-6 bg-gradient-to-br from-primary/20 to-[#D4AF37]/20 rounded-full border border-primary/30">
                  <Heart className="w-16 h-16 text-primary" fill="currentColor" />
                </div>
              </div>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We See You. We Understand.
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-md mx-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Taking the first step to ask for help takes courage. We're honored you're here, and we want you to know — you're not alone in this.
            </motion.p>

            <motion.p
              className="text-sm text-muted-foreground/80 max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Financial barriers should never stand between you and the care you deserve. That's why we've created multiple pathways to make therapy accessible.
            </motion.p>

            <Button 
              onClick={() => setStep(2)}
              size="lg"
              className="bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 font-semibold text-primary-foreground"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4"
          >
            <motion.div
              className="mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37]/20 to-primary/20 rounded-full inline-block border border-[#D4AF37]/30">
                <Sparkles className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                Mental Health Isn't a Luxury
              </h2>
              <p className="text-xl md:text-2xl font-semibold mb-6" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                It's a Fundamental Right and Necessity
              </p>
            </motion.div>

            <motion.div
              className="bg-card/50 border border-border/50 rounded-xl p-6 mb-6 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-muted-foreground italic text-lg">
                "We believe that healing shouldn't depend on your bank account. Every person deserves compassionate, professional care — and we're committed to making that possible for you."
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-card/30 border border-border/30 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-primary">1 in 4</p>
                <p className="text-xs text-muted-foreground">Adults face mental health challenges yearly</p>
              </div>
              <div className="bg-card/30 border border-border/30 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-[#D4AF37]">60%</p>
                <p className="text-xs text-muted-foreground">Don't seek help due to cost concerns</p>
              </div>
            </motion.div>

            <Button 
              onClick={() => setStep(3)}
              size="lg"
              className="bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 font-semibold text-primary-foreground"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-6 px-4"
          >
            <motion.div
              className="mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="p-4 bg-gradient-to-br from-primary/20 to-[#D4AF37]/20 rounded-full inline-block border border-primary/30">
                <Users className="w-10 h-10 text-primary" />
              </div>
            </motion.div>

            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We're In This Journey With You
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Sliding Scale</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Pay what you can afford based on your income level.</p>
                <p className="text-xs text-primary font-medium">Sessions from $20-$80</p>
              </div>
              <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-semibold text-foreground">Community Service</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Earn therapy credits by volunteering in your community.</p>
                <p className="text-xs text-[#D4AF37] font-medium">1 hour = $15 credit</p>
              </div>
              <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <HandHelping className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Payment Plans</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Split your session costs into manageable payments.</p>
                <p className="text-xs text-primary font-medium">0% interest plans</p>
              </div>
            </motion.div>

            <motion.p
              className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Our barter system allows you to contribute what you can and earn therapy credits through meaningful community involvement. Together, we'll find a path that works for your situation.
            </motion.p>

            <Button 
              onClick={() => setStep(4)}
              size="lg"
              className="bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 font-semibold text-primary-foreground"
            >
              See How to Apply
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-6 px-4"
          >
            <motion.div
              className="mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-primary/20 rounded-full inline-block border border-green-500/30">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </motion.div>

            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ready to Take the Next Step?
            </motion.h2>

            <motion.div
              className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="w-5 h-5 text-primary" />
                <p className="text-xs text-muted-foreground">100% Confidential</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-xs text-muted-foreground">2-Day Review</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <MessageCircle className="w-5 h-5 text-primary" />
                <p className="text-xs text-muted-foreground">Personal Support</p>
              </div>
            </motion.div>

            <motion.p
              className="text-muted-foreground max-w-md mx-auto mb-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your application is reviewed by our care team within 2 business days. We'll work with you personally to find the best option for your situation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={handleApply}
                size="lg"
                className="bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 font-semibold text-primary-foreground"
              >
                <Heart className="w-4 h-4 mr-2" />
                Apply for Financial Assistance
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline"
                size="lg"
                className="border-primary/50 text-foreground hover:bg-primary/10"
              >
                Learn More About Barter System
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Not ready yet? That's okay.{" "}
              <button 
                onClick={handleClose}
                className="text-primary hover:underline"
              >
                You can always come back
              </button>
            </motion.p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl p-0 overflow-hidden border-primary/20 bg-background">
        <VisuallyHidden>
          <DialogTitle>Financial Assistance</DialogTitle>
        </VisuallyHidden>
        
        {/* Progress indicators */}
        <div className="flex gap-2 px-6 pt-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                s <= step 
                  ? "bg-gradient-to-r from-primary to-[#D4AF37]" 
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
