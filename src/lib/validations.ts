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
  .max(128, { message: 'Password must be less than 128 characters' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/, { message: 'Password must contain at least one special character' });

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
    .max(10, { message: 'Rating must be at most 10' })
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

// Mini session validation
export const miniSessionSchema = z.object({
  focus: z
    .enum(['racing_thoughts', 'conflict', 'low_mood', 'urge', 'process_therapy'], {
      message: 'Please select a valid focus area'
    }),
  mood: z
    .number()
    .min(1, { message: 'Mood must be at least 1' })
    .max(10, { message: 'Mood must be at most 10' })
    .optional(),
  anxiety: z
    .number()
    .min(1, { message: 'Anxiety must be at least 1' })
    .max(10, { message: 'Anxiety must be at most 10' })
    .optional(),
  energy: z
    .number()
    .min(1, { message: 'Energy must be at least 1' })
    .max(10, { message: 'Energy must be at most 10' })
    .optional(),
  urge_level: z
    .number()
    .min(0, { message: 'Urge level must be at least 0' })
    .max(10, { message: 'Urge level must be at most 10' })
    .optional(),
  user_text_primary: z
    .string()
    .trim()
    .max(2000, { message: 'Text must be less than 2000 characters' })
    .optional(),
  user_text_secondary: z
    .string()
    .trim()
    .max(2000, { message: 'Text must be less than 2000 characters' })
    .optional(),
});

// Therapy booking validation
export const therapyBookingSchema = z.object({
  therapist_id: z
    .string()
    .uuid({ message: 'Invalid therapist ID' }),
  appointment_date: z
    .string()
    .min(1, { message: 'Appointment date is required' }),
  duration_minutes: z
    .number()
    .min(30, { message: 'Session must be at least 30 minutes' })
    .max(180, { message: 'Session must be at most 180 minutes' }),
  session_type: z
    .enum(['video', 'audio', 'in-person'], {
      message: 'Please select a valid session type'
    }),
  concerns: z
    .array(z.string().max(100, { message: 'Each concern must be less than 100 characters' }))
    .max(10, { message: 'Maximum 10 concerns allowed' })
    .optional(),
  notes: z
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
export type MiniSessionInput = z.infer<typeof miniSessionSchema>;
export type TherapyBookingInput = z.infer<typeof therapyBookingSchema>;
