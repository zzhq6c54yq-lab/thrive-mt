import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Lock } from 'lucide-react';
import { questionSchema } from '@/lib/validations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionSubmissionProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'self-esteem', label: 'Self-Esteem' },
  { value: 'depression', label: 'Depression' },
  { value: 'purpose', label: 'Purpose & Meaning' },
  { value: 'trauma', label: 'Trauma' },
  { value: 'motivation', label: 'Motivation' },
];

const QuestionSubmission: React.FC<QuestionSubmissionProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const validation = questionSchema.safeParse({
      question_text: question.trim(),
      category,
      is_anonymous: isAnonymous,
    });

    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('henry_questions')
        .insert([{
          question_text: validation.data.question_text,
          category: validation.data.category as any,
          is_anonymous: validation.data.is_anonymous ?? true,
          user_id: user?.id || null,
          status: 'pending' as any
        }]);

      if (error) throw error;

      toast({
        title: "Question Submitted! 📬",
        description: "Henry will review your question soon. Check back for his response!",
      });

      setQuestion('');
      setCategory('');
      setIsAnonymous(true);
      onClose();
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-2xl border-2 border-amber-200 dark:border-amber-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                  Ask Henry a Question
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Share what's on your mind. Henry provides compassionate guidance for life's challenges.
                </p>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="question">Your Question</Label>
                <Textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question or concern here..."
                  className="mt-2 min-h-[150px] resize-none"
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {question.length}/1000 characters
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <Label htmlFor="anonymous" className="text-sm font-semibold">
                      Keep Anonymous
                    </Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Your identity will remain private
                    </p>
                  </div>
                </div>
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Question
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionSubmission;
