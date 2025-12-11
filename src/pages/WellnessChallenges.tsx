import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft, Brain, Heart, Activity, CheckCircle, Award, Clock, Bell, HelpCircle } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import TutorialButton from "@/components/tutorials/TutorialButton";

const WellnessChallenges: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'wellness' | 'mental' | 'completed'>('wellness');
  const [points, setPoints] = useState<number>(75);
  const [showPointsDialog, setShowPointsDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderSettings, setReminderSettings] = useState({
    morning: true,
    afternoon: false,
    evening: true,
    notifications: true
  });
  const [pointsHistory, setPointsHistory] = useState<{date: string, action: string, points: number}[]>([
    {date: "Today", action: "Completed Meditation Challenge", points: 10},
    {date: "Today", action: "Completed Stress-Relief Exercise", points: 10},
    {date: "Yesterday", action: "Weekly Challenge Bonus", points: 25},
    {date: "2 days ago", action: "Completed 3 Challenges", points: 30},
  ]);

  useEffect(() => {
    if (location.state && location.state.initialTab) {
      setActiveTab(location.state.initialTab);
    }
  }, [location.state]);

  const wellnessChallenges = [
    {
      id: "meditation",
      title: "10-Minute Mindful Meditation",
      description: "Take a moment to center yourself with a guided meditation",
      icon: Brain,
      completed: true,
      category: "Mindfulness",
      points: 10
    },
    {
      id: "gratitude",
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today",
      icon: Heart,
      completed: false,
      category: "Emotional Wellbeing",
      points: 10
    },
    {
      id: "hydration",
      title: "Hydration Tracker",
      description: "Drink 8 glasses of water throughout the day",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 10
    },
    {
      id: "stretching",
      title: "Morning Stretching Routine",
      description: "Complete a 5-minute stretching routine when you wake up",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 10
    },
    {
      id: "nutrition",
      title: "Balanced Meal Planning",
      description: "Plan three balanced meals for tomorrow",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 10
    },
    {
      id: "digital-detox",
      title: "Digital Detox Hour",
      description: "Spend one hour away from all screens",
      icon: Brain,
      completed: false,
      category: "Mindfulness",
      points: 10
    }
  ];

  const mentalHealthChallenges = [
    {
      id: "affirmations",
      title: "Positive Affirmations",
      description: "Repeat 5 positive affirmations to yourself",
      icon: Heart,
      completed: false,
      category: "Emotional Wellbeing",
      points: 10
    },
    {
      id: "stress-relief",
      title: "Stress-Relief Exercise",
      description: "Practice 5 minutes of deep breathing",
      icon: Brain,
      completed: true,
      category: "Mindfulness",
      points: 10
    },
    {
      id: "mindful-walk",
      title: "Mindful Walk",
      description: "Take a 15-minute walk focusing on your surroundings",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 10
    },
    {
      id: "negative-thought",
      title: "Challenge Negative Thoughts",
      description: "Identify and reframe one negative thought pattern",
      icon: Brain,
      completed: false,
      category: "Cognitive Health",
      points: 10
    },
    {
      id: "boundary-setting",
      title: "Practice Boundary Setting",
      description: "Identify one boundary you need to establish and plan how to communicate it",
      icon: Heart,
      completed: false,
      category: "Social Health",
      points: 10
    },
    {
      id: "emotional-awareness",
      title: "Emotional Awareness Check-in",
      description: "Take 5 minutes to identify and name the emotions you're experiencing right now",
      icon: Heart,
      completed: false,
      category: "Emotional Wellbeing",
      points: 10
    }
  ];

  const completedChallenges = [
    ...wellnessChallenges.filter(c => c.completed),
    ...mentalHealthChallenges.filter(c => c.completed)
  ];

  const getActiveChallenges = () => {
    switch(activeTab) {
      case 'wellness':
        return wellnessChallenges;
      case 'mental':
        return mentalHealthChallenges;
      case 'completed':
        return completedChallenges;
      default:
        return wellnessChallenges;
    }
  };

  const handleBack = () => {
    if (id) {
      navigate("/app/wellness-challenges");
    } else {
      navigate("/app/dashboard");
    }
  };

  const toggleChallengeCompletion = (id: string) => {
    const allChallenges = [...wellnessChallenges, ...mentalHealthChallenges];
    const challenge = allChallenges.find(c => c.id === id);

    if (!challenge) return;

    if (!challenge.completed) {
      setPoints(prev => prev + challenge.points);
      setPointsHistory(prev => [
        {date: "Just now", action: `Completed ${challenge.title}`, points: challenge.points},
        ...prev
      ]);

      toast({
        title: "Challenge Completed!",
        description: `You earned +${challenge.points} points!`,
        duration: 3000
      });
    }
  };

  const handleRedeemPoints = () => {
    const creditsToRedeem = Math.floor(points / 5000);

    if (creditsToRedeem < 1) {
      toast({
        title: "Not enough points",
        description: `You need at least 5,000 points to redeem $1 in co-pay credits.`,
        variant: "destructive"
      });
      return;
    }

    const pointsToDeduct = creditsToRedeem * 5000;
    const remainingPoints = points - pointsToDeduct;

    setPoints(remainingPoints);

    toast({
      title: "Points Redeemed Successfully!",
      description: `You've converted ${pointsToDeduct} points into $${creditsToRedeem} co-pay credits.`,
    });

    setPointsHistory(prev => [
      {date: "Just now", action: `Redeemed for Co-Pay Credits`, points: -pointsToDeduct},
      ...prev
    ]);

    setShowPointsDialog(false);
  };

  const handleUpdateReminders = () => {
    toast({
      title: "Reminders Updated",
      description: "Your self-care reminder preferences have been saved.",
      duration: 3000
    });

    setShowReminderDialog(false);
  };

  if (id) {
    const challenge = [...wellnessChallenges, ...mentalHealthChallenges].find(c => c.id === id);

    if (!challenge) {
      return (
        <Page title="Challenge Not Found" returnToMain={true}>
          <div className="p-6">
            <p className="text-gray-300">The requested challenge could not be found.</p>
          </div>
        </Page>
      );
    }

    return (
      <Page title={`${challenge.title} - Challenge`} onBackClick={handleBack}>
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <TutorialButton featureId="wellness-challenges" />
            </div>
            
            <div className="bg-[#2a2a3c]/80 rounded-xl p-6 mb-6">
              <div className="flex items-start mb-6">
                <div className={`p-4 rounded-lg mr-4 ${challenge.completed ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                  <challenge.icon className={`h-8 w-8 ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`} />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
                  <span className="inline-block bg-[#3a3a4c] text-xs text-gray-300 px-2 py-1 rounded">
                    {challenge.category}
                  </span>
                  <p className="text-gray-300 mt-3">{challenge.description}</p>
                </div>
              </div>
              
              <div className="bg-[#1e1e2c] rounded-lg p-5">
                <h3 className="text-lg font-medium text-white mb-3">How to Complete This Challenge</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                    <span>Set aside dedicated time in your day for this activity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                    <span>Find a quiet, comfortable space where you won't be interrupted</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                    <span>Follow the activity instructions and be present during the exercise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                    <span>Mark the challenge as complete once you've finished</span>
                  </li>
                </ol>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <span className="text-amber-400 text-lg font-medium">+{challenge.points} points</span>
                  <p className="text-sm text-gray-400">Complete this challenge to earn points</p>
                </div>
                
                <button 
                  onClick={() => toggleChallengeCompletion(challenge.id)}
                  className={`px-5 py-3 rounded-xl flex items-center ${
                    challenge.completed 
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
                  } transition-colors`}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {challenge.completed ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>
            </div>
            
            <div className="bg-[#2a2a3c]/80 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Self-Care Reminders</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/30 text-indigo-300"
                  onClick={() => setShowReminderDialog(true)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
              </div>
              <p className="text-gray-300 mb-4">
                Don't forget to take care of yourself! Set up reminders to ensure you complete this challenge and take time for self-care.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="h-4 w-4 text-indigo-300" />
                <span>Current reminder: {reminderSettings.morning ? 'Morning' : ''} {reminderSettings.afternoon ? 'Afternoon' : ''} {reminderSettings.evening ? 'Evening' : ''}</span>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <Dialog open={showPointsDialog} onOpenChange={setShowPointsDialog}>
          <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Redeem Points for Rewards</DialogTitle>
              <DialogDescription className="text-gray-300">
                Convert your earned points into co-pay credits
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-[50vh] max-h-[400px] pr-4 -mr-4">
              <div className="py-4">
                <div className="bg-[#1e1e2c] rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Available Points</span>
                    <span className="text-amber-400 font-bold text-lg">{points}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Redeemable Co-Pay Credits</span>
                    <span className="text-green-400 font-bold text-lg">${Math.floor(points/5000)}</span>
                  </div>
                  <Progress value={(points % 5000) / 50} className="h-2 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  </Progress>
                  <p className="text-xs text-gray-400 mt-2">
                    {5000 - (points % 5000)} more points until your next co-pay credit
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-white mb-2">Points Conversion</h4>
                  <p className="text-gray-300 text-sm">
                    • Every 5,000 points = $1 in co-pay credits<br />
                    • 10,000 points = $2 in co-pay credits<br />
                    • 25,000 points = $5 in co-pay credits<br />
                    • Credits can be used for therapy sessions or at Thrive Apparel<br />
                    • Daily Challenges = 10 points each<br />
                    • Weekly Bonus = 25 points<br />
                    • Monthly Completion = 100 points
                  </p>
                </div>
              </div>
            </ScrollArea>
            
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowPointsDialog(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRedeemPoints}
                disabled={points < 5000}
                className="bg-amber-500 hover:bg-amber-600 text-black"
              >
                Redeem Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
          <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Self-Care Reminders</DialogTitle>
              <DialogDescription className="text-gray-300">
                Set up reminders to complete your wellness challenges
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-[60vh] max-h-[500px] pr-4 -mr-4">
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Reminder Time</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="morning" 
                        checked={reminderSettings.morning}
                        onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, morning: checked}))}
                      />
                      <Label htmlFor="morning" className="text-gray-300">Morning (8:00 AM)</Label>
                    </div>
                    <Bell className="h-4 w-4 text-amber-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="afternoon" 
                        checked={reminderSettings.afternoon} 
                        onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, afternoon: checked}))}
                      />
                      <Label htmlFor="afternoon" className="text-gray-300">Afternoon (1:00 PM)</Label>
                    </div>
                    <Bell className="h-4 w-4 text-amber-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="evening" 
                        checked={reminderSettings.evening} 
                        onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, evening: checked}))}
                      />
                      <Label htmlFor="evening" className="text-gray-300">Evening (7:00 PM)</Label>
                    </div>
                    <Bell className="h-4 w-4 text-amber-400" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Notification Settings</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="notifications" 
                        checked={reminderSettings.notifications} 
                        onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, notifications: checked}))}
                      />
                      <Label htmlFor="notifications" className="text-gray-300">Push Notifications</Label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/20">
                  <h4 className="font-medium text-white mb-2">Self-Care Tip</h4>
                  <p className="text-gray-300 text-sm">
                    Consistency is key to building healthy habits. Setting regular reminders helps you prioritize self-care and mental wellness.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Custom Self-Care Reminders</h4>
                  <div className="space-y-2 bg-[#1e1e2c] p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-indigo-500 mr-3"></div>
                      <p className="text-gray-300">Take deep breaths when feeling overwhelmed</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                      <p className="text-gray-300">Drink water throughout the day</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-amber-500 mr-3"></div>
                      <p className="text-gray-300">Stretch for 5 minutes every hour</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                      <p className="text-gray-300">Practice gratitude before bed</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <DialogFooter>
              <Button 
                onClick={handleUpdateReminders}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Save Reminder Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Page>
    );
  }

  return (
    <Page title="Daily Wellness Challenges" onBackClick={handleBack}>
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pb-16">
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Daily Challenges</h1>
                <p className="text-gray-300 mb-4">
                  Complete daily challenges to improve your mental and physical wellbeing.
                </p>
                <TutorialButton featureId="wellness-challenges" className="mb-4" />
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2 items-center mb-1">
                  <span className="text-amber-400 font-bold text-xl">{points}</span>
                  <Award className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                    onClick={() => setShowReminderDialog(true)}
                  >
                    <Bell className="h-3.5 w-3.5 mr-1.5" />
                    Reminders
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                    onClick={() => setShowPointsDialog(true)}
                  >
                    <Award className="h-3.5 w-3.5 mr-1.5" />
                    Rewards
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl p-5 mb-8 border border-amber-500/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1 flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-400" />
                    Rewards Progress
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">Every 5,000 points = $1 co-pay credit</p>
                </div>
                
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300">Today:</span>
                    <span className="text-white font-medium">+20 points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300">This Week:</span>
                    <span className="text-white font-medium">+75 points</span>
                  </div>
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-black font-medium text-sm"
                    onClick={() => setShowPointsDialog(true)}
                  >
                    Redeem Points
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5 text-xs text-gray-300">
                  <span>Current: {points} points</span>
                  <span>Next Reward: 5,000 points</span>
                </div>
                <Progress value={(points % 5000) / 50} max={100} className="h-2.5 bg-gray-700/50">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                </Progress>
                <p className="text-amber-300/80 text-xs mt-1.5 text-right">
                  {5000 - (points % 5000)} more points until your next co-pay credit
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setActiveTab('wellness')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'wellness'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
                }`}
              >
                Wellness Challenges
              </button>
              <button
                onClick={() => setActiveTab('mental')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'mental'
                    ? 'bg-purple-500 text-white'
                    : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
                }`}
              >
                Mental Health
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
                }`}
              >
                Completed ({completedChallenges.length})
              </button>
            </div>
            
            <div className="bg-[#2a2a3c]/80 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getActiveChallenges().map((challenge) => (
                  <div 
                    key={challenge.id}
                    className="bg-[#1e1e2c] rounded-xl p-5 hover:bg-[#262638] transition-colors cursor-pointer"
                    onClick={() => navigate(`/wellness-challenges/${challenge.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-lg mr-4 ${challenge.completed ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                          <challenge.icon className={`h-6 w-6 ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg text-white">{challenge.title}</h3>
                          </div>
                          <span className="inline-block bg-[#3a3a4c] text-xs text-gray-300 px-2 py-1 rounded mt-1">
                            {challenge.category}
                          </span>
                          <p className="text-gray-400 mt-2">{challenge.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-amber-400 font-medium">+{challenge.points} pts</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChallengeCompletion(challenge.id);
                          }}
                          className={`mt-4 p-2 rounded-full ${
                            challenge.completed 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                          } transition-colors`}
                        >
                          <CheckCircle className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {getActiveChallenges().length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-400">No challenges in this category</h3>
                </div>
              )}
            </div>
            
            <div className="mt-8 bg-[#2a2a3c]/80 rounded-2xl p-6">
              <h3 className="text-xl font-medium text-white mb-4">Points History</h3>
              <div className="space-y-3">
                {pointsHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#3a3a4c] last:border-0">
                    <div>
                      <div className="text-sm font-medium text-white">{item.action}</div>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                    <div className={`font-medium ${item.points > 0 ? 'text-green-400' : 'text-amber-500'} flex items-center gap-1`}>
                      {item.points > 0 ? '+ ' : '- '}
                      {Math.abs(item.points)} {item.points > 0 && <Award className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <Dialog open={showPointsDialog} onOpenChange={setShowPointsDialog}>
        <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Redeem Points for Rewards</DialogTitle>
            <DialogDescription className="text-gray-300">
              Convert your earned points into co-pay credits
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[50vh] max-h-[400px] pr-4 -mr-4">
            <div className="py-4">
              <div className="bg-[#1e1e2c] rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Available Points</span>
                  <span className="text-amber-400 font-bold text-lg">{points}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Redeemable Co-Pay Credits</span>
                  <span className="text-green-400 font-bold text-lg">${Math.floor(points/5000)}</span>
                </div>
                <Progress value={(points % 5000) / 50} className="h-2 bg-gray-700">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                </Progress>
                <p className="text-xs text-gray-400 mt-2">
                  {5000 - (points % 5000)} more points until your next co-pay credit
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-white mb-2">Points Conversion</h4>
                <p className="text-gray-300 text-sm">
                  • Every 5,000 points = $1 in co-pay credits<br />
                  • 10,000 points = $2 in co-pay credits<br />
                  • 25,000 points = $5 in co-pay credits<br />
                  • Credits can be used for therapy sessions or at Thrive Apparel<br />
                  • Daily Challenges = 10 points each<br />
                  • Weekly Bonus = 25 points<br />
                  • Monthly Completion = 100 points
                </p>
                
                <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 mt-4">
                  <h5 className="font-medium text-amber-300 mb-1">Special Offer</h5>
                  <p className="text-gray-300 text-sm">
                    Complete all challenges for the week to earn a 25-point bonus!
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowPointsDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRedeemPoints}
              disabled={points < 5000}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Redeem Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Self-Care Reminders</DialogTitle>
            <DialogDescription className="text-gray-300">
              Set up reminders to complete your wellness challenges
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] max-h-[500px] pr-4 -mr-4">
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Reminder Times</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="morning" 
                      checked={reminderSettings.morning}
                      onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, morning: checked}))}
                    />
                    <Label htmlFor="morning" className="text-gray-300">Morning (8:00 AM)</Label>
                  </div>
                  <Bell className="h-4 w-4 text-amber-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="afternoon" 
                      checked={reminderSettings.afternoon} 
                      onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, afternoon: checked}))}
                    />
                    <Label htmlFor="afternoon" className="text-gray-300">Afternoon (1:00 PM)</Label>
                  </div>
                  <Bell className="h-4 w-4 text-amber-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="evening" 
                      checked={reminderSettings.evening} 
                      onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, evening: checked}))}
                    />
                    <Label htmlFor="evening" className="text-gray-300">Evening (7:00 PM)</Label>
                  </div>
                  <Bell className="h-4 w-4 text-amber-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-white">Custom Self-Care Reminders</h4>
                <div className="space-y-2 bg-[#1e1e2c] p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 mr-3"></div>
                    <p className="text-gray-300">Take deep breaths when feeling overwhelmed</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                    <p className="text-gray-300">Drink water throughout the day</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mr-3"></div>
                    <p className="text-gray-300">Stretch for 5 minutes every hour</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                    <p className="text-gray-300">Practice gratitude before bed</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-white">Notification Settings</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notifications" 
                      checked={reminderSettings.notifications} 
                      onCheckedChange={(checked) => setReminderSettings(prev => ({...prev, notifications: checked}))}
                    />
                    <Label htmlFor="notifications" className="text-gray-300">Push Notifications</Label>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button 
              onClick={handleUpdateReminders}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Save Reminder Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Page>
  );
};

export default WellnessChallenges;
