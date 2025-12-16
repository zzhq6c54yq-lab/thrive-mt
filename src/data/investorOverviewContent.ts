import { Target, TrendingUp, DollarSign, Shield, BarChart3, Award } from "lucide-react";

export interface InvestorSection {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Target;
  content: string;
  hasCharts?: boolean;
}

export const investorOverviewSections: InvestorSection[] = [
  {
    id: "above-the-fold",
    title: "Above the Fold",
    subtitle: "Platform overview",
    icon: Target,
    content: `Thrive MT is not an app. It is a full-spectrum mental health platform built to operate the entire mental health ecosystem. We capture what people feel, how they engage, what works, and how care scales safely across individuals and institutions.

From daily emotional grounding and AI companionship to clinical assessments, therapy access, and institutional programs, Thrive MT unifies human connection, data, and compliance into a single system.

Built with HIPAA and SOC2 compliant infrastructure, proprietary audit systems, and deep engagement tracking, Thrive MT replaces fragmented mental health tools with one cohesive operating layer designed for real outcomes, real scale, and real accountability.`
  },
  {
    id: "vision",
    title: "Vision: A $1B Outcome in 5 Years",
    subtitle: "Long-term strategy",
    icon: TrendingUp,
    content: `Thrive MT's vision is to become the mental health operating system for individuals, institutions, and payers within five years by owning the infrastructure layer of mental health delivery.

While the industry remains fragmented across wellness apps, therapy marketplaces, and enterprise benefits platforms, Thrive MT consolidates the ecosystem into one compliant, measurable, and scalable platform.

By capturing longitudinal emotional data, real time engagement behavior, clinical outcomes, institutional program performance, and reimbursement pathways within a single system, Thrive MT positions itself as the system of record for mental health.

This enables rapid scaling through high value institutional contracts, insurance reimbursement via group NPI structures, and enterprise deployments across government, unions, universities, and large employers.

The result is a platform that compounds value through data depth, regulatory readiness, and network effects, supporting a $1B valuation through ownership of the infrastructure mental health depends on.`
  },
  {
    id: "revenue-path",
    title: "Revenue Path to $1B",
    subtitle: "Financial strategy",
    icon: DollarSign,
    content: `Thrive MT's path to a $1B valuation within five years is driven by institutional scale, recurring revenue, and compounding infrastructure value rather than consumer only monetization.

The platform is structurally designed to secure high value contracts with government entities, unions, universities, and large employers, each capable of generating $2M to $5M in annual recurring revenue. Reaching 20 to 30 such institutional contracts places Thrive MT in the $40M to $150M ARR range.

Using conservative health tech valuation multiples of 8x to 12x ARR for compliant, infrastructure driven platforms, this alone supports a $320M to $1.8B valuation range.

In parallel, insurance reimbursement enabled by group NPI pathways introduces scalable, nonlinear revenue through covered therapy, coaching, and hybrid care models. As utilization increases across institutional cohorts, revenue grows without proportional increases in acquisition costs.

Layered on top of this is optional individual market monetization, premium programs for specialized populations, and data informed program licensing, all built on the same core platform.

Because Thrive MT captures longitudinal engagement, outcomes, and institutional performance data, each new contract increases platform value, defensibility, and pricing power. The result is a revenue model that compounds over time through predictable, recurring, and diversified income streams.`
  },
  {
    id: "why-incumbents-cant-catch-up",
    title: "Why Incumbents Cannot Catch Up",
    subtitle: "Competitive moat",
    icon: Shield,
    content: `Incumbent mental health platforms are constrained by their original design decisions.

Consumer wellness apps like Calm and Headspace are optimized for content engagement, not clinical outcomes, compliance depth, or institutional accountability. Retrofitting those platforms to support longitudinal clinical data, institutional reporting, insurance pathways, and automated compliance audits would require a fundamental rebuild of their architecture and business model.

Therapy marketplaces such as BetterHelp and Talkspace are structured around session volume rather than ecosystem ownership and lack the infrastructure to measure engagement before and after care, integrate institutional programs, or operate as a system of record.

Enterprise platforms like Lyra and Spring Health face the opposite problem. While they have scale, they are burdened by legacy systems, slow iteration cycles, and limited real time insight into user behavior. Their platforms aggregate utilization data but do not capture the full emotional, behavioral, and engagement journey at the individual level.

Thrive MT was built natively to unify these layers from day one, combining individual experience, clinical tools, AI support, institutional oversight, and compliance infrastructure into a single system.

As Thrive MT accumulates longitudinal data, engagement intelligence, institutional trust, and reimbursement pathways, the gap widens. Competitors would need to rebuild their architecture, retrain users and institutions, and realign revenue models simultaneously to compete.`
  },
  {
    id: "competitive-comparison",
    title: "Direct Competitive Comparison",
    subtitle: "Feature by feature analysis",
    icon: BarChart3,
    hasCharts: true,
    content: "" // Content rendered as charts
  },
  {
    id: "positioning-summary",
    title: "Positioning Summary",
    subtitle: "Our market position",
    icon: Award,
    content: `Thrive MT sits above emerging apps and established industry players by owning the infrastructure, data, compliance, and institutional pathways that define modern mental health delivery.

We are not competing feature to feature or app to app.

We are building the system that mental health runs on.`
  }
];

