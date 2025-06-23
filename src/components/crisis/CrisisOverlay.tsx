import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Phone, Heart, Headphones, MessageCircle, Shield, AlertCircle, X } from 'lucide-react';

const CrisisOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const { user } = useUser();

  const logCrisisEvent = async (eventType: string, source: string) => {
    if (user) {
      await supabase.from('crisis_events').insert({
        user_id: user.id,
        event_type: eventType,
        source: source
      });
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
    // Simple breathing exercise timer
    setTimeout(() => setBreathingActive(false), 60000); // 1 minute
  };

  const handleClose = () => {
    setIsOpen(false);
    setBreathingActive(false);
  };

  return (
    <>
      {/* Floating Crisis Button */}
      <Button
        onClick={handlePanicButton}
        className="fixed bottom-6 left-6 z-50 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-red-900 via-red-800 to-red-900 hover:from-red-800 hover:via-red-700 hover:to-red-800 border-4 border-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 ring-2 ring-black ring-opacity-50 transform hover:scale-110 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
          borderImage: 'linear-gradient(135deg, #d97706, #eab308, #d97706) 1',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(217, 119, 6, 0.3)'
        }}
        aria-label="Crisis Support - Click for immediate help"
      >
        <Shield className="h-7 w-7 text-yellow-500 drop-shadow-lg" style={{ color: '#eab308' }} />
      </Button>

      {/* Crisis Support Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          size="xl" 
          className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-400 shadow-2xl max-h-[90vh] p-0 overflow-hidden"
          showCloseButton={false}
        >
          {/* Custom Header with Close Button */}
          <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-800 p-6 border-b border-yellow-400">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-yellow-400 hover:text-yellow-300 transition-all duration-200"
              aria-label="Close crisis support"
            >
              <X className="h-6 w-6" />
            </button>
            
            <DialogHeader>
              <DialogTitle className="text-3xl text-center text-yellow-400 flex items-center justify-center font-bold">
                <AlertCircle className="h-8 w-8 mr-3 text-yellow-400" />
                CRISIS SUPPORT AVAILABLE
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <ScrollArea className="max-h-[70vh] p-6">
            <div className="space-y-6">
              {/* Emergency Warning */}
              <div className="text-center bg-gradient-to-r from-red-900/80 to-red-800/80 p-6 rounded-lg border-2 border-red-500 shadow-lg">
                <p className="text-yellow-400 font-bold text-xl mb-3">
                  🚨 IF YOU'RE IN IMMEDIATE DANGER, CALL 911 NOW
                </p>
                <p className="text-yellow-200 text-lg">
                  Your safety is the most important thing right now.
                </p>
              </div>

              {/* Crisis Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Crisis Hotline */}
                <Card className="bg-gradient-to-br from-red-900/90 to-red-800/90 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="font-bold text-yellow-400 text-xl mb-3">CRISIS HOTLINE</h3>
                    <p className="text-yellow-200 mb-4 text-lg">
                      24/7 free, confidential support
                    </p>
                    <Button 
                      onClick={handleEmergencyCall}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-yellow-100 font-bold text-lg py-3 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                    >
                      CALL 988
                    </Button>
                  </CardContent>
                </Card>

                {/* Crisis Text Line */}
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="font-bold text-yellow-400 text-xl mb-3">CRISIS TEXT LINE</h3>
                    <p className="text-yellow-200 mb-4 text-lg">
                      Text with a trained counselor
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-100 font-bold text-lg py-3 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                      onClick={() => window.open('sms:741741?body=HELLO')}
                    >
                      TEXT HOME TO 741741
                    </Button>
                  </CardContent>
                </Card>

                {/* Breathing Exercise */}
                <Card className="bg-gradient-to-br from-green-900/80 to-green-800/80 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="font-bold text-yellow-400 text-xl mb-3">BREATHING EXERCISE</h3>
                    <p className="text-yellow-200 mb-4 text-lg">
                      Calm your mind and body
                    </p>
                    <Button 
                      onClick={startBreathingExercise}
                      className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-yellow-100 font-bold text-lg py-3 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                      disabled={breathingActive}
                    >
                      {breathingActive ? 'BREATHING...' : 'START BREATHING'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Calming Sounds */}
                <Card className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Headphones className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="font-bold text-yellow-400 text-xl mb-3">CALMING SOUNDS</h3>
                    <p className="text-yellow-200 mb-4 text-lg">
                      Binaural beats for relaxation
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-yellow-100 font-bold text-lg py-3 border border-yellow-500 hover:border-yellow-400 transition-all duration-200"
                    >
                      PLAY SOUNDS
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Active Breathing Exercise */}
              {breathingActive && (
                <Card className="bg-gradient-to-r from-blue-900/90 to-green-900/90 border-2 border-yellow-400 shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="text-8xl animate-pulse text-yellow-400">🫁</div>
                    </div>
                    <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                      BREATHE WITH ME
                    </h3>
                    <p className="text-yellow-200 mb-6 text-xl font-semibold">
                      Inhale for 4... Hold for 4... Exhale for 6...
                    </p>
                    <div className="text-lg text-yellow-300 font-medium">
                      Focus only on your breathing. You are safe.
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Support Message */}
              <div className="text-center text-yellow-200 bg-black/40 p-6 rounded-lg border border-yellow-600">
                <p className="text-xl font-semibold">
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
