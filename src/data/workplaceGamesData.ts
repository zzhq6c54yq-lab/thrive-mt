
import { Brain, Coffee, Users, Clock, Zap, Puzzle, MessageSquare, Smile, Briefcase, Activity } from "lucide-react";

export interface WorkplaceGame {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: "team-building" | "stress-relief" | "cognitive" | "communication" | "mindfulness" | "wellness" | "leadership" | "creativity";
  playerCount: string;
  timeToComplete: string;
  benefits: string[];
  instructions: string;
  color: string;
}

export const workplaceGamesData: WorkplaceGame[] = [
  {
    id: "gratitude-circle",
    title: "Gratitude Circle",
    description: "Build team connection through shared appreciation and recognition",
    icon: Users,
    type: "team-building",
    playerCount: "4-15 people",
    timeToComplete: "10-15 min",
    benefits: ["Improves team morale", "Enhances workplace relationships", "Reduces stress"],
    instructions: "Gather in a circle (in-person or virtual). Each person takes a turn sharing something they appreciate about a colleague's contribution that week. Everyone must be recognized at least once.",
    color: "#9b87f5"
  },
  {
    id: "stress-buster",
    title: "Two-Minute Stress Buster",
    description: "Quick stress reduction techniques for busy workdays",
    icon: Activity,
    type: "stress-relief",
    playerCount: "Individual",
    timeToComplete: "2 min",
    benefits: ["Reduces acute stress", "Improves focus", "Enhances productivity"],
    instructions: "Set a 2-minute timer. Follow the guided breathing pattern: Inhale for 4 counts, hold for 2, exhale for 6. Repeat while focusing on releasing tension from different parts of your body with each exhale.",
    color: "#D946EF"
  },
  {
    id: "workplace-bingo",
    title: "Workplace Wellness Bingo",
    description: "Fun way to encourage healthy habits throughout the workweek",
    icon: Puzzle,
    type: "wellness",
    playerCount: "Any number",
    timeToComplete: "Ongoing (1-2 weeks)",
    benefits: ["Encourages healthy habits", "Makes wellness fun", "Builds team camaraderie"],
    instructions: "Distribute wellness bingo cards with different self-care actions (take a walking meeting, drink 8 glasses of water, compliment a colleague, etc.). Complete five in a row to win. Share progress in team chat.",
    color: "#F97316"
  },
  {
    id: "empathy-challenge",
    title: "Empathy Challenge",
    description: "Strengthen emotional intelligence and understanding between team members",
    icon: MessageSquare,
    type: "communication",
    playerCount: "Pairs",
    timeToComplete: "15-20 min",
    benefits: ["Improves emotional intelligence", "Builds stronger relationships", "Enhances communication"],
    instructions: "In pairs, each person shares a current work challenge. The listener can only ask questions (no advice or solutions) for 5 minutes. Switch roles. Afterwards, discuss insights about how it felt to be deeply listened to.",
    color: "#0EA5E9"
  },
  {
    id: "cognitive-refresh",
    title: "Cognitive Refresh",
    description: "Brain games to boost mental energy during afternoon slumps",
    icon: Brain,
    type: "cognitive",
    playerCount: "Individual",
    timeToComplete: "5-10 min",
    benefits: ["Combats mental fatigue", "Improves cognitive flexibility", "Boosts creativity"],
    instructions: "Choose one activity: 1) Count backward from 100 by 7s, 2) Name 15 items in a specific category (cities, animals, etc.), 3) Recall and describe your commute in precise detail, or 4) Draw something you use daily with your non-dominant hand.",
    color: "#8B5CF6"
  },
  {
    id: "perspective-shift",
    title: "Perspective Shift",
    description: "Creative problem-solving through different viewpoints",
    icon: Briefcase,
    type: "creativity",
    playerCount: "3-7 people",
    timeToComplete: "25-30 min",
    benefits: ["Enhances problem-solving", "Encourages diverse thinking", "Builds team collaboration"],
    instructions: "Present a current workplace challenge. Each participant draws a random 'perspective card' (customer, new employee, competitor, etc.) and has 5 minutes to approach the problem from that perspective. Share insights and combine the best ideas.",
    color: "#7E69AB"
  },
  {
    id: "minute-mindfulness",
    title: "One-Minute Mindfulness",
    description: "Brief mindfulness practices you can do at your desk",
    icon: Clock,
    type: "mindfulness",
    playerCount: "Individual",
    timeToComplete: "1-3 min",
    benefits: ["Reduces stress", "Improves focus", "Enhances presence"],
    instructions: "Set a timer for one minute. Choose one focus area: 1) Counting breaths, 2) Body scan for tension, 3) Five senses check-in (notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste), or 4) Appreciating something in your environment.",
    color: "#6E59A5"
  },
  {
    id: "energy-audit",
    title: "Personal Energy Audit",
    description: "Track and optimize your energy patterns throughout the workday",
    icon: Zap,
    type: "wellness",
    playerCount: "Individual",
    timeToComplete: "5 min daily for 1 week",
    benefits: ["Optimizes productivity", "Improves energy management", "Enhances work planning"],
    instructions: "Rate your energy level (1-10) every 90 minutes during the workday for one week. Note what you were doing, eating/drinking, and feeling. At week's end, analyze patterns to identify your peak energy times and activities that boost or drain energy.",
    color: "#33C3F0"
  },
  {
    id: "communication-styles",
    title: "Communication Styles Game",
    description: "Understand different communication preferences to improve team interactions",
    icon: Smile,
    type: "communication",
    playerCount: "4-12 people",
    timeToComplete: "30-40 min",
    benefits: ["Improves team communication", "Reduces conflict", "Enhances collaboration"],
    instructions: "Take a quick communication style assessment. Form groups by similar styles and list your communication preferences, pet peeves, and needs. Share with the larger group. Create team agreements for respecting different communication styles.",
    color: "#D6BCFA"
  },
  {
    id: "coffee-roulette",
    title: "Coffee Chat Roulette",
    description: "Foster cross-team connections through randomized coffee meetings",
    icon: Coffee,
    type: "team-building",
    playerCount: "Any number",
    timeToComplete: "15-20 min per session",
    benefits: ["Breaks down silos", "Builds broader networks", "Enhances company culture"],
    instructions: "Sign up for the monthly coffee roulette. You'll be randomly paired with someone from a different team for a 15-minute virtual or in-person coffee chat. Suggested topics are provided, but conversations can flow naturally.",
    color: "#7E5BA6"
  }
];

