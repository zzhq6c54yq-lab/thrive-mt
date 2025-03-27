import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, AlertCircle, X, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious?: () => void; // Make this optional so it works with both cases
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCrisisDialog, setShowCrisisDialog] = useState(false);
  const [sliderValue, setSliderValue] = useState([0]);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  
  // Multiple response messages for each mood with enhanced, more in-depth content
  const moodResponses = {
    happy: [
      {
        title: "That's wonderful!",
        message: "It's great to hear you're feeling happy today. This positive energy can be a powerful catalyst for creativity and connection. Take a moment to savor this feeling and consider how you might channel it into activities that bring you fulfillment. Research shows that documenting positive emotions can help extend their benefits throughout your day.",
        affirmation: "I deserve to experience joy and will create space to nurture this positive energy."
      },
      {
        title: "Embracing Joy!",
        message: "Your happiness is contagious and worth celebrating! Consider this feeling a resource you can draw from when facing challenges. Studies show that positive emotions build resilience by expanding our cognitive and behavioral repertoires. What small actions could you take today to share this joy with others? Even a brief positive interaction can create ripple effects in your community.",
        affirmation: "My joy creates positive energy that benefits both myself and those around me."
      },
      {
        title: "Celebrating Today!",
        message: "Happiness is a beautiful emotion to experience and an opportunity for growth. Psychologists suggest that moments of joy can be amplified when we practice mindful awareness of them. Try taking three deep breaths and really noticing the sensations of happiness in your body. What specifically triggered this positive feeling today, and how might you recreate similar conditions tomorrow?",
        affirmation: "I am present with my happiness and allow it to nourish my wellbeing."
      },
      {
        title: "Riding the Wave of Joy!",
        message: "When we're happy, possibilities seem endless. This elevated mood state is scientifically linked to increased creativity, better problem-solving, and stronger social connections. Consider journaling about this moment to create a positive memory you can revisit. What personal strengths do you notice are more accessible when you're feeling this way?",
        affirmation: "I use moments of happiness to fuel positive growth in my life."
      }
    ],
    ok: [
      {
        title: "Doing OK",
        message: "Being 'OK' represents stability and balance - a valuable state in our often chaotic world. This middle ground provides an excellent foundation from which to build. Consider it a canvas with potential: what small activity might add a touch of color to your day? Perhaps a brief nature walk, connecting with a friend, or engaging in a creative pursuit could elevate your experience.",
        affirmation: "I appreciate stability as the foundation for growth and positive change."
      },
      {
        title: "Steady and Centered",
        message: "The 'OK' state is like neutral ground from which all possibilities emerge. Neuroscience shows that this balanced emotional state allows for clearer thinking and better decision-making. You have the opportunity now to intentionally choose activities that nurture your wellbeing. What small self-care practice might feel nourishing right now - perhaps deep breathing, gentle movement, or a moment of gratitude?",
        affirmation: "I am grounded in the present moment, with the power to shape my experience."
      },
      {
        title: "Finding Balance",
        message: "The middle ground is a place of potential and perspective. From this centered state, you can observe your needs more clearly. Consider checking in with your body—are you needing rest, movement, nourishment, or connection? This awareness can guide you toward activities that might bring more vibrancy to your experience. Remember that emotional fluctuations are a natural part of being human.",
        affirmation: "I honor my current state while recognizing my capacity for positive change."
      },
      {
        title: "Stability Matters",
        message: "Feeling OK is actually an achievement in this fast-paced world. Research in positive psychology suggests that emotional stability contributes significantly to long-term wellbeing. From this steady foundation, consider what small practice might enhance your day—perhaps a few minutes of mindfulness, a brief creative activity, or connecting with someone who energizes you. What qualities of 'OK' can you appreciate right now?",
        affirmation: "I value emotional stability and recognize it as a strength in my life."
      }
    ],
    neutral: [
      {
        title: "Feeling Neutral",
        message: "A neutral day can be a canvas for whatever you want to create. This emotional state offers a unique opportunity for reflection without the intensity of stronger emotions. Consider checking in with your values—what matters most to you today? Even small actions aligned with your core values can bring meaning and purpose to your experience. What tiny step might move you toward something that matters?",
        affirmation: "I can intentionally shape my experience through mindful choices and actions."
      },
      {
        title: "Open to Possibilities",
        message: "Neutral feelings give you the freedom to choose your direction without being pulled strongly one way or another. Psychologists call this 'emotional flexibility'—the ability to respond thoughtfully rather than react automatically. Consider this an opportunity to introduce a small pleasant activity, whether physical, creative, social, or restful. What might feel nourishing right now, even in a small way?",
        affirmation: "I am present and receptive to new possibilities that enhance my wellbeing."
      },
      {
        title: "Middle Ground",
        message: "From this neutral space, you have the power to shape your emotional landscape. Research shows that even brief activities can shift our neurochemistry—a few minutes of brisk walking, listening to uplifting music, or practicing gratitude can activate your brain's reward centers. What small action feels accessible right now that might elevate your experience? Remember that emotions naturally fluctuate throughout our days.",
        affirmation: "I accept my current state while recognizing my capacity to influence my experience."
      },
      {
        title: "Clear Slate",
        message: "Neutrality can be refreshing – like a clean canvas waiting for color. This emotional state offers clarity and perspective that's sometimes obscured during more intense feelings. Consider this an opportunity to intentionally choose an activity that brings you pleasure or meaning. Even brief engagement with something you enjoy—nature, art, connection, learning—can enhance your wellbeing in meaningful ways.",
        affirmation: "I bring awareness and intention to creating a meaningful experience today."
      }
    ],
    down: [
      {
        title: "Sorry you're feeling down",
        message: "We all experience difficult emotions as part of being human. Research shows that acknowledging these feelings—rather than suppressing them���actually helps us process and move through them more effectively. Consider giving yourself the kindness you'd offer a good friend who was feeling down. What small act of self-compassion feels accessible right now? Perhaps a brief walk, a comforting cup of tea, or simply placing a hand on your heart with gentle awareness.",
        affirmation: "I accept my feelings with compassion and know that difficult emotions are temporary."
      },
      {
        title: "This Too Shall Pass",
        message: "Feeling down is part of the human experience and contains important information about our needs. Research in emotion science shows that even difficult feelings typically move through us in waves, naturally shifting over time. Gentle movement—even just stretching for a few minutes—can help process emotional energy in the body. What tiny step might bring you a moment of ease during this challenging time?",
        affirmation: "I move through difficult emotions with patience, knowing they are not permanent states."
      },
      {
        title: "One Step at a Time",
        message: "When we're feeling down, even small steps forward matter immensely. Neuroscience research shows that breaking things down into very small, manageable actions helps overcome the inertia that often accompanies low mood. Consider identifying just one tiny action that might bring a moment of relief—perhaps stepping outside for fresh air, messaging a supportive person, or engaging in five minutes of an activity you normally enjoy.",
        affirmation: "I honor my capacity to take small, nurturing steps even during difficult times."
      },
      {
        title: "Honoring Your Feelings",
        message: "It takes courage to acknowledge when you're feeling down. By recognizing your emotional state, you've already taken an important step in self-care. Research shows that simply naming our feelings helps regulate the emotional centers in our brain. Consider what your body and mind might need right now—perhaps rest, movement, connection, or a brief distraction. Remember that seeking support is a sign of strength, not weakness.",
        affirmation: "I listen to my emotions with compassion and respond to my needs with kindness."
      }
    ],
    sad: [
      {
        title: "It's OK to feel sad",
        message: "Sadness is a natural emotion that serves important purposes in our lives—it helps us process loss, connect with what matters to us, and sometimes signals a need for rest or support. Research shows that allowing ourselves to experience sadness fully—rather than avoiding it—actually helps us move through it more effectively. Consider what might offer gentle comfort right now, perhaps a warm drink, soft music, or wrapping yourself in a cozy blanket.",
        affirmation: "I allow myself to feel sadness with compassion, knowing it carries wisdom about what matters to me."
      },
      {
        title: "Finding Comfort",
        message: "Sadness deserves to be acknowledged with gentleness. When we're sad, our bodies often need soothing—research shows that physical comfort can help regulate our emotional systems. Consider what might feel nurturing right now: perhaps placing a hand on your heart, taking slow breaths, or wrapping yourself in something soft. Remember that reaching out to a trusted person can provide meaningful support during difficult feelings.",
        affirmation: "I offer myself compassion and care during times of sadness, knowing connection heals."
      },
      {
        title: "Present with Difficult Emotions",
        message: "Your sadness is valid and temporary. Emotional research shows that all feelings—even intense ones—naturally shift and change over time when we allow them space. Consider approaching your sadness with gentle curiosity rather than judgment. What might this emotion be telling you about what matters in your life? Sometimes sadness connects us more deeply to our values and what we care about most.",
        affirmation: "I approach my sadness with patience and gentle curiosity, knowing it will naturally evolve."
      },
      {
        title: "Gentle Support",
        message: "When sadness visits, it's important to be kind to yourself. Research in self-compassion shows that treating ourselves with the same care we would offer a good friend helps us navigate difficult emotions more effectively. Consider what small act of kindness you might offer yourself right now—perhaps a gentle walk, a cup of tea, or simply placing your hand on your heart and acknowledging that this is a hard moment.",
        affirmation: "I respond to my sadness with kindness, knowing that self-compassion supports healing."
      }
    ],
    overwhelmed: [
      {
        title: "Take a deep breath",
        message: "Feeling overwhelmed activates our stress response system, which can make everything feel more intense. The good news is that even a few deep breaths can begin to calm your nervous system. Try breathing in for a count of 4, holding for 1, and exhaling for a count of 6. Research shows this longer exhale helps activate your parasympathetic system, which brings a sense of calm. Remember that overwhelming feelings are temporary, and there are concrete steps that can help.",
        affirmation: "I can find moments of calm even amidst overwhelming feelings."
      },
      {
        title: "One Thing at a Time",
        message: "When everything feels too much, breaking things down into small steps can help restore a sense of control. Neuroscience research shows that our brains literally cannot focus on everything at once. Try identifying just one small, concrete action you can take right now. Even something simple like drinking a glass of water, tidying one surface, or stepping outside briefly can interrupt the overwhelm cycle and give you a sense of accomplishment.",
        affirmation: "I focus on one small step at a time, knowing each action matters."
      },
      {
        title: "Finding Anchor Points",
        message: "It's normal to feel overwhelmed sometimes. When these feelings arise, grounding practices can help you find stability. Try the 5-4-3-2-1 technique: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This simple practice helps bring your attention to the present moment and activates the sensory parts of your brain that can calm the emotional centers.",
        affirmation: "I can return to the present moment and find stability within myself."
      },
      {
        title: "Creating Space",
        message: "When overwhelm takes over, even a moment of calm can make a difference. Research shows that brief pauses—even just 30 seconds—can help your nervous system reset. Try placing a hand on your heart, taking a few deep breaths, and reminding yourself 'This is a moment of difficulty, and I'm doing the best I can.' Remember that reaching out for support is a sign of strength, not weakness. What small action might create a bit of breathing room right now?",
        affirmation: "I create moments of calm and remember that I am not alone in this experience."
      }
    ],
    null: [
      {
        title: "Thanks for sharing",
        message: "Your emotional wellbeing matters to us. We've prepared some resources that might be helpful for you today. Remember that emotions provide valuable information about our needs and experiences. By acknowledging how you feel, you've already taken an important step in self-care. What small action might support your wellbeing right now?",
        affirmation: "I listen to my emotions with compassion and respond with self-care."
      }
    ]
  };

  // State to store the selected response
  const [selectedResponse, setSelectedResponse] = useState<{title: string; message: string; affirmation?: string} | null>(null);

  // Open crisis dialog automatically if mood is overwhelmed
  useEffect(() => {
    if (selectedMood === 'overwhelmed' || selectedMood === 'sad') {
      // Don't open immediately, wait a moment after they see the response first
      const timer = setTimeout(() => {
        setShowCrisisDialog(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedMood]);

  // Select a random response when the component mounts or mood changes
  useEffect(() => {
    if (selectedMood) {
      const responses = moodResponses[selectedMood];
      const randomIndex = Math.floor(Math.random() * responses.length);
      setSelectedResponse(responses[randomIndex]);
    } else {
      setSelectedResponse(moodResponses.null[0]);
    }
  }, [selectedMood]);

  // Handle navigation to the crisis support page
  const handleCrisisSupport = () => {
    setShowCrisisDialog(false);
    navigate('/crisis-support');
    toast({
      title: "Connecting to support resources",
      description: "You're taking an important step. Support is available.",
    });
  };

  // Handle slider change for dialog content scrolling
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (dialogContentRef.current) {
      const maxScroll = dialogContentRef.current.scrollHeight - dialogContentRef.current.clientHeight;
      const scrollPosition = (value[0] / 100) * maxScroll;
      dialogContentRef.current.scrollTop = scrollPosition;
    }
  };

  useEffect(() => {
    // Reset slider when dialog opens
    if (showCrisisDialog) {
      setSliderValue([0]);
    }
  }, [showCrisisDialog]);

  if (!selectedResponse) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80]">
          {selectedResponse.title}
        </h2>
        
        <p className="text-xl mb-6 text-white/90 leading-relaxed">
          {selectedResponse.message}
        </p>
        
        {selectedResponse.affirmation && (
          <div className="my-6 p-4 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm">
            <p className="text-white/90 italic text-center">
              "{selectedResponse.affirmation}"
            </p>
          </div>
        )}
        
        <div className="mb-8">
          <p className="text-white/80">
            Based on your mood, we've prepared personalized resources and activities to support your mental wellbeing today.
          </p>
        </div>
        
        <div className="flex justify-between mt-6">
          {onPrevious && (
            <Button 
              onClick={onPrevious}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-1.5 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-xl shadow-md text-sm"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-3 w-3" /> Previous
            </Button>
          )}
          <div className={onPrevious ? "" : "mx-auto"}>
            <Button 
              onClick={onContinue}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-1.5 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-xl shadow-md text-sm"
              size="sm"
            >
              Continue <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {(selectedMood === 'overwhelmed' || selectedMood === 'sad') && (
          <div className="mt-6 p-4 border border-red-500/30 rounded-lg bg-red-900/10 backdrop-blur-sm">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">
                If you're feeling severely overwhelmed or having thoughts of harming yourself, 
                please know that support is available. Click below to access immediate resources.
              </p>
            </div>
            <Button 
              onClick={() => setShowCrisisDialog(true)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white w-full"
              size="sm"
            >
              Access Crisis Support
            </Button>
          </div>
        )}
      </div>

      {/* Crisis Support Dialog with Slider Navigation */}
      <Dialog open={showCrisisDialog} onOpenChange={setShowCrisisDialog}>
        <DialogContent className="bg-slate-900 border border-red-500/30 text-white max-h-[90vh] overflow-hidden flex flex-col">
          <div className="sticky top-0 z-10 bg-slate-900 pb-2 border-b border-red-500/20">
            <div className="flex justify-between items-center">
              <DialogTitle className="flex items-center text-red-300">
                <AlertCircle className="h-5 w-5 mr-2" />
                Crisis Support Available
              </DialogTitle>
              <Button 
                className="h-7 w-7 p-0 rounded-full bg-transparent hover:bg-red-900/30"
                onClick={() => setShowCrisisDialog(false)}
              >
                <X className="h-4 w-4 text-red-300" />
              </Button>
            </div>
            <DialogDescription className="text-slate-300">
              If you're experiencing a crisis or having thoughts of self-harm, 
              immediate support is available.
            </DialogDescription>
          </div>

          <div 
            className="space-y-4 py-4 overflow-y-auto flex-grow pr-2 scrollbar-hide"
            ref={dialogContentRef}
            style={{ maxHeight: "50vh" }}
          >
            <div className="p-3 border border-red-500/30 rounded-md bg-red-900/10 mb-4">
              <h4 className="font-medium text-white mb-2">Immediate Crisis Support</h4>
              <p className="text-sm text-slate-300 mb-2">
                Connect to trained crisis counselors who can provide immediate support.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-black font-bold"
                onClick={handleCrisisSupport}>
                <Phone className="mr-2 h-5 w-5" />
                Access Crisis Resources
              </Button>
            </div>

            <div className="p-3 border border-red-500/30 rounded-md bg-red-900/10 mb-4">
              <h4 className="font-medium text-white mb-2">National Suicide Prevention Lifeline</h4>
              <p className="text-sm text-slate-300 mb-2">
                Free, confidential support available 24/7.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-black font-bold"
                onClick={() => {
                  window.open('tel:988');
                  toast({
                    title: "Connecting to the Lifeline",
                    description: "Dialing 988 - The National Suicide Prevention Lifeline",
                  });
                }}>
                <Phone className="mr-2 h-5 w-5" />
                Call 988
              </Button>
            </div>

            <div className="p-3 border border-red-500/30 rounded-md bg-red-900/10 mb-4">
              <h4 className="font-medium text-white mb-2">Crisis Text Line</h4>
              <p className="text-sm text-slate-300 mb-2">
                Text-based crisis support available 24/7.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-black font-bold"
                onClick={() => {
                  navigator.clipboard.writeText('HOME');
                  toast({
                    title: "Text HOME to 741741",
                    description: "We've copied 'HOME' to your clipboard for the Crisis Text Line",
                  });
                }}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Text HOME to 741741
              </Button>
            </div>

            <div className="p-3 border border-red-500/30 rounded-md bg-red-900/10 mb-4">
              <h4 className="font-medium text-white mb-2">Community Support Chat</h4>
              <p className="text-sm text-slate-300 mb-2">
                Connect with others who understand what you're going through.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-black font-bold">
                Join Support Chat
              </Button>
            </div>

            <div className="p-3 border border-red-500/30 rounded-md bg-red-900/10">
              <h4 className="font-medium text-white mb-2">Emergency Services</h4>
              <p className="text-sm text-slate-300 mb-2">
                If you or someone you know is in immediate danger, please call emergency services.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-black font-bold"
                onClick={() => {
                  window.open('tel:911');
                  toast({
                    title: "Connecting to Emergency Services",
                    description: "Dialing 911 - Emergency Services",
                  });
                }}>
                <Phone className="mr-2 h-5 w-5" />
                Call 911
              </Button>
            </div>
          </div>

          <div className="sticky bottom-0 pt-2 border-t border-red-500/20 bg-slate-900">
            <div className="px-2 mb-3">
              <p className="text-xs text-slate-400 mb-1">Scroll to see more resources</p>
              <Slider
                value={sliderValue}
                onValueChange={handleSliderChange}
                className="mt-2"
                step={1}
                max={100}
              />
            </div>
            
            <DialogFooter>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-black font-bold" 
                onClick={() => setShowCrisisDialog(false)}
              >
                Continue
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodResponse;
