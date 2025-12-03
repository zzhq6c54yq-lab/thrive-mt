import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { mentalHealthAssessments, MentalHealthAssessment } from '@/data/mentalHealthAssessments';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import AssessmentModal from './AssessmentModal';

// Import generated assessment cover images
import gad7Cover from '@/assets/gad-7-cover.jpg';
import phq9Cover from '@/assets/phq-9-cover.jpg';
import stressScaleCover from '@/assets/stress-scale-cover.jpg';
import pcl5Cover from '@/assets/pcl-5-cover.jpg';
import mdqCover from '@/assets/mdq-cover.jpg';
import ociRCover from '@/assets/oci-r-cover.jpg';

const HomepageAssessmentsGrid: React.FC = () => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<MentalHealthAssessment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Get the first 6 assessments for homepage display with title-specific cover images
  const featuredAssessments = mentalHealthAssessments.slice(0, 6).map((assessment, index) => {
    const titleSpecificImages = {
      'gad-7': gad7Cover,
      'phq-9': phq9Cover,
      'perceived-stress-scale': stressScaleCover,
      'pcl-5': pcl5Cover,
      'mdq': mdqCover,
      'oci-r': ociRCover
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
    navigate('/app/mental-wellness-assessments');
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
    <div className="space-y-12">
      {/* Clean Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {translations.title}
        </h2>
        <p className="text-white/70 text-xl max-w-3xl mx-auto">
          {isSpanish ? "Descubre cómo te sientes y mejora tu bienestar mental" : "Discover how you feel and improve your mental wellness"}
        </p>
      </div>

      {/* Open Grid Layout - No Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuredAssessments.map((assessment, index) => (
          <div 
            key={assessment.id} 
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => handleAssessmentClick(assessment)}
          >
            {/* Clean Image */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src={assessment.coverImage}
                alt={isSpanish ? assessment.titleSpanish : assessment.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Clean Title & Button */}
            <div className="text-center space-y-4">
              <h3 className="text-white text-xl font-bold group-hover:text-[#E5C5A1] transition-colors duration-300">
                {isSpanish ? assessment.titleSpanish : assessment.title}
              </h3>

              <Button
                className="bg-[#B87333] hover:bg-[#E5C5A1] text-white hover:text-black font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssessmentClick(assessment);
                }}
              >
                {translations.start}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Clean View All Button */}
      <div className="text-center pt-12">
        <Button
          onClick={handleViewAllAssessments}
          variant="outline"
          className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
          size="lg"
        >
          {translations.viewAllAssessments}
          <ArrowRight className="h-5 w-5 ml-3" />
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