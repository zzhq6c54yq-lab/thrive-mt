import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { useToast } from "@/hooks/use-toast";
import { type ToastProps } from "@/hooks/use-toast";
import { workshopData } from "@/data/workshopData";

export interface WorksheetContent {
  title: string;
  content: string[];
  exercises: {
    title: string;
    instructions: string;
    reflection?: string[];
    practicalSteps?: string[];
    assessmentTools?: {
      name: string;
      description: string;
      scale?: string[];
    }[];
  }[];
}

// Define comprehensive worksheet content by workshop ID
const worksheetContentMap: Record<string, WorksheetContent> = {
  "mindful-communication": {
    title: "Mindful Communication Intensive Practice Worksheet",
    content: [
      "This intensive worksheet guides you through practical exercises to develop mindful communication skills that can transform your personal and professional relationships.",
      "Each exercise builds on core principles of presence, intentionality, and compassionate engagement in your daily interactions.",
    ],
    exercises: [
      {
        title: "Communication Style Mapping",
        instructions: "Map your primary and secondary communication styles across different contexts and relationships.",
        practicalSteps: [
          "1. Self-Assessment: In the table below, rate yourself on a scale of 1-5 for each communication style in different contexts (work, home, social settings).",
          "2. Pattern Identification: Circle patterns that repeat across contexts. Underline styles that change dramatically between contexts.",
          "3. Impact Analysis: For each identified pattern, describe the impact on your relationships in the spaces provided.",
          "4. Adaptation Planning: For each problematic pattern, develop 3 specific strategies for adjustment using the SMART framework."
        ],
        reflection: [
          "Which communication style serves you best in most situations?",
          "When do you notice your communication style shifting dramatically?",
          "How does stress or fatigue influence your communication patterns?",
          "What one adjustment would most improve your communication effectiveness?"
        ],
        assessmentTools: [
          {
            name: "Communication Style Grid",
            description: "Rate yourself 1-5 on each style (Assertive, Passive, Aggressive, Passive-Aggressive, Empathic) across contexts",
            scale: ["1-Never", "2-Rarely", "3-Sometimes", "4-Often", "5-Always"]
          },
          {
            name: "Impact Assessment Scale",
            description: "For each pattern, rate the impact from -3 (Very Negative) to +3 (Very Positive)"
          }
        ]
      },
      {
        title: "Three-Minute Focused Listening Practice",
        instructions: "Develop deep listening skills through timed practice exercises with increasing difficulty.",
        practicalSteps: [
          "1. Preparation: Identify three conversation topics of increasing emotional complexity for practice sessions.",
          "2. Basic Practice (5 min): With a partner, practice basic focused listening with simple topics. Listener may only nod or say \"I see\" during the speaker's time.",
          "3. Intermediate Practice (10 min): Practice with moderately complex topics. After listening, summarize what you heard without adding interpretation.",
          "4. Advanced Practice (15 min): Listen to emotionally charged topics without reaction. Document physical sensations experienced during listening in the body map provided.",
          "5. Documentation: After each practice session, complete the listening effectiveness self-assessment."
        ],
        reflection: [
          "What internal distractions arose during your listening practice?",
          "How did your body feel when listening to difficult content?",
          "What differences did you notice in the quality of information you retained?",
          "How did focused listening affect the speaker's communication?"
        ],
        assessmentTools: [
          {
            name: "Listening Interference Tracker",
            description: "Tally each time your mind wanders, you prepare a response, or you feel urged to interrupt"
          },
          {
            name: "Content Retention Assessment",
            description: "After each session, list key points mentioned and check accuracy with speaker"
          }
        ]
      },
      {
        title: "Trigger Response Protocol Development",
        instructions: "Create personalized protocols for maintaining mindful communication during triggering situations.",
        practicalSteps: [
          "1. Trigger Inventory: List 10 specific statements, situations, or interactions that typically trigger reactive communication from you.",
          "2. Response Pattern Analysis: For each trigger, document your typical physical, emotional, and verbal responses using the reaction mapping template.",
          "3. P.A.U.S.E. Method Practice: For each trigger, write out a complete P.A.U.S.E. protocol response:",
          "   - Pause: Specific physical cue to interrupt reaction (e.g., deep breath, hand placement)",
          "   - Acknowledge feeling: Name the exact emotion arising",
          "   - Understand impulse: Identify what you feel compelled to do or say",
          "   - Select intention: Choose your communication purpose in this moment",
          "   - Engage mindfully: Craft specific language for a mindful response",
          "4. Protocol Testing: Practice with role-play scenarios of increasing intensity, documenting effectiveness and refinements needed."
        ],
        reflection: [
          "Which step of the P.A.U.S.E. method is most challenging for you?",
          "What physical sensations most reliably indicate you've been triggered?",
          "How does having a prepared protocol affect your confidence in difficult conversations?",
          "What additional supports would help you implement your protocol consistently?"
        ],
        assessmentTools: [
          {
            name: "Protocol Effectiveness Scale",
            description: "Rate each practiced response on a scale of 1-10 for effectiveness in maintaining mindfulness"
          },
          {
            name: "Implementation Difficulty Assessment",
            description: "Rate how difficult each step was to implement from 1 (very easy) to 5 (extremely difficult)"
          }
        ]
      }
    ]
  },
  "stress-management": {
    title: "Stress Management Intensive Practice Worksheet",
    content: [
      "This comprehensive worksheet provides structured exercises to develop practical stress management skills for immediate and long-term resilience.",
      "The practices range from rapid interventions for acute stress to systemic approaches for managing chronic stressors.",
    ],
    exercises: [
      {
        title: "Stress Response Mapping",
        instructions: "Create a detailed map of your unique stress signature to recognize stress activation early.",
        practicalSteps: [
          "1. Baseline Assessment: Document your physical, mental, emotional, and behavioral state when calm using the baseline template.",
          "2. Stress Signature Documentation: Recall three recent stress episodes and complete the comprehensive response template for each, noting all physical sensations, thoughts, emotions, and behavioral urges.",
          "3. Pattern Analysis: Use the color-coded highlighting system to identify recurring elements across episodes.",
          "4. Early Warning System: From your patterns, identify your three most reliable early warning signs and create a recognition and response plan for each.",
          "5. Verification Process: For the next week, document new stress episodes as they occur to verify and refine your stress signature map."
        ],
        reflection: [
          "What were the most surprising patterns you discovered in your stress response?",
          "Which physical sensations appear earliest in your stress response?",
          "How quickly do you typically move from initial stress activation to peak response?",
          "What environmental factors seem to amplify your stress response?"
        ],
        assessmentTools: [
          {
            name: "Stress Intensity Scale",
            description: "Rate each response element from 1 (barely noticeable) to 10 (overwhelming)"
          },
          {
            name: "Response Timeline Tool",
            description: "Map the sequence and timing of your stress response elements from trigger to resolution"
          }
        ]
      },
      {
        title: "5-4-3-2-1 Sensory Grounding Intensive",
        instructions: "Master the sensory grounding technique through systematic practice and optimization.",
        practicalSteps: [
          "1. Environment Setup: Identify three different environments for practice (e.g., home, workplace, public space).",
          "2. Baseline Measurement: In each environment, rate your stress level and take pulse rate before beginning.",
          "3. Technique Implementation: Practice the full 5-4-3-2-1 technique, documenting specific sensory observations for each step.",
          "4. Post-Intervention Measurement: Re-rate stress level and take pulse rate immediately after completion.",
          "5. Technique Optimization: Based on effectiveness data, customize the technique for each environment by identifying the most effective sensory focuses.",
          "6. Abbreviated Practice: Develop and test 30-second and 60-second versions of the technique for time-constrained situations."
        ],
        reflection: [
          "Which sensory category (sight, touch, hearing, smell, taste) was most effective for grounding you?",
          "How did the effectiveness of the technique vary across different environments?",
          "What obstacles or distractions interfered with the grounding process?",
          "How might you adapt this technique for very public or meeting situations?"
        ],
        assessmentTools: [
          {
            name: "Physiological Response Tracker",
            description: "Record pre and post measurements: stress rating (1-10), pulse rate, breathing rate"
          },
          {
            name: "Environmental Variable Assessment",
            description: "Document environmental factors that enhanced or hindered technique effectiveness"
          }
        ]
      },
      {
        title: "Stress Ecosystem Analysis & Intervention",
        instructions: "Develop a comprehensive system for managing your overall stress environment.",
        practicalSteps: [
          "1. Stressor Inventory: Create a complete inventory of current stressors across life domains (work, relationships, health, environment, finances, etc.).",
          "2. Impact Assessment: Rate each stressor on frequency, intensity, and controllability using the assessment matrix.",
          "3. Systemic Mapping: Using the ecosystem template, map relationships between stressors, identifying amplifying loops and cascade effects.",
          "4. Strategic Intervention Planning: For your three highest-impact stressors, develop specific interventions addressing root causes using the SMARTT framework (Specific, Measurable, Actionable, Realistic, Time-bound, Tested).",
          "5. Resource Identification: For each intervention, identify required resources, potential obstacles, and mitigation strategies.",
          "6. Implementation Timeline: Create a phased implementation plan with specific milestones and accountability mechanisms."
        ],
        reflection: [
          "What relationships between stressors surprised you during the mapping process?",
          "Which stressors have the highest leverage for systemic improvement?",
          "What resources do you need to develop or acquire for effective intervention?",
          "How will you maintain momentum through the implementation process?"
        ],
        assessmentTools: [
          {
            name: "Stressor Impact Matrix",
            description: "Plot each stressor on the matrix of frequency (x-axis) vs. intensity (y-axis)"
          },
          {
            name: "Intervention Feasibility Assessment",
            description: "Rate each intervention on effort required, resources needed, and estimated impact"
          }
        ]
      }
    ]
  },
  "self-compassion": {
    title: "Self-Compassion Practice Intensive Worksheet",
    content: [
      "This worksheet guides you through advanced self-compassion exercises designed to build lasting self-compassion skills.",
      "These structured practices will help you respond to yourself with the same kindness you would offer a good friend during difficult times.",
    ],
    exercises: [
      {
        title: "Compassionate Letter to Self",
        instructions: "Develop the skill of self-directed compassion through structured writing exercises.",
        practicalSteps: [
          "1. Situation Selection: Identify three situations where you've been self-critical recently - one minor, one moderate, and one significant.",
          "2. Critical Voice Documentation: For each situation, transcribe your inner critical voice verbatim in the left column of the worksheet.",
          "3. Response Analysis: Analyze the tone, language, and assumptions in your critical self-talk using the critical voice deconstruction guide.",
          "4. Compassionate Perspective Development: For each situation, write a detailed response from the perspective of a deeply wise, unconditionally accepting friend using the guided template.",
          "5. Compassionate Voice Development: Create a personalized description of your compassionate inner voice, including its qualities, tone, and perspective."
        ],
        reflection: [
          "What patterns do you notice in your self-critical voice?",
          "How does your body feel when reading your self-critical thoughts versus your compassionate response?",
          "What made writing compassionately to yourself difficult or easy?",
          "How might regular practice of this exercise change your relationship with yourself?"
        ],
        assessmentTools: [
          {
            name: "Self-Talk Tone Scale",
            description: "Rate the tone of your inner voice from -5 (harshly critical) to +5 (deeply compassionate)"
          },
          {
            name: "Emotional Impact Assessment",
            description: "Rate how you feel before and after the compassionate letter exercise on multiple dimensions"
          }
        ]
      },
      {
        title: "Self-Compassion Break Intensive",
        instructions: "Master a structured practice for bringing compassion to difficult moments.",
        practicalSteps: [
          "1. Situation Inventory: Create an inventory of challenging situations from the past week that triggered self-criticism or difficult emotions.",
          "2. Three-Step Process Implementation: For each situation, practice the complete Self-Compassion Break:",
          "   - Mindfulness: Acknowledge suffering with specific language",
          "   - Common Humanity: Recognize the shared human experience of this challenge",
          "   - Self-Kindness: Offer yourself specific, situation-appropriate comfort",
          "3. Physical Anchor Development: Experiment with different physical gestures (hand on heart, gentle touch on arm, etc.) to anchor the practice.",
          "4. Personalization: Create custom language for each step that resonates deeply with you.",
          "5. Implementation Planning: Identify specific triggers for using this practice and environmental cues to remind you."
        ],
        reflection: [
          "Which step of the practice was most challenging for you?",
          "What physical gesture felt most supportive during the practice?",
          "How did acknowledging common humanity shift your perspective?",
          "What resistance arose during the practice and how might you address it?"
        ],
        assessmentTools: [
          {
            name: "Practice Effectiveness Scale",
            description: "Rate how effectively each step shifted your emotional state from 1 (not at all) to 10 (completely)"
          },
          {
            name: "Resistance Identification Tool",
            description: "Document specific thoughts or feelings that created resistance to self-compassion"
          }
        ]
      },
      {
        title: "Inner Critic Transformation",
        instructions: "Transform your relationship with self-criticism through advanced compassion practices.",
        practicalSteps: [
          "1. Critic Characterization: Develop a detailed characterization of your inner critic including its appearance, voice, history, and hidden positive intentions.",
          "2. Functional Analysis: For each critical thought pattern, identify the original protective function it may have served using the developmental template.",
          "3. Compassionate Reframing: Transform three core critical beliefs into compassionate alternative perspectives using the belief transformation worksheet.",
          "4. Dialogue Practice: Using the two-chair technique outlined in the guide, practice written dialogues between your critical and compassionate selves.",
          "5. Integration Practice: Develop specific language to acknowledge the protective intention of self-criticism while choosing a more compassionate approach."
        ],
        reflection: [
          "What positive intentions might underlie your self-criticism?",
          "How does personifying your inner critic change your relationship to self-critical thoughts?",
          "What does your critic fear would happen if it stopped criticizing you?",
          "How can you honor the protective function while choosing more compassionate methods?"
        ],
        assessmentTools: [
          {
            name: "Critic Influence Tracker",
            description: "Monitor and rate the influence of your inner critic in daily situations for one week"
          },
          {
            name: "Compassionate Alternative Quality Assessment",
            description: "Rate your compassionate alternatives on believability, emotional impact, and motivational quality"
          }
        ]
      }
    ]
  },
  "better-sleep": {
    title: "Better Sleep Habits Intensive Worksheet",
    content: [
      "This comprehensive worksheet provides structured exercises for transforming your sleep quality through evidence-based practices.",
      "The practical assessments and implementation strategies will help you develop personalized approaches to sleep optimization.",
    ],
    exercises: [
      {
        title: "Sleep Assessment & Goal Setting",
        instructions: "Evaluate your current sleep patterns and set specific, achievable goals for improvement.",
        practicalSteps: [
          "1. Sleep Diary: Track your sleep patterns for one week, noting bedtime, wake time, sleep quality, and daytime alertness.",
          "2. Sleep Quality Assessment: Rate your sleep quality on a scale of 1-10 and identify factors affecting your sleep.",
          "3. Goal Setting: Set specific, measurable, achievable, relevant, and time-bound (SMART) goals for improving your sleep.",
          "4. Action Planning: Develop a detailed action plan for achieving your sleep goals, including specific strategies and timelines.",
          "5. Progress Tracking: Create a system for tracking your progress toward your sleep goals and making adjustments as needed."
        ],
        reflection: [
          "What patterns did you notice in your sleep diary?",
          "What factors seem to be affecting your sleep quality?",
          "What are your biggest challenges to achieving your sleep goals?",
          "What resources or support do you need to succeed?"
        ],
        assessmentTools: [
          {
            name: "Sleep Diary Template",
            description: "A template for tracking your sleep patterns, including bedtime, wake time, sleep quality, and daytime alertness."
          },
          {
            name: "Sleep Quality Assessment Scale",
            description: "A scale for rating your sleep quality on a scale of 1-10 and identifying factors affecting your sleep."
          }
        ]
      },
      {
        title: "Sleep Environment Optimization",
        instructions: "Create a sleep-friendly environment that promotes relaxation and restful sleep.",
        practicalSteps: [
          "1. Room Assessment: Evaluate your bedroom for factors that may be disrupting your sleep, such as noise, light, temperature, and clutter.",
          "2. Noise Reduction: Implement strategies for reducing noise in your bedroom, such as earplugs, white noise machines, or soundproofing.",
          "3. Light Management: Optimize the lighting in your bedroom by using blackout curtains, dimming lights, and avoiding screens before bed.",
          "4. Temperature Control: Adjust the temperature in your bedroom to a comfortable level for sleep, typically between 60-67°F (15-19°C).",
          "5. Clutter Reduction: Declutter your bedroom to create a more relaxing and peaceful environment."
        ],
        reflection: [
          "What factors in your bedroom are disrupting your sleep?",
          "What strategies can you implement to reduce noise and light in your bedroom?",
          "What is the ideal temperature for sleep in your bedroom?",
          "How can you declutter your bedroom to create a more relaxing environment?"
        ],
        assessmentTools: [
          {
            name: "Sleep Environment Checklist",
            description: "A checklist for evaluating your bedroom for factors that may be disrupting your sleep."
          },
          {
            name: "Noise and Light Level Meter",
            description: "A tool for measuring the noise and light levels in your bedroom."
          }
        ]
      },
      {
        title: "Relaxation Techniques for Sleep",
        instructions: "Practice relaxation techniques to calm your mind and body before bed.",
        practicalSteps: [
          "1. Progressive Muscle Relaxation: Practice progressive muscle relaxation to release tension in your body.",
          "2. Deep Breathing Exercises: Practice deep breathing exercises to calm your mind and body.",
          "3. Guided Meditation: Listen to a guided meditation to relax your mind and prepare for sleep.",
          "4. Visualization Techniques: Use visualization techniques to create a peaceful and relaxing mental state.",
          "5. Mindfulness Meditation: Practice mindfulness meditation to focus on the present moment and reduce stress."
        ],
        reflection: [
          "Which relaxation techniques work best for you?",
          "How do you feel after practicing relaxation techniques?",
          "How can you incorporate relaxation techniques into your bedtime routine?",
          "What are the benefits of practicing relaxation techniques for sleep?"
        ],
        assessmentTools: [
          {
            name: "Relaxation Technique Log",
            description: "A log for tracking your practice of relaxation techniques and noting their effectiveness."
          },
          {
            name: "Stress Level Assessment Scale",
            description: "A scale for assessing your stress level before and after practicing relaxation techniques."
          }
        ]
      }
    ]
  },
  "social-connection": {
    title: "Building Social Connections Intensive Worksheet",
    content: [
      "This worksheet provides structured exercises to strengthen your social connections and build meaningful relationships.",
      "The practical activities will help you assess, develop, and enhance your social support network.",
    ],
    exercises: [
      {
        title: "Social Network Assessment",
        instructions: "Evaluate your current social network and identify areas for improvement.",
        practicalSteps: [
          "1. Social Circle Mapping: Create a map of your social circle, including family, friends, colleagues, and acquaintances.",
          "2. Relationship Quality Assessment: Assess the quality of your relationships with each person in your social circle.",
          "3. Social Support Needs Identification: Identify your social support needs and determine whether they are being met.",
          "4. Social Network Gap Analysis: Identify gaps in your social network and areas where you need to build new connections.",
          "5. Social Connection Goals Setting: Set specific, measurable, achievable, relevant, and time-bound (SMART) goals for improving your social connections."
        ],
        reflection: [
          "Who are the most important people in your social circle?",
          "What are the strengths and weaknesses of your current social network?",
          "What social support needs are not being met?",
          "What new connections do you need to build?",
          "What are your biggest challenges to improving your social connections?"
        ],
        assessmentTools: [
          {
            name: "Social Circle Mapping Template",
            description: "A template for mapping your social circle and identifying key relationships."
          },
          {
            name: "Relationship Quality Assessment Scale",
            description: "A scale for assessing the quality of your relationships with each person in your social circle."
          }
        ]
      },
      {
        title: "Initiating and Maintaining Social Connections",
        instructions: "Develop strategies for initiating and maintaining social connections.",
        practicalSteps: [
          "1. Identifying Social Opportunities: Identify opportunities for meeting new people and building social connections.",
          "2. Initiating Conversations: Practice initiating conversations with new people.",
          "3. Active Listening: Practice active listening skills to build rapport and deepen connections.",
          "4. Sharing Personal Information: Share personal information to build trust and intimacy.",
          "5. Maintaining Contact: Develop strategies for maintaining contact with people you want to build relationships with."
        ],
        reflection: [
          "What are your favorite ways to meet new people?",
          "What are your biggest challenges to initiating conversations?",
          "How can you improve your active listening skills?",
          "What personal information are you comfortable sharing with new people?",
          "How can you maintain contact with people you want to build relationships with?"
        ],
        assessmentTools: [
          {
            name: "Conversation Starter Template",
            description: "A template for developing conversation starters for meeting new people."
          },
          {
            name: "Active Listening Skills Checklist",
            description: "A checklist for evaluating your active listening skills."
          }
        ]
      },
      {
        title: "Strengthening Existing Relationships",
        instructions: "Develop strategies for strengthening your existing relationships.",
        practicalSteps: [
          "1. Expressing Appreciation: Express appreciation for the people in your life.",
          "2. Spending Quality Time: Spend quality time with the people you care about.",
          "3. Providing Support: Provide support to the people in your life.",
          "4. Resolving Conflicts: Develop strategies for resolving conflicts in your relationships.",
          "5. Forgiving Others: Practice forgiving others for their mistakes."
        ],
        reflection: [
          "Who are the people in your life that you appreciate the most?",
          "How can you spend more quality time with the people you care about?",
          "What kind of support can you provide to the people in your life?",
          "How can you resolve conflicts in your relationships?",
          "How can you practice forgiving others for their mistakes?"
        ],
        assessmentTools: [
          {
            name: "Appreciation Expression Template",
            description: "A template for expressing appreciation to the people in your life."
          },
          {
            name: "Conflict Resolution Skills Checklist",
            description: "A checklist for evaluating your conflict resolution skills."
          }
        ]
      }
    ]
  },
  // Default worksheet for any other workshops
  "default": {
    title: "Workshop Intensive Practice Worksheet",
    content: [
      "This comprehensive practice worksheet will help you implement the key concepts from your workshop through structured exercises.",
      "The practical activities are designed to translate knowledge into applied skills for lasting benefit.",
    ],
    exercises: [
      {
        title: "Concept Implementation Planning",
        instructions: "Develop a structured plan to apply workshop concepts to your specific situation.",
        practicalSteps: [
          "1. Key Concept Extraction: List the 3-5 most important concepts you learned in this workshop.",
          "2. Situational Analysis: For each concept, identify 2-3 specific situations in your life where it applies.",
          "3. Implementation Strategy: Develop a detailed implementation plan for each concept using the SMART framework.",
          "4. Obstacle Anticipation: Identify potential obstacles and develop specific contingency plans.",
          "5. Progress Tracking: Create measurement criteria and tracking mechanisms for your implementation."
        ],
        reflection: [
          "Which concept seems most immediately applicable to your current situation?",
          "What specific benefits do you anticipate from implementing these concepts?",
          "What additional resources or support might you need for successful implementation?",
          "How will you maintain motivation through the implementation process?"
        ],
        assessmentTools: [
          {
            name: "Concept Relevance Scale",
            description: "Rate each concept from 1-10 based on its relevance to your current priorities"
          },
          {
            name: "Implementation Readiness Assessment",
            description: "Evaluate your readiness to implement each concept based on motivation, resources, and confidence"
          }
        ]
      },
      {
        title: "Skill Development Practice",
        instructions: "Structure deliberate practice of the key skills presented in the workshop.",
        practicalSteps: [
          "1. Skill Identification: List the specific skills presented in this workshop.",
          "2. Current Proficiency Assessment: Rate your current proficiency in each skill using the assessment rubric.",
          "3. Practice Design: For your two highest-priority skills, design specific practice activities with clear parameters.",
          "4. Feedback Mechanism: Establish concrete methods to measure progress and gather feedback on skill development.",
          "5. Practice Schedule: Create a 21-day practice schedule with specific times, durations, and focus areas."
        ],
        reflection: [
          "Which skill would create the most positive impact if mastered?",
          "What specific elements of this skill are most challenging for you?",
          "How can you create opportunities for deliberate practice in your daily routine?",
          "What indicators will show you're making progress?"
        ],
        assessmentTools: [
          {
            name: "Skill Proficiency Matrix",
            description: "Plot your current skill levels across dimensions of knowledge, application, and consistency"
          },
          {
            name: "Practice Quality Assessment",
            description: "Track the quality and effectiveness of each practice session using the provided metrics"
          }
        ]
      }
    ]
  }
};

