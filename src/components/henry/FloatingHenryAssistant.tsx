import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLocation } from 'react-router-dom';
import HenryDialog from '@/components/henry/HenryDialog';

interface FloatingHenryAssistantProps {
  className?: string;
}

const FloatingHenryAssistant: React.FC<FloatingHenryAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Don't show on auth/onboarding/marketing site pages
  if (location.pathname === '/app/auth' || 
      location.pathname === '/app/onboarding' || 
      location.pathname === '/' || 
      location.pathname === '/app/auth/confirm' ||
      !location.pathname.startsWith('/app')) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed bottom-20 right-6 z-50 ${className}`}
      >
        <div className="relative">
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
