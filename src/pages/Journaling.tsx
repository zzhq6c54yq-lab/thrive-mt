
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, List, Calendar, Clock, Save, Download, Star, Sparkles, PenLine, History, ChevronRight, Quote, MessageSquare, Smile, Cloud, AlertCircle, Zap, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Page from "@/components/Page";
import HenryContextualTip from "@/components/henry/HenryContextualTip";

interface JournalEntry {
  id: string;
  content: string;
  title: string;
  date: string;
  time: string;
  mood?: string;
  tags?: string[];
}

const Journaling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journalEntry, setJournalEntry] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [journalHistory, setJournalHistory] = useState<JournalEntry[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const [animatePrompt, setAnimatePrompt] = useState(false);

  // Load journal entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    if (savedEntries) {
      setJournalHistory(JSON.parse(savedEntries));
    }
    
    // Calculate streak
    calculateStreak();
    
    // Animation effect for prompts
    const interval = setInterval(() => {
      setAnimatePrompt(true);
      setTimeout(() => {
        setAnimatePrompt(false);
        setPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
      }, 500);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Save journal entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(journalHistory));
  }, [journalHistory]);

  const calculateStreak = () => {
    // Simple streak calculation logic
    if (journalHistory.length === 0) {
      setStreakCount(0);
      return;
    }
    
    // Sort entries by date
    const sortedEntries = [...journalHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const today = new Date().toLocaleDateString();
    const latestEntryDate = sortedEntries[0].date;
    
    // Check if the latest entry is from today
    if (latestEntryDate === today) {
      // Count consecutive days
      let streak = 1;
      let currentDate = new Date(today);
      
      for (let i = 1; i < sortedEntries.length; i++) {
        currentDate.setDate(currentDate.getDate() - 1);
        const prevDate = currentDate.toLocaleDateString();
        
        if (journalHistory.some(entry => entry.date === prevDate)) {
          streak++;
        } else {
          break;
        }
      }
      
      setStreakCount(streak);
    } else {
      setStreakCount(0);
    }
  };

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      const entryDate = new Date().toLocaleDateString();
      const entryTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: journalEntry,
        title: journalTitle || `Journal Entry - ${entryDate}`,
        date: entryDate,
        time: entryTime,
        mood: selectedMood || undefined,
        tags: selectedTags.length > 0 ? [...selectedTags] : undefined
      };
      
      setJournalHistory(prev => [newEntry, ...prev]);
      
      // Create downloadable content for the entry
      const content = `${newEntry.title}\n${entryDate} ${entryTime}\n\n${selectedMood ? `Mood: ${selectedMood}\n` : ''}${selectedTags.length > 0 ? `Tags: ${selectedTags.join(', ')}\n` : ''}\n${journalEntry}`;
      
      // Create a blob and URL for downloading
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been captured and saved.",
      });
      
      // Reset form fields
      setJournalEntry("");
      setJournalTitle("");
      setSelectedMood(null);
      setSelectedTags([]);
      
      // Update streak
      calculateStreak();
    } else {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
    }
  };

  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a challenge you're currently facing and how you might overcome it.",
    "What activities made you feel energized today?",
    "Write about something that brought you joy recently.",
    "Reflect on a recent accomplishment, no matter how small.",
    "What self-care activities would you like to prioritize this week?",
    "How did you show compassion to yourself or others today?",
    "What's something you learned recently that surprised you?",
    "Describe a moment when you felt truly at peace.",
    "What boundaries do you need to set or maintain for your wellbeing?",
  ];

  const moods = [
    { name: "Happy", icon: <Smile className="w-5 h-5" /> },
    { name: "Calm", icon: <Smile className="w-5 h-5" /> },
    { name: "Sad", icon: <Cloud className="w-5 h-5" /> },
    { name: "Anxious", icon: <AlertCircle className="w-5 h-5" /> },
    { name: "Energetic", icon: <Zap className="w-5 h-5" /> },
    { name: "Tired", icon: <Moon className="w-5 h-5" /> },
    { name: "Grateful", emoji: "🙏" },
    { name: "Frustrated", emoji: "😤" },
  ];

  const tags = [
    "Personal Growth", "Reflection", "Gratitude", "Challenge",
    "Relationships", "Work", "Health", "Mindfulness",
    "Goals", "Creativity", "Learning", "Self-care"
  ];

  const handlePromptSelect = (prompt: string) => {
    setJournalEntry(prompt + "\n\n");
    setActiveTab("write");
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDownload = () => {
    toast({
      title: "Entry Downloaded",
      description: "Your journal entry has been downloaded successfully.",
    });
  };

  const deleteEntry = (id: string) => {
    setJournalHistory(prev => prev.filter(entry => entry.id !== id));
    toast({
      title: "Entry Deleted",
      description: "Your journal entry has been removed.",
    });
  };

  // Get a random quote about journaling to display
  const quotes = [
    "Journal writing is a voyage to the interior. — Christina Baldwin",
    "Writing in a journal reminds you of your goals and of your learning in life. — Robin Sharma",
    "Fill your paper with the breathings of your heart. — William Wordsworth",
    "Writing is medicine. — Julia Cameron",
    "A journal is your completely unaltered voice. — Lucy Dacus",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Function to get most common mood
  const getMostCommonMood = () => {
    const moodCount: Record<string, number> = {};
    
    journalHistory
      .filter(entry => entry.mood)
      .forEach(entry => {
        if (entry.mood) {
          moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
        }
      });
    
    const entries = Object.entries(moodCount);
    if (entries.length === 0) return "N/A";
    
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  };

  // Function to get most frequent tags
  const getFrequentTags = () => {
    const tagCount: Record<string, number> = {};
    
    journalHistory
      .flatMap(entry => entry.tags || [])
      .forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    
    const entries = Object.entries(tagCount);
    if (entries.length === 0) return [];
    
    return entries
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Page 
      title="Therapeutic Journaling" 
      showBackButton={true} 
      onBackClick={handleBackClick}
      fullWidth={true}
    >
      <div className="min-h-screen bg-gradient-to-b from-[rgba(91,33,182,0.1)] to-[rgba(124,58,237,0.05)]">
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white py-12 relative overflow-hidden rounded-xl shadow-lg mb-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M2,2 L5,2 L5,5 L2,5 Z%22 fill=%22%23ffffff%22 fill-opacity=%220.03%22/></svg>')] opacity-20"></div>
          </div>
          
          <div className="container px-4 max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-white/20 shadow-lg">
                <BookOpen className="h-8 w-8 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent drop-shadow-sm">Therapeutic Journaling</h1>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-xl text-purple-100 max-w-3xl font-light">Express yourself, gain clarity, and track your personal growth journey.</p>
              
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 shadow-md backdrop-blur-sm">
                <Star className="h-5 w-5 text-yellow-300 drop-shadow-md" />
                <span className="text-white font-medium text-lg">{streakCount} day streak</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 max-w-6xl mx-auto">
          {/* Henry Contextual Tip */}
          <HenryContextualTip 
            message="Writing can be incredibly healing. If you're feeling stuck, I can help you with prompts or just be here to listen. Need help getting started?"
            className="mb-6"
          />
          
          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-5 mb-8 border border-purple-200/30 flex flex-col md:flex-row items-center justify-between backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Quote className="h-10 w-10 text-purple-500" />
              <p className="text-gray-700 italic font-light text-lg">{randomQuote}</p>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all duration-300 font-medium px-6"
              onClick={() => setActiveTab("write")}
            >
              <PenLine className="mr-2 h-4 w-4" />
              Start Writing
            </Button>
          </div>
          
          <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-purple-100/50 p-1">
              <TabsTrigger 
                value="write" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Write
              </TabsTrigger>
              <TabsTrigger 
                value="prompts" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Prompts
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              >
                <History className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="write" className="space-y-6">
              <Card className="border-purple-200/50 shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200/30">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      Today's Journal
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-purple-600" />
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Entry Title (optional)"
                      className="w-full px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80"
                      value={journalTitle}
                      onChange={(e) => setJournalTitle(e.target.value)}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="What's on your mind today?"
                    className="min-h-[300px] mb-4 border-purple-200 focus:ring-purple-500 bg-white/80 text-gray-800"
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                  />
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">How are you feeling?</p>
                    <div className="flex flex-wrap gap-2">
                      {moods.map((mood) => (
                        <Button
                          key={mood.name}
                          type="button"
                          variant={selectedMood === mood.name ? "default" : "outline"}
                          className={`${
                            selectedMood === mood.name 
                              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white border-purple-500" 
                              : "border-purple-200 text-gray-700 hover:bg-purple-100/50"
                          } transition-all duration-300`}
                          onClick={() => setSelectedMood(selectedMood === mood.name ? null : mood.name)}
                        >
                          <span className="mr-1">{mood.emoji}</span> {mood.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Add tags (optional)</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`
                            cursor-pointer px-3 py-1 text-xs
                            ${selectedTags.includes(tag) 
                              ? "bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600" 
                              : "bg-transparent text-gray-700 hover:bg-purple-100 border-purple-300"}
                            transition-all duration-300
                          `}
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all duration-300"
                      onClick={handleSaveEntry}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Entry
                    </Button>
                    {downloadUrl && (
                      <Button 
                        variant="outline"
                        className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-100"
                        asChild
                      >
                        <a href={downloadUrl} download={`journal-entry-${new Date().toISOString().split('T')[0]}.txt`} onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Entry
                        </a>
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-100"
                      onClick={() => setActiveTab("prompts")}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Prompt
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200/50 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-800">Benefits of Journaling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                      <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-purple-500" />
                        Stress Reduction
                      </h3>
                      <p className="text-gray-700 text-sm">Reduces stress and anxiety by externalizing thoughts and processing emotions.</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                      <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-purple-500" />
                        Emotional Processing
                      </h3>
                      <p className="text-gray-700 text-sm">Helps identify and process complex emotions in a safe, private space.</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                      <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-purple-500" />
                        Mental Clarity
                      </h3>
                      <p className="text-gray-700 text-sm">Provides clarity and perspective on problems and challenges.</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all">
                      <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-purple-500" />
                        Self-Discovery
                      </h3>
                      <p className="text-gray-700 text-sm">Reveals patterns in your thinking, behavior, and emotional responses.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prompts" className="space-y-6">
              <Card className="border-purple-200/50 mb-6 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200/30">
                  <CardTitle className="text-purple-800">Need Inspiration?</CardTitle>
                  <CardDescription className="text-gray-600">
                    Select a prompt below to jump-start your journal entry
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-100/80 to-indigo-100/80 border border-purple-200 rounded-lg p-6 mb-8 text-center shadow-md"
                    animate={{
                      opacity: animatePrompt ? 0 : 1,
                      y: animatePrompt ? 10 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg text-purple-800 italic font-medium">{prompts[promptIndex]}</p>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                      onClick={() => handlePromptSelect(prompts[promptIndex])}
                    >
                      Use This Prompt
                    </Button>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prompts.map((prompt, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-purple-200/30 bg-white/70">
                        <CardHeader className="pb-2 bg-gradient-to-r from-purple-50/80 to-transparent border-b border-purple-100/50">
                          <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
                            <List className="h-5 w-5 text-purple-500" />
                            Prompt {index + 1}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-3">
                          <p className="text-gray-700 mb-4">{prompt}</p>
                          <Button 
                            variant="outline" 
                            className="w-full border-purple-300 text-purple-700 hover:bg-purple-100 transition-all duration-300"
                            onClick={() => handlePromptSelect(prompt)}
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Use This Prompt
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200/30">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-purple-800">Journal History</CardTitle>
                    {journalHistory.length > 0 && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600">
                        {journalHistory.length} {journalHistory.length === 1 ? 'entry' : 'entries'}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-gray-600">
                    Your journey of self-reflection and personal growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {journalHistory.length > 0 ? (
                    <div className="space-y-4">
                      {journalHistory.map((entry) => (
                        <Card key={entry.id} className="overflow-hidden border-purple-200/30 hover:shadow-md transition-all bg-white/90">
                          <CardHeader className="pb-2 bg-gradient-to-r from-purple-50/50 to-transparent">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <CardTitle className="text-lg text-purple-800">{entry.title}</CardTitle>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{entry.date}</span>
                                <span>•</span>
                                <span>{entry.time}</span>
                              </div>
                            </div>
                            {(entry.mood || entry.tags) && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {entry.mood && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    Mood: {entry.mood}
                                  </Badge>
                                )}
                                
                                {entry.tags?.map((tag) => (
                                  <Badge key={tag} variant="outline" className="bg-white text-indigo-600 border-indigo-200">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-gray-700 whitespace-pre-line line-clamp-3">
                              {entry.content}
                            </p>
                          </CardContent>
                          <CardFooter className="border-t border-purple-100 flex justify-between pt-3">
                            <Button 
                              variant="ghost" 
                              className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                              onClick={() => {
                                setJournalTitle(entry.title);
                                setJournalEntry(entry.content);
                                setSelectedMood(entry.mood || null);
                                setSelectedTags(entry.tags || []);
                                setActiveTab("write");
                              }}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Continue this entry
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => deleteEntry(entry.id)}
                            >
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 shadow-inner">
                        <BookOpen className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-medium text-purple-800 mb-2">Your Journal is Empty</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Start writing today to build your collection of reflections and insights.
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors duration-300 shadow-md"
                        onClick={() => setActiveTab("write")}
                      >
                        <PenLine className="mr-2 h-4 w-4" />
                        Create Your First Entry
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {journalHistory.length > 0 && (
                <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm shadow-md">
                  <CardHeader className="border-b border-purple-100/50">
                    <CardTitle className="text-purple-800">Journaling Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Journaling Streak</h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Current streak</span>
                          <span className="text-purple-700 font-medium">{streakCount} days</span>
                        </div>
                        <Progress value={Math.min(streakCount * 10, 100)} className="h-3 bg-purple-100 rounded-full">
                          <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
                        </Progress>
                        <p className="text-xs text-gray-500 mt-1">
                          {streakCount < 10 
                            ? `${10 - streakCount} more days to reach your next milestone!` 
                            : "You've reached a milestone! Keep going!"}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm">
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Total Entries</h3>
                          <p className="text-2xl font-bold text-purple-600">{journalHistory.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm">
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Most Common Mood</h3>
                          <p className="text-2xl font-bold text-purple-600">
                            {getMostCommonMood()}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 shadow-sm">
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Frequent Tags</h3>
                          <div className="flex flex-wrap gap-1">
                            {getFrequentTags().map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs border-purple-300 text-purple-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Page>
  );
};

export default Journaling;

