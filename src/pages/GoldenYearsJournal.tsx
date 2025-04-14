
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HomeButton from "@/components/HomeButton";
import { 
  BookOpen, PenTool, Share, Clock, Save, MessageSquare, Send, 
  FileCheck, Footprints, Heart, FileText, HeartHandshake, Users,
  Calendar, MapPin, Camera, Archive, Download, Lightbulb
} from "lucide-react";
import { FamilyMember, getAllFamilyMembers, shareVideo } from "@/services/familyShareService";
import { useSearchParams } from "react-router-dom";

// Life chapter prompts for memoir building
const LifeChapterPrompts = [
  {
    title: "Childhood Memories",
    description: "Your earliest years shape who you become. These formative experiences are treasures to share.",
    icon: <Footprints className="h-5 w-5" />,
    prompts: [
      "What is your earliest childhood memory? Describe it with all the sensory details you can recall.",
      "Who were your childhood heroes and why did you admire them? How did they influence your life?",
      "Describe your favorite childhood game or activity. What did it teach you about life?",
      "What was school like for you growing up? Who was your favorite teacher and why?",
      "Tell about a family tradition from your childhood that was meaningful to you.",
      "Describe the neighborhood where you grew up. What made it special or challenging?",
      "What historical events do you remember from your childhood? How did they affect your family?",
      "Who were your childhood friends? Do you have a special memory with them?",
      "What was the most important lesson your parents taught you during childhood?"
    ]
  },
  {
    title: "Young Adulthood",
    description: "The years of discovery, independence, and setting the course for your life journey.",
    icon: <Heart className="h-5 w-5" />,
    prompts: [
      "What was your first job? What did you learn from this experience?",
      "Describe a moment when you felt truly independent for the first time. How did it change you?",
      "What dreams did you have for your future during your young adult years? Did they come true?",
      "Tell about an important friendship or relationship from your young adult years.",
      "What world events had the biggest impact on you during this time?",
      "Describe a risk or bold decision you made as a young adult. What came of it?",
      "What was your first home away from your parents like? What do you remember about it?",
      "Who were your mentors during this phase of life? What wisdom did they impart?",
      "What do you wish you had known during your young adult years that you know now?"
    ]
  },
  {
    title: "Family Life",
    description: "The joys, challenges, and love that defined your experience of building a family.",
    icon: <Users className="h-5 w-5" />,
    prompts: [
      "How did you meet your spouse or significant partner(s)? What attracted you to them?",
      "What were your early years of marriage or partnership like? What surprises did you face?",
      "What was the most rewarding aspect of raising children (if applicable)? The most challenging?",
      "Describe a typical family dinner from when your family was together. What made it special?",
      "What family traditions did you create or continue? Why were they important?",
      "Share a story about a family vacation or trip that stands out in your memory.",
      "How did you balance work and family life? What would you do differently?",
      "What values were most important for you to pass on to your children or younger relatives?",
      "Describe a major challenge your family faced together and how you overcame it."
    ]
  },
  {
    title: "Career & Achievements",
    description: "Your professional journey, accomplishments, and the impact you made in your field.",
    icon: <FileText className="h-5 w-5" />,
    prompts: [
      "What career path did you follow and why? Was it what you had planned?",
      "What professional accomplishment are you most proud of? Why does it matter to you?",
      "Describe a challenge you overcame in your professional life. How did it shape you?",
      "Who were your mentors and how did they influence your career development?",
      "What advice would you give to someone starting in your field today?",
      "How did your career affect other aspects of your life, both positively and negatively?",
      "Was there a moment when you felt you had 'made it' professionally? Describe that time.",
      "What technological or industry changes did you witness during your career?",
      "If you could have chosen a different career path, what might it have been?"
    ]
  },
  {
    title: "Life Wisdom",
    description: "The insights, philosophy, and perspective you've gained through a lifetime of experiences.",
    icon: <Lightbulb className="h-5 w-5" />,
    prompts: [
      "What is the most important life lesson you've learned? How did you learn it?",
      "What do you wish you had known when you were younger? Why?",
      "What values have guided your life decisions? How have they served you?",
      "How has your perspective on life changed as you've grown older?",
      "What would you like future generations to know about living a fulfilling life?",
      "Describe a mistake or regret that taught you something valuable.",
      "What has brought you the most joy in life? Has this changed over time?",
      "What gives you hope for the future? What concerns do you have?",
      "If you could share just one piece of wisdom with your descendants, what would it be and why?"
    ]
  },
  {
    title: "Historical Moments",
    description: "Your personal perspective on significant events that shaped history during your lifetime.",
    icon: <Calendar className="h-5 w-5" />,
    prompts: [
      "What major historical event had the biggest impact on your life? How did it affect you?",
      "Describe where you were and what you felt during a significant historical moment.",
      "How did technology change during your lifetime? What innovations most impressed you?",
      "What social changes have you witnessed that you feel were most significant?",
      "Did you ever participate in a social movement or cause? What was that experience like?",
      "How did major economic changes (like recessions or booms) affect your life?",
      "What wartime experiences (if any) shaped your perspective on national events?",
      "What local historical events in your community do you think should be remembered?",
      "How do you feel the world has changed for better or worse during your lifetime?"
    ]
  },
  {
    title: "Places & Travel",
    description: "Locations that have been meaningful in your life and journeys that expanded your world.",
    icon: <MapPin className="h-5 w-5" />,
    prompts: [
      "What place has felt most like 'home' to you in your life? What made it special?",
      "Describe a journey or trip that changed your perspective on life.",
      "What is the most beautiful place you've ever visited? What made it so striking?",
      "Is there a place you've always wanted to visit but haven't? What draws you to it?",
      "How have the places you've lived influenced who you are today?",
      "Describe a place that no longer exists but lives on in your memory.",
      "What was your favorite family vacation destination and why?",
      "If you could return to one place one more time, where would it be and why?",
      "What place in nature has had special significance for you? Describe your connection to it."
    ]
  }
];

