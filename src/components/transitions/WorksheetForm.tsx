import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ClipboardList } from 'lucide-react';
import { Worksheet, WorksheetQuestion } from '@/data/lifeTransitionDailyContent';

interface WorksheetFormProps {
  worksheet: Worksheet;
  onComplete: (responses: Record<string, any>) => void;
  disabled?: boolean;
}

const WorksheetForm: React.FC<WorksheetFormProps> = ({ worksheet, onComplete, disabled }) => {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const isComplete = worksheet.questions.every(q => {
    const val = responses[q.id];
    if (q.type === 'text') return val && val.trim().length > 0;
    if (q.type === 'scale') return val !== undefined;
    if (q.type === 'multiChoice') return Array.isArray(val) && val.length > 0;
    return false;
  });

  const renderQuestion = (q: WorksheetQuestion, index: number) => {
    switch (q.type) {
      case 'text':
        return (
          <Textarea
            placeholder="Write your response here..."
            value={responses[q.id] || ''}
            onChange={e => updateResponse(q.id, e.target.value)}
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[80px]"
            disabled={disabled}
          />
        );
      case 'scale':
        return (
          <div className="space-y-2">
            <Slider
              value={[responses[q.id] ?? (q.scaleMin || 1)]}
              onValueChange={([val]) => updateResponse(q.id, val)}
              min={q.scaleMin || 1}
              max={q.scaleMax || 10}
              step={1}
              className="py-2"
              disabled={disabled}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{q.scaleLabels?.min || q.scaleMin || 1}</span>
              <span className="text-[#D4AF37] font-semibold text-sm">
                {responses[q.id] !== undefined ? responses[q.id] : '—'}
              </span>
              <span>{q.scaleLabels?.max || q.scaleMax || 10}</span>
            </div>
          </div>
        );
      case 'multiChoice':
        return (
          <div className="space-y-2">
            {(q.options || []).map(option => {
              const selected = (responses[q.id] || []).includes(option);
              return (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={selected}
                    onCheckedChange={checked => {
                      const current = responses[q.id] || [];
                      if (checked) {
                        updateResponse(q.id, [...current, option]);
                      } else {
                        updateResponse(q.id, current.filter((o: string) => o !== option));
                      }
                    }}
                    disabled={disabled}
                    className="border-gray-600 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{option}</span>
                </label>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-emerald-500/10 border-emerald-500/20 overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList className="w-5 h-5 text-emerald-400" />
          <h5 className="font-semibold text-emerald-300">{worksheet.title}</h5>
        </div>
        <p className="text-sm text-gray-400">{worksheet.instructions}</p>

        <div className="space-y-5">
          {worksheet.questions.map((q, i) => (
            <div key={q.id} className="space-y-2">
              <p className="text-sm text-gray-200 font-medium">
                {i + 1}. {q.prompt}
              </p>
              {renderQuestion(q, i)}
            </div>
          ))}
        </div>

        {!disabled && (
          <Button
            onClick={() => onComplete(responses)}
            disabled={!isComplete}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold disabled:opacity-50"
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Submit Worksheet
          </Button>
        )}
      </div>
    </Card>
  );
};

export default WorksheetForm;
