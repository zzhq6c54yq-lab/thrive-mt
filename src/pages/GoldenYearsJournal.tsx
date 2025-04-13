
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";
import { BookOpen, PenTool, Share, Clock, Save, MessageSquare, Send } from "lucide-react";
import { FamilyMember, getAllFamilyMembers, shareVideo } from "@/services/familyShareService";

const LifeChapterPrompts = [
  {
    title: "Childhood Memories",
    prompts: [
      "What is your earliest childhood memory? Describe it in detail.",
      "Who were your childhood heroes and why did you admire them?",
      "Describe your favorite childhood game or activity.",
      "What was school like for you growing up?",
      "Tell about a family tradition from your childhood."
    ]
  },
  {
    title: "Young Adulthood",
    prompts: [
      "What was your first job? What did you learn from it?",
      "Describe a moment when you felt truly independent for the first time.",
      "What dreams did you have for your future during your young adult years?",
      "Tell about an important friendship from your young adult years.",
      "What world events had the biggest impact on you during this time?"
    ]
  },
  {
    title: "Family Life",
    prompts: [
      "How did you meet your spouse or significant partner(s)?",
      "What were your early years of marriage or partnership like?",
      "What was the most rewarding aspect of raising children (if applicable)?",
      "Describe a typical family dinner from when your family was together.",
      "What family traditions did you create or continue?"
    ]
  },
  {
    title: "Career & Achievements",
    prompts: [
      "What career path did you follow and why?",
      "What accomplishment are you most proud of?",
      "Describe a challenge you overcame in your professional life.",
      "Who were your mentors and how did they influence you?",
      "What advice would you give to someone starting in your field today?"
    ]
  },
  {
    title: "Life Wisdom",
    prompts: [
      "What is the most important life lesson you've learned?",
      "What do you wish you had known when you were younger?",
      "What values have guided your life decisions?",
      "How has your perspective on life changed as you've grown older?",
      "What would you like future generations to know about living a fulfilling life?"
    ]
  }
];

const todaysPrompts = [
  "What brings you the most joy in your daily life now?",
  "Describe a moment of beauty you noticed today.",
  "What are you grateful for in this season of your life?",
  "What wisdom would you share with someone facing a challenge today?",
  "How has your definition of happiness evolved over your lifetime?"
];

