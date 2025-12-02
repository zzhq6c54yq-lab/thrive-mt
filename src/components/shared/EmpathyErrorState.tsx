import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface EmpathyErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const EmpathyErrorState: React.FC<EmpathyErrorStateProps> = ({ 
  title = "Let's try that together again",
  message = "We're having trouble connecting right now. Take a breath - we'll work through this together.",
  onRetry,
  showHomeButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center"
          >
            <AlertCircle className="w-12 h-12 text-red-400" />
          </motion.div>
          
          {/* Subtle pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-red-400"
          />
        </div>
      </motion.div>

      {/* Error message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 max-w-md"
      >
        <h2 className="text-2xl font-light text-foreground">{title}</h2>
        <p className="text-muted-foreground leading-relaxed font-light">{message}</p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 mt-8"
      >
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-500 shadow-lg hover:shadow-xl font-light"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Let's try again together
          </Button>
        )}
        
        {showHomeButton && (
          <Button
            onClick={() => navigate('/app/dashboard')}
            variant="outline"
            className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all duration-300 font-light"
          >
            <Home className="w-4 h-4 mr-2" />
            Take me somewhere safe
          </Button>
        )}
      </motion.div>

      {/* Heart-centered reassurance */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-muted-foreground mt-8 font-light"
      >
        We're here with you. You're not alone in this.
      </motion.p>
    </motion.div>
  );
};

export default EmpathyErrorState;
