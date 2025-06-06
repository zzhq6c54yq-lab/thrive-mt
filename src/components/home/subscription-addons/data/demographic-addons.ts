
import { GraduationCap, Shield, UserRound, PersonStanding } from "lucide-react";
import type { AddOn } from "./types";

// Demographic-based add-ons
export const demographicAddOns: AddOn[] = [
  {
    id: "colleges",
    title: "College Student Resources",
    description: "Support for the unique mental health challenges of college students.",
    targetAudience: "College and university students",
    features: [
      "Exam stress management", 
      "Campus life adjustment", 
      "Career preparation support",
      "Study-life balance techniques",
      "Social anxiety and relationship guidance",
      "Financial stress management",
      "Homesickness and transition support",
      "Academic pressure coping strategies",
      "Sleep hygiene for students",
      "Substance abuse prevention resources",
      "Crisis intervention and emergency support",
      "Graduate school preparation mental health",
      "Time management and productivity tools",
      "Campus resource navigation assistance"
    ],
    price: {
      monthly: 3.99,
      yearly: 39.99
    },
    imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
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
    features: [
      "PTSD resources", 
      "Deployment support", 
      "Transition to civilian life",
      "Combat stress management",
      "Family reintegration support",
      "Career transition assistance",
      "Military sexual trauma resources",
      "Substance abuse recovery programs",
      "Financial planning and benefits navigation",
      "Spouse and family support networks",
      "Veteran entrepreneurship resources",
      "Educational benefits guidance",
      "Disability claims assistance",
      "Suicide prevention and crisis intervention",
      "Honor guard and ceremonial support",
      "Peer mentorship programs"
    ],
    price: {
      monthly: 0,
      yearly: 0
    },
    imagePath: "/lovable-uploads/be94c6a8-cafa-4153-8712-3da52ecae458.png",
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
    features: [
      "School stress management", 
      "Social skills development", 
      "Identity and self-esteem",
      "Bullying prevention and response",
      "Body image and eating disorder support",
      "Social media and technology balance",
      "Peer pressure resistance strategies",
      "Dating and relationship guidance",
      "Academic and career exploration",
      "Family communication improvement",
      "Anger management techniques",
      "Substance abuse prevention",
      "LGBTQ+ support and resources",
      "College and future planning stress",
      "Creative expression and art therapy",
      "Crisis intervention and emergency support"
    ],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1000",
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
    features: [
      "Retirement transition support", 
      "Social connection strategies", 
      "Memory enhancement exercises",
      "Grief and loss processing",
      "Caregiver stress management",
      "Chronic illness adaptation",
      "Technology learning and digital literacy",
      "Intergenerational relationship building",
      "Purpose and meaning rediscovery",
      "Financial security and planning",
      "End-of-life planning guidance",
      "Grandparent role navigation",
      "Physical activity and mobility support",
      "Medication management assistance",
      "Home safety and independence maintenance",
      "Legacy projects and storytelling",
      "Spiritual and existential exploration"
    ],
    price: {
      monthly: 3.99,
      yearly: 39.99
    },
    imagePath: "/lovable-uploads/60ce1c67-dca5-47f8-beca-020b806fd6f1.png",
    gradient: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    borderColor: "#D97706",
    icon: PersonStanding,
    path: "/golden-years-welcome"
  }
];
