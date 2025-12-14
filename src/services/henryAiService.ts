import { supabase } from "@/integrations/supabase/client";

// Compassionate fallback responses
const FALLBACK_RESPONSES = [
  "I hear you, and I want you to know that reaching out takes courage. Let me gather my thoughts and try again in a moment.",
  "Thank you for sharing that with me. I'm having a brief pause, but your wellbeing matters. Let's try again.",
  "Your words matter to me. I'm experiencing a small hiccup right now, but please don't let that discourage you.",
  "I'm here with you. Take a gentle breath, and let's try connecting again in a moment."
];

export async function getHenryAiResponse(message: string, conversationContext: string[] = []): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('henry-ai-chat', {
      body: {
        message,
        conversationContext
      }
    });

    if (error) {
      throw error;
    }

    return data?.response || "I'm sorry, I'm having trouble responding right now. Please try again.";
  } catch (error) {
    console.error('Error calling Henry AI service:', error);
    // Return a compassionate fallback
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }
}