
// Define the types for knowledge base entries
export interface KnowledgeBaseEntry {
  patterns: (string | RegExp)[];
  response: string | string[] | (() => string);
}

// Export the knowledge base responses
export const knowledgeBaseResponses: KnowledgeBaseEntry[] = [
  {
    patterns: ['hello', 'hi', 'hey', 'greetings'],
    response: [
      "Hi there! I'm Henry, your mental health companion. How are you feeling today?",
      "Hello! I'm here to support your mental wellbeing. What brings you here today?",
      "Hey! I'm Henry. I'm here to listen and help. How can I support you?"
    ]
  },
  {
    patterns: ['how are you', 'how are you doing', 'how are you feeling'],
    response: [
      "I'm here and ready to support you! How are you feeling today?",
      "I'm doing well, thanks for asking! More importantly, how are you feeling?",
      "I'm here and focused on how I can best help you today. What's on your mind?"
    ]
  },
  {
    patterns: ['feel anxious', 'anxiety', 'feeling anxious', 'panic', 'worried'],
    response: [
      "I understand anxiety can be overwhelming. Would it help to talk about what's triggering these feelings right now?",
      "Anxiety is a common experience, but that doesn't make it any less challenging. Can you share what you're feeling anxious about?",
      "When you're feeling anxious, focusing on your breathing can help. Would you like to try a quick breathing exercise together?"
    ]
  },
  {
    patterns: ['depressed', 'feel sad', 'feeling sad', 'depression', 'hopeless'],
    response: [
      "I'm sorry to hear you're feeling down. Depression affects many people, and your feelings are valid. Have you been able to talk to anyone else about how you're feeling?",
      "When you're feeling depressed, even small tasks can feel overwhelming. What's one small thing you could do today that might bring you a moment of peace?",
      "Depression can make everything feel heavier. I'm here to listen without judgment. Would it help to talk more about what you're experiencing?"
    ]
  },
  {
    patterns: ['stressed', 'stress', 'overwhelmed', 'too much', 'can\'t handle'],
    response: [
      "Feeling overwhelmed is completely understandable. Let's break things down - what's the most pressing thing on your mind right now?",
      "When stress builds up, it can feel like everything is happening at once. Would it help to focus on just one challenge at a time?",
      "Stress affects us both mentally and physically. Have you noticed any physical sensations that come with your stress?"
    ]
  },
  {
    patterns: ['help me', 'need help', 'crisis', 'emergency'],
    response: [
      "I'm here to support you. Can you tell me more about what's happening so I can better understand how to help?",
      "I want to make sure you get the support you need. Could you share a bit more about what you're experiencing right now?",
      "I'm here to listen and help. Please tell me more about what's going on so I can provide the best support."
    ]
  },
  {
    patterns: ['suicide', 'kill myself', 'don\'t want to live', 'end my life', 'better off dead'],
    response: "I'm very concerned about what you're sharing. If you're having thoughts of harming yourself, please reach out to the National Suicide Prevention Lifeline at 988 right away. They have trained counselors available 24/7. Would you like me to provide more crisis resources?"
  },
  {
    patterns: ['thank you', 'thanks', 'helpful', 'appreciate'],
    response: [
      "You're welcome. I'm glad I could help in some way.",
      "I'm here for you anytime you need to talk.",
      "Thank you for sharing with me. It takes courage to open up about mental health."
    ]
  },
  {
    patterns: ['meditation', 'mindfulness', 'relax', 'calm down'],
    response: [
      "Mindfulness can be a powerful tool. Would you like to try a brief breathing exercise together?",
      "Finding moments of calm is important. Have you tried any meditation practices before?",
      "Sometimes taking a few deep breaths can help create space between you and your thoughts. Would you like to try that now?"
    ]
  },
  {
    patterns: ['sleep', 'can\'t sleep', 'insomnia', 'tired'],
    response: [
      "Sleep difficulties can significantly impact mental health. Have you noticed any patterns with your sleep?",
      "Creating a relaxing bedtime routine can help signal your body it's time to rest. What does your current routine look like?",
      "Sleep and mental health are closely connected. Would you like to explore some strategies that might help improve your sleep?"
    ]
  },
  {
    patterns: ['recovery', 'addiction', 'sober', 'substance', 'using'],
    response: [
      "Recovery is a journey, and each step matters. What part of your recovery journey are you finding most challenging right now?",
      "Building a life in recovery involves creating new routines and support systems. What supportive people or activities do you have in your life?",
      "Recovery is personal and unique to each individual. What strategies have you found helpful in maintaining your recovery so far?"
    ]
  }
];
