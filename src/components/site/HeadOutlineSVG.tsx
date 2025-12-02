import { motion } from "framer-motion";

interface HeadOutlineSVGProps {
  isAnimating: boolean;
  className?: string;
}

export const HeadOutlineSVG = ({ isAnimating, className = "" }: HeadOutlineSVGProps) => {
  // Total path length will be calculated by the browser
  const pathLength = 1000; // Approximate value for animation timing

  return (
    <div className={`relative ${className}`}>
      {/* Radiant light burst background - appears when logo lights up */}
      {isAnimating && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 2, 1.8] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(212, 165, 116, 0.3) 30%, rgba(184, 115, 51, 0.2) 50%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
              width: '200%',
              height: '200%',
            }}
          />
          {/* Animated light rays */}
          <div className="absolute inset-0 -z-10 light-rays" />
        </>
      )}

      <svg
        viewBox="0 0 512 512"
        className="w-full h-full"
        style={{
          filter: isAnimating
            ? 'drop-shadow(0 0 2px #FFFFFF) drop-shadow(0 0 10px #FFD700) drop-shadow(0 0 30px #D4A574) drop-shadow(0 0 60px #B87333) drop-shadow(0 0 100px #B87333)'
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
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: isAnimating ? 0 : pathLength,
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
            duration: 2,
            ease: "easeInOut",
            delay: 0.3,
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
            delay: 0.8,
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
            delay: 0.9,
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
            delay: 1.2,
          }}
        />
      </svg>

      <style>{`
        .light-rays {
          background: 
            conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              rgba(255, 215, 0, 0.1) 45deg,
              transparent 90deg,
              rgba(255, 215, 0, 0.1) 135deg,
              transparent 180deg,
              rgba(255, 215, 0, 0.1) 225deg,
              transparent 270deg,
              rgba(255, 215, 0, 0.1) 315deg,
              transparent 360deg
            );
          animation: rotate-rays 20s linear infinite;
        }

        @keyframes rotate-rays {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
