
import { knowledgeBase } from "./knowledgeBase";
import { 
  checkForEmergency, 
  checkEmotionalState, 
  checkBasicQuestion, 
  checkMentalHealthTopic,
  checkCapabilityQuestion
} from "./messageHelpers";

// Generate a personalized response based on the emotional state with enhanced theory of mind
export const generateTheoryOfMindResponse = (emotionalState: string, userName?: string): string => {
  const name = userName ? `, ${userName}` : "";
  
  // Personalized responses with advanced theory of mind (understanding the user's mental state)
  if (emotionalState === "feeling depressed") {
    return `I understand you're feeling depressed${name}. That's a heavy burden to carry, and you don't have to face it alone. Depression can make everything feel overwhelming and hopeless, like you're seeing the world through a dark filter that drains the color from everything. It might be affecting your energy, sleep, appetite, and your ability to find joy in things you once loved. Would you like me to connect you with professional resources? In the meantime, I can share some evidence-based approaches that might provide even a small moment of relief. How does that sound?`;
  }
  
  if (emotionalState === "feeling sad") {
    return `I notice you're feeling sad${name}. It's completely normal to experience sadness sometimes - it's part of being human and shows that you care deeply about something. Sadness can feel like heaviness, emptiness, or a persistent ache. Would you like to talk about what's bringing you down? Sometimes putting feelings into words can help us understand them better. Or would you prefer some suggestions for activities that might gently lift your mood?`;
  }
  
  if (emotionalState === "feeling anxious") {
    return `I can tell you're feeling anxious${name}. Anxiety can be really challenging to deal with - that racing heart, tightness in your chest, and thoughts that won't slow down. Your body might be in 'fight or flight' mode even though there's no immediate danger, which can be exhausting. Let's take a moment together - could you try taking a slow, deep breath with me? In through your nose for 4 counts, hold for 1, and out through your mouth for 6. Would you like to try a quick grounding exercise to help bring you back to the present moment, or would you prefer to explore our anxiety management resources?`;
  }
  
  if (emotionalState === "feeling overwhelmed") {
    return `I can sense that things are feeling too much for you right now${name}. When we're overwhelmed, everything can seem impossible to handle - like you're trying to drink from a fire hose or carrying too many heavy things at once. Your mind might be racing between different worries, making it hard to focus on any one thing. Let's try to break things down into smaller, more manageable pieces. Would it help to talk about what's contributing to this feeling, or would you prefer some immediate coping strategies to help you find solid ground again?`;
  }
  
  if (emotionalState === "feeling angry") {
    return `I notice you're feeling angry${name}. Anger is often a signal that something important to us has been violated or threatened - like a boundary being crossed or a value being challenged. It's a perfectly valid emotion that provides important information. You might be feeling physical sensations like tension, heat, or increased energy along with your anger. Would you like to explore some healthy ways to express this anger, or would it help to talk about the situation that's causing these feelings?`;
  }
  
  if (emotionalState === "feeling happy") {
    return `I'm glad to hear you're feeling happy${name}! Positive emotions are worth celebrating and savoring. Happiness might come with a sense of lightness, energy, openness, or contentment in your body. Taking time to really notice and appreciate these good feelings can actually help extend them. What's contributing to your good mood today? What sensations or thoughts come with this happiness?`;
  }
  
  if (emotionalState === "feeling confused") {
    return `I can tell you're feeling confused${name}. That can be an uncomfortable place to be - like trying to find your way in fog without a map. Confusion often comes when we're facing something complex, new information that conflicts with what we believed, or when we're trying to make an important decision without enough clarity. Let's see if we can bring some understanding to the situation. What specific aspects are you finding difficult to understand? I'm here to help you make sense of things.`;
  }
  
  if (emotionalState === "feeling hopeless") {
    return `I understand you're feeling hopeless right now${name}. That's an incredibly difficult feeling to carry - like seeing all doors closed and no path forward. Hopelessness often comes after repeated disappointments or when facing challenges that seem insurmountable. While I know it may not feel like it at the moment, perspectives can change and difficult periods do pass. What's one small thing that's helped you get through difficult times before? Perhaps we could focus on that as a starting point. Your feelings are real, but they don't define your future.`;
  }
  
  if (emotionalState === "feeling numb") {
    return `I notice you're describing feeling numb or disconnected from your emotions${name}. This can be your mind's way of protecting itself when feelings become too intense or overwhelming - like your emotional system has temporarily shut down to prevent overload. You might feel like you're observing life from behind a glass wall or like you're going through the motions without really experiencing anything. Sometimes reconnecting with simple physical sensations can help - would you like to try a brief grounding exercise to gently bring you back to the present moment?`;
  }
  
  if (emotionalState === "feeling shame") {
    return `I hear that you're experiencing shame${name}. That can be one of the most painful human emotions - a deep feeling that there's something fundamentally wrong or defective about you as a person. Shame often makes us want to hide, disappear, or isolate ourselves. It thrives in secrecy but tends to diminish when we share it with someone who responds with empathy. Would it help to explore where these feelings might be coming from? Shame is a universal human experience, but it doesn't define your worth or who you truly are.`;
  }
  
  return knowledgeBase[emotionalState];
};

