import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Heart } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HenryDialog from '@/components/henry/HenryDialog';

interface PortalHenrySectionProps {
  portalName: string;
  portalMessage: string;
  quickActions?: Array<{
    label: string;
    onClick: () => void;
  }>;
  accentColor?: string;
  className?: string;
}

const PortalHenrySection: React.FC<PortalHenrySectionProps> = ({
  portalName,
  portalMessage,
  quickActions = [],
  accentColor = '#D4AF37',
  className = ''
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={className}
      >
        <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Henry Avatar with animation */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex-shrink-0"
              >
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-40"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}, #E5C5A1)`
                  }}
                />
                <Avatar className="w-16 h-16 border-2 border-[#D4AF37]/50 relative shadow-lg">
                  <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                  <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black font-bold text-xl">
                    H
                  </AvatarFallback>
                </Avatar>
                
                {/* Pulse indicator */}
                <motion.div
                  className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white shadow-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-bold text-shadow">
                    Henry for {portalName}
                  </h3>
                </div>
                
                <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
                  {portalMessage}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsChatOpen(true)}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold shadow-md"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat with Henry
                  </Button>

                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={action.onClick}
                      className="border-[#D4AF37]/40 hover:bg-[#D4AF37]/10"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Decorative sparkles */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden md:block"
              >
                <Sparkles className="h-6 w-6 text-[#D4AF37]" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Henry Chat Dialog */}
      <HenryDialog 
        isOpen={isChatOpen} 
        onOpenChange={setIsChatOpen}
      />
    </>
  );
};

export default PortalHenrySection;
