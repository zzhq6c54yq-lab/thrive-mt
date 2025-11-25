import { Brain, Heart, ShieldCheck, Zap, Moon, UserPlus, Laugh, PenTool, Compass, BadgeCheck, Sparkles, LucideIcon } from "lucide-react";
import mindfulCommunicationImg from "@/assets/workshop-mindful-communication.jpg";
import emotionalRegulationImg from "@/assets/workshop-emotional-regulation.jpg";
import stressManagementImg from "@/assets/workshop-stress-management.jpg";
import betterSleepImg from "@/assets/workshop-better-sleep.jpg";
import cognitiveReframingImg from "@/assets/workshop-cognitive-reframing.jpg";
import gratitudePracticeImg from "@/assets/workshop-gratitude-practice.jpg";
import selfCompassionImg from "@/assets/workshop-self-compassion.jpg";
import socialConnectionImg from "@/assets/workshop-social-connection.jpg";
import anxietyManagementImg from "@/assets/workshop-anxiety-management.jpg";
import boundarySettingImg from "@/assets/workshop-boundary-setting.jpg";
import valuesAlignmentImg from "@/assets/workshop-values-alignment.jpg";
import habitFormationImg from "@/assets/workshop-habit-formation.jpg";

interface ClinicalContext {
  framework: string;
  evidenceBase: string;
  contraindications: string[];
  whenToSeekHelp: string;
  crisisResources: {
    name: string;
    contact: string;
    description: string;
  }[];
  culturalConsiderations: string;
}

interface WorkshopSection {
  title: string;
  content: string;
  duration: string;
  videoId: string;
  practicalExercise: {
    title: string;
    instructions: string;
    timeRequired: string;
    materials: string[];
    skillLevel: "beginner" | "intermediate" | "advanced";
    outcomes: string[];
  };
}

interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  coverImage: string;
  duration: string;
  learningOutcomes: string[];
  sections: WorkshopSection[];
  clinicalContext: ClinicalContext;
}

