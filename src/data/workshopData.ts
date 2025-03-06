
import { Brain, MessageCircle, HeartHandshake } from "lucide-react";
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
  }
];
