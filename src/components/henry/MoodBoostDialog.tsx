import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface MoodBoostDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const MoodBoostDialog: React.FC<MoodBoostDialogProps> = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1a1a1f] to-[#2a2a35] border-[#D4AF37]/40 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#D4AF37]">
            <Heart className="w-6 h-6" />
            Mood Boost from Henry
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Avatar className="h-16 w-16 border-2 border-[#D4AF37]/50">
                  <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                  <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black text-2xl font-bold">H</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
            
            <p className="text-lg text-white leading-relaxed px-4">
              {message}
            </p>
          </motion.div>
        </div>

        <Button 
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
        >
          Thanks, Henry!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MoodBoostDialog;