// Today's journal prompts
const todaysPrompts = [
  "What brings you the most joy in your daily life now?",
  "Describe a moment of beauty you noticed today.",
  "What are you grateful for in this season of your life?",
  "What wisdom would you share with someone facing a challenge today?",
  "How has your definition of happiness evolved over your lifetime?",
  "What is one small thing that made you smile today?",
  "What makes you feel most alive in this chapter of your life?"
];

// End-of-life planning categories
const planningCategories = [
  {
    title: "Values & Wishes",
    description: "Document your core values and wishes to guide healthcare and end-of-life decisions.",
    icon: <Heart className="h-5 w-5 text-rose-500" />,
    sections: [
      "Personal Values Statement", 
      "Quality of Life Priorities",
      "Medical Treatment Preferences",
      "End-of-Life Care Wishes"
    ]
  },
  {
    title: "Important Documents",
    description: "Create and organize essential legal and personal documents.",
    icon: <FileCheck className="h-5 w-5 text-blue-500" />,
    sections: [
      "Will & Testament", 
      "Power of Attorney", 
      "Advance Directive",
      "Document Locations"
    ]
  },
  {
    title: "Legacy Planning",
    description: "Plan how you want to be remembered and what you want to leave behind.",
    icon: <Footprints className="h-5 w-5 text-emerald-500" />,
    sections: [
      "Personal Obituary", 
      "Funeral/Memorial Preferences", 
      "Legacy Letters",
      "Meaningful Possessions"
    ]
  },
  {
    title: "Family Communication",
    description: "Guidance for discussing your wishes with loved ones and healthcare providers.",
    icon: <HeartHandshake className="h-5 w-5 text-amber-500" />,
    sections: [
      "Family Discussion Guide", 
      "Contact Information", 
      "Message to Loved Ones",
      "Digital Account Access"
    ]
  }
];

// Inspirational quotes about legacy and life stories
const inspirationalQuotes = [
  {
    quote: "We all die. The goal isn't to live forever, the goal is to create something that will.",
    author: "Chuck Palahniuk"
  },
  {
    quote: "The greatest legacy one can pass on to one's children and grandchildren is not money or other material things accumulated in one's life, but rather a legacy of character and faith.",
    author: "Billy Graham"
  },
  {
    quote: "Carve your name on hearts, not tombstones. A legacy is etched into the minds of others and the stories they share about you.",
    author: "Shannon L. Alder"
  },
  {
    quote: "The life given us, by nature is short; but the memory of a well-spent life is eternal.",
    author: "Cicero"
  },
  {
    quote: "Your story is the greatest legacy that you will leave to your friends. It's the longest-lasting legacy you will leave to your heirs.",
    author: "Steve Saint"
  },
  {
    quote: "Legacy is not what's left tomorrow when you're gone. It's what you give, create, impact and contribute today while you're here that then happens to live on.",
    author: "Rasheed Ogunlaru"
  },
  {
    quote: "What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.",
    author: "Pericles"
  }
];

