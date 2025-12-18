
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Phone, Heart, Headphones, MessageCircle, Shield, AlertCircle, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const crisisEventSchema = z.object({
  user_id: z.string().uuid(),
  event_type: z.string().min(1).max(100),
  source: z.string().min(1).max(100)
});

const CrisisOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const { user, profile } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Check onboarding completion status
  useEffect(() => {
    const localStorageCompleted = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const profileCompleted = profile?.onboarding_completed || false;
    setHasCompletedOnboarding(localStorageCompleted || profileCompleted);
  }, [profile]);

  // Only show crisis button on main dashboard AND after onboarding completion
  const state = location.state as { screenState?: string } | null;
  const screenState = state?.screenState;
  const isMainDashboard = location.pathname === "/" && screenState === 'main';
  const shouldShowCrisisButton = isMainDashboard && hasCompletedOnboarding;

  const logCrisisEvent = async (eventType: string, source: string) => {
    if (user) {
      const eventData = {
        user_id: user.id,
        event_type: eventType,
        source: source
      };
      
      const validationResult = crisisEventSchema.safeParse(eventData);
      if (!validationResult.success) {
        console.error('Invalid crisis event data:', validationResult.error);
        return;
      }
      
      await supabase.from('crisis_events').insert([eventData]);
    }
  };

  const handleEmergencyCall = () => {
    logCrisisEvent('emergency_call', 'crisis_overlay');
    window.open('tel:988');
  };

  const handlePanicButton = () => {
    logCrisisEvent('panic_button', 'floating_button');
    setIsOpen(true);
  };

  const startBreathingExercise = () => {
    setBreathingActive(true);
    logCrisisEvent('breathing_exercise', 'crisis_overlay');
    setTimeout(() => setBreathingActive(false), 60000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setBreathingActive(false);
  };

  // Don't render if not on main dashboard or onboarding not completed
  if (!shouldShowCrisisButton) {
    return null;
  }

  return (
    <>
      {/* Crisis Button - Top Right Corner of Main Dashboard */}
      <Button
        onClick={handlePanicButton}
        className="fixed top-6 right-6 z-50 h-12 w-12 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 30%, #B22222 70%, #8B0000 100%)',
          border: '3px solid #DAA520',
          boxShadow: '0 0 20px rgba(139, 0, 0, 0.7), inset 0 2px 4px rgba(218, 165, 32, 0.3), 0 0 0 1px #000'
        }}
        aria-label="Crisis Support - Click for immediate help"
      >
        <Shield className="h-6 w-6 text-yellow-500 drop-shadow-lg" style={{ color: '#DAA520' }} />
      </Button>

      {/* Crisis Support Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-400 shadow-2xl w-[95vw] max-w-4xl h-[95vh] max-h-[800px] p-0 overflow-hidden"
          showCloseButton={false}
        >
          {/* Custom Header with Close Button */}
          <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-800 p-4 border-b border-yellow-400 flex-shrink-0">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-yellow-400 hover:text-yellow-300 transition-all duration-200 z-10"
              aria-label="Close crisis support"
            >
              <X className="h-5 w-5" />
            </button>
            
            <DialogHeader>
              <DialogTitle className="text-2xl text-center text-yellow-400 flex items-center justify-center font-bold pr-12">
                <AlertCircle className="h-7 w-7 mr-3 text-yellow-400" />
                CRISIS SUPPORT AVAILABLE
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <ScrollArea className="flex-1 p-4 h-full">
            <div className="space-y-6 pb-4">
              {/* Emergency Warning */}
              <div className="text-center bg-gradient-to-r from-red-900/80 to-red-800/80 p-4 rounded-lg border-2 border-red-500 shadow-lg">
                <p className="text-yellow-400 font-bold text-lg mb-2">
                  🚨 IF YOU'RE IN IMMEDIATE DANGER, CALL 911 NOW
                </p>
                <p className="text-yellow-200">
                  Your safety is the most important thing right now.
                </p>
              </div>

              {/* Crisis Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Crisis Hotline */}
                <Card className="bg-gradient-to-br from-red-900/90 to-red-800/90 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <Phone className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                    <h3 className="font-bold text-yellow-400 text-lg mb-2">CRISIS HOTLINE</h3>
                    <p className="text-yellow-200 mb-3">
                      24/7 free, confidential support
                    </p>
                    <Button 
                      onClick={handleEmergencyCall}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-100 font-bold py-2 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                    >
                      CALL 988
                    </Button>
                  </CardContent>
                </Card>

                {/* Crisis Text Line */}
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                    <h3 className="font-bold text-yellow-400 text-lg mb-2">CRISIS TEXT LINE</h3>
                    <p className="text-yellow-200 mb-3">
                      Text with a trained counselor
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-100 font-bold py-2 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                      onClick={() => window.open('sms:741741?body=HELLO')}
                    >
                      TEXT HOME TO 741741
                    </Button>
                  </CardContent>
                </Card>

                {/* Breathing Exercise */}
                <Card className="bg-gradient-to-br from-green-900/80 to-green-800/80 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <Heart className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                    <h3 className="font-bold text-yellow-400 text-lg mb-2">BREATHING EXERCISE</h3>
                    <p className="text-yellow-200 mb-3">
                      Calm your mind and body
                    </p>
                    <Button 
                      onClick={startBreathingExercise}
                      className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-yellow-100 font-bold py-2 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                      disabled={breathingActive}
                    >
                      {breathingActive ? 'BREATHING...' : 'START BREATHING'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Calming Sounds */}
                <Card className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <Headphones className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                    <h3 className="font-bold text-yellow-400 text-lg mb-2">CALMING SOUNDS</h3>
                    <p className="text-yellow-200 mb-3">
                      Binaural beats for relaxation
                    </p>
                    <Button 
                      onClick={() => {
                        logCrisisEvent('calming_sounds', 'crisis_overlay');
                        navigate('/app/mental-wellness-tools/binaural');
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-yellow-100 font-bold py-2 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                    >
                      PLAY SOUNDS
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Active Breathing Exercise */}
              {breathingActive && (
                <Card className="bg-gradient-to-r from-blue-900/90 to-green-900/90 border-2 border-yellow-400 shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="text-6xl animate-pulse text-yellow-400">🫁</div>
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                      BREATHE WITH ME
                    </h3>
                    <p className="text-yellow-200 mb-4 text-lg font-semibold">
                      Inhale for 4... Hold for 4... Exhale for 6...
                    </p>
                    <div className="text-yellow-300">
                      Focus only on your breathing. You are safe.
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Support Message */}
              <div className="text-center text-yellow-200 bg-black/40 p-4 rounded-lg border border-yellow-600">
                <p className="text-lg font-semibold">
                  Remember: This crisis will pass. You are not alone. Help is available.
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CrisisOverlay;
