import { z } from 'zod';

// Auth validations
export const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Please enter a valid email address' })
  .max(255, { message: 'Email must be less than 255 characters' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(128, { message: 'Password must be less than 128 characters' });

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: emailSchema,
  message: z
    .string()
    .trim()
    .min(1, { message: 'Message is required' })
    .max(2000, { message: 'Message must be less than 2000 characters' }),
});

// Journal entry validation
export const journalEntrySchema = z.object({
  mood: z
    .string()
    .min(1, { message: 'Please select a mood' }),
  notes: z
    .string()
    .trim()
    .max(5000, { message: 'Notes must be less than 5000 characters' })
    .optional(),
  mood_score: z
    .number()
    .min(1, { message: 'Mood score must be at least 1' })
    .max(10, { message: 'Mood score must be at most 10' })
    .optional(),
});

// Whisper/post validation
export const whisperSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: 'Content is required' })
    .max(2000, { message: 'Content must be less than 2000 characters' }),
  mood: z
    .string()
    .max(50, { message: 'Mood must be less than 50 characters' })
    .optional(),
});

// Reply validation
export const replySchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: 'Reply cannot be empty' })
    .max(1000, { message: 'Reply must be less than 1000 characters' }),
});

// Question validation (for Dear Henry)
export const questionSchema = z.object({
  question_text: z
    .string()
    .trim()
    .min(10, { message: 'Question must be at least 10 characters' })
    .max(1000, { message: 'Question must be less than 1000 characters' }),
  category: z
    .string()
    .min(1, { message: 'Please select a category' }),
  is_anonymous: z
    .boolean()
    .optional(),
});

// Feedback validation
export const feedbackSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, { message: 'Feedback message is required' })
    .max(2000, { message: 'Feedback must be less than 2000 characters' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' })
    .optional(),
});

// Coaching session validation
export const coachingSessionSchema = z.object({
  focus_area: z
    .string()
    .trim()
    .min(1, { message: 'Please specify a focus area' })
    .max(200, { message: 'Focus area must be less than 200 characters' }),
  preferred_date: z
    .string()
    .min(1, { message: 'Please select a date' }),
  preferred_time: z
    .string()
    .min(1, { message: 'Please select a time' }),
  additional_notes: z
    .string()
    .trim()
    .max(1000, { message: 'Notes must be less than 1000 characters' })
    .optional(),
});

export type AuthInput = z.infer<typeof authSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type JournalEntryInput = z.infer<typeof journalEntrySchema>;
export type WhisperInput = z.infer<typeof whisperSchema>;
export type ReplyInput = z.infer<typeof replySchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type CoachingSessionInput = z.infer<typeof coachingSessionSchema>;
