
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: number;
  timeEstimate: string;
  completionRate?: number;
  coverImage: string;
  color: string;
  assessmentContent?: React.ReactNode;
}

const QuizzesSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  const quizzes: Quiz[] = [
    {
      id: "anxiety-assessment",
      title: "Anxiety Assessment",
      description: "Understand your anxiety levels and get personalized coping strategies.",
      category: "mental-health",
      questions: 12,
      timeEstimate: "5-7 min",
      coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-600 to-violet-400",
      assessmentContent: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Generalized Anxiety Assessment</h3>
          <p className="text-sm text-gray-400">
            For each item, please indicate how often you've been bothered by the following over the past two weeks.
          </p>
          
          {[
            "Feeling nervous, anxious, or on edge",
            "Not being able to stop or control worrying",
            "Worrying too much about different things",
            "Trouble relaxing",
            "Being so restless that it's hard to sit still",
            "Becoming easily annoyed or irritable",
            "Feeling afraid, as if something awful might happen"
          ].map((question, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium text-sm">{question}</p>
              <div className="flex justify-between gap-2">
                {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, i) => (
                  <button 
                    key={i} 
                    className={`
                      py-2 px-3 text-xs rounded-md flex-1 transition-all
                      bg-purple-500/10 hover:bg-purple-500/30 border border-purple-500/20
                      text-white font-medium
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-400 text-white">
              Submit Assessment
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "stress-check",
      title: "Stress Check",
      description: "Quickly assess your stress levels and identify main stressors.",
      category: "wellbeing",
      questions: 8,
      timeEstimate: "3-5 min",
      completionRate: 25,
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-sky-400",
      assessmentContent: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Perceived Stress Assessment</h3>
          <p className="text-sm text-gray-400">
            In the last month, how often have you felt the following?
          </p>
          
          {[
            "Been upset because of something that happened unexpectedly",
            "Felt unable to control the important things in your life",
            "Felt nervous and stressed",
            "Felt confident about your ability to handle personal problems",
            "Felt that things were going your way",
            "Found that you could not cope with all the things you had to do",
            "Been able to control irritations in your life",
            "Felt on top of things"
          ].map((question, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium text-sm">{question}</p>
              <div className="flex justify-between gap-2">
                {["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"].map((option, i) => (
                  <button 
                    key={i} 
                    className={`
                      py-2 px-1 text-xs rounded-md flex-1 transition-all
                      bg-blue-500/10 hover:bg-blue-500/30 border border-blue-500/20
                      text-white font-medium
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-400 text-white">
              Submit Assessment
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "sleep-quality",
      title: "Sleep Quality Index",
      description: "Evaluate sleep patterns and get recommendations for improvement.",
      category: "wellbeing",
      questions: 10,
      timeEstimate: "4-6 min",
      coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      color: "from-indigo-600 to-indigo-400",
      assessmentContent: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Sleep Quality Assessment</h3>
          <p className="text-sm text-gray-400">
            The following questions relate to your usual sleep habits during the past month only.
          </p>
          
          <div className="space-y-2">
            <p className="font-medium text-sm">During the past month, what time have you usually gone to bed at night?</p>
            <input
              type="time"
              className="w-full rounded-md bg-indigo-500/10 border border-indigo-500/20 text-white px-4 py-2"
            />
          </div>
          
          <div className="space-y-2">
            <p className="font-medium text-sm">During the past month, how long (in minutes) has it usually taken you to fall asleep each night?</p>
            <input
              type="number"
              placeholder="Minutes"
              className="w-full rounded-md bg-indigo-500/10 border border-indigo-500/20 text-white px-4 py-2"
            />
          </div>
          
          {[
            "During the past month, how would you rate your sleep quality overall?",
            "During the past month, how often have you had trouble sleeping because you cannot get to sleep within 30 minutes?",
            "During the past month, how often have you had trouble sleeping because you wake up in the middle of the night or early morning?",
            "During the past month, how often have you had trouble sleeping because you had bad dreams?"
          ].map((question, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium text-sm">{question}</p>
              <div className="flex justify-between gap-2">
                {["Not during the past month", "Less than once a week", "Once or twice a week", "Three or more times a week"].map((option, i) => (
                  <button 
                    key={i} 
                    className={`
                      py-2 px-2 text-xs rounded-md flex-1 transition-all
                      bg-indigo-500/10 hover:bg-indigo-500/30 border border-indigo-500/20
                      text-white font-medium
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
              Submit Assessment
            </Button>
          </div>
        </div>
      )
    }
  ];

  const handleQuizClick = (quiz: Quiz) => {
    toast({
      title: `Starting ${quiz.title}`,
      description: "Loading your assessment...",
      duration: 1500,
    });
    
    // Open assessment in modal instead of navigating
    setActiveQuiz(quiz);
    setShowAssessmentModal(true);
  };

  const handleViewMoreClick = () => {
    toast({
      title: "Loading Assessments",
      description: "Taking you to the assessment library",
      duration: 1500,
    });
    
    navigate("/mental-wellness", { 
      state: { 
        activeTab: "assessments",
        preventTutorial: true,
        directToAssessment: true
      } 
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            className="relative cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleQuizClick(quiz)}
          >
            <Card className="overflow-hidden border border-gray-200 h-full bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-all group">
              <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b ${quiz.color}"></div>
              <div className="h-36 relative overflow-hidden">
                <img 
                  src={quiz.coverImage} 
                  alt={quiz.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#8B5CF6] transition-colors text-lg">
                    {quiz.title}
                  </h3>
                </div>
                
                <Button
                  size="sm"
                  className={`w-full mt-2 bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuizClick(quiz);
                  }}
                >
                  {quiz.completionRate ? "Continue Assessment" : "Start Assessment"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center pt-2">
        <Button 
          variant="outline"
          onClick={handleViewMoreClick}
          className="border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/5"
        >
          View More Assessments
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Assessment Modal */}
      <Dialog open={showAssessmentModal} onOpenChange={setShowAssessmentModal}>
        <DialogContent className="bg-[#1a1a2e] border-[#3a3a4c] text-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setShowAssessmentModal(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <DialogTitle className={`text-xl bg-gradient-to-r ${activeQuiz?.color} bg-clip-text text-transparent`}>
              {activeQuiz?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {activeQuiz?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {activeQuiz?.assessmentContent}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizzesSection;
