import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeadOutlineSVG } from "@/components/site/HeadOutlineSVG";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),    // "Thrive" text fades in
      setTimeout(() => setStage(2), 2000),   // "MT" ignites with glow
      setTimeout(() => setStage(3), 3500),   // Logo light trail starts
      setTimeout(() => setStage(4), 6000),   // "Build the Best You" fades in
      setTimeout(() => setStage(5), 8000),   // Button appears with light sweep
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden flex items-center justify-center">

      {/* Stacked vertical layout - cinematic animation sequence */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        
        {/* ThriveMT Text Logo - Split into "Thrive" and "MT" */}
        <div className="relative flex items-baseline gap-0">
          {/* "Thrive" Text - Fades in at stage 1 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-8xl md:text-9xl font-bold tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            Thrive
          </motion.span>

          {/* "MT" Text - Ignites with glow at stage 2 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: stage >= 2 ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`text-8xl md:text-9xl font-bold tracking-tight ${stage >= 2 ? 'mt-glow' : ''}`}
            style={{
              background: stage >= 2 ? 'linear-gradient(135deg, #B87333 0%, #D4A574 50%, #D4AF37 100%)' : '#FFFFFF',
              WebkitBackgroundClip: stage >= 2 ? 'text' : 'unset',
              WebkitTextFillColor: stage >= 2 ? 'transparent' : '#FFFFFF',
              backgroundClip: stage >= 2 ? 'text' : 'unset',
              position: 'relative',
            }}
          >
            MT
            {/* Light burst behind MT letters */}
            {stage >= 2 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 165, 116, 0.8) 0%, rgba(212, 165, 116, 0.4) 50%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            )}
          </motion.span>
        </div>

        {/* SVG Head Logo with Light Trail Animation - Stage 3 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage >= 3 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`relative w-80 h-80 md:w-96 md:h-96 ${stage >= 3 ? 'logo-neon-pulse' : ''}`}
        >
          <HeadOutlineSVG isAnimating={stage >= 3} />
        </motion.div>

        {/* "Build the Best You" Headline - Fades in at stage 4 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="text-6xl md:text-7xl font-bold text-center leading-tight"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D4C0 30%, #D4A574 60%, #B87333 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Build the Best You
        </motion.h1>

        {/* ENTER Button with Light Sweep - Fades in at stage 5 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 5 ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Button
            size="xl"
            onClick={() => navigate("/home")}
            className="relative overflow-hidden text-black font-bold text-xl px-20 py-8 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #B87333 0%, #D4A574 15%, #FFFFFF 40%, #FFFFFF 60%, #D4A574 85%, #B87333 100%)',
              backgroundSize: '300% 100%',
              animation: 'light-sweep 4s ease-in-out infinite',
            }}
          >
            ENTER
          </Button>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes light-sweep {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .mt-glow {
          animation: mt-glow-pulse 2s ease-in-out infinite;
        }

        @keyframes mt-glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 20px #B87333, 0 0 40px #D4A574;
            filter: brightness(1);
          }
          50% { 
            text-shadow: 0 0 40px #D4AF37, 0 0 80px #D4A574, 0 0 120px #B87333;
            filter: brightness(1.2);
          }
        }

        .logo-neon-pulse {
          animation: logo-neon-pulse 3s ease-in-out infinite;
        }

        @keyframes logo-neon-pulse {
          0%, 100% { 
            filter: 
              drop-shadow(0 0 2px #FFFFFF) 
              drop-shadow(0 0 10px #FFD700) 
              drop-shadow(0 0 30px #D4A574) 
              drop-shadow(0 0 60px #B87333) 
              drop-shadow(0 0 100px #B87333);
            transform: scale(1);
          }
          50% { 
            filter: 
              drop-shadow(0 0 4px #FFFFFF) 
              drop-shadow(0 0 20px #FFD700) 
              drop-shadow(0 0 50px #D4A574) 
              drop-shadow(0 0 100px #B87333) 
              drop-shadow(0 0 150px #B87333);
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default SiteEntry;
