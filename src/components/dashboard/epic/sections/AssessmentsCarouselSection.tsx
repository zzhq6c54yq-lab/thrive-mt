import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Brain } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { mentalHealthAssessments } from "@/data/mentalHealthAssessments";
import { expandedAssessments } from "@/data/comprehensiveAssessmentsList";

interface AssessmentsCarouselSectionProps {
  trackClick?: (sectionId: string, metadata?: Record<string, any>) => void;
}

const AssessmentsCarouselSection: React.FC<AssessmentsCarouselSectionProps> = ({ trackClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  // Combine all assessments
  const allAssessments = [...mentalHealthAssessments, ...expandedAssessments];

  const handleAssessmentClick = (assessment: typeof allAssessments[0]) => {
    trackClick?.("assessments-carousel", { 
      assessmentId: assessment.id, 
      assessmentTitle: assessment.title 
    });
    
    toast({
      title: isSpanish ? "Abriendo evaluación..." : "Opening assessment...",
      description: isSpanish ? assessment.titleSpanish : assessment.title,
      duration: 1500,
    });
    
    navigate(`/app/mental-wellness-assessments?selected=${assessment.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#B87333] to-[#D4AF37]">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#B87333] via-[#D4AF37] to-[#B87333] bg-clip-text text-transparent">
              {isSpanish ? "Cuestionarios y Evaluaciones de Salud Mental" : "Mental Health Quizzes & Assessments"}
            </h2>
          </div>
          <p className="text-sm text-gray-400 ml-14">
            {isSpanish 
              ? "Conócete a ti mismo — descubre ideas que importan"
              : "Get to know yourself — discover insights that matter"}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {allAssessments.map((assessment, index) => (
              <CarouselItem key={assessment.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <Card 
                    className="group cursor-pointer overflow-hidden border-gray-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 h-[400px] relative"
                    onClick={() => handleAssessmentClick(assessment)}
                  >
                    {/* Cover Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={assessment.coverImage} 
                        alt={isSpanish ? assessment.titleSpanish : assessment.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                      {/* Bronze Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#B87333]/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                          {isSpanish ? assessment.durationSpanish : assessment.duration}
                        </span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                          {assessment.questions.length} {isSpanish ? "preguntas" : "questions"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 drop-shadow-lg line-clamp-2">
                        {isSpanish ? assessment.titleSpanish : assessment.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-4 line-clamp-2 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {isSpanish ? assessment.descriptionSpanish : assessment.description}
                      </p>
                      <Button 
                        size="sm"
                        className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        {isSpanish ? "Tomar Evaluación" : "Take Assessment"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious className="static translate-y-0 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#D4AF37]/50">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <span className="text-sm text-gray-400">
              {isSpanish ? "Desliza para ver más" : "Swipe to see more"}
            </span>
            <CarouselNext className="static translate-y-0 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#D4AF37]/50">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </Card>
    </motion.div>
  );
};

export default AssessmentsCarouselSection;
