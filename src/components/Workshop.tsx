
import React, { useState, useEffect } from "react";
import { LucideIcon, ChevronDown, ChevronUp, Play, Pause, Volume, Volume2, Download, CheckCircle, Clipboard, ClipboardCheck, Calendar, Clock, Users, Gift, Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
  sections: Array<{
    title: string;
    duration: string;
    content: string;
    exercises: Array<{
      title: string;
      instructions: string;
    }>;
  }>;
}

interface WorkshopProps {
  workshopData: WorkshopData;
}

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  exerciseId: string;
}

// Map workshop IDs to relevant YouTube video IDs
const getVideoForWorkshop = (workshopId: string, sectionIndex: number): string => {
  const videoMappings: {[key: string]: string[]} = {
    "mindful-communication": [
      "aseNAGQBxNc", // Communication skills
      "HAnw168huqA", // Active listening
      "R1vskiVDwl4"  // Mindful speaking
    ],
    "emotional-regulation": [
      "vz6k_GnReUs", // Emotional regulation techniques
      "F2hc2FLOdhI", // Managing difficult emotions
      "QTsUEOUaWpY"  // Mindfulness for emotions
    ],
    "stress-management": [
      "0fL-pn80s-c", // Stress management techniques
      "ztvojZb_NzU", // Deep breathing
      "gnVdXN_pRtw"  // Progressive muscle relaxation
    ],
    "better-sleep": [
      "acEH2JnBDpI", // Sleep hygiene
      "A5dE25ANU0k", // Bedtime routine
      "t0kACis_dJE"  // Managing insomnia
    ],
    "cognitive-reframing": [
      "RORPx-Y6ByY", // Cognitive reframing
      "ZU3MPwU8Gv4", // Recognizing cognitive distortions
      "hQkXJE0fAh0"  // Positive thinking strategies
    ],
    "gratitude-practice": [
      "WPPPFqsECz0", // Benefits of gratitude
      "sCV-MSIryic", // Gratitude journal techniques
      "aqKvjXXBvW4"  // Daily gratitude practices
    ],
    "self-compassion": [
      "Nzq_i8U4Kgs", // Self-compassion techniques
      "dz0pNiJwudM", // Overcoming self-criticism
      "Nee-XT5Yerg"  // Self-compassion meditation
    ],
    "social-connection": [
      "HDZs6JY8zms", // Building meaningful connections
      "ByqYjnZVLmE", // Social wellness tips
      "k6uVnG4Uxkk"  // Communication in relationships
    ],
    "anxiety-management": [
      "WWloIAQpMcQ", // Anxiety management tools
      "O-6f5wQXSu8", // Grounding techniques
      "qvaB2d5yDf8"  // Breaking the anxiety cycle
    ],
    "boundary-setting": [
      "s8IqpwOYYhI", // Setting healthy boundaries
      "ZQrFHHsF4eo", // Assertive communication
      "rtsHUeKnkC8"  // Boundary setting examples
    ],
    "values-alignment": [
      "uaq9Ysi2T1g", // Values clarification
      "Zh3vAcAsFpk", // Living your values
      "Y8hi_x7cC8c"  // Values-based decisions
    ],
    "habit-formation": [
      "FSZnIjO5mFI", // Habit formation science
      "AdKUJxjn-R8", // Building healthy habits
      "U_nzRU35qSM"  // Breaking bad habits
    ]
  };
  
  // Return default video if workshop ID isn't found
  if (!videoMappings[workshopId]) {
    return "L8tONnEoSNE"; // Default video about mental wellness
  }
  
  // Return specific section video if available, otherwise first video
  return videoMappings[workshopId][sectionIndex] || videoMappings[workshopId][0];
};