const GoldenYearsJournal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("daily");
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(todaysPrompts[0]);
  const [selectedChapter, setSelectedChapter] = useState(LifeChapterPrompts[0]);
  const [selectedChapterPrompt, setSelectedChapterPrompt] = useState(LifeChapterPrompts[0].prompts[0]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(getAllFamilyMembers());
  const [selectedFamily, setSelectedFamily] = useState<string[]>([]);
  const [entries, setEntries] = useState<{id: string, date: string, prompt: string, content: string}[]>([
    {
      id: "entry1",
      date: "April 10, 2025",
      prompt: "What brings you the most joy in your daily life now?",
      content: "My morning walks in the garden bring me incredible peace. The birds are so lively at dawn, and watching the seasons change through my plants keeps me connected to the rhythm of life. I've grown to appreciate these quiet moments more than I ever did when I was younger and always rushing."
    }
  ]);

  const handleSaveEntry = () => {
    if (!journalEntry.trim()) {
      toast({
        title: "Cannot Save Empty Entry",
        description: "Please write something before saving your journal entry.",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry = {
      id: `entry${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
      prompt: activeTab === "daily" ? selectedPrompt : selectedChapterPrompt,
      content: journalEntry
    };
    
    setEntries([newEntry, ...entries]);
    setJournalEntry("");
    
    toast({
      title: "Journal Entry Saved",
      description: "Your thoughts have been recorded in your journal.",
    });
  };

  const handleShareWithFamily = () => {
    if (selectedFamily.length === 0) {
      toast({
        title: "No Family Members Selected",
        description: "Please select at least one family member to share with.",
        variant: "destructive"
      });
      return;
    }

    // Using the shareVideo function from familyShareService
    // In a real app, we would create a specific function for journal entries
    shareVideo(
      `journal-${Date.now()}`,
      "Journal Entry: " + (activeTab === "daily" ? selectedPrompt : selectedChapterPrompt),
      selectedFamily,
      "", // No video URL for journal entries
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    );

    setSelectedFamily([]);
    
    toast({
      title: "Entry Shared Successfully",
      description: "Your journal entry has been shared with your selected family members.",
    });
  };

  const handleFamilySelect = (id: string) => {
    if (selectedFamily.includes(id)) {
      setSelectedFamily(selectedFamily.filter(memberId => memberId !== id));
    } else {
      setSelectedFamily([...selectedFamily, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF3C7] via-[#FEF9E7] to-[#FFFBEB] text-gray-800 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 p-6 mb-8 relative">
        <div className="absolute top-4 right-4 z-10">
          <HomeButton />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-light text-white">Legacy Journal</h1>
              <p className="text-white/90">Capture your stories and wisdom for generations to come</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4">
        <Tabs defaultValue="daily" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white/50 border border-amber-200 mb-6">
            <TabsTrigger value="daily" className="data-[state=active]:bg-amber-100">
              <Clock className="h-4 w-4 mr-2" /> Daily Reflections
            </TabsTrigger>
            <TabsTrigger value="chapters" className="data-[state=active]:bg-amber-100">
              <BookOpen className="h-4 w-4 mr-2" /> Life Chapters
            </TabsTrigger>
            <TabsTrigger value="entries" className="data-[state=active]:bg-amber-100">
              <PenTool className="h-4 w-4 mr-2" /> Past Entries
            </TabsTrigger>
            <TabsTrigger value="share" className="data-[state=active]:bg-amber-100">
              <Share className="h-4 w-4 mr-2" /> Share with Family
            </TabsTrigger>
          </TabsList>

          {/* Daily Reflections Tab */}
          <TabsContent value="daily">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 sticky top-6">
                  <h3 className="text-xl font-medium text-amber-700 mb-4">Today's Prompts</h3>
                  <div className="space-y-3">
                    {todaysPrompts.map((prompt, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedPrompt(prompt)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPrompt === prompt 
                            ? "bg-amber-100 border border-amber-300" 
                            : "bg-amber-50 hover:bg-amber-100 border border-amber-100"
                        }`}
                      >
                        <p className="text-gray-700">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <PenTool className="h-5 w-5 text-amber-500" />
                    <h2 className="text-xl font-medium text-gray-800">Write Your Thoughts</h2>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-200">
                    <p className="text-gray-800 italic">"{selectedPrompt}"</p>
                  </div>
                  
                  <Textarea 
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Start writing your thoughts here..."
                    className="min-h-[200px] mb-4 border-amber-200 focus-visible:ring-amber-400"
                  />
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setJournalEntry("")} className="border-amber-300 text-amber-700">
                      Clear
                    </Button>
                    <Button onClick={handleSaveEntry} className="bg-amber-500 hover:bg-amber-600 text-white">
                      Save Entry <Save className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Life Chapters Tab */}
          <TabsContent value="chapters">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 sticky top-6">
                  <h3 className="text-xl font-medium text-amber-700 mb-4">Life Chapters</h3>
                  <div className="space-y-2">
                    {LifeChapterPrompts.map((chapter, index) => (
                      <div 
                        key={index} 
                        onClick={() => {
                          setSelectedChapter(chapter);
                          setSelectedChapterPrompt(chapter.prompts[0]);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChapter.title === chapter.title 
                            ? "bg-amber-100 border border-amber-300" 
                            : "bg-amber-50 hover:bg-amber-100 border border-amber-100"
                        }`}
                      >
                        <p className="text-gray-700 font-medium">{chapter.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 mb-6">
                  <h2 className="text-xl font-medium text-amber-700 mb-4">{selectedChapter.title}</h2>
                  
                  <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200 space-y-3">
                    {selectedChapter.prompts.map((prompt, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedChapterPrompt(prompt)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChapterPrompt === prompt 
                            ? "bg-white border border-amber-300" 
                            : "hover:bg-white/50 border border-transparent"
                        }`}
                      >
                        <p className="text-gray-700">{prompt}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 border border-amber-200">
                    <p className="text-gray-800 italic">"{selectedChapterPrompt}"</p>
                  </div>
                  
                  <Textarea 
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Start writing your memories here..."
                    className="min-h-[200px] mb-4 border-amber-200 focus-visible:ring-amber-400"
                  />
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setJournalEntry("")} className="border-amber-300 text-amber-700">
                      Clear
                    </Button>
                    <Button onClick={handleSaveEntry} className="bg-amber-500 hover:bg-amber-600 text-white">
                      Save Entry <Save className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Past Entries Tab */}
          <TabsContent value="entries">
            <div className="space-y-6">
              {entries.length === 0 ? (
                <div className="bg-white rounded-xl p-8 shadow-md border border-amber-100 text-center">
                  <BookOpen className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No Journal Entries Yet</h3>
                  <p className="text-gray-600 mb-4">Start writing daily reflections or life chapters to build your legacy journal.</p>
                  <Button 
                    onClick={() => setActiveTab("daily")}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Start Writing <PenTool className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                entries.map((entry) => (
                  <Card key={entry.id} className="border-amber-100 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-800">{entry.date}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100">
                            <PenTool className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                        <p className="text-gray-700 italic">"{entry.prompt}"</p>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Share with Family Tab */}
          <TabsContent value="share">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100">
                <h3 className="text-xl font-medium text-amber-700 mb-4">Choose Family Members</h3>
                <p className="text-gray-600 mb-6">Select who you'd like to share your journal entries with:</p>
                
                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div 
                      key={member.id}
                      onClick={() => handleFamilySelect(member.id)}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedFamily.includes(member.id)
                          ? "bg-amber-100 border border-amber-300"
                          : "hover:bg-amber-50 border border-gray-100"
                      }`}
                    >
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border border-amber-200">
                        <img 
                          src={member.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"} 
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{member.name}</h4>
                        <p className="text-gray-500 text-sm">{member.relation}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => navigate("/family-link-page")}
                  variant="outline" 
                  className="mt-6 border-amber-300 text-amber-700"
                >
                  Add Family Member
                </Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100">
                <h3 className="text-xl font-medium text-amber-700 mb-4">Share Your Stories</h3>
                
                <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                  <h4 className="font-medium text-gray-800 mb-2">Why Share Your Journal?</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 mr-2">1</div>
                      <span>Preserve your memories and insights for future generations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 mr-2">2</div>
                      <span>Help family members understand your experiences and values</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 mr-2">3</div>
                      <span>Create deeper connections across generations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-800">Include a Personal Message:</h4>
                  <Textarea 
                    placeholder="Write a brief message to accompany your shared journal entry..."
                    className="border-amber-200 focus-visible:ring-amber-400"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {selectedFamily.length} family member{selectedFamily.length !== 1 ? 's' : ''} selected
                  </p>
                  <Button 
                    onClick={handleShareWithFamily}
                    disabled={selectedFamily.length === 0}
                    className="bg-amber-500 hover:bg-amber-600 text-white disabled:bg-gray-300"
                  >
                    Share Selected Entries <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-8 p-4 border border-dashed border-amber-300 rounded-lg bg-amber-50">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="h-5 w-5 text-amber-500" />
                    <h4 className="font-medium text-gray-800">Family Response</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    When you share entries, family members can respond with comments or questions, 
                    creating meaningful conversations around your stories.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GoldenYearsJournal;
