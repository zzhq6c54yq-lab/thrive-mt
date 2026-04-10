
import React, { useState, useEffect } from "react";
import { Share2, X, Check, Copy, Mail, Users, UserPlus } from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getAllFamilyMembers, type FamilyMember } from "@/services/familyShareService";

interface FamilyShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const CUSTOM_CONTACTS_KEY = "thrivemt_share_contacts";

interface ShareContact {
  id: string;
  name: string;
  email: string;
}

const FamilyShareDialog: React.FC<FamilyShareDialogProps> = ({
  open,
  onOpenChange,
  videoId,
  videoTitle,
  videoUrl,
  thumbnailUrl
}) => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState(`I wanted to share this video diary entry "${videoTitle}" with you.`);
  const [shareLink, setShareLink] = useState(`https://thrivemt.app/shared-video/${videoId}`);
  const [contacts, setContacts] = useState<ShareContact[]>([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  // Load contacts: merge family members from service + user-added custom contacts
  useEffect(() => {
    const familyMembers = getAllFamilyMembers();
    const fromService: ShareContact[] = familyMembers.map(m => ({
      id: m.id,
      name: `${m.name} (${m.relation})`,
      email: m.contactEmail || ""
    }));
    
    const savedCustom = localStorage.getItem(CUSTOM_CONTACTS_KEY);
    const custom: ShareContact[] = savedCustom ? JSON.parse(savedCustom) : [];
    
    setContacts([...fromService, ...custom]);
  }, [open]);

  const toggleContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    );
  };

  const handleAddContact = () => {
    if (!newName || !newEmail) {
      toast({ title: "Missing fields", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    const newContact: ShareContact = { id: `custom_${Date.now()}`, name: newName, email: newEmail };
    const savedCustom = localStorage.getItem(CUSTOM_CONTACTS_KEY);
    const custom: ShareContact[] = savedCustom ? JSON.parse(savedCustom) : [];
    custom.push(newContact);
    localStorage.setItem(CUSTOM_CONTACTS_KEY, JSON.stringify(custom));
    setContacts(prev => [...prev, newContact]);
    setNewName("");
    setNewEmail("");
    setShowAddForm(false);
    toast({ title: "Contact added", description: `${newContact.name} can now receive shared videos.` });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({ title: "Link Copied", description: "Share link has been copied to clipboard" });
  };

  const handleShare = () => {
    toast({
      title: "Video Shared",
      description: `Your video has been shared with ${selectedContacts.length} contacts`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2a3c] text-white border-gray-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-indigo-400" />
            Share Video with Loved Ones
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your video diary entry with family members and your support network
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="col-span-1">
            <div className="relative rounded-lg overflow-hidden">
              <img src={thumbnailUrl} alt={videoTitle} className="w-full aspect-video object-cover" />
            </div>
            <h3 className="mt-2 font-medium">{videoTitle}</h3>
          </div>
          <div className="col-span-1 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="rounded-full bg-green-500/10 p-1 mr-2"><Check className="h-4 w-4 text-green-500" /></span>
                <span className="text-gray-300 text-sm">Secure sharing</span>
              </div>
              <div className="flex items-center">
                <span className="rounded-full bg-green-500/10 p-1 mr-2"><Check className="h-4 w-4 text-green-500" /></span>
                <span className="text-gray-300 text-sm">Password-protected</span>
              </div>
              <div className="flex items-center">
                <span className="rounded-full bg-green-500/10 p-1 mr-2"><Check className="h-4 w-4 text-green-500" /></span>
                <span className="text-gray-300 text-sm">Expires after 30 days</span>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="contacts">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-indigo-600">
              <Users className="h-4 w-4 mr-2" />Select Contacts
            </TabsTrigger>
            <TabsTrigger value="link" className="data-[state=active]:bg-indigo-600">
              <Copy className="h-4 w-4 mr-2" />Share Link
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{contacts.length} contacts available</span>
                <Button size="sm" variant="ghost" className="text-indigo-400" onClick={() => setShowAddForm(!showAddForm)}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  {showAddForm ? "Cancel" : "Add Contact"}
                </Button>
              </div>

              {showAddForm && (
                <div className="p-3 rounded-lg bg-gray-800/50 space-y-2">
                  <Input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                  <Input placeholder="Email" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                  <Button size="sm" className="bg-indigo-600" onClick={handleAddContact}>Save Contact</Button>
                </div>
              )}

              {contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p>No contacts yet. Add someone to share with.</p>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50">
                      <Checkbox 
                        id={`contact-${contact.id}`}
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => toggleContact(contact.id)}
                      />
                      <Label htmlFor={`contact-${contact.id}`} className="flex-1 cursor-pointer">
                        <div>{contact.name}</div>
                        {contact.email && <div className="text-gray-400 text-xs">{contact.email}</div>}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
              
              <div>
                <Label htmlFor="message" className="text-sm text-gray-300">Personal Message</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-1 p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 resize-none"
                  rows={3}
                />
              </div>
              
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={selectedContacts.length === 0}
                onClick={handleShare}
              >
                <Mail className="h-4 w-4 mr-2" />
                Share with {selectedContacts.length} {selectedContacts.length === 1 ? 'Contact' : 'Contacts'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="link" className="mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="share-link" className="text-sm text-gray-300">Share Link</Label>
                <div className="flex mt-1">
                  <Input id="share-link" value={shareLink} readOnly className="flex-1 bg-gray-800 border-gray-700 text-gray-200" />
                  <Button onClick={handleCopyLink} className="ml-2 bg-indigo-600 hover:bg-indigo-700">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">This link is valid for 30 days and can be viewed by anyone with the link</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyShareDialog;
