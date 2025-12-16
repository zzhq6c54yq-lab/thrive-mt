// Centralized pricing data for all ThriveMT services (40% margin model)

export const therapyPricing = {
  selfPay: [
    { service: "Individual Therapy", duration: "30 min", price: 65, description: "A focused session for quick check-ins, addressing specific concerns, or building on previous work. Ideal for maintenance or brief interventions." },
    { service: "Individual Therapy", duration: "45 min", price: 90, description: "Our most popular format. Enough time to explore emotions deeply, process experiences, and develop personalized coping strategies." },
    { service: "Individual Therapy", duration: "60 min", price: 110, description: "Extended session for complex issues, trauma processing, or intensive therapeutic work requiring more time and depth." },
    { service: "Couples Therapy", duration: "60 min", price: 140, description: "Work on communication, conflict resolution, intimacy, and relationship dynamics with your partner in a safe, guided environment." },
    { service: "Family Therapy", duration: "60 min", price: 150, description: "Address family dynamics, improve communication between family members, and work through shared challenges together." },
  ],
  insurance: [
    { service: "Individual Therapy", duration: "30 min", price: 130, description: "A focused session for quick check-ins, addressing specific concerns, or building on previous work. Ideal for maintenance or brief interventions." },
    { service: "Individual Therapy", duration: "45 min", price: 165, description: "Our most popular format. Enough time to explore emotions deeply, process experiences, and develop personalized coping strategies." },
    { service: "Individual Therapy", duration: "60 min", price: 200, description: "Extended session for complex issues, trauma processing, or intensive therapeutic work requiring more time and depth." },
    { service: "Couples Therapy", duration: "60 min", price: 230, description: "Work on communication, conflict resolution, intimacy, and relationship dynamics with your partner in a safe, guided environment." },
    { service: "Family Therapy", duration: "60 min", price: 250, description: "Address family dynamics, improve communication between family members, and work through shared challenges together." },
  ]
};

export const coachingPricing = [
  { service: "Coaching Session", duration: "30 min", price: 25, description: "Quick coaching check-in to review goals, troubleshoot obstacles, and plan your next steps. Perfect for busy schedules." },
  { service: "Coaching Session", duration: "45 min", price: 37, description: "Balanced session for goal setting, action planning, and working through challenges with your dedicated coach." },
  { service: "Coaching Session", duration: "60 min", price: 47, description: "Deep-dive coaching for comprehensive goal work, life transitions, and sustained personal development." },
  { service: "Accountability Coaching", duration: "30 min", price: 25, description: "Stay on track with regular check-ins focused on your commitments, progress tracking, and motivation." },
  { service: "Motivation / Goal Setting", duration: "45 min", price: 37, description: "Clarify your vision, set meaningful goals, and create actionable plans to achieve what matters most to you." },
];

export const addOns = [
  { service: "Unlimited Messaging w/ Therapist", price: 129, period: "/month", description: "Message your therapist anytime between sessions. Get support when you need it, with responses within 24-48 hours." },
  { service: "Unlimited Messaging w/ Coach", price: 59, period: "/month", description: "Stay connected with your coach between sessions. Quick questions, progress updates, and encouragement on demand." },
  { service: "Safety Plan Review / Crisis Prevention", price: 25, period: "", description: "Develop or review your personalized crisis prevention plan with professional guidance. Essential for high-risk periods." },
  { service: "Weekly Support Check-in", price: 19, period: "/week", description: "Brief weekly touchpoint to maintain momentum, celebrate wins, and address emerging concerns early." },
];

export const groupSessions = [
  { service: "Anxiety Skills", duration: "60 min", price: 18, description: "Learn evidence-based anxiety management in a supportive group. Includes breathing techniques, cognitive tools, and peer support." },
  { service: "Trauma Recovery", duration: "60 min", price: 22, description: "Process trauma with others who understand. Guided by a trauma-informed facilitator in a safe, healing environment." },
  { service: "Men's / Women's Support Circles", duration: "60 min", price: 15, description: "Connect with others in gender-specific groups. Share experiences, gain perspective, and build community." },
  { service: "Accountability Group", duration: "60 min", price: 12, description: "Stay motivated with peers who share your commitment to growth. Celebrate wins and support each other through challenges." },
];

export const bundles = {
  therapy: [
    { 
      name: "Starter Therapy Bundle", 
      description: "2×30-min + 2×45-min therapy", 
      price: 159, 
      savings: 15 
    },
    { 
      name: "Growth Therapy Bundle", 
      description: "3×45-min + 3×60-min therapy", 
      price: 339, 
      savings: 27 
    },
    { 
      name: "Intensive Therapy Bundle", 
      description: "4×45-min + 4×60-min therapy", 
      price: 450, 
      savings: 38 
    },
    { 
      name: "Premium Therapy Membership", 
      description: "Up to 2 sessions/week + unlimited messaging", 
      price: 597, 
      period: "/month" 
    },
  ],
  coaching: [
    { 
      name: "Basic Coaching Bundle", 
      description: "4×30-min coaching", 
      price: 89 
    },
    { 
      name: "Goal Crusher Bundle", 
      description: "3×45-min + 3×60-min coaching", 
      price: 229 
    },
    { 
      name: "Weekly Support Coaching", 
      description: "8×30-min coaching", 
      price: 175 
    },
    { 
      name: "Elite Coaching Membership", 
      description: "4 sessions/month + unlimited text", 
      price: 169, 
      period: "/month" 
    },
  ],
  hybrid: [
    { 
      name: "Balanced Mental Wellness", 
      description: "2×45-min therapy + 2×45-min coaching", 
      price: 165 
    },
    { 
      name: "Complete Growth Program", 
      description: "2×60-min therapy + 4×30-min coaching + weekly accountability", 
      price: 219, 
      popular: true 
    },
    { 
      name: "Transformation Bundle", 
      description: "4×60-min therapy + 4×60-min coaching + unlimited messaging", 
      price: 429 
    },
  ]
};
