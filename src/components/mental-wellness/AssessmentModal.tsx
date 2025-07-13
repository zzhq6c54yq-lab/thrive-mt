import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Clock, Users, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { MentalHealthAssessment, AssessmentQuestion } from '@/data/mentalHealthAssessments';
import useTranslation from '@/hooks/useTranslation';

interface AssessmentModalProps {
  assessment: MentalHealthAssessment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ assessment, open, onOpenChange }) => {
  const { isSpanish } = useTranslation();
  const [currentStep, setCurrentStep] = useState<'info' | 'questions' | 'results'>('info');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  if (!assessment) return null;

  const resetModal = () => {
    setCurrentStep('info');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleStartAssessment = () => {
    setCurrentStep('questions');
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    // Simple scoring for demo - in real implementation, use assessment.scoring
    const totalQuestions = assessment.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    return Math.floor((answeredQuestions / totalQuestions) * 100);
  };

  const getScoreInterpretation = (score: number) => {
    // Simple interpretation for demo
    if (score >= 80) return { level: isSpanish ? 'Alto' : 'High', color: 'text-green-600' };
    if (score >= 50) return { level: isSpanish ? 'Moderado' : 'Moderate', color: 'text-yellow-600' };
    return { level: isSpanish ? 'Bajo' : 'Low', color: 'text-red-600' };
  };

  const translations = {
    startAssessment: isSpanish ? 'Comenzar Evaluación' : 'Start Assessment',
    nextQuestion: isSpanish ? 'Siguiente Pregunta' : 'Next Question',
    previousQuestion: isSpanish ? 'Pregunta Anterior' : 'Previous Question',
    completeAssessment: isSpanish ? 'Completar Evaluación' : 'Complete Assessment',
    yourResults: isSpanish ? 'Tus Resultados' : 'Your Results',
    score: isSpanish ? 'Puntuación' : 'Score',
    recommendations: isSpanish ? 'Recomendaciones' : 'Recommendations',
    disclaimer: isSpanish ? 'Descargo de Responsabilidad' : 'Disclaimer',
    professionalHelp: isSpanish ? 'Buscar Ayuda Profesional' : 'Seek Professional Help',
    retakeAssessment: isSpanish ? 'Repetir Evaluación' : 'Retake Assessment',
    close: isSpanish ? 'Cerrar' : 'Close',
    progress: isSpanish ? 'Progreso' : 'Progress',
    questionOf: isSpanish ? 'Pregunta {current} de {total}' : 'Question {current} of {total}'
  };

  const renderInfoStep = () => (
    <div className="space-y-6">
      {/* Assessment Image */}
      <div className="w-full h-48 rounded-lg overflow-hidden">
        <img
          src={assessment.coverImage}
          alt={isSpanish ? assessment.titleSpanish : assessment.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Assessment Details */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-100 text-blue-800">
            {isSpanish ? assessment.categorySpanish : assessment.category}
          </Badge>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {isSpanish ? assessment.durationSpanish : assessment.duration}
          </Badge>
          <Badge variant="outline">
            <Users className="h-3 w-3 mr-1" />
            {isSpanish ? assessment.targetAudienceSpanish : assessment.targetAudience}
          </Badge>
        </div>

        <p className="text-gray-600">
          {isSpanish ? assessment.descriptionSpanish : assessment.description}
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">
                {translations.disclaimer}
              </h4>
              <p className="text-sm text-amber-700">
                {isSpanish ? assessment.disclaimerSpanish : assessment.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleStartAssessment}
        className="w-full bg-black hover:bg-black/90 text-[#B87333] border border-[#B87333] font-semibold"
        size="lg"
      >
        <Star className="h-4 w-4 mr-2" />
        {translations.startAssessment}
      </Button>
    </div>
  );

  const renderQuestionsStep = () => {
    if (assessment.questions.length === 0) {
      // Demo question for assessments without full questions
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Demo Assessment</h3>
            <p className="text-gray-600 mb-4">
              This is a demo version. The full assessment would contain detailed questions.
            </p>
            <Button onClick={() => { setCurrentStep('results'); setShowResults(true); }}>
              View Sample Results
            </Button>
          </div>
        </div>
      );
    }

    const currentQuestion = assessment.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{translations.progress}</span>
            <span>
              {translations.questionOf
                .replace('{current}', (currentQuestionIndex + 1).toString())
                .replace('{total}', assessment.questions.length.toString())}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isSpanish ? currentQuestion.questionSpanish : currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.type === 'multiple-choice' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion.id] === index ? 'default' : 'outline'}
                    onClick={() => handleAnswer(currentQuestion.id, index)}
                    className="w-full justify-start"
                  >
                    {isSpanish ? (currentQuestion.optionsSpanish?.[index] || option) : option}
                  </Button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'scale' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{currentQuestion.scaleLabels?.[0] || currentQuestion.scaleMin}</span>
                  <span>{currentQuestion.scaleLabels?.[1] || currentQuestion.scaleMax}</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: (currentQuestion.scaleMax || 5) - (currentQuestion.scaleMin || 1) + 1 }, (_, i) => {
                    const value = (currentQuestion.scaleMin || 1) + i;
                    return (
                      <Button
                        key={value}
                        variant={answers[currentQuestion.id] === value ? 'default' : 'outline'}
                        onClick={() => handleAnswer(currentQuestion.id, value)}
                        className="flex-1"
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {translations.previousQuestion}
          </Button>

          <Button
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion.id]}
          >
            {currentQuestionIndex === assessment.questions.length - 1 
              ? translations.completeAssessment 
              : translations.nextQuestion
            }
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderResultsStep = () => {
    const score = calculateScore();
    const interpretation = getScoreInterpretation(score);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">{translations.yourResults}</h3>
        </div>

        {/* Score Display */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-bold mb-2 text-primary">{score}%</div>
            <div className={`text-lg font-medium ${interpretation.color}`}>
              {interpretation.level}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>{translations.recommendations}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(isSpanish ? assessment.recommendationsSpanish : assessment.recommendations).map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Professional Referral */}
        {assessment.professionalReferral && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">
                    {translations.professionalHelp}
                  </h4>
                  <p className="text-sm text-amber-700">
                    Based on your responses, we recommend consulting with a mental health professional.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={resetModal}
            className="flex-1"
          >
            {translations.retakeAssessment}
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            {translations.close}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { onOpenChange(open); if (!open) resetModal(); }}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isSpanish ? assessment.titleSpanish : assessment.title}
          </DialogTitle>
          {currentStep === 'info' && (
            <DialogDescription>
              {isSpanish ? assessment.descriptionSpanish : assessment.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4">
          {currentStep === 'info' && renderInfoStep()}
          {currentStep === 'questions' && renderQuestionsStep()}
          {currentStep === 'results' && renderResultsStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentModal;