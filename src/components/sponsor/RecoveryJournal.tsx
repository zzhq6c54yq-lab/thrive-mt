
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Save, Pencil, Star, UserCheck, Heart, ArrowUp, ArrowDown, File, MessageCircle } from "lucide-react";

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: "great" | "good" | "okay" | "difficult" | "struggling";
  gratitude: string[];
}

const moodEmojis = {
  "great": "😄",
  "good": "🙂",
  "okay": "😐",
  "difficult": "😔",
  "struggling": "😣"
};

const moodColors = {
  "great": "bg-green-100 text-green-800 border-green-300",
  "good": "bg-blue-100 text-blue-800 border-blue-300",
  "okay": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "difficult": "bg-orange-100 text-orange-800 border-orange-300",
  "struggling": "bg-red-100 text-red-800 border-red-300"
};

const journalPrompts = [
  "How am I feeling about my recovery today?",
  "What triggered me today, and how did I respond?",
  "What am I grateful for in my recovery journey?",
  "What's one thing I did well today?",
  "What's one challenge I faced today?",
  "What did I learn about myself today?",
  "How did I take care of myself today?",
  "What support did I receive or give today?",
  "What's one thing I'm looking forward to tomorrow?",
  "How did I use the tools of recovery today?"
];

// Mock data for demonstration
const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: new Date(2025, 3, 5),
    title: "One day at a time",
    content: "Today was challenging, but I made it through without using. I attended a meeting and connected with my sponsor. Taking things one day at a time is helping me stay grounded.",
    mood: "good",
    gratitude: ["My sponsor's support", "The tools I've learned", "My health"]
  },
  {
    id: "2",
    date: new Date(2025, 3, 3),
    title: "Dealing with triggers",
    content: "Ran into an old using friend today. The craving hit hard, but I used the techniques from group therapy. Called my sponsor immediately after. Proud I didn't give in.",
    mood: "difficult",
    gratitude: ["The strength to walk away", "My sponsor answering my call", "This journal"]
  },
  {
    id: "3",
    date: new Date(2025, 3, 1),
    title: "Celebrating 30 days",
    content: "I can't believe I've made it 30 days clean. The program is working if I work it. Grateful for the fellowship and all the support. One month down, the rest of my life to go!",
    mood: "great",
    gratitude: ["30 days clean", "The fellowship", "A second chance at life"]
  }
];

const RecoveryJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [activeTab, setActiveTab] = useState<string>("new-entry");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [mood, setMood] = useState<JournalEntry["mood"]>("okay");
  const [gratitudeItems, setGratitudeItems] = useState<string[]>(["", "", ""]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toast } = useToast();

  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitudeItems = [...gratitudeItems];
    newGratitudeItems[index] = value;
    setGratitudeItems(newGratitudeItems);
  };

  const handleSaveEntry = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title for your journal entry.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please write something in your journal entry.",
        variant: "destructive"
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      title,
      content,
      mood,
      gratitude: gratitudeItems.filter(item => item.trim() !== "")
    };

    setEntries([newEntry, ...entries]);
    
    // Reset form
    setTitle("");
    setContent("");
    setMood("okay");
    setGratitudeItems(["", "", ""]);
    setSelectedDate(new Date());
    
    toast({
      title: "Journal Entry Saved",
      description: "Your recovery journal entry has been successfully saved.",
    });
    
    setActiveTab("history");
  };

  const filteredEntries = entries.filter(entry => {
    if (!searchTerm) return true;
    return (
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    setContent(prevContent => {
      if (prevContent.trim() !== "") {
        return `${prevContent}\n\n${journalPrompts[randomIndex]}:\n`;
      }
      return `${journalPrompts[randomIndex]}:\n`;
    });
  };

  return (
    <div className="space-y-8">
      <Card className="border-2 border-indigo-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-700 via-purple-700 to-purple-800 text-white">
          <CardTitle className="text-2xl">Recovery Journal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full rounded-none">
              <TabsTrigger value="new-entry" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900">
                <Pencil className="h-4 w-4 mr-2" /> New Entry
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900">
                <File className="h-4 w-4 mr-2" /> Journal History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-entry" className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Give your entry a title..."
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Today I'm feeling...</label>
                  <div className="grid grid-cols-5 gap-2">
                    {(["great", "good", "okay", "difficult", "struggling"] as JournalEntry["mood"][]).map((m) => (
                      <Button
                        key={m}
                        type="button"
                        variant={mood === m ? "default" : "outline"}
                        className={`flex flex-col items-center px-3 py-2 h-auto ${mood === m ? "bg-purple-700" : ""}`}
                        onClick={() => setMood(m)}
                      >
                        <span className="text-2xl mb-1">{moodEmojis[m]}</span>
                        <span className="text-xs capitalize">{m}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Journal Entry</label>
                    <Button variant="ghost" size="sm" onClick={getRandomPrompt} className="text-purple-600 hover:text-purple-800 h-8">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Get Prompt
                    </Button>
                  </div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write about your recovery journey today..."
                    rows={8}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Gratitude List (Three things I'm grateful for today)</label>
                  <div className="space-y-2">
                    {gratitudeItems.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <Input
                          value={item}
                          onChange={(e) => handleGratitudeChange(index, e.target.value)}
                          placeholder={`I'm grateful for...`}
                          className="flex-grow"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-6">
              <div className="space-y-6">
                <Input
                  placeholder="Search journal entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                
                {filteredEntries.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEntries.map(entry => (
                      <div 
                        key={entry.id} 
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className={`px-4 py-3 border-b flex justify-between items-center ${moodColors[entry.mood]}`}>
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{moodEmojis[entry.mood]}</span>
                            <h3 className="font-medium">{entry.title}</h3>
                          </div>
                          <div className="text-xs">
                            {format(new Date(entry.date), "MMM d, yyyy")}
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="whitespace-pre-wrap text-gray-700">{entry.content}</p>
                          
                          {entry.gratitude.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-100">
                              <p className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                                <Heart className="h-4 w-4 text-pink-500 mr-1" />
                                Gratitude List
                              </p>
                              <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                                {entry.gratitude.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No journal entries found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm ? "Try a different search term" : "Start journaling to see your entries here"}
                    </p>
                    {searchTerm && (
                      <Button variant="outline" onClick={() => setSearchTerm("")}>
                        Clear Search
                      </Button>
                    )}
                    {!searchTerm && (
                      <Button onClick={() => setActiveTab("new-entry")} className="bg-purple-700 hover:bg-purple-800">
                        Create Your First Entry
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        {activeTab === "new-entry" && (
          <CardFooter className="bg-gray-50 border-t px-6 py-4">
            <Button 
              onClick={handleSaveEntry}
              className="ml-auto bg-purple-700 hover:bg-purple-800"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Journal Entry
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default RecoveryJournal;
