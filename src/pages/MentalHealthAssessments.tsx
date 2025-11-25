import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileText, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { celebrateAssessmentComplete } from '@/utils/animations';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

interface Assessment {
  type: 'phq9' | 'gad7' | 'pss10';
  title: string;
  description: string;
  questions: Question[];
  severityLevels: { min: number; max: number; label: string; color: string }[];
}

const MentalHealthAssessments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const assessments: Assessment[] = [
    {
      type: 'phq9',
      title: 'PHQ-9: Depression Screening',
      description: 'Patient Health Questionnaire - measures depression severity',
      questions: [
        { id: 'q1', text: 'Little interest or pleasure in doing things', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q2', text: 'Feeling down, depressed, or hopeless', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q4', text: 'Feeling tired or having little energy', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q5', text: 'Poor appetite or overeating', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q6', text: 'Feeling bad about yourself or that you are a failure', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q7', text: 'Trouble concentrating on things', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q8', text: 'Moving or speaking slowly, or being fidgety or restless', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q9', text: 'Thoughts that you would be better off dead or of hurting yourself', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]}
      ],
      severityLevels: [
        { min: 0, max: 4, label: 'Minimal', color: 'text-green-400' },
        { min: 5, max: 9, label: 'Mild', color: 'text-yellow-400' },
        { min: 10, max: 14, label: 'Moderate', color: 'text-orange-400' },
        { min: 15, max: 19, label: 'Moderately Severe', color: 'text-red-400' },
        { min: 20, max: 27, label: 'Severe', color: 'text-red-600' }
      ]
    },
    {
      type: 'gad7',
      title: 'GAD-7: Anxiety Screening',
      description: 'Generalized Anxiety Disorder scale - measures anxiety severity',
      questions: [
        { id: 'q1', text: 'Feeling nervous, anxious, or on edge', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q2', text: 'Not being able to stop or control worrying', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q3', text: 'Worrying too much about different things', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q4', text: 'Trouble relaxing', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q5', text: 'Being so restless that it is hard to sit still', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q6', text: 'Becoming easily annoyed or irritable', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]},
        { id: 'q7', text: 'Feeling afraid as if something awful might happen', options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]}
      ],
      severityLevels: [
        { min: 0, max: 4, label: 'Minimal', color: 'text-green-400' },
        { min: 5, max: 9, label: 'Mild', color: 'text-yellow-400' },
        { min: 10, max: 14, label: 'Moderate', color: 'text-orange-400' },
        { min: 15, max: 21, label: 'Severe', color: 'text-red-600' }
      ]
    }
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('assessment_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (data) setHistory(data);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleSelectAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setResponses({});
    setCurrentQuestion(0);
  };

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (selectedAssessment && currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitAssessment = async () => {
    if (!selectedAssessment) return;

    setLoading(true);
    const score = Object.values(responses).reduce((sum, val) => sum + val, 0);
    const severity = selectedAssessment.severityLevels.find(
      level => score >= level.min && score <= level.max
    )?.label || 'Unknown';

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('assessment_results').insert({
          user_id: user.id,
          assessment_type: selectedAssessment.type,
          score,
          severity,
          responses: { answers: responses }
        });

        celebrateAssessmentComplete();
        toast({
          title: "Assessment complete!",
          description: `Your ${selectedAssessment.title} score is ${score} (${severity}).`,
        });

        loadHistory();
        setSelectedAssessment(null);
        setResponses({});
        setCurrentQuestion(0);
      }
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Error",
        description: "Failed to save assessment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isCurrentQuestionAnswered = selectedAssessment && 
    responses[selectedAssessment.questions[currentQuestion].id] !== undefined;

  if (selectedAssessment) {
    const question = selectedAssessment.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedAssessment.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedAssessment(null)}
              className="text-bronze-400 hover:text-bronze-300 hover:bg-bronze-500/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-light text-white">
                <span className="bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
                  {selectedAssessment.title}
                </span>
              </h1>
              <Progress value={progress} className="mt-2 h-1" />
            </div>
          </div>

          <Card className="bg-gray-800/60 backdrop-blur-sm border-bronze-400/30">
            <CardHeader>
              <CardTitle className="text-white">
                Question {currentQuestion + 1} of {selectedAssessment.questions.length}
              </CardTitle>
              <CardDescription className="text-gray-400">{question.text}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={responses[question.id]?.toString()}
                onValueChange={(val) => handleResponse(question.id, parseInt(val))}
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-bronze-500/10 transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                    <Label
                      htmlFor={`${question.id}-${option.value}`}
                      className="flex-1 cursor-pointer text-gray-300"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex gap-4 mt-6">
                {currentQuestion > 0 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="flex-1 border-bronze-400/30 text-bronze-400 hover:bg-bronze-500/10"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentQuestionAnswered || loading}
                  className="flex-1 bg-gradient-to-r from-bronze-600 to-bronze-500 hover:from-bronze-700 hover:to-bronze-600 text-white"
                >
                  {currentQuestion === selectedAssessment.questions.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-bronze-400 hover:text-bronze-300 hover:bg-bronze-500/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-light text-white mb-2">
              <span className="bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
                Mental Health Assessments
              </span>
            </h1>
            <p className="text-gray-400">Track your mental health with standardized assessments</p>
          </div>
        </div>

        {/* Assessment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {assessments.map((assessment) => (
            <Card
              key={assessment.type}
              className="bg-gray-800/60 backdrop-blur-sm border-bronze-400/30 hover:border-bronze-400/60 transition-all cursor-pointer group"
              onClick={() => handleSelectAssessment(assessment)}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-bronze-500/20 border border-bronze-400/30 group-hover:bg-bronze-500/30 transition-colors">
                    <FileText className="h-6 w-6 text-bronze-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-bronze-300 transition-colors">
                      {assessment.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      {assessment.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{assessment.questions.length} questions</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <Card className="bg-gray-800/40 backdrop-blur-sm border-bronze-400/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-bronze-400" />
                <CardTitle className="text-bronze-300">Your Progress</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                Track changes in your mental health over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.slice(0, 5).map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-3 bg-gray-900/40 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{result.assessment_type.toUpperCase()}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(result.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-bronze-400">{result.score}</p>
                      <p className="text-sm text-gray-400">{result.severity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MentalHealthAssessments;
