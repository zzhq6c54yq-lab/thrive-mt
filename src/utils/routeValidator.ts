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

// All expected app routes (authenticated)
export const APP_ROUTES = [
  '/app/dashboard',
  '/app/auth',
  '/app/profile',
  '/app/therapy-booking',
  '/app/mental-wellness',
  '/app/community',
  '/app/messages',
  '/app/progress',
  '/app/vision-board',
  '/app/veterans-portal',
  '/app/therapist-portal',
  '/app/coach-portal',
  '/app/admin-portal',
  '/app/single-parents-portal',
  '/app/college-portal',
  '/app/golden-years-portal',
  '/app/first-responders-portal',
  '/app/cancer-support-portal',
  '/app/chronic-illness-portal',
  '/app/educators-portal',
  '/app/law-enforcement-portal',
  '/app/hospitality-portal',
  '/app/transportation-portal',
  '/app/small-business-portal',
  '/app/adolescent-portal',
  '/app/client-video-session',
  '/app/video-session',
  '/app/breathing-exercise',
  '/app/meditation-studio',
  '/app/binaural-beats',
  '/app/art-therapy',
  '/app/music-therapy',
  '/app/video-diary',
  '/app/games-quizzes',
  '/app/sleep-tracker',
  '/app/journaling',
  '/app/dear-henry',
  '/app/mini-session',
  '/app/workshops',
  '/app/assessments',
  '/app/goals',
  '/app/life-transitions',
  '/app/buddy-system',
  '/app/community-groups',
  '/app/support-circle',
  '/app/success-stories',
  '/app/barter-system',
  '/app/financial-assistance',
  '/app/request-therapist',
  '/app/real-time-therapy',
  '/app/family-support',
  '/app/progress-analytics',
  '/app/rewards',
  '/app/settings',
  '/app/notifications',
  '/app/care-hub',
  '/app/therapy-support',
  '/app/wellness-toolkit',
];

// All expected marketing routes (public)
export const MARKETING_ROUTES = [
  '/',
  '/home',
  '/therapy',
  '/coaching',
  '/pricing',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/hipaa-notice',
  '/demo',
  '/henry',
  '/careers',
  '/press',
  '/blog',
  '/faq',
  '/site',
  '/site/home',
  '/site/therapy',
  '/site/coaching',
  '/site/pricing',
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
  const isMarketingRoute = MARKETING_ROUTES.includes(route) || route === '/' || route.startsWith('/site');
  
  // Check if authenticated route has /app prefix
  if (!isAppRoute && !isMarketingRoute) {
    // Check if it looks like an app route without prefix
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

  // Determine category
  let category: 'app' | 'marketing' | 'portal' | 'admin' = 'app';
  if (isMarketingRoute) category = 'marketing';
  else if (route.includes('-portal')) category = 'portal';
  else if (route.includes('admin')) category = 'admin';

  // Check if route exists in known routes
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
  // Marketing routes don't need /app prefix
  if (MARKETING_ROUTES.includes(route) || route === '/' || route.startsWith('/site')) {
    return true;
  }
  
  // All other routes should have /app prefix
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
