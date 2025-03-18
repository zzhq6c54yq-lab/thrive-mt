
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?", isUser: false }
  ]);
  const [userInput, setUserInput] = useState("");
  const { toast } = useToast();
  
  // Theory of Mind and mental health knowledge base
  const knowledgeBase = {
    // Core mental health topics
    "anxiety": "Anxiety is a normal response to stress, but when it becomes excessive, it may be an anxiety disorder. Deep breathing, mindfulness, and seeking professional help are effective approaches.",
    "depression": "Depression is more than just feeling sad. It's a persistent feeling of sadness or loss of interest that can interfere with daily activities. Professional support is important.",
    "stress": "Stress is your body's reaction to pressure from a situation or event. Managing stress through exercise, meditation, and social connections can improve your wellbeing.",
    "therapy": "Therapy provides a safe space to explore feelings, beliefs, and behaviors with a trained professional. There are many types available based on your specific needs.",
    "meditation": "Meditation is a mindfulness practice that can help reduce stress, improve focus, and promote emotional wellbeing. Even a few minutes daily can make a difference.",
    "suicide": "If you're having thoughts of suicide, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. Help is available 24/7.",
    "crisis": "If you're experiencing a mental health crisis, please call 988 for immediate support, or text HOME to 741741. You can also visit our Crisis Support page for resources.",
    
    // Theory of Mind responses (understanding user's mental state)
    "feeling sad": "I notice you're feeling sad. That's a completely valid emotion that everyone experiences. Would it help to talk about what's causing these feelings? I can also suggest some mood-lifting activities if you'd prefer.",
    "feeling depressed": "I hear that you're feeling depressed, and I want you to know that you're not alone in this experience. Depression can make everything feel overwhelming, but there are supports available. Would you like me to connect you with professional resources or would you prefer to explore some coping strategies first?",
    "feeling anxious": "I understand anxiety can be really challenging to deal with. Your feelings are valid, and there are ways to manage these symptoms. Would it help to try a quick breathing exercise together, or would you prefer information about anxiety management techniques?",
    "feeling overwhelmed": "I recognize you're feeling overwhelmed right now. That's a difficult emotional state to be in. Sometimes breaking things down into smaller pieces can help. Would you like to talk about what's contributing to this feeling, or try a simple grounding exercise?",
    "feeling angry": "I can hear that you're feeling angry. Anger is often a signal that something important to you has been violated or threatened. Would you like to explore what might be behind this feeling, or would you prefer some strategies to help manage intense emotions?",
    "feeling happy": "I'm glad to hear you're feeling happy! Positive emotions are worth celebrating. What's contributing to your good mood today?",
    "feeling confused": "I sense you're feeling confused, which can be uncomfortable. Let's try to bring some clarity to the situation. What specific aspects are you finding difficult to understand?",
    "feeling hopeless": "I hear that you're feeling hopeless right now. That's an incredibly difficult feeling to carry. While I know it may not feel like it at the moment, perspectives can change and difficult periods do pass. What's one small thing that's helped you get through difficult times before?",
    
    // Basic conversation responses
    "greeting": "Hello! I'm Henry, your digital mental health counselor. How are you feeling today?",
    "how are you": "As your digital counselor, I'm here and ready to support you in your mental wellness journey. I'm more interested in how you're doing today?",
    "who are you": "I'm Henry, your digital mental health counselor. I'm designed to provide support, information, and resources for your mental wellness journey. I can understand your emotional states and respond empathetically.",
    "thank you": "You're welcome! I'm glad I could help. Remember, I'm here for you whenever you need support.",
    "help": "I'm here to help. Whether you need information, resources, or just someone to talk to, I'm available. What are you experiencing right now?",
    
    // Additional mental health topics
    "trauma": "Trauma responses can develop after experiencing or witnessing distressing events. Everyone's response to trauma is unique, and healing often involves professional support tailored to your specific needs.",
    "self-care": "Self-care involves intentional activities to take care of your physical, mental, and emotional health. It's not selfish but necessary for wellbeing and can include basic needs, social connection, and enjoyable activities.",
    "mindfulness": "Mindfulness is the practice of paying attention to the present moment without judgment. It can help reduce stress, improve focus, and create space between you and your reactions.",
    "boundaries": "Healthy boundaries are limits you set to protect your wellbeing. They define what behaviors you find acceptable from others and can help you maintain emotional health in relationships.",
    "grief": "Grief is a natural response to loss and can involve a wide range of emotions. There's no right way to grieve, and the process is unique to each person and situation.",
    "panic attack": "Panic attacks involve sudden, intense fear with physical symptoms like racing heart, shortness of breath, and dizziness. Though frightening, they're not dangerous and can be managed with proper techniques and support.",
    "ptsd": "Post-Traumatic Stress Disorder can develop after experiencing trauma. Symptoms may include flashbacks, nightmares, severe anxiety, and uncontrollable thoughts about the event. Effective treatments are available.",
    "addiction": "Addiction is a complex condition involving compulsive substance use or behaviors despite harmful consequences. Recovery typically requires a comprehensive approach including professional support.",
    "insomnia": "Insomnia involves difficulty falling asleep, staying asleep, or both. Good sleep hygiene, cognitive behavioral therapy for insomnia, and sometimes medication can help improve sleep quality."
  };
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?", isUser: false }]);
    }
  }, [isOpen]);
  
  const checkForEmergency = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("kill myself") || 
        lowerMessage.includes("suicide") || 
        lowerMessage.includes("end my life") ||
        lowerMessage.includes("don't want to live") ||
        lowerMessage.includes("want to die")) {
      return true;
    }
    
    return false;
  };

  const checkEmotionalState = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("sad") || lowerMessage.includes("unhappy") || lowerMessage.includes("down") || lowerMessage.includes("blue")) {
      return "feeling sad";
    }
    
    if (lowerMessage.includes("depress")) {
      return "feeling depressed";
    }
    
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("nervous") || lowerMessage.includes("worry") || lowerMessage.includes("stressed")) {
      return "feeling anxious";
    }
    
    if (lowerMessage.includes("overwhelm") || lowerMessage.includes("too much") || lowerMessage.includes("can't handle") || lowerMessage.includes("struggling")) {
      return "feeling overwhelmed";
    }
    
    if (lowerMessage.includes("angry") || lowerMessage.includes("mad") || lowerMessage.includes("furious") || lowerMessage.includes("frustrated")) {
      return "feeling angry";
    }
    
    if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("wonderful")) {
      return "feeling happy";
    }
    
    if (lowerMessage.includes("confused") || lowerMessage.includes("don't understand") || lowerMessage.includes("unclear")) {
      return "feeling confused";
    }
    
    if (lowerMessage.includes("hopeless") || lowerMessage.includes("no point") || lowerMessage.includes("giving up")) {
      return "feeling hopeless";
    }
    
    return null;
  };

  const checkBasicQuestion = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || lowerMessage === "hi" || lowerMessage.includes("hey")) {
      return "greeting";
    }
    
    if (lowerMessage.includes("how are you")) {
      return "how are you";
    }
    
    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
      return "who are you";
    }
    
    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
      return "thank you";
    }
    
    if (lowerMessage === "help" || lowerMessage.includes("need help") || lowerMessage.includes("can you help")) {
      return "help";
    }
    
    return null;
  };
  
  const generateTheoryOfMindResponse = (emotionalState: string, userName?: string) => {
    const name = userName ? `, ${userName}` : "";
    
    // Personalized responses with theory of mind (understanding the user's mental state)
    if (emotionalState === "feeling depressed") {
      return `I understand you're feeling depressed${name}. That's a heavy burden to carry, and you don't have to face it alone. Depression can make everything feel overwhelming and hopeless, but there are ways through this. Would you like me to set up a therapy appointment for you? In the meantime, I can show you some exercises that might help lift that cloud of depression. How does that sound?`;
    }
    
    if (emotionalState === "feeling sad") {
      return `I notice you're feeling sad${name}. It's completely normal to experience sadness sometimes. Would you like to talk about what's bringing you down, or would you prefer some suggestions for activities that might help improve your mood?`;
    }
    
    if (emotionalState === "feeling anxious") {
      return `I can tell you're feeling anxious${name}. Anxiety can be really challenging to deal with. Let's take a moment together - could you try taking a slow, deep breath with me? In through your nose for 4 counts, hold for 1, and out through your mouth for 6. Would you like to try a quick grounding exercise, or would you prefer to explore our anxiety management resources?`;
    }
    
    if (emotionalState === "feeling overwhelmed") {
      return `I can sense that things are feeling too much for you right now${name}. When we're overwhelmed, everything can seem impossible to handle. Let's try to break things down into smaller, more manageable pieces. Would it help to talk about what's contributing to this feeling, or would you prefer some immediate coping strategies?`;
    }
    
    if (emotionalState === "feeling angry") {
      return `I notice you're feeling angry${name}. Anger is often a signal that something important to us has been violated or threatened. It's a perfectly valid emotion. Would you like to explore some healthy ways to express this anger, or would it help to talk about the situation that's causing these feelings?`;
    }
    
    if (emotionalState === "feeling happy") {
      return `I'm glad to hear you're feeling happy${name}! Positive emotions are worth celebrating and savoring. What's contributing to your good mood today? Would you like some suggestions for activities that might help extend these positive feelings?`;
    }
    
    if (emotionalState === "feeling confused") {
      return `I can tell you're feeling confused${name}. That can be an uncomfortable place to be. Let's see if we can bring some clarity to the situation. What specific aspects are you finding difficult to understand? I'm here to help you make sense of things.`;
    }
    
    if (emotionalState === "feeling hopeless") {
      return `I understand you're feeling hopeless right now${name}. That's an incredibly difficult feeling to carry. While I know it may not feel like it at the moment, perspectives can change and difficult periods do pass. What's one small thing that's helped you get through difficult times before? Perhaps we could focus on that as a starting point.`;
    }
    
    return knowledgeBase[emotionalState];
  };
  
  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for emergency
    if (checkForEmergency(message)) {
      return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. These feelings can be overwhelming, but crisis counselors are available 24/7 to help you through this difficult time. Would you like me to help you find additional crisis resources?";
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
    
    // Check knowledge base for mental health topics
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    
    // Check for complex inquiries that need theory of mind understanding
    if (lowerMessage.includes("understand me") || lowerMessage.includes("know how i feel")) {
      return "I aim to understand how you're feeling by carefully considering your words and the emotions behind them. While I don't experience emotions myself, I'm designed to recognize patterns in how people express their feelings and respond with empathy. Would you like to tell me more about what you're experiencing right now?";
    }
    
    if (lowerMessage.includes("mind reading") || lowerMessage.includes("read minds")) {
      return "I can't read minds, but I do try to understand your perspective based on what you share with me. This is similar to how humans develop 'theory of mind' - the ability to understand that others have their own thoughts, feelings, and perspectives. The more you share with me, the better I can understand your unique situation.";
    }
    
    // Navigation requests
    if (lowerMessage.includes("workshops") || lowerMessage.includes("workshop")) {
      return "I can help you explore our workshops! We have sessions on managing anxiety, depression, stress resilience, and more. Would you like me to navigate you to the Workshops page?";
    }
    
    if (lowerMessage.includes("community") || lowerMessage.includes("support group")) {
      return "Our Community Support section is a great place to connect with others who may be experiencing similar challenges. Sharing your journey can provide validation and new perspectives. Would you like me to take you there?";
    }
    
    // Default responses if no matches, with theory of mind approach
    const defaultResponses = [
      "I'm here to support your mental wellness journey. I notice you're reaching out, which takes courage. Could you tell me more about what you're looking for or experiencing?",
      "Thank you for sharing that with me. I'm trying to understand your perspective. How can I best support you right now?",
      "I appreciate you trusting me with your thoughts. Everyone's experience is unique, and I'd like to understand yours better. Could you tell me more about what you're feeling?",
      "I notice you're looking for information. To help you most effectively, could you share a bit more about what you're hoping to find?",
      "I'm listening and trying to understand your situation. Mental health journeys are deeply personal. What specific areas would you like guidance with today?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (message: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    
    // Generate response after a slight delay
    setTimeout(() => {
      const response = generateResponse(message);
      
      setMessages(prev => [...prev, { 
        text: response, 
        isUser: false 
      }]);
      
      toast({
        title: "New message from Henry",
        description: "Henry has responded to your question.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg text-white">Need Help?</DialogTitle>
          <DialogDescription className="text-gray-300">
            Chat with Henry, your digital counselor
          </DialogDescription>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        
        <div className="mt-4 flex justify-center">
          <Button
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-1/2"
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
