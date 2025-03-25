
import { knowledgeBaseResponses } from './knowledgeBase';
import { checkEmotionalState, checkBasicQuestion } from '../../help/utils/messageHelpers';

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
  
  // Check for emotional state or question type
  const emotionalState = checkEmotionalState(userMessage);
  if (emotionalState) {
    const emotionalResponses = {
      'anxious': [
        "I notice you might be feeling anxious. Taking a few deep breaths can help in the moment. Would you like to try a quick breathing exercise?",
        "Anxiety can be really challenging. Can you tell me more about what's making you feel this way?",
        "When anxiety comes up, grounding techniques can help. Would you like to try one together?"
      ],
      'sad': [
        "I'm hearing that you're feeling down. That's completely valid. Would it help to talk more about what's contributing to these feelings?",
        "I'm sorry you're feeling sad. Sometimes small actions can help shift our mood a little. Is there a small activity that normally brings you joy?",
        "When you're feeling sad, it's important to be gentle with yourself. What would you say to a friend who was feeling this way?"
      ],
      'angry': [
        "It sounds like you're feeling frustrated or angry. Those emotions can be really intense. What helped you manage anger in the past?",
        "Anger often has important messages for us. When you feel ready, it might help to explore what's beneath that feeling.",
        "Managing strong emotions like anger takes practice. Would you like to try a quick technique that might help reduce the intensity?"
      ],
      'happy': [
        "It's wonderful to hear you're feeling positive! What's contributing to those good feelings today?",
        "I'm glad you're feeling good! Noticing and savoring positive emotions can help strengthen them. What specifically is making you happy?",
        "That's great to hear! Positive moments are worth celebrating. How can you carry this good energy forward?"
      ],
      'confused': [
        "It sounds like things feel a bit uncertain right now. Would it help to talk through what's causing the confusion?",
        "When we're confused, breaking things down into smaller parts can sometimes help. What specific aspect feels most unclear?",
        "Confusion is completely normal, especially when facing complex situations. Would talking through it step by step be helpful?"
      ],
      'overwhelmed': [
        "When everything feels like too much, focusing on just the next small step can help. What's one small thing you could address first?",
        "Feeling overwhelmed is completely understandable. Sometimes writing things down can help create some mental space. Have you tried that?",
        "I'm sorry things feel overwhelming right now. Taking a moment to pause and breathe can help. Would you like to try a quick grounding exercise?"
      ],
      'lonely': [
        "Loneliness can be really difficult to experience. How long have you been feeling this way?",
        "Connection is so important for our wellbeing. Are there any small ways you might reach out to someone today?",
        "I'm sorry you're feeling lonely. That's a challenging emotion to sit with. What has helped you feel more connected in the past?"
      ]
    };
    
    const responses = emotionalResponses[emotionalState as keyof typeof emotionalResponses];
    if (responses) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  const questionType = checkBasicQuestion(userMessage);
  if (questionType) {
    const questionResponses = {
      'greeting': [
        "Hello! I'm Henry, your mental health companion. How are you doing today?",
        "Hi there! I'm here to support your wellbeing. What's on your mind?",
        "Greetings! I'm Henry. How can I assist you with your mental health journey today?"
      ],
      'identity': [
        "I'm Henry, an AI designed to provide mental health support and resources. I'm here to listen, offer guidance, and help you navigate challenges.",
        "I'm your digital mental health companion, designed to provide support, resources, and a space for reflection. How can I help you today?",
        "My name is Henry, and I'm here to support your mental health journey. I can provide resources, exercises, and a space to process your thoughts and feelings."
      ],
      'capabilities': [
        "I can help with a variety of mental health needs - from providing coping strategies and resources to simply being a space where you can express your thoughts. What would be most helpful for you right now?",
        "I'm designed to support your mental wellbeing through conversation, providing resources, and offering exercises for various mental health challenges. What are you looking for help with?",
        "I can listen to your concerns, suggest coping strategies, provide mental health resources, and offer a judgment-free space for reflection. How can I support you today?"
      ],
      'help': [
        "I'm here to help. To better support you, could you share a bit more about what you're looking for assistance with?",
        "I'd be happy to help. Could you tell me more specifically what kind of support you're seeking?",
        "I'm ready to support you. What particular aspect of your mental health or wellbeing would you like help with today?"
      ],
      'thanks': [
        "You're welcome. It's my purpose to be here for you. Is there anything else I can help with?",
        "I'm glad I could be of assistance. Remember, I'm here anytime you need support.",
        "You're very welcome. Don't hesitate to reach out whenever you need someone to talk to."
      ],
      'goodbye': [
        "Take care, and remember I'm here whenever you need to talk. Wishing you well.",
        "Goodbye for now. I'll be here when you need support again.",
        "Take care of yourself. I'll be here if you need to talk again."
      ]
    };
    
    const responses = questionResponses[questionType as keyof typeof questionResponses];
    if (responses) {
      return responses[Math.floor(Math.random() * responses.length)];
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
