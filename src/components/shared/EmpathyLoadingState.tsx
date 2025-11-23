import React from 'react';
import { motion } from 'framer-motion';

interface EmpathyLoadingStateProps {
  message?: string;
}

const loadingMessages = [
  "We're building your sanctuary...",
  "Almost there. Take a breath with us...",
  "Creating your space to just be...",
  "Connecting you with support...",
  "We're here. Just preparing everything...",
  "Almost ready. You matter...",
];

const EmpathyLoadingState: React.FC<EmpathyLoadingStateProps> = ({ message }) => {
  const [currentMessage, setCurrentMessage] = React.useState(message || loadingMessages[0]);

  React.useEffect(() => {
    if (message) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setCurrentMessage(loadingMessages[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Breathing skull logo */}
      <motion.div
        animate={{
          scale: [0.98, 1.02, 0.98],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-8"
      >
        {/* Luminous glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 blur-2xl bg-[#D4AF37] rounded-full"
        />
        
        {/* Bronze skull logo */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#E5C5A1] to-[#B8941F] flex items-center justify-center shadow-2xl">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
            alt="ThriveMT" 
            className="w-16 h-16 object-contain"
          />
        </div>
        
        {/* Particle field - neural connections */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.cos(i * Math.PI / 4) * 60, 0],
              y: [0, Math.sin(i * Math.PI / 4) * 60, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#D4AF37] rounded-full"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        ))}
        
        {/* Pulsing rings */}
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
        />
        <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.6,
          }}
          className="absolute inset-0 rounded-full border-2 border-[#E5C5A1]"
        />
      </motion.div>

      {/* Connecting messages */}
      <motion.p
        key={currentMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-lg text-foreground/90 text-center max-w-md font-light"
      >
        {currentMessage}
      </motion.p>

      {/* Heart-centered reassurance */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-sm text-muted-foreground text-center mt-4 font-light"
      >
        You matter. We're here.
      </motion.p>
    </div>
  );
};

export default EmpathyLoadingState;
