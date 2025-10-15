import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import PromptSection from "./PromptSection";
import ResourceDownload from "./ResourceDownload";

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  description: string;
  prompts: string[];
  resources: { title: string; type: string; url?: string }[];
}

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: (lessonId: number, responses: Record<string, string>) => void;
  moduleType: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  onComplete,
  moduleType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (promptIndex: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [`prompt_${promptIndex}`]: value,
    }));
  };

  const handleMarkComplete = () => {
    onComplete(lesson.id, responses);
    setIsExpanded(false);
  };

  const allPromptsAnswered = lesson.prompts.every(
    (_, idx) => responses[`prompt_${idx}`]?.trim().length > 0
  );

  return (
    <Card className="bg-[#1A1811]/60 border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
            ) : (
              <Circle className="h-6 w-6 text-[#D4AF37]/50 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#F5DEB3]">
                {lesson.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-[#D4AF37]/70" />
                <span className="text-sm text-[#F5DEB3]/70">{lesson.duration}</span>
              </div>
              <p className="text-sm text-[#F5DEB3]/80 mt-2">{lesson.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#D4AF37] hover:text-[#F5DEB3]"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6 pt-0">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-[#D4AF37]">
              Guided Reflection Prompts
            </h4>
            {lesson.prompts.map((prompt, idx) => (
              <PromptSection
                key={idx}
                prompt={prompt}
                value={responses[`prompt_${idx}`] || ""}
                onChange={(value) => handleResponseChange(idx, value)}
                promptNumber={idx + 1}
              />
            ))}
          </div>

          {lesson.resources.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-[#D4AF37]">
                Downloadable Resources
              </h4>
              {lesson.resources.map((resource, idx) => (
                <ResourceDownload key={idx} resource={resource} />
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleMarkComplete}
              disabled={!allPromptsAnswered || isCompleted}
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1811] font-semibold"
            >
              {isCompleted ? "Completed ✓" : "Mark as Complete"}
            </Button>
            {!allPromptsAnswered && !isCompleted && (
              <p className="text-sm text-[#F5DEB3]/60 self-center">
                Answer all prompts to complete this lesson
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default LessonCard;
