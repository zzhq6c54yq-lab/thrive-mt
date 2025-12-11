
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, BookOpen, Video, Calendar, Info, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import FamilyVideoFeed from "@/components/video-diary/FamilyVideoFeed";
import { getAllFamilyMembers, FamilyMember, addFamilyMember, removeFamilyMember } from "@/services/familyShareService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const FamilyLinkPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("videos");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: "",
    relation: "",
    email: ""
  });

  useEffect(() => {
    // Load family members
    const members = getAllFamilyMembers();
    setFamilyMembers(members);
  }, []);

  const handleAddMember = () => {
    if (!newFamilyMember.name || !newFamilyMember.relation) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and relation for your family member.",
        variant: "destructive"
      });
      return;
    }

    const addedMember = addFamilyMember(
      newFamilyMember.name,
      newFamilyMember.relation,
      newFamilyMember.email
    );

    setFamilyMembers(prev => [...prev, addedMember]);
    setNewFamilyMember({ name: "", relation: "", email: "" });
    setAddMemberDialogOpen(false);

    toast({
      title: "Family Member Added",
      description: `${addedMember.name} has been added to your family circle.`
    });
  };

  const handleRemoveMember = (id: string, name: string) => {
    if (removeFamilyMember(id)) {
      setFamilyMembers(prev => prev.filter(member => member.id !== id));
      
      toast({
        title: "Family Member Removed",
        description: `${name} has been removed from your family circle.`
      });
    }
  };

  return (
    <Page title="Family Link">
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-400/15 via-purple-400/25 to-indigo-400/15 transform -skew-y-3"></div>
            <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-purple-400/10 via-indigo-400/15 to-purple-400/10 transform skew-y-2"></div>
          </div>
          <div className="container px-4 max-w-6xl mx-auto relative z-10">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <HomeButton />
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-indigo-500/30 rounded-full">
                <Users className="h-8 w-8 text-indigo-200" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light">Family Link</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl">
              Connect with your support circle through private video sharing and communication.
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 max-w-6xl mx-auto">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="videos">Shared Videos</TabsTrigger>
              <TabsTrigger value="members">Family Members</TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Video className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Family Video Sharing</h2>
                    <p className="text-gray-600">
                      Share moments and messages with your family members through secure video sharing. 
                      Videos you share will appear here, and your family members will receive notifications.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => navigate("/app/video-diary")}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Go to Video Diary
                  </Button>
                </div>
              </div>
              
              <FamilyVideoFeed onWatchVideo={(videoId) => {
                toast({
                  title: "Opening Video",
                  description: "Loading shared video..."
                });
                // This would typically navigate to a detailed view
              }} />
            </TabsContent>
            
            <TabsContent value="members" className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Family Circle</h2>
                <Button 
                  onClick={() => setAddMemberDialogOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Family Member
                </Button>
              </div>
              
              {familyMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {familyMembers.map(member => (
                    <Card key={member.id} className="overflow-hidden">
                      <div className="flex items-center p-4">
                        {member.avatar ? (
                          <img 
                            src={member.avatar}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                            <span className="text-2xl font-medium text-indigo-600">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-gray-500">{member.relation}</p>
                          {member.contactEmail && (
                            <p className="text-sm text-gray-500">{member.contactEmail}</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id, member.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Family Members Yet</CardTitle>
                    <CardDescription>
                      Add family members to start sharing videos and connecting with your support circle.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8 text-center">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 mb-4">Your family circle is empty</p>
                      <Button
                        onClick={() => setAddMemberDialogOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Your First Family Member
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card className="mt-8 bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Info className="h-5 w-5" />
                    About Family Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Family Link allows you to maintain connections with your support network through secure video sharing. 
                    This feature is designed to strengthen your support system and improve communication during your mental health journey.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md border border-blue-200">
                      <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Privacy & Security
                      </h4>
                      <p className="text-sm text-gray-600">
                        All shared videos are encrypted and only visible to your specified family members. 
                        Your privacy is our top priority.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-blue-200">
                      <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Support Together
                      </h4>
                      <p className="text-sm text-gray-600">
                        Regular communication with supportive family members has been shown to improve therapy outcomes by up to 40%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Add Family Member Dialog */}
        <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input 
                  id="name"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter their name"
                  value={newFamilyMember.name}
                  onChange={(e) => setNewFamilyMember({...newFamilyMember, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="relation" className="text-sm font-medium">Relation</label>
                <input 
                  id="relation"
                  className="w-full p-2 border rounded-md"
                  placeholder="E.g. Mother, Father, Sister"
                  value={newFamilyMember.relation}
                  onChange={(e) => setNewFamilyMember({...newFamilyMember, relation: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email (Optional)</label>
                <input 
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Their email address"
                  value={newFamilyMember.email}
                  onChange={(e) => setNewFamilyMember({...newFamilyMember, email: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddMemberDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>
                Add Family Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Page>
  );
};

export default FamilyLinkPage;
