
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const SpinningLogo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Main spinning circle with better size for mobile */}
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(184, 115, 51, 0.4), transparent 50%), linear-gradient(135deg, #B87333 0%, #E5C5A1 35%, #F5E6D3 65%, #B87333 100%)",
          boxShadow: "0 0 40px rgba(184, 115, 51, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)"
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Inner glow effect */}
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(184, 115, 51, 0.2) 40%, transparent 70%)",
          }}
        />
        
        {/* Bronze head with heart for brain in center */}
        <motion.div
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #CD7F32 0%, #B87333 50%, #A0522D 100%)",
            boxShadow: "0 4px 15px rgba(184, 115, 51, 0.5), inset 0 2px 8px rgba(255, 255, 255, 0.3)"
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Heart icon representing brain */}
          <Heart 
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-lg" 
            fill="currentColor"
          />
          
          {/* Additional inner glow for the head */}
          <div 
            className="absolute inset-1 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 60%)"
            }}
          />
        </motion.div>
        
        {/* Orbital elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(45deg, #E5C5A1, #B87333)",
              boxShadow: "0 0 10px rgba(184, 115, 51, 0.8)",
              transformOrigin: `${40 + i * 15}px center`,
              left: "50%",
              top: "50%",
              marginLeft: "-6px",
              marginTop: "-6px"
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
      
      {/* Ambient glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-50 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(184, 115, 51, 0.3) 0%, transparent 70%)",
          filter: "blur(20px)"
        }}
      />
    </div>
  );
};

export default SpinningLogo;