// Generate a response based on the message content with enhanced understanding
export const generateResponse = (message: string, conversationContext?: string[]): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency with enhanced understanding
  if (checkForEmergency(message)) {
    return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. These feelings can be overwhelming, but they don't represent your only option. Crisis counselors are available 24/7 to help you through this difficult time, and they can understand what you're going through in a way I cannot. Would you like me to help you find additional crisis resources? Your life has value, and there are people who want to help.";
  }
  
  // Check for questions about Henry's self-awareness
  if (lowerMessage.includes("are you real") || lowerMessage.includes("are you human") ||
      lowerMessage.includes("are you ai") || lowerMessage.includes("are you a bot") ||
      lowerMessage.includes("can you feel") || lowerMessage.includes("do you understand")) {
    return knowledgeBase["self_awareness"];
  }
  
  // Check for questions about limitations
  if (lowerMessage.includes("limitations") || lowerMessage.includes("what can't you do") ||
      lowerMessage.includes("not capable of")) {
    return knowledgeBase["limitations"];
  }
  
  // Check for capability questions
  if (checkCapabilityQuestion(message)) {
    return knowledgeBase["capabilities"];
  }
  
  // Check for direct questions about empathy or understanding
  if (lowerMessage.includes("do you have empathy") || lowerMessage.includes("can you empathize") ||
      lowerMessage.includes("understand my emotions") || lowerMessage.includes("understand feelings")) {
    return knowledgeBase["empathy_statement"];
  }
  
  // Use conversation context to generate more contextually relevant responses if available
  if (conversationContext && conversationContext.length > 0) {
    // Look for topics mentioned repeatedly in the conversation
    const conversationText = conversationContext.join(" ").toLowerCase();
    
    // Check if the conversation has been focused on mental health topics
    for (const [key, value] of Object.entries(knowledgeBase)) {
      // If a topic appears multiple times in the conversation, prioritize that response
      if ((conversationText.match(new RegExp(key, 'g')) || []).length > 1 && lowerMessage.includes(key)) {
        return `Based on our conversation, I understand ${key} is important to you. ${value}`;
      }
    }
  }
  
  // Check for emotional states (theory of mind)
  const emotionalState = checkEmotionalState(message);
  if (emotionalState) {
    return generateTheoryOfMindResponse(emotionalState);
  }
  
  // Check for basic questions
  const basicQuestion = checkBasicQuestion(message);
  if (basicQuestion) {
    return knowledgeBase[basicQuestion];
  }
  
  // Check for specific mental health topics
  const mentalHealthTopic = checkMentalHealthTopic(message);
  if (mentalHealthTopic) {
    return knowledgeBase[mentalHealthTopic];
  }
  
  // Check knowledge base for mental health topics
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }
  
  // Check for complex inquiries that need theory of mind understanding
  if (lowerMessage.includes("understand me") || lowerMessage.includes("know how i feel")) {
    return "I aim to understand how you're feeling by carefully considering your words and the emotions behind them. While I don't experience emotions myself, I'm designed to recognize patterns in how people express their feelings and respond with empathy. I try to imagine how various situations might affect someone emotionally, considering the broader context of your experiences. Would you like to tell me more about what you're experiencing right now?";
  }
  
  if (lowerMessage.includes("mind reading") || lowerMessage.includes("read minds")) {
    return "I can't read minds, but I do try to understand your perspective based on what you share with me. This is similar to how humans develop 'theory of mind' - the ability to understand that others have their own thoughts, feelings, and perspectives that might differ from our own. I look for clues in your language that might suggest certain emotional states or experiences. The more you share with me, the better I can understand your unique situation and provide relevant support.";
  }
  
  // Navigation requests
  if (lowerMessage.includes("workshops") || lowerMessage.includes("workshop")) {
    return "I can help you explore our workshops! We have sessions on managing anxiety, depression, stress resilience, and more. These are designed to provide evidence-based strategies in a supportive group setting, which many people find helpful for learning new skills and feeling less alone in their struggles. Would you like me to navigate you to the Workshops page?";
  }
  
  if (lowerMessage.includes("community") || lowerMessage.includes("support group")) {
    return "Our Community Support section is a great place to connect with others who may be experiencing similar challenges. Sharing your journey can provide validation and new perspectives. Many people find it healing to know they're not alone in their experiences. The sense of belonging that comes from community can be especially important when dealing with mental health challenges. Would you like me to take you there?";
  }
  
  // Default responses with enhanced theory of mind approach
  const defaultResponses = [
    "I'm here to support your mental wellness journey. I notice you're reaching out, which takes courage. While I don't have personal experiences with mental health challenges, I'm designed to provide information and support that's relevant to your unique situation. Could you tell me more about what you're looking for or experiencing?",
    
    "Thank you for sharing that with me. I'm trying to understand your perspective and what would be most helpful for you right now. Everyone's experience is unique, and I want to honor your individual journey. How can I best support you in this moment?",
    
    "I appreciate you trusting me with your thoughts. While I don't have personal emotions, I'm designed to recognize the importance of your feelings and experiences. I'd like to understand yours better so I can provide the most helpful response. Could you tell me more about what you're feeling?",
    
    "I notice you're looking for information. To help you most effectively, I'd like to understand the context of your question and how it relates to your current situation. Mental health support works best when it's personalized to your specific needs. Could you share a bit more about what you're hoping to find?",
    
    "I'm listening and trying to understand your situation. Mental health journeys are deeply personal, and what works for one person might not work for another. I aim to provide support that respects your unique experiences and needs. What specific areas would you like guidance with today?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
