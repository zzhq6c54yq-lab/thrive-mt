import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Heart, BookOpen, Compass, Film, Dumbbell, PenTool, Music, 
  CloudRain, Moon, Coffee, Brain, Gem, Apple, Award, UserPlus, Snowflake, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const AlternativeTherapies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);

  type Therapy = {
    id: string;
    name: string;
    icon: React.ReactElement;
    shortDescription: string;
    description: string;
    benefits: string[];
    tags: string[];
    resources: {
      title: string;
      type: "article" | "video" | "app" | "book";
      url: string;
      description: string;
    }[];
    practitioners?: string[];
    guidedPractice?: {
      title: string;
      duration: string;
      description: string;
    };
  };

  const therapies: Record<string, Therapy[]> = {
    "creative": [
      {
        id: "art-therapy",
        name: "Art Therapy",
        icon: <PenTool className="h-5 w-5 text-teal-500" />,
        shortDescription: "Visual expression of emotions and experiences",
        description: "Art therapy uses creative processes like drawing, painting, and sculpting to help people express emotions, reduce stress, and increase self-awareness. It's particularly helpful for those who struggle with verbal expression or have experienced trauma.",
        benefits: ["Emotional expression without words", "Processing trauma", "Reducing anxiety and stress", "Improving self-esteem", "Developing healthy coping skills"],
        tags: ["Trauma Processing", "Emotional Release", "Self-Discovery"],
        resources: [
          {
            title: "American Art Therapy Association",
            type: "article",
            url: "https://arttherapy.org/",
            description: "Professional association providing resources and therapist directory"
          },
          {
            title: "Introduction to Art Therapy Techniques",
            type: "book",
            url: "#",
            description: "Comprehensive guide for beginners exploring art therapy"
          },
          {
            title: "Healing Through Art",
            type: "video",
            url: "#",
            description: "Documentary exploring the healing power of artistic expression"
          }
        ],
        practitioners: ["Licensed Art Therapists", "Mental Health Counselors with Art Therapy training"],
        guidedPractice: {
          title: "Emotional Landscape Drawing",
          duration: "30 minutes",
          description: "In this guided practice, you'll create a visual representation of your emotional landscape using colors, shapes, and textures that resonate with your current feelings."
        }
      },
      {
        id: "music-therapy",
        name: "Music Therapy",
        icon: <Music className="h-5 w-5 text-indigo-500" />,
        shortDescription: "Sonic exploration of emotional landscapes",
        description: "Music therapy uses musical elements like rhythm, melody, and harmony to address physical, emotional, cognitive, and social needs. It can involve listening to, creating, or moving to music under the guidance of a qualified therapist.",
        benefits: ["Reducing stress and anxiety", "Improving mood", "Enhancing memory and cognitive function", "Facilitating emotional expression", "Building social connections"],
        tags: ["Mood Regulation", "Cognitive Function", "Social Connection"],
        resources: [
          {
            title: "American Music Therapy Association",
            type: "article",
            url: "https://www.musictherapy.org/",
            description: "Professional organization for music therapy resources and education"
          },
          {
            title: "Music Therapy for Anxiety",
            type: "app",
            url: "#",
            description: "App featuring therapeutic music compositions for anxiety relief"
          },
          {
            title: "The Science of Music Therapy",
            type: "video",
            url: "#",
            description: "Research-based documentary on music therapy effectiveness"
          }
        ],
        practitioners: ["Board-Certified Music Therapists", "Neurologic Music Therapists"],
        guidedPractice: {
          title: "Rhythmic Resonance Meditation",
          duration: "15 minutes",
          description: "Experience a guided rhythmic meditation that uses carefully selected sound patterns to promote relaxation and inner harmony."
        }
      },
      {
        id: "drama-therapy",
        name: "Drama Therapy",
        icon: <Film className="h-5 w-5 text-blue-500" />,
        shortDescription: "Theatrical approaches to personal growth",
        description: "Drama therapy uses theater techniques like role-play, storytelling, and improvisation to promote psychological growth and healing. It provides a safe space to explore difficult emotions and practice new behaviors.",
        benefits: ["Exploring alternative perspectives", "Practicing social skills", "Processing emotional conflicts", "Building confidence", "Developing empathy"],
        tags: ["Role Exploration", "Narrative Therapy", "Emotional Catharsis"],
        resources: [
          {
            title: "North American Drama Therapy Association",
            type: "article",
            url: "https://www.nadta.org/",
            description: "Professional organization for drama therapy"
          },
          {
            title: "Drama Therapy Techniques for Everyday Life",
            type: "book",
            url: "#",
            description: "Practical guide to incorporating drama therapy methods"
          },
          {
            title: "Transformation Through Performance",
            type: "video",
            url: "#",
            description: "Case studies of drama therapy success stories"
          }
        ],
        practitioners: ["Registered Drama Therapists", "Licensed Mental Health Counselors with drama therapy training"]
      },
      {
        id: "expressive-writing",
        name: "Expressive Writing",
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        shortDescription: "Processing emotions through written expression",
        description: "Expressive writing therapy involves writing about thoughts and feelings related to traumatic or stressful events. Research shows it can help process difficult experiences and improve psychological well-being.",
        benefits: ["Processing trauma", "Gaining perspective on problems", "Reducing rumination", "Organizing thoughts", "Emotional release"],
        tags: ["Emotional Processing", "Stress Reduction", "Self-Reflection"],
        resources: [
          {
            title: "Expressive Writing: Words that Heal",
            type: "book",
            url: "#",
            description: "Guide by James Pennebaker, pioneer in therapeutic writing research"
          },
          {
            title: "Therapeutic Writing Prompts",
            type: "app",
            url: "#",
            description: "Daily guided writing exercises for mental health"
          },
          {
            title: "The Healing Power of Writing",
            type: "article",
            url: "#",
            description: "Research overview of writing as therapy"
          }
        ],
        practitioners: ["Mental Health Counselors", "Psychologists", "Writing Therapists"]
      }
    ],
    "mind-body": [
      {
        id: "yoga-movement",
        name: "Yoga & Movement",
        icon: <Dumbbell className="h-5 w-5 text-purple-500" />,
        shortDescription: "Physical practices with mental benefits",
        description: "Yoga integrates physical postures, breathwork, and meditation to reduce stress, improve flexibility, and enhance mind-body awareness. Different styles range from gentle restorative practices to more vigorous forms.",
        benefits: ["Reducing stress and anxiety", "Improving physical flexibility", "Enhancing mind-body connection", "Promoting better sleep", "Building strength and balance"],
        tags: ["Stress Reduction", "Mind-Body Connection", "Physical Wellness"],
        resources: [
          {
            title: "Yoga for Mental Health",
            type: "video",
            url: "#",
            description: "Series of yoga practices specifically for anxiety and depression"
          },
          {
            title: "Trauma-Sensitive Yoga",
            type: "article",
            url: "#",
            description: "Guide to yoga practices adapted for trauma survivors"
          },
          {
            title: "Yoga Journal",
            type: "article",
            url: "https://www.yogajournal.com/",
            description: "Comprehensive resource for yoga practices and philosophy"
          }
        ],
        practitioners: ["Certified Yoga Instructors", "Yoga Therapists", "Mind-Body Medical Professionals"],
        guidedPractice: {
          title: "Gentle Yoga Flow for Anxiety",
          duration: "20 minutes",
          description: "A gentle sequence of yoga poses and breathing techniques specifically designed to calm the nervous system and reduce anxiety."
        }
      },
      {
        id: "mindfulness-meditation",
        name: "Mindfulness Meditation",
        icon: <CloudRain className="h-5 w-5 text-blue-500" />,
        shortDescription: "Present-moment awareness practices",
        description: "Mindfulness meditation involves paying attention to the present moment without judgment. Regular practice can help develop awareness of thoughts and feelings, reducing reactivity and stress.",
        benefits: ["Reducing anxiety and depression", "Improving focus", "Enhancing emotional regulation", "Decreasing stress", "Promoting self-awareness"],
        tags: ["Anxiety Reduction", "Attention Training", "Emotional Regulation"],
        resources: [
          {
            title: "Mindful.org",
            type: "article",
            url: "https://www.mindful.org/",
            description: "Resource for mindfulness practices and research"
          },
          {
            title: "Headspace",
            type: "app",
            url: "https://www.headspace.com/",
            description: "Guided meditation app for beginners to advanced practitioners"
          },
          {
            title: "Mindfulness-Based Stress Reduction",
            type: "book",
            url: "#",
            description: "Program developed by Jon Kabat-Zinn for stress management"
          }
        ],
        practitioners: ["Mindfulness Teachers", "MBSR Instructors", "Meditation Guides"],
        guidedPractice: {
          title: "Body Scan Meditation",
          duration: "15 minutes",
          description: "A guided practice that helps you develop awareness of sensations throughout your body, promoting relaxation and presence."
        }
      },
      {
        id: "breathwork",
        name: "Breathwork",
        icon: <Moon className="h-5 w-5 text-blue-500" />,
        shortDescription: "Conscious breathing for mental health",
        description: "Breathwork encompasses various breathing techniques that can influence physiological and psychological states. These practices can activate the parasympathetic nervous system, reducing stress and anxiety.",
        benefits: ["Reducing anxiety", "Balancing autonomic nervous system", "Improving energy levels", "Enhancing emotional regulation", "Supporting focus and concentration"],
        tags: ["Stress Response", "Nervous System", "Energy Regulation"],
        resources: [
          {
            title: "The Breathing App",
            type: "app",
            url: "#",
            description: "Guided breathing exercises based on resonance frequency"
          },
          {
            title: "Breath: The New Science of a Lost Art",
            type: "book",
            url: "#",
            description: "James Nestor's exploration of breathing techniques"
          },
          {
            title: "Transformational Breath Foundation",
            type: "article",
            url: "https://www.transformationalbreath.com/",
            description: "Organization dedicated to breathwork training and resources"
          }
        ],
        practitioners: ["Breathwork Facilitators", "Somatic Therapists", "Integrative Health Practitioners"]
      },
      {
        id: "cold-therapy",
        name: "Cold Therapy",
        icon: <Snowflake className="h-5 w-5 text-blue-500" />,
        shortDescription: "Using cold exposure for mental resilience",
        description: "Cold therapy involves deliberate exposure to cold temperatures through cold showers, ice baths, or cold water immersion. Research suggests it can reduce inflammation, improve mood, and build mental resilience.",
        benefits: ["Reducing inflammation", "Improving mood", "Increasing stress resilience", "Enhancing focus", "Boosting immune function"],
        tags: ["Stress Adaptation", "Mood Enhancement", "Physiological Regulation"],
        resources: [
          {
            title: "The Wim Hof Method",
            type: "article",
            url: "https://www.wimhofmethod.com/",
            description: "Breathing, cold exposure, and commitment techniques"
          },
          {
            title: "Cold Exposure Science",
            type: "video",
            url: "#",
            description: "Scientific explanation of cold therapy benefits"
          },
          {
            title: "Cold Plunge Guide",
            type: "book",
            url: "#",
            description: "Practical guide to safe cold water immersion practices"
          }
        ],
        practitioners: ["Cold Therapy Instructors", "Health Coaches", "Biohacking Specialists"]
      }
    ],
    "other": [
      {
        id: "nature-therapy",
        name: "Nature Therapy",
        icon: <Compass className="h-5 w-5 text-green-500" />,
        shortDescription: "Healing through connection with nature",
        description: "Nature therapy, also called ecotherapy, involves structured therapeutic experiences in natural settings. Research shows that time in nature can reduce stress hormones, improve mood, and enhance overall wellbeing.",
        benefits: ["Reducing stress and anxiety", "Improving attention and focus", "Enhancing mood", "Promoting physical activity", "Fostering environmental connection"],
        tags: ["Ecotherapy", "Forest Bathing", "Outdoor Therapy"],
        resources: [
          {
            title: "The Nature Fix",
            type: "book",
            url: "#",
            description: "Florence Williams' exploration of nature's impact on the brain"
          },
          {
            title: "Association of Nature & Forest Therapy",
            type: "article",
            url: "https://www.natureandforesttherapy.org/",
            description: "Training and resources for forest therapy guides"
          },
          {
            title: "Nature Sounds App",
            type: "app",
            url: "#",
            description: "Natural soundscapes for relaxation and sleep"
          }
        ],
        practitioners: ["Forest Therapy Guides", "Horticultural Therapists", "Wilderness Therapists"],
        guidedPractice: {
          title: "Indoor Nature Connection",
          duration: "10 minutes",
          description: "A guided visualization practice that helps you connect with nature even when you're indoors, bringing the healing qualities of the natural world to your mind and body."
        }
      },
      {
        id: "bibliotherapy",
        name: "Bibliotherapy",
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        shortDescription: "Therapeutic use of literature",
        description: "Bibliotherapy uses guided reading of literature to support mental health. It can involve fiction, poetry, or self-help books to gain insights, find connection, and develop coping strategies.",
        benefits: ["Gaining new perspectives", "Reducing feelings of isolation", "Developing emotional vocabulary", "Finding meaning in experiences", "Building empathy"],
        tags: ["Self-Help Books", "Narrative Therapy", "Reflective Reading"],
        resources: [
          {
            title: "The Novel Cure",
            type: "book",
            url: "#",
            description: "An A-Z of literary remedies for various conditions"
          },
          {
            title: "International Federation for Biblio/Poetry Therapy",
            type: "article",
            url: "https://ifbpt.org/",
            description: "Professional organization for bibliotherapy"
          },
          {
            title: "Therapeutic Reading Lists",
            type: "article",
            url: "#",
            description: "Curated book recommendations for specific mental health challenges"
          }
        ],
        practitioners: ["Certified Poetry Therapists", "Bibliotherapists", "Mental Health Counselors"]
      },
      {
        id: "animal-assisted-therapy",
        name: "Animal-Assisted Therapy",
        icon: <Heart className="h-5 w-5 text-blue-500" />,
        shortDescription: "Healing connections with animals",
        description: "Animal-assisted therapy incorporates animals into the therapeutic process. Interactions with animals can reduce stress hormones, increase oxytocin, and provide emotional support and motivation in treatment.",
        benefits: ["Reducing anxiety and stress", "Increasing social interaction", "Improving mood", "Enhancing motivation for treatment", "Providing emotional support"],
        tags: ["Therapy Animals", "Emotional Support", "Companionship"],
        resources: [
          {
            title: "Pet Partners",
            type: "article",
            url: "https://petpartners.org/",
            description: "Organization for animal-assisted interventions"
          },
          {
            title: "Animal-Assisted Therapy in Counseling",
            type: "book",
            url: "#",
            description: "Comprehensive guide for mental health professionals"
          },
          {
            title: "Healing Paws",
            type: "video",
            url: "#",
            description: "Documentary on animal-assisted therapy impacts"
          }
        ],
        practitioners: ["Animal-Assisted Therapists", "Counselors with Animal-Assisted Therapy training", "Equine Therapists"]
      },
      {
        id: "nutrition-therapy",
        name: "Nutritional Psychiatry",
        icon: <Apple className="h-5 w-5 text-blue-500" />,
        shortDescription: "Mental health support through diet",
        description: "Nutritional psychiatry explores the connection between diet and mental health. Research shows strong links between gut health, inflammation, and mental wellbeing, with certain dietary patterns showing benefits for mood disorders.",
        benefits: ["Supporting brain function", "Reducing inflammation", "Improving gut health", "Stabilizing mood", "Enhancing energy levels"],
        tags: ["Anti-inflammatory Diet", "Gut-Brain Connection", "Micronutrients"],
        resources: [
          {
            title: "This Is Your Brain on Food",
            type: "book",
            url: "#",
            description: "Dr. Uma Naidoo's guide to foods that support mental health"
          },
          {
            title: "International Society for Nutritional Psychiatry Research",
            type: "article",
            url: "https://www.isnpr.org/",
            description: "Organization dedicated to research in nutritional psychiatry"
          },
          {
            title: "Food Mood Tracker",
            type: "app",
            url: "#",
            description: "App for tracking food intake and mood correlations"
          }
        ],
        practitioners: ["Nutritional Psychiatrists", "Registered Dietitians", "Functional Medicine Practitioners"]
      }
    ],
    "emerging": [
      {
        id: "virtual-reality-therapy",
        name: "Virtual Reality Therapy",
        icon: <Gem className="h-5 w-5 text-violet-500" />,
        shortDescription: "Immersive therapeutic environments",
        description: "Virtual Reality Therapy uses immersive digital environments to treat various mental health conditions. It's particularly effective for exposure therapy, helping people confront fears in a controlled, safe setting.",
        benefits: ["Safe exposure to phobia triggers", "Distraction from pain", "Skill-building in simulated environments", "Enhanced engagement in therapy", "Access to otherwise impossible therapeutic scenarios"],
        tags: ["Digital Therapeutics", "Exposure Therapy", "Immersive Healing"],
        resources: [
          {
            title: "Virtual Reality Medical Center",
            type: "article",
            url: "https://vrphobia.com/",
            description: "Organization specializing in VR therapy for anxiety disorders"
          },
          {
            title: "Therapeutic VR Applications",
            type: "app",
            url: "#",
            description: "Collection of therapeutic VR experiences for various conditions"
          },
          {
            title: "The Promise of VR in Mental Health",
            type: "video",
            url: "#",
            description: "Documentary on the future of VR in psychological treatment"
          }
        ],
        practitioners: ["VR Therapy Specialists", "Mental Health Technologists", "Clinical Psychologists with VR training"],
        guidedPractice: {
          title: "Mindful VR Breathing",
          duration: "10 minutes",
          description: "A guided breathing exercise that uses visualization techniques inspired by VR therapy to create a sense of presence and calm."
        }
      },
      {
        id: "neurofeedback",
        name: "Neurofeedback",
        icon: <Brain className="h-5 w-5 text-blue-500" />,
        shortDescription: "Brain training through real-time feedback",
        description: "Neurofeedback uses real-time displays of brain activity to teach self-regulation of brain function. Sensors monitor brainwaves while feedback helps the brain learn more optimal patterns.",
        benefits: ["Improving attention", "Reducing anxiety symptoms", "Addressing PTSD symptoms", "Enhancing sleep quality", "Supporting cognitive performance"],
        tags: ["Brain Training", "Self-Regulation", "Neuroplasticity"],
        resources: [
          {
            title: "International Society for Neurofeedback & Research",
            type: "article",
            url: "https://isnr.org/",
            description: "Professional organization for neurofeedback research and practice"
          },
          {
            title: "A Symphony in the Brain",
            type: "book",
            url: "#",
            description: "Jim Robbins' exploration of neurofeedback development"
          },
          {
            title: "Neurofeedback: The Science Explained",
            type: "video",
            url: "#",
            description: "Scientific breakdown of how neurofeedback works"
          }
        ],
        practitioners: ["Neurofeedback Therapists", "Neurotherapists", "Psychologists with neurofeedback training"]
      },
      {
        id: "psychedelic-therapy",
        name: "Psychedelic-Assisted Therapy",
        icon: <Award className="h-5 w-5 text-blue-500" />,
        shortDescription: "Therapeutic use of psychedelic substances",
        description: "Psychedelic-assisted therapy involves the carefully guided use of substances like psilocybin, MDMA, or ketamine within a therapeutic framework. Research shows promising results for treatment-resistant depression, PTSD, and addiction.",
        benefits: ["Breaking rigid thought patterns", "Processing traumatic memories", "Reducing depression symptoms", "Addressing addiction", "Promoting psychological insights"],
        tags: ["Emerging Research", "Mental Health Innovation", "Supervised Therapy"],
        resources: [
          {
            title: "Multidisciplinary Association for Psychedelic Studies",
            type: "article",
            url: "https://maps.org/",
            description: "Organization researching therapeutic applications of psychedelics"
          },
          {
            title: "How to Change Your Mind",
            type: "book",
            url: "#",
            description: "Michael Pollan's exploration of psychedelic therapy"
          },
          {
            title: "The Future of Psychedelic Medicine",
            type: "video",
            url: "#",
            description: "Research overview and therapeutic applications"
          }
        ],
        practitioners: ["Psychiatrists with psychedelic therapy training", "Licensed Therapists in clinical trials", "Medical professionals at ketamine clinics"]
      },
      {
        id: "group-therapy",
        name: "Group Therapy",
        icon: <UserPlus className="h-5 w-5 text-blue-500" />,
        shortDescription: "Healing in community settings",
        description: "Group therapy brings together individuals facing similar challenges to share experiences and support each other under professional guidance. It provides both therapeutic insights and the powerful healing element of community.",
        benefits: ["Reducing isolation", "Gaining perspective from peers", "Practicing social skills", "Building support networks", "Cost-effective treatment"],
        tags: ["Peer Support", "Shared Experience", "Therapeutic Community"],
        resources: [
          {
            title: "American Group Psychotherapy Association",
            type: "article",
            url: "https://www.agpa.org/",
            description: "Professional organization for group therapy"
          },
          {
            title: "Group Therapy Finder",
            type: "app",
            url: "#",
            description: "Directory of local and virtual therapy groups"
          },
          {
            title: "The Theory and Practice of Group Psychotherapy",
            type: "book",
            url: "#",
            description: "Irvin Yalom's comprehensive guide to group therapy"
          }
        ],
        practitioners: ["Licensed Group Therapists", "Clinical Social Workers", "Psychologists"]
      }
    ]
  };

  const handleTherapyClick = (therapy: Therapy) => {
    setSelectedTherapy(therapy);
    
    toast({
      title: `${therapy.name} Resources`,
      description: "Loading detailed information and resources...",
      duration: 2000
    });
  };

  const handleResourceClick = (resource: any) => {
    toast({
      title: `Accessing: ${resource.title}`,
      description: "This would open the resource in a full implementation",
      duration: 3000
    });
  };
  
  const startGuidedPractice = (therapyId: string) => {
    navigate(`/guided-practice/${therapyId}`);
  };

  const renderTherapyCards = (therapyArray: Therapy[]) => {
    return therapyArray.map((therapy) => (
      <Card 
        key={therapy.id} 
        className="transition-all duration-300 hover:shadow-lg relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none"
      >
        <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-xl -mr-16 -mt-16 opacity-70"></div>
        <div className="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-teal-100 to-green-100 dark:from-teal-900/20 dark:to-green-900/20 rounded-full blur-xl -ml-12 -mb-12 opacity-70"></div>
        
        <CardHeader className="pb-2 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="p-2 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 w-fit mb-2">
                {React.cloneElement(therapy.icon, { className: "h-5 w-5" })}
              </div>
              <CardTitle className="text-2xl font-medium bg-gradient-to-br from-purple-700 to-blue-700 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                {therapy.name}
              </CardTitle>
            </div>
          </div>
          <CardDescription>{therapy.shortDescription}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 relative z-10">
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {therapy.description.substring(0, 120)}...
          </p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {therapy.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center gap-2 pt-0 relative z-10">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            onClick={() => handleTherapyClick(therapy)}
          >
            Explore
          </Button>
          
          <Button 
            size="sm"
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            onClick={() => startGuidedPractice(therapy.id)}
          >
            <Play className="mr-1 h-4 w-4" />
            Practice
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22><circle cx=%2240%22 cy=%2240%22 r=%2232%22 fill=%22white%22 opacity=%220.2%22/></svg>')] bg-center"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-32"></div>
        
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            <span className="font-normal">Alternative</span> Therapies
          </h1>
          <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
            Explore complementary approaches to traditional therapy that can enhance your mental health journey and provide holistic healing opportunities.
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-light">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Creative Expression</span> Therapies
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            Creative therapies use artistic expression to help process emotions, reduce stress, and increase self-awareness.
            These approaches are particularly helpful for those who struggle with verbal expression.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTherapyCards(therapies.creative)}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <CloudRain className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-light">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Mind-Body</span> Approaches
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            Mind-body approaches recognize the powerful connection between physical and mental health,
            using movement, breath, and awareness to create holistic healing experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTherapyCards(therapies["mind-body"])}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-light">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Other Therapeutic</span> Approaches
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            These diverse therapeutic approaches draw on connections with nature, literature, animals, and nutrition
            to support mental health and wellbeing through various complementary methods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTherapyCards(therapies.other)}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Gem className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-light">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Emerging</span> Therapies
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            These innovative approaches represent the cutting edge of mental health treatment,
            incorporating new technologies and evolving research to address psychological challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTherapyCards(therapies.emerging)}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-600/90 to-indigo-600/90 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22><circle cx=%2240%22 cy=%2240%22 r=%2232%22 fill=%22white%22 opacity=%220.05%22/></svg>')] bg-center"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Finding Your Path</h2>
            <p className="text-white/80 mb-6 leading-relaxed max-w-3xl">
              Alternative therapies can complement traditional approaches to mental health care. 
              Many people find that a combination of conventional and alternative methods provides 
              the most comprehensive support for their mental wellbeing. Explore different options 
              to find what resonates with your unique needs, preferences, and circumstances.
            </p>
            <p className="text-white/80 mb-8 leading-relaxed max-w-3xl">
              Remember that while these approaches can be powerful tools for wellbeing, they work 
              best when integrated into a comprehensive mental health plan that may include traditional 
              therapy, medication when appropriate, lifestyle factors, and social support.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-indigo-700 hover:bg-white/90"
                onClick={() => {
                  toast({
                    title: "Consultation Request",
                    description: "Your request for a personalized consultation has been received. A specialist will contact you shortly.",
                    duration: 3000
                  });
                }}
              >
                Schedule a Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => {
                  toast({
                    title: "Resource Guide",
                    description: "Your comprehensive guide to alternative therapies is being prepared for download.",
                    duration: 3000
                  });
                }}
              >
                Download Resource Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={!!selectedTherapy} onOpenChange={(open) => !open && setSelectedTherapy(null)}>
        <SheetContent className="w-full md:max-w-md overflow-y-auto">
          {selectedTherapy && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-2xl font-medium bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                    {selectedTherapy.name}
                  </SheetTitle>
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full">
                    {selectedTherapy.icon}
                  </div>
                </div>
                <SheetDescription>{selectedTherapy.shortDescription}</SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-purple-800 dark:text-purple-300">About {selectedTherapy.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedTherapy.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-purple-800 dark:text-purple-300">Key Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedTherapy.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedTherapy.practitioners && (
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-purple-800 dark:text-purple-300">Who Provides This Therapy</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedTherapy.practitioners.map((practitioner, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{practitioner}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedTherapy.guidedPractice && (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
                    <h3 className="text-lg font-medium mb-2 text-purple-800 dark:text-purple-300">Guided Practice</h3>
                    <h4 className="font-medium text-indigo-700 dark:text-indigo-300">{selectedTherapy.guidedPractice.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Duration: {selectedTherapy.guidedPractice.duration}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedTherapy.guidedPractice.description}</p>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={() => startGuidedPractice(selectedTherapy.id)}
                    >
                      <Play className="mr-2 h-4 w-4" /> Start Guided Practice
                    </Button>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-4 text-purple-800 dark:text-purple-300">Resources</h3>
                  <div className="space-y-3">
                    {selectedTherapy.resources.map((resource, index) => (
                      <div 
                        key={index} 
                        className="p-4 border border-purple-100 dark:border-purple-800/30 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors cursor-pointer"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-indigo-700 dark:text-indigo-300">{resource.title}</h4>
                          <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => {
                      toast({
                        title: `${selectedTherapy.name} Providers`,
                        description: "Connecting you with local practitioners specializing in this therapy.",
                        duration: 3000
                      });
                    }}
                  >
                    Find Local Providers
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AlternativeTherapies;