const Workshop: React.FC<WorkshopProps> = ({ workshopData }) => {
  const [activeVideoSection, setActiveVideoSection] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentJournalEntry, setCurrentJournalEntry] = useState("");
  const [activeJournalingExercise, setActiveJournalingExercise] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("content");
  const [showCongratulations, setShowCongratulations] = useState(false);
  const { toast } = useToast();

  // Load saved progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`workshop-progress-${workshopData.id}`);
    if (savedProgress) {
      setCompletedExercises(new Set(JSON.parse(savedProgress)));
    }
    
    const savedJournalEntries = localStorage.getItem(`workshop-journal-${workshopData.id}`);
    if (savedJournalEntries) {
      setJournalEntries(JSON.parse(savedJournalEntries));
    }
  }, [workshopData.id]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `workshop-progress-${workshopData.id}`, 
      JSON.stringify(Array.from(completedExercises))
    );
    
    // Check if all exercises are completed
    const totalExercisesCount = workshopData.sections.reduce(
      (count, section) => count + section.exercises.length, 0
    );
    
    if (completedExercises.size === totalExercisesCount && totalExercisesCount > 0) {
      setShowCongratulations(true);
    }
  }, [completedExercises, workshopData]);

  // Save journal entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      `workshop-journal-${workshopData.id}`, 
      JSON.stringify(journalEntries)
    );
  }, [journalEntries, workshopData.id]);

  const toggleVideo = (sectionIndex: number) => {
    setActiveVideoSection(activeVideoSection === sectionIndex ? null : sectionIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Sound Enabled" : "Sound Muted",
      description: isMuted ? "Workshop audio is now playing" : "Workshop audio is now muted",
      duration: 1500,
    });
  };

  const markExerciseComplete = (sectionIndex: number, exerciseIndex: number) => {
    const exerciseKey = `${sectionIndex}-${exerciseIndex}`;
    const newCompleted = new Set(completedExercises);
    
    if (newCompleted.has(exerciseKey)) {
      newCompleted.delete(exerciseKey);
    } else {
      newCompleted.add(exerciseKey);
      toast({
        title: "Exercise Completed",
        description: "Great job! Your progress has been saved.",
        duration: 2000,
      });
    }
    
    setCompletedExercises(newCompleted);
  };

  const downloadWorksheetPDF = (sectionTitle: string) => {
    toast({
      title: "Downloading Worksheet",
      description: `The worksheet for "${sectionTitle}" is being downloaded`,
      duration: 2000,
    });
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Worksheet has been downloaded successfully",
        duration: 2000,
      });
    }, 1500);
  };

  const saveJournalEntry = (sectionIndex: number, exerciseIndex: number) => {
    if (!currentJournalEntry.trim()) {
      toast({
        title: "Journal Entry Empty",
        description: "Please write something before saving",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    const exerciseKey = `${sectionIndex}-${exerciseIndex}`;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentJournalEntry,
      timestamp: new Date(),
      exerciseId: exerciseKey
    };
    
    setJournalEntries(prev => [...prev, newEntry]);
    setCurrentJournalEntry("");
    setActiveJournalingExercise(null);
    
    toast({
      title: "Journal Entry Saved",
      description: "Your thoughts have been recorded successfully",
      duration: 2000,
    });
    
    // Auto-mark exercise as complete when journal entry is saved
    const newCompleted = new Set(completedExercises);
    newCompleted.add(exerciseKey);
    setCompletedExercises(newCompleted);
  };

  // Extract color code for styling
  const colorClass = workshopData.color.split(' ')[0];
  const accentColor = colorClass.includes('bg-[#') 
    ? colorClass.replace('bg-[', '').replace(']/10', '') 
    : '#9b87f5';

  const completedExercisesCount = completedExercises.size;
  const totalExercisesCount = workshopData.sections.reduce(
    (count, section) => count + section.exercises.length, 0
  );
  const progressPercentage = totalExercisesCount > 0 
    ? Math.round((completedExercisesCount / totalExercisesCount) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      {showCongratulations && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-auto relative overflow-hidden animate-scale-in">
            <div 
              className="h-2 w-full" 
              style={{ backgroundColor: accentColor }}
            ></div>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-green-100 text-green-600">
                <Trophy className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Workshop Completed!</CardTitle>
              <CardDescription>
                Congratulations on completing the {workshopData.title} workshop. 
                You've taken an important step in your mental wellness journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">You've completed all {totalExercisesCount} exercises.</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="h-2.5 rounded-full bg-green-600" 
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Your progress has been saved and will be reflected in your progress reports.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={() => setShowCongratulations(false)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Continue Learning
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="content">Workshop Content</TabsTrigger>
          <TabsTrigger value="progress">Your Progress</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <div 
              className="h-2 w-full" 
              style={{ backgroundColor: accentColor }}
            ></div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <workshopData.icon className="h-6 w-6" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold" style={{ color: accentColor }}>
                      Workshop Progress
                    </CardTitle>
                    <CardDescription>
                      {progressPercentage}% Complete ({completedExercisesCount}/{totalExercisesCount} exercises)
                    </CardDescription>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <workshopData.icon className="h-3 w-3" />
                  {workshopData.duration}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ width: `${progressPercentage}%`, backgroundColor: accentColor }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Workshop Sections */}
          <div className="space-y-8 mt-8">
            {workshopData.sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="overflow-hidden border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {sectionIndex + 1}. {section.title}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {section.duration}
                        </Badge>
                        {section.exercises.length} exercises
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => toggleVideo(sectionIndex)}
                    >
                      {activeVideoSection === sectionIndex ? 
                        <Pause className="h-4 w-4" /> : 
                        <Play className="h-4 w-4" />
                      }
                      {activeVideoSection === sectionIndex ? "Pause" : "Play"} Video
                    </Button>
                  </div>
                </CardHeader>
                
                {activeVideoSection === sectionIndex && (
                  <div className="px-6 pb-4">
                    <div className="relative rounded-md overflow-hidden bg-black aspect-video mb-3">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getVideoForWorkshop(workshopData.id, sectionIndex)}?autoplay=1${isMuted ? '&mute=1' : ''}`}
                        title={`${section.title} Workshop Video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                        >
                          {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                          {isMuted ? "Unmute" : "Mute"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        "{section.title}" Workshop Video
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => downloadWorksheetPDF(section.title)}
                      >
                        <Download className="h-4 w-4" />
                        Download Notes
                      </Button>
                    </div>
                  </div>
                )}
                
                <CardContent className="px-6 py-4">
                  <div className="prose max-w-none">
                    <div className="text-gray-700 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </CardContent>
                
                <div className="px-6 pb-6">
                  <Separator className="my-4" />
                  <h3 className="text-lg font-medium mb-4">Exercises</h3>
                  
                  <Accordion type="multiple" className="space-y-4">
                    {section.exercises.map((exercise, exerciseIndex) => {
                      const exerciseKey = `${sectionIndex}-${exerciseIndex}`;
                      const isCompleted = completedExercises.has(exerciseKey);
                      const hasJournalEntries = journalEntries.some(entry => entry.exerciseId === exerciseKey);
                      
                      return (
                        <AccordionItem 
                          key={exerciseIndex} 
                          value={`item-${sectionIndex}-${exerciseIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="py-4 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <Button
                                variant={isCompleted ? "default" : "outline"}
                                size="icon"
                                className={`h-8 w-8 rounded-full ${isCompleted ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markExerciseComplete(sectionIndex, exerciseIndex);
                                }}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <span className={isCompleted ? "line-through text-gray-500" : ""}>
                                {exercise.title}
                              </span>
                              {hasJournalEntries && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  Journal Entries
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-4 px-11">
                            <div className="prose max-w-none">
                              <p className="text-gray-700 text-sm">
                                {exercise.instructions}
                              </p>
                              
                              {activeJournalingExercise === exerciseKey ? (
                                <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                  <h4 className="text-sm font-semibold mb-2">Journal Your Thoughts</h4>
                                  <Textarea
                                    value={currentJournalEntry}
                                    onChange={(e) => setCurrentJournalEntry(e.target.value)}
                                    placeholder="Write your reflections here..."
                                    className="min-h-[120px] mb-3"
                                  />
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setActiveJournalingExercise(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => saveJournalEntry(sectionIndex, exerciseIndex)}
                                    >
                                      Save Entry
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-4 space-x-2">
                                  <Button 
                                    variant={isCompleted ? "outline" : "default"}
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => markExerciseComplete(sectionIndex, exerciseIndex)}
                                  >
                                    {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => downloadWorksheetPDF(`${section.title} - ${exercise.title}`)}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Worksheet
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setActiveJournalingExercise(exerciseKey)}
                                  >
                                    <Clipboard className="h-4 w-4 mr-2" />
                                    Add Journal Entry
                                  </Button>
                                </div>
                              )}
                              
                              {hasJournalEntries && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-semibold mb-2">Your Journal Entries</h4>
                                  <div className="space-y-2">
                                    {journalEntries
                                      .filter(entry => entry.exerciseId === exerciseKey)
                                      .map(entry => (
                                        <div 
                                          key={entry.id} 
                                          className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm"
                                        >
                                          <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs text-gray-500">
                                              {new Date(entry.timestamp).toLocaleString()}
                                            </span>
                                          </div>
                                          <p className="whitespace-pre-line">{entry.content}</p>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Workshop Progress</CardTitle>
              <CardDescription>Track your completion of the {workshopData.title} workshop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Overall Progress</h3>
                    <span className="text-sm font-medium" style={{ color: accentColor }}>
                      {progressPercentage}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Section Breakdown</h3>
                  {workshopData.sections.map((section, sectionIndex) => {
                    const sectionExercisesTotal = section.exercises.length;
                    const sectionCompletedCount = Array.from(completedExercises).filter(
                      ex => ex.startsWith(`${sectionIndex}-`)
                    ).length;
                    const sectionPercentage = Math.round((sectionCompletedCount / sectionExercisesTotal) * 100);
                    
                    return (
                      <div key={sectionIndex}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">
                            {sectionIndex + 1}. {section.title}
                          </span>
                          <span className="text-xs font-medium" style={{ color: accentColor }}>
                            {sectionCompletedCount}/{sectionExercisesTotal} ({sectionPercentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${sectionPercentage}%`, 
                              backgroundColor: accentColor 
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-3">Workshop Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500">Time Invested</div>
                      <div className="text-xl font-bold" style={{ color: accentColor }}>
                        {workshopData.duration}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500">Sections</div>
                      <div className="text-xl font-bold" style={{ color: accentColor }}>
                        {workshopData.sections.length}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500">Total Exercises</div>
                      <div className="text-xl font-bold" style={{ color: accentColor }}>
                        {totalExercisesCount}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500">Journal Entries</div>
                      <div className="text-xl font-bold" style={{ color: accentColor }}>
                        {journalEntries.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="journal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Workshop Journal</CardTitle>
              <CardDescription>Your thoughts and reflections from this workshop</CardDescription>
            </CardHeader>
            <CardContent>
              {journalEntries.length > 0 ? (
                <div className="space-y-4">
                  {journalEntries.map(entry => {
                    const [sectionIndex, exerciseIndex] = entry.exerciseId.split('-').map(Number);
                    const section = workshopData.sections[sectionIndex];
                    const exercise = section?.exercises[exerciseIndex];
                    
                    return (
                      <div 
                        key={entry.id} 
                        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Badge 
                                className="text-xs"
                                style={{ 
                                  backgroundColor: `${accentColor}20`, 
                                  color: accentColor 
                                }}
                              >
                                {section?.title}
                              </Badge>
                            </div>
                            <span className="text-sm text-gray-500">
                              {exercise?.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 md:mt-0">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Clipboard className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Journal Entries Yet</h3>
                  <p className="text-gray-500 mb-4">
                    Complete exercises and add your reflections to build your journal
                  </p>
                  <Button 
                    variant="outline"
                    className="text-sm"
                    onClick={() => setActiveTab("content")}
                  >
                    Go to Workshop Content
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workshop;
