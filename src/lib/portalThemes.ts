/**
 * Unified Portal Theming System for ThriveMT
 * Maintains bronze base with accent overlays for each specialized portal
 */

export interface PortalTheme {
  name: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  gradient: string;
  glowColor: string;
  iconBg: string;
  borderColor: string;
}

export const portalThemes: Record<string, PortalTheme> = {
  // Default ThriveMT Bronze Theme
  default: {
    name: 'ThriveMT',
    accent: 'hsl(var(--bronze-500))',
    accentLight: 'hsl(var(--bronze-400))',
    accentDark: 'hsl(var(--bronze-600))',
    gradient: 'from-bronze-500/20 via-amber-500/10 to-bronze-600/20',
    glowColor: 'rgba(212, 175, 55, 0.3)',
    iconBg: 'bg-bronze-500/20',
    borderColor: 'border-bronze-500/30',
  },

  // College Students - Energetic Purple/Blue
  college: {
    name: 'College & University',
    accent: 'hsl(270, 70%, 60%)',
    accentLight: 'hsl(270, 70%, 70%)',
    accentDark: 'hsl(270, 70%, 50%)',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-purple-600/20',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    iconBg: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
  },

  // First Responders - Bold Red/Orange
  firstResponders: {
    name: 'First Responders',
    accent: 'hsl(20, 90%, 55%)',
    accentLight: 'hsl(20, 90%, 65%)',
    accentDark: 'hsl(20, 90%, 45%)',
    gradient: 'from-orange-500/20 via-red-500/10 to-orange-600/20',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    iconBg: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
  },

  // Golden Years - Warm Gold
  goldenYears: {
    name: 'Golden Years',
    accent: 'hsl(45, 90%, 55%)',
    accentLight: 'hsl(45, 90%, 65%)',
    accentDark: 'hsl(45, 90%, 45%)',
    gradient: 'from-yellow-500/20 via-amber-500/10 to-yellow-600/20',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    iconBg: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
  },

  // Educators - Calm Teal
  educators: {
    name: 'Educators',
    accent: 'hsl(175, 70%, 45%)',
    accentLight: 'hsl(175, 70%, 55%)',
    accentDark: 'hsl(175, 70%, 35%)',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-teal-600/20',
    glowColor: 'rgba(20, 184, 166, 0.3)',
    iconBg: 'bg-teal-500/20',
    borderColor: 'border-teal-500/30',
  },

  // Law Enforcement - Navy Blue
  lawEnforcement: {
    name: 'Law Enforcement',
    accent: 'hsl(220, 70%, 50%)',
    accentLight: 'hsl(220, 70%, 60%)',
    accentDark: 'hsl(220, 70%, 40%)',
    gradient: 'from-blue-600/20 via-indigo-500/10 to-blue-700/20',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    iconBg: 'bg-blue-600/20',
    borderColor: 'border-blue-600/30',
  },

  // Healthcare Workers - Healing Green
  healthcare: {
    name: 'Healthcare Workers',
    accent: 'hsl(145, 60%, 45%)',
    accentLight: 'hsl(145, 60%, 55%)',
    accentDark: 'hsl(145, 60%, 35%)',
    gradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    iconBg: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/30',
  },

  // Single Parents - Nurturing Rose
  singleParents: {
    name: 'Single Parents',
    accent: 'hsl(340, 70%, 55%)',
    accentLight: 'hsl(340, 70%, 65%)',
    accentDark: 'hsl(340, 70%, 45%)',
    gradient: 'from-rose-500/20 via-pink-500/10 to-rose-600/20',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    iconBg: 'bg-rose-500/20',
    borderColor: 'border-rose-500/30',
  },

  // Veterans/DoD - Patriotic Navy
  veterans: {
    name: 'Veterans & Military',
    accent: 'hsl(210, 80%, 40%)',
    accentLight: 'hsl(210, 80%, 50%)',
    accentDark: 'hsl(210, 80%, 30%)',
    gradient: 'from-blue-800/20 via-slate-600/10 to-blue-900/20',
    glowColor: 'rgba(30, 64, 175, 0.3)',
    iconBg: 'bg-blue-800/20',
    borderColor: 'border-blue-800/30',
  },

  // Chronic Illness - Gentle Lavender
  chronicIllness: {
    name: 'Chronic Illness Support',
    accent: 'hsl(280, 60%, 60%)',
    accentLight: 'hsl(280, 60%, 70%)',
    accentDark: 'hsl(280, 60%, 50%)',
    gradient: 'from-violet-500/20 via-purple-400/10 to-violet-600/20',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    iconBg: 'bg-violet-500/20',
    borderColor: 'border-violet-500/30',
  },

  // Adolescent - Vibrant Cyan
  adolescent: {
    name: 'Teen & Adolescent',
    accent: 'hsl(190, 80%, 50%)',
    accentLight: 'hsl(190, 80%, 60%)',
    accentDark: 'hsl(190, 80%, 40%)',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-cyan-600/20',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    iconBg: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
  },

  // Cancer Support - Hopeful Pink
  cancerSupport: {
    name: 'Cancer Support',
    accent: 'hsl(330, 70%, 60%)',
    accentLight: 'hsl(330, 70%, 70%)',
    accentDark: 'hsl(330, 70%, 50%)',
    gradient: 'from-pink-500/20 via-rose-400/10 to-pink-600/20',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    iconBg: 'bg-pink-500/20',
    borderColor: 'border-pink-500/30',
  },

  // Coaching - Energetic Teal/Blue
  coaching: {
    name: 'Wellness Coaching',
    accent: 'hsl(185, 70%, 45%)',
    accentLight: 'hsl(185, 70%, 55%)',
    accentDark: 'hsl(185, 70%, 35%)',
    gradient: 'from-teal-500/20 via-emerald-400/10 to-teal-600/20',
    glowColor: 'rgba(20, 184, 166, 0.3)',
    iconBg: 'bg-teal-500/20',
    borderColor: 'border-teal-500/30',
  },
};

export function getPortalTheme(portalKey: string): PortalTheme {
  return portalThemes[portalKey] || portalThemes.default;
}

// CSS variable generator for dynamic theming
export function getPortalCSSVariables(theme: PortalTheme): Record<string, string> {
  return {
    '--portal-accent': theme.accent,
    '--portal-accent-light': theme.accentLight,
    '--portal-accent-dark': theme.accentDark,
    '--portal-glow': theme.glowColor,
  };
}
