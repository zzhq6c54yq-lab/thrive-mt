
import { checkForEmergency, checkEmotionalState, checkBasicQuestion } from "../../help/utils/messageHelpers";

// Mental health knowledge base for Henry
const knowledgeBase = {
  // Basic mental health information
  "anxiety": "Anxiety is a normal response to stress, but when it becomes excessive, it may be an anxiety disorder. Deep breathing, mindfulness, and seeking professional help are effective approaches.",
  "depression": "Depression is more than just feeling sad. It's a persistent feeling of sadness or loss of interest that can interfere with daily activities. Professional support is important.",
  "stress": "Stress is your body's reaction to pressure from a situation or event. Managing stress through exercise, meditation, and social connections can improve your wellbeing.",
  "therapy": "Therapy provides a safe space to explore feelings, beliefs, and behaviors with a trained professional. There are many types available based on your specific needs.",
  "meditation": "Meditation is a mindfulness practice that can help reduce stress, improve focus, and promote emotional wellbeing. Even a few minutes daily can make a difference.",
  "suicide": "If you're having thoughts of suicide, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. Help is available 24/7.",
  "crisis": "If you're experiencing a mental health crisis, please call 988 for immediate support, or text HOME to 741741. You can also visit our Crisis Support page for resources.",
  "workshops": "Our workshops offer interactive learning experiences on various mental health topics. You can find topics ranging from anxiety management to building resilience.",
  "community": "Connecting with others who understand what you're going through can be healing. Our Community Support section offers forums and group chats.",
  "resources": "We have a variety of self-help resources available, including guides, workbooks, and interactive tools to support your mental wellness journey.",
  "tools": "Our Mental Wellness Tools include mood tracking, journaling prompts, guided meditations, and cognitive behavioral therapy exercises.",
  "sleep": "Quality sleep is essential for mental health. Our Mindfulness & Sleep section has resources to help improve your sleep habits.",
  "exercise": "Physical activity can significantly improve mood and reduce anxiety and depression. Even a short daily walk can be beneficial.",
  
  // Basic conversation responses
  "greeting": "Hello! I'm Henry, your digital mental health counselor. How are you feeling today?",
  "how are you": "I'm here and ready to support you in your mental wellness journey. How can I assist you today?",
  "what can you do": "I can provide mental health information, direct you to resources, offer supportive listening, and help you navigate our app. I'm here to support your mental wellness journey.",
  "who are you": "I'm Henry, your digital mental health counselor. I'm here to support you through your mental wellness journey and help you find the resources you need.",
  "thank you": "You're welcome! I'm glad I could help. Remember, I'm here for you whenever you need support.",
  "help": "I'm here to help. Whether you need information, resources, or just someone to talk to, I'm available. What are you looking for today?",
  "feeling sad": "I'm sorry to hear you're feeling sad. That's a normal emotion, but if it's overwhelming, let's talk about it. Would you like me to suggest some self-care activities or resources?",
  "feeling depressed": "I understand you're feeling depressed, and I want you to know you're not alone. Depression is treatable, and there are resources here to help. Would you like me to connect you with therapeutic resources or schedule a therapy session?",
  "feeling anxious": "Anxiety can be really challenging. Remember to take slow, deep breaths. Would you like me to guide you through a quick grounding exercise or connect you with our anxiety resources?",
  "feeling overwhelmed": "When you're feeling overwhelmed, it's important to take a step back. Let's break things down together. Would you like to try a simple mindfulness exercise or explore tools to help manage overwhelm?",
  "feeling angry": "Anger is a natural emotion that tells us something isn't right. Finding healthy ways to express and manage anger is important. Would you like to explore some techniques that might help?",
  "feeling good": "I'm glad to hear you're feeling good! That's wonderful news. Would you like to build on this positive moment with some wellbeing activities?"
};

// Navigation knowledge base
const navigationHelp = {
  "workshops": "Let me take you to our Workshops section, where you'll find interactive mental health resources.",
  "community": "I'll show you to our Community Support section, where you can connect with others.",
  "tools": "Let me direct you to our Mental Wellness Tools, which offer practical resources for self-help.",
  "crisis": "I'll take you to our Crisis Support resources right away.",
  "therapist": "Let me help you find a therapist through our matching service.",
  "games": "I can show you our Mental Health Games section for fun, interactive ways to build skills.",
  "progress": "Let's check your Progress Reports to see how your journey is going.",
  "profile": "I'll take you to your User Profile where you can update your information.",
  "settings": "Let me show you to the User Settings page where you can customize your experience."
};

