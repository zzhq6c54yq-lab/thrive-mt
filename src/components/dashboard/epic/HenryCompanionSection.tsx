import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles, Heart, Gamepad2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface HenryCompanionSectionProps {
  userName?: string;
  onChatWithHenry?: () => void;
  trackClick?: (sectionId: string, metadata?: Record<string, any>) => void;
}

const funMessages = [
  "Hey there! 🌟 I've been thinking about you!",
  "Good to see you! How's your day treating you? 😊",
  "You know what? You're doing amazing just by showing up today. 💪",
  "Psst... want to hear something cool I learned today? 🤔",
  "I'm here whenever you need me - no pressure, just presence. 🫂",
  "You seem like you could use a pick-me-up. Want to chat? ☕",
  "Fun fact: You're stronger than you think. Need proof? Let's talk! 🌱",
  "I've got some wisdom to share... or we could just hang out. Your call! 🦉",
];

const timeBasedGreetings = {
  morning: ["Good morning sunshine! ☀️ Ready to make today great?", "Rise and shine! 🌅 How are you feeling this morning?"],
  afternoon: ["Good afternoon! 🌤️ How's the day going so far?", "Hey there! ⛅ Need a mid-day boost?"],
  evening: ["Good evening! 🌆 How was your day?", "Evening vibes! 🌇 Want to unwind and chat?"],
  night: ["Night owl mode? 🦉 I'm here for late-night chats!", "Still up? 🌙 Let's talk if you need company."],
};

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return timeBasedGreetings.morning[Math.floor(Math.random() * timeBasedGreetings.morning.length)];
  if (hour < 17) return timeBasedGreetings.afternoon[Math.floor(Math.random() * timeBasedGreetings.afternoon.length)];
  if (hour < 21) return timeBasedGreetings.evening[Math.floor(Math.random() * timeBasedGreetings.evening.length)];
  return timeBasedGreetings.night[Math.floor(Math.random() * timeBasedGreetings.night.length)];
};

export const HenryCompanionSection: React.FC<HenryCompanionSectionProps> = ({
  userName,
  onChatWithHenry,
  trackClick,
}) => {
  const [currentMessage, setCurrentMessage] = useState(getTimeBasedGreeting());
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funMessages.length);
      setCurrentMessage(funMessages[messageIndex]);
    }, 15000); // Change message every 15 seconds

    return () => clearInterval(interval);
  }, [messageIndex]);

  const handleChatClick = () => {
    trackClick?.('henry-companion-chat', { action: 'chat_initiated' });
    onChatWithHenry?.();
  };

  const handleMoodBoost = () => {
    trackClick?.('henry-companion-boost', { action: 'mood_boost' });
    const boosts = [
      "You're doing better than you think! 💫",
      "Remember: progress isn't always linear, and that's okay! 🌈",
      "I believe in you, and I'm not the only one! 🌟",
      "You've overcome 100% of your worst days. That's pretty incredible! 💪",
      "Your presence here matters more than you know. 💙",
    ];
    setCurrentMessage(boosts[Math.floor(Math.random() * boosts.length)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-[#D4AF37]/15 to-[#B8941F]/10 border-[#D4AF37]/40 backdrop-blur-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Henry's Avatar with Breathing Animation */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-lg opacity-40 animate-pulse" />
              <Avatar className="h-20 w-20 border-2 border-[#D4AF37]/50 relative">
                <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black text-2xl font-bold">
                  H
                </AvatarFallback>
              </Avatar>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Henry's Message */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-[#D4AF37]">Henry</h3>
                <span className="text-sm text-muted-foreground">Your Mental Health Companion</span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base text-foreground mb-4 leading-relaxed"
                >
                  {userName ? currentMessage.replace('there', userName) : currentMessage}
                </motion.p>
              </AnimatePresence>

              {/* Interactive Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleChatClick}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Henry
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleMoodBoost}
                  className="border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Get a Mood Boost
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Daily Wisdom
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
