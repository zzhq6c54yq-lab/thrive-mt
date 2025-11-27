import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLocation } from 'react-router-dom';
import HenryDialog from '@/components/henry/HenryDialog';

interface FloatingHenryAssistantProps {
  className?: string;
}

const FloatingHenryAssistant: React.FC<FloatingHenryAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const location = useLocation();

  // Context-aware messages based on current page
  const getContextMessage = () => {
    const path = location.pathname;
    
    if (path.includes('journal')) return "Need help getting started with journaling?";
    if (path.includes('meditation')) return "Want guidance on meditation practice?";
    if (path.includes('games')) return "Looking for game recommendations?";
    if (path.includes('crisis')) return "I'm here to support you through this.";
    if (path.includes('progress') || path.includes('analytics')) return "Let me help you understand your patterns.";
    if (path.includes('workshop')) return "Questions about the workshop?";
    if (path.includes('assessment')) return "Need help interpreting your results?";
    if (path.includes('/dashboard')) return "How can I support you today?";
    
    return "Hey! I'm here to help anytime.";
  };

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Show tooltip when route changes
  useEffect(() => {
    setShowTooltip(true);
  }, [location.pathname]);

  // Don't show on auth/onboarding pages
  if (location.pathname === '/auth' || 
      location.pathname === '/onboarding' || 
      location.pathname === '/' || 
      location.pathname === '/auth/confirm') {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full right-0 mb-4 bg-white/95 backdrop-blur-md text-gray-800 px-4 py-3 rounded-xl shadow-lg border border-[#D4AF37]/30 whitespace-nowrap max-w-[280px]"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="text-sm font-medium">{getContextMessage()}</p>
                <div className="absolute top-full right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/95"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-br from-[#D4AF37] to-[#B8941F] p-4 rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
          >
            {/* Breathing animation glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-md opacity-40"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <Avatar className="h-16 w-16 border-4 border-white/30 relative">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black font-bold text-2xl">
                H
              </AvatarFallback>
            </Avatar>

            {/* Sparkle indicator */}
            <motion.div
              className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1.5 shadow-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Henry Chat Dialog */}
      <HenryDialog 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default FloatingHenryAssistant;
