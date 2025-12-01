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
      setTimeout(() => setStage(1), 500),    // Show ThriveMT text
      setTimeout(() => setStage(2), 2000),   // Fade out text
      setTimeout(() => setStage(3), 3500),   // Show logo
      setTimeout(() => setStage(4), 5000),   // Fade out logo
      setTimeout(() => setStage(5), 6000),   // Show final screen
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Subtle golden ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 50%)'
        }}
      />

      {/* Animation Stages */}
      <AnimatePresence mode="wait">
        {/* Stage 1: ThriveMT Text Fade In */}
        {stage === 1 && (
          <motion.div
            key="thrive-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <div className="text-9xl font-bold text-[#B87333]">
              ThriveMT
            </div>
          </motion.div>
        )}

        {/* Stage 2: Text Fade Out (handled by exit animation) */}

        {/* Stage 3: Logo Fade In */}
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
              className="w-64 h-64"
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
            {/* Logo */}
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
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-6xl md:text-8xl font-bold mb-16 text-[#B87333] leading-tight"
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
