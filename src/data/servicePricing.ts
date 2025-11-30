// Centralized pricing data for all ThriveMT services (40% margin model)

export const therapyPricing = {
  selfPay: [
    { service: "Individual Therapy", duration: "30 min", price: 35 },
    { service: "Individual Therapy", duration: "45 min", price: 52 },
    { service: "Individual Therapy", duration: "60 min", price: 70 },
    { service: "Couples Therapy", duration: "60 min", price: 92 },
    { service: "Family Therapy", duration: "60 min", price: 100 },
  ],
  insurance: [
    { service: "Individual Therapy", duration: "30 min", price: 110 },
    { service: "Individual Therapy", duration: "45 min", price: 160 },
    { service: "Individual Therapy", duration: "60 min", price: 220 },
    { service: "Couples Therapy", duration: "60 min", price: 240 },
    { service: "Family Therapy", duration: "60 min", price: 260 },
  ]
};

export const coachingPricing = [
  { service: "Coaching Session", duration: "30 min", price: 25 },
  { service: "Coaching Session", duration: "45 min", price: 37 },
  { service: "Coaching Session", duration: "60 min", price: 47 },
  { service: "Accountability Coaching", duration: "30 min", price: 25 },
  { service: "Motivation / Goal Setting", duration: "45 min", price: 37 },
];

export const addOns = [
  { service: "Unlimited Messaging w/ Therapist", price: 129, period: "/month" },
  { service: "Unlimited Messaging w/ Coach", price: 59, period: "/month" },
  { service: "Safety Plan Review / Crisis Prevention", price: 25, period: "" },
  { service: "Weekly Support Check-in", price: 19, period: "/week" },
];

export const groupSessions = [
  { service: "Anxiety Skills", duration: "60 min", price: 18 },
  { service: "Trauma Recovery", duration: "60 min", price: 22 },
  { service: "Men's / Women's Support Circles", duration: "60 min", price: 15 },
  { service: "Accountability Group", duration: "60 min", price: 12 },
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
