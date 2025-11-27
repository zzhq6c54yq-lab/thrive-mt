import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Play, Sparkles } from 'lucide-react';
import { workshopData } from '@/data/workshopData';
import { useToast } from '@/hooks/use-toast';

interface WorkshopsCarouselSectionProps {
  trackClick?: (sectionId: string, metadata?: Record<string, any>) => void;
}

const WorkshopsCarouselSection: React.FC<WorkshopsCarouselSectionProps> = ({ trackClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    trackClick?.('workshops-carousel', { workshopId, workshopTitle });
    navigate(`/ai-workshop-studio?selected=${workshopId}`);
  };

  return (
    <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-md opacity-50" />
            <Sparkles className="h-6 w-6 text-[#D4AF37] relative" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
              AI Workshops
            </h2>
            <p className="text-sm text-muted-foreground">
              Evidence-Based Growth Programs
            </p>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {workshopData.map((workshop, index) => {
              const Icon = workshop.icon;
              return (
                <CarouselItem key={workshop.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="group cursor-pointer overflow-hidden border-gray-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 h-[400px] flex flex-col"
                      onClick={() => handleWorkshopClick(workshop.id, workshop.title)}
                    >
                      {/* Cover Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={workshop.coverImage} 
                          alt={workshop.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex gap-2 mb-2 flex-wrap">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                            {workshop.duration}
                          </Badge>
                          <Badge variant="secondary" className="bg-[#D4AF37]/20 text-[#D4AF37] backdrop-blur-sm text-xs">
                            {workshop.clinicalContext.framework}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#D4AF37] transition-colors">
                          {workshop.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                          {workshop.description}
                        </p>

                        {/* Button */}
                        <Button
                          variant="outline"
                          className="w-full gap-2 border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 group-hover:scale-105 transition-all"
                        >
                          <Play className="h-4 w-4" />
                          Start Workshop
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </Card>
  );
};

export default WorkshopsCarouselSection;
