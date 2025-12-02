import { motion } from "framer-motion";

interface HeadOutlineSVGProps {
  isAnimating: boolean;
  className?: string;
}

export const HeadOutlineSVG = ({ isAnimating, className = "" }: HeadOutlineSVGProps) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 512 512"
        className={`w-full h-full ${isAnimating ? 'logo-stroke-pulse' : ''}`}
        style={{
          filter: isAnimating
            ? 'drop-shadow(0 0 4px #D4A574) drop-shadow(0 0 8px #B87333) drop-shadow(0 0 15px #B87333)'
            : 'none',
        }}
      >
        {/* Head outline path */}
        <motion.path
          d="M 150 100 Q 120 80 120 120 L 120 350 Q 120 420 180 450 L 310 450 Q 400 420 420 350 L 420 280 Q 420 240 440 220 Q 460 200 460 160 Q 460 80 380 60 Q 300 40 220 60 Q 150 80 150 100 Z"
          fill="none"
          stroke="#D4A574"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isAnimating ? 1 : 0,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />

        {/* Outer circular arrow path */}
        <motion.path
          d="M 200 140 Q 180 120 160 140 Q 140 160 140 200 L 140 280 Q 140 320 170 340 Q 200 360 240 360 L 300 360 Q 340 360 370 340 Q 390 320 390 280 L 390 200 Q 390 160 370 140"
          fill="none"
          stroke="#D4A574"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isAnimating ? 1 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Top left arrow */}
        <motion.path
          d="M 180 150 L 160 140 L 170 160"
          fill="none"
          stroke="#D4A574"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isAnimating ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 2.2,
          }}
        />

        {/* Bottom right arrow */}
        <motion.path
          d="M 350 310 L 370 320 L 360 300"
          fill="none"
          stroke="#D4A574"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isAnimating ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 3.5,
          }}
        />

        {/* Heart shape in center */}
        <motion.path
          d="M 256 280 L 236 260 Q 220 245 220 225 Q 220 205 235 195 Q 250 185 256 195 Q 262 185 277 195 Q 292 205 292 225 Q 292 245 276 260 Z"
          fill="none"
          stroke="#D4A574"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isAnimating ? 1 : 0,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </svg>

      <style>{`
        @keyframes logo-stroke-pulse {
          0%, 100% { 
            filter: drop-shadow(0 0 4px #D4A574) drop-shadow(0 0 8px #B87333);
          }
          50% { 
            filter: drop-shadow(0 0 8px #D4A574) drop-shadow(0 0 15px #B87333) drop-shadow(0 0 20px #B87333);
          }
        }

        .logo-stroke-pulse {
          animation: logo-stroke-pulse 3s ease-in-out infinite;
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
};
