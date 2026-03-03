import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import AIWorkshopPlayer from '@/components/workshop/AIWorkshopPlayer';
import { workshopData } from '@/data/workshopData';
import { motion } from 'framer-motion';

const AIWorkshopStudio = () => {
  const [searchParams] = useSearchParams();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  useEffect(() => {
    const workshopIdFromUrl = searchParams.get('selected');
    if (workshopIdFromUrl) {
      setSelectedWorkshop(workshopIdFromUrl);
    }
  }, [searchParams]);

  if (selectedWorkshop) {
    const workshop = workshopData.find(w => w.id === selectedWorkshop);
    if (!workshop) {
      setSelectedWorkshop(null);
      return null;
    }

    const sections = workshop.sections.map(section => ({
      title: section.title,
      description: section.content,
      exercises: [{
        title: section.practicalExercise.title,
        instructions: section.practicalExercise.instructions,
        prompts: section.practicalExercise.outcomes
      }]
    }));

    return (
      <Page title="AI Workshop Studio" showBackButton={true}>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedWorkshop(null)}
            className="mb-6 text-muted-foreground hover:text-foreground gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Workshops
          </Button>
          <AIWorkshopPlayer
            workshopId={selectedWorkshop}
            title={workshop.title}
            subtitle={workshop.description}
            introduction={workshop.learningOutcomes.join(' ')}
            sections={sections}
            clinicalContext={workshop.clinicalContext}
          />
        </div>
      </Page>
    );
  }

  return (
    <Page title="AI Workshop Studio" showBackButton={true}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B87333]/10 border border-[#B87333]/20 mb-6">
            <BookOpen className="h-4 w-4 text-[#B87333]" />
            <span className="text-sm text-[#E5C5A1] tracking-wide uppercase">Evidence-Based Programs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-5 text-foreground tracking-tight">
            Workshop <span className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] bg-clip-text text-transparent font-medium">Studio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Immersive, AI-narrated workshops designed by clinical experts. 
            Each session includes guided exercises and downloadable materials.
          </p>
        </motion.div>

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {workshopData.map((workshop, index) => {
            const Icon = workshop.icon;
            return (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <div
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0f1419] hover:border-[#B87333]/30 transition-all duration-500 h-full flex flex-col"
                  onClick={() => setSelectedWorkshop(workshop.id)}
                >
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={workshop.coverImage} 
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/40 to-transparent" />
                    
                    {/* Floating badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-white/80 border border-white/10">
                        <Clock className="h-3 w-3" />
                        {workshop.duration}
                      </span>
                    </div>
                    
                    {/* Clinical framework tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#B87333]/20 backdrop-blur-md text-xs text-[#E5C5A1] border border-[#B87333]/20">
                        {workshop.clinicalContext.framework.length > 40 
                          ? workshop.clinicalContext.framework.substring(0, 40) + '...'
                          : workshop.clinicalContext.framework}
                      </span>
                    </div>
                    
                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="p-3 rounded-xl bg-[#B87333]/15 backdrop-blur-sm border border-[#B87333]/20 group-hover:bg-[#B87333]/25 transition-colors">
                        <Icon className="h-6 w-6 text-[#D4AF37]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#E5C5A1] transition-colors duration-300">
                      {workshop.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {workshop.description}
                    </p>

                    {/* CTA */}
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#B87333]/15 to-[#D4AF37]/10 border border-[#B87333]/25 text-[#E5C5A1] text-sm font-medium hover:from-[#B87333]/25 hover:to-[#D4AF37]/20 hover:border-[#B87333]/40 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(184,115,51,0.1)]">
                      <Play className="h-4 w-4" />
                      Start Workshop
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="rounded-2xl bg-[#0f1419] border border-white/[0.06] p-8 md:p-10"
        >
          <div className="flex items-start gap-5">
            <div className="p-3 rounded-xl bg-[#B87333]/10 border border-[#B87333]/20 flex-shrink-0">
              <BookOpen className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">How It Works</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'AI Narration', desc: 'Professional voice guides you through each section' },
                  { label: 'Interactive Exercises', desc: 'Pause points for reflection and practice' },
                  { label: 'Customizable Pace', desc: 'Adjust playback speed and voice selection' },
                  { label: 'Downloadable Materials', desc: 'Take your learning offline with PDF worksheets' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B87333] mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default AIWorkshopStudio;
