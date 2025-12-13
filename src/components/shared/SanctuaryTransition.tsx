import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SanctuaryTransitionProps {
  children: React.ReactNode;
  show?: boolean;
  duration?: number;
  message?: string;
}

/**
 * Sanctuary Transition - A signature ThriveMT UX pattern
 * Creates a moment of mental preparation when entering wellness spaces
 */
export const SanctuaryTransition: React.FC<SanctuaryTransitionProps> = ({
  children,
  show = true,
  duration = 800,
  message = "Creating a peaceful space for you..."
}) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (show) {
      setIsTransitioning(true);
      setShowContent(false);
      
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, duration);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, duration * 0.6);

      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setIsTransitioning(false);
      setShowContent(true);
    }
  }, [show, duration]);

  return (
    <div className="relative">
      {/* Sanctuary overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Breathing glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.2)',
                    '0 0 40px rgba(212, 175, 55, 0.4)',
                    '0 0 20px rgba(212, 175, 55, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-bronze-400/30 to-bronze-600/30 flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-bronze-400 to-bronze-600"
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-sm italic"
              >
                {message}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SanctuaryTransition;
