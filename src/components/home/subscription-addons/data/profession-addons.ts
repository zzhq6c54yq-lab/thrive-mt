
import { Briefcase, Shield, BookOpen, Hotel, Bus } from "lucide-react";
import type { AddOn } from "./types";

// Profession-based add-ons
export const professionAddOns: AddOn[] = [
  {
    id: "small-business",
    title: "Small Business Support",
    titleSpanish: "Apoyo para Pequeñas Empresas",
    description: "Mental health resources tailored to small business owners and employees.",
    descriptionSpanish: "Recursos de salud mental adaptados para propietarios y empleados de pequeñas empresas.",
    basePrice: 24.99,
    targetAudience: "Small business owners and employees",
    features: [
      "Stress management for entrepreneurs", 
      "Work-life balance guidance", 
      "Team building resources",
      "Financial stress and business anxiety",
      "Leadership and decision-making support"
    ],
    imagePath: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=1000",
    gradient: "from-amber-600 to-amber-400",
    borderColor: "#F59E0B",
    icon: Briefcase
  },
  {
    id: "law-enforcement",
    title: "Law Enforcement Program",
    titleSpanish: "Programa de Fuerzas del Orden",
    description: "Mental health support tailored to the needs of law enforcement professionals.",
    descriptionSpanish: "Apoyo de salud mental adaptado a las necesidades de los profesionales de las fuerzas del orden.",
    basePrice: 20.99,
    targetAudience: "Police officers and law enforcement professionals",
    features: [
      "Stress management for high-risk situations", 
      "Shift work coping strategies", 
      "Trauma processing",
      "Physical and mental resilience training",
      "Emergency response mental preparation"
    ],
    imagePath: "/lovable-uploads/police-badge.jpg",
    gradient: "from-blue-800 to-blue-600",
    borderColor: "#1E40AF",
    icon: Shield
  },
  {
    id: "educators",
    title: "Educators Support",
    titleSpanish: "Apoyo para Educadores",
    description: "Mental wellness resources designed specifically for teachers and educators.",
    descriptionSpanish: "Recursos de bienestar mental diseñados específicamente para maestros y educadores.",
    basePrice: 16.99,
    targetAudience: "Teachers, professors, and education staff",
    features: [
      "Classroom stress management", 
      "Work-life balance for educators", 
      "Student interaction strategies",
      "Burnout prevention techniques",
      "Administrative pressure coping skills"
    ],
    imagePath: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
    gradient: "from-cyan-600 to-cyan-400",
    borderColor: "#0891B2",
    icon: BookOpen
  },
  {
    id: "hospitality",
    title: "Hospitality Industry",
    titleSpanish: "Industria de Hospitalidad",
    description: "Mental health tools for those working in restaurants, hotels, and tourism.",
    descriptionSpanish: "Herramientas de salud mental para quienes trabajan en restaurantes, hoteles y turismo.",
    basePrice: 15.99,
    targetAudience: "Restaurant, hotel, and tourism industry workers",
    features: [
      "Customer interaction stress reduction", 
      "Late shift management", 
      "Work-life balance strategies",
      "Dealing with difficult customers",
      "Team dynamics and workplace harmony"
    ],
    imagePath: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000",
    gradient: "from-orange-500 to-orange-300",
    borderColor: "#F97316",
    icon: Hotel
  },
  {
    id: "transportation",
    title: "Transportation Workers",
    titleSpanish: "Trabajadores del Transporte",
    description: "Mental wellness for drivers, pilots, conductors, and transportation staff.",
    descriptionSpanish: "Bienestar mental para conductores, pilotos, conductores y personal de transporte.",
    basePrice: 17.99,
    targetAudience: "Drivers, pilots, conductors and transportation staff",
    features: [
      "Isolation management", 
      "Fatigue and alertness strategies", 
      "Stress reduction techniques",
      "Long-distance relationship support",
      "Career transition planning"
    ],
    imagePath: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000",
    gradient: "from-sky-600 to-sky-400",
    borderColor: "#0284C7",
    icon: Bus
  }
];
