import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Settings, Phone, Heart } from 'lucide-react';
import { THRIVE_LOGO } from '@/constants/branding';

export const DashboardFooter: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Help & Support', icon: HelpCircle, onClick: () => navigate('/app/help') },
    { label: 'Settings', icon: Settings, onClick: () => navigate('/app/settings') },
    { label: 'Crisis Resources', icon: Phone, onClick: () => navigate('/app/crisis-resources') },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mt-12 pt-8 border-t border-[#D4AF37]/10"
    >
      <div className="space-y-6">
        {/* Closing Message */}
        <div className="text-center space-y-3">
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <img
              src={THRIVE_LOGO}
              alt="ThriveMT"
              className="w-12 h-12 mx-auto opacity-60"
            />
          </motion.div>
          
          <p className="text-lg text-[#E5C5A1] font-light">
            You're doing great. See you tomorrow.
          </p>
          <p className="text-sm text-muted-foreground">
            Every moment you choose yourself matters. This was one of them.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a2332]/50 hover:bg-[#1a2332]/70 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all text-sm text-muted-foreground hover:text-[#E5C5A1]"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </button>
          ))}
        </div>

        {/* Crisis Line - Always Visible */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-red-400" />
            <p className="text-sm font-semibold text-red-200">In Crisis?</p>
          </div>
          <p className="text-sm text-red-100/80 mb-2">
            Call or text <strong className="text-red-200">988</strong> - You deserve support right now.
          </p>
          <p className="text-xs text-red-100/60">
            The National Suicide Prevention Lifeline is available 24/7
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} ThriveMT. Your journey toward wellness.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
