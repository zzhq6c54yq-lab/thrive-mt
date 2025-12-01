import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import thriveLogoImage from "@/assets/thrivemt-logo.png";
import henryOutlinedLogo from "@/assets/henry-outlined-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),    // Show ThriveMT logo
      setTimeout(() => setStage(2), 3500),   // Fade out ThriveMT
      setTimeout(() => setStage(3), 5500),   // Show Henry logo
      setTimeout(() => setStage(4), 8500),   // Fade out Henry
      setTimeout(() => setStage(5), 10500),  // Show final screen
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
        {/* Stage 1: ThriveMT Logo Fade In */}
        {stage === 1 && (
          <motion.div
            key="thrive-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <img 
              src={thriveLogoImage} 
              alt="ThriveMT Logo" 
              className="w-40 h-40"
            />
          </motion.div>
        )}

        {/* Stage 2: ThriveMT Logo Fade Out (handled by exit animation) */}

        {/* Stage 3: Henry Logo Fade In */}
        {stage === 3 && (
          <motion.div
            key="henry-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <img 
              src={henryOutlinedLogo} 
              alt="Henry AI" 
              className="w-40 h-40"
            />
          </motion.div>
        )}

        {/* Stage 4: Henry Logo Fade Out (handled by exit animation) */}

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
                className="w-32 h-32 mx-auto mb-6"
              />
              <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
                ThriveMT
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent leading-tight"
            >
              Build the Best You
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-xl md:text-2xl text-white/80 mb-16 max-w-2xl mx-auto"
            >
              A sanctuary to heal, grow, and become yourself
            </motion.p>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                size="xl"
                onClick={() => navigate("/site/home")}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C350] hover:to-[#C9A430] text-black font-bold text-xl px-20 py-8 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
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
