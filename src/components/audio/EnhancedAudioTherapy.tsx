import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, RotateCcw, Volume2, HeadphonesIcon, 
  Brain, Heart, Waves, Moon, Focus, Smile,
  Timer, Settings, Download, Star
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BinauralBeatPlayer from '@/components/binaural/BinauralBeatPlayer';

interface AudioSession {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'sleep' | 'focus' | 'anxiety' | 'depression' | 'healing';
  duration: number; // in minutes
  frequencies: {
    base: number;
    binaural: number;
  };
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  backgroundSound?: 'rain' | 'ocean' | 'forest' | 'white-noise' | 'silence';
}

interface UserProgress {
  totalSessions: number;
  totalMinutes: number;
  favoriteCategories: string[];
  streakDays: number;
  completedSessions: string[];
  achievements: string[];
}

const EnhancedAudioTherapy: React.FC = () => {
  const { toast } = useToast();
  const [currentSession, setCurrentSession] = useState<AudioSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [sessionTime, setSessionTime] = useState(0);
  const [customDuration, setCustomDuration] = useState(20);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalSessions: 0,
    totalMinutes: 0,
    favoriteCategories: [],
    streakDays: 0,
    completedSessions: [],
    achievements: []
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sessionTimerRef = useRef<NodeJS.Timeout>();

  const audioSessions: AudioSession[] = [
    {
      id: 'deep-relaxation',
      title: 'Deep Relaxation',
      description: 'Alpha waves (8-12 Hz) for profound relaxation and stress relief',
      category: 'meditation',
      duration: 20,
      frequencies: { base: 200, binaural: 10 },
      benefits: ['Stress reduction', 'Muscle relaxation', 'Mental clarity'],
      difficulty: 'beginner',
      icon: <Heart className="h-5 w-5" />,
      backgroundSound: 'rain'
    },
    {
      id: 'focus-enhancement',
      title: 'Focus Enhancement',
      description: 'Beta waves (14-30 Hz) to improve concentration and cognitive performance',
      category: 'focus',
      duration: 30,
      frequencies: { base: 200, binaural: 20 },
      benefits: ['Enhanced focus', 'Better productivity', 'Mental alertness'],
      difficulty: 'intermediate',
      icon: <Focus className="h-5 w-5" />,
      backgroundSound: 'white-noise'
    },
    {
      id: 'anxiety-relief',
      title: 'Anxiety Relief',
      description: 'Theta waves (4-8 Hz) for calming anxiety and promoting emotional balance',
      category: 'anxiety',
      duration: 25,
      frequencies: { base: 200, binaural: 6 },
      benefits: ['Reduced anxiety', 'Emotional balance', 'Inner peace'],
      difficulty: 'beginner',
      icon: <Waves className="h-5 w-5" />,
      backgroundSound: 'ocean'
    },
    {
      id: 'deep-sleep',
      title: 'Deep Sleep Induction',
      description: 'Delta waves (0.5-4 Hz) for restful sleep and healing',
      category: 'sleep',
      duration: 45,
      frequencies: { base: 200, binaural: 2 },
      benefits: ['Better sleep quality', 'Faster sleep onset', 'Body healing'],
      difficulty: 'beginner',
      icon: <Moon className="h-5 w-5" />,
      backgroundSound: 'rain'
    },
    {
      id: 'mood-boost',
      title: 'Mood Enhancement',
      description: 'Gamma waves (30-100 Hz) for elevated mood and positive emotions',
      category: 'depression',
      duration: 15,
      frequencies: { base: 200, binaural: 40 },
      benefits: ['Improved mood', 'Increased energy', 'Emotional uplift'],
      difficulty: 'intermediate',
      icon: <Smile className="h-5 w-5" />,
      backgroundSound: 'forest'
    },
    {
      id: 'healing-meditation',
      title: 'Healing Meditation',
      description: 'Mixed frequencies for holistic healing and restoration',
      category: 'healing',
      duration: 35,
      frequencies: { base: 200, binaural: 8 },
      benefits: ['Physical healing', 'Emotional recovery', 'Energy restoration'],
      difficulty: 'advanced',
      icon: <Brain className="h-5 w-5" />,
      backgroundSound: 'ocean'
    }
  ];

  useEffect(() => {
    loadUserProgress();
    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, []);

  const loadUserProgress = () => {
    const saved = localStorage.getItem('audioTherapyProgress');
    if (saved) {
      setUserProgress(JSON.parse(saved));
    }
  };

  const saveUserProgress = (newProgress: UserProgress) => {
    localStorage.setItem('audioTherapyProgress', JSON.stringify(newProgress));
    setUserProgress(newProgress);
  };

  const startSession = (session: AudioSession) => {
    setCurrentSession(session);
    setIsPlaying(true);
    setSessionTime(0);

    // Start session timer
    sessionTimerRef.current = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        if (newTime >= (customDuration * 60)) {
          completeSession(session);
          return prev;
        }
        return newTime;
      });
    }, 1000);

    toast({
      title: "Session Started",
      description: `Beginning ${session.title} - ${customDuration} minutes`,
    });
  };

  const pauseSession = () => {
    setIsPlaying(false);
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
    }
  };

  const resumeSession = () => {
    if (currentSession) {
      setIsPlaying(true);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          if (newTime >= (customDuration * 60)) {
            completeSession(currentSession);
            return prev;
          }
          return newTime;
        });
      }, 1000);
    }
  };

  const stopSession = () => {
    setIsPlaying(false);
    setCurrentSession(null);
    setSessionTime(0);
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
    }
  };

  const completeSession = (session: AudioSession) => {
    setIsPlaying(false);
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
    }

    const newProgress = {
      ...userProgress,
      totalSessions: userProgress.totalSessions + 1,
      totalMinutes: userProgress.totalMinutes + customDuration,
      completedSessions: [...userProgress.completedSessions, session.id]
    };

    // Check for achievements
    const newAchievements = [...userProgress.achievements];
    if (newProgress.totalSessions === 1 && !newAchievements.includes('first-session')) {
      newAchievements.push('first-session');
    }
    if (newProgress.totalSessions === 10 && !newAchievements.includes('dedicated-practitioner')) {
      newAchievements.push('dedicated-practitioner');
    }
    if (newProgress.totalMinutes >= 300 && !newAchievements.includes('meditation-master')) {
      newAchievements.push('meditation-master');
    }

    newProgress.achievements = newAchievements;
    saveUserProgress(newProgress);

    toast({
      title: "Session Complete! 🎉",
      description: `You've completed ${session.title}. Great work!`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meditation': return <Heart className="h-4 w-4" />;
      case 'sleep': return <Moon className="h-4 w-4" />;
      case 'focus': return <Focus className="h-4 w-4" />;
      case 'anxiety': return <Waves className="h-4 w-4" />;
      case 'depression': return <Smile className="h-4 w-4" />;
      case 'healing': return <Brain className="h-4 w-4" />;
      default: return <HeadphonesIcon className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredSessions = selectedCategory === 'all' 
    ? audioSessions 
    : audioSessions.filter(session => session.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Enhanced Audio Therapy</h1>
          <p className="text-muted-foreground text-lg">Binaural beats and soundscapes for mental wellness</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <HeadphonesIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{userProgress.totalSessions}</p>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Timer className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{userProgress.totalMinutes}</p>
              <p className="text-sm text-muted-foreground">Minutes Practiced</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{userProgress.achievements.length}</p>
              <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Waves className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{userProgress.streakDays}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Session Player */}
        {currentSession && (
          <Card className="bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentSession.icon}
                Now Playing: {currentSession.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  size="lg"
                  onClick={isPlaying ? pauseSession : resumeSession}
                  className="h-16 w-16 rounded-full"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={stopSession}
                  className="h-16 w-16 rounded-full"
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{formatTime(sessionTime)}</span>
                  <span>{formatTime(customDuration * 60)}</span>
                </div>
                <Progress value={(sessionTime / (customDuration * 60)) * 100} className="h-2" />
              </div>

              <div className="flex items-center space-x-4">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm w-12">{volume}%</span>
              </div>

              {/* Binaural Beat Player Component */}
              {currentSession && (
                <div className="mt-6">
                  <BinauralBeatPlayer
                    track={{
                      id: currentSession.id,
                      title: currentSession.title,
                      description: currentSession.description,
                      imageUrl: '/placeholder.svg',
                      audioUrl: '',
                      baseFrequency: currentSession.frequencies.base,
                      targetFrequency: currentSession.frequencies.base + currentSession.frequencies.binaural,
                      duration: `${customDuration}:00`,
                      category: currentSession.category
                    }}
                    onNext={() => {}}
                    onPrevious={() => {}}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Session Selection */}
        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions">Audio Sessions</TabsTrigger>
            <TabsTrigger value="custom">Custom Sessions</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Sessions
              </Button>
              {['meditation', 'sleep', 'focus', 'anxiety', 'depression', 'healing'].map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {getCategoryIcon(category)}
                  <span className="capitalize">{category}</span>
                </Button>
              ))}
            </div>

            {/* Session Duration Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Session Duration:</span>
                  <Slider
                    value={[customDuration]}
                    onValueChange={(value) => setCustomDuration(value[0])}
                    min={5}
                    max={60}
                    step={5}
                    className="flex-1 max-w-sm"
                  />
                  <span className="w-20 text-sm">{customDuration} minutes</span>
                </div>
              </CardContent>
            </Card>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map(session => (
                <Card key={session.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {session.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <Badge className={getDifficultyColor(session.difficulty)}>
                            {session.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(session.category)}
                        {session.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Benefits:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {session.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Frequency: {session.frequencies.binaural} Hz</span>
                      <span>Default: {session.duration} min</span>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => startSession(session)}
                      disabled={isPlaying && currentSession?.id === session.id}
                    >
                      {isPlaying && currentSession?.id === session.id ? 'Playing...' : 'Start Session'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Base Frequency (Hz)</label>
                      <Slider defaultValue={[200]} min={100} max={800} step={10} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Binaural Beat Frequency (Hz)</label>
                      <Slider defaultValue={[10]} min={0.5} max={40} step={0.5} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                      <Slider defaultValue={[20]} min={5} max={120} step={5} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Background Sound</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['silence', 'rain', 'ocean', 'forest', 'white-noise'].map(sound => (
                          <Button key={sound} variant="outline" size="sm" className="capitalize">
                            {sound.replace('-', ' ')}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Create & Start Custom Session</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'first-session', title: 'First Session', description: 'Complete your first audio therapy session' },
                      { id: 'dedicated-practitioner', title: 'Dedicated Practitioner', description: 'Complete 10 sessions' },
                      { id: 'meditation-master', title: 'Meditation Master', description: 'Practice for 300+ minutes' }
                    ].map(achievement => (
                      <div key={achievement.id} className={`p-3 rounded-lg ${userProgress.achievements.includes(achievement.id) ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <div className="flex items-center gap-3">
                          <Star className={`h-5 w-5 ${userProgress.achievements.includes(achievement.id) ? 'text-green-600' : 'text-gray-400'}`} />
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProgress.completedSessions.slice(-10).reverse().map((sessionId, index) => {
                      const session = audioSessions.find(s => s.id === sessionId);
                      if (!session) return null;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            {session.icon}
                            <span className="font-medium">{session.title}</span>
                          </div>
                          <Badge variant="outline">{session.category}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAudioTherapy;