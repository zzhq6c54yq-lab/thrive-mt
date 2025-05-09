
import { Activity, Stethoscope } from "lucide-react";
import type { AddOn } from "./types";

// Condition-based add-ons
export const conditionAddOns: AddOn[] = [
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
    imagePath: "https://images.unsplash.com/photo-1633270216455-4fe3ee093bb6?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-red-600 to-red-400",
    borderColor: "#DC2626",
    icon: Activity,
    path: "/first-responders-welcome"
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
    imagePath: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-purple-600 to-purple-400",
    borderColor: "#8B5CF6",
    icon: Stethoscope,
    path: "/chronic-illness-welcome",
    recommended: true
  }
];
