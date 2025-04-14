
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation/NavigationBar";
import { 
  BookOpen, 
  Save, 
  FileText, 
  Share2, 
  Download, 
  Printer, 
  PencilLine, 
  BookMarked, 
  Plus,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from "lucide-react";
import FileUploader from "@/components/journal/FileUploader";
import JournalPrompts from "@/components/journal/JournalPrompts";

// Journal entry interface
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  images?: string[];
}

const GoldenYearsJournal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // State for journal entries
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('legacyJournalEntries');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for current entry being edited
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: crypto.randomUUID(),
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'childhood',
    images: []
  });
  
  // State for UI
  const [activeTab, setActiveTab] = useState('write');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [promptCategory, setPromptCategory] = useState('childhood');
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  
  // Save entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('legacyJournalEntries', JSON.stringify(entries));
  }, [entries]);

  // Handle entry changes
  const handleEntryChange = (field: keyof JournalEntry, value: string) => {
    setCurrentEntry(prev => ({ ...prev, [field]: value }));
  };

  // Save the current entry
  const saveEntry = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and content for your entry.",
        variant: "destructive"
      });
      return;
    }

    // Check if we're editing an existing entry or creating a new one
    const entryIndex = entries.findIndex(entry => entry.id === currentEntry.id);
    
    if (entryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[entryIndex] = currentEntry;
      setEntries(updatedEntries);
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been successfully updated.",
      });
    } else {
      // Add new entry
      setEntries([...entries, currentEntry]);
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
    }
    
    // Reset current entry for a new one
    setCurrentEntry({
      id: crypto.randomUUID(),
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'childhood',
      images: []
    });
  };

  // View a specific entry
  const viewEntry = (id: string) => {
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
      setCurrentEntry(entry);
      setSelectedEntryId(id);
      setActiveTab('write');
    }
  };

  // Delete an entry
  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    
    // If we're currently viewing this entry, reset the form
    if (selectedEntryId === id) {
      setCurrentEntry({
        id: crypto.randomUUID(),
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        category: 'childhood',
        images: []
      });
      setSelectedEntryId(null);
    }
    
    toast({
      title: "Entry Deleted",
      description: "Your journal entry has been deleted.",
    });
  };

  // Create a new entry
  const createNewEntry = () => {
    setCurrentEntry({
      id: crypto.randomUUID(),
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'childhood',
      images: []
    });
    setSelectedEntryId(null);
    setActiveTab('write');
  };

  // Apply a writing prompt
  const applyPrompt = (prompt: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${prompt}` : prompt
    }));
    setShowPromptDialog(false);
  };

  // Handle image uploads
  const handleImageUpload = (imageUrls: string[]) => {
    setCurrentEntry(prev => ({
      ...prev,
      images: [...(prev.images || []), ...imageUrls]
    }));
    toast({
      title: "Images Uploaded",
      description: "Your images have been added to the journal entry.",
    });
  };

  // Download the current entry as a text file
  const downloadEntry = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `# ${currentEntry.title}\n\nDate: ${currentEntry.date}\nCategory: ${currentEntry.category}\n\n${currentEntry.content}`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentEntry.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Entry Downloaded",
      description: "Your journal entry has been downloaded as a text file.",
    });
  };

  // Print the current entry
  const printEntry = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${currentEntry.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              h1 { color: #046b62; }
              .meta { color: #666; margin-bottom: 20px; }
              .content { white-space: pre-wrap; }
              img { max-width: 100%; margin: 10px 0; }
            </style>
          </head>
          <body>
            <h1>${currentEntry.title}</h1>
            <div class="meta">Date: ${new Date(currentEntry.date).toLocaleDateString()}</div>
            <div class="meta">Category: ${currentEntry.category}</div>
            <div class="content">${currentEntry.content}</div>
            ${currentEntry.images?.map(img => `<img src="${img}" alt="Journal image" />`).join('') || ''}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    
    toast({
      title: "Printing",
      description: "Your journal entry is being sent to the printer.",
    });
  };

  // Share the current entry (simulated)
  const shareEntry = () => {
    toast({
      title: "Share Options",
      description: "Sharing options would appear here in a production app.",
    });
  };

  // Export all journal entries as a single document
  const exportJournal = () => {
    const content = entries.map(entry => (
      `# ${entry.title}\n\nDate: ${entry.date}\nCategory: ${entry.category}\n\n${entry.content}\n\n---\n\n`
    )).join('');
    
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "My_Legacy_Journal.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Journal Exported",
      description: "Your entire journal has been exported as a text file.",
    });
  };

  // Generate a sample entry with AI (simulated)
  const generateSampleEntry = () => {
    const sampleEntries = [
      {
        title: "My First Day of School",
        content: "I remember the butterflies in my stomach as my mother straightened my collar. The smell of new books and freshly waxed floors greeted me as I stepped into the classroom. Miss Johnson, with her kind smile, made me feel at home immediately...",
        category: "childhood"
      },
      {
        title: "Meeting My Spouse",
        content: "It was a chance encounter at the library. I was reaching for a book on the top shelf, and there they were, offering to help. Our hands touched briefly, and in that moment, something shifted in the universe. We talked for hours that day, forgetting the time...",
        category: "relationships"
      },
      {
        title: "Career Reflections",
        content: "Looking back on forty years in the profession, I'm most proud of the people I mentored. The technical achievements matter less now than the lives I touched. I remember especially young Michael, who came to me lacking confidence but eventually surpassed even my abilities...",
        category: "career"
      }
    ];
    
    const sample = sampleEntries[Math.floor(Math.random() * sampleEntries.length)];
    
    setCurrentEntry(prev => ({
      ...prev,
      title: sample.title,
      content: sample.content,
      category: sample.category
    }));
    
    toast({
      title: "Sample Generated",
      description: "A sample entry has been created. Feel free to edit it!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#034b45] via-[#046b62] to-[#067b6d] text-white">
      {/* Navigation bar */}
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title="Legacy Journal"
        portalMode={true}
        portalPath="/golden-years-portal"
      />
      
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <BookOpen className="mr-3 h-8 w-8" />
              Your Legacy Journal
            </h1>
            <p className="text-lg text-teal-100 max-w-2xl">
              Preserve your life story, wisdom, and memories for future generations.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button 
              variant="outline"
              className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
              onClick={createNewEntry}
            >
              <Plus className="mr-1 h-4 w-4" /> New Entry
            </Button>
            <Button 
              variant="outline"
              className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
              onClick={exportJournal}
            >
              <Download className="mr-1 h-4 w-4" /> Export All
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-teal-800/40">
            <TabsTrigger value="write" className="data-[state=active]:bg-teal-600">
              <PencilLine className="mr-2 h-4 w-4" />
              Write & Edit
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-teal-600">
              <BookMarked className="mr-2 h-4 w-4" />
              Journal Library
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-teal-600">
              <FileText className="mr-2 h-4 w-4" />
              Writing Resources
            </TabsTrigger>
          </TabsList>
          
          {/* Write & Edit Tab */}
          <TabsContent value="write" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main editing area */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle>
                      <Input 
                        placeholder="Entry Title" 
                        value={currentEntry.title}
                        onChange={(e) => handleEntryChange('title', e.target.value)}
                        className="bg-white/10 border-teal-300/30 text-white placeholder:text-white/50"
                      />
                    </CardTitle>
                    <CardDescription className="text-teal-100">
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <label htmlFor="entry-date" className="text-sm">Date:</label>
                          <Input 
                            id="entry-date"
                            type="date" 
                            value={currentEntry.date}
                            onChange={(e) => handleEntryChange('date', e.target.value)}
                            className="w-auto bg-white/10 border-teal-300/30 text-white"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="entry-category" className="text-sm">Category:</label>
                          <Select
                            value={currentEntry.category}
                            onValueChange={(value) => handleEntryChange('category', value)}
                          >
                            <SelectTrigger className="w-[180px] bg-white/10 border-teal-300/30 text-white">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="childhood">Childhood</SelectItem>
                              <SelectItem value="adolescence">Adolescence</SelectItem>
                              <SelectItem value="youngadult">Young Adult</SelectItem>
                              <SelectItem value="career">Career</SelectItem>
                              <SelectItem value="relationships">Relationships</SelectItem>
                              <SelectItem value="parenthood">Parenthood</SelectItem>
                              <SelectItem value="retirement">Retirement</SelectItem>
                              <SelectItem value="wisdom">Wisdom & Advice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Write your story here... share your memories, experiences, and the wisdom you've gained through the years."
                      value={currentEntry.content}
                      onChange={(e) => handleEntryChange('content', e.target.value)}
                      className="min-h-[300px] bg-white/10 border-teal-300/30 text-white placeholder:text-white/50"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPromptDialog(true)}
                        className="border-teal-400 text-teal-100 hover:bg-teal-700/50 mr-2"
                      >
                        <Sparkles className="mr-1 h-4 w-4" />
                        Get Prompts
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateSampleEntry}
                        className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
                      >
                        <Sparkles className="mr-1 h-4 w-4" />
                        Sample Entry
                      </Button>
                    </div>
                    <Button onClick={saveEntry} className="bg-teal-500 hover:bg-teal-600">
                      <Save className="mr-1 h-4 w-4" />
                      Save Entry
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Image upload section */}
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Add Photos</CardTitle>
                    <CardDescription className="text-teal-100">
                      Add photos to enhance your journal entry
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploader onUpload={handleImageUpload} />
                    
                    {/* Display uploaded images */}
                    {currentEntry.images && currentEntry.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {currentEntry.images.map((img, idx) => (
                          <div key={idx} className="relative h-24 bg-teal-900/30 rounded overflow-hidden">
                            <img 
                              src={img} 
                              alt={`Journal image ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Tools sidebar */}
              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Entry Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-teal-400 text-teal-100 hover:bg-teal-700/50"
                      onClick={downloadEntry}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download as Text
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-teal-400 text-teal-100 hover:bg-teal-700/50"
                      onClick={printEntry}
                    >
                      <Printer className="mr-2 h-4 w-4" />
                      Print Entry
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-teal-400 text-teal-100 hover:bg-teal-700/50"
                      onClick={shareEntry}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Entry
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Writing Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-teal-100">
                    <p>• Be specific with details that bring your memories to life</p>
                    <p>• Include sensory details—smells, sounds, tastes</p>
                    <p>• Don't worry about perfect grammar—focus on your story</p>
                    <p>• Include both joyful moments and challenges overcome</p>
                    <p>• Write as if speaking directly to future generations</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Journal Library Tab */}
          <TabsContent value="library">
            {entries.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-teal-300 opacity-50" />
                <h2 className="mt-4 text-xl font-semibold">Your Journal is Empty</h2>
                <p className="mt-2 text-teal-100">Start writing your first entry to preserve your memories.</p>
                <Button 
                  className="mt-4 bg-teal-500 hover:bg-teal-600"
                  onClick={createNewEntry}
                >
                  <Plus className="mr-1 h-4 w-4" /> Create First Entry
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Journal Entries</h2>
                  <Button 
                    variant="outline"
                    className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
                    onClick={exportJournal}
                  >
                    <Download className="mr-1 h-4 w-4" /> Export All Entries
                  </Button>
                </div>
                
                {/* Filter by category */}
                <div className="bg-white/10 p-4 rounded-lg flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-teal-400 hover:bg-teal-700/50 ${!promptCategory ? 'bg-teal-600' : ''}`}
                    onClick={() => setPromptCategory('')}
                  >
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'childhood' ? 'bg-teal-600' : ''}`}
                    onClick={() => setPromptCategory('childhood')}
                  >
                    Childhood
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'youngadult' ? 'bg-teal-600' : ''}`}
                    onClick={() => setPromptCategory('youngadult')}
                  >
                    Young Adult
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'career' ? 'bg-teal-600' : ''}`}
                    onClick={() => setPromptCategory('career')}
                  >
                    Career
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'relationships' ? 'bg-teal-600' : ''}`}
                    onClick={() => setPromptCategory('relationships')}
                  >
                    Relationships
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'wisdom' ? 'bg-teal-600' : ''}`}
                    onClick={() => setPromptCategory('wisdom')}
                  >
                    Wisdom
                  </Button>
                </div>
                
                {/* Entries list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries
                    .filter(entry => !promptCategory || entry.category === promptCategory)
                    .map(entry => (
                    <Card 
                      key={entry.id} 
                      className={`bg-white/10 backdrop-blur-sm border-teal-200/20 hover:bg-white/15 transition cursor-pointer ${
                        selectedEntryId === entry.id ? 'ring ring-teal-400' : ''
                      }`}
                      onClick={() => viewEntry(entry.id)}
                    >
                      <CardHeader>
                        <CardTitle>{entry.title}</CardTitle>
                        <CardDescription className="text-teal-100">
                          {new Date(entry.date).toLocaleDateString()} • {entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-teal-50 line-clamp-3">{entry.content}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-300 hover:text-red-100 hover:bg-red-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEntry(entry.id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
                        >
                          View <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Writing Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle>Memory-Jogging Techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Photo Reminiscence</h3>
                      <p className="text-teal-100">Look through old photos to spark memories. Consider describing:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-teal-100">
                        <li>Who is in the photo and your relationship to them</li>
                        <li>Where and when it was taken</li>
                        <li>What was happening just before or after the photo</li>
                        <li>How you felt at that moment</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Timeline Method</h3>
                      <p className="text-teal-100">Create a chronological timeline of your life's major events:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-teal-100">
                        <li>Start with your birth and earliest memories</li>
                        <li>Mark major life transitions (school, work, marriage, children)</li>
                        <li>Note historical events that impacted your life</li>
                        <li>Identify turning points that changed your life's direction</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Sensory Recall</h3>
                      <p className="text-teal-100">Focus on the five senses to bring memories to life:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-teal-100">
                        <li>Smells: Food cooking, perfumes, seasonal scents</li>
                        <li>Sounds: Music, voices, nature, city sounds</li>
                        <li>Tastes: Family recipes, childhood treats, special meals</li>
                        <li>Touch: Textures of clothing, hugs, weather sensations</li>
                        <li>Sights: Colors, places, people's faces and expressions</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle>Writing Styles & Approaches</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Chronological Narrative</h3>
                      <p className="text-teal-100">Start from your earliest memories and work forward through your life in order. This approach creates a clear timeline and helps readers follow your journey.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Thematic Organization</h3>
                      <p className="text-teal-100">Group stories by themes like "Family," "Career," or "Life Lessons" rather than chronologically. This works well for highlighting patterns and values across your life.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Letter Format</h3>
                      <p className="text-teal-100">Write as if addressing specific loved ones. For example, "Dear Grandchildren" creates an intimate connection with future readers.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Object-Based Memories</h3>
                      <p className="text-teal-100">Center stories around meaningful objects—a wedding ring, family heirloom, or special gift—and explain their significance in your life.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Legacy Book Format</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-teal-100">
                    <p>Once you've written several entries, consider organizing them into a complete legacy book with:</p>
                    <ul className="list-disc pl-5">
                      <li>Title page with your name and birth year</li>
                      <li>Table of contents organized by life periods</li>
                      <li>Introduction explaining why you created this memoir</li>
                      <li>Family tree or genealogy information</li>
                      <li>Photos with detailed captions</li>
                      <li>Life lessons or advice section</li>
                      <li>Historical context for major events</li>
                    </ul>
                    <p className="mt-2">Use the Export feature to compile your entries, then format them into a complete book.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-teal-200/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Recommended Reading</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-teal-100">
                    <div>
                      <p className="font-medium">Turning Memories Into Memoirs</p>
                      <p>by Denis Ledoux</p>
                    </div>
                    <div>
                      <p className="font-medium">The Story of Your Life</p>
                      <p>by Dan Wakefield</p>
                    </div>
                    <div>
                      <p className="font-medium">Legacy: A Step-by-Step Guide</p>
                      <p>by Linda Spence</p>
                    </div>
                    <div>
                      <p className="font-medium">How to Write Your Personal or Family History</p>
                      <p>by Katie Wiebe</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Writing Prompts Dialog */}
      <Dialog open={showPromptDialog} onOpenChange={setShowPromptDialog}>
        <DialogContent className="bg-teal-900 text-white border-teal-600 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Writing Prompts</DialogTitle>
            <DialogDescription className="text-teal-100">
              Select a category and choose a prompt to help inspire your writing
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'childhood' ? 'bg-teal-600' : ''}`}
                onClick={() => setPromptCategory('childhood')}
              >
                Childhood
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'youngadult' ? 'bg-teal-600' : ''}`}
                onClick={() => setPromptCategory('youngadult')}
              >
                Young Adult
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'career' ? 'bg-teal-600' : ''}`}
                onClick={() => setPromptCategory('career')}
              >
                Career
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'relationships' ? 'bg-teal-600' : ''}`}
                onClick={() => setPromptCategory('relationships')}
              >
                Relationships
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-teal-400 hover:bg-teal-700/50 ${promptCategory === 'wisdom' ? 'bg-teal-600' : ''}`}
                onClick={() => setPromptCategory('wisdom')}
              >
                Wisdom
              </Button>
            </div>
            
            <JournalPrompts category={promptCategory} onSelectPrompt={applyPrompt} />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPromptDialog(false)}
              className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoldenYearsJournal;
