import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool } from 'lucide-react';

interface WorkshopSlide {
  title: string;
  description: string;
  exercises?: Array<{
    title: string;
    instructions: string;
    prompts: string[];
  }>;
}

interface WorkshopSlideViewerProps {
  slide: WorkshopSlide;
  currentSentenceIndex: number;
  sentences: string[];
}

const WorkshopSlideViewer: React.FC<WorkshopSlideViewerProps> = ({
  slide,
  currentSentenceIndex,
  sentences,
}) => {
  return (
    <div className="relative w-full min-h-[420px] rounded-2xl overflow-hidden bg-[#0f1419] border border-white/[0.06]">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B87333]/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/[0.02] rounded-full blur-[80px]" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="relative p-8 md:p-12 flex flex-col"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl md:text-3xl font-light mb-8 text-foreground tracking-tight"
          >
            <span className="bg-gradient-to-r from-[#E5C5A1] to-[#D4AF37] bg-clip-text text-transparent">
              {slide.title}
            </span>
          </motion.h2>

          {/* Narrated text with sentence highlighting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed max-w-4xl"
          >
            {sentences.map((sentence, index) => (
              <span
                key={index}
                className={`inline transition-all duration-400 ${
                  index === currentSentenceIndex
                    ? 'text-foreground bg-[#B87333]/10 px-1 py-0.5 rounded'
                    : index < currentSentenceIndex
                    ? 'text-muted-foreground/80'
                    : 'text-muted-foreground/50'
                }`}
              >
                {sentence}.{' '}
              </span>
            ))}
          </motion.div>

          {/* Exercises */}
          {slide.exercises && slide.exercises.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 space-y-4"
            >
              {slide.exercises.map((exercise, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#B87333]/10 border border-[#B87333]/15">
                      <PenTool className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground">
                      {exercise.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {exercise.instructions}
                  </p>
                  <div className="space-y-2">
                    {exercise.prompts.map((prompt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <div className="w-1 h-1 rounded-full bg-[#B87333] mt-2 flex-shrink-0" />
                        <span>{prompt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WorkshopSlideViewer;