export interface WorkplaceQuiz {
  id: string;
  title: string;
  description: string;
  category: "stress-management" | "work-life-balance" | "communication" | "team-dynamics" | "workplace-wellness" | "leadership" | "career-development";
  questions: number;
  timeEstimate: string;
  completionRate?: number;
}

export const workplaceQuizzesData: WorkplaceQuiz[] = [
  {
    id: "workplace-stress-assessment",
    title: "Workplace Stress Assessment",
    description: "Evaluate your current stress levels and identify key workplace stressors",
    category: "stress-management",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 0
  },
  {
    id: "communication-style",
    title: "Communication Style Inventory",
    description: "Discover your communication preferences and how they impact workplace interactions",
    category: "communication",
    questions: 12,
    timeEstimate: "6 min",
    completionRate: 0
  },
  {
    id: "work-life-harmony",
    title: "Work-Life Harmony Check",
    description: "Assess how effectively you're balancing work demands with personal wellbeing",
    category: "work-life-balance",
    questions: 8,
    timeEstimate: "4 min",
    completionRate: 0
  },
  {
    id: "team-dynamics",
    title: "Team Dynamics Assessment",
    description: "Evaluate the health of your team interactions and collaboration patterns",
    category: "team-dynamics",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 0
  },
  {
    id: "workplace-resilience",
    title: "Workplace Resilience Index",
    description: "Measure your ability to adapt and thrive amid workplace challenges",
    category: "workplace-wellness",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 0
  },
  {
    id: "leadership-style",
    title: "Leadership Style Assessment",
    description: "Understand your natural leadership tendencies and development opportunities",
    category: "leadership",
    questions: 15,
    timeEstimate: "8 min",
    completionRate: 0
  },
  {
    id: "career-alignment",
    title: "Career Values Alignment",
    description: "Assess how well your current role aligns with your core values and aspirations",
    category: "career-development",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 0
  },
  {
    id: "burnout-risk",
    title: "Burnout Risk Evaluation",
    description: "Identify early warning signs and risk factors for workplace burnout",
    category: "workplace-wellness",
    questions: 12,
    timeEstimate: "6 min",
    completionRate: 0
  }
];
