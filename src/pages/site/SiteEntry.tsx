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

        {/* Your Logo with Multiple Orbiting Dots and Light Trails - Stage 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[10rem] h-[10rem] md:w-[12rem] md:h-[12rem] logo-container"
        >
          <img 
            src={headLogo}
            alt="ThriveMT Head Logo"
            className="w-full h-full object-contain logo-tracer"
          />
          
          {/* Multiple orbiting dots with light trails */}
          <div className="orbit-dot dot-1"></div>
          <div className="orbit-dot dot-2"></div>
          <div className="orbit-dot dot-3"></div>
          <div className="orbit-dot dot-4"></div>
          <div className="orbit-dot dot-5"></div>
          <div className="orbit-dot dot-6"></div>
        </motion.div>

        {/* "Build the Best You" Headline - Fades in at stage 3 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center leading-tight whitespace-nowrap px-4"
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
              animation: 'light-sweep 8s ease-in-out infinite',
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
          filter: drop-shadow(0 0 15px rgba(212, 165, 116, 0.4));
        }

        .logo-container {
          position: relative;
        }

        /* Orbiting dots with light trails */
        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform-origin: center;
        }

        .orbit-dot::after {
          content: '';
          position: absolute;
          width: 30px;
          height: 4px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translateY(-50%);
          filter: blur(3px);
          opacity: 0.6;
        }

        /* Dot 1 - White, outer ring, clockwise */
        .dot-1 {
          background: #FFFFFF;
          box-shadow: 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF;
          animation: orbit-1 6s linear infinite;
        }
        .dot-1::after {
          background: linear-gradient(90deg, transparent, #FFFFFF);
          animation: trail-rotate-1 6s linear infinite;
        }

        /* Dot 2 - Bronze, outer ring, counter-clockwise */
        .dot-2 {
          background: #B87333;
          box-shadow: 0 0 10px #B87333, 0 0 20px #D4A574, 0 0 30px #B87333;
          animation: orbit-2 6s linear infinite;
        }
        .dot-2::after {
          background: linear-gradient(90deg, transparent, #B87333);
          animation: trail-rotate-2 6s linear infinite;
        }

        /* Dot 3 - Gold, middle ring, clockwise */
        .dot-3 {
          background: #D4AF37;
          box-shadow: 0 0 8px #D4AF37, 0 0 16px #D4AF37;
          animation: orbit-3 8s linear infinite;
        }
        .dot-3::after {
          background: linear-gradient(90deg, transparent, #D4AF37);
          animation: trail-rotate-3 8s linear infinite;
        }

        /* Dot 4 - White, middle ring, counter-clockwise */
        .dot-4 {
          background: #E8D4C0;
          box-shadow: 0 0 8px #E8D4C0, 0 0 16px #FFFFFF;
          animation: orbit-4 8s linear infinite;
        }
        .dot-4::after {
          background: linear-gradient(90deg, transparent, #E8D4C0);
          animation: trail-rotate-4 8s linear infinite;
        }

        /* Dot 5 - Bronze, inner ring, fast clockwise */
        .dot-5 {
          background: #D4A574;
          box-shadow: 0 0 6px #D4A574, 0 0 12px #B87333;
          animation: orbit-5 4s linear infinite;
        }
        .dot-5::after {
          background: linear-gradient(90deg, transparent, #D4A574);
          animation: trail-rotate-5 4s linear infinite;
        }

        /* Dot 6 - White, inner ring, fast counter-clockwise */
        .dot-6 {
          background: #FFFFFF;
          box-shadow: 0 0 6px #FFFFFF, 0 0 12px #E8D4C0;
          animation: orbit-6 4s linear infinite;
        }
        .dot-6::after {
          background: linear-gradient(90deg, transparent, #FFFFFF);
          animation: trail-rotate-6 4s linear infinite;
        }

        /* Outer ring orbits - radius 120px */
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes trail-rotate-1 {
          0% { transform: translateY(-50%) rotate(180deg); }
          100% { transform: translateY(-50%) rotate(-180deg); }
        }

        @keyframes orbit-2 {
          0% { transform: rotate(180deg) translateX(100px) rotate(-180deg); }
          100% { transform: rotate(-180deg) translateX(100px) rotate(180deg); }
        }
        @keyframes trail-rotate-2 {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }

        /* Middle ring orbits - radius 80px */
        @keyframes orbit-3 {
          0% { transform: rotate(90deg) translateX(75px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(75px) rotate(-450deg); }
        }
        @keyframes trail-rotate-3 {
          0% { transform: translateY(-50%) rotate(180deg); }
          100% { transform: translateY(-50%) rotate(-180deg); }
        }

        @keyframes orbit-4 {
          0% { transform: rotate(270deg) translateX(75px) rotate(-270deg); }
          100% { transform: rotate(-90deg) translateX(75px) rotate(90deg); }
        }
        @keyframes trail-rotate-4 {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }

        /* Inner ring orbits - radius 55px */
        @keyframes orbit-5 {
          0% { transform: rotate(45deg) translateX(55px) rotate(-45deg); }
          100% { transform: rotate(405deg) translateX(55px) rotate(-405deg); }
        }
        @keyframes trail-rotate-5 {
          0% { transform: translateY(-50%) rotate(180deg); }
          100% { transform: translateY(-50%) rotate(-180deg); }
        }

        @keyframes orbit-6 {
          0% { transform: rotate(225deg) translateX(55px) rotate(-225deg); }
          100% { transform: rotate(-135deg) translateX(55px) rotate(135deg); }
        }
        @keyframes trail-rotate-6 {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SiteEntry;
