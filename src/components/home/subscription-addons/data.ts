
import { Activity, BookOpen, Briefcase, Bus, GraduationCap, Heart, Hotel, PersonStanding, Shield, Stethoscope, UserRound } from "lucide-react";

export const addOns = [
  {
    id: "small-business",
    title: "Small Business Support",
    description: "Mental health resources tailored to small business owners and employees.",
    targetAudience: "Small business owners and employees",
    features: ["Stress management for entrepreneurs", "Work-life balance guidance", "Team building resources"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=1000&t=1683730841",
    gradient: "bg-gradient-to-r from-amber-600 to-amber-400",
    borderColor: "#F59E0B",
    icon: Briefcase,
    path: "/small-business-welcome",
    recommended: true
  },
  {
    id: "colleges",
    title: "College Student Resources",
    description: "Support for the unique mental health challenges of college students.",
    targetAudience: "College and university students",
    features: ["Exam stress management", "Campus life adjustment", "Career preparation support"],
    price: {
      monthly: 3.99,
      yearly: 39.99
    },
    imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000&t=1683730842",
    gradient: "bg-gradient-to-r from-blue-600 to-blue-400",
    borderColor: "#3B82F6",
    icon: GraduationCap,
    path: "/college-welcome"
  },
  {
    id: "dod",
    title: "Military & Veteran Support",
    description: "Specialized mental health resources for active duty, veterans, and families.",
    targetAudience: "Military personnel, veterans, and their families",
    features: ["PTSD resources", "Deployment support", "Transition to civilian life"],
    price: {
      monthly: 0,
      yearly: 0
    },
    imagePath: "https://images.unsplash.com/photo-1551702600-493e4d0ea256?auto=format&fit=crop&q=80&w=1000&t=1683730843",
    gradient: "bg-gradient-to-r from-blue-900 to-blue-700",
    borderColor: "#1E3A8A",
    icon: Shield,
    path: "/dod-welcome",
    free: true
  },
  {
    id: "adolescent",
    title: "Adolescent Support",
    description: "Mental wellbeing resources specifically designed for teenagers and adolescents.",
    targetAudience: "Teenagers and adolescents aged 13-19",
    features: ["School stress management", "Social skills development", "Identity and self-esteem"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1518101645466-7795885ff8b8?auto=format&fit=crop&q=80&w=1000&t=1683730844",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-400",
    borderColor: "#10B981",
    icon: UserRound,
    path: "/adolescent-welcome"
  },
  {
    id: "golden-years",
    title: "Golden Years Program",
    description: "Mental wellness resources tailored to seniors and aging individuals.",
    targetAudience: "Seniors and older adults",
    features: ["Retirement transition support", "Social connection strategies", "Memory enhancement exercises"],
    price: {
      monthly: 3.99,
      yearly: 39.99
    },
    imagePath: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=1000&t=1683730845",
    gradient: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    borderColor: "#D97706",
    icon: PersonStanding,
    path: "/golden-years-welcome"
  },
  {
    id: "first-responders",
    title: "First Responder Support",
    description: "Resources for the mental health needs of emergency service personnel.",
    targetAudience: "Firefighters, EMTs, police, and other emergency personnel",
    features: ["Critical incident stress debriefing", "Burnout prevention", "Family support resources"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1633270216455-4fe3ee093bb6?auto=format&fit=crop&q=80&w=1000&t=1683730846",
    gradient: "bg-gradient-to-r from-red-600 to-red-400",
    borderColor: "#DC2626",
    icon: Activity,
    path: "/first-responders-welcome"
  },
  {
    id: "law-enforcement",
    title: "Law Enforcement Program",
    description: "Mental health support tailored to the needs of law enforcement professionals.",
    targetAudience: "Police officers and law enforcement professionals",
    features: ["Stress management for high-risk situations", "Shift work coping strategies", "Trauma processing"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&q=80&w=1000&t=1683730847",
    gradient: "bg-gradient-to-r from-blue-800 to-blue-600",
    borderColor: "#1E40AF",
    icon: Shield,
    path: "/law-enforcement-welcome"
  },
  {
    id: "educators",
    title: "Educators Support",
    description: "Mental wellness resources designed specifically for teachers and educators.",
    targetAudience: "Teachers, professors, and education staff",
    features: ["Classroom stress management", "Work-life balance for educators", "Student interaction strategies"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000&t=1683730848",
    gradient: "bg-gradient-to-r from-cyan-600 to-cyan-400",
    borderColor: "#0891B2",
    icon: BookOpen,
    path: "/educators-welcome"
  },
  {
    id: "hospitality",
    title: "Hospitality Industry",
    description: "Mental health tools for those working in restaurants, hotels, and tourism.",
    targetAudience: "Restaurant, hotel, and tourism industry workers",
    features: ["Customer interaction stress reduction", "Late shift management", "Work-life balance strategies"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000&t=1683730849",
    gradient: "bg-gradient-to-r from-orange-500 to-orange-300",
    borderColor: "#F97316",
    icon: Hotel,
    path: "/hospitality-welcome"
  },
  {
    id: "transportation",
    title: "Transportation Workers",
    description: "Mental wellness for drivers, pilots, conductors, and transportation staff.",
    targetAudience: "Drivers, pilots, conductors and transportation staff",
    features: ["Isolation management", "Fatigue and alertness strategies", "Stress reduction techniques"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000&t=1683730850",
    gradient: "bg-gradient-to-r from-sky-600 to-sky-400",
    borderColor: "#0284C7",
    icon: Bus,
    path: "/transport-welcome"
  },
  {
    id: "chronic-illness",
    title: "Chronic Illness Support",
    description: "Mental health resources for those managing chronic health conditions.",
    targetAudience: "People living with chronic health conditions",
    features: ["Pain management strategies", "Emotional support resources", "Medical appointment preparation"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000&t=1683730851",
    gradient: "bg-gradient-to-r from-purple-600 to-purple-400",
    borderColor: "#8B5CF6",
    icon: Stethoscope,
    path: "/chronic-illness-welcome",
    recommended: true
  }
];

// Types of addons
export const addonTypes = [
  { id: "profession", name: "Profession-Based", description: "Support tailored to specific career challenges" },
  { id: "demographic", name: "Demographic-Based", description: "Resources designed for specific age groups and life stages" },
  { id: "condition", name: "Condition-Based", description: "Support for specific health concerns or situations" }
];

// Categorize add-ons by type
export const categorizedAddOns = {
  profession: [
    "small-business",
    "first-responders",
    "law-enforcement",
    "educators",
    "hospitality",
    "transportation"
  ],
  demographic: [
    "colleges",
    "dod",
    "adolescent",
    "golden-years"
  ],
  condition: [
    "chronic-illness"
  ]
};

// Helper function to get add-ons by category
export const getAddOnsByCategory = (categoryId: string) => {
  const addOnIds = categorizedAddOns[categoryId as keyof typeof categorizedAddOns] || [];
  return addOns.filter(addon => addOnIds.includes(addon.id));
};

// Helper to get addon by id
export const getAddOnById = (id: string) => {
  return addOns.find(addon => addon.id === id);
};
