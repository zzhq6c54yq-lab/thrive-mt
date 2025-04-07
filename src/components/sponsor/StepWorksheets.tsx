
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, FileText, CheckCircle } from "lucide-react";

const stepData = [
  {
    number: 1,
    title: "Powerlessness",
    description: "We admitted we were powerless over our addiction, that our lives had become unmanageable.",
    questions: [
      "How has my addiction affected my life?",
      "In what ways has my life become unmanageable?",
      "What specific instances demonstrate my powerlessness over my addiction?",
      "How do I feel when I try to control my addiction and fail?",
      "What consequences have I faced due to my addiction?"
    ],
    prompt: "Reflect on how your addiction has impacted different areas of your life (relationships, work, health, finances, etc.) and the patterns that demonstrate powerlessness."
  },
  {
    number: 2,
    title: "Hope",
    description: "We came to believe that a Power greater than ourselves could restore us to sanity.",
    questions: [
      "What does a 'Power greater than myself' mean to me?",
      "How has trying to control everything worked for me so far?",
      "What forms of insanity or irrational behavior have I exhibited due to my addiction?",
      "What evidence have I seen of recovery in others?",
      "What would restoration to sanity look like in my life?"
    ],
    prompt: "Consider what sources of strength beyond yourself might help you recover, whether spiritual, community-based, or otherwise."
  },
  {
    number: 3,
    title: "Surrender",
    description: "We made a decision to turn our will and our lives over to the care of God as we understood Him.",
    questions: [
      "What does surrendering mean to me?",
      "What am I afraid might happen if I surrender control?",
      "How do I understand the concept of a Higher Power?",
      "What would it look like to turn my will and life over to something greater?",
      "What specific areas of my life am I having trouble surrendering?"
    ],
    prompt: "Explore what it means to let go of control and trust in something beyond yourself for guidance and support."
  },
  {
    number: 4,
    title: "Inventory",
    description: "We made a searching and fearless moral inventory of ourselves.",
    questions: [
      "What resentments am I holding onto and why?",
      "What fears drive my behavior?",
      "What harms have I caused to others?",
      "What character defects do I recognize in myself?",
      "What patterns of behavior have contributed to my addiction?"
    ],
    prompt: "Create an honest list of your strengths, weaknesses, resentments, and fears without judgment."
  },
  {
    number: 5,
    title: "Confession",
    description: "We admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
    questions: [
      "What am I most ashamed to admit about my behavior?",
      "What wrongs have I kept secret from others?",
      "How has keeping secrets affected my recovery?",
      "What fears do I have about sharing my inventory with another person?",
      "Who would be a trustworthy person to hear my fifth step?"
    ],
    prompt: "Consider what it would mean to share your inventory with someone else. What would be hardest to admit?"
  },
  {
    number: 6,
    title: "Readiness",
    description: "We were entirely ready to have God remove all these defects of character.",
    questions: [
      "What character defects am I holding onto and why?",
      "How have my character defects served me in the past?",
      "What would my life look like without these defects?",
      "Which defects am I ready to have removed?",
      "Which defects am I still struggling to let go of?"
    ],
    prompt: "Reflect on your willingness to change and let go of harmful patterns."
  },
  {
    number: 7,
    title: "Humility",
    description: "We humbly asked Him to remove our shortcomings.",
    questions: [
      "What does humility mean to me?",
      "How can I practice humility in my daily life?",
      "What shortcomings would I like removed first and why?",
      "How might I be different if my character defects were removed?",
      "What actions can I take to support this process?"
    ],
    prompt: "Consider what it means to humbly ask for help in changing aspects of yourself that you cannot change alone."
  },
  {
    number: 8,
    title: "Willingness",
    description: "We made a list of all persons we had harmed, and became willing to make amends to them all.",
    questions: [
      "Who have I harmed through my addiction and behaviors?",
      "What specific harms did I cause to each person?",
      "Are there people I'm reluctant to include on my list and why?",
      "What fears do I have about making amends?",
      "How can I become willing to make amends to those I've harmed?"
    ],
    prompt: "Create a comprehensive list of everyone you've harmed, being honest about your role in each situation."
  },
  {
    number: 9,
    title: "Amends",
    description: "We made direct amends to such people wherever possible, except when to do so would injure them or others.",
    questions: [
      "What amends am I prepared to make now?",
      "How might making certain amends cause more harm?",
      "What is my plan for approaching each person on my list?",
      "What will I do if my amends aren't accepted?",
      "How can I make living amends in situations where direct amends aren't possible?"
    ],
    prompt: "Plan how you will make amends to each person on your list, considering timing and approach."
  },
  {
    number: 10,
    title: "Maintenance",
    description: "We continued to take personal inventory and when we were wrong promptly admitted it.",
    questions: [
      "What daily practice can I establish to reflect on my behavior?",
      "What triggers or warning signs should I watch for?",
      "How can I become more aware of when I'm wrong?",
      "What makes it difficult for me to admit when I'm wrong?",
      "How can I make prompt amends part of my daily life?"
    ],
    prompt: "Consider how you can incorporate regular self-reflection and accountability into your daily routine."
  },
  {
    number: 11,
    title: "Connection",
    description: "We sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.",
    questions: [
      "What practices help me feel connected to my higher power?",
      "What does meditation or prayer look like for me?",
      "How can I distinguish between self-will and spiritual guidance?",
      "What barriers do I face in seeking spiritual connection?",
      "How might I develop a daily spiritual practice?"
    ],
    prompt: "Explore practices that help you feel connected to something larger than yourself, whatever that means to you."
  },
  {
    number: 12,
    title: "Service",
    description: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to addicts, and to practice these principles in all our affairs.",
    questions: [
      "How has working the steps changed me?",
      "What does 'spiritual awakening' mean to me?",
      "How can I carry the message to others who are suffering?",
      "What service opportunities are available to me?",
      "How can I apply these principles to all areas of my life?"
    ],
    prompt: "Reflect on how you can share your experience, strength, and hope with others while continuing your own growth."
  }
];

