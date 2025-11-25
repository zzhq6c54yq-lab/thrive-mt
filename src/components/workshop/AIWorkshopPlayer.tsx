import React, { useState, useEffect } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import WorkshopNarrator from './WorkshopNarrator';
import WorkshopSlideViewer from './WorkshopSlideViewer';
import { useWorkshopNarration } from '@/hooks/useWorkshopNarration';
import { downloadWorksheet } from '@/utils/worksheetUtils';
import { useToast } from '@/hooks/use-toast';
import { SafetySection } from './SafetySection';

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
  
  // Combine section text for narration
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
          title: "Workshop Complete! 🎉",
          description: "You've finished the entire workshop.",
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
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground" style={{ textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Section {currentSectionIndex + 1} of {sections.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

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

      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Button
          onClick={goToPreviousSection}
          variant="outline"
          disabled={currentSectionIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Section
        </Button>

        <Button
          onClick={handleDownloadWorksheet}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download Worksheet
        </Button>

        <Button
          onClick={goToNextSection}
          variant="outline"
          disabled={currentSectionIndex === sections.length - 1}
        >
          Next Section
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Safety Section - Display at the end */}
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