export const workshopData: WorkshopData[] = [
  {
    id: "mindful-communication",
    title: "Mindful Communication",
    description: "Learn evidence-based communication techniques rooted in mindfulness principles to improve personal and professional relationships.",
    icon: Brain,
    color: "bg-[#9b87f5]/10",
    coverImage: mindfulCommunicationImg,
    duration: "50 minutes",
    learningOutcomes: [
      "Recognize communication patterns that create tension or misunderstanding",
      "Apply mindful listening techniques to improve comprehension and build trust",
      "Practice non-reactive responses in challenging conversations",
      "Develop clear and compassionate communication habits"
    ],
    clinicalContext: {
      framework: "Mindfulness-Based Communication (MBC) integrated with Nonviolent Communication (NVC)",
      evidenceBase: "Meta-analysis shows mindful communication interventions reduce interpersonal conflict by 42% (Jones et al., 2019). APA Grade B recommendation for relational distress.",
      contraindications: [
        "Active psychosis or severe dissociative episodes",
        "Recent trauma where direct communication may cause re-traumatization",
        "Situations involving domestic violence or abuse (safety planning required first)"
      ],
      whenToSeekHelp: "If communication difficulties persist despite consistent practice for 4-6 weeks, or if conflicts escalate to emotional/physical harm, seek support from a licensed therapist specializing in couples or family therapy.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 emotional support and crisis intervention"
        },
        {
          name: "National Domestic Violence Hotline",
          contact: "1-800-799-7233",
          description: "24/7 support for those experiencing abuse"
        }
      ],
      culturalConsiderations: "Communication styles vary significantly across cultures. Direct communication valued in Western contexts may be considered rude in collectivist cultures. Adapt these techniques to honor cultural communication norms."
    },
    sections: [
      {
        title: "Understanding Communication Patterns",
        content: "Begin by exploring how your communication style developed and how it impacts your relationships today. Research shows that 93% of communication breakdowns stem from mismatched expectations and automatic reactive patterns. This section introduces the four primary communication styles (passive, aggressive, passive-aggressive, assertive) and helps you identify your default patterns under stress. Understanding these patterns is the foundation for mindful change.",
        duration: "12 minutes",
        videoId: "aseNAGQBxNc",
        practicalExercise: {
          title: "Communication Style Self-Assessment",
          instructions: "Complete the evidence-based communication styles inventory, rating yourself across 20 scenarios. For each scenario, note whether you typically respond passively (avoiding conflict), aggressively (dominating), passive-aggressively (indirect hostility), or assertively (clear and respectful). Then identify three recent conversations—one that went well, one that was challenging, and one you wish you could redo. Map which styles you used in each and note the outcomes. This creates awareness of your patterns without judgment.",
          timeRequired: "20 minutes",
          materials: ["Communication Styles Inventory", "Conversation Analysis Worksheet", "Pattern Recognition Guide"],
          skillLevel: "beginner",
          outcomes: ["Clear identification of default communication patterns", "Recognition of situational triggers for unhelpful styles", "Baseline awareness for tracking progress"]
        }
      },
      {
        title: "Mindful Listening Fundamentals",
        content: "Mindful listening is the cornerstone of effective communication. Studies show that most people retain only 25% of what they hear in conversation because they're preparing their response instead of listening. This section teaches you to listen with full presence, suspend judgment, and hear both content and emotion. You'll learn the HEAR method: Halt internal chatter, Empathize with the speaker, Acknowledge what you're hearing, Respond after processing. This creates space for genuine understanding.",
        duration: "15 minutes",
        videoId: "HAnw168huqA",
        practicalExercise: {
          title: "Structured Listening Practice",
          instructions: "Practice the HEAR method with a partner or recorded conversation. For 5 minutes, one person speaks about something meaningful (a challenge, a joy, or a story). The listener maintains complete attention using the HEAR method: notice when your mind wanders (Halt), try to feel what the speaker feels (Empathize), periodically summarize what you're hearing (Acknowledge), then offer a thoughtful response (Respond). Switch roles. Complete the reflection worksheet analyzing what you noticed—when did your mind wander? What made it hard to stay present? What insights emerged when you truly listened?",
          timeRequired: "25 minutes",
          materials: ["HEAR Method Guide", "Listening Practice Reflection Worksheet", "Partner Practice Protocol"],
          skillLevel: "intermediate",
          outcomes: ["Improved sustained attention during conversations", "Enhanced ability to understand others' perspectives", "Reduced urge to interrupt or immediately solve problems"]
        }
      },
      {
        title: "Non-Reactive Communication Under Stress",
        content: "When emotions run high, we often react automatically in ways we later regret. This section introduces the STOP-THINK-SPEAK protocol for maintaining composure during triggering conversations. Research shows that creating even a 6-second pause between trigger and response can reduce reactive communication by 67%. You'll learn to recognize your body's early warning signs of reactivity (increased heart rate, muscle tension, heat in face) and implement grounding techniques before responding. This transforms conflicts into opportunities for deeper connection.",
        duration: "13 minutes",
        videoId: "R1vskiVDwl4",
        practicalExercise: {
          title: "Reactivity Management Practice",
          instructions: "Review the 8 scenario cards depicting common communication triggers (criticism, disagreement, feeling misunderstood, time pressure, etc.). For each scenario, practice the STOP-THINK-SPEAK protocol: STOP (notice physical reactivity signs), THINK (identify the emotion and need beneath it), SPEAK (respond to the need, not the trigger). Write out your responses using the template, then role-play 3 scenarios with increasing difficulty. Record your physiological responses and quality of communication at each stage.",
          timeRequired: "30 minutes",
          materials: ["Trigger Scenario Cards", "STOP-THINK-SPEAK Worksheet", "Physiological Response Tracker", "Role-Play Practice Guide"],
          skillLevel: "advanced",
          outcomes: ["Recognition of personal reactivity triggers", "Ability to pause before responding", "Skill in responding to needs rather than reacting to triggers"]
        }
      },
      {
        title: "Integration & Maintenance",
        content: "Sustainable communication change requires daily practice and periodic reflection. This section helps you create a personalized communication practice plan. You'll identify your three highest-priority communication goals, design daily micro-practices (2-3 minutes each), and set up weekly reflection prompts. Research shows that small, consistent practice is more effective than occasional intensive effort. You'll also learn to recognize signs that you need additional support.",
        duration: "10 minutes",
        videoId: "aseNAGQBxNc",
        practicalExercise: {
          title: "30-Day Communication Evolution Plan",
          instructions: "Using the provided template, design your personalized 30-day practice plan. Week 1: Focus on self-awareness (notice patterns without changing them). Week 2: Practice mindful listening in low-stakes conversations. Week 3: Implement STOP-THINK-SPEAK in moderate-stakes situations. Week 4: Integrate all skills in challenging relationships. Set up three check-in dates to review progress and adjust your approach. Include specific 'if-then' plans for high-risk situations (e.g., 'If I feel criticized, then I will take three deep breaths before responding').",
          timeRequired: "20 minutes",
          materials: ["30-Day Practice Plan Template", "Weekly Reflection Prompts", "Progress Tracking Sheet"],
          skillLevel: "intermediate",
          outcomes: ["Personalized communication practice plan", "Realistic expectations for progress", "Clear maintenance strategies"]
        }
      }
    ]
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    description: "Develop evidence-based skills to manage difficult emotions and respond rather than react to challenging situations.",
    icon: Heart,
    color: "bg-[#f58787]/10",
    coverImage: emotionalRegulationImg,
    duration: "52 minutes",
    learningOutcomes: [
      "Recognize emotional triggers before they escalate",
      "Apply evidence-based techniques to manage intense emotions in the moment",
      "Develop a personal emotional regulation toolkit",
      "Create sustainable practices for emotional balance"
    ],
    clinicalContext: {
      framework: "Dialectical Behavior Therapy (DBT) Emotion Regulation Skills",
      evidenceBase: "DBT emotion regulation training shows 58% reduction in emotional dysregulation symptoms (Linehan et al., 2015). APA Grade A recommendation for emotion regulation difficulties.",
      contraindications: [
        "Active suicidal ideation requiring immediate intervention",
        "Severe substance use disorders without concurrent addiction treatment",
        "Acute mania or psychotic episodes (medication stabilization needed first)"
      ],
      whenToSeekHelp: "If emotions feel overwhelming despite consistent practice, if you engage in self-harm behaviors, or if emotional intensity significantly impairs daily functioning for more than two weeks, seek evaluation from a mental health professional.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 crisis support for emotional emergencies"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "24/7 text-based crisis support"
        },
        {
          name: "SAMHSA National Helpline",
          contact: "1-800-662-4357",
          description: "Substance abuse and mental health referrals"
        }
      ],
      culturalConsiderations: "Emotional expression norms vary significantly. Some cultures value emotional restraint; others encourage expression. These skills can be adapted to honor cultural values while building healthy emotion management."
    },
    sections: [
      {
        title: "Emotion Recognition & Body Awareness",
        content: "Emotions begin in the body before we consciously recognize them. Research shows that people who can identify emotions early have 3x better regulation outcomes. This section teaches you to recognize the somatic (body-based) signatures of different emotions. You'll learn to notice subtle physiological changes—muscle tension, heart rate, temperature, breathing—that signal emotional activation. Early recognition is your first line of defense against emotional overwhelm.",
        duration: "15 minutes",
        videoId: "vz6k_GnReUs",
        practicalExercise: {
          title: "Emotion-Body Mapping Exercise",
          instructions: "Using the body outline worksheet, map where and how you experience 10 core emotions physically (anger, sadness, fear, joy, disgust, surprise, shame, guilt, anxiety, contentment). For each emotion, recall a recent experience and note: Where do you feel it? (chest, throat, stomach, etc.) What does it feel like? (tight, hot, heavy, fluttery, etc.) What's the intensity? (1-10 scale) How does it move or change? Color-code each emotion on your body map. This creates your personal emotional atlas for future reference.",
          timeRequired: "25 minutes",
          materials: ["Body Outline Worksheet (10 copies)", "Emotion Reference Guide", "Colored Pencils", "Intensity Rating Scale"],
          skillLevel: "beginner",
          outcomes: ["Clear identification of emotion-body connections", "Early warning system for emotional escalation", "Personalized emotion recognition map"]
        }
      },
      {
        title: "DBT Distress Tolerance Skills",
        content: "When emotions are intense, you need immediate tools to prevent impulsive reactions. This section introduces four DBT distress tolerance skills: TIPP (Temperature, Intense exercise, Paced breathing, Progressive muscle relaxation) for rapid physiological calming, and the ACCEPTS acronym (Activities, Contributing, Comparisons, Emotions-opposite, Pushing away, Thoughts-distraction, Sensations) for psychological distraction. Studies show these techniques reduce emotional intensity by 40% within 5-10 minutes.",
        duration: "15 minutes",
        videoId: "F2hc2FLOdhI",
        practicalExercise: {
          title: "TIPP Technique Intensive Practice",
          instructions: "Practice each TIPP component: (T) Temperature—hold ice cubes for 30 seconds or splash cold water on face; (I) Intense exercise—do 2 minutes of jumping jacks or running in place; (P) Paced breathing—breathe in for 4, hold for 7, out for 8, repeat 4 times; (P) Progressive muscle relaxation—tense and release 7 muscle groups. Rate your emotional intensity (0-10) before and after each technique. Complete this practice on three separate occasions when experiencing moderate emotional distress (4-7 intensity). Track which techniques work best for different emotions using the effectiveness tracker.",
          timeRequired: "30 minutes spread across three sessions",
          materials: ["TIPP Practice Protocol", "Intensity Rating Worksheet", "Technique Effectiveness Tracker", "Ice cubes/cold pack"],
          skillLevel: "intermediate",
          outcomes: ["Rapid emotional de-escalation skills", "Personal data on which techniques work best for you", "Confidence in managing emotional surges"]
        }
      },
      {
        title: "Cognitive Strategies for Emotion Regulation",
        content: "While body-based techniques provide immediate relief, cognitive strategies help you change your relationship with emotions long-term. This section introduces Emotion Regulation Cognitive Skills: identifying emotion myths ('emotions are weakness'), practicing opposite action (doing the opposite of emotion urges when unhelpful), and building emotion literacy (expanding your emotional vocabulary beyond 'good/bad/angry/sad'). Research shows that people with rich emotional vocabularies regulate 22% more effectively.",
        duration: "12 minutes",
        videoId: "QTsUEOUaWpY",
        practicalExercise: {
          title: "Opposite Action Practice",
          instructions: "Opposite action means acting counter to destructive emotion urges. Identify 5 recent situations where you acted on an emotion urge (e.g., withdrawn when sad, yelled when angry, avoided when anxious). For each, complete the worksheet: What was the emotion? What was the urge? What did you do? What happened? Then design opposite actions: If sad urges withdrawal, opposite action is gentle activity and connection. If anger urges aggression, opposite action is temporary distance and self-soothing. If anxiety urges avoidance, opposite action is gradual approach. Practice one opposite action this week and document the results.",
          timeRequired: "25 minutes",
          materials: ["Opposite Action Worksheet", "Emotion Urge Inventory", "Practice Planning Guide", "Outcome Tracking Form"],
          skillLevel: "advanced",
          outcomes: ["Understanding of emotion action tendencies", "Skill in choosing effective responses", "Reduced emotion-driven impulsive behaviors"]
        }
      },
      {
        title: "Building Your Emotion Regulation Toolkit & Maintenance",
        content: "Effective emotion regulation requires a personalized toolkit tailored to your unique emotional patterns, life context, and preferences. This section helps you synthesize everything you've learned into a practical, accessible system. You'll create situation-specific regulation plans (e.g., 'When I feel overwhelmed at work, I will...'), identify early warning signs that trigger prevention mode, and design a weekly emotion regulation practice routine. Consistency is key—even 5 minutes daily builds regulation capacity over time.",
        duration: "10 minutes",
        videoId: "vz6k_GnReUs",
        practicalExercise: {
          title: "Personalized Regulation Toolkit Creation",
          instructions: "Using the comprehensive toolkit template, create your personal emotion regulation manual. Section 1: List your top 5 emotional triggers with early warning signs. Section 2: For each trigger, assign 2-3 specific regulation techniques (drawn from body-based, distress tolerance, and cognitive strategies). Section 3: Create 'if-then' plans (implementation intentions) for each scenario (e.g., 'If I notice my chest tightening during a work meeting, then I will excuse myself and practice paced breathing for 2 minutes'). Section 4: Design daily maintenance practices (morning emotional check-in, evening reflection, weekly pattern review). Laminate a pocket-sized summary card to keep with you.",
          timeRequired: "35 minutes",
          materials: ["Toolkit Template", "Trigger-Response Planning Worksheet", "Implementation Intention Forms", "Pocket Card Template"],
          skillLevel: "intermediate",
          outcomes: ["Comprehensive personal emotion regulation system", "Situation-specific response plans", "Daily maintenance routine for long-term emotional resilience"]
        }
      }
    ]
  },
  {
    id: "stress-management",
    title: "Stress Management",
    description: "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.",
    icon: ShieldCheck,
    color: "bg-[#87f5c8]/10",
    coverImage: stressManagementImg,
    duration: "48 minutes",
    learningOutcomes: [
      "Identify personal stress signatures and common triggers",
      "Master rapid stress reduction techniques for acute situations",
      "Develop systems to manage ongoing stressors",
      "Create a sustainable stress resilience plan"
    ],
    clinicalContext: {
      framework: "Cognitive-Behavioral Stress Management (CBSM) with mindfulness integration",
      evidenceBase: "CBSM interventions reduce perceived stress by 35% and cortisol levels by 23% (Antoni et al., 2018). APA Grade A recommendation for chronic stress.",
      contraindications: [
        "Undiagnosed medical conditions causing stress-like symptoms (cardiac issues, thyroid problems)",
        "Acute trauma requiring trauma-specific treatment",
        "Severe depression where stress management alone is insufficient"
      ],
      whenToSeekHelp: "If stress causes physical symptoms (chest pain, persistent headaches, digestive issues), significantly impairs work/relationships, or leads to substance use for coping, consult a healthcare provider or mental health professional.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support for overwhelming stress and crisis"
        },
        {
          name: "Anxiety and Depression Association of America",
          contact: "Visit adaa.org/finding-help",
          description: "Provider directory for stress and anxiety treatment"
        }
      ],
      culturalConsiderations: "Stress responses and appropriate stress management vary across cultures. Collectivist cultures may emphasize social support and family harmony, while individualist cultures may focus on personal coping. Adapt these techniques to align with your cultural values."
    },
    sections: [
      {
        title: "Understanding Your Stress Response System",
        content: "Stress is your body's alarm system, but chronic activation causes physical and mental harm. This section explores the neurobiology of stress—how the amygdala triggers fight-flight-freeze responses, how cortisol affects your body over time, and why your stress response developed as protection but may now be overly sensitive. You'll learn to distinguish between acute stress (helpful, time-limited) and chronic stress (harmful, ongoing). Understanding this system helps you work with your biology rather than against it.",
        duration: "13 minutes",
        videoId: "0fL-pn80s-c",
        practicalExercise: {
          title: "Stress Signature Assessment",
          instructions: "Complete the comprehensive stress signature inventory, documenting how stress uniquely shows up for you across four domains: Physical (tension, fatigue, pain, sleep changes), Cognitive (racing thoughts, difficulty concentrating, memory problems), Emotional (irritability, anxiety, mood swings), and Behavioral (withdrawal, procrastination, appetite changes). Review three recent stress episodes and map your signature response pattern for each. Identify your three earliest warning signs—these are your intervention points. Rate the intensity (1-10) at which each symptom typically appears. This creates your personalized stress detection system.",
          timeRequired: "25 minutes",
          materials: ["Stress Signature Inventory", "Four-Domain Assessment Worksheet", "Stress Episode Analysis Forms", "Early Warning Sign Tracker"],
          skillLevel: "beginner",
          outcomes: ["Clear understanding of personal stress manifestations", "Identification of early intervention points", "Baseline stress profile for tracking progress"]
        }
      },
      {
        title: "Rapid Stress Reduction Techniques",
        content: "When stress spikes, you need immediate tools to calm your nervous system. This section teaches three evidence-based rapid response techniques: Box Breathing (4-4-4-4 pattern shown to reduce stress by 26% in 3 minutes), 5-4-3-2-1 Sensory Grounding (interrupts rumination and anchors you in present), and Progressive Muscle Relaxation (systematically releases tension). Research shows physiological stress markers drop significantly within 5-10 minutes of these practices. These are your emergency tools for high-stress moments.",
        duration: "15 minutes",
        videoId: "ztvojZb_NzU",
        practicalExercise: {
          title: "Rapid Response Technique Training",
          instructions: "Practice each technique under controlled conditions, then test in real-world stress. Session 1: Box Breathing—sit comfortably, breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat for 3 minutes. Session 2: 5-4-3-2-1 Grounding—name 5 things you see, 4 things you touch, 3 things you hear, 2 things you smell, 1 thing you taste. Session 3: Progressive Muscle Relaxation—systematically tense and release 8 muscle groups (fists, arms, shoulders, face, chest, stomach, legs, feet) for 8 seconds each. For each technique, measure stress before (0-10) and after (0-10). Practice in three different environments (home, work, public). Track which works best for different stress levels and contexts.",
          timeRequired: "45 minutes over 3 days",
          materials: ["Box Breathing Guide with Timer", "5-4-3-2-1 Script", "Progressive Muscle Relaxation Audio", "Stress Level Tracking Sheet", "Environment Comparison Chart"],
          skillLevel: "intermediate",
          outcomes: ["Mastery of three rapid stress reduction techniques", "Personal data on technique effectiveness", "Confidence in managing acute stress"]
        }
      },
      {
        title: "Systemic Stress Management & Prevention",
        content: "While rapid techniques provide immediate relief, long-term resilience requires addressing the root causes of stress. This section introduces the Stress Ecosystem Model—mapping your stressors (demands), amplifiers (factors that worsen stress), buffers (protective factors), and recovery practices. You'll learn to identify which stressors are changeable vs. unchangeable, and develop targeted interventions for high-impact stressors. Research shows that addressing 2-3 key stressors has more impact than trying to manage everything at once.",
        duration: "12 minutes",
        videoId: "gnVdXN_pRtw",
        practicalExercise: {
          title: "Stress Ecosystem Mapping & Strategic Intervention",
          instructions: "Create your complete stress ecosystem visual map. Step 1: List all current stressors (work, relationships, health, finances, etc.). Step 2: Identify amplifiers that make stress worse (poor sleep, lack of support, perfectionism, etc.). Step 3: List buffers that protect you (exercise, relationships, hobbies, etc.). Step 4: Plot everything on the ecosystem map showing connections. Step 5: Use the impact/changeability matrix to prioritize—which 3 stressors have highest impact AND are most changeable? Step 6: For each priority stressor, develop specific interventions using the strategic planning worksheet. Step 7: Create implementation timeline with weekly check-ins. This gives you a clear roadmap rather than feeling overwhelmed by everything at once.",
          timeRequired: "40 minutes",
          materials: ["Stress Ecosystem Map Template", "Stressor Inventory Worksheet", "Impact-Changeability Matrix", "Strategic Intervention Planner", "Implementation Timeline", "Weekly Review Prompts"],
          skillLevel: "advanced",
          outcomes: ["Comprehensive understanding of your stress ecosystem", "Prioritized intervention targets", "Strategic action plan for high-impact stressors"]
        }
      },
      {
        title: "Building Stress Resilience & Maintenance",
        content: "True stress management isn't just reducing current stress—it's building capacity to handle future stressors. This section focuses on resilience-building practices: regular stress inoculation (deliberately exposing yourself to manageable challenges), recovery practices (sleep, connection, movement, creativity), and cognitive reframing of stress (viewing stress as information and growth opportunity rather than threat). You'll create a personalized resilience routine that fits your life and values.",
        duration: "8 minutes",
        videoId: "0fL-pn80s-c",
        practicalExercise: {
          title: "30-Day Stress Resilience Building Plan",
          instructions: "Design your personalized resilience plan using the framework: (1) Daily Foundation Practices (10 minutes)—morning stress check-in, one rapid technique practice, evening reflection. (2) Weekly Resilience Builders (30 minutes)—one stress ecosystem review, one buffer-strengthening activity (connect with friend, engage in hobby, physical activity). (3) Monthly Growth Challenges—deliberately face one manageable stressor to build confidence. (4) Quarterly Stress Assessment—retake signature inventory to track progress. Use the planning template to schedule each component, set phone reminders, and identify accountability support. Create 'if-then' plans for setbacks (e.g., 'If I miss 3 days, then I will restart with just 5 minutes daily'). The goal is sustainable practice, not perfection.",
          timeRequired: "30 minutes",
          materials: ["30-Day Resilience Plan Template", "Daily Practice Tracker", "Weekly Review Prompts", "Monthly Challenge Ideas", "Accountability Partner Guide"],
          skillLevel: "intermediate",
          outcomes: ["Comprehensive stress resilience system", "Sustainable daily practices", "Long-term capacity building plan"]
        }
      }
    ]
  },
  {
    id: "better-sleep",
    title: "Better Sleep Habits",
    description: "Evidence-based techniques for improving sleep quality based on Cognitive Behavioral Therapy for Insomnia (CBT-I).",
    icon: Moon,
    color: "bg-[#5c7de3]/10",
    coverImage: betterSleepImg,
    duration: "50 minutes",
    learningOutcomes: [
      "Understand your unique sleep patterns and circadian rhythm",
      "Implement CBT-I protocols: sleep restriction and stimulus control",
      "Address sleep-interfering thoughts through cognitive restructuring",
      "Create optimal sleep environment and sustainable sleep hygiene routine"
    ],
    clinicalContext: {
      framework: "Cognitive Behavioral Therapy for Insomnia (CBT-I)",
      evidenceBase: "CBT-I is the first-line treatment for chronic insomnia per APA clinical practice guidelines (Grade A recommendation). Shows 70-80% improvement rate, effects lasting 1+ years post-treatment (Edinger & Means, 2005).",
      contraindications: [
        "Untreated sleep apnea or other sleep disorders (requires medical evaluation first)",
        "Bipolar disorder (sleep restriction may trigger mania)",
        "Seizure disorders (sleep deprivation may lower seizure threshold)",
        "Active substance use affecting sleep architecture"
      ],
      whenToSeekHelp: "If insomnia persists for more than 3 months despite consistent CBT-I practice, or if you experience symptoms of sleep apnea (loud snoring, gasping, daytime fatigue), consult a sleep specialist or physician for evaluation.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support if sleep deprivation affects mental health"
        },
        {
          name: "American Academy of Sleep Medicine",
          contact: "Visit sleepeducation.org/find-a-facility",
          description: "Find accredited sleep centers for evaluation"
        }
      ],
      culturalConsiderations: "Sleep practices vary across cultures (e.g., co-sleeping norms, siesta traditions, prayer schedules affecting sleep timing). Adapt CBT-I principles to honor cultural sleep practices while addressing insomnia."
    },
    sections: [
      {
        title: "Sleep Science & Pattern Analysis",
        content: "Quality sleep involves cycling through four stages (N1, N2, N3, REM) approximately every 90 minutes. Disruptions to this architecture cause daytime impairment. This section introduces sleep science fundamentals: circadian rhythms (your biological clock), sleep drive (homeostatic pressure), and the two-process model of sleep regulation. You'll learn that insomnia often results from mismatched sleep drive and circadian timing, not just 'trying harder' to sleep. Understanding your unique sleep patterns is the foundation for targeted intervention.",
        duration: "15 minutes",
        videoId: "acEH2JnBDpI",
        practicalExercise: {
          title: "Two-Week Sleep Pattern Assessment",
          instructions: "Complete a detailed 14-day sleep log tracking: bedtime, time to fall asleep (sleep latency), number/duration of night wakings, wake time, time out of bed, total sleep time, perceived sleep quality (1-10), and daily factors affecting sleep (caffeine, alcohol, exercise, stress, screen time, naps). Use the analysis worksheet to calculate: average sleep efficiency (time asleep / time in bed × 100), sleep debt, pattern consistency, and identify key disruptors. Plot your data on the visualization chart to reveal patterns you might not consciously notice. This data becomes your treatment baseline.",
          timeRequired: "15 minutes nightly for 14 nights + 30 min analysis",
          materials: ["14-Day Sleep Log", "Pattern Analysis Worksheet", "Sleep Efficiency Calculator", "Visual Pattern Chart", "Disruptor Identification Guide"],
          skillLevel: "beginner",
          outcomes: ["Comprehensive understanding of current sleep patterns", "Calculation of sleep efficiency baseline", "Identification of primary sleep disruptors"]
        }
      },
      {
        title: "CBT-I Core Protocols: Sleep Restriction & Stimulus Control",
        content: "The two pillars of CBT-I are sleep restriction and stimulus control—counterintuitive but highly effective. Sleep restriction temporarily limits time in bed to match actual sleep time, building sleep pressure and consolidating sleep. Stimulus control retrains your brain to associate bed with sleep, not wakefulness. Research shows these protocols improve sleep efficiency from 60-70% to 85-90% within 4-6 weeks. This section explains the rationale and implementation of both protocols with safety guidelines.",
        duration: "15 minutes",
        videoId: "A5dE25ANU0k",
        practicalExercise: {
          title: "Sleep Restriction & Stimulus Control Implementation",
          instructions: "Implement both protocols simultaneously over 3 weeks. SLEEP RESTRICTION: Based on your sleep log, calculate average total sleep time (e.g., 6 hours). Set your sleep window to match (plus 30 min; e.g., 12:00am-6:30am). Do NOT go to bed earlier or stay in bed later, even on weekends. When sleep efficiency reaches 85-90% for 5 consecutive nights, extend sleep window by 15 minutes. Continue until reaching optimal sleep time. STIMULUS CONTROL: (1) Use bed only for sleep and intimacy; (2) Go to bed only when sleepy; (3) If awake more than 15 minutes, leave bed and do quiet activity until sleepy; (4) Wake at same time daily regardless of sleep amount; (5) No daytime napping. Track compliance and sleep efficiency weekly. SAFETY: Do not restrict below 5.5 hours; avoid driving if drowsy.",
          timeRequired: "Ongoing protocol, 10 min daily tracking",
          materials: ["Sleep Restriction Calculator", "Stimulus Control Rules Card", "Weekly Sleep Efficiency Tracker", "Sleep Window Adjustment Guide", "Safety Monitoring Checklist"],
          skillLevel: "intermediate",
          outcomes: ["Improved sleep consolidation", "Strengthened bed-sleep association", "Increased sleep efficiency (target 85-90%)"]
        }
      },
      {
        title: "Cognitive Strategies for Sleep Anxiety",
        content: "Racing thoughts and worry about sleep often perpetuate insomnia—you can't force sleep, which creates paradoxical anxiety. This section addresses sleep-interfering cognitions using cognitive restructuring. Common unhelpful thoughts include: 'I must get 8 hours or I'll be ruined,' 'I can't function without perfect sleep,' 'I'll never sleep well again.' You'll learn to identify these thoughts, examine evidence for/against them, and develop more balanced, helpful perspectives. Additionally, you'll practice worry time scheduling and thought defusion techniques.",
        duration: "13 minutes",
        videoId: "t0kACis_dJE",
        practicalExercise: {
          title: "Sleep Thought Restructuring & Worry Management",
          instructions: "Step 1: For 5 nights, record sleep-interfering thoughts as they arise (use thought capture worksheet kept by bed). Step 2: Analyze patterns—identify your top 3 most frequent unhelpful sleep thoughts. Step 3: For each thought, complete cognitive restructuring: What's the thought? What evidence supports it? What evidence contradicts it? What's a more balanced thought? What happens if you believe the balanced thought? Step 4: Create personalized counter-thought cards to read when unhelpful thoughts arise. Step 5: Implement 'worry time'—schedule 15 minutes before your sleep window to write worries in a journal, then mentally 'close the book.' If worries arise at bedtime, remind yourself you have a designated worry time tomorrow. Practice this protocol for 2 weeks and track thought frequency and intensity.",
          timeRequired: "15 min nightly for 2 weeks",
          materials: ["Bedside Thought Capture Journal", "Cognitive Restructuring Worksheet", "Evidence Examination Guide", "Counter-Thought Card Template", "Worry Time Protocol", "Progress Tracking Chart"],
          skillLevel: "advanced",
          outcomes: ["Reduced sleep-related anxiety", "Ability to recognize and reframe unhelpful sleep thoughts", "Effective worry containment strategies"]
        }
      },
      {
        title: "Sleep Environment Optimization & Maintenance",
        content: "Your sleep environment significantly impacts sleep quality. This section addresses the five environmental factors: light (circadian disruption), sound (arousal), temperature (thermal comfort), comfort (mattress/pillows), and air quality. You'll also learn sleep hygiene practices that complement CBT-I: managing caffeine/alcohol, timing of exercise, screen use before bed, and creating a wind-down routine. The goal is creating conditions that support, not force, sleep.",
        duration: "7 minutes",
        videoId: "acEH2JnBDpI",
        practicalExercise: {
          title: "Sleep Environment Audit & Optimization Plan",
          instructions: "Conduct systematic bedroom assessment using the audit checklist: (Light) Do you have blackout curtains or eye mask? Is there light pollution from devices? (Sound) Is noise disrupting sleep? Do you need white noise or earplugs? (Temperature) Is room 60-67°F / 15-19°C (optimal for sleep)? (Comfort) Is mattress supportive? Are pillows appropriate height? (Air Quality) Is room well-ventilated? Any allergens present? Rate each factor 1-10 for optimization. Identify your 3 highest-impact, most changeable factors. Create specific implementation plan with timeline and budget. Additionally, design a 30-minute wind-down routine incorporating: dimming lights, screen curfew (1 hour before bed), relaxing activity (reading, stretching, bath), and brief relaxation practice (breathing, progressive muscle relaxation). Test wind-down routine for 7 nights and refine based on what helps you feel sleepy.",
          timeRequired: "60 min for audit and planning, 30 min nightly routine",
          materials: ["Sleep Environment Audit Checklist", "Optimization Priority Matrix", "Implementation Planning Template", "Wind-Down Routine Designer", "7-Day Routine Testing Log"],
          skillLevel: "beginner",
          outcomes: ["Optimized sleep environment addressing key factors", "Personalized wind-down routine promoting sleepiness", "Sustainable sleep hygiene habits"]
        }
      }
    ]
  },
  {
    id: "cognitive-reframing",
    title: "Cognitive Reframing",
    description: "Change your perspective on challenging situations through evidence-based cognitive techniques from CBT.",
    icon: Zap,
    color: "bg-[#e3b85c]/10",
    coverImage: cognitiveReframingImg,
    duration: "50 minutes",
    learningOutcomes: [
      "Identify cognitive distortions in your thinking patterns",
      "Apply structured reframing techniques to challenging situations",
      "Develop habits of flexible and balanced thinking",
      "Create personalized cognitive reframing scripts for recurring challenges"
    ],
    clinicalContext: {
      framework: "Cognitive Behavioral Therapy (CBT) Cognitive Restructuring",
      evidenceBase: "Cognitive restructuring is a core CBT technique with demonstrated efficacy for depression, anxiety, and stress (APA Grade A). Meta-analyses show 55-65% symptom reduction when cognitive techniques are applied consistently (Hofmann et al., 2012).",
      contraindications: [
        "Active psychosis where thought restructuring may be ineffective or distressing",
        "Severe cognitive impairment affecting ability to engage with abstract concepts",
        "Situations where thoughts reflect genuine threats (e.g., actual abuse situations requiring safety planning, not reframing)"
      ],
      whenToSeekHelp: "If negative thought patterns persist despite consistent practice, or if thoughts include suicidal ideation, seek evaluation from a licensed therapist. Cognitive restructuring works best as part of comprehensive treatment for moderate-severe symptoms.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support for overwhelming thoughts and crisis"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "Text-based support for mental health crisis"
        }
      ],
      culturalConsiderations: "Cognitive models emphasize individual thought patterns, which may not align with collectivist cultural values emphasizing group harmony. Adapt these techniques to honor cultural contexts while building cognitive flexibility."
    },
    sections: [
      {
        title: "Understanding Cognitive Distortions",
        content: "Cognitive distortions are systematic thinking errors that maintain emotional distress. Dr. Aaron Beck identified these as core to depression and anxiety. This section introduces the 10 most common distortions: all-or-nothing thinking, overgeneralization, mental filtering, discounting positives, jumping to conclusions (mind reading, fortune telling), magnification/minimization, emotional reasoning, 'should' statements, labeling, and personalization. You'll learn that these patterns are automatic, learned, and changeable—they're not facts about reality but habitual ways of processing information.",
        duration: "15 minutes",
        videoId: "RORPx-Y6ByY",
        practicalExercise: {
          title: "Cognitive Distortion Identification Training",
          instructions: "Complete the distortion recognition training in three phases. Phase 1: Study each of the 10 distortions using the reference guide with clear definitions and examples. Phase 2: Review 20 sample thoughts and identify which distortion(s) each represents—answers provided for self-checking. Phase 3: Track your own thoughts for 5 days using the thought log. Each time you notice emotional distress (anger, sadness, anxiety, shame), write down the situation, your automatic thought, and your emotion. Then analyze: which distortion(s) are present? Use the classification guide. Create a frequency chart showing your most common distortions—these are your personal patterns to target. Most people have 2-3 dominant distortions.",
          timeRequired: "45 minutes for training + 10 min daily for 5 days",
          materials: ["10 Cognitive Distortions Reference Guide", "20-Thought Practice Set with Answer Key", "5-Day Thought Log", "Distortion Classification Guide", "Personal Pattern Frequency Chart"],
          skillLevel: "beginner",
          outcomes: ["Ability to recognize cognitive distortions in real-time", "Identification of personal distortion patterns", "Understanding that thoughts are interpretations, not facts"]
        }
      },
      {
        title: "Structured Cognitive Restructuring Techniques",
        content: "Once you recognize distortions, you need systematic methods to challenge and reframe them. This section introduces three evidence-based restructuring techniques: (1) Socratic Questioning—asking yourself evidence-based questions to examine thoughts objectively; (2) The ABCD Model—tracking Activating event, Beliefs, Consequences, and Disputation; (3) The Downward Arrow—identifying core beliefs beneath surface thoughts. Research shows that consistent practice of these techniques creates lasting neural pathway changes, making balanced thinking more automatic over time.",
        duration: "15 minutes",
        videoId: "ZU3MPwU8Gv4",
        practicalExercise: {
          title: "ABCD Cognitive Restructuring Practice",
          instructions: "Apply the ABCD method to 7 distressing situations over 2 weeks (aim for 3-4 per week). For each situation: (A) Activating Event—what triggered your distress? Be specific and objective. (B) Beliefs—what thoughts went through your mind? What did it mean? (C) Consequences—what emotions (rate 0-100) and behaviors resulted? (D) Disputation—challenge your beliefs using evidence: What facts support this thought? What facts contradict it? What would I tell a friend in this situation? What's a more balanced way to view this? Generate at least 3 alternative perspectives. (E) Effect—after disputation, re-rate your emotional intensity (0-100). Track your before/after emotion ratings to see the impact of reframing. Use the comparison worksheet to identify which disputation questions work best for you.",
          timeRequired: "20 min per situation, 7 situations over 2 weeks",
          materials: ["ABCD Worksheet Template (7 copies)", "Socratic Questioning Guide", "Alternative Perspective Generator", "Before/After Emotion Tracker", "Technique Effectiveness Comparison Chart"],
          skillLevel: "intermediate",
          outcomes: ["Systematic method for challenging distorted thoughts", "Generation of multiple alternative perspectives", "Measurable reduction in emotional distress from situations"]
        }
      },
      {
        title: "Building Cognitive Flexibility",
        content: "True cognitive change isn't just challenging negative thoughts—it's developing flexibility to consider multiple perspectives simultaneously. This section builds on restructuring by training perspective-taking skills. You'll practice adopting different viewpoints: detached observer (objective facts), compassionate friend (kind perspective), future self (long-term view), worst/best/most likely outcome (realistic probability), and growth-oriented (what can I learn?). Research shows cognitive flexibility correlates strongly with resilience and well-being.",
        duration: "13 minutes",
        videoId: "hQkXJE0fAh0",
        practicalExercise: {
          title: "Multi-Perspective Analysis Practice",
          instructions: "Select 4 current challenging situations (conflicts, setbacks, worries, etc.). For each situation, systematically adopt 5 different perspectives and document insights: (1) Detached Observer—if you were watching this as a neutral party, what would you notice? What are just the facts? (2) Compassionate Friend—what would your wisest, kindest friend say about this? How would they support you? (3) Future Self—looking back one year from now, how will you see this situation? What will matter most? (4) Probability Analysis—worst case scenario? Best case? Most likely outcome based on evidence? (5) Growth Perspective—what can you learn? How might this challenge help you grow? Use the integration worksheet to synthesize all perspectives into a comprehensive, balanced understanding. Notice how your emotional response shifts as you explore multiple viewpoints.",
          timeRequired: "30 min per situation, 4 situations",
          materials: ["Multi-Perspective Worksheet (4 copies)", "5 Viewpoint Guide with Prompts", "Integration Template", "Emotional Shift Tracker", "Pattern Recognition Journal"],
          skillLevel: "advanced",
          outcomes: ["Ability to adopt multiple perspectives rapidly", "Reduced black-and-white thinking", "Enhanced resilience through cognitive flexibility"]
        }
      },
      {
        title: "Integration & Maintenance of Cognitive Skills",
        content: "Cognitive restructuring becomes most powerful when it's automatic—when you naturally catch and reframe distortions without formal worksheets. This section focuses on building lasting cognitive habits through: (1) Daily thought review practice (5 minutes reflecting on day's thoughts), (2) Preemptive reframing for predictable challenges, (3) Creating personal reframing scripts for recurring situations, (4) Tracking progress to maintain motivation. The goal is internalizing these skills as your default thinking style.",
        duration: "7 minutes",
        videoId: "RORPx-Y6ByY",
        practicalExercise: {
          title: "30-Day Cognitive Habit Building Plan",
          instructions: "Create your cognitive maintenance system: (1) Daily Reflection Practice—each evening, identify one distorted thought from the day and reframe it using ABCD. Takes 5 minutes; builds consistency. (2) Predictable Challenges—identify your 3 most common recurring stressful situations (e.g., work presentations, family conflicts, rejection). For each, pre-write a balanced reframing script using your preferred restructuring method. Laminate these scripts to review before entering challenging situations. (3) Weekly Pattern Review—every Sunday, review your week's thought logs. What patterns emerged? Which reframing techniques were most effective? What do you want to practice this week? (4) Monthly Progress Assessment—retake the cognitive distortion frequency assessment. Track reduction in distortion frequency and intensity over time. Celebrate progress—research shows self-recognition of growth reinforces new neural pathways.",
          timeRequired: "5 min daily + 15 min weekly + 20 min monthly",
          materials: ["Daily Reflection Template", "Predictable Challenge Script Builder", "Weekly Review Prompts", "Monthly Progress Assessment", "Success Tracking Chart", "Laminating Sheets for Scripts"],
          skillLevel: "intermediate",
          outcomes: ["Automated cognitive flexibility habits", "Prepared responses for recurring challenges", "Sustained cognitive restructuring practice", "Measurable progress tracking"]
        }
      }
    ]
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description: "Evidence-based gratitude interventions to enhance wellbeing based on Positive Psychology research.",
    icon: Sparkles,
    color: "bg-[#5ce39b]/10",
    coverImage: gratitudePracticeImg,
    duration: "48 minutes",
    learningOutcomes: [
      "Understand the neuroscience of gratitude and its effects on wellbeing",
      "Implement the Three Good Things protocol with fidelity",
      "Develop multiple gratitude practices suited to your preferences",
      "Create sustainable habits that maintain gratitude over time"
    ],
    clinicalContext: {
      framework: "Positive Psychology Gratitude Interventions (Emmons & McCullough)",
      evidenceBase: "Gratitude interventions increase wellbeing by 25% and reduce depression symptoms by 35% (Emmons & McCullough, 2003). APA recognizes gratitude practice as evidence-based for depression prevention.",
      contraindications: [
        "Active trauma processing where forced positivity may invalidate pain",
        "Severe depression with anhedonia (inability to feel positive emotions)",
        "Situations where gratitude may be culturally inappropriate or invalidating"
      ],
      whenToSeekHelp: "If you consistently cannot identify things to be grateful for, or if gratitude practice increases feelings of guilt or inadequacy, consult a mental health professional. These may indicate underlying depression requiring treatment.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 mental health support"
        }
      ],
      culturalConsiderations: "Gratitude expression varies across cultures. Some cultures emphasize collective gratitude, others individual appreciation. Adapt these practices to honor your cultural context."
    },
    sections: [
      {
        title: "The Science of Gratitude",
        content: "Gratitude is more than feeling thankful—it's a trainable mental state that rewires your brain. Neuroscience research shows regular gratitude practice increases gray matter density in areas associated with emotional regulation and social cognition. It activates the reward pathway, releasing dopamine and serotonin. Dr. Robert Emmons' research demonstrates that gratitude interventions improve sleep quality, reduce inflammation markers, strengthen immune function, and increase life satisfaction. This section explores the mechanisms: how gratitude shifts attention from deficits to abundance, strengthens social bonds through appreciation, and builds psychological resilience.",
        duration: "12 minutes",
        videoId: "a1b2c3d4e5",
        practicalExercise: {
          title: "Personal Gratitude Inventory & Baseline",
          instructions: "Complete the comprehensive gratitude assessment to establish your baseline. Part 1: Rate your current gratitude level using the GQ-6 (Gratitude Questionnaire-6), a validated measure. Part 2: Reflect on your gratitude history—what role has gratitude played in your life? When do you naturally feel grateful? What blocks gratitude for you? Part 3: Identify your gratitude goals—do you want to feel more positive emotions? Improve relationships? Increase resilience? Understanding your starting point and intentions makes practice more meaningful and allows you to track genuine progress over time.",
          timeRequired: "25 minutes",
          materials: ["GQ-6 Assessment", "Gratitude History Reflection Guide", "Personal Goals Worksheet", "Baseline Documentation Form"],
          skillLevel: "beginner",
          outcomes: ["Quantified gratitude baseline using validated measure", "Understanding of personal gratitude patterns", "Clear intention for gratitude practice"]
        }
      },
      {
        title: "Three Good Things Protocol",
        content: "The Three Good Things intervention is the most researched gratitude practice. Developed by Dr. Martin Seligman, it involves writing three positive events from your day and why they happened, nightly for 2+ weeks. Studies show this simple practice increases happiness and decreases depression for up to 6 months after the intervention. The 'why' component is crucial—it trains your brain to notice causal connections between your actions and positive outcomes, building sense of agency. This section teaches proper implementation of the protocol with variations for different preferences.",
        duration: "12 minutes",
        videoId: "f6g7h8i9j0",
        practicalExercise: {
          title: "14-Day Three Good Things Practice",
          instructions: "Commit to 14 consecutive days of the protocol. Each evening before bed: (1) Write three things that went well today—they can be small (enjoyed morning coffee) or large (received job offer). Be specific. (2) For each, answer: Why did this good thing happen? What actions did I take? What strengths did I use? What circumstances allowed this? This attribution analysis is what creates lasting brain change. Use the provided journal with prompts. On Days 7 and 14, complete the reflection questions: What patterns do you notice? How has your daily attention shifted? Rate your mood trends. Research shows benefits emerge around Day 10-12, so persist even if it feels mechanical initially.",
          timeRequired: "10 minutes nightly for 14 nights",
          materials: ["14-Day Three Good Things Journal with Prompts", "Attribution Analysis Guide", "Mid-Point Reflection Worksheet", "Completion Assessment"],
          skillLevel: "intermediate",
          outcomes: ["Established Three Good Things habit", "Increased attention to positive events", "Understanding of personal role in positive outcomes"]
        }
      },
      {
        title: "Gratitude Meditation & Savoring",
        content: "Beyond journaling, embodied gratitude practices deepen the emotional experience. Gratitude meditation involves systematically bringing to mind people, experiences, and aspects of life you appreciate while cultivating warm feelings. Savoring practices extend positive experiences by fully engaging your senses and attention. Dr. Fred Bryant's research shows savoring amplifies positive emotion by 40%. This section teaches loving-kindness meditation adapted for gratitude, sensory savoring techniques, and gratitude walks—practices that make gratitude visceral rather than intellectual.",
        duration: "12 minutes",
        videoId: "k1l2m3n4o5",
        practicalExercise: {
          title: "Gratitude Meditation & Savoring Practice Week",
          instructions: "Practice gratitude embodiment techniques for 7 days, alternating methods: Days 1, 3, 5—Gratitude Meditation (10 min): Use the guided audio. Bring to mind someone who helped you, then someone you love, then a positive experience, then your body's functioning. For each, silently repeat 'Thank you' while cultivating warm feelings. Notice where gratitude lives in your body. Days 2, 4, 6—Sensory Savoring (15 min): Choose one pleasant daily experience (meal, shower, sunset). Engage all five senses deliberately. Describe aloud or write what you notice. Share the experience with someone. Day 7—Gratitude Walk (20 min): Walk slowly outdoors, naming things you're grateful for about nature, your senses, your ability to move. Complete the comparison worksheet: which practices resonated most? Why?",
          timeRequired: "10-20 min daily for 7 days",
          materials: ["Guided Gratitude Meditation Audio", "Sensory Savoring Script", "Gratitude Walk Instructions", "Daily Practice Log", "Comparison Reflection Worksheet"],
          skillLevel: "advanced",
          outcomes: ["Embodied experience of gratitude beyond intellectual exercise", "Multiple gratitude practice tools for different contexts", "Deeper emotional connection to appreciation"]
        }
      },
      {
        title: "Sustainable Gratitude Habits & Maintenance",
        content: "The challenge with gratitude practice is maintaining it long-term without it becoming rote. Research shows benefits diminish when practices become mechanical. This section addresses sustainability through: variety (rotating different gratitude methods), optimal dosing (research suggests 2-3x weekly is often better than daily for long-term adherence), social expression (sharing gratitude with others multiplies benefits), and integration into existing routines. You'll create a personalized gratitude system that fits your life and personality.",
        duration: "12 minutes",
        videoId: "a1b2c3d4e5",
        practicalExercise: {
          title: "Personalized Gratitude System Design",
          instructions: "Design your long-term gratitude practice using the system builder: (1) Select your core practice(s)—based on what resonated in previous exercises, choose 1-2 primary methods (Three Good Things, meditation, savoring, etc.). (2) Determine optimal frequency—research suggests 2-3x weekly sustains benefits better than forced daily practice. Schedule specific days/times. (3) Add variety—plan to rotate methods monthly to prevent habituation. (4) Build in social expression—identify 2 people to text/call weekly with specific appreciation. (5) Set up reminders—phone alerts, visual cues, habit stacking (e.g., gratitude with morning coffee). (6) Plan quarterly reassessment—retake GQ-6 every 3 months to track progress. (7) Create if-then plans for lapses (e.g., 'If I miss a week, then I will restart with just one daily gratitude before bed'). The goal is sustainable practice, not perfection.",
          timeRequired: "35 minutes",
          materials: ["Gratitude System Builder Template", "Practice Preference Assessment", "Social Expression Planning Worksheet", "Habit Integration Guide", "Quarterly Reassessment Protocol"],
          skillLevel: "intermediate",
          outcomes: ["Personalized, sustainable gratitude system", "Prevention of practice burnout through variety", "Long-term maintenance plan with accountability"]
        }
      }
    ]
  },
  {
    id: "self-compassion",
    title: "Self-Compassion Skills",
    description: "Develop self-compassion using Dr. Kristin Neff's research-based model to counteract self-criticism.",
    icon: Laugh,
    color: "bg-[#e35c9b]/10",
    coverImage: selfCompassionImg,
    duration: "50 minutes",
    learningOutcomes: [
      "Understand the three components of self-compassion: self-kindness, common humanity, mindfulness",
      "Recognize patterns of self-criticism and their impact on mental health",
      "Apply self-compassion techniques in challenging situations",
      "Build resilience through self-directed kindness and balanced perspective"
    ],
    clinicalContext: {
      framework: "Dr. Kristin Neff's Self-Compassion Model",
      evidenceBase: "Self-compassion interventions reduce depression by 32% and anxiety by 27% while increasing wellbeing and resilience (Neff & Germer, 2013). APA recognizes self-compassion as protective factor for mental health.",
      contraindications: [
        "Active self-harm where compassion work may initially increase distress (requires concurrent DBT)",
        "Severe trauma where self-directed attention triggers flashbacks",
        "Cultural contexts where self-focus contradicts core values (adapt to emphasize universal humanity)"
      ],
      whenToSeekHelp: "If self-criticism involves persistent suicidal thoughts, or if self-compassion practices trigger intense shame or self-loathing that doesn't improve with practice, seek support from a trauma-informed therapist.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 crisis support"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "Text-based mental health support"
        }
      ],
      culturalConsiderations: "Self-compassion may be misinterpreted as selfishness in collectivist cultures. Frame it as building inner resources to better support others and community."
    },
    sections: [
      {
        title: "Understanding Self-Compassion vs. Self-Criticism",
        content: "Self-compassion is treating yourself with the same kindness you'd offer a good friend. Dr. Kristin Neff's research identifies three core components: (1) Self-Kindness vs. Self-Judgment—being warm rather than harshly critical toward yourself; (2) Common Humanity vs. Isolation—recognizing that suffering and inadequacy are part of shared human experience rather than feeling isolated in your struggles; (3) Mindfulness vs. Over-identification—holding painful thoughts and feelings in balanced awareness rather than getting swept away by them. Most people have an inner critic that claims to motivate improvement but actually increases anxiety and decreases resilience. This section helps you understand your self-criticism patterns and why self-compassion is more effective.",
        duration: "12 minutes",
        videoId: "p6q7r8s9t0",
        practicalExercise: {
          title: "Self-Criticism Pattern Assessment",
          instructions: "Map your self-critical patterns using the comprehensive assessment. Part 1: Complete the Self-Compassion Scale (SCS-SF) to establish your baseline across all three components. Part 2: Document 5 recent situations where you were self-critical. For each, note: What triggered self-criticism? What did your inner critic say? How did it make you feel? What did you do next? Part 3: Analyze patterns—what themes emerge? When is your critic loudest? What specific words/phrases does it use? Part 4: Compassion-Criticism Comparison—recall a time when a friend struggled. What did you say to them? How is this different from what you say to yourself? This reveals the double standard most people apply.",
          timeRequired: "30 minutes",
          materials: ["Self-Compassion Scale (SCS-SF)", "Self-Criticism Incident Log", "Pattern Analysis Worksheet", "Compassion-Criticism Comparison Guide"],
          skillLevel: "beginner",
          outcomes: ["Quantified self-compassion baseline", "Clear identification of self-criticism patterns", "Recognition of compassion double standard"]
        }
      },
      {
        title: "The Self-Compassion Break",
        content: "The Self-Compassion Break is a powerful micro-practice for difficult moments. It systematically activates all three components of self-compassion in under 5 minutes. Research shows it reduces emotional distress by 43% immediately after practice. The protocol: (1) Mindfulness—'This is a moment of suffering' (acknowledge pain without exaggeration); (2) Common Humanity—'Suffering is part of life. I'm not alone in this' (connect to shared human experience); (3) Self-Kindness—'May I be kind to myself' or place your hand on your heart and offer yourself compassion. This section teaches the core practice plus variations for specific situations.",
        duration: "13 minutes",
        videoId: "u1v2w3x4y5",
        practicalExercise: {
          title: "Self-Compassion Break Practice Integration",
          instructions: "Practice the Self-Compassion Break in three contexts over 2 weeks. Week 1: Practice 2x daily during neutral moments to build muscle memory. Use the guided audio. Notice what it feels like to direct kindness toward yourself—awkward is normal initially. Week 2: Practice during mild-moderate stress (disagreement, mistake, disappointment). Follow the three-step protocol: (1) Place hand on heart, acknowledge 'This is difficult right now'; (2) Recognize 'Other people experience this too. I'm not alone'; (3) Offer kindness: 'May I be patient with myself' or 'May I give myself what I need.' Rate emotional intensity before (0-10) and after (0-10) each practice. Document what you notice: Does intensity shift? How does your body respond? Which phrases resonate most?",
          timeRequired: "5 min 2x daily Week 1, 5 min as-needed Week 2",
          materials: ["Self-Compassion Break Guided Audio", "Three-Step Protocol Card", "Practice Log with Before/After Ratings", "Personal Phrase Development Worksheet"],
          skillLevel: "intermediate",
          outcomes: ["Established self-compassion break habit", "Measurable reduction in distress intensity", "Personalized compassionate phrases"]
        }
      },
      {
        title: "Compassionate Letter Writing & Self-Talk",
        content: "Writing to yourself from a compassionate perspective creates psychological distance and activates self-kindness. This exercise involves writing a letter to yourself about a struggle or perceived inadequacy, but from the perspective of a wise, compassionate friend who loves you unconditionally. Research shows this practice reduces self-criticism and increases self-compassion for weeks after a single session. This section also addresses transforming your ongoing self-talk from critical to compassionate—noticing self-critical thoughts and consciously reframing them with kindness.",
        duration: "15 minutes",
        videoId: "z1a2b3c4d5",
        practicalExercise: {
          title: "Compassionate Self-Letter & Inner Dialogue Transformation",
          instructions: "Part 1: Compassionate Letter (45 min)—Identify something you judge yourself harshly about (appearance, mistake, failure, personality trait). Write a letter to yourself as if from an unconditionally loving friend who sees your full humanity. Address: What would they notice about your struggle? What circumstances contributed? What would they say about your worth despite this? What kind words would they offer? What do you truly need to hear? Write for at least 20 minutes without editing. Read it aloud to yourself. Notice what emotions arise. Part 2: Daily Self-Talk Transformation (ongoing)—For 10 days, catch self-critical thoughts using the thought log. Each time, ask: 'What would I say to a friend?' Then deliberately say that to yourself. Track frequency of self-criticism over the 10 days—most people notice 40-60% reduction by Day 10.",
          timeRequired: "45 min letter + 5 min daily for 10 days",
          materials: ["Compassionate Letter Writing Guide with Prompts", "Letter Template", "Daily Self-Talk Log", "Friend Perspective Prompts", "Progress Tracking Chart"],
          skillLevel: "advanced",
          outcomes: ["Concrete compassionate self-messaging", "Transformation of automatic self-talk patterns", "Measurable reduction in self-criticism frequency"]
        }
      },
      {
        title: "Fierce Self-Compassion & Boundaries",
        content: "Self-compassion isn't just soothing—it also includes 'fierce' compassion: protecting yourself, providing what you need, and motivating change. Dr. Neff describes three forms of fierce self-compassion: (1) Protecting—saying no, setting boundaries, leaving harmful situations; (2) Providing—giving yourself what you need even if others don't approve; (3) Motivating—encouraging growth from kindness rather than criticism. This section integrates self-compassion with boundary-setting and authentic self-advocacy.",
        duration: "10 minutes",
        videoId: "p6q7r8s9t0",
        practicalExercise: {
          title: "Fierce Self-Compassion Action Plan",
          instructions: "Identify areas where you need fierce self-compassion using the assessment: Where do you over-accommodate? Where do you deny your own needs? Where does your inner critic drive you vs. support you? Choose one area for practice. Create an action plan: (1) Protecting—What boundary do you need to set? Script specific language ('I'm not available for that' or 'I need to prioritize my wellbeing'). (2) Providing—What do you need but haven't been giving yourself? (rest, creative time, support, etc.) Schedule it specifically. (3) Motivating—Choose one behavior change goal. Instead of criticizing yourself into change, write a compassionate motivation statement ('I care about my health so I want to move my body' vs. 'I'm lazy and need to exercise'). Practice your chosen fierce compassion action for 2 weeks, documenting barriers and successes.",
          timeRequired: "40 minutes planning + ongoing practice",
          materials: ["Fierce Self-Compassion Assessment", "Boundary Scripting Worksheet", "Needs Identification Guide", "Compassionate Motivation Builder", "2-Week Action Log"],
          skillLevel: "intermediate",
          outcomes: ["Active application of self-compassion through boundaries and self-advocacy", "Compassionate motivation system vs. self-criticism", "Practical skills in protecting and providing for yourself"]
        }
      }
    ]
  },
  {
    id: "social-connection",
    title: "Building Social Connection",
    description: "Evidence-based strategies for meaningful social connections based on Interpersonal Therapy principles.",
    icon: UserPlus,
    color: "bg-[#e39b5c]/10",
    coverImage: socialConnectionImg,
    duration: "48 minutes",
    learningOutcomes: [
      "Understand the critical role of social connection in mental and physical health",
      "Assess the quality and diversity of your current social network",
      "Develop skills for deepening existing relationships",
      "Build capacity for forming new meaningful connections"
    ],
    clinicalContext: {
      framework: "Interpersonal Therapy (IPT) and Social Connection Research",
      evidenceBase: "Strong social connections reduce mortality risk by 50%, equivalent to quitting smoking. Loneliness increases depression risk by 40% (Holt-Lunstad et al., 2015). IPT is APA Grade A treatment for depression.",
      contraindications: [
        "Active paranoia or delusions affecting trust in others",
        "Social anxiety so severe that graduated exposure is needed first",
        "Recent interpersonal trauma requiring trauma-specific treatment before connection work"
      ],
      whenToSeekHelp: "If social isolation persists despite consistent effort, or if social anxiety prevents you from implementing these strategies, consider therapy (especially IPT or CBT for social anxiety) to address underlying barriers.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support including connection to local resources"
        },
        {
          name: "SAMHSA National Helpline",
          contact: "1-800-662-4357",
          description: "Mental health and community support referrals"
        }
      ],
      culturalConsiderations: "Social connection norms vary significantly. Collectivist cultures may emphasize family/community ties; individualist cultures may focus on chosen friendships. Adapt strategies to honor your cultural context."
    },
    sections: [
      {
        title: "Social Connection Science & Assessment",
        content: "Social connection is as essential to health as diet and exercise. Research shows that quality matters more than quantity—having 3 close relationships protects mental health more than having 30 acquaintances. This section introduces relationship types: (1) Intimate/confidants (deep trust, share vulnerabilities), (2) Close/supportive (regular contact, mutual care), (3) Social/activity-based (shared interests), (4) Acquaintances (casual). A healthy network includes diversity across types. You'll learn about the loneliness epidemic, how technology affects connection, and why many people feel isolated despite being 'connected' online.",
        duration: "13 minutes",
        videoId: "b1c2d3e4f5",
        practicalExercise: {
          title: "Social Network Mapping & Quality Assessment",
          instructions: "Create your complete social network map. Part 1: Draw concentric circles representing relationship closeness. Center circle: intimate relationships (share anything, see regularly, trust completely). Second circle: close friends (meaningful connection, see monthly). Third circle: friendly contacts (enjoy but surface-level). Fourth circle: acquaintances. Place people in appropriate circles. Part 2: Assess quality using the relationship inventory—for each person in inner two circles, rate: reciprocity (mutual support), trust, frequency of contact, depth of sharing, conflict resolution. Identify: Do you have at least 1-2 intimate connections? Are relationships reciprocal? Which need deepening? Which drain you? Part 3: Loneliness assessment using UCLA Loneliness Scale. This creates your connection baseline.",
          timeRequired: "35 minutes",
          materials: ["Social Network Mapping Template", "Relationship Quality Inventory", "UCLA Loneliness Scale", "Network Analysis Worksheet", "Goals Identification Guide"],
          skillLevel: "beginner",
          outcomes: ["Visual map of current social network", "Assessment of relationship quality and balance", "Identification of connection gaps and goals"]
        }
      },
      {
        title: "Deepening Existing Relationships",
        content: "Many people seek new connections while underinvesting in existing relationships. Dr. Arthur Aron's research shows that specific conversation techniques can create closeness rapidly. The key is gradually increasing vulnerability (self-disclosure reciprocity), creating shared experiences, expressing appreciation, and investing time. This section teaches: active-constructive responding (celebrating others' good news amplifies connection), meaningful questions that go beyond small talk, conflict repair skills, and the art of asking for support. Small, consistent investments deepen bonds more than occasional grand gestures.",
        duration: "15 minutes",
        videoId: "g1h2i3j4k5",
        practicalExercise: {
          title: "Connection Deepening Practice",
          instructions: "Choose 2-3 existing relationships you want to deepen. Over 3 weeks, practice specific connection behaviors: Week 1—Active-Constructive Responding: When someone shares good news, respond enthusiastically with interest and questions (not passive or dismissive). Practice with everyone but especially your chosen relationships. Use the response tracker to note differences. Week 2—Meaningful Conversation: Use the 36 Questions (adapted from Aron's Fast Friends protocol) as conversation starters. Choose 3-5 questions that feel appropriately vulnerable for the relationship. Have actual conversations, don't interrogate. Week 3—Appreciation & Support: Text/call your chosen people with specific appreciation ('I appreciate how you...') and ask for small support ('Would you be willing to...'). Document: Did vulnerability increase? Did you feel closer? Rate relationship quality before/after the 3 weeks.",
          timeRequired: "Variable, 2-3 interactions per week",
          materials: ["Active-Constructive Response Guide", "36 Questions for Increasing Closeness (adapted)", "Appreciation Message Templates", "Support Request Scripts", "Relationship Quality Before/After Assessment"],
          skillLevel: "intermediate",
          outcomes: ["Deepened existing relationships", "Skill in creating meaningful conversations", "Comfort with appropriate vulnerability and asking for support"]
        }
      },
      {
        title: "Building New Connections",
        content: "Forming new friendships as adults requires intentionality. Research identifies three requirements for friendship formation: proximity (repeated contact), similarity (shared interests/values), and reciprocal disclosure (gradual vulnerability). This section addresses: where to find potential connections aligned with your interests, how to initiate contact without awkwardness, moving from acquaintance to friendship (the 'transition moment'), managing rejection (most people underestimate others' interest), and pacing vulnerability appropriately. The goal isn't networking—it's authentic connection.",
        duration: "12 minutes",
        videoId: "l1m2n3o4p5",
        practicalExercise: {
          title: "New Connection Experimentation",
          instructions: "Design and implement a 4-week connection experiment. Week 1—Identify opportunities: List 5 contexts where you might meet like-minded people (hobby groups, classes, volunteering, sports, professional groups, shared spaces). Choose 1-2 to explore. Week 2—Initiate contact: Attend your chosen activity/group. Set a goal to have one brief friendly exchange with someone new. Use conversation starters from the guide. No pressure for friendship, just practice. Week 3—Follow-up practice: If you met anyone interesting, practice the 'transition move'—suggest a specific next step ('Want to grab coffee sometime?' or 'We should do this activity together'). Most people won't initiate, so you do. Week 4—Deepen promising connections: Have 1-2 one-on-one interactions with anyone who responded. Use meaningful questions. Document: What felt uncomfortable? What surprised you? Did anyone respond positively? Rate your comfort with initiation before/after 4 weeks.",
          timeRequired: "2-4 hours per week for 4 weeks",
          materials: ["Connection Opportunity Brainstorm Worksheet", "Conversation Starter Cards", "Transition Move Scripts", "Rejection Reframe Guide", "4-Week Experiment Log"],
          skillLevel: "advanced",
          outcomes: ["Identification of connection opportunities", "Reduced discomfort with social initiation", "Experience with friendship transition moments", "1+ new potential connections"]
        }
      },
      {
        title: "Maintaining Connection & Preventing Isolation",
        content: "Life gets busy and relationships drift without intention. This section focuses on sustainable connection habits: scheduling regular contact (specific calendar blocks for social time), quick connection practices (5-minute check-in texts, voice memos), saying yes to invitations even when tempted to isolate, and recognizing early signs of disconnection (going 2+ weeks without meaningful contact, declining invitations out of habit, feeling like 'no one would miss me'). You'll create a personal connection maintenance system.",
        duration: "8 minutes",
        videoId: "b1c2d3e4f5",
        practicalExercise: {
          title: "Connection Maintenance System Design",
          instructions: "Build your sustainable social connection plan: (1) Relationship Tiers & Contact Frequency—for each relationship tier (intimate, close, social), set minimum contact frequency that feels sustainable (e.g., intimate: weekly, close: bi-weekly, social: monthly). Add calendar reminders. (2) Connection Rituals—design 3 low-effort high-impact rituals (weekly coffee call with friend, monthly dinner party, daily gratitude text to someone different). (3) Isolation Warning Signs—list your personal signs of disconnection. Create if-then plans ('If I've declined 3 invitations in a row, then I will say yes to the next one' or 'If I've gone 10 days without meaningful contact, then I will reach out to 2 people'). (4) Energy Management—identify which relationships energize vs. drain you. Schedule draining obligations with recovery time after; prioritize energizing connections. Test your system for 4 weeks and refine based on what's sustainable.",
          timeRequired: "45 minutes planning + ongoing implementation",
          materials: ["Relationship Tier Planning Worksheet", "Connection Ritual Designer", "Isolation Warning Sign Checklist", "If-Then Plan Builder", "4-Week System Testing Log"],
          skillLevel: "intermediate",
          outcomes: ["Sustainable social connection system", "Proactive prevention of isolation", "Balanced relationship investment aligned with capacity"]
        }
      }
    ]
  },
  {
    id: "anxiety-management",
    title: "Anxiety Management Toolkit",
    description: "Evidence-based tools from CBT, ACT, and DBT for managing anxiety in everyday situations.",
    icon: BadgeCheck,
    color: "bg-[#5ce3e3]/10",
    coverImage: anxietyManagementImg,
    duration: "52 minutes",
    learningOutcomes: [
      "Understand the biology of anxiety and why it persists",
      "Recognize anxiety symptoms before they escalate to panic",
      "Apply immediate anxiety reduction techniques from multiple frameworks",
      "Develop a personalized anxiety management plan with long-term strategies"
    ],
    clinicalContext: {
      framework: "Integrative approach: CBT (Cognitive Behavioral Therapy), ACT (Acceptance and Commitment Therapy), DBT (Dialectical Behavior Therapy)",
      evidenceBase: "CBT for anxiety disorders shows 60-70% response rate (APA Grade A). ACT shows equivalent efficacy with better long-term maintenance. Combined approaches optimize outcomes (Hofmann & Smits, 2008).",
      contraindications: [
        "Panic disorder with severe agoraphobia (may need therapist-guided exposure)",
        "Anxiety secondary to medical conditions (thyroid, cardiac) requiring medical evaluation first",
        "Substance use disorders where anxiety management may unmask withdrawal symptoms"
      ],
      whenToSeekHelp: "If anxiety causes panic attacks (sudden intense fear with physical symptoms), prevents you from daily activities for more than 2 weeks, or leads to avoidance that shrinks your life, seek evaluation for anxiety disorder treatment.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support for anxiety crisis and panic"
        },
        {
          name: "Anxiety and Depression Association of America",
          contact: "Visit adaa.org/finding-help",
          description: "Provider directory and support resources"
        },
        {
          name: "NAMI HelpLine",
          contact: "1-800-950-6264",
          description: "Information and referrals for anxiety treatment"
        }
      ],
      culturalConsiderations: "Anxiety expression varies culturally (somatic vs. cognitive). Some cultures view anxiety as spiritual or relational issue. These techniques can complement cultural/spiritual practices."
    },
    sections: [
      {
        title: "Understanding Your Anxiety Response",
        content: "Anxiety is your brain's alarm system detecting potential threats—even when no real danger exists. The amygdala triggers fight-flight-freeze, releasing adrenaline and cortisol. This causes the physical symptoms: racing heart, rapid breathing, muscle tension, nausea, dizziness. Understanding that anxiety is a false alarm (your body preparing for danger that isn't actually present) helps you work with it rather than fear it. This section explains the anxiety cycle: trigger → catastrophic thought → physical symptoms → safety behaviors (avoidance, seeking reassurance) → temporary relief → reinforcement of anxiety. Breaking this cycle requires addressing thoughts AND behaviors.",
        duration: "12 minutes",
        videoId: "q1r2s3t4u5",
        practicalExercise: {
          title: "Anxiety Pattern Mapping",
          instructions: "Map your complete anxiety pattern using the comprehensive assessment. Part 1: Complete GAD-7 (Generalized Anxiety Disorder 7-item scale) to establish baseline severity. Part 2: Track 5 anxiety episodes using the incident log: What triggered it? (situation, thought, sensation) What did you think would happen? What physical symptoms appeared (check all: heart racing, sweating, trembling, shortness of breath, chest tightness, nausea, dizziness, tingling, etc.)? What did you do to cope (avoid, seek reassurance, distract, etc.)? What happened? Rate anxiety 0-10 at peak and after coping. Part 3: Identify your anxiety signature—your most common triggers, thoughts, physical symptoms, and safety behaviors. Most people have 2-3 primary anxiety themes (health, performance, social, uncertainty).",
          timeRequired: "40 minutes",
          materials: ["GAD-7 Assessment", "Anxiety Episode Tracking Log (5 copies)", "Physical Symptoms Checklist", "Safety Behavior Inventory", "Pattern Analysis Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Quantified anxiety baseline (GAD-7 score)", "Clear identification of anxiety triggers and patterns", "Recognition of safety behaviors that maintain anxiety"]
        }
      },
      {
        title: "Cognitive Restructuring for Anxious Thoughts",
        content: "Anxiety thrives on catastrophic thinking—overestimating danger and underestimating your ability to cope. CBT teaches you to identify anxiety-driven thoughts and examine them objectively. Common anxiety distortions: catastrophizing ('worst case will definitely happen'), probability overestimation ('it's very likely'), intolerance of uncertainty ('I must know for sure'), and fortune-telling ('I know it will go badly'). This section teaches systematic thought challenging using evidence, probability analysis, and coping confidence building. The goal isn't positive thinking—it's realistic thinking.",
        duration: "15 minutes",
        videoId: "v1w2x3y4z5",
        practicalExercise: {
          title: "Thought-Challenging Practice Intensive",
          instructions: "Practice cognitive restructuring on 7 anxiety-provoking situations over 2 weeks. For each situation, complete the anxiety thought record: (1) Situation—what triggered anxiety? (2) Automatic Thought—what went through your mind? What's the worst that could happen? (3) Emotion—what do you feel? (0-100 intensity) (4) Evidence For—what makes you think this thought is true? (5) Evidence Against—what suggests it might not be true or not as bad as you think? (6) Alternative Thoughts—what are 3 other ways to look at this? What's the actual probability? What's most likely to happen? How have you coped with similar situations before? (7) Re-rate Emotion—how intense now (0-100)? Track your before/after anxiety ratings to see cognitive restructuring impact. Most people see 30-50% reduction in intensity.",
          timeRequired: "20 min per situation, 7 situations",
          materials: ["Anxiety Thought Record Template (7 copies)", "Common Anxiety Distortions Guide", "Evidence Examination Worksheet", "Probability Assessment Tool", "Coping Confidence Builder"],
          skillLevel: "intermediate",
          outcomes: ["Systematic method for challenging catastrophic thoughts", "Realistic probability assessment skills", "Measurable reduction in anxiety intensity through cognitive work"]
        }
      },
      {
        title: "Rapid Anxiety Reduction & Distress Tolerance",
        content: "When anxiety spikes, you need immediate tools to prevent escalation to panic. This section combines techniques from DBT and somatic psychology: (1) Physiological Interventions—4-7-8 breathing (activates parasympathetic nervous system), cold water exposure (dive reflex reduces heart rate), intense exercise (burns off adrenaline); (2) Grounding Techniques—5-4-3-2-1 sensory awareness, mental categories (name all U.S. states), physical grounding (feet on floor, hands on solid surface); (3) Anxiety Surfing—riding the anxiety wave rather than fighting it (research shows anxiety peaks around 10 minutes then naturally decreases). These are your emergency toolkit.",
        duration: "15 minutes",
        videoId: "y1z2a3b4c5",
        practicalExercise: {
          title: "Anxiety Reduction Technique Testing & Toolkit Building",
          instructions: "Test and compare rapid anxiety reduction techniques: Week 1—Practice each technique during low anxiety (build skills in calm): 4-7-8 Breathing (3 cycles), Cold Water Splash (30 seconds), 5-4-3-2-1 Grounding, Anxiety Surfing (set timer, observe sensations without trying to change them). Week 2—Apply techniques during moderate anxiety (4-7/10). As soon as you notice rising anxiety, choose a technique and implement immediately. Rate anxiety before (0-10) and after (0-10). Time how long it takes to reduce by 50%. Week 3—Build your personalized anxiety toolkit. Based on your data, identify: Which technique reduced anxiety fastest? Which felt most natural? Create a tiered response plan: For mild anxiety (1-4), use [technique]. For moderate (5-7), use [technique]. For severe (8-10), use [technique + backup technique]. Laminate a pocket card with your plan.",
          timeRequired: "10 min daily practice Week 1-2, toolkit creation 30 min",
          materials: ["Technique Practice Guide", "Anxiety Level & Response Tracker", "Effectiveness Comparison Chart", "Personalized Toolkit Builder", "Pocket Card Template"],
          skillLevel: "advanced",
          outcomes: ["Personal data on most effective anxiety reduction techniques", "Tiered response plan for different anxiety levels", "Rapid anxiety reduction skills (target 50% reduction in 5-10 min)"]
        }
      },
      {
        title: "Exposure & ACT: Building Long-Term Anxiety Resilience",
        content: "While coping techniques provide relief, long-term anxiety management requires confronting rather than avoiding anxiety triggers. Exposure therapy (gradually facing feared situations) is the gold standard for anxiety disorders—70-80% improvement rates. However, it must be done systematically, not recklessly. ACT adds a complementary approach: willingness to experience anxiety in service of your values (doing what matters even when anxious). This section teaches gradual exposure hierarchy, values-based committed action, and defusion from anxious thoughts (seeing thoughts as mental events, not facts).",
        duration: "10 minutes",
        videoId: "q1r2s3t4u5",
        practicalExercise: {
          title: "Exposure Hierarchy & Values-Based Action Plan",
          instructions: "Create and implement your anxiety resilience plan: Part 1—Build Exposure Hierarchy (40 min): List 10-15 situations you avoid due to anxiety. Rate each for anxiety level if you did it (0-100). Rank from least to most anxiety-provoking. Part 2—Plan graduated exposure: Start with item rated 30-40 (challenging but manageable). Design specific exposure (What exactly will you do? When? For how long? How will you resist safety behaviors?). Predict anxiety level, actual anxiety peak, and 20-min-later level. Complete exposure, rating anxiety every 5 min. When this item drops to 30-40% of original anxiety, move to next step. Part 3—Values work: Identify what anxiety has cost you (relationships, opportunities, experiences). What matters enough to you to be willing to feel anxious? Design one values-based action this week where you do something meaningful despite anxiety (not to eliminate anxiety, but because it matters). Track both exposure progress and values-based actions.",
          timeRequired: "40 min planning + ongoing exposure practice",
          materials: ["Exposure Hierarchy Worksheet", "Graduated Exposure Planning Template", "Anxiety Tracking During Exposure", "Values Clarification Exercise", "Values-Based Action Planner", "Progress Log"],
          skillLevel: "advanced",
          outcomes: ["Systematic exposure plan targeting avoidance", "Experience with anxiety habituation (anxiety decreases with repeated exposure)", "Willingness to engage in valued activities despite anxiety", "Long-term anxiety resilience vs. just coping"]
        }
      }
    ]
  },
  {
    id: "boundary-setting",
    title: "Healthy Boundary Setting",
    description: "Learn to establish and maintain healthy boundaries using DBT interpersonal effectiveness skills.",
    icon: Compass,
    color: "bg-[#c85ce3]/10",
    coverImage: boundarySettingImg,
    duration: "47 minutes",
    learningOutcomes: [
      "Identify boundary violations and their impact on wellbeing",
      "Apply DEAR MAN and FAST skills for assertive boundary communication",
      "Implement strategies for maintaining boundaries under pressure",
      "Create a comprehensive boundary framework for different life domains"
    ],
    clinicalContext: {
      framework: "DBT Interpersonal Effectiveness Skills (DEAR MAN, FAST, GIVE)",
      evidenceBase: "DBT interpersonal effectiveness training shows significant improvement in relationship quality and self-respect while reducing conflict. Assertiveness training is APA-supported for anxiety, depression, and relationship issues.",
      contraindications: [
        "Active abuse situations requiring safety planning and professional support first",
        "Severe social anxiety requiring graduated exposure before boundary assertion",
        "Cultural contexts where direct boundary-setting violates norms (adapt to indirect methods)"
      ],
      whenToSeekHelp: "If boundary violations involve abuse, coercion, or threats, seek support from a domestic violence advocate or therapist specializing in trauma. If anxiety about boundaries prevents you from implementing skills, consider therapy for anxiety treatment.",
      crisisResources: [
        {
          name: "National Domestic Violence Hotline",
          contact: "1-800-799-7233",
          description: "24/7 support for abuse situations"
        },
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "Mental health crisis support"
        }
      ],
      culturalConsiderations: "Boundary norms vary significantly across cultures. Collectivist cultures may emphasize family/group needs over individual boundaries. Adapt assertiveness skills to honor cultural values while protecting wellbeing."
    },
    sections: [
      {
        title: "Understanding Boundaries & Identifying Violations",
        content: "Boundaries are the limits you set to protect your physical, emotional, mental, and time resources. Healthy boundaries are clear, consistent, and respectful of both yourself and others. This section explores boundary types: physical (personal space, touch), emotional (responsibility for others' feelings), mental (thoughts, beliefs, values), time/energy (commitments, availability), and material (possessions, finances). You'll learn to recognize boundary violations: when others make demands, guilt-trip you, disrespect your no, invade your privacy, or expect you to prioritize their needs over yours consistently. Understanding that boundaries aren't selfish—they're self-respectful—is foundational.",
        duration: "12 minutes",
        videoId: "w1x2y3z4a5",
        practicalExercise: {
          title: "Boundary Violation Inventory & Impact Assessment",
          instructions: "Complete comprehensive boundary assessment: Part 1: Boundary styles quiz—identify if your default is rigid (walls up, little vulnerability), porous (difficulty saying no, over-responsible for others), or healthy (flexible based on context, clear about needs). Part 2: Violation inventory—list 10 recent situations where your boundaries were crossed or you didn't set a needed boundary. For each: What boundary was violated? (physical, emotional, time, etc.) Who was involved? How did you respond? How did it make you feel? What was the cost to you? Part 3: Pattern analysis—what themes emerge? Who are the repeat boundary-crossers? Which boundary types are hardest for you to maintain? What makes saying no difficult? (fear of conflict, guilt, people-pleasing, fear of rejection) Part 4: Cost analysis—what has poor boundaries cost you in terms of stress, resentment, time, relationships, self-respect?",
          timeRequired: "45 minutes",
          materials: ["Boundary Styles Assessment", "Violation Inventory Worksheet (10 scenarios)", "Pattern Analysis Guide", "Cost-Benefit Worksheet", "Boundary Readiness Assessment"],
          skillLevel: "beginner",
          outcomes: ["Understanding of personal boundary style", "Clear identification of boundary violations and patterns", "Motivation for boundary work through cost recognition"]
        }
      },
      {
        title: "DEAR MAN: Assertive Boundary Communication",
        content: "DEAR MAN is DBT's structured framework for assertive communication when setting boundaries or making requests. It stands for: Describe the situation objectively, Express your feelings, Assert your need/boundary, Reinforce why it matters, stay Mindful (don't get sidetracked), Appear confident (body language, tone), Negotiate if appropriate (but not on core boundaries). This protocol helps you communicate clearly without aggression or passivity. Research shows structured assertiveness significantly increases success rate in boundary-setting compared to unstructured attempts.",
        duration: "15 minutes",
        videoId: "b1c2d3e4f5",
        practicalExercise: {
          title: "DEAR MAN Script Writing & Practice",
          instructions: "Practice DEAR MAN for 5 boundary situations: Choose 5 current boundary challenges (e.g., coworker interrupting, family over-asking for help, partner not respecting alone time, friend borrowing without returning, etc.). For each, write a complete DEAR MAN script: (D) Describe: 'When you [specific behavior]...' (facts only, no judgment); (E) Express: 'I feel [emotion] because...' (own your feelings); (A) Assert: 'I need you to [specific request]' or 'I'm not available for [boundary]'; (R) Reinforce: 'This matters because...' or 'This will help our relationship by...'; (M) Mindful: Plan how you'll redirect if they change subject; (A) Appear confident: Practice tone and body language (eye contact, calm voice, upright posture); (N) Negotiate: Determine what's negotiable vs. non-negotiable. Practice each script aloud 3 times, refining language. Then implement the easiest one in real life. Document: Did you follow the script? How did they respond? How did you feel after?",
          timeRequired: "30 min script writing + 15 min practice + implementation",
          materials: ["DEAR MAN Template (5 copies)", "Boundary Scenario Worksheet", "Script Practice Guide", "Body Language & Tone Tips", "Implementation Log"],
          skillLevel: "intermediate",
          outcomes: ["Structured assertiveness skills using DEAR MAN", "Prepared scripts for common boundary situations", "Experience implementing boundary communication in real life"]
        }
      },
      {
        title: "FAST: Maintaining Self-Respect in Boundaries",
        content: "Setting boundaries is pointless if you compromise yourself to keep peace. FAST is DBT's framework for maintaining self-respect during interpersonal challenges: be Fair to yourself and others (don't over-apologize or under-acknowledge your needs), avoid Apologies when you've done nothing wrong ('Sorry to bother you, but...' invalidates your legitimate needs), Stick to your values (don't sacrifice core principles to avoid conflict), be Truthful (don't lie or exaggerate to justify your boundaries—you have a right to them). This section addresses common self-sabotage: excessive apologizing, over-explaining, backing down when pressured, feeling guilty for having needs.",
        duration: "12 minutes",
        videoId: "g1h2i3j4k5",
        practicalExercise: {
          title: "FAST Skills Application & Self-Respect Recovery",
          instructions: "Practice FAST skills to rebuild self-respect in boundary-setting: Part 1: Analyze 3 recent boundary situations using FAST assessment: Were you Fair to yourself? Did you apologize unnecessarily? Did you stick to your values or compromise them? Were you truthful or did you fabricate justifications? What would FAST have looked like? Part 2: Identify your self-sabotage patterns (check all that apply): excessive apologizing, over-explaining/justifying, backing down when pushed back on, feeling guilty for saying no, lying to make saying no 'acceptable.' Part 3: Design counter-strategies for each pattern. E.g., If you over-apologize, practice boundary statements without 'sorry': 'I'm not available' vs. 'I'm sorry but I can't.' Part 4: Practice 3 boundary statements with FAST integrity on cards: 'I'm taking the weekend for myself' (no apology needed), 'I won't be lending money anymore' (stick to values), 'I need 24 hours to decide' (fair to yourself). Implement one this week.",
          timeRequired: "40 minutes",
          materials: ["FAST Assessment Worksheet", "Self-Sabotage Patterns Checklist", "Counter-Strategy Builder", "FAST Boundary Statements Practice Cards", "Weekly Implementation Log"],
          skillLevel: "advanced",
          outcomes: ["Recognition and correction of self-sabotaging boundary behaviors", "Increased self-respect in boundary communication", "Ability to set boundaries without over-apologizing or over-explaining"]
        }
      },
      {
        title: "Boundary Maintenance & Response to Pushback",
        content: "Setting a boundary once is rarely enough—maintaining boundaries despite pushback is where most people struggle. Common responses to your boundaries: guilting ('After all I've done for you'), dismissing ('You're being too sensitive'), bargaining ('Just this once'), intimidation (anger, threats), and silent treatment (withdrawal). This section teaches: how to repeat boundaries calmly (broken record technique), managing guilt and self-doubt, recognizing when someone consistently refuses to respect boundaries (relationship evaluation needed), and creating consequences for repeated violations ('If you continue to [behavior] after I've asked you to stop, I will [consequence]').",
        duration: "8 minutes",
        videoId: "w1x2y3z4a5",
        practicalExercise: {
          title: "Boundary Maintenance Plan & Pushback Response Preparation",
          instructions: "Build your boundary maintenance system: Part 1: Anticipate pushback—for each key boundary you're setting, predict how specific people will respond. What guilt-trips might they use? What pressure tactics? Write these down. Part 2: Prepare responses using broken record technique: 'I understand you're disappointed, and I'm not available for that.' Repeat calmly without engaging arguments or justifications. Practice 5 common pushback scenarios with prepared responses. Part 3: Create if-then plans for consequences: 'If [person] continues to [violate boundary] after two clear requests, then I will [consequence].' Consequences must be actions you control (limit contact, leave situation, etc.), not punishments for them. Part 4: Build support system—identify 2-3 people who support your boundaries and will reinforce when you doubt yourself. Part 5: Self-compassion for imperfection—boundaries are skills, expect learning curve. Practice self-compassion break when you don't maintain boundaries perfectly.",
          timeRequired: "45 minutes",
          materials: ["Pushback Prediction Worksheet", "Broken Record Response Scripts", "Consequence Planning Template", "Support System Identifier", "Boundary Maintenance Tracker"],
          skillLevel: "intermediate",
          outcomes: ["Prepared responses to predictable boundary pushback", "Clear consequence plans for repeated violations", "Support system for boundary maintenance", "Realistic expectations and self-compassion for boundary-setting journey"]
        }
      }
    ]
  },
  {
    id: "values-alignment",
    title: "Living by Your Values",
    description: "Clarify core values and align actions using Acceptance and Commitment Therapy (ACT) principles.",
    icon: PenTool,
    color: "bg-[#e3c85c]/10",
    coverImage: valuesAlignmentImg,
    duration: "50 minutes",
    learningOutcomes: [
      "Identify your core personal and professional values across life domains",
      "Recognize misalignments between stated values and actual behaviors",
      "Develop strategies for values-based decision making",
      "Create committed action plan for greater values alignment in daily life"
    ],
    clinicalContext: {
      framework: "Acceptance and Commitment Therapy (ACT) Values Work",
      evidenceBase: "ACT shows equivalent efficacy to CBT for depression/anxiety with superior long-term outcomes and values alignment (APA recognition). Values-based living correlates strongly with life satisfaction and meaning (Hayes et al., 2012).",
      contraindications: [
        "Active crisis requiring stabilization before values exploration",
        "Severe depression with suicidal ideation (safety planning priority)",
        "Cognitive impairment affecting abstract values reflection"
      ],
      whenToSeekHelp: "If values clarification reveals profound misalignment causing despair, or if you consistently cannot engage in valued action due to avoidance or mental health symptoms, consider ACT therapy for comprehensive support.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 crisis support"
        }
      ],
      culturalConsiderations: "Values are culturally embedded. Individualist cultures emphasize autonomy and achievement; collectivist cultures emphasize family harmony and community. Explore values within your cultural context."
    },
    sections: [
      {
        title: "Values Clarification Across Life Domains",
        content: "Values are chosen life directions—what you want your life to stand for. Unlike goals (achievable, finite), values are ongoing (you can't 'finish' being a loving parent or lifelong learner). ACT identifies key life domains: relationships (family, friends, intimate), work/education (career, contribution, growth), leisure (play, recreation, creativity), health (physical, mental, spiritual), community/citizenship (contribution, activism, environment), and personal growth/spirituality. This section helps you identify what truly matters in each domain—not what you think should matter, or what others value, but what resonates deeply for you. Values provide the compass for life decisions.",
        duration: "15 minutes",
        videoId: "d1e2f3g4h5",
        practicalExercise: {
          title: "Comprehensive Values Clarification",
          instructions: "Explore your values systematically across all life domains: Part 1: Values card sort—review 80 values cards (e.g., adventure, authenticity, creativity, family, learning, service, etc.). Sort into three piles: Very Important, Somewhat Important, Not Important. From Very Important pile, choose your top 10. Part 2: Life domains assessment—for each domain (relationships, work, health, leisure, community, personal growth), write: What do I want this area of my life to stand for? How do I want to show up? What qualities do I want to embody? Identify 2-3 core values per domain. Part 3: Conflict analysis—where do your values conflict? (E.g., family vs. career advancement) How can you honor both rather than choosing one? Part 4: Eulogy exercise—imagine your 90th birthday. People who love you describe the person you've been. What do you want them to say about how you lived? This reveals core values beyond surface preferences.",
          timeRequired: "60 minutes",
          materials: ["Values Card Sort (80 cards)", "Life Domains Assessment Worksheet", "Values Conflict Exploration Guide", "Eulogy Exercise Prompts", "Core Values Summary Sheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of core values across all life domains", "Clarity on value priorities and potential conflicts", "Deep understanding of what makes life meaningful for you"]
        }
      },
      {
        title: "Values-Behavior Alignment Assessment",
        content: "Most people experience values-behavior gaps—they value health but don't exercise, value family but work 80-hour weeks, value creativity but never make time for art. This section teaches you to assess alignment between stated values and actual behaviors. You'll analyze how you spend time and energy, where behaviors contradict values, and what barriers prevent alignment (fear, habits, external pressures, lack of skills). Awareness of these gaps is uncomfortable but necessary for change. Research shows that values-behavior alignment predicts life satisfaction better than achievement of goals.",
        duration: "12 minutes",
        videoId: "i1j2k3l4m5",
        practicalExercise: {
          title: "Values-Behavior Gap Analysis",
          instructions: "Systematically assess alignment between your values and actual life: Part 1: Time audit—track how you spend time for one week using the log. Categorize each hour by life domain and activity. Calculate percentage of time in each domain. Part 2: Energy investment—beyond time, where do you invest mental/emotional energy? (Worry, planning, focus) Part 3: Gap identification—for each core value, rate 0-10: How aligned is my actual behavior? Where are the biggest gaps? E.g., Value = 'Being present with family' (10), Current alignment = 3 (always on phone, thinking about work). Part 4: Barrier analysis—for each gap, identify what prevents alignment: Fear? ('If I set boundaries at work, I'll be fired') Habits? ('I automatically scroll when sitting down') Skills deficit? ('I don't know how to have deep conversations') External constraints? ('My job requires 60-hour weeks') Part 5: Cost analysis—what is misalignment costing you emotionally, relationally, physically, spiritually?",
          timeRequired: "7-day time tracking + 40 min analysis",
          materials: ["Weekly Time Tracking Log", "Energy Investment Worksheet", "Values-Behavior Alignment Rating Scale", "Barrier Identification Guide", "Cost Analysis Worksheet"],
          skillLevel: "intermediate",
          outcomes: ["Clear data on how time/energy is actually spent", "Identification of specific values-behavior gaps", "Understanding of barriers preventing alignment"]
        }
      },
      {
        title: "Values-Based Decision Making",
        content: "Every choice is an opportunity to move toward or away from your values. Values-based decision making means asking: 'Which option brings me closer to the person I want to be?' rather than 'Which avoids discomfort?' This section teaches systematic values-based decision frameworks: (1) Values check-in before decisions ('Which of my core values is relevant here?'), (2) Long-term vs. short-term analysis (does short-term comfort cost long-term values?), (3) Regret test ('Looking back in 5 years, which choice will I be proud of?'), (4) Integrity check ('Can I look myself in the mirror after this choice?'). Small daily decisions compound—choosing aligned actions builds a valued life.",
        duration: "13 minutes",
        videoId: "n1o2p3q4r5",
        practicalExercise: {
          title: "Values-Based Decision Practice",
          instructions: "Apply values-based decision framework to current life choices: Part 1: Decision inventory—list 10 current decisions (small to large): Should I skip workout? Apply for new job? Have difficult conversation? Set boundary with family? Change career? For each, identify: What choice moves me toward values? What choice moves me away (even if more comfortable)? Part 2: Practice structured values-based decision process for 3 significant pending decisions: (1) Clarify decision and options; (2) Identify relevant values; (3) For each option, assess: short-term impact, long-term values alignment, regret test (which will you regret more?), integrity check; (4) Make values-aligned choice even if uncomfortable; (5) Commit to action despite fear/discomfort. Part 3: Build values-decision habit—for 2 weeks, before every decision (even small ones), pause and ask: 'What's the valued choice here?' Document 3 decisions per day where you chose values over comfort. Track cumulative impact on sense of integrity and life satisfaction.",
          timeRequired: "40 min initial + 5 min daily for 2 weeks",
          materials: ["Decision Inventory Worksheet", "Values-Based Decision Framework Template", "Regret Test Guide", "Daily Values-Decision Log", "Impact Reflection Prompts"],
          skillLevel: "advanced",
          outcomes: ["Systematic process for values-based decisions", "Experience choosing values over comfort", "Measurable increase in values-aligned daily choices"]
        }
      },
      {
        title: "Committed Action & Maintenance",
        content: "Values without action are aspirations. Committed action means behaving according to values even when difficult—especially when difficult. ACT emphasizes willingness to experience discomfort (anxiety, fear, guilt, uncertainty) in service of values. This section teaches: (1) Creating values-based action plans with specific behaviors, (2) Building willingness for values-aligned discomfort ('I'm willing to feel anxious if it means living according to my values'), (3) Defusion from barriers ('I'm having the thought that I can't do this' vs. believing the thought), (4) Tracking values-consistent behavior to maintain motivation. Consistent small actions create large values alignment over time.",
        duration: "10 minutes",
        videoId: "d1e2f3g4h5",
        practicalExercise: {
          title: "30-Day Committed Action Plan",
          instructions: "Build and implement comprehensive values-aligned action system: Part 1: For each of your top 5 values, define committed action—specific, observable behaviors that express this value. E.g., Value = 'Connection,' Actions = 'Have phone-free dinner 3x/week, ask 1 meaningful question daily, schedule monthly friend outing.' Part 2: Design 30-day action calendar—assign specific values-based actions to specific days. Start small (5-10 min actions) to build consistency. Part 3: Willingness work—for each action, identify likely discomfort (anxiety, guilt, fatigue, awkwardness). Practice willingness statement: 'I'm willing to feel [discomfort] because [value] matters enough to me.' Part 4: Barrier defusion—identify thoughts that might prevent action ('I'm too tired,' 'It won't matter,' 'I'll do it tomorrow'). Practice defusion: 'I'm having the thought that I'm too tired, AND I can still take this action.' Part 5: Daily tracking—checkmark each completed action. Weekly reflection: What shifted? What was hard? How does values alignment feel different from goal achievement? Monthly assessment: retake values-behavior alignment ratings.",
          timeRequired: "60 min planning + 5-10 min daily action + weekly reflection",
          materials: ["Values-Based Action Planning Worksheet", "30-Day Action Calendar", "Willingness Practice Scripts", "Defusion Technique Guide", "Daily Action Tracker", "Weekly Reflection Prompts", "Monthly Realignment Assessment"],
          skillLevel: "intermediate",
          outcomes: ["Clear action plan for each core value", "Daily practice of values-aligned behavior", "Willingness to experience discomfort for valued living", "Measurable increase in values-behavior alignment over 30 days"]
        }
      }
    ]
  },
  {
    id: "habit-formation",
    title: "Habit Formation Mastery",
    description: "Science-based approaches to building sustainable habits using behavioral psychology research.",
    icon: Sparkles,
    color: "bg-[#5cc8e3]/10",
    coverImage: habitFormationImg,
    duration: "48 minutes",
    learningOutcomes: [
      "Understand the neuroscience and psychology of habit formation",
      "Design effective habit implementation using evidence-based strategies",
      "Overcome common obstacles to habit maintenance",
      "Build systems that support automatic positive behaviors"
    ],
    clinicalContext: {
      framework: "Behavioral Activation and Habit Loop Science (James Clear, BJ Fogg, Charles Duhigg)",
      evidenceBase: "Behavioral activation shows 60% efficacy for depression (APA Grade A). Habit formation research demonstrates that implementation intentions increase success by 91% (Gollwitzer & Sheeran, 2006).",
      contraindications: [
        "Severe depression with extreme fatigue (may need activation therapy first)",
        "OCD where habit tracking may become compulsive ritual",
        "Perfectionism where failure to maintain habits triggers self-criticism (needs reframing work)"
      ],
      whenToSeekHelp: "If you consistently cannot implement basic self-care habits despite genuine effort, or if habit failure triggers severe self-criticism or hopelessness, consider therapy (especially behavioral activation for depression).",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 mental health support"
        }
      ],
      culturalConsiderations: "Habit formation emphasis on individual behavior change may not fit collectivist cultures. Integrate family/community into habit systems where appropriate."
    },
    sections: [
      {
        title: "The Science of Habit Formation",
        content: "Habits are behaviors performed automatically in response to contextual cues. Neuroscience shows habits create neural pathways in the basal ganglia, freeing up prefrontal cortex for complex decisions. The habit loop: Cue (trigger) → Routine (behavior) → Reward (benefit). Repetition strengthens this loop until behavior becomes automatic. Research shows habits take 18-254 days to form (average 66 days), depending on complexity. This section explores: why motivation alone doesn't work (it's unreliable), why environment design matters more than willpower, how to work with your brain's automaticity rather than fight it, and common habit formation myths ('it takes 21 days,' 'just be disciplined').",
        duration: "13 minutes",
        videoId: "m1n2o3p4q5",
        practicalExercise: {
          title: "Current Habit Ecosystem Mapping",
          instructions: "Analyze your existing habit patterns to understand your habit-formation style: Part 1: List 20+ current habits (morning routine, phone checking, eating patterns, exercise, social media, work patterns, evening routine). Categorize as: Positive (supports goals), Negative (undermines goals), Neutral. Part 2: Deconstruct 5 strong existing habits (good or bad) using habit loop: What's the cue? What's the routine? What's the reward? How long have you done this? This reveals how YOUR brain forms habits. Part 3: Environmental audit—photograph or list 30 visible objects in your primary spaces (bedroom, workspace, kitchen). How many cue positive habits vs. negative? E.g., workout clothes visible = positive cue; chips on counter = negative cue. Part 4: Identity assessment—complete the sentence 20 times: 'I am the type of person who...' Do these identity statements support or contradict your habit goals? Research shows habits stick when they align with identity.",
          timeRequired: "45 minutes",
          materials: ["Habit Inventory Worksheet", "Habit Loop Analysis Template", "Environmental Audit Checklist", "Identity Statement Worksheet", "Habit Ecosystem Map"],
          skillLevel: "beginner",
          outcomes: ["Comprehensive understanding of current habit patterns", "Recognition of personal cue-routine-reward loops", "Environmental habit awareness", "Clarity on habit-identity alignment"]
        }
      },
      {
        title: "Designing Effective Habit Implementation",
        content: "Successful habit formation requires strategic design, not just motivation. This section teaches evidence-based implementation strategies: (1) Implementation Intentions—'If-then' planning ('If it's 7am, then I will meditate for 5 minutes') increases success by 91%; (2) Habit Stacking—attaching new habits to existing ones ('After I pour coffee, I will write 3 gratitudes'); (3) Environment Design—making desired behaviors easier and undesired behaviors harder; (4) Tiny Habits—starting impossibly small (2 push-ups, 1 page reading) to build consistency before intensity; (5) Temptation Bundling—pairing required behaviors with pleasurable ones ('I only watch my favorite show while exercising'). These strategies work WITH your brain's wiring.",
        duration: "15 minutes",
        videoId: "s1t2u3v4w5",
        practicalExercise: {
          title: "Strategic Habit Design Workshop",
          instructions: "Design 3 new habits using evidence-based strategies: Part 1: Choose 3 keystone habits—behaviors that create positive ripple effects. Examples: exercise → better mood → healthier eating → better sleep; morning reflection → gratitude → improved relationships; reading → learning → confidence. Part 2: For each habit, apply ALL design strategies: (a) Implementation Intention: Write specific 'If [cue], then I will [behavior]' statement. Make cue specific (time, location, preceding action); (b) Habit Stacking: Attach to existing strong habit ('After I [existing habit], I will [new habit]'); (c) Environment Design: What physical changes make this easier? (Set out workout clothes, put book by bed, delete distracting app); (d) Start Tiny: What's the smallest version? (1 min meditation, 5 push-ups, 1 paragraph writing); (e) Temptation Bundle: Pair with something you enjoy. Part 3: Create visual habit tracker—calendar to check off daily completion. Research shows tracking increases consistency by 43%. Part 4: Predict obstacles and preplan solutions using 'If-then' format ('If I'm tempted to skip, then I will do just the tiny version').",
          timeRequired: "60 minutes",
          materials: ["Keystone Habit Identifier", "Implementation Intention Worksheet", "Habit Stacking Planner", "Environment Design Checklist", "Tiny Habits Starter Guide", "Habit Tracker Template", "Obstacle If-Then Planner"],
          skillLevel: "intermediate",
          outcomes: ["3 strategically designed keystone habits using evidence-based methods", "Specific implementation plans addressing common failure points", "Visual tracking system for accountability"]
        }
      },
      {
        title: "Overcoming Habit Obstacles & Maintaining Consistency",
        content: "Most habit attempts fail not from bad design but from predictable obstacles: (1) The Dip—initial enthusiasm fades around Day 7-10; motivation drops before automaticity develops; (2) All-or-Nothing Thinking—missing one day triggers 'I've failed' spiral and complete abandonment; (3) Complexity Creep—starting too big or adding too fast; (4) Environmental Sabotage—life changes disrupting cues; (5) Identity Misalignment—'I'm not the type of person who...' This section teaches resilience strategies: never missing twice in a row rule, implementation intentions for disruptions, identity-based rather than outcome-based habits, and self-compassion for inevitable imperfection.",
        duration: "12 minutes",
        videoId: "y1z2a3b4c5",
        practicalExercise: {
          title: "Obstacle Inoculation & Recovery Planning",
          instructions: "Prepare for predictable obstacles before they derail you: Part 1: Identify your personal habit killers—review past failed habit attempts. What patterns emerge? When do you typically quit? (After one missed day? During stress? When traveling? When seeing no immediate results?) What excuses do you tell yourself? Part 2: Design obstacle if-then plans for each: 'If I miss one day, then I will do the tiny version the next day no matter what,' 'If I'm traveling, then I will [adapted version of habit],' 'If I feel unmotivated at Day 10, then I will do just 2 minutes to maintain streak.' Part 3: Never-miss-twice commitment—sign contract with yourself: 'I commit to never missing this habit two consecutive days. If I miss once, I WILL do it the next day even if just the tiniest version.' Research shows this prevents abandonment. Part 4: Build accountability system—identify: Who will I tell about this habit? How will I report progress? (Daily text to friend, weekly check-in, share tracker) Social accountability increases success by 65%. Part 5: Plan identity reinforcement—after each completion, state: 'I am someone who [habit].' This builds identity-habit alignment.",
          timeRequired: "40 minutes",
          materials: ["Personal Habit Failure Pattern Analysis", "Obstacle If-Then Planning Template", "Never-Miss-Twice Contract", "Accountability System Designer", "Identity Statement Practice Guide"],
          skillLevel: "advanced",
          outcomes: ["Prepared responses to predictable obstacles", "Commitment to never-miss-twice rule", "Accountability system to support consistency", "Identity-reinforcement practice"]
        }
      },
      {
        title: "Building Habit Systems & Long-Term Maintenance",
        content: "Individual habits are powerful, but habit systems create transformation. A system is a collection of habits that reinforce each other toward a larger goal or identity. This section teaches: (1) Habit Stacking Systems—chaining multiple habits into routines (morning routine = 6 stacked habits taking 20 minutes); (2) Keystone Habit Leverage—using one powerful habit that triggers multiple positive changes; (3) Environment Architecture—designing spaces that cue positive behaviors and discourage negative ones; (4) Periodic Reset Rituals—weekly/monthly reviews to assess what's working, adjust what isn't, and add new habits gradually. The goal is not perfection but continuous evolution toward your values and goals.",
        duration: "8 minutes",
        videoId: "m1n2o3p4q5",
        practicalExercise: {
          title: "Habit System Architecture & Evolution Plan",
          instructions: "Design your comprehensive habit system for sustainable change: Part 1: Create Morning & Evening Routines—identify 4-6 habits to stack in each. Morning example: Wake at [time] → Make bed → 5-min stretch → Cold water splash → Review daily plan → Protein breakfast. Evening: Prep tomorrow's clothes → Technology off → Reflect on gratitude → Read 10 pages → Lights out. Total time <30 min each. Part 2: Map Habit Ecosystem—draw your habits visually showing which support each other (exercise → energy → productivity → confidence → social engagement). Identify missing habits that would strengthen system. Part 3: Design Environment Architecture—for each room, list 3 environmental changes to cue positive habits or remove negative cues. Implement top 10 changes this week. Part 4: Schedule Habit Evolution—build in growth: Weeks 1-3: Establish core 3 habits (start tiny). Weeks 4-6: Increase duration/intensity slightly. Weeks 7-9: Add complementary habit. Part 5: Set up Review Rituals—Weekly: Sunday 15-min review (what worked? Obstacles? Adjustments?). Monthly: 30-min assessment (retake initial assessments, celebrate progress, evolve system). This prevents stagnation and maintains engagement.",
          timeRequired: "90 minutes planning + ongoing",
          materials: ["Morning/Evening Routine Builder", "Habit Ecosystem Map Template", "Room-by-Room Environment Design Worksheet", "Habit Evolution Timeline", "Weekly Review Protocol", "Monthly Assessment Guide"],
          skillLevel: "intermediate",
          outcomes: ["Comprehensive morning and evening habit routines", "Integrated habit ecosystem that reinforces itself", "Environment designed to support positive habits", "Sustainable evolution plan with built-in review and adjustment"]
        }
      }
    ]
  }
];