const GoldenYearsJournal: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  // Initialize active tab from URL parameter or default to "memoir"
  const initialTab = searchParams.get("tab") || "memoir";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    // Update URL when tab changes
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  // Journal entries state
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(todaysPrompts[0]);
  const [selectedChapter, setSelectedChapter] = useState(LifeChapterPrompts[0]);
  const [selectedChapterPrompt, setSelectedChapterPrompt] = useState(LifeChapterPrompts[0].prompts[0]);
  const [selectedCategory, setSelectedCategory] = useState(planningCategories[0]);
  const [selectedSection, setSelectedSection] = useState(planningCategories[0].sections[0]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(getAllFamilyMembers());
  const [selectedFamily, setSelectedFamily] = useState<string[]>([]);
  
  // Random inspirational quote
  const [quote, setQuote] = useState(inspirationalQuotes[0]);
  
  useEffect(() => {
    // Select a random quote on page load
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    setQuote(inspirationalQuotes[randomIndex]);
  }, []);

  // Sample entries (these would come from a database in a real app)
  const [entries, setEntries] = useState<{id: string, date: string, prompt: string, content: string, type: string}[]>([
    {
      id: "entry1",
      date: "April 10, 2025",
      prompt: "What brings you the most joy in your daily life now?",
      content: "My morning walks in the garden bring me incredible peace. The birds are so lively at dawn, and watching the seasons change through my plants keeps me connected to the rhythm of life. I've grown to appreciate these quiet moments more than I ever did when I was younger and always rushing.",
      type: "daily"
    },
    {
      id: "entry2",
      date: "April 8, 2025",
      prompt: "How did you meet your spouse or significant partner(s)?",
      content: "I met Sarah at a community dance in the summer of 1968. She was wearing a yellow dress that caught my eye from across the room. I worked up the courage to ask her to dance, and despite stepping on her toes twice, she agreed to see me again. That dance changed the course of my entire life.",
      type: "memoir"
    }
  ]);

  // Sample planning documents
  const [planningDocs, setPlanningDocs] = useState<{id: string, category: string, section: string, content: string, lastUpdated: string}[]>([
    {
      id: "plan1",
      category: "Values & Wishes",
      section: "Personal Values Statement",
      content: "I value independence, dignity, and quality of life over longevity. I want medical decisions to prioritize comfort and clarity of mind. I believe in facing end-of-life with honesty and openness, surrounded by loved ones in a peaceful setting if possible.",
      lastUpdated: "April 5, 2025"
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
      content: journalEntry,
      type: activeTab === "daily" ? "daily" : "memoir"
    };
    
    setEntries([newEntry, ...entries]);
    setJournalEntry("");
    
    toast({
      title: "Journal Entry Saved",
      description: "Your thoughts have been recorded in your journal.",
    });
  };

  const handleSavePlanningDoc = () => {
    if (!journalEntry.trim()) {
      toast({
        title: "Cannot Save Empty Document",
        description: "Please write something before saving your planning document.",
        variant: "destructive"
      });
      return;
    }
    
    const newDoc = {
      id: `plan${Date.now()}`,
      category: selectedCategory.title,
      section: selectedSection,
      content: journalEntry,
      lastUpdated: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    };
    
    setPlanningDocs([newDoc, ...planningDocs]);
    setJournalEntry("");
    
    toast({
      title: "Document Saved",
      description: "Your planning document has been updated.",
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

  const handleExportMemoir = () => {
    // This would generate a PDF in a real app
    toast({
      title: "Memoir Export Started",
      description: "Your life story memoir is being compiled into a beautiful document.",
    });
    
    setTimeout(() => {
      toast({
        title: "Memoir Export Complete",
        description: "Your memoir has been saved to your downloads folder.",
      });
    }, 3000);
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
              <h1 className="text-3xl font-light text-white">Legacy Journal & Planning</h1>
              <p className="text-white/90">Preserve your stories, wisdom, and wishes for generations to come</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inspirational Quote Banner */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-amber-100">
          <p className="text-amber-800 italic text-center">
            "{quote.quote}" <span className="text-amber-600 font-medium block mt-1">— {quote.author}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4">
        <Tabs defaultValue={initialTab} className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white/50 border border-amber-200 mb-6">
            <TabsTrigger value="memoir" className="data-[state=active]:bg-amber-100">
              <BookOpen className="h-4 w-4 mr-2" /> Life Story Memoir
            </TabsTrigger>
            <TabsTrigger value="daily" className="data-[state=active]:bg-amber-100">
              <Clock className="h-4 w-4 mr-2" /> Daily Reflections
            </TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-amber-100">
              <FileCheck className="h-4 w-4 mr-2" /> End-of-Life Planning
            </TabsTrigger>
            <TabsTrigger value="entries" className="data-[state=active]:bg-amber-100">
              <PenTool className="h-4 w-4 mr-2" /> Past Entries
            </TabsTrigger>
            <TabsTrigger value="share" className="data-[state=active]:bg-amber-100">
              <Share className="h-4 w-4 mr-2" /> Share with Family
            </TabsTrigger>
          </TabsList>

          {/* Life Story Memoir Tab */}
          <TabsContent value="memoir">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 sticky top-6">
                  <h3 className="text-xl font-medium text-amber-700 mb-4">Life Chapters</h3>
                  <p className="text-gray-600 mb-4">
                    Build your memoir one chapter at a time. Select a life period to explore and answer the prompts at your own pace.
                  </p>
                  <div className="space-y-3">
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
                        <div className="flex items-center mb-1">
                          <div className="text-amber-600 mr-2">
                            {chapter.icon}
                          </div>
                          <p className="text-gray-800 font-medium">{chapter.title}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{chapter.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-amber-100">
                    <Button
                      onClick={handleExportMemoir}
                      variant="outline"
                      className="w-full flex items-center justify-center border-amber-300 text-amber-700"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export Full Memoir
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-amber-500">
                      {selectedChapter.icon}
                    </div>
                    <h2 className="text-xl font-medium text-gray-800">{selectedChapter.title}</h2>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200 space-y-3">
                    <p className="text-sm text-amber-700 font-medium mb-2">Select a prompt to answer:</p>
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
                  
                  <div className="flex justify-between space-x-3">
                    <Button variant="outline" onClick={() => setJournalEntry("")} className="border-amber-300 text-amber-700">
                      Clear
                    </Button>
                    
                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => {
                          const nextPromptIndex = selectedChapter.prompts.indexOf(selectedChapterPrompt) + 1;
                          if (nextPromptIndex < selectedChapter.prompts.length) {
                            setSelectedChapterPrompt(selectedChapter.prompts[nextPromptIndex]);
                            setJournalEntry("");
                          } else {
                            // Move to next chapter if at the end of prompts
                            const nextChapterIndex = LifeChapterPrompts.indexOf(selectedChapter) + 1;
                            if (nextChapterIndex < LifeChapterPrompts.length) {
                              setSelectedChapter(LifeChapterPrompts[nextChapterIndex]);
                              setSelectedChapterPrompt(LifeChapterPrompts[nextChapterIndex].prompts[0]);
                              setJournalEntry("");
                            }
                          }
                        }}
                        variant="outline" 
                        className="border-amber-300 text-amber-700"
                      >
                        Next Prompt
                      </Button>
                      
                      <Button onClick={handleSaveEntry} className="bg-amber-500 hover:bg-amber-600 text-white">
                        Save Entry <Save className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Daily Reflections Tab */}
          <TabsContent value="daily">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 sticky top-6">
                  <h3 className="text-xl font-medium text-amber-700 mb-4">Today's Prompts</h3>
                  <p className="text-gray-600 mb-4">
                    Reflect on the present moment with these daily journal prompts designed to capture your thoughts and wisdom.
                  </p>
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

          {/* End-of-Life Planning Tab */}
          <TabsContent value="planning">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 sticky top-6">
                  <h3 className="text-xl font-medium text-amber-700 mb-4">Planning Categories</h3>
                  <p className="text-gray-600 mb-4">
                    Document your wishes and plans to ensure peace of mind for yourself and your loved ones.
                  </p>
                  <div className="space-y-3">
                    {planningCategories.map((category, index) => (
                      <div 
                        key={index} 
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedSection(category.sections[0]);
                          setJournalEntry("");
                          
                          // Find existing content for this category/section
                          const existingDoc = planningDocs.find(
                            doc => doc.category === category.title && doc.section === category.sections[0]
                          );
                          
                          if (existingDoc) {
                            setJournalEntry(existingDoc.content);
                          }
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedCategory.title === category.title 
                            ? "bg-amber-100 border border-amber-300" 
                            : "bg-amber-50 hover:bg-amber-100 border border-amber-100"
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          <div className="mr-2">
                            {category.icon}
                          </div>
                          <p className="text-gray-800 font-medium">{category.title}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-amber-100">
                    <Button
                      onClick={() => {
                        toast({
                          title: "Documents Exported",
                          description: "Your end-of-life planning documents have been prepared as PDF files.",
                        });
                      }}
                      variant="outline"
                      className="w-full flex items-center justify-center border-amber-300 text-amber-700"
                    >
                      <Archive className="mr-2 h-4 w-4" /> Export All Documents
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {selectedCategory.icon}
                      <h2 className="text-xl font-medium text-gray-800">{selectedCategory.title}</h2>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="text-amber-700 hover:text-amber-800 hover:bg-amber-100"
                      onClick={() => {
                        toast({
                          title: "Printable Document",
                          description: "A printer-friendly version has been prepared.",
                        });
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" /> Print
                    </Button>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                    <Label className="text-amber-800 mb-2 block">Select section:</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedCategory.sections.map((section, index) => (
                        <div 
                          key={index} 
                          onClick={() => {
                            setSelectedSection(section);
                            
                            // Find existing content for this section
                            const existingDoc = planningDocs.find(
                              doc => doc.category === selectedCategory.title && doc.section === section
                            );
                            
                            if (existingDoc) {
                              setJournalEntry(existingDoc.content);
                            } else {
                              setJournalEntry("");
                            }
                          }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedSection === section 
                              ? "bg-white border border-amber-300" 
                              : "hover:bg-white/50 border border-transparent"
                          }`}
                        >
                          <p className="text-gray-700">{section}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 border border-amber-200">
                    <Label htmlFor="planning-content" className="text-gray-700 mb-2 block">
                      {selectedSection}
                    </Label>
                    <Textarea 
                      id="planning-content"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      placeholder={`Document your wishes for ${selectedSection}...`}
                      className="min-h-[200px] mb-4 border-amber-200 focus-visible:ring-amber-400"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setJournalEntry("")} className="border-amber-300 text-amber-700">
                      Clear
                    </Button>
                    <Button onClick={handleSavePlanningDoc} className="bg-amber-500 hover:bg-amber-600 text-white">
                      Save Document <Save className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Past Entries Tab */}
          <TabsContent value="entries">
            <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-amber-700">Your Journal Archive</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-amber-300 text-amber-700">
                    <Clock className="h-4 w-4 mr-2" /> Recent
                  </Button>
                  <Button variant="outline" className="border-amber-300 text-amber-700">
                    <BookOpen className="h-4 w-4 mr-2" /> Memoir
                  </Button>
                  <Button variant="outline" className="border-amber-300 text-amber-700">
                    <FileCheck className="h-4 w-4 mr-2" /> Planning
                  </Button>
                </div>
              </div>

              <div className="space-y-6 mt-4">
                {entries.length === 0 ? (
                  <div className="bg-amber-50 rounded-xl p-8 text-center">
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
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">{entry.date}</h3>
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full inline-block">
                              {entry.type === "daily" ? "Daily Reflection" : "Memoir Entry"}
                            </div>
                          </div>
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
                <h3 className="text-xl font-medium text-amber-700 mb-4">Share Your Legacy</h3>
                
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
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 mr-2">4</div>
                      <span>Ensure your wisdom and life lessons live on</span>
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