// Function to generate enhanced PDF worksheet based on workshop ID
export const generateWorksheetPDF = (workshopId: string): void => {
  // Get appropriate content or use default
  const content = worksheetContentMap[workshopId] || worksheetContentMap.default;
  
  // Create PDF with enhanced layout and content
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Add title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(content.title, 20, yPosition);
  yPosition += 10;
  
  // Add workshop info from workshopData if available
  const workshopInfo = workshopData.find(w => w.id === workshopId);
  if (workshopInfo) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(`From the "${workshopInfo.title}" workshop`, 20, yPosition);
    yPosition += 12;
  } else {
    yPosition += 6;
  }
  
  // Add introduction
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  content.content.forEach(paragraph => {
    const splitText = doc.splitTextToSize(paragraph, 170);
    doc.text(splitText, 20, yPosition);
    yPosition += splitText.length * 6;
  });
  
  yPosition += 8;
  
  // Add exercises with enhanced formatting
  content.exercises.forEach((exercise, index) => {
    // Check if we need a new page for this exercise
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Exercise title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Exercise ${index + 1}: ${exercise.title}`, 20, yPosition);
    yPosition += 8;
    
    // Exercise instructions
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const instructionsText = doc.splitTextToSize(exercise.instructions, 170);
    doc.text(instructionsText, 20, yPosition);
    yPosition += instructionsText.length * 6 + 4;
    
    // Add practical steps if available
    if (exercise.practicalSteps && exercise.practicalSteps.length) {
      doc.setFont('helvetica', 'bold');
      doc.text("Practical Steps:", 20, yPosition);
      yPosition += 6;
      
      doc.setFont('helvetica', 'normal');
      exercise.practicalSteps.forEach(step => {
        const stepText = doc.splitTextToSize(step, 160);
        doc.text(stepText, 25, yPosition);
        yPosition += stepText.length * 6;
      });
      
      yPosition += 4;
    }
    
    // Add assessment tools if available
    if (exercise.assessmentTools && exercise.assessmentTools.length) {
      // Check if we need a new page
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text("Assessment Tools:", 20, yPosition);
      yPosition += 6;
      
      exercise.assessmentTools.forEach(tool => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${tool.name}:`, 25, yPosition);
        yPosition += 5;
        
        doc.setFont('helvetica', 'normal');
        const descText = doc.splitTextToSize(tool.description, 155);
        doc.text(descText, 30, yPosition);
        yPosition += descText.length * 5;
        
        // Add scale if available
        if (tool.scale && tool.scale.length) {
          const scaleText = tool.scale.join(" | ");
          const splitScale = doc.splitTextToSize(`Scale: ${scaleText}`, 150);
          doc.text(splitScale, 30, yPosition);
          yPosition += splitScale.length * 5;
        }
        
        yPosition += 2;
      });
      
      yPosition += 4;
    }
    
    // Add reflection questions
    if (exercise.reflection && exercise.reflection.length) {
      // Check if we need a new page
      if (yPosition > 230) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text("Reflection Questions:", 20, yPosition);
      yPosition += 6;
      
      doc.setFont('helvetica', 'normal');
      exercise.reflection.forEach((question, qIndex) => {
        const questionText = doc.splitTextToSize(`${qIndex + 1}. ${question}`, 160);
        doc.text(questionText, 25, yPosition);
        yPosition += questionText.length * 6;
        
        // Add lines for writing responses
        yPosition += 3;
        doc.setDrawColor(200);
        doc.line(25, yPosition, 190, yPosition);
        yPosition += 5;
        doc.line(25, yPosition, 190, yPosition);
        yPosition += 5;
        doc.line(25, yPosition, 190, yPosition);
        yPosition += 10;
      });
      
      yPosition += 5;
    }
    
    // Add a separator between exercises
    if (index < content.exercises.length - 1) {
      doc.setDrawColor(150);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 10;
      
      // Check if we need a new page for the next exercise
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
    }
  });
  
  // Add implementation planning section at the end
  doc.addPage();
  yPosition = 20;
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("Implementation Planning", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text("Use this section to plan how you will implement what you've learned into your daily life:", 20, yPosition);
  yPosition += 10;
  
  // Add implementation planning template
  const planningPrompts = [
    "What specific skill or technique will you implement first?",
    "When and where will you practice this skill?",
    "What obstacles might arise, and how will you handle them?",
    "How will you track your progress?",
    "What support do you need to succeed?"
  ];
  
  planningPrompts.forEach(prompt => {
    doc.setFont('helvetica', 'bold');
    const promptText = doc.splitTextToSize(prompt, 170);
    doc.text(promptText, 20, yPosition);
    yPosition += promptText.length * 6;
    
    doc.setDrawColor(200);
    doc.line(20, yPosition,
