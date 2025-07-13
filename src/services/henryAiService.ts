import { supabase } from "@/integrations/supabase/client";

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
    return "I'm experiencing some technical difficulties. Please try again, or if this persists, consider reaching out to a mental health professional directly.";
  }
}