// Strategic comparison data
export const strategicComparisonData = [
  {
    category: "Core Identity",
    thrive: "Mental health operating system",
    calm: "Wellness and mindfulness apps",
    betterhelp: "Therapy marketplaces",
    lyra: "Enterprise mental health benefits"
  },
  {
    category: "Scope of Care",
    thrive: "Full ecosystem including AI, therapy, coaching, programs, and institutions",
    calm: "Content based wellness",
    betterhelp: "Session based therapy",
    lyra: "Employer sponsored care"
  },
  {
    category: "Longitudinal Data",
    thrive: "Full emotional, behavioral, and clinical timeline",
    calm: "Minimal usage metrics",
    betterhelp: "Limited to session history",
    lyra: "Aggregated employer reporting"
  },
  {
    category: "Engagement Tracking",
    thrive: "Real time, multi layer engagement metrics audit",
    calm: "Time spent and content views",
    betterhelp: "Appointment and message activity",
    lyra: "Utilization rates"
  },
  {
    category: "Compliance Infrastructure",
    thrive: "Native HIPAA and SOC2 with automated audits",
    calm: "Limited clinical compliance",
    betterhelp: "HIPAA focused with limited SOC2 depth",
    lyra: "HIPAA and SOC2 built on legacy systems"
  },
  {
    category: "Proprietary Audit Systems",
    thrive: "5,000+ point automated audit and failure prevention",
    calm: "None",
    betterhelp: "None",
    lyra: "Internal and nontransparent"
  },
  {
    category: "AI Integration",
    thrive: "Daily AI companion plus AI led clinical workshops",
    calm: "Guided content only",
    betterhelp: "Limited triage or chat",
    lyra: "Minimal AI personalization"
  },
  {
    category: "Institutional Readiness",
    thrive: "Built for DoD, unions, universities, and enterprises",
    calm: "Consumer only",
    betterhelp: "Limited institutional fit",
    lyra: "Enterprise only"
  },
  {
    category: "Insurance Reimbursement",
    thrive: "Group NPI pathway built in",
    calm: "None",
    betterhelp: "Limited",
    lyra: "Indirect"
  },
  {
    category: "System of Record Potential",
    thrive: "Yes",
    calm: "No",
    betterhelp: "No",
    lyra: "Partial"
  }
];

// Feature comparison data with checkmarks
export type FeatureStatus = "yes" | "no" | "limited";

export interface FeatureRow {
  capability: string;
  thrive: FeatureStatus;
  calm: FeatureStatus;
  betterhelp: FeatureStatus;
  woebot: FeatureStatus;
  simplepractice: FeatureStatus;
}

export const featureComparisonData: FeatureRow[] = [
  {
    capability: "AI emotional support",
    thrive: "yes",
    calm: "no",
    betterhelp: "no",
    woebot: "yes",
    simplepractice: "no"
  },
  {
    capability: "Clinician portal",
    thrive: "yes",
    calm: "no",
    betterhelp: "limited",
    woebot: "no",
    simplepractice: "yes"
  },
  {
    capability: "Scheduling + profiles",
    thrive: "yes",
    calm: "no",
    betterhelp: "yes",
    woebot: "no",
    simplepractice: "yes"
  },
  {
    capability: "Mood tracking + analytics",
    thrive: "yes",
    calm: "yes",
    betterhelp: "no",
    woebot: "yes",
    simplepractice: "no"
  },
  {
    capability: "CBT/DBT tools",
    thrive: "yes",
    calm: "no",
    betterhelp: "no",
    woebot: "yes",
    simplepractice: "no"
  },
  {
    capability: "Crisis aware interface",
    thrive: "yes",
    calm: "no",
    betterhelp: "limited",
    woebot: "yes",
    simplepractice: "no"
  },
  {
    capability: "Wellness games",
    thrive: "yes",
    calm: "no",
    betterhelp: "no",
    woebot: "no",
    simplepractice: "no"
  },
  {
    capability: "Multi role portals",
    thrive: "yes",
    calm: "no",
    betterhelp: "no",
    woebot: "no",
    simplepractice: "yes"
  },
  {
    capability: "Ecosystem depth",
    thrive: "yes",
    calm: "no",
    betterhelp: "no",
    woebot: "no",
    simplepractice: "no"
  },
  {
    capability: "B2B capability",
    thrive: "yes",
    calm: "limited",
    betterhelp: "no",
    woebot: "no",
    simplepractice: "yes"
  }
];
