import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Page from '@/components/Page';
import WhisperWall from '@/components/unburdened/WhisperWall';

const Unburdened: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 py-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-rose-500/20 text-rose-400 border-rose-500/40">
              Community Support
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Unburdened
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 drop-shadow-lg">
              Share your thoughts anonymously and connect with others in a safe, supportive space
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 mx-auto">
        <WhisperWall />
      </div>
    </div>
  );
};

export default Unburdened;