interface WorksheetProgress {
  [key: number]: {
    responses: string[];
    completed: boolean;
  }
}

const StepWorksheets: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [responses, setResponses] = useState<WorksheetProgress>({});
  const { toast } = useToast();
  
  const handleResponseChange = (stepNumber: number, questionIndex: number, value: string) => {
    setResponses(prev => {
      const stepResponses = prev[stepNumber]?.responses || Array(stepData[stepNumber-1].questions.length).fill("");
      const updatedResponses = [...stepResponses];
      updatedResponses[questionIndex] = value;
      
      return {
        ...prev,
        [stepNumber]: {
          responses: updatedResponses,
          completed: prev[stepNumber]?.completed || false
        }
      };
    });
  };
  
  const handleSaveProgress = (stepNumber: number) => {
    setResponses(prev => ({
      ...prev,
      [stepNumber]: {
        responses: prev[stepNumber]?.responses || [],
        completed: true
      }
    }));
    
    toast({
      title: `Step ${stepNumber} Progress Saved`,
      description: "Your responses have been saved. You can return to them anytime.",
    });
  };
  
  const getStepProgress = (stepNumber: number) => {
    const stepResponses = responses[stepNumber]?.responses || [];
    const totalQuestions = stepData[stepNumber-1].questions.length;
    const answeredQuestions = stepResponses.filter(r => r && r.trim() !== "").length;
    
    if (answeredQuestions === 0) return 0;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };
  
  const isStepCompleted = (stepNumber: number) => {
    return responses[stepNumber]?.completed || false;
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">12 Steps Worksheets</h2>
        <p className="text-gray-600 mb-6">
          These worksheets are designed to help you work through each of the 12 Steps at your own pace. 
          Your answers are private and saved locally for your reference.
        </p>
      </div>
      
      <Tabs value={`step-${activeStep}`} onValueChange={(value) => setActiveStep(Number(value.replace("step-", "")))} className="w-full">
        <TabsList className="grid grid-cols-6 md:grid-cols-12 mb-6">
          {stepData.map(step => (
            <TabsTrigger 
              key={`step-${step.number}`} 
              value={`step-${step.number}`}
              className="relative"
            >
              {step.number}
              {isStepCompleted(step.number) && (
                <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {stepData.map(step => (
          <TabsContent key={`step-content-${step.number}`} value={`step-${step.number}`}>
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Step {step.number}: {step.title}</CardTitle>
                    <CardDescription className="text-purple-100 mt-1">
                      {step.description}
                    </CardDescription>
                  </div>
                  {getStepProgress(step.number) > 0 && (
                    <div className="bg-white/20 rounded-full px-2 py-1 text-xs font-medium">
                      {getStepProgress(step.number)}% Complete
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-6 space-y-6">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-md">
                  <p className="text-purple-800">
                    <span className="font-semibold">Reflection Prompt:</span> {step.prompt}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {step.questions.map((question, index) => (
                    <div key={`question-${step.number}-${index}`} className="space-y-2">
                      <label className="font-medium block">{question}</label>
                      <Textarea
                        value={responses[step.number]?.responses?.[index] || ""}
                        onChange={(e) => handleResponseChange(step.number, index, e.target.value)}
                        placeholder="Write your response here..."
                        rows={4}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-4 border-t">
                <div className="text-sm text-gray-500 flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Your responses are saved locally
                </div>
                <Button 
                  onClick={() => handleSaveProgress(step.number)}
                  className="bg-purple-700 hover:bg-purple-800"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StepWorksheets;
