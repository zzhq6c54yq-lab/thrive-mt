import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import thriveTextLogo from "@/assets/thrivemt-text-logo.png";
import thriveOutlineLogo from "@/assets/thrivemt-outline-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),    // ThriveMT text fades in
      setTimeout(() => setStage(2), 4000),   // Logo fades in
      setTimeout(() => setStage(3), 7000),   // "Build the Best You" fades in
      setTimeout(() => setStage(4), 10000),  // Button appears with light sweep
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center">
      {/* Elegant marble-like background with soft glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(245,245,245,0.08) 0%, rgba(212,165,116,0.03) 30%, transparent 60%)',
        }}
      />
      {/* Subtle marble texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212,165,116,0.05) 0%, transparent 50%)',
        }}
      />

      {/* Stacked vertical layout - all elements stay visible once they appear */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        
        {/* Stage 1+: ThriveMT Text Logo */}
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img 
              src={thriveTextLogo} 
              alt="ThriveMT" 
              className="w-96 h-auto"
              style={{ 
                mixBlendMode: 'screen',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)',
                filter: 'drop-shadow(0 0 40px rgba(212,165,116,0.5))'
              }}
            />
          </motion.div>
        )}

        {/* Stage 2+: Outline Head Logo */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img 
              src={thriveOutlineLogo} 
              alt="ThriveMT Logo" 
              className="w-64 h-64"
              style={{ 
                mixBlendMode: 'screen',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)',
                filter: 'drop-shadow(0 0 60px rgba(212,165,116,0.4)) drop-shadow(0 0 30px rgba(255,255,255,0.2))' 
              }}
            />
          </motion.div>
        )}

        {/* Stage 3+: "Build the Best You" Headline */}
        {stage >= 3 && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-6xl md:text-7xl font-bold text-center leading-tight"
            style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Build the Best You
          </motion.h1>
        )}

        {/* Stage 4+: ENTER Button with Light Sweep */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Button
              size="xl"
              onClick={() => navigate("/site/home")}
              className="relative overflow-hidden text-black font-bold text-xl px-20 py-8 rounded-lg"
              style={{
                background: 'linear-gradient(90deg, #B87333 0%, #D4A574 25%, #FFFFFF 50%, #D4A574 75%, #B87333 100%)',
                backgroundSize: '200% 100%',
                animation: 'light-sweep 2s ease-in-out infinite',
              }}
            >
              ENTER
            </Button>
          </motion.div>
        )}
      </div>

      {/* CSS Animation for Light Sweep */}
      <style>{`
        @keyframes light-sweep {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default SiteEntry;
