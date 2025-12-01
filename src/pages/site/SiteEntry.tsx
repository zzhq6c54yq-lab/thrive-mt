import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import thriveLogoImage from "@/assets/thrivemt-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),    // Show ThriveMT text (dual-tone)
      setTimeout(() => setStage(2), 3000),   // Fade out text
      setTimeout(() => setStage(3), 4500),   // Show logo with white glow
      setTimeout(() => setStage(4), 7000),   // Fade out logo
      setTimeout(() => setStage(5), 8000),   // Show final screen
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center">
      {/* Elegant marble-like background with soft white/cream glow */}
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

      {/* Animation Stages */}
      <AnimatePresence mode="wait">
        {/* Stage 1: ThriveMT Text Fade In - Dual-Tone (Thrive=white, MT=gold) */}
        {stage === 1 && (
          <motion.div
            key="thrive-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <div className="text-9xl font-bold tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              <span style={{ color: '#F5F5F5' }}>Thrive</span>
              <span style={{ color: '#D4A574' }}>MT</span>
            </div>
          </motion.div>
        )}

        {/* Stage 2: Text Fade Out (handled by exit animation) */}

        {/* Stage 3: Logo Fade In with White Glow/Halo */}
        {stage === 3 && (
          <motion.div
            key="thrive-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <img 
              src={thriveLogoImage} 
              alt="ThriveMT Logo" 
              className="w-72 h-72"
              style={{ filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.5)) drop-shadow(0 0 30px rgba(255,255,255,0.3))' }}
            />
          </motion.div>
        )}

        {/* Stage 4: Logo Fade Out (handled by exit animation) */}

        {/* Stage 5: Final Landing Screen */}
        {stage === 5 && (
          <motion.div
            key="final-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          >
            {/* Logo with White Glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <img 
                src={thriveLogoImage} 
                alt="ThriveMT Logo" 
                className="w-32 h-32 mx-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))' }}
              />
            </motion.div>

            {/* Headline - Elegant Dual-Tone Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-6xl md:text-8xl font-bold mb-16 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #F5F5F5 0%, #D4A574 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Build the Best You
            </motion.h1>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                size="xl"
                onClick={() => navigate("/site/home")}
                className="bg-gradient-to-r from-[#FFC107] to-[#FFB300] hover:from-[#FFD54F] hover:to-[#FFC107] text-black font-bold text-xl px-20 py-8 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.4)]"
              >
                ENTER
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiteEntry;
