// Route validation utility for production health monitoring

export interface RouteStatus {
  route: string;
  category: 'app' | 'marketing' | 'portal' | 'admin';
  status: 'healthy' | 'warning' | 'critical';
  issue?: string;
}

export interface RouteHealthReport {
  totalRoutes: number;
  healthyCount: number;
  warningCount: number;
  criticalCount: number;
  healthPercentage: number;
  lastChecked: string;
  routes: RouteStatus[];
}

// All expected app routes (authenticated) — synced with App.tsx
export const APP_ROUTES = [
  '/app/dashboard',
  '/app/auth',
  '/app/onboarding',
  '/app/home',
  '/app/messages',
  '/app/journal',
  '/app/journaling',
  '/app/debug',
  '/app/support-wall',
  '/app/gratitude',
  '/app/community',
  '/app/community-groups',
  '/app/community-support',
  '/app/personalized-content',
  '/app/progress-reports',
  '/app/progress-analytics',
  '/app/progress-dashboard',
  '/app/weekly-goals',
  '/app/monthly-goals',
  '/app/mental-wellness',
  '/app/mental-wellness-tools',
  '/app/mental-wellness-assessments',
  '/app/family-resources',
  '/app/games-and-quizzes',
  '/app/mental-health-games',
  '/app/cosmic-games',
  '/app/small-business-portal',
  '/app/small-business-welcome',
  '/app/small-business-selection',
  '/app/small-business-experience',
  '/app/employee-welcome',
  '/app/employee-dashboard',
  '/app/employee-readiness',
  '/app/unburdened',
  '/app/all-features',
  '/app/crisis-support',
  '/app/crisis-resources',
  '/app/rewards',
  '/app/badges',
  '/app/learn-more',
  '/app/co-pay',
  '/app/copay-credits',
  '/app/virtual-meetings',
  '/app/barter-system',
  '/app/barter-application',
  '/app/subscription-plans',
  '/app/payment-success',
  '/app/financial-assistance',
  '/app/contact',
  '/app/privacy-security',
  '/app/terms-of-service',
  '/app/alternative-therapies',
  '/app/department-of-defense',
  '/app/dod-welcome',
  '/app/dod-portal',
  '/app/college-welcome',
  '/app/college-portal',
  '/app/adolescent-welcome',
  '/app/adolescent-portal',
  '/app/adolescent-selection',
  '/app/golden-years-welcome',
  '/app/golden-years-portal',
  '/app/golden-years-journal',
  '/app/golden-years-planning',
  '/app/golden-years-memory',
  '/app/golden-years-guide',
  '/app/golden-years-transitions',
  '/app/golden-years-community',
  '/app/golden-years-family',
  '/app/golden-years-wellness',
  '/app/golden-years-calendar',
  '/app/military-support',
  '/app/military-resources',
  '/app/user-lead',
  '/app/first-responders-welcome',
  '/app/first-responders-portal',
  '/app/first-responders-resources',
  '/app/first-responders-peer-support',
  '/app/first-responders-critical-support',
  '/app/first-responders-stress-management',
  '/app/law-enforcement-welcome',
  '/app/law-enforcement-portal',
  '/app/educators-welcome',
  '/app/educators-portal',
  '/app/educators-burnout-assessment',
  '/app/educators-classroom-stress-assessment',
  '/app/educators-work-life-balance-assessment',
  '/app/hospitality-welcome',
  '/app/hospitality-portal',
  '/app/hospitality-stress-assessment',
  '/app/hospitality-burnout-assessment',
  '/app/hospitality-work-life-balance-assessment',
  '/app/transport-welcome',
  '/app/transport-portal',
  '/app/transport-stress-assessment',
  '/app/transport-burnout-assessment',
  '/app/transport-work-life-balance-assessment',
  '/app/single-parents-welcome',
  '/app/single-parents-portal',
  '/app/chronic-illness-welcome',
  '/app/chronic-illness-portal',
  '/app/cancer-support-welcome',
  '/app/cancer-support-portal',
  '/app/real-time-therapy',
  '/app/therapist-admin',
  '/app/therapist-portal',
  '/app/therapist-dashboard',
  '/app/coach-dashboard',
  '/app/therapist-video-session',
  '/app/client-video-session',
  '/app/signature-moments',
  '/app/therapist-reset',
  '/app/coach-intro',
  '/app/coach-questionnaire',
  '/app/coach-matches',
  '/app/admin',
  '/app/admin-portal',
  '/app/engagement-metrics',
  '/app/holistic-wellness',
  '/app/life-transitions',
  '/app/support-circle',
  '/app/buddy-system',
  '/app/binaural-beats',
  '/app/mindfulness-sleep',
  '/app/video-diary',
  '/app/video-record',
  '/app/video-library',
  '/app/resource-library',
  '/app/wellness-challenges',
  '/app/my-sponsor',
  '/app/workshops',
  '/app/sleep-tracker',
  '/app/sleep-insights',
  '/app/music-therapy',
  '/app/meditation',
  '/app/aa-sponsor',
  '/app/substance-abuse-sponsor',
  '/app/career-coaching',
  '/app/memorial-garden',
  '/app/grief-resources',
  '/app/legacy-builder',
  '/app/mini-session',
  '/app/mini-session-history',
  '/app/generative-video',
  '/app/mirror-ai',
  '/app/enhanced-mirror-ai',
  '/app/recommendations',
  '/app/enhanced-audio-therapy',
  '/app/art-therapy',
  '/app/dear-henry',
  '/app/dear-henry-admin',
  '/app/all-workshops',
  '/app/ai-workshop-studio',
  '/app/settings',
  '/app/help',
];

