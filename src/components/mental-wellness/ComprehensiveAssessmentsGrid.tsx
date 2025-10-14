import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Users, Star, Filter } from 'lucide-react';
import { mentalHealthAssessments, assessmentCategories, MentalHealthAssessment } from '@/data/mentalHealthAssessments';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

const ComprehensiveAssessmentsGrid: React.FC = () => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredAssessments = useMemo(() => {
    return mentalHealthAssessments.filter(assessment => {
      const matchesSearch = (
        (isSpanish ? assessment.titleSpanish : assessment.title)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (isSpanish ? assessment.descriptionSpanish : assessment.description)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (isSpanish ? assessment.categorySpanish : assessment.category)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

      const matchesCategory = selectedCategory === 'all' || 
        (isSpanish ? assessment.categorySpanish : assessment.category)
          .toLowerCase()
          .includes(selectedCategory);

      const matchesDifficulty = selectedDifficulty === 'all' || 
        assessment.difficulty.toLowerCase() === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, isSpanish]);

  const handleAssessmentClick = (assessment: MentalHealthAssessment) => {
    navigate(`/mental-wellness/assessment/${assessment.id}`, {
      state: { assessment }
    });
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
    title: isSpanish ? 'Evaluaciones de Salud Mental' : 'Mental Health Assessments',
    subtitle: isSpanish 
      ? 'Explora más de 50 evaluaciones profesionales para entender mejor tu bienestar mental'
      : 'Explore 50+ professional assessments to better understand your mental wellness',
    searchPlaceholder: isSpanish ? 'Buscar evaluaciones...' : 'Search assessments...',
    allCategories: isSpanish ? 'Todas las Categorías' : 'All Categories',
    allDifficulties: isSpanish ? 'Todas las Dificultades' : 'All Difficulties',
    beginner: isSpanish ? 'Principiante' : 'Beginner',
    intermediate: isSpanish ? 'Intermedio' : 'Intermediate',
    advanced: isSpanish ? 'Avanzado' : 'Advanced',
    takeAssessment: isSpanish ? 'Tomar Evaluación' : 'Take Assessment',
    noResults: isSpanish ? 'No se encontraron evaluaciones' : 'No assessments found',
    clearFilters: isSpanish ? 'Limpiar Filtros' : 'Clear Filters',
    showingResults: isSpanish ? 'Mostrando {count} evaluaciones' : 'Showing {count} assessments'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          {translations.title}
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          {translations.subtitle}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={translations.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-primary"
          >
            <option value="all">{translations.allCategories}</option>
            {assessmentCategories.slice(1).map(category => (
              <option key={category.id} value={category.id} className="text-gray-800">
                {isSpanish ? category.nameSpanish : category.name}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-primary"
          >
            <option value="all">{translations.allDifficulties}</option>
            <option value="beginner" className="text-gray-800">{translations.beginner}</option>
            <option value="intermediate" className="text-gray-800">{translations.intermediate}</option>
            <option value="advanced" className="text-gray-800">{translations.advanced}</option>
          </select>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Filter className="h-4 w-4 mr-2" />
            {translations.clearFilters}
          </Button>
        </div>

        {/* Results count */}
        <div className="mt-4 text-white/80">
          {translations.showingResults.replace('{count}', filteredAssessments.length.toString())}
        </div>
      </div>

      {/* Assessments Grid */}
      {filteredAssessments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-4">
                {/* Cover Image */}
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={assessment.coverImage}
                    alt={isSpanish ? assessment.titleSpanish : assessment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardTitle className="text-white text-lg line-clamp-2">
                  {isSpanish ? assessment.titleSpanish : assessment.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-white/80 text-sm line-clamp-3">
                  {isSpanish ? assessment.descriptionSpanish : assessment.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(assessment.difficulty)}>
                    {isSpanish ? assessment.difficultySpanish : assessment.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {isSpanish ? assessment.categorySpanish : assessment.category}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                    {assessment.questions.length} {isSpanish ? 'Preguntas' : 'Questions'}
                  </Badge>
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {isSpanish ? assessment.durationSpanish : assessment.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {isSpanish ? assessment.targetAudienceSpanish : assessment.targetAudience}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleAssessmentClick(assessment)}
                  className="w-full mt-4 bg-primary hover:bg-primary/80 text-white"
                >
                  <Star className="h-4 w-4 mr-2" />
                  {translations.takeAssessment}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-white/60 text-lg mb-4">
            {translations.noResults}
          </div>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {translations.clearFilters}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveAssessmentsGrid;