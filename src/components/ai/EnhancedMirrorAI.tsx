import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Heart, Brain, AlertTriangle, Lightbulb, History, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { z } from 'zod';

const crisisEventSchema = z.object({
  user_id: z.string().uuid(),
  event_type: z.string().min(1).max(100),
  source: z.string().min(1).max(100)
});

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mood?: 'positive' | 'neutral' | 'negative' | 'crisis';
  sentiment?: number;
  recommendations?: string[];
}

interface ConversationSession {
  id: string;
  title: string;
  date: Date;
  messageCount: number;
  moodSummary: string;
}

const EnhancedMirrorAI: React.FC = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [userMoodProfile, setUserMoodProfile] = useState({
    averageMood: 0,
    moodTrend: 'stable',
    riskLevel: 'low',
    lastAssessment: new Date()
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeSession();
    loadConversationHistory();
    loadUserMoodProfile();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    if (!user) return;

    // Create new conversation session
    const sessionId = `session_${Date.now()}`;
    setCurrentSession(sessionId);

    // Add welcome message with personalization
    const welcomeMessage: Message = {
      id: `msg_${Date.now()}`,
      content: `Hello! I'm MirrorAI, your trauma-informed mental health companion. I'm here to provide a safe, supportive space for you to process your thoughts and emotions. How are you feeling today?`,
      isUser: false,
      timestamp: new Date(),
      mood: 'positive'
    };

    setMessages([welcomeMessage]);
  };

  const loadConversationHistory = async () => {
    // Load from local storage for now
    const saved = localStorage.getItem('mirrorAI_conversations');
    if (saved) {
      setConversationHistory(JSON.parse(saved));
    }
  };

  const loadUserMoodProfile = async () => {
    if (!user) return;

    try {
      // Load user's mood data from journal entries and assessments
      const { data: journalData } = await supabase
        .from('journal_entries')
        .select('mood_score, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);

      if (journalData && journalData.length > 0) {
        const avgMood = journalData.reduce((sum, entry) => sum + (entry.mood_score || 5), 0) / journalData.length;
        const recentEntries = journalData.slice(0, 7);
        const olderEntries = journalData.slice(7, 14);
        
        const recentAvg = recentEntries.reduce((sum, entry) => sum + (entry.mood_score || 5), 0) / recentEntries.length;
        const olderAvg = olderEntries.length > 0 ? olderEntries.reduce((sum, entry) => sum + (entry.mood_score || 5), 0) / olderEntries.length : recentAvg;
        
        let trend = 'stable';
        if (recentAvg > olderAvg + 0.5) trend = 'improving';
        else if (recentAvg < olderAvg - 0.5) trend = 'declining';

        let riskLevel = 'low';
        if (avgMood < 3) riskLevel = 'high';
        else if (avgMood < 4) riskLevel = 'medium';

        setUserMoodProfile({
          averageMood: avgMood,
          moodTrend: trend,
          riskLevel,
          lastAssessment: new Date(journalData[0].created_at)
        });
      }
    } catch (error) {
      console.error('Error loading mood profile:', error);
    }
  };

  const analyzeSentiment = (text: string): { mood: 'positive' | 'neutral' | 'negative' | 'crisis', sentiment: number, recommendations: string[] } => {
    const lowerText = text.toLowerCase();
    
    // Crisis indicators
    const crisisKeywords = ['suicide', 'kill myself', 'want to die', 'end it all', 'hurt myself', 'self harm'];
    const hasCrisisIndicators = crisisKeywords.some(keyword => lowerText.includes(keyword));
    
    if (hasCrisisIndicators) {
      return {
        mood: 'crisis',
        sentiment: 1,
        recommendations: [
          'Please reach out to a crisis hotline immediately: 988 (Suicide & Crisis Lifeline)',
          'Consider contacting emergency services if you are in immediate danger',
          'Speak with a trusted friend, family member, or mental health professional'
        ]
      };
    }

    // Negative indicators
    const negativeKeywords = ['sad', 'depressed', 'anxious', 'worried', 'upset', 'angry', 'frustrated', 'hopeless', 'lonely'];
    const negativeCount = negativeKeywords.filter(keyword => lowerText.includes(keyword)).length;

    // Positive indicators
    const positiveKeywords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'grateful', 'thankful', 'excited', 'calm'];
    const positiveCount = positiveKeywords.filter(keyword => lowerText.includes(keyword)).length;

    const sentiment = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);
    
    let mood: 'positive' | 'neutral' | 'negative' = 'neutral';
    let recommendations: string[] = [];

    if (sentiment > 0.3) {
      mood = 'positive';
      recommendations = [
        'It\'s wonderful to hear you\'re feeling positive!',
        'Consider exploring our gratitude exercises to maintain this mood',
        'Share your positive experience in our support community'
      ];
    } else if (sentiment < -0.3) {
      mood = 'negative';
      recommendations = [
        'Try some breathing exercises or mindfulness meditation',
        'Consider journaling about your feelings',
        'Reach out to a friend or counselor for support'
      ];
    } else {
      recommendations = [
        'Take some time for self-reflection today',
        'Try a short mindfulness exercise',
        'Consider setting a small goal for yourself'
      ];
    }

    return { mood, sentiment, recommendations };
  };

  const generateContextualPrompt = (userMessage: string, userMood: typeof userMoodProfile): string => {
    let systemPrompt = `You are MirrorAI, a trauma-informed AI therapist. The user has shared: "${userMessage}". 

User's mood profile:
- Average mood: ${userMood.averageMood}/10 
- Trend: ${userMood.moodTrend}
- Risk level: ${userMood.riskLevel}

Respond with empathy, validation, and appropriate therapeutic techniques. If the user seems in crisis, immediately direct them to professional help. Keep responses concise but meaningful.`;

    if (userMood.riskLevel === 'high') {
      systemPrompt += ` 

IMPORTANT: This user has shown concerning mood patterns. Be extra supportive and consider recommending professional help.`;
    }

    return systemPrompt;
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content: currentInput,
      isUser: true,
      timestamp: new Date()
    };

    const analysis = analyzeSentiment(currentInput);
    userMessage.mood = analysis.mood;
    userMessage.sentiment = analysis.sentiment;
    userMessage.recommendations = analysis.recommendations;

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsLoading(true);

    try {
      // Handle crisis situation
      if (analysis.mood === 'crisis') {
        const crisisResponse: Message = {
          id: `msg_${Date.now() + 1}`,
          content: `I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to the National Suicide Prevention Lifeline at 988 or text "HELLO" to 741741 for the Crisis Text Line. If you're in immediate danger, please call 911. You don't have to go through this alone - there are people who want to help you.`,
          isUser: false,
          timestamp: new Date(),
          mood: 'crisis',
          recommendations: analysis.recommendations
        };

        setMessages(prev => [...prev, crisisResponse]);
        
        toast({
          title: "Crisis Support Available",
          description: "Please reach out to crisis services immediately. Your safety matters.",
          variant: "destructive",
        });

        // Log crisis event
        if (user?.id) {
          const eventData = {
            user_id: user.id,
            event_type: 'ai_chat_crisis',
            source: 'mirror_ai'
          };
          const validationResult = crisisEventSchema.safeParse(eventData);
          if (validationResult.success) {
            await supabase.from('crisis_events').insert([eventData]);
          }
        }

        setIsLoading(false);
        return;
      }

      // Generate contextual system prompt
      const systemPrompt = generateContextualPrompt(currentInput, userMoodProfile);

      // Call MirrorAI with enhanced context
      const { data, error } = await supabase.functions.invoke('mirror-ai-chat', {
        body: {
          message: currentInput,
          systemPrompt: systemPrompt,
          conversationContext: messages.slice(-10).map(msg => `${msg.isUser ? 'User' : 'MirrorAI'}: ${msg.content}`)
        }
      });

      if (error) throw error;

      const aiResponse: Message = {
        id: `msg_${Date.now() + 2}`,
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        mood: analysis.mood,
        recommendations: analysis.recommendations
      };

      setMessages(prev => [...prev, aiResponse]);

      // Save conversation to local storage
      if (currentSession) {
        const conversations = JSON.parse(localStorage.getItem('mirrorAI_conversations') || '[]');
        const existingIndex = conversations.findIndex(c => c.id === currentSession);
        const sessionData = {
          id: currentSession,
          title: `Conversation ${new Date().toLocaleDateString()}`,
          date: new Date(),
          messageCount: messages.length + 2,
          moodSummary: analysis.mood
        };
        
        if (existingIndex >= 0) {
          conversations[existingIndex] = sessionData;
        } else {
          conversations.unshift(sessionData);
        }
        
        localStorage.setItem('mirrorAI_conversations', JSON.stringify(conversations.slice(0, 10)));
        setConversationHistory(conversations.slice(0, 10));
      }

    } catch (error) {
      console.error('Error calling MirrorAI:', error);
      toast({
        title: "Connection Error",
        description: "I'm having trouble responding right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportConversation = () => {
    const conversationText = messages.map(msg => 
      `${msg.isUser ? 'You' : 'MirrorAI'} (${msg.timestamp.toLocaleTimeString()}): ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mirror-ai-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Conversation Exported",
      description: "Your conversation has been saved to your device.",
    });
  };

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      case 'crisis': return 'text-red-700 dark:text-red-300';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with User Mood Profile */}
        <Card className="bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  Enhanced MirrorAI
                </CardTitle>
                <p className="text-muted-foreground">Your trauma-informed AI companion with personalized insights</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportConversation}
                  disabled={messages.length <= 1}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            {/* Mood Profile Display */}
            <div className="flex gap-4 mt-4">
              <Badge variant={userMoodProfile.riskLevel === 'high' ? 'destructive' : userMoodProfile.riskLevel === 'medium' ? 'secondary' : 'default'}>
                Risk Level: {userMoodProfile.riskLevel}
              </Badge>
              <Badge variant="outline">
                Trend: {userMoodProfile.moodTrend}
              </Badge>
              <Badge variant="outline">
                Avg Mood: {userMoodProfile.averageMood.toFixed(1)}/10
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Conversation History Panel */}
        {showHistory && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {conversationHistory.map(session => (
                  <div key={session.id} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded cursor-pointer">
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-muted-foreground">{session.date.toLocaleDateString()}</p>
                    </div>
                    <Badge variant="outline">{session.messageCount} messages</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Interface */}
        <Card className="flex-1">
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8">
                      {message.isUser ? (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className={`flex-1 max-w-[80%] ${message.isUser ? 'text-right' : ''}`}>
                      <div className={`p-4 rounded-lg ${
                        message.isUser 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p>{message.content}</p>
                        {message.mood && !message.isUser && (
                          <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                            <Heart className="h-3 w-3" />
                            <span className={getMoodColor(message.mood)}>
                              {message.mood}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Show recommendations for crisis or concerning messages */}
                      {message.recommendations && message.recommendations.length > 0 && !message.isUser && (
                        <div className="mt-2 p-3 bg-accent/20 rounded-lg">
                          <div className="flex items-center gap-2 text-sm font-medium mb-2">
                            <Lightbulb className="h-4 w-4" />
                            Recommendations
                          </div>
                          <ul className="space-y-1 text-sm">
                            {message.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Share your thoughts and feelings..."
                  className="min-h-[80px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() || isLoading}
                  size="sm"
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {userMoodProfile.riskLevel !== 'low' && (
                <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>If you're in crisis, please call 988 (Suicide & Crisis Lifeline) immediately.</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedMirrorAI;