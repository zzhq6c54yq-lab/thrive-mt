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
          className="relative w-[14rem] h-[14rem] md:w-[16rem] md:h-[16rem] logo-container"
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
          className="text-6xl md:text-7xl font-bold text-center leading-tight whitespace-nowrap"
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
          filter: drop-shadow(0 0 10px rgba(212, 165, 116, 0.3));
        }

        .logo-container::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF;
          animation: trace-outline 8s linear infinite;
          z-index: 10;
        }

        .logo-container::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #B87333;
          border-radius: 50%;
          box-shadow: 0 0 10px #B87333, 0 0 20px #D4A574, 0 0 30px #B87333;
          animation: trace-outline 8s linear infinite;
          animation-delay: -4s;
          z-index: 10;
        }

        @keyframes trace-outline {
          0% { top: 0%; left: 50%; transform: translate(-50%, -50%); }
          25% { top: 50%; left: 100%; transform: translate(-50%, -50%); }
          50% { top: 100%; left: 50%; transform: translate(-50%, -50%); }
          75% { top: 50%; left: 0%; transform: translate(-50%, -50%); }
          100% { top: 0%; left: 50%; transform: translate(-50%, -50%); }
        }

      `}</style>
    </div>
  );
};

export default SiteEntry;
