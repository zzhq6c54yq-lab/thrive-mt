import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, Share2, TrendingUp, Lightbulb, Target, Heart, ExternalLink } from 'lucide-react';
import { MentalHealthAssessment, Subscale, OverallInterpretation } from '@/data/mentalHealthAssessments';
import { ProgressRing } from '@/components/goals/ProgressRing';
import { useNavigate } from 'react-router-dom';

interface AssessmentResultsOverviewProps {
  assessment: MentalHealthAssessment;
  score: number;
  answers: Record<string, any>;
  isSpanish: boolean;
  onShare?: () => void;
  onDownload?: () => void;
}

export const AssessmentResultsOverview: React.FC<AssessmentResultsOverviewProps> = ({
  assessment,
  score,
  answers,
  isSpanish,
  onShare,
  onDownload
}) => {
  const navigate = useNavigate();
  
  if (!assessment.resultOverview) {
    return null;
  }

  const { resultOverview } = assessment;
  
  // Find the overall interpretation for this score
  const interpretation = resultOverview.overallInterpretations.find(
    interp => score >= interp.scoreRange.min && score <= interp.scoreRange.max
  );

  // Calculate subscale scores if subscales exist
  const subscaleScores = resultOverview.subscales?.map(subscale => {
    const subscaleAnswers = subscale.questionIds.map(qId => answers[qId] || 0);
    const subscaleScore = subscaleAnswers.reduce((sum, ans) => sum + (typeof ans === 'number' ? ans : 0), 0);
    const percentage = (subscaleScore / subscale.maxScore) * 100;
    
    const level = subscale.interpretations.find(
      interp => subscaleScore >= interp.range[0] && subscaleScore <= interp.range[1]
    );
    
    return {
      ...subscale,
      score: subscaleScore,
      percentage,
      level: level || subscale.interpretations[0]
    };
  });

  // Detect patterns based on subscale scores
  const detectedPatterns = resultOverview.patternInsights?.filter(pattern => {
    // Pattern detection logic would go here
    // For now, return all patterns as examples
    return true;
  });

  const getSeverityColor = (percentage: number) => {
    if (percentage >= 75) return 'hsl(var(--chart-1))'; // Green
    if (percentage >= 50) return 'hsl(var(--chart-3))'; // Yellow
    if (percentage >= 25) return 'hsl(var(--chart-4))'; // Orange
    return 'hsl(var(--chart-5))'; // Red
  };

  const maxScore = assessment.scoring.ranges[assessment.scoring.ranges.length - 1].max;
  const scorePercentage = (score / maxScore) * 100;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-bronze/20 bg-gradient-to-br from-background to-bronze/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">
                {isSpanish ? resultOverview.titleSpanish : resultOverview.title}
              </CardTitle>
              <p className="text-muted-foreground">
                {isSpanish ? resultOverview.introductionSpanish : resultOverview.introduction}
              </p>
            </div>
            <div className="flex gap-2">
              {onDownload && (
                <Button variant="outline" size="sm" onClick={onDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  {isSpanish ? 'Descargar' : 'Download'}
                </Button>
              )}
              {onShare && (
                <Button variant="outline" size="sm" onClick={onShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {isSpanish ? 'Compartir' : 'Share'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overall Score Card */}
      <Card className="border-bronze/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-bronze" />
            {isSpanish ? 'Tu Puntuación General' : 'Your Overall Score'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Progress Ring */}
            <div className="flex-shrink-0">
              <ProgressRing
                progress={scorePercentage}
                size={160}
                strokeWidth={12}
                color={getSeverityColor(scorePercentage)}
                showPercentage={false}
              />
              <div className="text-center mt-4">
                <div className="text-4xl font-bold text-bronze">{score}</div>
                <div className="text-sm text-muted-foreground">
                  {isSpanish ? 'de' : 'out of'} {maxScore}
                </div>
              </div>
            </div>

            {/* Interpretation */}
            {interpretation && (
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-bronze mb-2">
                    {isSpanish ? interpretation.titleSpanish : interpretation.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {isSpanish ? interpretation.fullDescriptionSpanish : interpretation.fullDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subscale Breakdown */}
      {subscaleScores && subscaleScores.length > 0 && (
        <Card className="border-bronze/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-bronze" />
              {isSpanish ? 'Desglose Detallado' : 'Detailed Breakdown'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {subscaleScores.map((subscale, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {isSpanish ? subscale.nameSpanish : subscale.name}
                    </span>
                    <Badge 
                      variant="outline"
                      className="border-bronze/30 text-bronze"
                    >
                      {isSpanish ? subscale.level.levelSpanish : subscale.level.level}
                    </Badge>
                  </div>
                  <Progress value={subscale.percentage} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {isSpanish ? subscale.level.descriptionSpanish : subscale.level.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* What This Means For You */}
      {interpretation && (
        <Card className="border-bronze/20 bg-gradient-to-br from-bronze/5 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-bronze" />
              {isSpanish ? 'Lo Que Esto Significa Para Ti' : 'What This Means For You'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strengths */}
            {interpretation.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold text-bronze mb-3 flex items-center gap-2">
                  ✨ {isSpanish ? 'Tus Fortalezas' : 'Your Strengths'}
                </h4>
                <ul className="space-y-2">
                  {(isSpanish ? interpretation.strengthsSpanish : interpretation.strengths).map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Growth */}
            {interpretation.areasForGrowth.length > 0 && (
              <div>
                <h4 className="font-semibold text-bronze mb-3 flex items-center gap-2">
                  🌱 {isSpanish ? 'Áreas de Crecimiento' : 'Areas for Growth'}
                </h4>
                <ul className="space-y-2">
                  {(isSpanish ? interpretation.areasForGrowthSpanish : interpretation.areasForGrowth).map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span className="text-muted-foreground">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Pattern Insights */}
      {detectedPatterns && detectedPatterns.length > 0 && (
        <Card className="border-bronze/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-bronze" />
              {isSpanish ? 'Patrones Detectados' : 'Pattern Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detectedPatterns.map((pattern, index) => (
                <div key={index} className="p-4 bg-bronze/5 rounded-lg border border-bronze/20">
                  <p className="font-medium mb-2">
                    {isSpanish ? pattern.insightSpanish : pattern.insight}
                  </p>
                  <div className="space-y-1">
                    {(isSpanish ? pattern.recommendationsSpanish : pattern.recommendations).map((rec, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        • {rec}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Next Steps */}
      {interpretation && interpretation.actionSteps.length > 0 && (
        <Card className="border-bronze/20 bg-gradient-to-br from-bronze/10 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-bronze" />
              {isSpanish ? 'Próximos Pasos Recomendados' : 'Recommended Next Steps'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ol className="space-y-3">
                {(isSpanish ? interpretation.actionStepsSpanish : interpretation.actionSteps).map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Badge className="bg-bronze text-white min-w-[2rem] h-8 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span className="flex-1 pt-1">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Resources */}
              {interpretation.resources.length > 0 && (
                <div className="mt-6 pt-6 border-t border-bronze/20">
                  <h4 className="font-semibold mb-3">
                    {isSpanish ? 'Herramientas de ThriveMT Para Ti' : 'ThriveMT Tools For You'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation.resources.map((resource, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-bronze/30"
                        onClick={() => navigate(resource)}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        {resource.split('/').pop()?.replace(/-/g, ' ')}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Guidance */}
      {interpretation && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-2">
                  {isSpanish ? 'Orientación Profesional' : 'Professional Guidance'}
                </h4>
                <p className="text-red-800 mb-4">
                  {isSpanish ? interpretation.professionalGuidanceSpanish : interpretation.professionalGuidance}
                </p>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => navigate('/app/real-time-therapy')}
                >
                  {isSpanish ? 'Conectar con un Terapeuta' : 'Connect with a Therapist'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
