import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { mentalHealthAssessments, MentalHealthAssessment } from '@/data/mentalHealthAssessments';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import AssessmentModal from './AssessmentModal';

const HomepageAssessmentsGrid: React.FC = () => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<MentalHealthAssessment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Get the first 6 assessments for homepage display with updated cover images
  const featuredAssessments = mentalHealthAssessments.slice(0, 6).map((assessment, index) => {
    const coverImages = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop', // woman on bed with laptop
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', // woman with laptop
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop', // blue starry night
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop', // foggy mountain
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop', // mountain view
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'  // living room
    ];
    
    return {
      ...assessment,
      coverImage: coverImages[index] || assessment.coverImage
    };
  });

  const handleAssessmentClick = (assessment: MentalHealthAssessment) => {
    setSelectedAssessment(assessment);
    setModalOpen(true);
  };

  const handleViewAllAssessments = () => {
    navigate('/mental-wellness-assessments');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'principiante':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
      case 'intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
      case 'avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const translations = {
    title: isSpanish ? 'Evaluaciones de Salud Mental' : 'Mental Health Quiz and Assessments',
    takeAssessment: isSpanish ? 'Comenzar Evaluación' : 'Start Assessment',
    takeQuiz: isSpanish ? 'Comenzar Quiz' : 'Start Quiz',
    viewAllAssessments: isSpanish ? 'Ver Todas las Evaluaciones' : 'View All Assessments'
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Assessments Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1] mb-4">
          {translations.title}
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          {isSpanish ? "Descubre cómo te sientes y mejora tu bienestar mental" : "Discover how you feel and improve your mental wellness"}
        </p>
      </div>

      {/* Compact Assessments Grid - 3x2 Layout */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl mx-auto">
        {featuredAssessments.map((assessment, index) => (
          <Card 
            key={assessment.id} 
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-[#B87333]/30 hover:border-[#B87333]/50 hover:from-white/15 hover:to-white/10 transition-all duration-300 cursor-pointer group transform hover:scale-102 hover:shadow-lg hover:shadow-[#B87333]/10"
            onClick={() => handleAssessmentClick(assessment)}
          >
            {/* Compact Cover Image */}
            <div className="w-full h-32 rounded-t-lg overflow-hidden relative">
              <img
                src={assessment.coverImage}
                alt={isSpanish ? assessment.titleSpanish : assessment.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <CardContent className="p-3">
              {/* Compact Title */}
              <h3 className="text-white text-sm font-semibold line-clamp-2 mb-3 group-hover:text-[#E5C5A1] transition-colors duration-300 min-h-[2.5rem]">
                {isSpanish ? assessment.titleSpanish : assessment.title}
              </h3>

              {/* Start Assessment Button */}
              <Button
                className="w-full bg-[#B87333] hover:bg-[#E5C5A1] text-white hover:text-black font-medium text-xs py-2 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssessmentClick(assessment);
                }}
              >
                {assessment.category.toLowerCase().includes('quiz') 
                  ? translations.takeQuiz 
                  : translations.takeAssessment
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced View All Assessments Button */}
      <div className="text-center pt-8">
        <Button
          onClick={handleViewAllAssessments}
          variant="outline"
          className="bg-gradient-to-r from-[#B87333]/20 to-[#E5C5A1]/20 border-[#B87333] text-[#E5C5A1] hover:bg-gradient-to-r hover:from-[#B87333]/30 hover:to-[#E5C5A1]/30 hover:border-[#E5C5A1] px-8 py-3 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          size="lg"
        >
          {translations.viewAllAssessments}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Assessment Modal */}
      <AssessmentModal
        assessment={selectedAssessment}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default HomepageAssessmentsGrid;