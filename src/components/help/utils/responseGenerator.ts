
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
        "Thank you for sharing that with me. Emotions are an important part of our wellbeing. Can you tell me more about what triggered these feelings?",
        "I appreciate you opening up about your emotions. That takes courage. How long have you been feeling this way?",
        "Acknowledging your feelings is an important step. What do you think might help you process these emotions?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (isQuestion && mentionsLife) {
      const responses = [
        "That's a thoughtful question about life's challenges. While everyone's experience is unique, finding balance and meaning is often helpful. What specific aspects would you like to explore more?",
        "Life's complexities can be challenging to navigate. I'm here to help you reflect on your situation. Could you share more details about what you're experiencing?",
        "That's an important question. I'd like to understand more about your specific situation so I can offer more personalized support. Could you tell me more?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Fallback responses if no context match
  const fallbackResponses = [
    "I'm here to support your mental wellbeing. Could you share a bit more about what's on your mind?",
    "Mental health is a journey, and I'm here to accompany you. What specific areas would you like to discuss?",
    "I'm listening and here to help. Could you tell me more about what you're experiencing so I can better support you?",
    "Thank you for reaching out. To provide the most helpful support, could you share more about what brought you here today?"
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
