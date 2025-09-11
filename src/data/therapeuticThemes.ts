import { TherapeuticTheme, ThemeKey } from "@/types/artTherapyTypes";

export const THERAPY_THEMES: Record<ThemeKey, TherapeuticTheme> = {
  calm: {
    name: "Calm & Serenity",
    description: "Soft blues and greens to reduce anxiety and promote peace",
    palette: ["#E8F4FD", "#B8E0D2", "#D6EAF8", "#EAEDED", "#F8F9FA", "#A2D2FF", "#BDE4FF", "#CCD1FF"],
    background: "linear-gradient(135deg, #E8F4FD 0%, #D6EAF8 100%)",
    benefit: "Promotes relaxation and reduces stress"
  },
  grounding: {
    name: "Grounding & Stability",
    description: "Earth tones to foster feelings of safety and connection",
    palette: ["#F4E4BC", "#D4B996", "#C19A6B", "#A0815A", "#8B6F47", "#E6CCB2", "#DDB892", "#B68D40"],
    background: "linear-gradient(135deg, #F4E4BC 0%, #DDB892 100%)",
    benefit: "Helps with anxiety and promotes feeling centered"
  },
  energizing: {
    name: "Gentle Energy",
    description: "Warm, uplifting colors to combat depression and boost mood",
    palette: ["#FFE5B4", "#FFCC5C", "#FFB347", "#FF8C69", "#FFA07A", "#FFDAB9", "#F0E68C", "#FFE4B5"],
    background: "linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 100%)",
    benefit: "Elevates mood and increases motivation"
  },
  healing: {
    name: "Healing & Growth",
    description: "Gentle greens and purples for emotional healing and self-compassion",
    palette: ["#E8F5E8", "#C8E6C9", "#A5D6A7", "#81C784", "#DCC9E8", "#C8A2C8", "#E1BEE7", "#F3E5F5"],
    background: "linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)",
    benefit: "Supports emotional healing and self-acceptance"
  },
  clarity: {
    name: "Mental Clarity",
    description: "Clear, fresh colors to enhance focus and clear mental fog",
    palette: ["#F0F8FF", "#E0F6FF", "#B0E0E6", "#87CEEB", "#E6F3FF", "#F5F5DC", "#FFFACD", "#F0FFFF"],
    background: "linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%)",
    benefit: "Improves concentration and mental clarity"
  },
  selfLove: {
    name: "Self-Love & Acceptance",
    description: "Warm pinks and soft tones to nurture self-compassion",
    palette: ["#FFF0F5", "#FFE4E1", "#FFC0CB", "#FFB6C1", "#F8BBD9", "#E8A2C2", "#F5DEB3", "#FFEEF0"],
    background: "linear-gradient(135deg, #FFF0F5 0%, #FFEEF0 100%)",
    benefit: "Encourages self-compassion and inner kindness"
  }
};

export const THERAPEUTIC_PROMPTS: Record<ThemeKey, string[]> = {
  calm: [
    "Paint your safe space - where do you feel most at peace?",
    "Create flowing water or gentle clouds to represent letting go",
    "Draw your breath - what does calm breathing look like?"
  ],
  grounding: [
    "Paint roots growing deep into the earth",
    "Create a mountain that represents your inner strength",
    "Draw the feeling of your feet on solid ground"
  ],
  energizing: [
    "Paint a sunrise that represents new hope",
    "Create flowers blooming to show your growth",
    "Draw warm light filling a dark space"
  ],
  healing: [
    "Paint a garden where your emotions can grow safely",
    "Create bandages of color over old wounds",
    "Draw yourself giving yourself a gentle hug"
  ],
  clarity: [
    "Paint clearing fog to reveal a beautiful landscape",
    "Create organized patterns that feel calming",
    "Draw light breaking through clouds"
  ],
  selfLove: [
    "Paint a warm embrace you're giving yourself",
    "Create a mirror that shows your kind inner voice",
    "Draw all the things you appreciate about yourself"
  ]
};