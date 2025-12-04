import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FinancialHelpModal } from "./FinancialHelpModal";

interface FinancialHelpBannerProps {
  variant?: "default" | "compact";
  className?: string;
}

export function FinancialHelpBanner({ variant = "default", className = "" }: FinancialHelpBannerProps) {
  const [showModal, setShowModal] = useState(false);

  if (variant === "compact") {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={className}
        >
          <Card 
            className="bg-gradient-to-r from-primary/10 via-[#D4AF37]/5 to-primary/10 border-primary/20 p-4 cursor-pointer hover:border-primary/40 transition-all group"
            onClick={() => setShowModal(true)}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Financial Struggle? Let Us Help</p>
                  <p className="text-xs text-muted-foreground">Everyone deserves quality care</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </motion.div>
        <FinancialHelpModal open={showModal} onOpenChange={setShowModal} />
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={className}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-[#D4AF37]/5 to-primary/10 border-primary/20 p-6 md:p-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <motion.div 
                className="p-4 bg-gradient-to-br from-primary/20 to-[#D4AF37]/20 rounded-full border border-primary/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-medium text-[#D4AF37]">We're Here For You</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Financial Struggle? Let Us Help
              </h3>
              <p className="text-muted-foreground max-w-xl">
                Your wellbeing matters more than your wallet. We believe everyone deserves access to quality mental health care, regardless of their financial situation.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 text-primary-foreground font-semibold group"
                size="lg"
              >
                Learn How We Can Help
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
      <FinancialHelpModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
