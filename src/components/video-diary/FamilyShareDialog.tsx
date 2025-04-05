
import React, { useState, useEffect } from "react";
import { Users, X, Send, Plus, AlertCircle, CheckCircle2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  FamilyMember, 
  getAllFamilyMembers, 
  shareVideo,
  addFamilyMember
} from "@/services/familyShareService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FamilyShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const FamilyShareDialog: React.FC<FamilyShareDialogProps> = ({
  open,
  onOpenChange,
  videoId,
  videoTitle,
  videoUrl,
  thumbnailUrl
}) => {
  const { toast } = useToast();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    relation: "",
    email: ""
  });
  const [message, setMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      // Reset states when dialog opens
      setSelectedMembers([]);
      setShareSuccess(false);
      setMessage("");
      
      // Load family members
      const members = getAllFamilyMembers();
      setFamilyMembers(members);
    }
  }, [open]);

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relation) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and relation for your family member.",
        variant: "destructive"
      });
      return;
    }

    const addedMember = addFamilyMember(
      newMember.name,
      newMember.relation,
      newMember.email || undefined
    );

    setFamilyMembers(prev => [...prev, addedMember]);
    setSelectedMembers(prev => [...prev, addedMember.id]);
    setShowAddMember(false);
    setNewMember({ name: "", relation: "", email: "" });

    toast({
      title: "Family Member Added",
      description: `${addedMember.name} has been added to your family circle.`
    });
  };

  const handleShare = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No Recipients Selected",
        description: "Please select at least one family member to share with.",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);

    // Simulate sharing process
    setTimeout(() => {
      try {
        shareVideo(videoId, videoTitle, selectedMembers, videoUrl, thumbnailUrl);
        
        setIsSharing(false);
        setShareSuccess(true);

        toast({
          title: "Video Shared Successfully",
          description: `Your video has been shared with ${selectedMembers.length} family member${selectedMembers.length > 1 ? 's' : ''}.`
        });

        // Close dialog after successful share with a slight delay
        setTimeout(() => {
          onOpenChange(false);
        }, 2000);

      } catch (error) {
        setIsSharing(false);
        
        toast({
          title: "Sharing Failed",
          description: "There was an error sharing your video. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />
            Share with Family
          </DialogTitle>
        </DialogHeader>

        {shareSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-center mb-2">Video Shared Successfully!</h3>
            <p className="text-gray-500 text-center">
              Your family members will receive a notification about this shared video.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Video: {videoTitle}</h4>
                <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                  <img 
                    src={thumbnailUrl} 
                    alt={videoTitle} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1 block">Select family members to share with:</Label>
                <div className="max-h-[200px] overflow-y-auto border rounded-md p-2 space-y-2">
                  {familyMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                      <Checkbox 
                        id={`member-${member.id}`}
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={() => handleSelectMember(member.id)}
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        {member.avatar ? (
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium text-sm">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <Label htmlFor={`member-${member.id}`} className="font-medium cursor-pointer">
                            {member.name}
                          </Label>
                          <p className="text-xs text-gray-500">{member.relation}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {familyMembers.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No family members added yet</p>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-indigo-600"
                  onClick={() => setShowAddMember(!showAddMember)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {showAddMember ? 'Cancel' : 'Add Family Member'}
                </Button>
              </div>

              {showAddMember && (
                <div className="p-4 border rounded-md space-y-3">
                  <h4 className="font-medium">Add New Family Member</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter name" 
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relation">Relation</Label>
                    <Input 
                      id="relation" 
                      placeholder="E.g. Mother, Father, Sister" 
                      value={newMember.relation}
                      onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="Email address" 
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    />
                  </div>

                  <Button onClick={handleAddMember} className="w-full">
                    Add Member
                  </Button>
                </div>
              )}

              <div>
                <Label htmlFor="message">Add a message (optional):</Label>
                <textarea 
                  id="message"
                  className="w-full p-3 border rounded-md mt-1 min-h-[80px] focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Write a message to send along with this video..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                onClick={handleShare} 
                className="bg-indigo-600 hover:bg-indigo-700" 
                disabled={isSharing || selectedMembers.length === 0}
              >
                {isSharing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Sharing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Share Video
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FamilyShareDialog;
