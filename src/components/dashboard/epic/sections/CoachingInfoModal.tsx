import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, MessageCircle, Phone, Video, Shield, TrendingUp } from 'lucide-react';

interface CoachingInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CoachingInfoModal: React.FC<CoachingInfoModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-[#141921] border-bronze-300/20">
        <DialogHeader className="p-6 pb-4 border-b border-bronze-300/10">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-200 to-bronze-300 bg-clip-text text-transparent">
            Welcome to Your Personal Mental Wellness Hub
          </DialogTitle>
          <p className="text-lg text-bronze-100 mt-2">
            Affordable support. Real guidance. A better you.
          </p>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our platform offers a modern, stepped-care approach to mental well-being.
                Start with <span className="text-bronze-300 font-semibold">Mental Wellness Coaching</span>—your first, most accessible level of support—then step into therapy only if you ever need it.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're stressed, overwhelmed, stuck, unmotivated, or simply striving to grow, we give you the tools, support, and human connection to move forward.
              </p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* What is a Coach */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">What is a Mental Wellness Coach?</h3>
              </div>
              <p className="text-xl text-bronze-200 font-semibold">A personal trainer for your mind.</p>
              <p className="text-muted-foreground leading-relaxed">
                A Mental Wellness Coach is a trained, non-clinical professional who helps you improve your emotional well-being, build healthier habits, strengthen coping skills, and create the life you want.
              </p>
              <div className="bg-[#1a2332]/50 rounded-lg p-4 space-y-2">
                <p className="text-bronze-200 font-semibold">Your coach focuses on:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Daily support', 'Practical strategies', 'Emotional wellness', 'Accountability', 'Growth and mindset', 'Stress and life management'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-bronze-300">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-muted-foreground italic">
                They help with the challenges of everyday life, without diagnosing or treating mental disorders.
              </p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* What Coaches Help With */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">What Your Coach Can Help You Do</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Reduce stress & feel more grounded',
                  'Build healthy routines & habits',
                  'Improve motivation & productivity',
                  'Navigate breakups, transitions & life stress',
                  'Strengthen communication & relationships',
                  'Manage overwhelm, burnout, & emotional blocks',
                  'Set clear goals & stay accountable',
                  'Create structure and balance in your life',
                  'Grow confidence, clarity, and emotional resilience'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-bronze-300 mt-1">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-bronze-200 font-semibold">Everything is personalized to your goals and your pace.</p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* What Coaches DON'T Do */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">What Coaches Do NOT Do</h3>
              </div>
              <p className="text-muted-foreground">To keep you safe and supported:</p>
              <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4 space-y-2">
                <p className="text-red-200 font-semibold">Your coach does NOT:</p>
                <ul className="space-y-2">
                  {[
                    'Diagnose mental health conditions',
                    'Provide clinical treatment',
                    'Process trauma',
                    'Handle crises or emergencies',
                    'Prescribe or manage medication'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-red-100/80">
                      <span className="text-red-400">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-muted-foreground italic">
                If deeper support is needed, your coach will help you step up to therapy.
              </p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* How Coaching Works */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">How Coaching Works on Our Platform</h3>
              </div>
              <p className="text-bronze-200 font-semibold">Three ways to connect:</p>
              
              <div className="space-y-4">
                <div className="bg-[#1a2332]/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-bronze-200 mb-2">1. Unlimited Messaging (Text Coaching)</h4>
                  <p className="text-muted-foreground">
                    Message your coach anytime. Expect thoughtful responses daily within 24 hours.
                    Perfect for ongoing support, check-ins, advice, and guided exercises.
                  </p>
                </div>

                <div className="bg-[#1a2332]/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-bronze-200 mb-2 flex items-center gap-2">
                    <Phone className="w-5 h-5" /> 2. Audio Coaching Calls
                  </h4>
                  <p className="text-muted-foreground">
                    Quick, focused sessions for problem-solving, goal setting, or emotional reset.
                  </p>
                </div>

                <div className="bg-[#1a2332]/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-bronze-200 mb-2 flex items-center gap-2">
                    <Video className="w-5 h-5" /> 3. Live Video Sessions
                  </h4>
                  <p className="text-muted-foreground">
                    Face-to-face time for deep guidance, clarity, and structured progress.
                  </p>
                </div>
              </div>

              <p className="text-bronze-200 font-semibold">You choose what fits your needs and your budget.</p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Pricing */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💸</span>
                <h3 className="text-2xl font-bold text-bronze-100">Pricing — Simple, Affordable & Flexible</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Text Coaching */}
                <div className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border border-bronze-300/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-bronze-200 mb-2">📝 Unlimited Text Coaching</h4>
                  <p className="text-sm text-muted-foreground mb-2">Daily replies + check-ins</p>
                  <p className="text-3xl font-bold text-bronze-300">$29<span className="text-base text-muted-foreground">/week</span></p>
                </div>

                {/* Audio Calls */}
                <div className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border border-bronze-300/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-bronze-200 mb-2">📞 Audio Coaching Calls</h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex justify-between text-muted-foreground">
                      <span>15 minutes</span>
                      <span className="text-bronze-300 font-semibold">$12</span>
                    </p>
                    <p className="flex justify-between text-muted-foreground">
                      <span>30 minutes</span>
                      <span className="text-bronze-300 font-semibold">$22</span>
                    </p>
                    <p className="flex justify-between text-muted-foreground">
                      <span>45 minutes</span>
                      <span className="text-bronze-300 font-semibold">$32</span>
                    </p>
                  </div>
                </div>

                {/* Video Sessions */}
                <div className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border border-bronze-300/20 rounded-lg p-4 md:col-span-2">
                  <h4 className="text-lg font-semibold text-bronze-200 mb-2">🎥 Video Coaching Sessions</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">15 minutes</p>
                      <p className="text-2xl font-bold text-bronze-300">$18</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">30 minutes</p>
                      <p className="text-2xl font-bold text-bronze-300">$32</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">45 minutes</p>
                      <p className="text-2xl font-bold text-bronze-300">$42</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Monthly Bundles */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <h3 className="text-2xl font-bold text-bronze-100">Popular Monthly Bundles</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Starter Bundle */}
                <div className="bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 border-2 border-bronze-300/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-bronze-200">⭐ Wellness Starter Bundle</h4>
                  </div>
                  <p className="text-4xl font-bold text-bronze-300 mb-4">$99<span className="text-lg text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'Unlimited text coaching',
                      '(2) 30-minute video sessions',
                      '(2) 15-minute audio sessions'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-bronze-300">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-bronze-200 italic">A balanced, affordable wellness plan.</p>
                </div>

                {/* Premium Bundle */}
                <div className="bg-gradient-to-br from-bronze-500/30 to-bronze-600/20 border-2 border-bronze-300/50 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-bronze-300 text-background px-3 py-1 text-xs font-bold">
                    POPULAR
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-bronze-200">⭐ Premium Support Bundle</h4>
                  </div>
                  <p className="text-4xl font-bold text-bronze-300 mb-4">$159<span className="text-lg text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'Unlimited text coaching',
                      '(4) 30-minute video sessions',
                      '(2) 45-minute video sessions'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-bronze-300">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-bronze-200 italic">For users wanting weekly high-touch support.</p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Track Your Growth */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Track Your Growth</h3>
              </div>
              <p className="text-muted-foreground">Our app includes:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Mood tracking',
                  'Habit builders',
                  'Journaling prompts',
                  'Guided exercises',
                  'Weekly progress summaries',
                  'AI-assisted insights (non-clinical)',
                  'Wellness goals and streaks'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-bronze-300">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-bronze-200 font-semibold">Every tool is designed to help you feel supported every single day.</p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Safety First */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Safety First</h3>
              </div>
              <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-200 mb-3">If we detect crisis language, we provide immediate access to:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-blue-100">
                    <span className="text-blue-400">•</span>
                    <span className="font-semibold">988 Suicide & Crisis Lifeline</span>
                  </li>
                  <li className="flex items-center gap-2 text-blue-100">
                    <span className="text-blue-400">•</span>
                    <span className="font-semibold">911 (for emergencies)</span>
                  </li>
                  <li className="flex items-center gap-2 text-blue-100">
                    <span className="text-blue-400">•</span>
                    <span>Local crisis hotlines</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Our coaches are not crisis responders—but we make sure you get the right help fast.
              </p>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* CTA Section */}
            <section className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">⭐</span>
                <h3 className="text-2xl font-bold text-bronze-100">Your Wellness Journey Starts Here</h3>
              </div>
              <p className="text-muted-foreground">Whether you want:</p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  'Emotional support',
                  'Better habits',
                  'Less stress',
                  'More clarity',
                  'Accountability',
                  'Someone in your corner'
                ].map((item) => (
                  <span key={item} className="bg-bronze-500/20 text-bronze-200 px-3 py-1 rounded-full text-sm">
                    ✔ {item}
                  </span>
                ))}
              </div>
              <p className="text-lg text-bronze-200 font-semibold mb-4">
                Your coach is here to guide you every step of the way.
              </p>
              <div className="space-y-2">
                <p className="text-bronze-300 font-bold">Feel supported.</p>
                <p className="text-bronze-300 font-bold">Feel stronger.</p>
                <p className="text-bronze-300 font-bold">Feel better.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="mt-6 bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-white"
                  onClick={() => {
                    onOpenChange(false);
                    window.location.href = '/coach-questionnaire';
                  }}
                >
                  Match Me to My Coach
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="mt-6 border-bronze-300/30 hover:bg-bronze-500/10"
                  onClick={() => {
                    onOpenChange(false);
                    window.location.href = '/coach-matches';
                  }}
                >
                  Browse Coaches
                </Button>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CoachingInfoModal;
