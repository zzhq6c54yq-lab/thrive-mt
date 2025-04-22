import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

interface PracticeStep {
  id: number;
  title: string;
  instruction: string;
  duration: number; // in seconds
}

interface LocationState {
  therapyId?: string;
  therapyName?: string;
  returnPath?: string;
}

const GuidedPractice = () => {
  const { therapyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const locationState = location.state as LocationState;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const returnPath = locationState?.returnPath || "/alternative-therapies";

  const practices: Record<string, {
    title: string;
    description: string;
    backgroundClass: string;
    steps: PracticeStep[];
  }> = {
    "mindfulness": {
      title: "Body Scan Meditation",
      description: "A guided practice to develop awareness of sensations throughout your body.",
      backgroundClass: "from-teal-600 to-green-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a comfortable position lying down or seated. Close your eyes and take three deep breaths, allowing your body to settle into the surface supporting you.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Feet & Legs", 
          instruction: "Bring awareness to your feet. Notice any sensations - temperature, pressure, tingling, or nothing at all. Slowly move your attention up through your legs, noticing all sensations.", 
          duration: 60 
        },
        { 
          id: 3, 
          title: "Torso", 
          instruction: "Continue moving awareness through your hips, abdomen, chest, and back. Notice sensations of clothing, air, temperature, and the natural movement of your breath.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "Arms & Hands", 
          instruction: "Bring awareness to your shoulders, down your arms, to your hands and fingertips. Notice any tension, temperature, or other sensations without trying to change anything.", 
          duration: 60 
        },
        { 
          id: 5, 
          title: "Head & Face", 
          instruction: "Finally, bring attention to your neck, head, and face. Notice sensations around your jaw, eyes, forehead. Allow any tension to soften with each breath.", 
          duration: 60 
        },
        { 
          id: 6, 
          title: "Whole Body", 
          instruction: "Now expand your awareness to feel your entire body as a whole. Notice how the different parts connect and how your breath moves through your whole system.", 
          duration: 60 
        }
      ]
    },
    "aromatherapy": {
      title: "Essential Oil Experience",
      description: "A guided practice to explore the therapeutic benefits of aromatherapy.",
      backgroundClass: "from-green-600 to-teal-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a quiet space where you won't be disturbed. If you have essential oils, prepare them now. Otherwise, you can still participate through visualization. Take three deep breaths to center yourself.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Sensory Awareness", 
          instruction: "If you have an essential oil, place a drop in your palm or on a tissue. Bring it close to your nose and take a gentle inhale. Notice the immediate sensations and thoughts that arise.", 
          duration: 45 
        },
        { 
          id: 3, 
          title: "Breathwork", 
          instruction: "Continue breathing slowly with the aroma. Inhale for a count of 4, hold for 2, exhale for 6. Notice how the scent might change or how your perception of it evolves.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "Body Scan", 
          instruction: "As you continue breathing with the aroma, notice any changes in your body. Perhaps tension releasing, a shift in mood, or changes in your breathing pattern.", 
          duration: 60 
        },
        { 
          id: 5, 
          title: "Integration", 
          instruction: "Begin to bring awareness back to your surroundings. Notice how you feel compared to when you started. Carry this awareness with you as you continue your day.", 
          duration: 45 
        }
      ]
    },
    "yoga": {
      title: "Basic Yoga Flow for Beginners",
      description: "A gentle 15-minute yoga sequence perfect for beginners, focusing on fundamental poses and proper breathing techniques.",
      backgroundClass: "from-blue-600 to-teal-600",
      steps: [
        { 
          id: 1, 
          title: "Introduction & Centering", 
          instruction: "Find a comfortable seated position. Take deep breaths and bring awareness to your body. We'll begin with simple stretches to warm up.", 
          duration: 120 
        },
        { 
          id: 2, 
          title: "Sun Salutation A", 
          instruction: "Start in mountain pose. On inhale, raise arms overhead. On exhale, fold forward. Inhale halfway lift, exhale fold. Step back to plank, lower to chaturanga, upward dog, and downward dog. Hold for 5 breaths.", 
          duration: 180 
        },
        { 
          id: 3, 
          title: "Standing Poses", 
          instruction: "From downward dog, step forward to warrior I. Hold for 3 breaths. Transition to warrior II, then extended side angle pose. Repeat on other side.", 
          duration: 240 
        },
        { 
          id: 4, 
          title: "Balance Practice", 
          instruction: "Return to mountain pose. Shift weight to right foot for tree pose. Find a focal point and hold for 5 breaths. Repeat on left side.", 
          duration: 180 
        },
        { 
          id: 5, 
          title: "Seated Poses", 
          instruction: "Come to seated position. Forward fold over extended legs, then butterfly pose. Focus on breathing into any tension.", 
          duration: 120 
        },
        { 
          id: 6, 
          title: "Final Relaxation", 
          instruction: "Lie down in savasana (corpse pose). Let your body completely relax. Focus on your breath and the sensations in your body.", 
          duration: 60 
        }
      ]
    },
    "music-therapy": {
      title: "Rhythmic Resonance Meditation",
      description: "Experience the healing power of rhythm and sound in this guided music practice.",
      backgroundClass: "from-indigo-600 to-blue-600",
      steps: [
        { 
          id: 1, 
          title: "Find Comfort", 
          instruction: "Sit or lie down in a comfortable position. Close your eyes or soften your gaze. Take three deep breaths, allowing your body to relax with each exhale.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Body Awareness", 
          instruction: "Bring attention to the natural rhythm of your breathing. Notice your heartbeat. These are your body's natural rhythms that are always with you.", 
          duration: 45 
        },
        { 
          id: 3, 
          title: "Create Rhythm", 
          instruction: "Begin tapping a gentle rhythm on your leg or chest. Start slow and steady, matching your breath. Feel free to increase or decrease the tempo as feels right.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "Add Sound", 
          instruction: "If comfortable, add humming or simple sounds to your rhythm. This doesn't need to be a song - just sounds that feel good to make. Notice the vibration in your body.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "Complete Integration", 
          instruction: "Gradually bring your sounds and rhythms to a close. Sit in silence for a moment, noticing how your body feels. What sensations or emotions are present now?", 
          duration: 60 
        }
      ]
    },
    "art-therapy": {
      title: "Emotional Landscape Drawing",
      description: "Express your emotions through color, shape, and texture in this guided art practice.",
      backgroundClass: "from-purple-600 to-indigo-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a quiet space where you won't be disturbed. Gather paper and colored pencils, markers, or any art supplies you have available. Take three deep breaths to center yourself.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Emotional Awareness", 
          instruction: "Close your eyes and notice what emotions are present for you right now. Don't judge them, simply observe what's there. Where do you feel these emotions in your body?", 
          duration: 60 
        },
        { 
          id: 3, 
          title: "Color Selection", 
          instruction: "Open your eyes and select colors that represent your emotions. There are no wrong choices - trust your intuition about which colors resonate with how you feel.", 
          duration: 45 
        },
        { 
          id: 4, 
          title: "Begin Drawing", 
          instruction: "Without overthinking, begin to make marks on your paper. Let the shapes, lines, and colors flow naturally as expressions of your emotional state. This is not about creating a perfect image.", 
          duration: 180 
        },
        { 
          id: 5, 
          title: "Reflection", 
          instruction: "Look at your drawing. What do you notice? What surprises you? Write down any insights or thoughts that arise when looking at your emotional landscape.", 
          duration: 90 
        }
      ]
    },
    "hydrotherapy": {
      title: "Water Relaxation Technique",
      description: "Experience the healing properties of water for relaxation and stress relief.",
      backgroundClass: "from-blue-500 to-cyan-500",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a comfortable place where you can access water - this could be a bath, shower, sink, or even a glass of water. Take three deep breaths to center yourself.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Water Contact", 
          instruction: "Place your hands in water or on a wet cloth. Notice the temperature, the sensation on your skin, and any immediate feelings that arise. How does this simple contact feel?", 
          duration: 45 
        },
        { 
          id: 3, 
          title: "Mindful Observation", 
          instruction: "Focus on the water itself. If possible, watch it move or ripple. Listen to any sounds it makes. Consider its properties - flowing, cleansing, life-giving.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "Temperature Therapy", 
          instruction: "If possible, adjust the temperature of the water. Notice how different temperatures affect your body and mind. Warm water tends to relax muscles, while cool water can invigorate.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "Final Integration", 
          instruction: "As you complete this practice, imagine the water has absorbed any tension or stress. As you release the water, visualize releasing whatever no longer serves you.", 
          duration: 60 
        }
      ]
    },
    "tai-chi": {
      title: "Tai Chi Flowing Movement",
      description: "Experience the gentle flowing movements of Tai Chi for balance and relaxation.",
      backgroundClass: "from-green-500 to-emerald-500",
      steps: [
        { 
          id: 1, 
          title: "Grounding", 
          instruction: "Stand with feet shoulder-width apart, knees slightly bent. Feel your feet connecting with the ground. Take three deep breaths, allowing your body to become centered.", 
          duration: 45 
        },
        { 
          id: 2, 
          title: "Cloud Hands", 
          instruction: "Raise your hands to chest height, palms facing down. Slowly begin moving your hands in gentle circular motions, as if you're moving clouds. Keep your movements slow and fluid.", 
          duration: 75 
        },
        { 
          id: 3, 
          title: "Gentle Shifting", 
          instruction: "Begin to shift your weight gently from one foot to the other, maintaining your cloud hands movement. Breathe naturally, coordinating breath with movement.", 
          duration: 90 
        },
        { 
          id: 4, 
          title: "Flow Like Water", 
          instruction: "Allow your arms to flow like water, moving in soft curves and circles. There is no right or wrong way - focus on the feeling of gentle, continuous movement.", 
          duration: 120 
        },
        { 
          id: 5, 
          title: "Gathering Energy", 
          instruction: "Slowly bring your hands together in front of your lower abdomen, as if holding a ball of energy. Feel the warmth between your palms. Take three deep breaths to complete the practice.", 
          duration: 60 
        }
      ]
    },
    "qigong": {
      title: "Qigong Energy Cultivation",
      description: "Ancient practice to cultivate and balance vital energy through gentle movements and breathing.",
      backgroundClass: "from-amber-500 to-yellow-500",
      steps: [
        { 
          id: 1, 
          title: "Centering", 
          instruction: "Stand with feet shoulder-width apart, knees slightly bent. Place your hands at your sides. Close your eyes and take three deep breaths, visualizing roots extending from your feet into the earth.", 
          duration: 45 
        },
        { 
          id: 2, 
          title: "Gathering Qi", 
          instruction: "Slowly raise your hands in front of you, palms facing up, as if lifting something. As your hands reach chest height, turn your palms to face your body. Feel the energy between your hands and your body.", 
          duration: 60 
        },
        { 
          id: 3, 
          title: "Circulating Energy", 
          instruction: "Begin to move your hands in circles in front of your body, as if tracing the outline of a ball. Coordinate your breathing with the movement - inhale as hands rise, exhale as they fall.", 
          duration: 90 
        },
        { 
          id: 4, 
          title: "Pushing Mountains", 
          instruction: "Extend your arms forward at shoulder height, palms facing away from you. Slowly push forward, as if gently pushing a mountain. Pull back and repeat, coordinating with your breath.", 
          duration: 120 
        },
        { 
          id: 5, 
          title: "Storing Energy", 
          instruction: "Lower your hands to your lower abdomen (dan tian), right hand over left for women, left over right for men. Feel the warmth and energy collecting in your center. Take three deep breaths to complete.", 
          duration: 60 
        }
      ]
    },
    "reiki": {
      title: "Self-Reiki Energy Practice",
      description: "A guided self-healing practice using Reiki hand positions and energy awareness.",
      backgroundClass: "from-purple-500 to-violet-500",
      steps: [
        { 
          id: 1, 
          title: "Setting Intention", 
          instruction: "Sit or lie comfortably. Rub your palms together to activate energy. Set an intention for healing, such as 'I am open to receiving healing energy' or 'I allow balance to restore in my body.'", 
          duration: 45 
        },
        { 
          id: 2, 
          title: "Crown Position", 
          instruction: "Place your hands lightly on or hovering above the top of your head. Visualize white or purple light flowing from your hands into your head, clearing your thoughts and bringing peace.", 
          duration: 90 
        },
        { 
          id: 3, 
          title: "Heart Center", 
          instruction: "Move your hands to your heart center. Feel the warmth between your hands and your chest. Imagine green light flowing into your heart, bringing healing, compassion, and balance.", 
          duration: 90 
        },
        { 
          id: 4, 
          title: "Solar Plexus", 
          instruction: "Place your hands on your upper abdomen, just below your ribcage. Visualize yellow light flowing into this area, bringing confidence, personal power, and digestive harmony.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "Integration", 
          instruction: "Place one hand on your lower abdomen and one on your heart. Feel the connection between these energy centers. Take three deep breaths, visualizing your entire body filled with healing light.", 
          duration: 60 
        }
      ]
    },
    "acupressure": {
      title: "Self-Acupressure Relief Points",
      description: "Learn to stimulate key acupressure points for stress relief and energy balance.",
      backgroundClass: "from-orange-500 to-amber-500",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a comfortable seated position. Take three deep breaths to center yourself. We'll work with gentle but firm pressure on specific points. If any point feels too sensitive, reduce pressure.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "LI4 - Hand Point", 
          instruction: "Locate the web between your thumb and index finger. Using the thumb of your opposite hand, apply gentle pressure to this point. This point helps relieve headaches and tension. Hold for 1-2 minutes.", 
          duration: 90 
        },
        { 
          id: 3, 
          title: "Yintang - Third Eye", 
          instruction: "Place your finger between your eyebrows, at the indent where the bridge of your nose meets your forehead. Apply gentle pressure in a circular motion. This point helps calm the mind and relieve anxiety.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "GB20 - Gates of Consciousness", 
          instruction: "Place your thumbs at the base of your skull in the hollows on both sides of your neck. Apply gentle upward pressure. This point helps relieve headaches and neck tension.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "ST36 - Three Miles Point", 
          instruction: "Locate the point four finger widths below your kneecap, on the outside of your shinbone. Apply gentle pressure in circular motions. This point helps boost energy and strengthen immunity.", 
          duration: 90 
        }
      ]
    },
    "breath-work": {
      title: "Transformative Breath Patterns",
      description: "Learn powerful breathing techniques to alter your state and enhance wellbeing.",
      backgroundClass: "from-sky-500 to-blue-500",
      steps: [
        { 
          id: 1, 
          title: "Awareness", 
          instruction: "Sit comfortably with your spine straight. Place one hand on your chest and one on your abdomen. Simply notice your natural breathing pattern without trying to change it. Where do you feel movement?", 
          duration: 45 
        },
        { 
          id: 2, 
          title: "Diaphragmatic Breathing", 
          instruction: "Focus on breathing into your lower abdomen. Feel your belly expand on the inhale and contract on the exhale. Breathe slowly and deeply, keeping your chest relatively still.", 
          duration: 90 
        },
        { 
          id: 3, 
          title: "4-7-8 Breath", 
          instruction: "Inhale quietly through your nose for a count of 4. Hold your breath for a count of 7. Exhale completely through your mouth with a whoosh sound for a count of 8. Repeat this cycle 4 times.", 
          duration: 120 
        },
        { 
          id: 4, 
          title: "Alternate Nostril Breathing", 
          instruction: "Using your right thumb, close your right nostril. Inhale through your left nostril, then close it with your ring finger. Release your thumb and exhale through your right nostril. Reverse and repeat.", 
          duration: 120 
        },
        { 
          id: 5, 
          title: "Integration", 
          instruction: "Return to natural breathing. Notice how your body and mind feel compared to when you started. Observe any changes in your state, temperature, or energy level.", 
          duration: 60 
        }
      ]
    },
    "sound-therapy": {
      title: "Resonant Sound Healing",
      description: "Experience the therapeutic vibrations of sound for deep relaxation and healing.",
      backgroundClass: "from-indigo-500 to-blue-500",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a comfortable position where you can fully relax. Close your eyes and take three deep breaths. Begin to shift your attention to the sounds around you.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Vocal Toning", 
          instruction: "Take a deep breath and on the exhale, make an 'Ahhh' sound. Feel the vibration in your chest and throat. Allow the sound to be continuous until your breath naturally ends.", 
          duration: 60 
        },
        { 
          id: 3, 
          title: "Body Scanning", 
          instruction: "Focus on different parts of your body, starting from your feet and moving upward. For each area, imagine sound waves or vibrations moving through that part, releasing any tension.", 
          duration: 120 
        },
        { 
          id: 4, 
          title: "Om Chanting", 
          instruction: "Inhale deeply, and on the exhale chant 'Om' (pronounced AUM), letting the sound resonate through your body. Feel the vibration moving from your abdomen up through your head.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "Silent Integration", 
          instruction: "Sit in complete silence for a few moments. Notice the powerful effect of silence after sound. Feel the residual vibrations in your body and the clarity in your mind.", 
          duration: 60 
        }
      ]
    }
  };

  const practice = therapyId ? practices[therapyId] : null;

  useEffect(() => {
    if (!practice) return;
    
    const currentStep = practice.steps[currentStepIndex];
    if (currentStep) {
      setTimeRemaining(currentStep.duration);
    }
  }, [practice, currentStepIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeRemaining === 0) {
      if (practice && currentStepIndex < practice.steps.length - 1) {
        setCurrentStepIndex(prevIndex => prevIndex + 1);
      } else {
        setCompleted(true);
        setIsPlaying(false);
        toast({
          title: "Practice Completed",
          description: "Great job! You've completed your guided practice session.",
        });
      }
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining, currentStepIndex, practice, toast]);

  useEffect(() => {
    if (!practice) return;
    
    const totalDuration = practice.steps.reduce((sum, step) => sum + step.duration, 0);
    const completedDuration = practice.steps
      .slice(0, currentStepIndex)
      .reduce((sum, step) => sum + step.duration, 0);
    const currentProgress = (timeRemaining > 0) 
      ? completedDuration + (practice.steps[currentStepIndex].duration - timeRemaining)
      : completedDuration;
    
    setProgress(Math.round((currentProgress / totalDuration) * 100));
  }, [practice, currentStepIndex, timeRemaining]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetPractice = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!practice || !therapyId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Practice Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the guided practice you're looking for.</p>
          <Link to="/alternative-therapies">
            <Button>Return to Alternative Therapies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = practice.steps[currentStepIndex];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${practice.backgroundClass} text-white`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22><circle cx=%2240%22 cy=%2240%22 r=%2232%22 fill=%22white%22 opacity=%220.05%22/></svg>')] bg-center"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-32"></div>
      
      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to={returnPath} className="inline-flex items-center text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alternative Therapies
          </Link>
          <HomeButton />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light mb-2">{practice.title}</h1>
          <p className="text-white/80 mb-8">{practice.description}</p>
          
          <div className="mb-10">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
          
          {completed ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-300" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Practice Complete!</h2>
              <p className="text-white/80 mb-6">
                Congratulations on completing your guided practice. Take a moment to notice how you feel right now.
              </p>
              <Button onClick={resetPractice} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <RotateCw className="mr-2 h-4 w-4" /> Start Over
              </Button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium">{currentStep.title}</h3>
                  <p className="text-white/60 text-sm">
                    Step {currentStepIndex + 1} of {practice.steps.length}
                  </p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-mono">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              
              <p className="text-white/90 leading-relaxed mb-8">
                {currentStep.instruction}
              </p>
              
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg"
                  className={`${isPlaying 
                    ? 'bg-white/20 hover:bg-white/30' 
                    : 'bg-white text-indigo-700 hover:bg-white/90'
                  } min-w-[140px]`}
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> {currentStepIndex === 0 && !isPlaying ? 'Begin' : 'Continue'}
                    </>
                  )}
                </Button>
                
                {currentStepIndex > 0 && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10" 
                    onClick={resetPractice}
                  >
                    <RotateCw className="mr-2 h-4 w-4" /> Start Over
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium mb-4">Practice Outline</h3>
            {practice.steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center p-3 rounded-lg ${
                  index === currentStepIndex 
                    ? 'bg-white/20' 
                    : index < currentStepIndex 
                      ? 'bg-white/10'
                      : 'bg-white/5'
                }`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mr-3 ${
                  index < currentStepIndex
                    ? 'bg-green-500/20'
                    : 'bg-white/10'
                }`}>
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="h-4 w-4 text-green-300" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-white/60">{formatTime(step.duration)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedPractice;
