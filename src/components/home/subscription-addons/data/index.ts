
import { AddOn } from './types';
import { Shield, GraduationCap, Building2, Heart, Users, Briefcase, 
         Hotel, Truck, Stethoscope, BookOpen, BadgeCheck, Ribbon } from 'lucide-react';
import militaryVeterans from '@/assets/military-veterans.jpg';
import goldenYears from '@/assets/golden-years.jpg';
import lawEnforcement from '@/assets/law-enforcement.jpg';
import cancerSupport from '@/assets/cancer-support.jpg';
import adolescentExperience from '@/assets/adolescent-experience.jpg';

export type { AddOn } from './types';

export const addOns: AddOn[] = [
  {
    id: "dod",
    title: "Military and Veterans",
    titleSpanish: "Militares y Veteranos",
    description: "Specialized resources for active military personnel, veterans, and their families.",
    descriptionSpanish: "Recursos especializados para personal militar activo, veteranos y sus familias.",
    basePrice: 19.99,
    imagePath: militaryVeterans,
    icon: Shield,
    targetAudience: "Active military, veterans, military families",
    features: [
      "Combat stress management",
      "Deployment support tools",
      "Family transition resources",
      "PTSD-specific interventions",
      "Military-informed therapy"
    ],
    gradient: "from-green-700 to-emerald-900",
    borderColor: "#059669"
  },
  {
    id: "college",
    title: "The College Experience",
    titleSpanish: "La Experiencia Universitaria",
    description: "Support for college students navigating academic stress and transition to adult life.",
    descriptionSpanish: "Apoyo para estudiantes universitarios navegando el estrés académico y la transición a la vida adulta.",
    basePrice: 14.99,
    imagePath: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80",
    icon: GraduationCap,
    targetAudience: "College students, recent graduates",
    features: [
      "Academic stress management",
      "Social anxiety support",
      "Career preparation tools",
      "Financial stress resources",
      "Peer connection platforms"
    ],
    gradient: "from-blue-700 to-indigo-900",
    borderColor: "#2563eb"
  },
  {
    id: "small-business",
    title: "Small Business",
    titleSpanish: "Pequeñas Empresas",
    description: "Mental wellness tools designed for entrepreneurs and small business teams.",
    descriptionSpanish: "Herramientas de bienestar mental diseñadas para emprendedores y equipos de pequeñas empresas.",
    basePrice: 24.99,
    imagePath: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80",
    icon: Building2,
    targetAudience: "Entrepreneurs, small business owners, startup teams",
    features: [
      "Stress management for leaders",
      "Team wellness programs",
      "Work-life balance tools",
      "Financial anxiety support",
      "Leadership mental health resources"
    ],
    gradient: "from-amber-700 to-orange-900",
    borderColor: "#d97706"
  },
  {
    id: "adolescent",
    title: "Adolescent Experience",
    titleSpanish: "La Experiencia Adolescente",
    description: "Specialized resources for teens and their families navigating the unique challenges of this stage.",
    descriptionSpanish: "Recursos especializados para adolescentes y sus familias navegando los desafíos únicos de esta etapa.",
    basePrice: 16.99,
    imagePath: adolescentExperience,
    icon: Heart,
    targetAudience: "Teenagers (13-18), parents of teens",
    features: [
      "Teen-specific therapy approaches",
      "Family communication tools",
      "School stress management",
      "Identity development support",
      "Peer pressure coping strategies"
    ],
    gradient: "from-purple-700 to-pink-900",
    borderColor: "#9333ea"
  },
  {
    id: "golden-years",
    title: "The Golden Years",
    titleSpanish: "Los Años Dorados",
    description: "Comprehensive support for older adults focused on mental wellness and social connection.",
    descriptionSpanish: "Apoyo integral para adultos mayores enfocado en el bienestar mental y la conexión social.",
    basePrice: 18.99,
    imagePath: goldenYears,
    icon: Users,
    targetAudience: "Adults 65+, their families and caregivers",
    features: [
      "Age-appropriate mental health tools",
      "Social isolation prevention",
      "Memory and cognitive support",
      "Grief and loss processing",
      "Intergenerational connection"
    ],
    gradient: "from-amber-600 to-yellow-800",
    borderColor: "#d97706"
  },
  {
    id: "first-responders",
    title: "First Responders",
    titleSpanish: "Primeros Auxilios",
    description: "Specialized resources for firefighters, paramedics, police officers, and other first responders.",
    descriptionSpanish: "Recursos especializados para bomberos, paramédicos, policías y otros primeros auxilios.",
    basePrice: 22.99,
    imagePath: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=500&q=80",
    icon: Shield,
    targetAudience: "Firefighters, paramedics, EMTs, emergency personnel",
    features: [
      "Trauma-informed care",
      "Critical incident stress management",
      "Shift work sleep support",
      "Family impact resources",
      "Peer support networks"
    ],
    gradient: "from-red-700 to-orange-900",
    borderColor: "#dc2626"
  },
  {
    id: "hospitality",
    title: "Hospitality Industry",
    titleSpanish: "Industria de Hospitalidad",
    description: "Support for restaurant, hotel, and hospitality service workers.",
    descriptionSpanish: "Apoyo para trabajadores de restaurantes, hoteles y servicios de hospitalidad.",
    basePrice: 15.99,
    imagePath: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80",
    icon: Hotel,
    targetAudience: "Restaurant workers, hotel staff, hospitality professionals",
    features: [
      "Customer service stress management",
      "Irregular schedule coping",
      "Workplace harassment support",
      "Financial stress resources",
      "Team dynamics improvement"
    ],
    gradient: "from-teal-700 to-cyan-900",
    borderColor: "#0891b2"
  },
  {
    id: "transportation",
    title: "Transportation Industry",
    titleSpanish: "Industria del Transporte",
    description: "Resources for truck drivers, pilots, and other transportation professionals.",
    descriptionSpanish: "Recursos para conductores de camiones, pilotos, y otros profesionales del transporte.",
    basePrice: 17.99,
    imagePath: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80",
    icon: Truck,
    targetAudience: "Truck drivers, pilots, transportation workers",
    features: [
      "Long-haul mental health support",
      "Isolation and loneliness management",
      "Sleep schedule optimization",
      "Physical health integration",
      "Family separation coping"
    ],
    gradient: "from-gray-700 to-slate-900",
    borderColor: "#374151"
  },
  {
    id: "chronic-illness",
    title: "Chronic Illness",
    titleSpanish: "Enfermedad Crónica",
    description: "Specialized support for individuals living with chronic health conditions.",
    descriptionSpanish: "Apoyo especializado para personas que viven con condiciones de salud crónicas.",
    basePrice: 21.99,
    imagePath: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
    icon: Stethoscope,
    targetAudience: "People with chronic illnesses, their families and caregivers",
    features: [
      "Chronic pain management",
      "Medical anxiety support",
      "Treatment adherence tools",
      "Caregiver resources",
      "Quality of life optimization"
    ],
    gradient: "from-purple-700 to-violet-900",
    borderColor: "#7c3aed"
  },
  {
    id: "educators",
    title: "Educators",
    titleSpanish: "Educadores",
    description: "Resources for teachers, professors, and educational staff facing classroom stress.",
    descriptionSpanish: "Recursos para maestros, profesores y personal educativo enfrentando el estrés del aula.",
    basePrice: 16.99,
    imagePath: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
    icon: BookOpen,
    targetAudience: "Teachers, professors, educational administrators",
    features: [
      "Classroom stress management",
      "Student behavior coping strategies",
      "Work-life balance for educators",
      "Burnout prevention",
      "Professional development support"
    ],
    gradient: "from-indigo-700 to-purple-900",
    borderColor: "#4f46e5"
  },
  {
    id: "law-enforcement",
    title: "Law Enforcement",
    titleSpanish: "Fuerzas del Orden",
    description: "Specialized support for police officers and public safety personnel.",
    descriptionSpanish: "Apoyo especializado para oficiales de policía y personal de seguridad pública.",
    basePrice: 20.99,
    imagePath: lawEnforcement,
    icon: BadgeCheck,
    targetAudience: "Police officers, detectives, public safety personnel",
    features: [
      "Law enforcement specific trauma support",
      "Critical incident debriefing",
      "Community relations stress management",
      "Family impact resources",
      "Career transition support"
    ],
    gradient: "from-blue-800 to-indigo-900",
    borderColor: "#1e40af"
  },
  {
    id: "cancer-support",
    title: "Cancer Support",
    titleSpanish: "Apoyo contra el Cáncer",
    description: "Comprehensive resources for cancer patients, survivors, and their families.",
    descriptionSpanish: "Recursos comprensivos para pacientes de cáncer, sobrevivientes y sus familias.",
    basePrice: 25.99,
    imagePath: cancerSupport,
    icon: Ribbon,
    targetAudience: "Cancer patients, survivors, families, caregivers",
    features: [
      "Treatment journey support",
      "Survivorship resources",
      "Family and caregiver tools",
      "Medical anxiety management",
      "End-of-life planning support"
    ],
    gradient: "from-pink-700 to-rose-900",
    borderColor: "#e11d48"
  },
  {
    id: "single-parents",
    title: "Single Parents Portal",
    titleSpanish: "Portal de Padres Solteros",
    description: "Comprehensive support for single parents balancing family responsibilities, co-parenting challenges, and personal wellbeing.",
    descriptionSpanish: "Apoyo integral para padres solteros equilibrando responsabilidades familiares, desafíos de co-paternidad y bienestar personal.",
    basePrice: 18.99,
    imagePath: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=500&q=80",
    icon: Heart,
    targetAudience: "Single parents, co-parents, sole caregivers, divorced parents",
    features: [
      "Parental burnout assessments",
      "Co-parenting communication tools",
      "Financial wellness resources",
      "Parent Network connections",
      "Work-life integration workshops",
      "Self-compassion practices"
    ],
    gradient: "from-rose-600 to-pink-800",
    borderColor: "#f43f5e"
  }
];
