import { 
  Brain, 
  MessageCircle, 
  HeartHandshake, 
  Moon, 
  Lightbulb, 
  Smile, 
  Clock, 
  Users, 
  Shield, 
  BookOpen, 
  BadgeCheck, 
  Zap, 
  Heart, 
  Compass,
  Coffee,
  Dumbbell,
  Palmtree,
  AlertCircle,
  BrainCircuit,
  FolderHeart,
  Sparkles, 
  FlaskConical,
  Goal,
  Mountain,
  Medal
} from "lucide-react";
import { WorkshopData } from "@/components/Workshop";

export const workshopData: WorkshopData[] = [
  {
    id: "stress-management",
    title: "Stress Management",
    description: "Learn effective techniques to manage daily stress and build resilience. This workshop combines cognitive strategies with practical mindfulness exercises.",
    icon: Brain,
    color: "bg-[#9b87f5]/10 border-[#9b87f5]/30 text-[#9b87f5]",
    duration: "45 minutes",
    sections: [
      {
        title: "Understanding Stress",
        duration: "10 minutes",
        content: `Stress is your body's natural response to pressure or threats. When you sense danger, your body responds with a cascade of hormones that prepare you for emergency action. This is known as the "fight-or-flight" response.

While some stress can be beneficial, chronic stress can lead to serious health problems. Today we'll explore the different types of stress, their impact on your mind and body, and begin to develop strategies for managing them effectively.

Henry note: Remember that stress affects everyone differently. As you go through this workshop, focus on identifying which stress responses are most common for you personally.`,
        exercises: [
          {
            title: "Stress Awareness Check-in",
            instructions: "Take a moment to scan your body from head to toe. Notice any areas of tension or discomfort. Write down where you feel stress in your body right now."
          },
          {
            title: "Identify Your Stress Triggers",
            instructions: "Make a list of 3-5 situations, people, or thoughts that typically trigger stress for you. Being aware of these triggers is the first step to managing them."
          }
        ]
      },
      {
        title: "Breathing Techniques",
        duration: "15 minutes",
        content: `Breathing exercises are powerful tools for managing stress in the moment. When you're stressed, your breathing becomes shallow and rapid, which can increase anxiety and tension.

Controlled breathing activates your parasympathetic nervous system, which helps calm your body's stress response. These techniques can be practiced anywhere, anytime, and only take a few minutes.

Henry note: Find a comfortable position before beginning these exercises. If you feel lightheaded at any point, return to your normal breathing pattern.`,
        exercises: [
          {
            title: "4-7-8 Breathing",
            instructions: "Inhale quietly through your nose for 4 seconds. Hold your breath for 7 seconds. Exhale completely through your mouth for 8 seconds. Repeat this cycle 4 times."
          },
          {
            title: "Box Breathing",
            instructions: "Inhale for 4 counts. Hold for 4 counts. Exhale for 4 counts. Hold for 4 counts. Visualize tracing the sides of a square as you perform each step. Repeat 5 times."
          }
        ]
      },
      {
        title: "Cognitive Reframing",
        duration: "10 minutes",
        content: `How we think about stressful situations can significantly impact how we feel and respond to them. Cognitive reframing is a technique used to shift your perspective and see situations in a different, usually more positive light.

This doesn't mean ignoring problems or pretending everything is fine. Rather, it's about challenging unhelpful thought patterns and finding more balanced, realistic ways to view challenging situations.

Henry note: This skill takes practice. Be patient with yourself as you learn to identify and shift your thought patterns.`,
        exercises: [
          {
            title: "Thought Challenge",
            instructions: "Think of a recent stressful situation. Write down your automatic thoughts about it. Then challenge each thought by asking: Is this thought based on facts or feelings? What evidence contradicts this thought? What would I tell a friend in this situation?"
          },
          {
            title: "Perspective Shift",
            instructions: "For the same situation, try to list three potential benefits or learning opportunities that might come from this challenge. How might this situation look one year from now?"
          }
        ]
      },
      {
        title: "Daily Stress Management Plan",
        duration: "10 minutes",
        content: `Creating a personalized stress management plan helps you integrate what you've learned into your daily life. The most effective stress management strategies are those that you can consistently practice.

Your plan should include preventative practices that build resilience, as well as quick techniques for handling stress in the moment. Remember that different strategies work better in different situations.

Henry note: Start small with 1-2 techniques that resonate with you. You can expand your toolkit as you become more comfortable with these practices.`,
        exercises: [
          {
            title: "Create Your Stress Toolkit",
            instructions: "List 3 strategies for preventing stress (e.g., regular exercise, sufficient sleep) and 3 strategies for managing stress in the moment (e.g., deep breathing, brief meditation). Be specific about when and how you'll implement each strategy."
          },
          {
            title: "Schedule Self-Care",
            instructions: "Using your calendar or planner, schedule at least three 15-minute self-care activities for the coming week. Treat these appointments with yourself as non-negotiable commitments."
          }
        ]
      }
    ]
  },
  {
    id: "mindful-communication",
    title: "Mindful Communication",
    description: "Develop mindfulness skills for healthier relationships and conversations. Learn to express your needs clearly while understanding others more deeply.",
    icon: MessageCircle,
    color: "bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]",
    duration: "45 minutes",
    sections: [
      {
        title: "Foundations of Mindful Communication",
        duration: "10 minutes",
        content: `Mindful communication involves bringing your full attention to your interactions with others. It means being present, listening without judgment, and responding thoughtfully rather than reacting automatically.

When we communicate mindfully, we're better able to express ourselves clearly, understand others more deeply, and navigate difficult conversations with compassion and clarity.

Henry note: Notice how often your mind wanders during conversations. This awareness is the first step toward more mindful communication.`,
        exercises: [
          {
            title: "Communication Self-Assessment",
            instructions: "Reflect on your communication patterns. Rate yourself on a scale of 1-10 on: listening without interrupting, expressing needs clearly, staying present in conversations, and managing emotional reactions."
          },
          {
            title: "Presence Practice",
            instructions: "For your next conversation, set an intention to be fully present. Notice when your mind wanders and gently bring it back to the conversation. After the interaction, note what you observed."
          }
        ]
      },
      {
        title: "Active Listening",
        duration: "12 minutes",
        content: `Active listening is a cornerstone of mindful communication. It involves fully concentrating on what is being said rather than passively hearing the message or planning what you'll say next.

When we listen actively, we demonstrate respect and care for the speaker, gather more accurate information, and build stronger connections. Active listening requires patience and practice.

Henry note: Many of us think we're good listeners when we're actually not. Be honest with yourself about your listening habits as you practice these exercises.`,
        exercises: [
          {
            title: "The Three-Minute Listen",
            instructions: "In your next conversation, challenge yourself to listen for three full minutes without interrupting or planning your response. Focus completely on understanding the speaker's message and perspective."
          },
          {
            title: "Reflective Listening Practice",
            instructions: "After someone shares something with you, practice summarizing what you heard before responding with your thoughts. Start with phrases like 'What I'm hearing is...' or 'It sounds like you're saying...'"
          }
        ]
      },
      {
        title: "Expressing Needs Clearly",
        duration: "12 minutes",
        content: `Expressing your needs clearly and compassionately is an essential skill for healthy relationships. Many of us struggle to identify and communicate our needs, leading to frustration and misunderstandings.

Non-violent communication offers a framework for expressing needs without blame or criticism. This approach focuses on observations, feelings, needs, and requests.

Henry note: Remember that clear communication doesn't guarantee your needs will be met, but it significantly increases the likelihood of being understood.`,
        exercises: [
          {
            title: "Needs Identification",
            instructions: "Think of a situation where you felt frustrated or upset. Try to identify the unmet need behind those feelings. Was it for respect, understanding, support, space, or something else?"
          },
          {
            title: "I-Statement Practice",
            instructions: "For a current issue, create an I-statement using this formula: 'When [objective observation], I feel [emotion] because I need [need]. Would you be willing to [specific request]?'"
          }
        ]
      },
      {
        title: "Navigating Difficult Conversations",
        duration: "11 minutes",
        content: `Difficult conversations are an inevitable part of life. Whether addressing a conflict, providing feedback, or discussing sensitive topics, approaching these conversations mindfully can lead to better outcomes.

The key is to prepare thoughtfully, stay present during the conversation, and focus on understanding and connection rather than winning or being right.

Henry note: Difficult conversations often trigger our stress response. Remember to use your breathing techniques if you notice yourself becoming tense.`,
        exercises: [
          {
            title: "Conversation Planning",
            instructions: "Identify a difficult conversation you need to have. Write down: 1) Your main message, 2) Your goal for the conversation, 3) Potential reactions from the other person, and 4) How you'll respond mindfully to those reactions."
          },
          {
            title: "Empathy Bridge",
            instructions: "Before a difficult conversation, take a few minutes to imagine the situation from the other person's perspective. What might they be feeling? What needs might they have? How can you acknowledge these in the conversation?"
          }
        ]
      }
    ]
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    description: "Discover tools to understand and regulate your emotional responses. Learn techniques for managing intense emotions in healthy ways.",
    icon: HeartHandshake,
    color: "bg-[#0EA5E9]/10 border-[#0EA5E9]/30 text-[#0EA5E9]",
    duration: "45 minutes",
    sections: [
      {
        title: "Understanding Emotions",
        duration: "10 minutes",
        content: `Emotions provide valuable information about our internal experiences and how we're relating to the world around us. All emotions—even difficult ones—serve important functions and are natural parts of being human.

Emotional regulation doesn't mean suppressing emotions, but rather developing healthy ways to understand, express, and respond to them. This begins with recognizing and naming your emotional experiences.

Henry note: Our relationship with emotions is often shaped by family and cultural messages we received growing up. Notice if you tend to judge certain emotions as "good" or "bad."`,
        exercises: [
          {
            title: "Emotion Awareness Check-in",
            instructions: "Take a moment to notice what emotions you're experiencing right now. Where do you feel these emotions in your body? Can you name the emotions with specificity (e.g., 'irritated' rather than just 'angry')?"
          },
          {
            title: "Emotion Function Reflection",
            instructions: "Choose an emotion you frequently experience. What purpose might this emotion serve? What might it be trying to tell you? How does it help you navigate life, even if it's uncomfortable?"
          }
        ]
      },
      {
        title: "The Mind-Body Connection",
        duration: "12 minutes",
        content: `Our emotions have physical manifestations in our bodies. Learning to recognize these physical sensations gives us early warning signs that we're experiencing an emotional response.

Just as importantly, we can use our bodies to help regulate our emotions. Simple physical interventions can help calm our nervous system when emotions become intense.

Henry note: Different emotions tend to create different physical sensations. Anger might feel hot and energizing, while anxiety might create tightness in the chest or stomach.`,
        exercises: [
          {
            title: "Body Scan for Emotional Awareness",
            instructions: "Slowly scan your body from head to toe. Notice any areas of tension, discomfort, or other sensations. Without trying to change anything, simply observe how your current emotional state manifests physically."
          },
          {
            title: "Physical Reset Technique",
            instructions: "Practice this grounding technique: Place both feet firmly on the floor. Feel the support beneath you. Take 5 slow breaths, focusing on the sensation of air entering and leaving your body. Notice if this changes your emotional state."
          }
        ]
      },
      {
        title: "Strategies for Intense Emotions",
        duration: "12 minutes",
        content: `When emotions become intense, they can overwhelm our usual coping mechanisms. Having specific strategies for these moments helps us navigate strong feelings without being controlled by them.

Different emotions may call for different regulation strategies. What helps with anxiety might be different from what helps with anger or sadness.

Henry note: The goal isn't to immediately feel better, but to respond to intense emotions in ways that align with your values and long-term wellbeing.`,
        exercises: [
          {
            title: "Creating Your Emotional First-Aid Kit",
            instructions: "List 5 activities that help soothe you when you're experiencing difficult emotions. These might include physical activities, sensory experiences, social connections, or mental distractions. Be specific about when each might be most helpful."
          },
          {
            title: "Urge Surfing Practice",
            instructions: "Next time you feel a strong urge to react to an emotion (e.g., lash out in anger, withdraw in sadness), imagine yourself as a surfer riding a wave. The urge will rise, peak, and eventually subside. Track this process without acting on the urge."
          }
        ]
      },
      {
        title: "Building Emotional Resilience",
        duration: "11 minutes",
        content: `Emotional resilience is our ability to adapt to stressful situations and recover from difficulties. While some aspects of resilience are innate, many can be developed through intentional practice.

Regular self-care, maintaining supportive relationships, and developing flexible thinking all contribute to emotional resilience. This isn't about never experiencing difficulties, but about bouncing back more effectively.

Henry note: Building resilience is a continuous process, not a destination. Be patient with yourself as you develop these skills over time.`,
        exercises: [
          {
            title: "Resilience Inventory",
            instructions: "List your existing resilience resources in four categories: 1) Personal strengths and skills, 2) Supportive relationships, 3) Professional resources, and 4) Activities that restore your energy. Identify one area you'd like to strengthen."
          },
          {
            title: "Values Clarification",
            instructions: "Identify 3-5 core values that guide your life (e.g., connection, creativity, growth). How might connecting with these values help you navigate emotional challenges? Write a brief statement about how you can live these values even during difficult times."
          }
        ]
      }
    ]
  },
  {
    id: "better-sleep",
    title: "Better Sleep Habits",
    description: "Develop healthy sleep routines and overcome insomnia with evidence-based techniques. Improve your sleep quality for better mental health.",
    icon: Moon,
    color: "bg-[#6366F1]/10 border-[#6366F1]/30 text-[#6366F1]",
    duration: "40 minutes",
    sections: [
      {
        title: "Understanding Sleep and Mental Health",
        duration: "10 minutes",
        content: `Sleep is fundamental to our mental wellbeing, yet many of us struggle with getting adequate, quality rest. Understanding the relationship between sleep and mental health is the first step to improving both.

Research shows that poor sleep contributes to negative thinking and emotional vulnerability, while healthy sleep promotes emotional resilience and cognitive clarity. The relationship is bidirectional - mental health challenges can disrupt sleep, and sleep problems can worsen mental health symptoms.

Henry note: As you go through this workshop, try to identify which aspects of your sleep habits have the biggest impact on your mental wellbeing.`,
        exercises: [
          {
            title: "Sleep-Mood Connection Log",
            instructions: "For the next three days, rate your sleep quality (1-10) each morning and your mood (1-10) midday. Note any patterns between sleep quality and next-day mood."
          },
          {
            title: "Sleep Disruptors Identification",
            instructions: "Make a list of factors that might be disrupting your sleep: environmental (noise, light, temperature), behavioral (screen time, caffeine, irregular schedule), and psychological (stress, anxiety, racing thoughts)."
          }
        ]
      },
      {
        title: "Sleep Hygiene Fundamentals",
        duration: "10 minutes",
        content: `Sleep hygiene refers to the habits and practices that promote consistent, uninterrupted sleep. Improving your sleep environment and pre-sleep routine can significantly enhance sleep quality.

These practices work by supporting your body's natural sleep-wake cycle (circadian rhythm) and creating conditions that signal to your brain that it's time to sleep. Even small adjustments can lead to noticeable improvements in sleep quality.

Henry note: You don't need to implement all these suggestions at once. Choose 2-3 practices that seem most relevant to your situation and build from there.`,
        exercises: [
          {
            title: "Sleep Environment Optimization",
            instructions: "Evaluate your bedroom for sleep-promoting qualities. Is it dark enough? Quiet enough? Comfortable temperature (60-67°F/15-19°C is ideal)? Make a plan to address any issues."
          },
          {
            title: "Evening Routine Design",
            instructions: "Create a 30-minute pre-sleep routine that signals to your body it's time to wind down. Include relaxing activities like reading, gentle stretching, or a warm bath/shower. Avoid screens during this time."
          }
        ]
      },
      {
        title: "Managing Racing Thoughts",
        duration: "10 minutes",
        content: `One of the most common barriers to sleep is a mind that won't quiet down. Racing thoughts, worries about tomorrow, or rehashing the day's events can keep you awake long after you've gone to bed.

Cognitive techniques can help manage these thoughts and create mental space for sleep to occur. The goal isn't to force sleep (which paradoxically makes it harder) but to create conditions where sleep can naturally arise.

Henry note: Racing thoughts at bedtime are often amplified versions of daytime stress. Notice if there are particular themes to your nighttime thinking.`,
        exercises: [
          {
            title: "Worry Time Practice",
            instructions: "Schedule a 15-minute 'worry time' earlier in the evening. Write down all concerns and possible next steps. If worries arise at bedtime, remind yourself they're noted for tomorrow."
          },
          {
            title: "Thought Diffusion Technique",
            instructions: "When racing thoughts occur, imagine them as leaves on a stream flowing away from you, or clouds passing in the sky. Notice them without trying to change or engage with them."
          }
        ]
      },
      {
        title: "Sleep-Promoting Habits Throughout the Day",
        duration: "10 minutes",
        content: `What you do during the day significantly impacts your sleep at night. From morning light exposure to evening relaxation, daily habits play a crucial role in regulating your sleep-wake cycle.

These strategies work by reinforcing your circadian rhythm, managing the hormones that control alertness and sleepiness, and creating a healthy relationship with sleep.

Henry note: Consistency is key with sleep habits. Your body thrives on regularity, so try to maintain similar sleep and wake times even on weekends.`,
        exercises: [
          {
            title: "Daylight Exposure Plan",
            instructions: "Plan to get at least 30 minutes of natural daylight exposure within the first hour of waking. If that's not possible (especially in winter months), consider a light therapy lamp."
          },
          {
            title: "Sleep Schedule Adjustment",
            instructions: "Identify your ideal sleep and wake times based on your natural tendencies and responsibilities. Create a plan to gradually shift your current schedule (by 15-30 minutes per night) until you reach your target times."
          }
        ]
      }
    ]
  },
  {
    id: "cognitive-reframing",
    title: "Cognitive Reframing",
    description: "Learn to identify negative thought patterns and transform them into more balanced perspectives. Powerful techniques from cognitive behavioral therapy.",
    icon: Lightbulb,
    color: "bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24]",
    duration: "45 minutes",
    sections: [
      {
        title: "Understanding Thought Patterns",
        duration: "12 minutes",
        content: `Our thoughts powerfully influence how we feel and behave. Yet many of us are unaware of the habitual thought patterns that color our interpretation of events and shape our emotional experiences.

Cognitive reframing is based on the premise that it's not events themselves that cause our emotional reactions, but rather our interpretations of those events. By becoming aware of and shifting these interpretations, we can change our emotional experiences.

Henry note: Becoming aware of your thoughts takes practice. Many of our thought patterns are so habitual that they feel like objective reality rather than interpretations.`,
        exercises: [
          {
            title: "Thought Awareness Practice",
            instructions: "For the next hour, pause every 15 minutes and notice what you're thinking. Write down your thoughts without judging them. At the end of the hour, review what you wrote. What themes do you notice?"
          },
          {
            title: "Emotional Trigger Tracking",
            instructions: "Think of a recent situation that triggered a strong emotional response. Write down: 1) What happened (just the facts), 2) What you thought about the situation, and 3) How you felt as a result of those thoughts."
          }
        ]
      },
      {
        title: "Identifying Cognitive Distortions",
        duration: "12 minutes",
        content: `Cognitive distortions are specific patterns of thinking that are inaccurate, usually negative, and reinforce negative emotions. These thought patterns often happen automatically and can become so habitual that they seem like truth.

Learning to recognize these common distortions is the first step to changing them. Some examples include all-or-nothing thinking, catastrophizing, mind reading, emotional reasoning, and overgeneralization.

Henry note: We all engage in cognitive distortions sometimes. The goal isn't to eliminate them completely but to recognize when they're happening and reduce their influence.`,
        exercises: [
          {
            title: "Distortion Detective",
            instructions: "Review the list of common cognitive distortions. For each type, try to identify a recent example from your own thinking. Write down the situation, the distorted thought, and which type of distortion it represents."
          },
          {
            title: "Thought Record",
            instructions: "Create a three-column thought record with the headings: Situation, Automatic Thought, and Distortion Type. Over the next day, record at least 5 instances where you notice an automatic negative thought."
          }
        ]
      },
      {
        title: "Challenging and Reframing Thoughts",
        duration: "12 minutes",
        content: `Once you can identify distorted thoughts, the next step is learning to challenge and reframe them. This doesn't mean replacing negative thoughts with unrealistically positive ones, but rather developing more balanced and evidence-based perspectives.

Effective reframing involves questioning the evidence for your thoughts, considering alternative interpretations, and adopting a more compassionate stance toward yourself and others.

Henry note: Reframing takes practice and won't always feel natural at first. The goal is to create enough space between your thoughts and reactions that you can choose how to respond.`,
        exercises: [
          {
            title: "Evidence Examination",
            instructions: "Take one negative thought from your thought record. List all the evidence that supports this thought, and then all the evidence that contradicts it. Is the thought as accurate as it initially seemed?"
          },
          {
            title: "Perspective Shift",
            instructions: "Choose a situation you're struggling with. Write down your current perspective. Then write how a supportive friend might view the same situation. What's different about these perspectives?"
          }
        ]
      },
      {
        title: "Integrating Reframing into Daily Life",
        duration: "9 minutes",
        content: `Cognitive reframing is a skill that improves with practice. As you become more adept at recognizing and challenging distorted thoughts, you'll likely notice improvements in your mood and resilience in the face of challenges.

The ultimate goal is not to control every thought, but to develop a more flexible thinking style that allows you to respond to situations based on a realistic assessment rather than automatic negative interpretations.

Henry note: Be patient with yourself as you develop this skill. Like any new habit, it takes time and consistent practice before reframing becomes more automatic.`,
        exercises: [
          {
            title: "Daily Reframing Practice",
            instructions: "Set a reminder to practice reframing at least once each day. When the reminder goes off, identify a recent negative thought, challenge it, and create a more balanced alternative."
          },
          {
            title: "Success Celebration",
            instructions: "At the end of each day, write down one instance where you successfully reframed a negative thought. Note how this reframing affected your emotions and behaviors in the situation."
          }
        ]
      }
    ]
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description: "Harness the power of gratitude to increase happiness and resilience. Learn simple daily practices that create profound shifts in perspective.",
    icon: Heart,
    color: "bg-[#EC4899]/10 border-[#EC4899]/30 text-[#EC4899]",
    duration: "30 minutes",
    sections: [
      {
        title: "The Science of Gratitude",
        duration: "8 minutes",
        content: `Gratitude is more than just saying "thank you" - it's a mental state and emotional orientation that has been extensively studied by psychologists. Research shows that regular gratitude practice can lead to increased happiness, reduced depression, better sleep, stronger relationships, and even improved physical health.

These benefits occur because gratitude helps shift our attention from what's lacking or negative in our lives to what's present and positive. This shift in focus actually changes neural pathways in our brain over time.

Henry note: Gratitude doesn't mean ignoring difficulties or challenges. It's about expanding your awareness to include positive aspects of life alongside the challenges.`,
        exercises: [
          {
            title: "Gratitude Baseline Assessment",
            instructions: "Rate your current level of gratitude on a scale of 1-10. Then list 3 things you're grateful for right now, without overthinking. Notice how easy or difficult this exercise feels."
          },
          {
            title: "Gratitude Observation",
            instructions: "For the next 10 minutes, look around your immediate environment and identify 5 things you're grateful for that you might normally take for granted (e.g., clean water, electricity, a comfortable chair)."
          }
        ]
      },
      {
        title: "Gratitude Journaling Techniques",
        duration: "8 minutes",
        content: `One of the most effective ways to cultivate gratitude is through regular journaling. This practice helps train your brain to notice and appreciate positive experiences, creating a sustainable shift in perspective over time.

To get the most benefit from gratitude journaling, focus on depth rather than breadth. Writing in detail about one thing you're grateful for can be more impactful than listing many things without reflection.

Henry note: The key to effective gratitude journaling is specificity and freshness. Try to avoid repeating the same things and really explore why each thing matters to you.`,
        exercises: [
          {
            title: "Detailed Gratitude Entry",
            instructions: "Choose one thing you're grateful for today. Write 5-7 sentences about it, including: what it is, why you're grateful for it, how it affects your life, and what your life would be like without it."
          },
          {
            title: "Unexpected Gratitude",
            instructions: "Write about something you're grateful for that was unexpected or that you couldn't have predicted a year ago. How has this unexpected gift enhanced your life?"
          }
        ]
      },
      {
        title: "Expressing Gratitude to Others",
        duration: "8 minutes",
        content: `Expressing gratitude isn't just beneficial for the recipient—it significantly boosts wellbeing for the person expressing thanks as well. Sharing your appreciation helps strengthen relationships and create positive social connections, which are crucial for mental health.

Research by Dr. Martin Seligman found that writing and delivering a "gratitude letter" to someone who had never been properly thanked for their kindness produced the largest positive effect on happiness of any intervention they studied.

Henry note: Expressing gratitude may feel vulnerable or uncomfortable at first, especially if it's not common in your family or cultural background. Start with whatever level feels manageable.`,
        exercises: [
          {
            title: "Gratitude Letter Planning",
            instructions: "Think of someone who has positively impacted your life but whom you've never properly thanked. Make notes about what specifically they did, how it affected you, and why you appreciate their actions."
          },
          {
            title: "Daily Thank You Practice",
            instructions: "Challenge yourself to express specific, genuine appreciation to at least one person each day for the next week. Note how it feels both to express gratitude and to see the other person's reaction."
          }
        ]
      },
      {
        title: "Overcoming Gratitude Obstacles",
        duration: "6 minutes",
        content: `While gratitude practice sounds simple, various obstacles can make it challenging. These might include a tendency toward negativity bias (our brains' natural inclination to focus on threats and problems), comparison thinking, or genuine difficult life circumstances.

Understanding these obstacles helps us work with them compassionately rather than becoming discouraged when gratitude doesn't come easily.

Henry note: If you're going through a particularly difficult time, gratitude practice might feel forced. It's okay to acknowledge this and start very small, perhaps with basic elements like having shelter or a moment of peace.`,
        exercises: [
          {
            title: "Gratitude Barriers Reflection",
            instructions: "Identify what makes gratitude practice difficult for you personally. Is it forgetting to do it? Feeling like it's insincere? Struggling to notice positive things? Write about your specific challenges."
          },
          {
            title: "Micro-Gratitude Practice",
            instructions: "For those times when gratitude feels impossible, develop a list of 'micro-gratitudes' - very small things you can still appreciate even in difficult moments (e.g., a comfortable pillow, a moment without pain, a favorite song)."
          }
        ]
      }
    ]
  },
  {
    id: "self-compassion",
    title: "Self-Compassion Skills",
    description: "Break free from self-criticism and develop a kinder relationship with yourself. Learn to treat yourself with the same compassion you'd offer a good friend.",
    icon: Smile,
    color: "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]",
    duration: "45 minutes",
    sections: [
      {
        title: "Understanding Self-Compassion",
        duration: "10 minutes",
        content: `Self-compassion involves treating yourself with the same kindness and understanding that you would offer to a good friend. It's not about self-pity, self-indulgence, or lowering your standards—rather, it's about relating to yourself in a healthier, more supportive way.

According to Dr. Kristin Neff, self-compassion has three core components: self-kindness versus self-judgment, common humanity versus isolation, and mindfulness versus over-identification with thoughts and emotions.

Henry note: Many people find self-compassion more difficult than showing compassion to others. Notice your own attitudes about treating yourself kindly.`,
        exercises: [
          {
            title: "Self-Compassion Assessment",
            instructions: "Reflect on how you typically respond to your own mistakes, failures, or suffering. Do you criticize yourself harshly? Ignore painful feelings? Or respond with understanding? Write about your patterns."
          },
          {
            title: "Compassionate Observer Exercise",
            instructions: "Think of a recent situation where you struggled or made a mistake. First, write about it from your usual perspective. Then rewrite it from the perspective of a deeply compassionate observer who sees your full humanity."
          }
        ]
      },
      {
        title: "Self-Kindness Practices",
        duration: "12 minutes",
        content: `Self-kindness involves actively comforting ourselves and responding to our struggles with care rather than harsh criticism. When we practice self-kindness, we recognize that being imperfect and experiencing difficulties are inevitable parts of life.

Developing self-kindness often requires intentionally changing habitual patterns of self-criticism that may have developed over many years. With practice, more supportive inner dialogue can become your new default.

Henry note: Self-kindness might feel unfamiliar or even uncomfortable at first. Start with small steps and notice any resistance that arises.`,
        exercises: [
          {
            title: "Supportive Touch",
            instructions: "When you notice you're feeling stressed or self-critical, try placing a hand on your heart, holding your own hand, or giving yourself a gentle hug. Notice how this physical gesture of support affects your emotional state."
          },
          {
            title: "Compassionate Phrases",
            instructions: "Develop 3-5 phrases that express kindness toward yourself in difficult moments. Examples include 'This is really hard right now' or 'I'm doing the best I can.' Practice saying these phrases to yourself during minor daily challenges."
          }
        ]
      },
      {
        title: "Common Humanity",
        duration: "12 minutes",
        content: `The common humanity aspect of self-compassion involves recognizing that suffering and personal failure are part of the shared human experience. When we struggle, we often feel isolated, as if we're the only ones failing or experiencing difficulty.

Remembering our common humanity helps us feel connected rather than isolated in our suffering. All humans are imperfect, and all humans experience pain and failure at times.

Henry note: Social media can intensify feelings of isolation by showing curated highlights of others' lives. Remember that everyone experiences struggles, even if they're not visible.`,
        exercises: [
          {
            title: "Shared Experience Reflection",
            instructions: "Think of a personal struggle you're facing. Write about how this type of struggle is part of the human experience. Consider how many others might be experiencing something similar right now."
          },
          {
            title: "Connection in Difficulty",
            instructions: "The next time you make a mistake or face a challenge, pause and silently say to yourself: 'This is a moment of suffering. Suffering is part of life. May I be kind to myself in this moment.'"
