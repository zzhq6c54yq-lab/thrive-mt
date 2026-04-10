
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, Users, Star, Calendar, UserPlus, Clock, Heart, Sparkles,
  PhoneCall, Mail, AtSign, UserRound, Medal, BadgeCheck, Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact {
  id: string;
  name: string;
  category: string;
  contactMethod: string;
  lastContacted: string;
  frequency: string;
  notes: string;
  favorite: boolean;
  relationship: string;
  avatar: string;
}

const CONTACTS_STORAGE_KEY = "thrivemt_personal_contacts";
const STREAK_STORAGE_KEY = "contactStreak";

const PersonalizedContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contacts");
  const [showAddContact, setShowAddContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [streakCount, setStreakCount] = useState(0);
  
  const [newContact, setNewContact] = useState({
    name: "",
    category: "friend",
    contactMethod: "phone",
    frequency: "weekly",
    notes: "",
    relationship: "friend"
  });

  // Load persisted data
  useEffect(() => {
    const savedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    const savedStreak = localStorage.getItem(STREAK_STORAGE_KEY) || '0';
    setStreakCount(parseInt(savedStreak));
  }, []);

  // Persist contacts on change
  const saveContacts = (updated: Contact[]) => {
    setContacts(updated);
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Filter contacts based on search and category
  useEffect(() => {
    let filtered = contacts;
    if (searchQuery) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.relationship.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }
    setFilteredContacts(filtered);
  }, [searchQuery, selectedCategory, contacts]);

  const handleAddContact = () => {
    if (!newContact.name) {
      toast({ title: "Name required", description: "Please enter a name for your contact.", duration: 3000 });
      return;
    }
    const newContactData: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      category: newContact.category,
      contactMethod: newContact.contactMethod,
      lastContacted: new Date().toISOString(),
      frequency: newContact.frequency,
      notes: newContact.notes,
      favorite: false,
      relationship: newContact.relationship,
      avatar: newContact.name.split(" ").map(n => n[0]).join("").substring(0, 2)
    };
    saveContacts([...contacts, newContactData]);
    toast({ title: "Contact added!", description: `${newContact.name} has been added to your contacts.`, duration: 3000 });
    setNewContact({ name: "", category: "friend", contactMethod: "phone", frequency: "weekly", notes: "", relationship: "friend" });
    setShowAddContact(false);
  };

  const handleLogContact = (contactId: string) => {
    saveContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, lastContacted: new Date().toISOString() } : contact
    ));
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);
    localStorage.setItem(STREAK_STORAGE_KEY, newStreak.toString());
    toast({ title: "Connection logged!", description: `Great job! You're on a ${newStreak} day connection streak.`, duration: 3000 });
  };

  const toggleFavorite = (contactId: string) => {
    saveContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
    ));
  };

  const deleteContact = (contactId: string) => {
    saveContacts(contacts.filter(contact => contact.id !== contactId));
    toast({ title: "Contact deleted", description: "The contact has been removed from your list.", duration: 3000 });
  };

  const formatLastContacted = (isoString: string) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week(s) ago`;
    return `${Math.floor(days / 30)} month(s) ago`;
  };

  const categoryFilters = [
    { id: "all", label: "All", icon: <Users className="h-4 w-4" /> },
    { id: "family", label: "Family", icon: <Heart className="h-4 w-4" /> },
    { id: "friend", label: "Friends", icon: <Star className="h-4 w-4" /> },
    { id: "support", label: "Support", icon: <BadgeCheck className="h-4 w-4" /> },
    { id: "professional", label: "Professional", icon: <Medal className="h-4 w-4" /> }
  ];

  const contactMethods = [
    { value: "phone", label: "Phone", icon: <PhoneCall className="h-4 w-4" /> },
    { value: "text", label: "Text", icon: <MessageCircle className="h-4 w-4" /> },
    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { value: "video", label: "Video", icon: <UserPlus className="h-4 w-4" /> },
    { value: "inPerson", label: "In Person", icon: <UserRound className="h-4 w-4" /> }
  ];

  const getContactMethodIcon = (method: string) => {
    return contactMethods.find(m => m.value === method)?.icon || <PhoneCall className="h-4 w-4" />;
  };

  const displayContacts = activeTab === "favorites" 
    ? filteredContacts.filter(c => c.favorite) 
    : filteredContacts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23F97316%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#F59E0B]">
                Personalized Contact
              </span>
            </h1>
            <p className="text-white/70">Stay connected with your support network</p>
          </div>
          <HomeButton />
        </div>
        
        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#F97316]/20 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Connection Streak</p>
              <p className="text-2xl font-bold text-white">{streakCount} days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#F97316]/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total Connections</p>
              <p className="text-2xl font-bold text-white">{contacts.length}</p>
            </div>
          </div>
          <div>
            <Button className="bg-[#F97316] hover:bg-[#F97316]/80 text-white" onClick={() => setShowAddContact(prev => !prev)}>
              {showAddContact ? "Cancel" : "Add Contact"}
            </Button>
          </div>
        </div>
        
        {/* Add Contact Form */}
        {showAddContact && (
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Add New Contact</CardTitle>
              <CardDescription className="text-white/70">Add someone from your support network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" placeholder="Enter name" className="bg-white/5 border-white/20 text-white" value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="relationship" className="text-white">Relationship</Label>
                    <Input id="relationship" placeholder="Sponsor, Friend, Family member, etc." className="bg-white/5 border-white/20 text-white" value={newContact.relationship} onChange={e => setNewContact({...newContact, relationship: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <select id="category" className="w-full bg-white/5 border border-white/20 text-white rounded-md p-2" value={newContact.category} onChange={e => setNewContact({...newContact, category: e.target.value})}>
                      <option value="friend">Friend</option>
                      <option value="family">Family</option>
                      <option value="support">Support</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactMethod" className="text-white">Preferred Contact Method</Label>
                    <select id="contactMethod" className="w-full bg-white/5 border border-white/20 text-white rounded-md p-2" value={newContact.contactMethod} onChange={e => setNewContact({...newContact, contactMethod: e.target.value})}>
                      <option value="phone">Phone</option>
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="video">Video Call</option>
                      <option value="inPerson">In Person</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="frequency" className="text-white">Contact Frequency</Label>
                    <select id="frequency" className="w-full bg-white/5 border border-white/20 text-white rounded-md p-2" value={newContact.frequency} onChange={e => setNewContact({...newContact, frequency: e.target.value})}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="asNeeded">As Needed</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-white">Notes</Label>
                    <Textarea id="notes" placeholder="Add any notes about this contact" className="bg-white/5 border-white/20 text-white" value={newContact.notes} onChange={e => setNewContact({...newContact, notes: e.target.value})} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#F97316] hover:bg-[#F97316]/80 text-white" onClick={handleAddContact}>Add Contact</Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/5">
          <Tabs defaultValue="contacts" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 gap-2 bg-black/30 mb-6 p-1 rounded-lg max-w-md mx-auto">
              <TabsTrigger value="contacts" className="data-[state=active]:bg-[#F97316]/90">
                <Users className="h-4 w-4 mr-2" />Contacts
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-[#F97316]/90">
                <Star className="h-4 w-4 mr-2" />Favorites
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-[#F97316]/90">
                <Calendar className="h-4 w-4 mr-2" />Timeline
              </TabsTrigger>
            </TabsList>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="w-full md:w-auto">
                <Input placeholder="Search contacts..." className="bg-white/5 border-white/20 text-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map(category => (
                  <Button
                    key={category.id}
                    variant="outline"
                    size="sm"
                    className={`border-white/20 ${selectedCategory === category.id || (category.id === "all" && !selectedCategory) ? 'bg-[#F97316]/20 text-[#F97316] border-[#F97316]/50' : 'text-white/70 hover:text-white'}`}
                    onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
                  >
                    {category.icon}
                    <span className="ml-1">{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <TabsContent value="contacts">
              {displayContacts.length === 0 ? (
                <div className="text-center py-16 text-white/50">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No contacts yet</p>
                  <p className="text-sm mt-1">Add your first contact to start building your support network.</p>
                  <Button className="mt-4 bg-[#F97316]" onClick={() => setShowAddContact(true)}>Add Your First Contact</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayContacts.map(contact => (
                    <Card key={contact.id} className="bg-white/5 border-white/10 text-white">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] font-bold text-sm">
                              {contact.avatar}
                            </div>
                            <div>
                              <h3 className="font-semibold">{contact.name}</h3>
                              <p className="text-xs text-white/60 capitalize">{contact.relationship}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(contact.id)}>
                              <Star className={`h-4 w-4 ${contact.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteContact(contact.id)}>
                              <Trash2 className="h-4 w-4 text-white/40" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
                          {getContactMethodIcon(contact.contactMethod)}
                          <span className="capitalize">{contact.contactMethod}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatLastContacted(contact.lastContacted)}</span>
                        </div>
                        {contact.notes && <p className="mt-2 text-xs text-white/40">{contact.notes}</p>}
                        <Button size="sm" className="mt-3 w-full bg-[#F97316]/20 text-[#F97316] hover:bg-[#F97316]/30" onClick={() => handleLogContact(contact.id)}>
                          Log Connection
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites">
              {contacts.filter(c => c.favorite).length === 0 ? (
                <div className="text-center py-16 text-white/50">
                  <Star className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">No favorites yet</p>
                  <p className="text-sm mt-1">Star contacts to see them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contacts.filter(c => c.favorite).map(contact => (
                    <Card key={contact.id} className="bg-white/5 border-white/10 text-white">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] font-bold text-sm">
                            {contact.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-xs text-white/60 capitalize">{contact.relationship}</p>
                          </div>
                        </div>
                        <Button size="sm" className="mt-3 w-full bg-[#F97316]/20 text-[#F97316] hover:bg-[#F97316]/30" onClick={() => handleLogContact(contact.id)}>
                          Log Connection
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline">
              {contacts.length === 0 ? (
                <div className="text-center py-16 text-white/50">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">No connection history yet</p>
                  <p className="text-sm mt-1">Log connections with your contacts to see your timeline.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...contacts]
                    .sort((a, b) => new Date(b.lastContacted).getTime() - new Date(a.lastContacted).getTime())
                    .map(contact => (
                      <div key={contact.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] font-bold text-sm">
                          {contact.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-xs text-white/50">Last connected: {formatLastContacted(contact.lastContacted)}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-[#F97316]" onClick={() => handleLogContact(contact.id)}>
                          Log
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedContact;
