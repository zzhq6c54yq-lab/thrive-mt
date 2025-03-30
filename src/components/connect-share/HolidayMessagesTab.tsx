
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, PlusCircle, Calendar, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface HolidayMessage {
  id: string;
  holiday: string;
  message: string;
  date: string;
  recipients: string[];
}

const holidays = [
  "Christmas",
  "New Year",
  "Thanksgiving",
  "Birthday",
  "Anniversary",
  "Easter",
  "Valentine's Day",
  "Mother's Day",
  "Father's Day",
  "Graduation",
  "Wedding",
  "Other"
];

const HolidayMessagesTab = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<HolidayMessage[]>([
    {
      id: "1",
      holiday: "Christmas",
      message: "Wishing you all a Merry Christmas filled with love and joy!",
      date: "December 25, 2023",
      recipients: ["Family", "Close Friends"]
    },
    {
      id: "2",
      holiday: "Birthday",
      message: "Happy birthday, Mom! I hope your day is as special as you are.",
      date: "May 10, 2023",
      recipients: ["Mom"]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState<{
    holiday: string;
    message: string;
    recipients: string;
  }>({
    holiday: holidays[0],
    message: "",
    recipients: ""
  });

  const handleAddMessage = () => {
    if (!newMessage.message.trim() || !newMessage.recipients.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const messageToAdd = {
      id: `${messages.length + 1}`,
      holiday: newMessage.holiday,
      message: newMessage.message,
      date: formattedDate,
      recipients: newMessage.recipients.split(',').map(r => r.trim())
    };
    
    setMessages([...messages, messageToAdd]);
    setIsDialogOpen(false);
    setNewMessage({
      holiday: holidays[0],
      message: "",
      recipients: ""
    });
    
    toast({
      title: "Message Created",
      description: "Your holiday message has been created!",
    });
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
    
    toast({
      title: "Message Deleted",
      description: "Your holiday message has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-pink-400" />
            Holiday Messages
          </h2>
          <p className="text-gray-400">Create and schedule special messages for holidays and important dates.</p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/20"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No Messages Yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Create your first holiday message to share with your loved ones on special occasions.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Your First Message
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message) => (
            <Card key={message.id} className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
              <div className="h-3 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 py-1 px-3 rounded-full text-sm">
                    {message.holiday}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{message.date}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm">{message.message}</p>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Recipients:</div>
                  <div className="flex flex-wrap gap-1">
                    {message.recipients.map((recipient, index) => (
                      <span key={index} className="bg-white/10 text-gray-300 text-xs py-1 px-2 rounded-full">
                        {recipient}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteMessage(message.id)}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-pink-400" />
              Create Holiday Message
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Holiday/Occasion</label>
              <select 
                value={newMessage.holiday}
                onChange={(e) => setNewMessage({...newMessage, holiday: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {holidays.map((holiday) => (
                  <option key={holiday} value={holiday}>{holiday}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <Textarea 
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                placeholder="Your holiday message..."
                className="bg-gray-800 border border-gray-700 min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Recipients (comma separated)</label>
              <Input 
                value={newMessage.recipients}
                onChange={(e) => setNewMessage({...newMessage, recipients: e.target.value})}
                placeholder="Family, Friends, Mom, Dad..."
                className="bg-gray-800 border border-gray-700"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              Save Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HolidayMessagesTab;
