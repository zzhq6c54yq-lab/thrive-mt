import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-4"
    >
      <div className="relative w-16 h-16 mx-auto">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </motion.div>
  </div>
);

interface RouteLoadingWrapperProps {
  children: React.ReactNode;
}

const RouteLoadingWrapper: React.FC<RouteLoadingWrapperProps> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

export default RouteLoadingWrapper;