// Emergency services referral responses
const emergencyResponses = {
  "suicidal": "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to navigate you to our Crisis Support page?",
  "emergency": "This sounds like an emergency situation. Please call 911 immediately. Would you like me to direct you to our Crisis Support resources as well?",
  "crisis": "I understand you're going through a difficult time. The Crisis Text Line is available 24/7 - text HOME to 741741 to connect with a counselor. Would you like me to take you to our Crisis Support page?",
  "harm": "Your safety is important. If you're thinking about harming yourself or others, please call 988 or go to your nearest emergency room. Would you like me to show you our Crisis Support resources?"
};

const generatePersonalizedResponse = (emotionalState: string, userName?: string) => {
  if (emotionalState === "feeling depressed") {
    const name = userName ? `, ${userName}` : "";
    return `I'm really sorry you're feeling depressed${name}. That's a heavy burden to carry, and you don't have to face it alone. Depression is treatable, and reaching out like this is a brave first step. Would you like me to set up a therapy appointment for you? In the meantime, I can show you some exercises that might help lift that cloud of depression. How does that sound?`;
  }
  
  if (emotionalState === "feeling sad") {
    const name = userName ? `, ${userName}` : "";
    return `I'm sorry to hear you're feeling sad${name}. Your emotions are valid, and it's okay to feel this way sometimes. Would you like to explore some simple activities that might help improve your mood, or would you prefer to talk more about what's making you sad?`;
  }
  
  if (emotionalState === "feeling anxious") {
    const name = userName ? `, ${userName}` : "";
    return `I understand anxiety can be really difficult${name}. Let's take a moment together. Could you try taking a slow, deep breath with me? In through your nose for 4 counts, hold for 1, and out through your mouth for 6. Would you like me to guide you through a quick grounding exercise, or would you prefer to explore our anxiety management resources?`;
  }
  
  if (emotionalState === "feeling overwhelmed") {
    const name = userName ? `, ${userName}` : "";
    return `It sounds like things are feeling too much right now${name}. That's understandable. When we're overwhelmed, it helps to break things down into smaller pieces. Would it help to talk about what's contributing to this feeling, or would you prefer some immediate coping strategies?`;
  }
  
  if (emotionalState === "feeling angry") {
    const name = userName ? `, ${userName}` : "";
    return `I hear that you're feeling angry${name}. Anger is often a signal that something important to us has been violated or threatened. Would you like to explore some healthy ways to express this anger, or would it help to talk about the situation that's causing these feelings?`;
  }
  
  if (emotionalState === "feeling good") {
    const name = userName ? `, ${userName}` : "";
    return `That's wonderful to hear${name}! Positive emotions are worth celebrating and savoring. What's contributing to your good mood today? Would you like some suggestions for activities that might help extend these positive feelings?`;
  }
  
  return knowledgeBase[emotionalState];
};

export const generateResponse = (message: string, userName?: string) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency first
  const emergencyType = checkForEmergency(message);
  if (emergencyType) {
    // Fixed: Instead of using the boolean true as an index, 
    // we need to return a specific emergency type string
    return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to navigate you to our Crisis Support page?";
  }
  
  // Check for emotional states
  const emotionalState = checkEmotionalState(message);
  if (emotionalState) {
    return generatePersonalizedResponse(emotionalState, userName);
  }
  
  // Check for basic questions
  const basicQuestion = checkBasicQuestion(message);
  if (basicQuestion) {
    return knowledgeBase[basicQuestion];
  }
  
  // Check for navigation requests
  if (lowerMessage.includes("take me to") || 
      lowerMessage.includes("go to") || 
      lowerMessage.includes("navigate to") ||
      lowerMessage.includes("show me")) {
    
    for (const [key, value] of Object.entries(navigationHelp)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
  }
  
  // Check knowledge base for mental health topics
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }
  
  // Default responses if no matches
  const defaultResponses = [
    "I'm here to support your mental wellness journey. Could you tell me more about what you're looking for?",
    "I'd be happy to help with that. Is there a specific area of mental wellness you'd like to explore?",
    "Thank you for sharing that with me. How can I best support you right now?",
    "I'm here to help you navigate Thrive MT. What specific resources or information would be most helpful?",
    "That's a great question. Let me help guide you to the resources that might be most beneficial for you."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
