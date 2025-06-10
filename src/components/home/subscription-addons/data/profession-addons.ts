
import { Briefcase, Shield, BookOpen, Hotel, Bus } from "lucide-react";
import type { AddOn } from "./types";

// Profession-based add-ons
export const professionAddOns: AddOn[] = [
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
    features: ["Stress management for high-risk situations", "Shift work coping strategies", "Trauma processing"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1571167090894-2f4eaa2e3166?auto=format&fit=crop&q=80&w=1000",
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
    features: ["Customer interaction stress reduction", "Late shift management", "Work-life balance strategies"],
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
    features: ["Isolation management", "Fatigue and alertness strategies", "Stress reduction techniques"],
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
