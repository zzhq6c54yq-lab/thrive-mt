import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import WorkshopNarrator from './WorkshopNarrator';
import WorkshopSlideViewer from './WorkshopSlideViewer';
import { useWorkshopNarration } from '@/hooks/useWorkshopNarration';
import { downloadWorksheet } from '@/utils/worksheetUtils';
import { useToast } from '@/hooks/use-toast';
import { SafetySection } from './SafetySection';
import { motion } from 'framer-motion';

interface WorkshopSection {
  title: string;
  description: string;
  exercises: Array<{
    title: string;
    instructions: string;
    prompts: string[];
  }>;
}

interface ClinicalContext {
  framework: string;
  evidenceBase: string;
  contraindications: string[];
  whenToSeekHelp: string;
  crisisResources: {
    name: string;
    contact: string;
    description: string;
  }[];
  culturalConsiderations: string;
}

interface AIWorkshopPlayerProps {
  workshopId: string;
  title: string;
  subtitle: string;
  introduction: string;
  sections: WorkshopSection[];
  clinicalContext?: ClinicalContext;
}

const AIWorkshopPlayer: React.FC<AIWorkshopPlayerProps> = ({
  workshopId,
  title,
  subtitle,
  introduction,
  sections,
  clinicalContext,
}) => {
  const { toast } = useToast();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = sections[currentSectionIndex];
  
  const sectionText = `${currentSection.description} ${
    currentSection.exercises
      .map(ex => `${ex.instructions} ${ex.prompts.join('. ')}`)
      .join('. ')
  }`;

  const {
    isPlaying,
    isPaused,
    currentSentenceIndex,
    sentences,
    rate,
    availableVoices,
    selectedVoice,
    play,
    pause,
    stop,
    setPlaybackRate,
    changeVoice,
  } = useWorkshopNarration({
    text: sectionText,
    onComplete: () => {
      if (currentSectionIndex < sections.length - 1) {
        toast({
          title: "Section Complete",
          description: "Moving to next section...",
          duration: 2000,
        });
        setTimeout(() => {
          setCurrentSectionIndex(prev => prev + 1);
        }, 2000);
      } else {
        toast({
          title: "Workshop Complete",
          description: "You've finished the entire workshop. Well done.",
          duration: 3000,
        });
      }
    },
  });

  const handleDownloadWorksheet = () => {
    downloadWorksheet(workshopId, toast);
  };

  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      stop();
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      stop();
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const progressPercentage = ((currentSectionIndex + 1) / sections.length) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-[#B87333]/10 border border-[#B87333]/20">
            <BookOpen className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <span className="text-sm text-[#E5C5A1] tracking-wide uppercase">Workshop Session</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">{subtitle}</p>
      </motion.div>

      {/* Progress */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-[#0f1419] border border-white/[0.06] p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#B87333]" />
            <span className="text-sm font-medium text-foreground">
              Section {currentSectionIndex + 1} of {sections.length}
            </span>
          </div>
          <span className="text-sm text-[#E5C5A1] font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B87333] to-[#D4AF37] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        {/* Section dots */}
        <div className="flex gap-2 mt-3">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => { stop(); setCurrentSectionIndex(i); }}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= currentSectionIndex
                  ? 'bg-[#B87333]'
                  : 'bg-white/[0.08] hover:bg-white/[0.15]'
              }`}
              aria-label={`Go to section ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Narrator Controls */}
      <WorkshopNarrator
        isPlaying={isPlaying}
        isPaused={isPaused}
        rate={rate}
        availableVoices={availableVoices}
        selectedVoice={selectedVoice}
        onPlay={play}
        onPause={pause}
        onStop={stop}
        onRateChange={setPlaybackRate}
        onVoiceChange={changeVoice}
      />

      {/* Slide Viewer */}
      <WorkshopSlideViewer
        slide={currentSection}
        currentSentenceIndex={currentSentenceIndex}
        sentences={sentences}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={goToPreviousSection}
          variant="outline"
          disabled={currentSectionIndex === 0}
          className="border-white/[0.1] hover:border-[#B87333]/30 hover:bg-[#B87333]/5 gap-2 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          onClick={handleDownloadWorksheet}
          variant="outline"
          className="border-[#B87333]/25 hover:border-[#B87333]/40 hover:bg-[#B87333]/5 text-[#E5C5A1] gap-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download Worksheet</span>
        </Button>

        <Button
          onClick={goToNextSection}
          disabled={currentSectionIndex === sections.length - 1}
          className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#B87333]/90 hover:to-[#D4AF37]/90 text-white gap-2 disabled:opacity-30"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Safety Section */}
      {clinicalContext && currentSectionIndex === sections.length - 1 && (
        <SafetySection
          crisisResources={clinicalContext.crisisResources}
          whenToSeekHelp={clinicalContext.whenToSeekHelp}
          contraindications={clinicalContext.contraindications}
        />
      )}
    </div>
  );
};

export default AIWorkshopPlayer;
