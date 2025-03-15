
import { 
  Briefcase, 
  Users, 
  Clock, 
  MessageSquare, 
  Brain, 
  Activity, 
  Smile, 
  Coffee,
  Calendar,
  Zap
} from "lucide-react";

export const workplaceWorkshopData = [
  {
    id: "work-life-balance",
    title: "Work-Life Balance Mastery",
    description: "Learn practical strategies to maintain a healthy balance between work demands and personal life",
    icon: Clock,
    color: "bg-[#9b87f5]/10 text-[#9b87f5]",
    duration: "45 minutes",
    sections: [
      {
        title: "Understanding Work-Life Balance",
        duration: "15 min",
        content: "Work-life balance isn't just a buzzword—it's essential for your well-being and productivity. In this session, we'll explore what true balance looks like and why it matters.\n\nWe'll discuss how blurred boundaries between work and personal life can lead to burnout, and identify the warning signs of an unhealthy balance.",
        exercises: [
          {
            title: "Time Audit Exercise",
            instructions: "Track how you spend your time for one workday. Note work tasks, breaks, personal activities, and transitions. Identify where boundaries are clear or blurred."
          },
          {
            title: "Values Assessment",
            instructions: "List your top 5 personal and professional values. How much time do you currently devote to each? Are there any significant misalignments between your values and how you spend your time?"
          }
        ]
      },
      {
        title: "Setting Boundaries",
        duration: "15 min",
        content: "Clear boundaries are essential for maintaining work-life balance. In this section, we'll explore how to set and maintain healthy boundaries with colleagues, managers, and even yourself.\n\nWe'll practice communication techniques for assertively expressing boundaries, and develop strategies for maintaining them even under pressure.",
        exercises: [
          {
            title: "Boundary Visualization",
            instructions: "Imagine your ideal work-life boundaries. When does work start and end? What work communications are acceptable after hours? Write down your boundary vision."
          },
          {
            title: "Boundary Script Practice",
            instructions: "Craft and practice 2-3 scripts for communicating boundaries professionally. Example: 'I'm not available after 6pm, but I'll address this first thing tomorrow morning.'"
          }
        ]
      },
      {
        title: "Creating Daily Balance Practices",
        duration: "15 min",
        content: "Small daily practices can significantly improve your work-life balance. We'll explore practical techniques you can implement immediately, even in high-pressure workplace environments.\n\nLearn how micro-breaks, transition rituals, and mindful scheduling can transform your workday experience and overall wellbeing.",
        exercises: [
          {
            title: "Design Your Transition Ritual",
            instructions: "Create a 5-minute ritual to mark the boundary between work and personal time. This might include changing clothes, a short walk, meditation, or another activity that signals the transition."
          },
          {
            title: "Balance Action Plan",
            instructions: "Develop three specific, achievable actions you'll take in the next week to improve your work-life balance. Schedule these on your calendar before leaving this workshop."
          }
        ]
      }
    ]
  },
  {
    id: "workplace-stress-management",
    title: "Stress Management at Work",
    description: "Develop practical techniques to identify, manage and reduce workplace stress",
    icon: Activity,
    color: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
    duration: "50 minutes",
    sections: [
      {
        title: "Identifying Your Stress Triggers",
        duration: "15 min",
        content: "Workplace stress affects everyone differently. In this section, we'll help you identify your unique stress triggers and response patterns.\n\nUnderstanding your personal stress profile is the first step toward effective management.",
        exercises: [
          {
            title: "Workplace Stress Inventory",
            instructions: "List situations that trigger stress at work. Rate each from 1-10 and note physical/emotional responses. Look for patterns in your highest-rated triggers."
          },
          {
            title: "Body Stress Mapping",
            instructions: "Draw a human outline and mark where you feel stress physically. Note sensations (tension, pain, etc.) that signal stress is building in your body."
          }
        ]
      },
      {
        title: "Quick Stress Relief Techniques",
        duration: "20 min",
        content: "Learn evidence-based techniques you can use right at your desk to quickly reduce stress levels. We'll practice breathing exercises, progressive muscle relaxation, and grounding techniques you can use discreetly even in open office environments.",
        exercises: [
          {
            title: "4-7-8 Breathing Practice",
            instructions: "Practice this breathing pattern: Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 4 times. Notice how your body feels afterward."
          },
          {
            title: "5-Minute Reset",
            instructions: "Design a 5-minute stress reset routine combining 2-3 techniques from the workshop that work best for you. Create a trigger (like a specific time or sign of stress) to initiate your reset."
          }
        ]
      },
      {
        title: "Building Stress Resilience",
        duration: "15 min",
        content: "Beyond managing stress in the moment, we'll explore strategies to build your overall resilience to workplace stressors. Learn how sleep, nutrition, exercise, and social connection contribute to your capacity to handle stress.\n\nWe'll also discuss how to advocate for workplace changes that reduce unnecessary stress for everyone.",
        exercises: [
          {
            title: "Resilience Inventory",
            instructions: "Assess your current resilience practices in sleep, nutrition, exercise, and social connection. Identify one area to strengthen this week with a specific action."
          },
          {
            title: "Stress-Proofing Plan",
            instructions: "Create a personalized plan to prepare for an upcoming stressful work situation. Include before, during, and after stress management strategies."
          }
        ]
      }
    ]
  },
  {
    id: "effective-communication",
    title: "Effective Workplace Communication",
    description: "Enhance communication skills to improve workplace relationships and reduce misunderstandings",
    icon: MessageSquare,
    color: "bg-[#D946EF]/10 text-[#D946EF]",
    duration: "60 minutes",
    sections: [
      {
        title: "Active Listening",
        duration: "20 min",
        content: "Active listening is perhaps the most important yet underdeveloped communication skill in the workplace. In this section, we'll practice techniques to truly hear and understand colleagues, rather than just waiting for our turn to speak.\n\nLearn how to demonstrate that you're listening, ask clarifying questions, and summarize what you've heard to confirm understanding.",
        exercises: [
          {
            title: "Listening Without Planning",
            instructions: "Partner with someone and practice truly listening without planning your response. Notice how often your mind wants to prepare what to say next instead of fully listening."
          },
          {
            title: "Paraphrase Practice",
            instructions: "After someone shares an idea or concern, practice paraphrasing what you heard before responding. This exercise builds the habit of confirming understanding before moving forward."
          }
        ]
      },
      {
        title: "Clear and Compassionate Expression",
        duration: "20 min",
        content: "Learn how to express your thoughts, needs, and concerns clearly while maintaining respect and empathy for others. We'll explore non-violent communication techniques and practice framing difficult messages in constructive ways.",
        exercises: [
          {
            title: "Reframing Exercise",
            instructions: "Take three potentially negative workplace communications and reframe them using the template: Observation + Impact + Request. Example: 'I notice the meeting ran 15 minutes over (observation), which meant I was late for my next appointment (impact). Could we set a timer for future meetings? (request)'"
          },
          {
            title: "Emotion-Naming Practice",
            instructions: "Practice naming your emotions specifically during workplace interactions. Instead of 'I'm upset,' try 'I'm feeling frustrated because...' or 'I'm concerned that...'"
          }
        ]
      },
      {
        title: "Navigating Difficult Conversations",
        duration: "20 min",
        content: "Even with excellent communication skills, difficult conversations are inevitable in the workplace. In this section, we'll develop strategies for approaching challenging discussions with confidence and emotional intelligence.\n\nLearn how to prepare for difficult conversations, manage emotional reactions, and work toward constructive outcomes.",
        exercises: [
          {
            title: "Conversation Preparation",
            instructions: "For an upcoming difficult conversation, complete this preparation: What's the core issue? What's your goal? What might the other person's perspective be? What emotions might arise? What's your plan for managing them?"
          },
          {
            title: "Feedback Roleplay",
            instructions: "Practice giving constructive feedback using the situation-behavior-impact model, followed by a specific request or question. Have your partner evaluate how it felt to receive the feedback."
          }
        ]
      }
    ]
  },
  {
    id: "mindfulness-at-work",
    title: "Mindfulness in the Workplace",
    description: "Learn practical mindfulness techniques to improve focus, reduce stress, and enhance workplace well-being",
    icon: Brain,
    color: "bg-[#0EA5E9]/10 text-[#0EA5E9]",
    duration: "45 minutes",
    sections: [
      {
        title: "Introduction to Workplace Mindfulness",
        duration: "15 min",
        content: "Mindfulness isn't just for yoga studios—it's a powerful tool for the modern workplace. In this section, we'll explore what mindfulness means in a work context and review the evidence for its benefits in focus, stress reduction, and cognitive performance.\n\nLearn how mindfulness practice can transform your workday experience and improve both wellbeing and productivity.",
        exercises: [
          {
            title: "Attention Check-In",
            instructions: "For one minute, focus completely on your breathing. When your mind wanders (which is normal), gently return focus to your breath. Notice how often your attention shifts away and what it shifts toward."
          },
          {
            title: "Mindful Moment Inventory",
            instructions: "Identify 3-5 regular moments in your workday that could become mindfulness cues (opening your computer, waiting for a meeting to start, etc). These will become opportunities for brief mindfulness practice."
          }
        ]
      },
      {
        title: "Micro-Mindfulness Practices",
        duration: "15 min",
        content: "You don't need long meditation sessions to benefit from mindfulness at work. In this section, we'll learn short, practical mindfulness techniques you can integrate seamlessly into your workday.\n\nPractice 30-second to 3-minute exercises you can use between tasks, before meetings, or during challenging moments.",
        exercises: [
          {
            title: "STOP Practice",
            instructions: "Practice the STOP technique: Stop, Take a breath, Observe (thoughts, feelings, sensations), and Proceed. Use this between tasks or whenever you feel stressed."
          },
          {
            title: "Sensory Anchor",
            instructions: "Choose a sensory anchor for mindfulness at work—a specific sound, object, or sensation that reminds you to return to the present moment. Practice using it throughout your day."
          }
        ]
      },
      {
        title: "Mindful Communication and Interaction",
        duration: "15 min",
        content: "Mindfulness transforms not just how you feel at work, but how you interact with others. In this section, we'll explore mindful listening, speaking, and collaboration techniques.\n\nLearn how mindful awareness can improve meetings, reduce conflicts, and enhance team dynamics.",
        exercises: [
          {
            title: "Single-Tasking Challenge",
            instructions: "Practice giving one task your complete attention for 20 minutes without multitasking. Notice the quality of your work and your experience compared to multitasking."
          },
          {
            title: "Mindful Meeting Commitment",
            instructions: "Choose one specific mindful behavior to practice in your next three meetings (e.g., not checking email, truly listening without planning responses, noticing when your mind wanders). Record your observations."
          }
        ]
      }
    ]
  },
  {
    id: "building-psychological-safety",
    title: "Building Psychological Safety",
    description: "Develop strategies to create a psychologically safe environment where team members can take risks without fear",
    icon: Users,
    color: "bg-[#F97316]/10 text-[#F97316]",
    duration: "55 minutes",
    sections: [
      {
        title: "Understanding Psychological Safety",
        duration: "15 min",
        content: "Psychological safety—the belief that you won't be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes—is the foundation of effective teams. In this section, we'll explore what psychological safety is, why it matters, and how to recognize its presence or absence.\n\nLearn how psychological safety impacts innovation, problem-solving, and workplace mental health.",
        exercises: [
          {
            title: "Safety Assessment",
            instructions: "Rate your current team environment on a scale of 1-10 for psychological safety. Identify specific behaviors or patterns that contribute to your rating."
          },
          {
            title: "Risk Reflection",
            instructions: "Reflect on a time you took an interpersonal risk at work (shared a concern, admitted a mistake, offered a dissenting view). What made it feel safe or unsafe? How did others respond?"
          }
        ]
      },
      {
        title: "Leading for Psychological Safety",
        duration: "20 min",
        content: "Whether you're a formal leader or not, you can influence the psychological safety of your team. In this section, we'll explore specific behaviors that increase safety, including vulnerability, curiosity, and productive responses to mistakes.\n\nLearn how to model and encourage psychological safety through your everyday actions and words.",
        exercises: [
          {
            title: "Curiosity Practice",
            instructions: "Develop five curious questions you could ask in your next team discussion to demonstrate interest in others' perspectives. Example: 'What aspects of this might I be missing?' or 'What's your thinking behind that approach?'"
          },
          {
            title: "Reframing Failure",
            instructions: "Choose a recent mistake or setback. Practice reframing it as a learning opportunity by answering: What went well? What didn't work? What will I/we do differently next time?"
          }
        ]
      },
      {
        title: "Creating Safety in Team Practices",
        duration: "20 min",
        content: "Beyond individual behavior, team structures and practices significantly impact psychological safety. In this section, we'll explore how to design meetings, decision-making processes, and feedback systems that foster safety and inclusion.\n\nLearn practical ways to embed psychological safety into the everyday operations of your team.",
        exercises: [
          {
            title: "Meeting Redesign",
            instructions: "Choose one recurring meeting and redesign one aspect to increase psychological safety. Example: Starting with a check-in question, rotating facilitation, or creating multiple ways to contribute ideas."
          },
          {
            title: "Safety-Building Commitment",
            instructions: "Identify one specific action you'll take in the next week to increase psychological safety for yourself or others on your team. Be specific about when and how you'll implement this action."
          }
        ]
      }
    ]
  },
  {
    id: "positive-workplace-relationships",
    title: "Building Positive Workplace Relationships",
    description: "Develop strategies for creating and maintaining positive, supportive relationships with colleagues",
    icon: Smile,
    color: "bg-[#7E69AB]/10 text-[#7E69AB]",
    duration: "50 minutes",
    sections: [
      {
        title: "The Value of Workplace Relationships",
        duration: "15 min",
        content: "Strong workplace relationships aren't just pleasant—they're essential for well-being, productivity, and career development. In this section, we'll explore the research on how workplace relationships impact mental health and job satisfaction.\n\nUnderstand the difference between toxic, transactional, and transformative workplace relationships.",
        exercises: [
          {
            title: "Relationship Mapping",
            instructions: "Create a visual map of your workplace relationships. Identify supportive connections, challenging relationships, and potential relationships you'd like to develop."
          },
          {
            title: "Support Inventory",
            instructions: "Reflect on how your workplace relationships provide different types of support: informational, instrumental, emotional, and belonging. Where are you well-supported and where might you need more connection?"
          }
        ]
      },
      {
        title: "Building Connection Across Differences",
        duration: "20 min",
        content: "Workplaces bring together people with diverse backgrounds, working styles, and personalities. In this section, we'll explore how to build meaningful connections across differences, moving beyond surface-level interactions to authentic relationship-building.\n\nLearn techniques for finding common ground, appreciating differences, and navigating potential misunderstandings.",
        exercises: [
          {
            title: "Curiosity Conversation",
            instructions: "Identify a colleague with whom you'd like to build a stronger connection. Prepare 3-5 genuine questions to learn more about their perspectives, interests, or experiences. Schedule a coffee or lunch to have this conversation."
          },
          {
            title: "Appreciation Practice",
            instructions: "Practice offering specific, genuine appreciation to three different colleagues this week. Focus on their unique contributions, qualities, or impact rather than generic compliments."
          }
        ]
      },
      {
        title: "Maintaining Healthy Boundaries",
        duration: "15 min",
        content: "Positive workplace relationships require healthy boundaries. In this section, we'll explore how to maintain professional boundaries while still building authentic connections with colleagues.\n\nLearn how to navigate common boundary challenges like work-life separation, oversharing, and managing different relationship expectations.",
        exercises: [
          {
            title: "Boundary Assessment",
            instructions: "Reflect on your current workplace relationship boundaries. Where are they working well? Where do you feel your boundaries might need strengthening or clarification?"
          },
          {
            title: "Communication Script Practice",
            instructions: "Draft and practice specific language for maintaining a boundary while preserving the relationship. Example: 'I value our working relationship, and I need to limit after-hours communications to urgent matters only.'"
          }
        ]
      }
    ]
  },
  {
    id: "burnout-prevention",
    title: "Burnout Prevention Strategies",
    description: "Learn to recognize and prevent burnout through sustainable work practices and self-care",
    icon: Coffee,
    color: "bg-[#D6BCFA]/10 text-[#D6BCFA]",
    duration: "60 minutes",
    sections: [
      {
        title: "Understanding Burnout",
        duration: "20 min",
        content: "Burnout is more than just feeling tired—it's a state of chronic workplace stress characterized by exhaustion, cynicism, and reduced efficacy. In this section, we'll explore the causes, symptoms, and stages of burnout, with special attention to how it manifests in different roles and personalities.\n\nLearn to recognize early warning signs of burnout in yourself and others.",
        exercises: [
          {
            title: "Burnout Self-Assessment",
            instructions: "Complete a burnout self-assessment questionnaire to understand where you currently fall on the burnout spectrum and which dimensions (exhaustion, cynicism, inefficacy) are most prominent for you."
          },
          {
            title: "Personal Warning Signs",
            instructions: "Identify your unique early warning signs of burnout across four domains: physical (e.g., sleep changes), emotional (e.g., irritability), cognitive (e.g., difficulty concentrating), and behavioral (e.g., withdrawal from colleagues)."
          }
        ]
      },
      {
        title: "Workload Management and Boundaries",
        duration: "20 min",
        content: "Unsustainable workloads and unclear boundaries are primary drivers of burnout. In this section, we'll develop practical strategies for managing workload, setting boundaries, and negotiating realistic expectations.\n\nLearn techniques for prioritization, delegation, and communicating capacity constraints professionally.",
        exercises: [
          {
            title: "Workload Inventory",
            instructions: "List all your current work responsibilities and categorize them by importance/impact and urgency. Identify items that could be delegated, delayed, or dropped to create a more sustainable workload."
          },
          {
            title: "Boundary Communication Plan",
            instructions: "Create specific language for communicating boundaries around workload, hours, or availability. Practice these conversations with a partner during the workshop."
          }
        ]
      },
      {
        title: "Recovery and Renewal Practices",
        duration: "20 min",
        content: "Preventing burnout requires intentional recovery practices. In this section, we'll explore science-backed approaches to recovery during the workday, evenings, weekends, and vacations.\n\nLearn how different types of recovery activities—physical, cognitive, emotional, and social—help counteract different aspects of workplace strain.",
        exercises: [
          {
            title: "Recovery Rhythm Design",
            instructions: "Design your ideal recovery rhythm, including micro-breaks during the workday, evening wind-down routines, weekend rejuvenation activities, and vacation planning that ensures true disconnection."
          },
          {
            title: "Energy Audit and Plan",
            instructions: "Identify your key energy drains at work and matching energy renewal strategies for each. Create a specific plan to implement at least one renewal practice daily in the coming week."
          }
        ]
      }
    ]
  },
  {
    id: "career-wellbeing",
    title: "Career Wellbeing & Development",
    description: "Align your career path with personal values and strengths for greater workplace fulfillment",
    icon: Briefcase,
    color: "bg-[#6E59A5]/10 text-[#6E59A5]",
    duration: "55 minutes",
    sections: [
      {
        title: "Career Wellbeing Foundations",
        duration: "15 min",
        content: "Career wellbeing goes beyond advancement or compensation—it's about finding meaning, using your strengths, and aligning work with your values. In this section, we'll explore the components of career wellbeing and how they contribute to overall mental health.\n\nLearn how to assess your current career wellbeing and identify areas for growth.",
        exercises: [
          {
            title: "Energizers and Drainers",
            instructions: "Track your work activities for one week, noting which tasks energize you and which drain you. Look for patterns related to your strengths, values, and interests."
          },
          {
            title: "Values Alignment Check",
            instructions: "Identify your top 5 personal values. Rate how well your current role allows you to express and fulfill each value on a scale of 1-10."
          }
        ]
      },
      {
        title: "Crafting Your Role",
        duration: "20 min",
        content: "Even within existing positions, there are often opportunities to shape your role to better align with your strengths and interests. In this section, we'll explore the concept of job crafting and how to implement it thoughtfully.\n\nLearn strategies for expanding fulfilling responsibilities, minimizing draining tasks, and finding new meaning in your current work.",
        exercises: [
          {
            title: "Job Crafting Vision",
            instructions: "Imagine your ideal version of your current role. What tasks would you do more of? Less of? How would relationships or perceptions change? Create a concrete vision of this crafted role."
          },
          {
            title: "Crafting Conversation Plan",
            instructions: "Prepare for a conversation with your manager about job crafting opportunities. Frame these changes in terms of organizational benefit as well as personal fulfillment."
          }
        ]
      },
      {
        title: "Growth Mindset and Career Development",
        duration: "20 min",
        content: "A growth mindset—the belief that you can develop your abilities through dedication and hard work—is essential for career wellbeing. In this section, we'll explore how to cultivate a growth mindset and apply it to your career development.\n\nLearn to view challenges as opportunities, embrace feedback, and create a sustainable development plan aligned with your values.",
        exercises: [
          {
            title: "Development Priorities",
            instructions: "Based on your values, strengths, and career vision, identify 2-3 development priorities for the next six months. Create specific, measurable learning goals for each priority."
          },
          {
            title: "Learning Ecosystem",
            instructions: "Map out your learning ecosystem: What resources, relationships, experiences, and reflective practices will support your development goals? Create a specific plan to strengthen this ecosystem."
          }
        ]
      }
    ]
  },
  {
    id: "emotional-intelligence-workplace",
    title: "Emotional Intelligence at Work",
    description: "Develop emotional awareness and regulation skills to navigate workplace relationships effectively",
    icon: Zap,
    color: "bg-[#33C3F0]/10 text-[#33C3F0]",
    duration: "50 minutes",
    sections: [
      {
        title: "Self-Awareness and Emotional Literacy",
        duration: "15 min",
        content: "Emotional intelligence begins with the ability to recognize and name your own emotions with precision. In this section, we'll expand your emotional vocabulary and develop techniques for recognizing emotional patterns in the workplace.\n\nLearn how emotions provide valuable data about your needs, boundaries, and values at work.",
        exercises: [
          {
            title: "Emotion Tracking",
            instructions: "For one week, set 3-5 daily reminders to pause and identify your emotions in that moment. Use a nuanced emotion vocabulary beyond just 'good' or 'bad.' Note what triggered these emotions."
          },
          {
            title: "Physical Sensation Mapping",
            instructions: "Create a personal map of how different emotions manifest physically for you. Where do you feel anxiety, excitement, frustration, or pride in your body? This awareness helps with earlier recognition."
          }
        ]
      },
      {
        title: "Emotional Regulation Strategies",
        duration: "20 min",
        content: "The workplace often triggers strong emotions that need to be managed skillfully. In this section, we'll develop practical strategies for regulating emotions without suppressing them—allowing you to respond thoughtfully rather than react automatically.\n\nLearn techniques for managing difficult emotions like frustration, anxiety, and disappointment in professional contexts.",
        exercises: [
          {
            title: "Trigger-Pause-Response",
            instructions: "Identify your top 3 emotional triggers at work. For each, create a specific pause strategy (deep breath, count to 10, etc.) and an intentional response option to replace automatic reactions."
          },
          {
            title: "Regulation Toolkit",
            instructions: "Build a personalized toolkit of 5-7 regulation strategies that work for you, categorized by when they're most useful: preventative (before trigger), in-the-moment (during), and recovery (after)."
          }
        ]
      },
      {
        title: "Emotional Intelligence in Relationships",
        duration: "15 min",
        content: "Emotional intelligence extends beyond self-management to how we interact with others. In this section, we'll explore empathy, emotional expression, and navigating emotionally charged workplace situations.\n\nLearn how to recognize others' emotional states, respond with empathy, and communicate your own emotions constructively.",
        exercises: [
          {
            title: "Empathy Practice",
            instructions: "Choose a challenging workplace relationship. Practice perspective-taking by listing what this person might be feeling, what pressures or contexts might be influencing them, and what needs they might be trying to meet."
          },
          {
            title: "Constructive Expression",
            instructions: "Practice expressing a difficult emotion using the format: 'When [situation], I feel [emotion] because [need/value]. What I'd like is [request].' Apply this to a current workplace challenge."
          }
        ]
      }
    ]
  },
  {
    id: "workplace-wellness-planning",
    title: "Personal Wellness Planning",
    description: "Create a customized wellness plan to support your mental health within your work context",
    icon: Calendar,
    color: "bg-[#7E5BA6]/10 text-[#7E5BA6]",
    duration: "60 minutes",
    sections: [
      {
        title: "Assessing Your Wellbeing",
        duration: "20 min",
        content: "Creating an effective wellness plan begins with understanding your current state and needs. In this section, we'll conduct a holistic assessment of your wellbeing across multiple dimensions, identifying both strengths to build on and areas for growth.\n\nLearn to recognize patterns and connections between different aspects of your wellbeing and how they influence your work experience.",
        exercises: [
          {
            title: "Wellness Wheel Assessment",
            instructions: "Complete the Wellness Wheel assessment, rating your current state in eight dimensions: emotional, physical, social, intellectual, occupational, financial, environmental, and spiritual wellbeing."
          },
          {
            title: "Impact Analysis",
            instructions: "For your two lowest-rated dimensions, analyze how they impact your work experience, performance, and satisfaction. For your two highest-rated dimensions, identify how they currently support your workplace wellbeing."
          }
        ]
      },
      {
        title: "Creating Your Wellness Vision",
        duration: "15 min",
        content: "A compelling wellness vision provides direction and motivation for your wellness journey. In this section, we'll develop a personalized vision of what thriving at work looks like for you.\n\nLearn to align your wellness vision with your values, strengths, and overall life vision.",
        exercises: [
          {
            title: "Wellness Vision Statement",
            instructions: "Write a detailed description of how you want to feel, function, and experience work when at your best. Include physical, emotional, social, and cognitive elements in your vision."
          },
          {
            title: "Values Integration",
            instructions: "Identify 3-5 core values that will guide your wellness journey. For each value, note one specific way you can honor this value through your wellness practices at work."
          }
        ]
      },
      {
        title: "Designing Your Wellness Plan",
        duration: "25 min",
        content: "Translating vision into action requires a structured yet flexible plan. In this section, we'll create a practical wellness plan tailored to your work context, schedule, and personal preferences.\n\nLearn to design sustainable practices, anticipate obstacles, and build accountability into your wellness plan.",
        exercises: [
          {
            title: "SMART Wellness Goals",
            instructions: "Create 2-3 SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) for your priority wellness dimensions. Include a mix of short-term and longer-term goals."
          },
          {
            title: "Weekly Wellness Schedule",
            instructions: "Map wellness practices onto your typical work week. Include daily essentials, workday practices, and boundary-supporting routines for transitions and recovery."
          },
          {
            title: "Obstacle Planning",
            instructions: "Identify potential obstacles to your wellness plan and create specific if-then plans for addressing each one. Example: 'If I can't take my scheduled walk because of weather, then I'll do a 10-minute stretching session indoors instead.'"
          }
        ]
      }
    ]
  }
];
