
import { Briefcase, Shield, BookOpen, Hotel, Bus } from "lucide-react";
import type { AddOn } from "./types";

// Profession-based add-ons
export const professionAddOns: AddOn[] = [
  {
    id: "small-business",
    title: "Small Business Support",
    description: "Mental health resources tailored to small business owners and employees.",
    targetAudience: "Small business owners and employees",
    features: [
      "Stress management for entrepreneurs", 
      "Work-life balance guidance", 
      "Team building resources",
      "Financial anxiety management",
      "Leadership burnout prevention",
      "Customer service stress relief",
      "Employee mental health programs",
      "Crisis management planning",
      "Marketing stress and rejection handling",
      "Networking and social anxiety support",
      "Time management and productivity optimization",
      "Legal and compliance stress management",
      "Seasonal business fluctuation coping",
      "Scaling and growth anxiety management",
      "Remote work team cohesion",
      "Family business relationship dynamics"
    ],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-amber-600 to-amber-400",
    borderColor: "#F59E0B",
    icon: Briefcase,
    path: "/small-business-welcome",
    recommended: true
  },
  {
    id: "law-enforcement",
    title: "Law Enforcement Program",
    description: "Mental health support tailored to the needs of law enforcement professionals.",
    targetAudience: "Police officers and law enforcement professionals",
    features: [
      "Stress management for high-risk situations", 
      "Shift work coping strategies", 
      "Trauma processing",
      "Critical incident debriefing support",
      "Family relationship preservation",
      "Public scrutiny and media stress management",
      "Career longevity and burnout prevention",
      "Physical fitness and mental resilience",
      "Retirement transition planning",
      "Court testimony anxiety management",
      "Community relations stress relief",
      "Officer safety and hypervigilance management",
      "Alcohol and substance abuse prevention",
      "Peer support and brotherhood strengthening",
      "Leadership and supervisory stress",
      "Administrative and paperwork stress management",
      "Use of force psychological processing"
    ],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "/lovable-uploads/dabf768c-c116-4d0d-a23b-149cc6d35a6e.png",
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
    features: [
      "Classroom stress management", 
      "Work-life balance for educators", 
      "Student interaction strategies",
      "Parent and administrator communication",
      "Curriculum pressure management",
      "Standardized testing anxiety relief",
      "Student behavior and discipline stress",
      "Technology integration overwhelm",
      "Professional development burnout prevention",
      "Summer break and vacation planning",
      "Substitute teacher anxiety management",
      "Special needs student support stress",
      "Budget constraints and resource scarcity",
      "Continuing education and certification stress",
      "Classroom management and organization",
      "Educational policy change adaptation",
      "Retirement and career transition planning"
    ],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
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
    features: [
      "Customer interaction stress reduction", 
      "Late shift management", 
      "Work-life balance strategies",
      "Seasonal employment anxiety management",
      "Tip-based income stress relief",
      "Holiday and weekend work burnout",
      "Physical demand and fatigue management",
      "Kitchen and high-pressure environment coping",
      "Staff turnover and team instability",
      "Language barrier and cultural stress",
      "Sexual harassment and workplace safety",
      "Career advancement and skill development",
      "Food safety and compliance anxiety",
      "Travel industry volatility management",
      "Customer complaint and review stress",
      "Event planning and deadline pressure",
      "Alcohol service responsibility stress"
    ],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000",
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
    features: [
      "Isolation management", 
      "Fatigue and alertness strategies", 
      "Stress reduction techniques",
      "Road rage and aggressive passenger management",
      "Weather and traffic delay stress relief",
      "Vehicle maintenance anxiety management",
      "Regulatory compliance and inspection stress",
      "Schedule disruption and overtime management",
      "Physical health and ergonomic support",
      "Family separation and long-distance challenges",
      "Accident and incident trauma processing",
      "Technology adaptation and GPS dependency",
      "Fuel cost and economic pressure management",
      "Sleep disorder and circadian rhythm support",
      "Communication and dispatch stress",
      "Retirement and pension planning anxiety",
      "Career longevity and skill updating"
    ],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-sky-600 to-sky-400",
    borderColor: "#0284C7",
    icon: Bus,
    path: "/transport-welcome"
  }
];
