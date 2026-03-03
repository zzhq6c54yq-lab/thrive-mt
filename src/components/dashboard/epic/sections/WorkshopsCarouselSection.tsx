import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Play, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { workshopData } from '@/data/workshopData';

interface WorkshopsCarouselSectionProps {
  trackClick?: (sectionId: string, metadata?: Record<string, any>) => void;
}

const WorkshopsCarouselSection: React.FC<WorkshopsCarouselSectionProps> = ({ trackClick }) => {
  const navigate = useNavigate();

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    trackClick?.('workshops-carousel', { workshopId, workshopTitle });
    navigate(`/app/ai-workshop-studio?selected=${workshopId}`);
  };

  return (
    <Card className="bg-[#0f1419] border-white/[0.06] overflow-hidden">
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#B87333]/10 border border-[#B87333]/20">
            <BookOpen className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#E5C5A1] to-[#D4AF37] bg-clip-text text-transparent">
              AI Workshops
            </h2>
            <p className="text-xs text-muted-foreground">
              Evidence-Based Growth Programs
            </p>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {workshopData.map((workshop, index) => {
              const Icon = workshop.icon;
              return (
                <CarouselItem key={workshop.id} className="pl-3 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <div
                      className="group cursor-pointer rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-[#B87333]/30 transition-all duration-400 h-[360px] flex flex-col"
                      onClick={() => handleWorkshopClick(workshop.id, workshop.title)}
                    >
                      {/* Cover Image */}
                      <div className="relative h-40 overflow-hidden flex-shrink-0">
                        <img 
                          src={workshop.coverImage} 
                          alt={workshop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/80 border border-white/10">
                            <Clock className="h-2.5 w-2.5" />
                            {workshop.duration}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <div className="p-2 rounded-lg bg-[#B87333]/15 backdrop-blur-sm border border-[#B87333]/20">
                            <Icon className="h-4 w-4 text-[#D4AF37]" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-[#E5C5A1] transition-colors line-clamp-1">
                          {workshop.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                          {workshop.description}
                        </p>
                        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#B87333]/10 border border-[#B87333]/20 text-[#E5C5A1] text-xs font-medium hover:bg-[#B87333]/20 transition-all">
                          <Play className="h-3 w-3" />
                          Start Workshop
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-[#0f1419] border-white/[0.1] hover:bg-white/[0.06]" />
          <CarouselNext className="right-2 bg-[#0f1419] border-white/[0.1] hover:bg-white/[0.06]" />
        </Carousel>
      </div>
    </Card>
  );
};

export default WorkshopsCarouselSection;
