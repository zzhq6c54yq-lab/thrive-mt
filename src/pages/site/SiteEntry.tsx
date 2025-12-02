import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import headLogo from "@/assets/thrivemt-head-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),    // "ThriveMT" fades in
      setTimeout(() => setStage(2), 1500),   // Logo fades in
      setTimeout(() => setStage(3), 3000),   // "Build the Best You" fades in
      setTimeout(() => setStage(4), 4500),   // Button appears
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden flex items-center justify-center">

      {/* Stacked vertical layout - cinematic animation sequence */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        
        {/* ThriveMT Text Logo - Fades in together */}
        <div className="relative flex items-baseline gap-0">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            Thrive
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: stage >= 1 ? 1 : 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold tracking-tight mt-glow"
            style={{
              background: 'linear-gradient(135deg, #B87333 0%, #D4A574 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MT
          </motion.span>
        </div>

        {/* Your Logo with Animated Bronze-White Glow - Stage 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem]"
        >
          <img 
            src={headLogo}
            alt="ThriveMT Head Logo"
            className="w-full h-full object-contain logo-tracer"
          />
        </motion.div>

        {/* "Build the Best You" Headline - Fades in at stage 3 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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

        {/* ENTER Button with Light Sweep - Fades in at stage 4 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
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

        .logo-tracer {
          animation: outline-tracer 3s ease-in-out infinite;
        }

        @keyframes outline-tracer {
          0% {
            filter: drop-shadow(0 0 15px #B87333) drop-shadow(0 0 30px #B87333);
          }
          50% {
            filter: drop-shadow(0 0 30px #FFFFFF) drop-shadow(0 0 60px #D4A574) drop-shadow(0 0 90px #B87333);
          }
          100% {
            filter: drop-shadow(0 0 15px #B87333) drop-shadow(0 0 30px #B87333);
          }
        }

      `}</style>
    </div>
  );
};

export default SiteEntry;
