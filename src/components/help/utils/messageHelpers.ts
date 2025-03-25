
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
