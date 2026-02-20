
import { knowledgeBaseResponses } from './knowledgeBase';

export const generateResponse = (userMessage: string, conversationContext: string[] = []): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check if we can directly match from knowledge base first
  for (const entry of knowledgeBaseResponses) {
    if (entry.patterns.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(lowerMessage);
      } else {
        return lowerMessage.includes(pattern.toLowerCase());
      }
    })) {
      if (typeof entry.response === 'function') {
        return entry.response();
      } else if (Array.isArray(entry.response)) {
        return entry.response[Math.floor(Math.random() * entry.response.length)];
      } else {
        return entry.response;
      }
    }
  }
  
  // Use context to inform more personalized responses
  if (conversationContext.length > 0) {
    // Check if user is sharing something personal or emotional
    const isEmotional = /feel|feeling|felt|sad|happy|anxious|worry|afraid|scared|overwhelmed|stress/i.test(lowerMessage);
    const isQuestion = /\?$|^(what|how|why|when|where|can|could|would|is|are|do|does|did)/i.test(lowerMessage);
    const mentionsLife = /life|work|school|family|relationship|partner|spouse|friend|job|career/i.test(lowerMessage);
    
    if (isEmotional) {
      const responses = [
        "Hey, I hear you. That sounds like a lot. What's been weighing on you most?",
        "Thanks for telling me that — seriously. How long has this been going on?",
        "That makes total sense. What do you think would help right now, even something small?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (isQuestion && mentionsLife) {
      const responses = [
        "Honestly, that's a big question. What part of it feels most pressing for you right now?",
        "I get it — life can be a lot sometimes. Tell me more about what's going on?",
        "That's real. Can you walk me through what's been happening?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Fallback responses if no context match
  const fallbackResponses = [
    "Hey, I'm here. What's on your mind?",
    "I'm all ears — what's going on with you?",
    "Hey! Tell me what's been on your mind lately.",
    "I'm glad you're here. What would you like to talk about?"
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