// Marketing routes (public) — served from root
export const MARKETING_ROUTES = [
  '/',
];

// Portal routes (specialized authenticated portals)
export const PORTAL_ROUTES = APP_ROUTES.filter(route => route.includes('-portal'));

// Admin routes
export const ADMIN_ROUTES = APP_ROUTES.filter(route => route.includes('admin'));

export function getAllAppRoutes(): string[] {
  return APP_ROUTES;
}

export function getAllMarketingRoutes(): string[] {
  return MARKETING_ROUTES;
}

export function getPortalRoutes(): string[] {
  return PORTAL_ROUTES;
}

export function getAdminRoutes(): string[] {
  return ADMIN_ROUTES;
}

export function validateRoutePattern(route: string): RouteStatus {
  const isAppRoute = route.startsWith('/app');
  const isMarketingRoute = MARKETING_ROUTES.includes(route) || route === '/';
  
  if (!isAppRoute && !isMarketingRoute) {
    const potentialAppRoutes = ['dashboard', 'profile', 'portal', 'therapy', 'wellness', 'session'];
    const mightBeAppRoute = potentialAppRoutes.some(keyword => route.includes(keyword));
    
    if (mightBeAppRoute) {
      return {
        route,
        category: 'app',
        status: 'critical',
        issue: `Missing /app prefix. Should be /app${route}`
      };
    }
  }

  let category: 'app' | 'marketing' | 'portal' | 'admin' = 'app';
  if (isMarketingRoute) category = 'marketing';
  else if (route.includes('-portal')) category = 'portal';
  else if (route.includes('admin')) category = 'admin';

  const allKnownRoutes = [...APP_ROUTES, ...MARKETING_ROUTES];
  const isKnown = allKnownRoutes.some(known => route.startsWith(known));

  if (!isKnown && isAppRoute) {
    return {
      route,
      category,
      status: 'warning',
      issue: 'Route not in expected routes list - verify it exists'
    };
  }

  return {
    route,
    category,
    status: 'healthy'
  };
}

export function checkAppPrefix(route: string): boolean {
  if (MARKETING_ROUTES.includes(route) || route === '/') {
    return true;
  }
  return route.startsWith('/app');
}

export function getRouteHealthStatus(): RouteHealthReport {
  const allRoutes = [...APP_ROUTES, ...MARKETING_ROUTES];
  const routeStatuses: RouteStatus[] = allRoutes.map(route => validateRoutePattern(route));

  const healthyCount = routeStatuses.filter(r => r.status === 'healthy').length;
  const warningCount = routeStatuses.filter(r => r.status === 'warning').length;
  const criticalCount = routeStatuses.filter(r => r.status === 'critical').length;

  return {
    totalRoutes: allRoutes.length,
    healthyCount,
    warningCount,
    criticalCount,
    healthPercentage: Math.round((healthyCount / allRoutes.length) * 100),
    lastChecked: new Date().toISOString(),
    routes: routeStatuses
  };
}

export function exportRoutesAsCSV(routes: RouteStatus[]): string {
  const headers = 'Route,Category,Status,Issue\n';
  const rows = routes.map(r => 
    `"${r.route}","${r.category}","${r.status}","${r.issue || ''}"`
  ).join('\n');
  return headers + rows;
}
