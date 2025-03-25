
export const checkForEmergency = (message: string): string[] => {
  const lowerMessage = message.toLowerCase();
  const emergencyKeywords = [
    'suicide', 
    'kill myself', 
    'want to die', 
    'end my life',
    'better off dead',
    'hurt myself',
    'self-harm',
    'crisis', 
    'emergency',
    'severe depression',
    'can\'t go on'
  ];
  
  const matches = emergencyKeywords.filter(keyword => 
    lowerMessage.includes(keyword)
  );
  
  return matches;
};

export const saveConversationToLocalStorage = (messages: any[]) => {
  try {
    const existingConversations = JSON.parse(localStorage.getItem('henryConversations') || '[]');
    const newConversation = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      messages
    };
    
    existingConversations.push(newConversation);
    localStorage.setItem('henryConversations', JSON.stringify(existingConversations));
    return true;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return false;
  }
};

export const getStoredConversations = () => {
  try {
    return JSON.parse(localStorage.getItem('henryConversations') || '[]');
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    return [];
  }
};

export const analyzeSentiment = (message: string): 'positive' | 'negative' | 'neutral' => {
  const lowerMessage = message.toLowerCase();
  
  // Basic sentiment analysis
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'better', 'joy', 'excited', 'love', 'appreciate'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'worse', 'depressed', 'anxious', 'worried', 'stressed', 'angry', 'hate'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerMessage.includes(word)) {
      positiveScore++;
    }
  });
  
  negativeWords.forEach(word => {
    if (lowerMessage.includes(word)) {
      negativeScore++;
    }
  });
  
  if (positiveScore > negativeScore) {
    return 'positive';
  } else if (negativeScore > positiveScore) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

// Add the missing exported functions
export const checkEmotionalState = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emotional states
  const emotionalStates = {
    'anxious': ['anxious', 'nervous', 'worry', 'worried', 'anxiety', 'panic', 'tense', 'uneasy'],
    'sad': ['sad', 'depressed', 'down', 'unhappy', 'blue', 'miserable', 'heartbroken', 'grief'],
    'angry': ['angry', 'mad', 'frustrated', 'annoyed', 'irritated', 'furious', 'rage', 'upset'],
    'happy': ['happy', 'joy', 'joyful', 'excited', 'delighted', 'pleased', 'content', 'elated'],
    'confused': ['confused', 'unsure', 'uncertain', 'puzzled', 'perplexed', 'bewildered', 'unclear'],
    'overwhelmed': ['overwhelmed', 'stressed', 'exhausted', 'burnout', 'too much', 'burden', 'pressure'],
    'lonely': ['lonely', 'alone', 'isolated', 'abandoned', 'disconnected', 'rejected']
  };
  
  for (const [state, keywords] of Object.entries(emotionalStates)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return state;
      }
    }
  }
  
  return null;
};

export const checkBasicQuestion = (message: string): string | null => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Patterns for common question types
  const basicQuestions = {
    'greeting': [/^hi\b/, /^hello\b/, /^hey\b/, /^howdy\b/, /^greetings\b/, /^what's up\b/, /^how are you\b/],
    'identity': [/who are you/, /what are you/, /what is your name/, /what do you do/],
    'capabilities': [/what can you do/, /how can you help/, /what do you know/, /what are your features/],
    'help': [/^help\b/, /can you help/, /i need help/, /how do i/],
    'thanks': [/^thank/, /^thanks/, /appreciate/],
    'goodbye': [/^bye\b/, /^goodbye\b/, /see you later/, /talk to you later/, /^farewell\b/]
  };
  
  for (const [type, patterns] of Object.entries(basicQuestions)) {
    for (const pattern of patterns) {
      if (pattern instanceof RegExp) {
        if (pattern.test(lowerMessage)) {
          return type;
        }
      } else if (typeof pattern === 'string' && lowerMessage.includes(pattern)) {
        return type;
      }
    }
  }
  
  return null;
};
