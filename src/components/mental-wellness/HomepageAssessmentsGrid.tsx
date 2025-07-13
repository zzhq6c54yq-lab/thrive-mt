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

  // Get the first 6 assessments for homepage display with title-specific cover images
  const featuredAssessments = mentalHealthAssessments.slice(0, 6).map((assessment, index) => {
    const titleSpecificImages = {
      'gad-7': 'https://images.unsplash.com/photo-1584004632229-e8b8e6d3e0ae?w=800&h=600&fit=crop', // anxiety - person with hands on face
      'phq-9': 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&h=600&fit=crop', // depression - person looking out window
      'perceived-stress-scale': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', // stress - overwhelmed workspace
      'pcl-5': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // PTSD - stormy sky/trauma imagery
      'mdq': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // bipolar - emotional balance/ups downs
      'oci-r': 'https://images.unsplash.com/photo-1563356219-d29c35a3e0d9?w=800&h=600&fit=crop'  // OCD - organized/repetitive patterns
    };
    
    return {
      ...assessment,
      coverImage: titleSpecificImages[assessment.id] || assessment.coverImage
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
    start: isSpanish ? 'EMPEZAR' : 'START',
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
              {/* More Visible Title */}
              <h3 className="text-white text-base font-bold line-clamp-2 mb-3 group-hover:text-[#E5C5A1] transition-colors duration-300 min-h-[2.5rem] leading-tight drop-shadow-lg">
                {isSpanish ? assessment.titleSpanish : assessment.title}
              </h3>

              {/* START Button */}
              <Button
                className="w-full bg-[#B87333] hover:bg-[#E5C5A1] text-white hover:text-black font-bold text-sm py-2 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssessmentClick(assessment);
                }}
              >
                {translations.start}
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